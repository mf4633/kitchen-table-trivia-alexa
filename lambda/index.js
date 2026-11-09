'use strict';
const Alexa = require('ask-sdk-core');
const g = require('./src/game');
const bank = require('./src/bank');

const SKILL_NAME = 'Kitchen Table Trivia';
const PREMIUM_NAME = 'Kitchen Table Trivia Premium';
const PRODUCT_REF = 'premium';
const ANNUAL_REF = 'premium_annual';
const DEFAULT_TZ = 'America/New_York';
const ROUND_LEN = 5;
const SEEN_CAP = 600;

// Swappable for tests.
const deps = { now: () => Date.now() };

// ---------------------------------------------------------------- small helpers

const reqType = (hi) => Alexa.getRequestType(hi.requestEnvelope);
const intentIs = (hi, ...names) => reqType(hi) === 'IntentRequest' && names.includes(Alexa.getIntentName(hi.requestEnvelope));
const esc = (s) => String(s).replace(/&/g, ' and ').replace(/</g, '').replace(/>/g, '');
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const session = (hi) => hi.attributesManager.getSessionAttributes();
const setSession = (hi, patch) => hi.attributesManager.setSessionAttributes({ ...session(hi), ...patch });
const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function slotRaw(hi, name) {
  const slot = Alexa.getSlot(hi.requestEnvelope, name);
  return slot && slot.value ? String(slot.value) : null;
}

/** Resolved slot id from any authority (static or dynamic), or null. */
function slotId(hi, name) {
  const slot = Alexa.getSlot(hi.requestEnvelope, name);
  const auths = slot && slot.resolutions && slot.resolutions.resolutionsPerAuthority;
  for (const a of auths || []) {
    if (a.status && a.status.code === 'ER_SUCCESS_MATCH' && a.values && a.values[0]) return a.values[0].value.id;
  }
  return null;
}

async function timeZone(hi) {
  try {
    const deviceId = Alexa.getDeviceId(hi.requestEnvelope);
    const tz = await hi.serviceClientFactory.getUpsServiceClient().getSystemTimeZone(deviceId);
    if (tz) { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return tz; }
  } catch (e) {
    console.log('time zone lookup failed:', e && e.message);
  }
  return DEFAULT_TZ;
}

/** Household state (persistent) plus today's day number. Cached per request. */
async function load(hi) {
  if (hi.__ctx) return hi.__ctx;
  let state = {};
  try { state = (await hi.attributesManager.getPersistentAttributes()) || {}; } catch (e) { console.log('load failed:', e && e.message); }
  state.players = state.players || [];
  state.people = state.people || {};
  state.seen = state.seen || [];
  const tz = await timeZone(hi);
  hi.__ctx = { state, tz, today: g.dayNum(deps.now(), tz) };
  return hi.__ctx;
}

async function save(hi) {
  if (!hi.__ctx) return;
  try {
    hi.attributesManager.setPersistentAttributes(hi.__ctx.state);
    await hi.attributesManager.savePersistentAttributes();
  } catch (e) {
    console.log('save failed:', e && e.message);
  }
}

const personId = (hi) => {
  const p = hi.requestEnvelope.context && hi.requestEnvelope.context.System && hi.requestEnvelope.context.System.person;
  return p && p.personId ? p.personId : null;
};

/** The player whose voice Alexa recognized, if we've linked it. */
function recognized(hi, state) {
  const id = personId(hi);
  return id && state.people[id] ? g.findPlayer(state, state.people[id]) : null;
}

function linkVoice(hi, state, player) {
  const id = personId(hi);
  if (id && !state.people[id]) state.people[id] = player.name;
}

const levelOf = (p) => (p && p.easy ? 'easy' : 'regular');

// ---------------------------------------------------------------- purchases

/**
 * Premium as one object: the monthly product's fields, entitled if EITHER plan
 * is owned, plus `annual` and `owned`. null if ISP is unavailable.
 */
async function getProduct(hi) {
  try {
    const ms = hi.serviceClientFactory.getMonetizationServiceClient();
    const res = await ms.getInSkillProducts(Alexa.getLocale(hi.requestEnvelope));
    const list = res.inSkillProducts || [];
    const monthly = list.find((p) => p.referenceName === PRODUCT_REF) || null;
    const annual = list.find((p) => p.referenceName === ANNUAL_REF) || null;
    if (!monthly && !annual) return null;
    const owned = [monthly, annual].find((p) => p && p.entitled === 'ENTITLED') || null;
    return { ...(monthly || { purchasable: 'NOT_PURCHASABLE' }), entitled: owned ? 'ENTITLED' : 'NOT_ENTITLED', annual, owned };
  } catch (e) {
    console.log('ISP lookup failed:', e && e.message);
    return null;
  }
}
const isEntitled = (p) => !!p && p.entitled === 'ENTITLED';
const isPurchasable = (p) => !!p && p.purchasable === 'PURCHASABLE';
const annualFor = (p) => (p && p.annual && p.annual.purchasable === 'PURCHASABLE' ? p.annual : null);
const canBuy = (p) => isPurchasable(p) || !!annualFor(p);

function connections(hi, name, productId, token, upsellMessage) {
  const payload = { InSkillProduct: { productId } };
  if (upsellMessage) payload.upsellMessage = upsellMessage;
  return hi.responseBuilder.addDirective({ type: 'Connections.SendRequest', name, payload, token: JSON.stringify(token || {}) }).getResponse();
}

// ---------------------------------------------------------------- speech pieces

function whoPrompt(state) {
  const names = state.players.map((p) => p.name);
  if (!names.length) return 'What\'s the first player\'s name?';
  return `Who's playing? ${g.listAnd(names.slice(0, 5), 'or')}${names.length ? ', or someone new' : ''}?`;
}

function boardText(ctx) {
  const rows = g.board(ctx.state, ctx.today);
  if (!rows.length) return '';
  if (rows.length === 1) {
    const r = rows[0];
    return `${r.name}, you have ${plural(r.pts, 'point')} this week${r.streak > 1 ? `, and a ${r.streak}-day streak` : ''}.`;
  }
  if (rows[0].pts === 0) return 'Nobody has scored yet this week.';
  const top = rows.filter((r) => r.pts === rows[0].pts);
  const lead = top.length > 1
    ? `This week, ${g.listAnd(top.map((r) => r.name))} are tied with ${plural(rows[0].pts, 'point')} each`
    : `This week, ${rows[0].name} leads with ${plural(rows[0].pts, 'point')}`;
  const rest = rows.filter((r) => r.pts !== rows[0].pts).slice(0, 4).map((r) => `${r.name} ${r.pts}`);
  return `${lead}${rest.length ? `. Then ${g.listAnd(rest)}` : ''}.`;
}

/** Monday's "last week's winner" line, said once per week. */
function recapText(ctx) {
  const wk = g.weekOf(ctx.today);
  if (ctx.state.recapWk === wk) return '';
  const w = g.lastWeekWinners(ctx.state, ctx.today);
  ctx.state.recapWk = wk;
  if (!w.length) return '';
  return w.length === 1
    ? `Last week's winner was ${w[0].name}, with ${plural(w[0].pts, 'point')}! `
    : `Last week ended in a tie between ${g.listAnd(w.map((r) => r.name))}, with ${plural(w[0].pts, 'point')} each! `;
}

const PRAISE = ['That\'s right!', 'Correct!', 'You got it!', 'Yes, that\'s it!', 'Nailed it!'];

// ---------------------------------------------------------------- core flows

/** Ask question `q` and wait for an answer. */
function ask(hi, q, mode, player, lead) {
  const { choices } = bank.choicesFor(q);
  const [a, b, c] = choices.map(esc);
  setSession(hi, { s: 'answer', p: player.name, q: { id: q.id, mode } });
  return hi.responseBuilder
    .speak(`${lead} ${esc(q.q)} <break time="300ms"/> A: ${a}. <break time="200ms"/> B: ${b}. <break time="200ms"/> C: ${c}.`)
    .reprompt(`${esc(q.q)} Is it A, ${a}; B, ${b}; or C, ${c}?`)
    .addDirective({
      type: 'Dialog.UpdateDynamicEntities',
      updateBehavior: 'REPLACE',
      types: [{ name: 'CHOICE', values: choices.map((text, i) => ({ id: g.LETTERS[i], name: { value: String(text), synonyms: [] } })) }],
    })
    .getResponse();
}

async function startDaily(hi, player, greeting = '') {
  const ctx = await load(hi);
  const product = await getProduct(hi);
  setSession(hi, { p: player.name });
  if (g.answeredToday(player, ctx.today)) {
    const streak = g.liveStreak(player, ctx.today);
    const did = `${greeting}${player.name}, you've already answered today's question${player.daily.ok ? ' and got it right' : ''}. ${streak > 1 ? `Your streak is ${streak} days. ` : ''}`;
    if (isEntitled(product)) {
      setSession(hi, { s: 'bonusOffer' });
      return hi.responseBuilder.speak(`${did}Want a bonus round?`).reprompt('Want a bonus round? Say yes, or name a category, like history.').getResponse();
    }
    setSession(hi, { s: 'who', after: true });
    return hi.responseBuilder.speak(`${did}Anyone else want today's question? Say their name, or say done.`)
      .reprompt('Say another player\'s name, or say done.').getResponse();
  }
  const q = bank.daily(levelOf(player), ctx.today);
  return ask(hi, q, 'daily', player, `${greeting}Here's today's question for ${player.name}.`);
}

/** Bonus round: entitled players only (callers check). */
async function startBonus(hi, player, cat, lead = '') {
  const ctx = await load(hi);
  const level = levelOf(player);
  const valid = cat && bank.categories(level).includes(cat) ? cat : null;
  const today = bank.daily(level, ctx.today);
  const qs = bank.bonus(level, valid, ROUND_LEN, ctx.state.seen, [today.id], `${ctx.state.seen.length}-${ctx.today}`);
  ctx.state.seen = [...ctx.state.seen.filter((id) => !qs.some((q) => q.id === id)), ...qs.map((q) => q.id)].slice(-SEEN_CAP);
  await save(hi);
  setSession(hi, { round: { cat: valid, ids: qs.map((q) => q.id), i: 0, score: 0 } });
  const topic = valid ? bank.CATEGORY_NAMES[valid] : 'mixed';
  const note = cat && !valid ? `I don't have enough ${level === 'easy' ? 'easier ' : ''}questions in that category yet, so here's a mixed round. ` : '';
  return ask(hi, qs[0], 'bonus', player, `${lead}${note}Here's a ${topic} bonus round for ${player.name}: ${ROUND_LEN} questions. Question 1.`);
}

/** Handle an answer, given the choice index the player picked (-1 = don't know). */
async function judge(hi, idx, dontKnow = false) {
  const ctx = await load(hi);
  const ss = session(hi);
  const q = bank.get(ss.q && ss.q.id);
  const player = g.findPlayer(ctx.state, ss.p);
  if (!q || !player) {
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`Let's start again. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  }
  const { choices, correct } = bank.choicesFor(q);
  if (idx < 0 && !dontKnow) {
    const [a, b, c] = choices.map(esc);
    return hi.responseBuilder.speak(`Sorry, I didn't catch that. Is it A, ${a}; B, ${b}; or C, ${c}?`)
      .reprompt('Say A, B, or C.').getResponse();
  }
  const ok = idx === correct;
  const reveal = ok ? pick(PRAISE) : `${dontKnow ? 'No worries.' : 'Not quite.'} It's ${g.LETTERS[correct]}, ${esc(q.a)}.`;
  const fact = q.fact ? ` ${esc(q.fact)}` : '';

  if (ss.q.mode === 'daily') {
    g.recordDaily(player, ctx.today, q.id, ok);
    linkVoice(hi, ctx.state, player);
    await save(hi);
    const streak = player.streak > 1 ? ` That's ${player.streak} days in a row.` : ' Your streak starts today.';
    setSession(hi, { s: 'who', after: true, q: null });
    const others = ctx.state.players.filter((p) => p !== player && !g.answeredToday(p, ctx.today)).map((p) => p.name);
    const next = others.length
      ? `Who's next? ${g.listAnd(others.slice(0, 4), 'or')}? Or say done.`
      : 'Anyone else want today\'s question? Say their name, or say done.';
    return hi.responseBuilder.speak(`${reveal}${fact}${streak} ${next}`).reprompt('Say a name, or say done.').getResponse();
  }

  // Bonus round
  const round = ss.round || { ids: [q.id], i: 0, score: 0 };
  round.score += ok ? 1 : 0;
  round.i += 1;
  if (round.i < round.ids.length) {
    setSession(hi, { round });
    return ask(hi, bank.get(round.ids[round.i]), 'bonus', player, `${reveal}${fact} Question ${round.i + 1}.`);
  }
  setSession(hi, { round: null, s: 'again', q: null });
  const perfect = round.score === round.ids.length ? ' A perfect round!' : '';
  return hi.responseBuilder.speak(`${reveal}${fact} That's the round: ${player.name} got ${round.score} out of ${round.ids.length}.${perfect} Want another round?`)
    .reprompt('Want another bonus round? You can name a category, like science.').getResponse();
}

async function onName(hi, rawName) {
  const ctx = await load(hi);
  const name = g.cleanName(rawName);
  if (!name) {
    return hi.responseBuilder.speak(`Sorry, I didn't catch the name. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  }
  const existing = g.findPlayer(ctx.state, name);
  if (existing) return continueWith(hi, existing, `Hi ${existing.name}! `);
  if (ctx.state.players.length >= g.MAX_PLAYERS) {
    return hi.responseBuilder.speak(`This game already has ${g.MAX_PLAYERS} players, which is the most I can keep track of. To make room, say remove, and a player's name. ${whoPrompt(ctx.state)}`)
      .reprompt(whoPrompt(ctx.state)).getResponse();
  }
  setSession(hi, { s: 'easy', newName: name });
  return hi.responseBuilder.speak(`Nice to meet you, ${name}. Should ${name} get easier questions? They're good for younger players. Say yes or no.`)
    .reprompt(`Should ${name} get easier questions? Yes or no?`).getResponse();
}

async function finishNewPlayer(hi, easy) {
  const ctx = await load(hi);
  const p = g.addPlayer(ctx.state, session(hi).newName, easy);
  if (!p) return hi.responseBuilder.speak(whoPrompt(ctx.state)).reprompt(whoPrompt(ctx.state)).getResponse();
  linkVoice(hi, ctx.state, p);
  await save(hi);
  setSession(hi, { newName: null });
  return continueWith(hi, p, `Got it. ${easy ? `${p.name} will get easier questions. ` : ''}`);
}

/** After we know who's playing: a pending bonus round, or today's question. */
async function continueWith(hi, player, lead) {
  const ss = session(hi);
  if (ss.pending && ss.pending.type === 'bonus') {
    setSession(hi, { pending: null, p: player.name });
    return startBonus(hi, player, ss.pending.cat, lead);
  }
  return startDaily(hi, player, lead);
}

async function closing(hi, prefix = '') {
  const ctx = await load(hi);
  const product = await getProduct(hi);
  let pitch = '';
  if (!isEntitled(product) && canBuy(product) && ctx.state.pitchDay !== ctx.today && ctx.state.players.length) {
    ctx.state.pitchDay = ctx.today;
    await save(hi);
    pitch = ` Can't wait until tomorrow? With ${PREMIUM_NAME}, you can play bonus rounds anytime. Just say bonus round.`;
  }
  return hi.responseBuilder.speak(`${prefix}${boardText(ctx)} Come back tomorrow for a new question!${pitch}`)
    .withShouldEndSession(true).getResponse();
}

/** Who is the current player, without asking? Session, then voice, then the only player. */
function currentPlayer(hi, ctx) {
  const ss = session(hi);
  return (ss.p && g.findPlayer(ctx.state, ss.p)) || recognized(hi, ctx.state)
    || (ctx.state.players.length === 1 ? ctx.state.players[0] : null);
}

async function bonusRequest(hi, cat) {
  const ctx = await load(hi);
  const product = await getProduct(hi);
  if (!isEntitled(product)) {
    const offer = isPurchasable(product) ? product : annualFor(product);
    if (!offer) {
      setSession(hi, { s: 'who' });
      return hi.responseBuilder.speak(`Bonus rounds come with ${PREMIUM_NAME}, which isn't available on this account. The daily question is free. ${whoPrompt(ctx.state)}`)
        .reprompt(whoPrompt(ctx.state)).getResponse();
    }
    const player = currentPlayer(hi, ctx);
    return connections(hi, 'Upsell', offer.productId, { type: 'bonus', cat, p: player ? player.name : null },
      `Bonus rounds come with ${PREMIUM_NAME}: five-question rounds in history, science, sports, and more, as many as you like, for the whole family. Want to hear more?`);
  }
  const player = currentPlayer(hi, ctx);
  if (player) return startBonus(hi, player, cat);
  setSession(hi, { s: 'who', pending: { type: 'bonus', cat } });
  return hi.responseBuilder.speak(`Sure. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
}

// ---------------------------------------------------------------- handlers

const LaunchHandler = {
  canHandle: (hi) => reqType(hi) === 'LaunchRequest',
  async handle(hi) {
    const ctx = await load(hi);
    const recap = recapText(ctx);
    await save(hi);
    const me = recognized(hi, ctx.state);
    if (me) return startDaily(hi, me, `${recap}Welcome back, ${me.name}. `);
    if (!ctx.state.players.length) {
      setSession(hi, { s: 'who' });
      return hi.responseBuilder
        .speak(`Welcome to ${SKILL_NAME}! Every day there's a new question for each player, and I keep score for the week. What's the first player's name?`)
        .reprompt('What\'s the first player\'s name?').getResponse();
    }
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`${recap}Welcome back to ${SKILL_NAME}. ${whoPrompt(ctx.state)}`)
      .reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const AnswerHandler = {
  canHandle: (hi) => intentIs(hi, 'AnswerIntent'),
  async handle(hi) {
    const ss = session(hi);
    const raw = slotRaw(hi, 'choice');
    // "Sam" can be heard as an answer. Outside a question, it's a name.
    if (ss.s !== 'answer') {
      if (raw && (ss.s === 'who' || !ss.s)) return onName(hi, raw);
      return FallbackHandler.handle(hi);
    }
    const q = bank.get(ss.q && ss.q.id);
    if (!q) return judge(hi, -1);
    const { choices } = bank.choicesFor(q);
    const id = slotId(hi, 'choice');
    let idx = g.LETTERS.indexOf(id);
    if (idx < 0 || (raw && g.matchChoice(raw, choices) >= 0)) idx = g.matchChoice(raw, choices);
    return judge(hi, idx);
  },
};

const NameHandler = {
  canHandle: (hi) => intentIs(hi, 'NameIntent'),
  async handle(hi) {
    const ss = session(hi);
    const name = slotRaw(hi, 'name');
    // A first-name answer ("Victoria") during a question is an answer.
    if (ss.s === 'answer') {
      const q = bank.get(ss.q && ss.q.id);
      return judge(hi, q ? g.matchChoice(name, bank.choicesFor(q).choices) : -1);
    }
    return onName(hi, name);
  },
};

const DontKnowHandler = {
  canHandle: (hi) => intentIs(hi, 'DontKnowIntent'),
  async handle(hi) {
    if (session(hi).s === 'answer') return judge(hi, -1, true);
    return FallbackHandler.handle(hi);
  },
};

const YesHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.YesIntent'),
  async handle(hi) {
    const ss = session(hi);
    if (ss.s === 'easy') return finishNewPlayer(hi, true);
    if (ss.s === 'bonusOffer' || ss.s === 'again') return bonusRequest(hi, ss.round && ss.round.cat ? ss.round.cat : null);
    if (ss.s === 'buy') return BuyHandler.handle(hi);
    if (ss.s === 'reset') {
      try { await hi.attributesManager.deletePersistentAttributes(); } catch (e) { console.log('delete failed:', e && e.message); }
      hi.__ctx = null;
      return hi.responseBuilder.speak('Done. I deleted every player, score, and streak. Open Kitchen Table Trivia anytime to start fresh.')
        .withShouldEndSession(true).getResponse();
    }
    if (ss.s === 'answer') return judge(hi, -1);
    const ctx = await load(hi);
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(whoPrompt(ctx.state)).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const NoHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.NoIntent', 'DoneIntent'),
  async handle(hi) {
    const ss = session(hi);
    if (ss.s === 'easy' && intentIs(hi, 'AMAZON.NoIntent')) return finishNewPlayer(hi, false);
    if (ss.s === 'answer') return judge(hi, -1);
    if (ss.s === 'reset') {
      const ctx = await load(hi);
      setSession(hi, { s: 'who' });
      return hi.responseBuilder.speak(`Okay, nothing was deleted. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
    }
    return closing(hi);
  },
};

const BonusHandler = {
  canHandle: (hi) => intentIs(hi, 'BonusRoundIntent'),
  async handle(hi) {
    const spoken = slotId(hi, 'category') || slotRaw(hi, 'category');
    return bonusRequest(hi, bank.categoryFrom(spoken));
  },
};

const LeaderboardHandler = {
  canHandle: (hi) => intentIs(hi, 'LeaderboardIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    if (!ctx.state.players.length) {
      setSession(hi, { s: 'who' });
      return hi.responseBuilder.speak('Nobody has played yet. What\'s the first player\'s name?').reprompt('What\'s the first player\'s name?').getResponse();
    }
    const streaks = g.board(ctx.state, ctx.today).filter((r) => r.streak > 1).map((r) => `${r.name} ${r.streak} days`);
    const st = streaks.length ? ` Current streaks: ${g.listAnd(streaks)}.` : '';
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`${boardText(ctx)}${st} ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const PlayersHandler = {
  canHandle: (hi) => intentIs(hi, 'ListPlayersIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    const ps = ctx.state.players;
    const easy = ps.filter((p) => p.easy).map((p) => p.name);
    const list = ps.length
      ? `The players are ${g.listAnd(ps.map((p) => p.name))}.${easy.length ? ` ${g.listAnd(easy)} ${easy.length > 1 ? 'get' : 'gets'} easier questions.` : ''}`
      : 'There are no players yet.';
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`${list} ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const AddPlayerHandler = {
  canHandle: (hi) => intentIs(hi, 'AddPlayerIntent'),
  handle: (hi) => onName(hi, slotRaw(hi, 'name')),
};

const RemovePlayerHandler = {
  canHandle: (hi) => intentIs(hi, 'RemovePlayerIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    const gone = g.removePlayer(ctx.state, slotRaw(hi, 'name'));
    if (gone) await save(hi);
    const msg = gone ? `Okay, I removed ${gone.name} and their scores.` : 'I couldn\'t find a player by that name.';
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`${msg} ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const LevelHandler = {
  canHandle: (hi) => intentIs(hi, 'SetLevelIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    const p = g.findPlayer(ctx.state, slotRaw(hi, 'name')) || currentPlayer(hi, ctx);
    const level = slotId(hi, 'level') || (/(easy|easier|kid|young)/i.test(slotRaw(hi, 'level') || '') ? 'easy' : 'regular');
    if (!p) {
      setSession(hi, { s: 'who' });
      return hi.responseBuilder.speak(`Which player? Say, for example, give Sam easier questions. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
    }
    p.easy = level === 'easy';
    await save(hi);
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`Okay, ${p.name} will get ${p.easy ? 'easier' : 'regular'} questions starting tomorrow. ${whoPrompt(ctx.state)}`)
      .reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const ResetHandler = {
  canHandle: (hi) => intentIs(hi, 'ResetIntent'),
  handle(hi) {
    setSession(hi, { s: 'reset' });
    return hi.responseBuilder.speak("This deletes every player, score, and streak for this household, and can't be undone. Are you sure?")
      .reprompt('Delete everything? Yes or no?').getResponse();
  },
};

const CategoriesHandler = {
  canHandle: (hi) => intentIs(hi, 'CategoriesIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    const level = levelOf(currentPlayer(hi, ctx));
    const names = bank.categories(level).map((c) => bank.CATEGORY_NAMES[c]);
    setSession(hi, { s: 'bonusOffer' });
    return hi.responseBuilder.speak(`Bonus round categories are ${g.listAnd(names)}. Which would you like?`)
      .reprompt('Say a category, like history, or say mixed.').getResponse();
  },
};

const RepeatHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.RepeatIntent'),
  async handle(hi) {
    const ss = session(hi);
    const q = ss.s === 'answer' && bank.get(ss.q && ss.q.id);
    if (q) {
      const ctx = await load(hi);
      const player = g.findPlayer(ctx.state, ss.p);
      if (player) return ask(hi, q, ss.q.mode, player, 'Sure.');
    }
    return HelpHandler.handle(hi);
  },
};

const BuyHandler = {
  canHandle: (hi) => intentIs(hi, 'BuyIntent'),
  async handle(hi) {
    const product = await getProduct(hi);
    if (isEntitled(product)) return bonusRequest(hi, null);
    if (isPurchasable(product)) return connections(hi, 'Buy', product.productId, { type: 'bonus' });
    const annual = annualFor(product);
    if (annual) return connections(hi, 'Buy', annual.productId, { type: 'bonus' });
    return hi.responseBuilder.speak(`${PREMIUM_NAME} isn't available on this account. The daily question is free.`).withShouldEndSession(true).getResponse();
  },
};

const BuyAnnualHandler = {
  canHandle: (hi) => intentIs(hi, 'BuyAnnualIntent'),
  async handle(hi) {
    const product = await getProduct(hi);
    if (isEntitled(product)) {
      if (product.owned && product.owned.referenceName === ANNUAL_REF) {
        return hi.responseBuilder.speak(`You already have the yearly plan. Say bonus round to play.`).reprompt('Say bonus round to play.').getResponse();
      }
      return hi.responseBuilder
        .speak(`You're on the monthly plan. To switch to yearly, first say cancel my subscription; the monthly plan keeps working until the end of the month you've paid for. Then say buy the yearly plan.`)
        .reprompt('Say bonus round to play.').getResponse();
    }
    const annual = annualFor(product);
    if (annual) return connections(hi, 'Buy', annual.productId, { type: 'bonus' });
    if (isPurchasable(product)) {
      setSession(hi, { s: 'buy' });
      return hi.responseBuilder.speak('The yearly plan isn\'t available on this account, but the monthly plan is. Want that?').reprompt('Want the monthly plan?').getResponse();
    }
    return hi.responseBuilder.speak(`${PREMIUM_NAME} isn't available on this account.`).withShouldEndSession(true).getResponse();
  },
};

const WhatCanIBuyHandler = {
  canHandle: (hi) => intentIs(hi, 'WhatCanIBuyIntent'),
  async handle(hi) {
    const product = await getProduct(hi);
    if (isEntitled(product)) {
      setSession(hi, { s: 'bonusOffer' });
      return hi.responseBuilder.speak(`You have ${PREMIUM_NAME}, so bonus rounds are unlimited. Want one now?`).reprompt('Want a bonus round?').getResponse();
    }
    if (!canBuy(product)) {
      return hi.responseBuilder.speak('There\'s nothing to buy on this account right now. The daily question is free.').withShouldEndSession(true).getResponse();
    }
    setSession(hi, { s: 'buy' });
    const yearly = annualFor(product) && isPurchasable(product)
      ? ' There\'s a monthly plan that starts with a free week, and a yearly plan that costs about half as much over a year. For the yearly one, say buy the yearly plan.'
      : '';
    return hi.responseBuilder
      .speak(`${PREMIUM_NAME} adds bonus rounds for everyone in the house: five questions at a time in history, science, sports, food, and more, as many as you like.${yearly} Want to subscribe?`)
      .reprompt(`Want to subscribe to ${PREMIUM_NAME}?`).getResponse();
  },
};

const CancelSubscriptionHandler = {
  canHandle: (hi) => intentIs(hi, 'CancelSubscriptionIntent'),
  async handle(hi) {
    const product = await getProduct(hi);
    if (!product) return hi.responseBuilder.speak('There is no subscription to cancel on this account.').withShouldEndSession(true).getResponse();
    const target = product.owned || (product.productId ? product : product.annual);
    return connections(hi, 'Cancel', target.productId, {});
  },
};

const PurchaseResponseHandler = {
  canHandle: (hi) => reqType(hi) === 'Connections.Response',
  async handle(hi) {
    const r = hi.requestEnvelope.request;
    let tok = {};
    try { tok = JSON.parse(r.token || '{}') || {}; } catch (e) { tok = {}; }
    const ok = r.status && Number(r.status.code) === 200;
    const result = r.payload && r.payload.purchaseResult;
    const ctx = await load(hi);
    setSession(hi, { s: 'who' });
    if (!ok || result === 'ERROR') {
      console.log('Connections.Response error', JSON.stringify(r.status), JSON.stringify(r.payload));
      return hi.responseBuilder.speak(`Purchasing isn't available right now. The daily question is still free. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
    }
    if (r.name === 'Cancel') return closing(hi, 'Okay. ');
    if (result === 'ACCEPTED' || result === 'ALREADY_PURCHASED') {
      const player = (tok.p && g.findPlayer(ctx.state, tok.p)) || currentPlayer(hi, ctx);
      if (player) return startBonus(hi, player, tok.cat || null, 'You\'re all set! ');
      setSession(hi, { s: 'who', pending: { type: 'bonus', cat: tok.cat || null } });
      return hi.responseBuilder.speak(`You're all set! ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
    }
    return hi.responseBuilder.speak(`No problem. Today's question is free. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const HelpHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.HelpIntent'),
  async handle(hi) {
    const ctx = await load(hi);
    const product = await getProduct(hi);
    const ss = session(hi);
    if (ss.s === 'answer') {
      return hi.responseBuilder.speak('Say the letter, A, B, or C, or say the answer itself. You can also say repeat, or I don\'t know.')
        .reprompt('Say A, B, or C.').getResponse();
    }
    const prem = isEntitled(product) ? ' You have Premium, so say bonus round anytime for five more questions.'
      : (canBuy(product) ? ` With ${PREMIUM_NAME}, you can also play bonus rounds; say what can I buy to hear more.` : '');
    setSession(hi, { s: 'who' });
    return hi.responseBuilder
      .speak(`Each player gets one new question a day. Answer with the letter or the answer. Getting it right earns a point for the week, and playing every day builds your streak. Say who's winning to hear the scores, add a player, or give a player easier questions.${prem} ${whoPrompt(ctx.state)}`)
      .reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const StopHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.StopIntent', 'AMAZON.CancelIntent', 'AMAZON.NavigateHomeIntent'),
  handle: (hi) => hi.responseBuilder.speak('Thanks for playing. See you tomorrow!').withShouldEndSession(true).getResponse(),
};

const FallbackHandler = {
  canHandle: (hi) => intentIs(hi, 'AMAZON.FallbackIntent'),
  async handle(hi) {
    const ss = session(hi);
    if (ss.s === 'answer') return judge(hi, -1);
    const ctx = await load(hi);
    if (ss.s === 'easy') {
      return hi.responseBuilder.speak(`Should ${ss.newName || 'this player'} get easier questions? Say yes or no.`).reprompt('Yes or no?').getResponse();
    }
    setSession(hi, { s: 'who' });
    return hi.responseBuilder.speak(`Sorry, I didn't get that. ${whoPrompt(ctx.state)}`).reprompt(whoPrompt(ctx.state)).getResponse();
  },
};

const SessionEndedHandler = {
  canHandle: (hi) => reqType(hi) === 'SessionEndedRequest',
  handle: (hi) => hi.responseBuilder.getResponse(),
};

const ErrorHandler = {
  canHandle: () => true,
  handle(hi, error) {
    console.log('Error:', error && error.stack);
    return hi.responseBuilder.speak('Sorry, something went wrong. Please try again.').reprompt('Say a player\'s name to play.').getResponse();
  },
};

const handlers = [
  LaunchHandler, AnswerHandler, NameHandler, DontKnowHandler, YesHandler, NoHandler, BonusHandler, LeaderboardHandler,
  PlayersHandler, AddPlayerHandler, RemovePlayerHandler, LevelHandler, ResetHandler, CategoriesHandler, RepeatHandler,
  BuyHandler, BuyAnnualHandler, WhatCanIBuyHandler, CancelSubscriptionHandler, PurchaseResponseHandler,
  HelpHandler, StopHandler, FallbackHandler, SessionEndedHandler,
];

function persistenceAdapter() {
  const table = process.env.DYNAMODB_PERSISTENCE_TABLE_NAME;
  if (!table) return null;
  const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
  const AWS = require('aws-sdk');
  return new DynamoDbPersistenceAdapter({
    tableName: table,
    createTable: false,
    dynamoDBClient: new AWS.DynamoDB({ apiVersion: 'latest', region: process.env.DYNAMODB_PERSISTENCE_REGION }),
  });
}

exports.deps = deps;
exports.handlers = handlers;
exports.ErrorHandler = ErrorHandler;
const builder = Alexa.SkillBuilders.custom()
  .addRequestHandlers(...handlers)
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient());
const pa = persistenceAdapter();
if (pa) builder.withPersistenceAdapter(pa);
exports.handler = builder.lambda();
