'use strict';
// The question bank: parsing, the daily pick, choice order, and bonus-round draws.
// Batches are concatenated; each file exports { regular, easy } strings in the same line format.
const BATCHES = [require('../data/questions'), require('../data/batch02'), require('../data/batch03'), require('../data/batch04'), require('../data/batch05')];
const RAW = { regular: BATCHES.map((b) => b.regular || '').join('\n'), easy: BATCHES.map((b) => b.easy || '').join('\n') };
const { hash32, shuffled } = require('./game');

const LEVELS = ['regular', 'easy'];

// Spoken category names -> ids, for "play a history round".
const CATEGORY_NAMES = {
  general: 'general knowledge',
  history: 'history',
  science: 'science',
  space: 'space',
  geography: 'geography',
  animals: 'animals',
  sports: 'sports',
  food: 'food',
  words: 'words',
  music: 'music',
};

function parse(text, level) {
  const out = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    const [cat, q, a, w1, w2, fact] = t.split('|').map((s) => (s || '').trim());
    if (!cat || !q || !a || !w1 || !w2) throw new Error(`bad question line: ${t}`);
    if (!CATEGORY_NAMES[cat]) throw new Error(`unknown category ${cat}: ${t}`);
    out.push({ id: level[0] + hash32(q).toString(36), level, cat, q, a, wrong: [w1, w2], fact: fact || null });
  }
  return out;
}

const ALL = [...parse(RAW.regular, 'regular'), ...parse(RAW.easy, 'easy')];
const BY_ID = new Map(ALL.map((q) => [q.id, q]));
if (BY_ID.size !== ALL.length) throw new Error('duplicate question text');

const byLevel = (level) => ALL.filter((q) => q.level === level);
// The order daily questions come up in, per level. Fixed seed: everyone at a level
// hears the same question on the same day.
const DAILY_ORDER = Object.fromEntries(LEVELS.map((l) => [l, shuffled(byLevel(l).map((q) => q.id).sort(), `daily-${l}`)]));

const get = (id) => BY_ID.get(id) || null;

/** Today's question for a level. */
function daily(level, day) {
  const order = DAILY_ORDER[level] || DAILY_ORDER.regular;
  return get(order[((day % order.length) + order.length) % order.length]);
}

/** The three choices in a fixed per-question order, and which one is right. */
function choicesFor(q) {
  const choices = shuffled([q.a, ...q.wrong], `choices-${q.id}`);
  return { choices, correct: choices.indexOf(q.a) };
}

/** Categories with at least `min` questions at a level. */
function categories(level, min = 5) {
  const counts = {};
  for (const q of byLevel(level)) counts[q.cat] = (counts[q.cat] || 0) + 1;
  return Object.keys(CATEGORY_NAMES).filter((c) => (counts[c] || 0) >= min);
}

/** Map a spoken category to an id, or null. */
function categoryFrom(spoken) {
  const s = String(spoken || '').toLowerCase().trim();
  if (!s) return null;
  if (CATEGORY_NAMES[s]) return s;
  const hit = Object.entries(CATEGORY_NAMES).find(([id, name]) => s === name || s.includes(id) || name.includes(s));
  return hit ? hit[0] : null;
}

/**
 * `n` questions for a bonus round: from one category (or all if null), never
 * `exclude` (today's daily), unseen by this household first. `seen` is a list of ids.
 */
function bonus(level, cat, n, seen = [], exclude = [], seed = 'x') {
  const pool = byLevel(level).filter((q) => (!cat || q.cat === cat) && !exclude.includes(q.id));
  const seenSet = new Set(seen);
  const fresh = shuffled(pool.filter((q) => !seenSet.has(q.id)), `bonus-${seed}`);
  // Once a category is used up, reuse the questions seen longest ago.
  const stale = pool.filter((q) => seenSet.has(q.id)).sort((x, y) => seen.indexOf(x.id) - seen.indexOf(y.id));
  return [...fresh, ...stale].slice(0, n);
}

module.exports = { LEVELS, CATEGORY_NAMES, ALL, get, daily, choicesFor, categories, categoryFrom, bonus };
