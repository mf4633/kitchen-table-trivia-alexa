'use strict';
// Pure game logic: local days, seeded shuffles, answer matching, streaks, and the weekly board.

const DAY = 86400e3;

/** Local calendar day in `tz` as a day number (days since 1970-01-01). */
function dayNum(t, tz) {
  const s = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t));
  const [y, m, d] = s.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY);
}

/** Week number with weeks starting Monday (1970-01-01 was a Thursday). */
const weekOf = (dn) => Math.floor((dn + 3) / 7);

/** 32-bit FNV-1a. */
function hash32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = typeof seed === 'number' ? seed >>> 0 : hash32(String(seed));
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic Fisher-Yates shuffle (copy). */
function shuffled(arr, seed) {
  const out = arr.slice();
  const r = rng(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ---------------------------------------------------------------- answers

const LETTERS = ['A', 'B', 'C'];
const NUMBER_WORDS = Object.fromEntries(['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']
  .map((w, i) => [w, String(i)]));

function normalize(s) {
  return String(s || '').toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/'/g, '')
    .split(/\s+/)
    .filter((w) => w && !['the', 'a', 'an', 'its', 'is', 'it'].includes(w))
    .map((w) => NUMBER_WORDS[w] || w)
    .join(' ');
}

const digits = (s) => s.split(' ').map((w) => NUMBER_WORDS[w] || w).join(' ');

// How each letter tends to come back from speech recognition.
const LETTER_SAYS = [
  ['a', 'ay', 'eh', 'letter a', 'option a', 'answer a', 'first', 'first one', '1', 'number 1'],
  ['b', 'be', 'bee', 'letter b', 'option b', 'answer b', 'second', 'second one', '2', 'number 2'],
  ['c', 'see', 'sea', 'si', 'letter c', 'option c', 'answer c', 'third', 'third one', '3', 'number 3'],
];

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Which choice (0-2) the spoken `raw` text means, or -1.
 * Letters first, then exact text, then containment, then close spelling.
 * A letter only counts when the choices don't themselves look like letters/numbers.
 */
function matchChoice(raw, choices) {
  const norm = choices.map(normalize);
  const said = normalize(raw);
  const exact = said ? norm.indexOf(said) : -1;
  if (exact >= 0) return exact;
  const lettersAmbiguous = choices.some((c) => /^\s*([abc]|[123]|one|two|three)\s*$/i.test(String(c)));
  if (!lettersAmbiguous) {
    // Letters are matched before normalize(), which would drop a bare "a".
    let simple = String(raw).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
      .replace(/^(i think|i say|my answer is|the answer is|answer|is it|it's|its|it is)\s+/, '')
      .replace(/^(the )?/, '');
    simple = digits(simple);
    const li = LETTER_SAYS.findIndex((says) => says.map(digits).includes(simple));
    if (li >= 0) return li;
  }
  if (!said) return -1;
  const hits = norm.map((c, i) => (c && (said.includes(c) || (said.length >= 3 && c.includes(said))) ? i : -1)).filter((i) => i >= 0);
  if (hits.length === 1) return hits[0];
  if (hits.length > 1) {
    // "north america" vs "america": take the longest choice the speaker fully said.
    const full = hits.filter((i) => said.includes(norm[i])).sort((x, y) => norm[y].length - norm[x].length);
    if (full.length && (full.length === 1 || norm[full[0]].length > norm[full[1]].length)) return full[0];
    return -1;
  }
  const scored = norm.map((c, i) => ({ i, r: 1 - levenshtein(said, c) / Math.max(said.length, c.length) })).sort((x, y) => y.r - x.r);
  if (scored[0].r >= 0.7 && scored[0].r - scored[1].r >= 0.15) return scored[0].i;
  return -1;
}

// ---------------------------------------------------------------- players

const MAX_PLAYERS = 8;

const cleanName = (s) => String(s || '').trim().replace(/\s+/g, ' ').replace(/[^\p{L}\p{N} '\-]/gu, '').slice(0, 24)
  .replace(/\b\p{L}/gu, (c) => c.toUpperCase());

function findPlayer(state, name) {
  const n = normalize(name);
  if (!n) return null;
  return (state.players || []).find((p) => normalize(p.name) === n) || null;
}

function addPlayer(state, name, easy = false) {
  state.players = state.players || [];
  const existing = findPlayer(state, name);
  if (existing) return existing;
  if (state.players.length >= MAX_PLAYERS) return null;
  const p = { name: cleanName(name), easy: !!easy, streak: 0, best: 0, last: null, daily: null, week: null, prev: null };
  state.players.push(p);
  return p;
}

function removePlayer(state, name) {
  const p = findPlayer(state, name);
  if (!p) return null;
  state.players = state.players.filter((x) => x !== p);
  for (const [k, v] of Object.entries(state.people || {})) if (v === p.name) delete state.people[k];
  return p;
}

/** Streak as of `today`: it survives until a full day is missed. */
const liveStreak = (p, today) => (p.last != null && p.last >= today - 1 ? p.streak : 0);

const answeredToday = (p, today) => !!(p.daily && p.daily.day === today);

/** Record today's daily answer. Streak counts days played; points count correct answers. */
function recordDaily(p, today, qid, ok) {
  if (answeredToday(p, today)) return p;
  p.streak = p.last === today - 1 ? p.streak + 1 : 1;
  p.best = Math.max(p.best || 0, p.streak);
  p.last = today;
  p.daily = { day: today, qid, ok: !!ok };
  const wk = weekOf(today);
  if (!p.week || p.week.wk !== wk) {
    p.prev = p.week && p.week.wk === wk - 1 ? p.week : null;
    p.week = { wk, pts: 0, played: 0 };
  }
  p.week.played += 1;
  if (ok) p.week.pts += 1;
  return p;
}

const weekPts = (p, wk) => (p.week && p.week.wk === wk ? p.week.pts : 0);
function lastWeekPts(p, wk) {
  if (p.week && p.week.wk === wk - 1) return p.week.pts;
  if (p.prev && p.prev.wk === wk - 1) return p.prev.pts;
  return 0;
}

/** This week's standings, best first. */
function board(state, today) {
  const wk = weekOf(today);
  return (state.players || []).map((p) => ({ name: p.name, pts: weekPts(p, wk), streak: liveStreak(p, today) }))
    .sort((a, b) => b.pts - a.pts || b.streak - a.streak || a.name.localeCompare(b.name));
}

/** Last week's winners (ties share), or [] if nobody scored. */
function lastWeekWinners(state, today) {
  const wk = weekOf(today);
  const rows = (state.players || []).map((p) => ({ name: p.name, pts: lastWeekPts(p, wk) }));
  const top = Math.max(0, ...rows.map((r) => r.pts));
  return top > 0 ? rows.filter((r) => r.pts === top) : [];
}

/** "Sam", "Sam and Alex", "Sam, Alex, and Jo" */
function listAnd(items, joiner = 'and') {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} ${joiner} ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, ${joiner} ${items[items.length - 1]}`;
}

module.exports = {
  DAY, dayNum, weekOf, hash32, rng, shuffled, LETTERS, normalize, levenshtein, matchChoice,
  MAX_PLAYERS, cleanName, findPlayer, addPlayer, removePlayer, liveStreak, answeredToday, recordDaily,
  board, lastWeekWinners, listAnd,
};
