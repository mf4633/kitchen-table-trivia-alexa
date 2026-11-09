'use strict';
// Runs the real handlers through ask-sdk-core with a fake Alexa API client
// (ISP + time zone) and an in-memory persistence adapter.
// Run: cd lambda && npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const Alexa = require(path.join(__dirname, '../lambda/node_modules/ask-sdk-core'));
const skillMod = require('../lambda/index.js');
const g = require('../lambda/src/game.js');
const bank = require('../lambda/src/bank.js');

const TZ = 'America/Chicago';
const DAY = 86400e3;
// Wednesday 2026-11-11, 7 pm Central.
const T0 = Date.UTC(2026, 10, 12, 1, 0, 0);
let now = T0;
skillMod.deps.now = () => now;

const MONTHLY = { productId: 'amzn1.adg.product.m', referenceName: 'premium', entitled: 'NOT_ENTITLED', purchasable: 'PURCHASABLE' };
const YEARLY = { productId: 'amzn1.adg.product.y', referenceName: 'premium_annual', entitled: 'NOT_ENTITLED', purchasable: 'PURCHASABLE' };
const FREE = [MONTHLY, YEARLY];
const SUB = [{ ...MONTHLY, entitled: 'ENTITLED', purchasable: 'NOT_PURCHASABLE' }, YEARLY];
const YEAR_SUB = [{ ...MONTHLY, purchasable: 'NOT_PURCHASABLE' }, { ...YEARLY, entitled: 'ENTITLED', purchasable: 'NOT_PURCHASABLE' }];

function memoryAdapter(store = {}) {
  return {
    store,
    getAttributes: async (env) => JSON.parse(JSON.stringify(store[env.context.System.user.userId] || {})),
    saveAttributes: async (env, attrs) => { store[env.context.System.user.userId] = JSON.parse(JSON.stringify(attrs)); },
    deleteAttributes: async (env) => { delete store[env.context.System.user.userId]; },
  };
}

function buildSkill(products, adapter) {
  const apiClient = {
    invoke: async (req) => {
      if (req.url.includes('/inSkillProducts')) {
        if (products === 'fail') return { statusCode: 500, headers: [], body: '{}' };
        return { statusCode: 200, headers: [], body: JSON.stringify({ inSkillProducts: products || [], isTruncated: false }) };
      }
      if (req.url.includes('/settings/System.timeZone')) return { statusCode: 200, headers: [], body: JSON.stringify(TZ) };
      return { statusCode: 404, headers: [], body: '{}' };
    },
  };
  return Alexa.SkillBuilders.custom()
    .addRequestHandlers(...skillMod.handlers)
    .addErrorHandlers(skillMod.ErrorHandler)
    .withApiClient(apiClient)
    .withPersistenceAdapter(adapter)
    .create();
}

function envelope(request, { session, person } = {}) {
  const System = {
    application: { applicationId: 'a' }, user: { userId: 'house-1' }, device: { deviceId: 'd', supportedInterfaces: {} },
    apiEndpoint: 'https://api.amazonalexa.com', apiAccessToken: 't',
  };
  if (person) System.person = { personId: person };
  return {
    version: '1.0',
    session: { new: false, sessionId: 's', application: { applicationId: 'a' }, user: { userId: 'house-1' }, attributes: session || {} },
    context: { System },
    request: { requestId: 'r', timestamp: new Date(now).toISOString(), locale: 'en-US', ...request },
  };
}

const intent = (name, slots = {}) => ({
  type: 'IntentRequest',
  intent: {
    name,
    confirmationStatus: 'NONE',
    slots: Object.fromEntries(Object.entries(slots).map(([k, v]) => {
      if (v && typeof v === 'object') return [k, { name: k, value: v.value, resolutions: { resolutionsPerAuthority: [{ status: { code: 'ER_SUCCESS_MATCH' }, values: [{ value: { name: v.value, id: v.id } }] }] } }];
      return [k, { name: k, value: v, confirmationStatus: 'NONE' }];
    })),
  },
});

/** A conversation: carries session attributes from turn to turn, like Alexa does. */
function household({ products = FREE, store = {}, person } = {}) {
  const adapter = memoryAdapter(store);
  let session = {};
  const h = {
    adapter,
    store,
    async say(request, opts = {}) {
      const out = await buildSkill(opts.products || h.products, adapter).invoke(envelope(request, { session, person: opts.person || person }));
      session = out.sessionAttributes || {};
      if (out.response.shouldEndSession) session = {};
      h.last = out.response;
      return out.response;
    },
    get session() { return session; },
    state: () => store['house-1'],
    products,
  };
  return h;
}

const speech = (r) => (r.outputSpeech && r.outputSpeech.ssml) || '';
const directive = (r, type) => (r.directives || []).find((d) => d.type === type);

/** The right/wrong letter for whatever question the session is waiting on. */
function letterFor(h, right = true) {
  const q = bank.get(h.session.q.id);
  const { correct } = bank.choicesFor(q);
  return g.LETTERS[right ? correct : (correct + 1) % 3];
}

test.beforeEach(() => { now = T0; });

// ------------------------------------------------------------- pure logic

test('day numbers follow the household time zone, and weeks start Monday', () => {
  const d = g.dayNum(T0, TZ);                                  // Wed Nov 11 locally (Nov 12 UTC)
  assert.equal(new Date(d * DAY).toISOString().slice(0, 10), '2026-11-11');
  assert.equal(g.dayNum(T0, 'UTC'), d + 1);
  const mon = g.dayNum(Date.UTC(2026, 10, 9, 15), TZ);
  const sun = g.dayNum(Date.UTC(2026, 10, 15, 15), TZ);
  assert.equal(g.weekOf(mon), g.weekOf(sun));
  assert.equal(g.weekOf(sun + 1), g.weekOf(mon) + 1);
});

test('answer matching: letters, text, near-misses, and no false hits', () => {
  const ch = ['Saturn', 'Jupiter', 'Mars'];
  const cases = { b: 1, bee: 1, 'is it jupiter': 1, jupitor: 1, a: 0, 'option c': 2, "it's a": 0, 'the second one': 1, saturn: 0, banana: -1, '': -1 };
  for (const [raw, want] of Object.entries(cases)) assert.equal(g.matchChoice(raw, ch), want, raw);
  assert.equal(g.matchChoice('twelve', ['12', '14', '16']), 0);
  assert.equal(g.matchChoice('c', ['Au', 'Ag', 'Gd']), 2);
  assert.equal(g.matchChoice('superior', ['Lake Superior', 'Lake Michigan', 'Lake Huron']), 0);
  assert.equal(g.matchChoice('lake', ['Lake Superior', 'Lake Michigan', 'Lake Huron']), -1, 'ambiguous');
  assert.equal(g.matchChoice('one', ['One', 'Two', 'Three']), 0, 'letters off when a choice is a number word');
  assert.equal(g.matchChoice('washington dc', ['Washington, D.C.', 'New York City', 'Philadelphia']), 0);
});

test('every question in the bank is answerable by its own text and by its letter', () => {
  for (const q of bank.ALL) {
    const { choices, correct } = bank.choicesFor(q);
    assert.equal(new Set(choices.map(g.normalize)).size, 3, `distinct choices: ${q.q}`);
    for (let i = 0; i < 3; i++) assert.equal(g.matchChoice(choices[i], choices), i, `${q.q} -> ${choices[i]}`);
    assert.equal(choices[correct], q.a);
    assert.ok(q.q.endsWith('?'), `question mark: ${q.q}`);
    assert.ok(!/[<>]/.test(q.q + q.a + q.wrong.join('')), `no SSML-breaking characters: ${q.q}`);
  }
});

test('the correct answer is spread across A, B, and C', () => {
  const counts = [0, 0, 0];
  for (const q of bank.ALL) counts[bank.choicesFor(q).correct] += 1;
  for (const c of counts) assert.ok(c > bank.ALL.length * 0.22, JSON.stringify(counts));
});

test('daily question: same for everyone at a level on a day, different the next day', () => {
  const d = g.dayNum(T0, TZ);
  assert.equal(bank.daily('regular', d).id, bank.daily('regular', d).id);
  assert.notEqual(bank.daily('regular', d).id, bank.daily('regular', d + 1).id);
  assert.equal(bank.daily('easy', d).level, 'easy');
  // A full cycle visits every question once.
  const n = bank.ALL.filter((q) => q.level === 'regular').length;
  assert.equal(new Set(Array.from({ length: n }, (_, i) => bank.daily('regular', d + i).id)).size, n);
});

test('streaks count consecutive days played; points count correct answers', () => {
  const st = {};
  const p = g.addPlayer(st, 'sam');
  assert.equal(p.name, 'Sam');
  const d = 20000;
  g.recordDaily(p, d, 'q1', true);
  g.recordDaily(p, d, 'q1', false);                            // second answer same day ignored
  g.recordDaily(p, d + 1, 'q2', false);
  assert.equal(p.streak, 2);
  assert.equal(g.liveStreak(p, d + 2), 2);
  assert.equal(g.liveStreak(p, d + 3), 0, 'a missed day ends it');
  g.recordDaily(p, d + 3, 'q3', true);
  assert.equal(p.streak, 1);
  assert.equal(p.best, 2);
});

test('bonus draws skip today and prefer unseen questions', () => {
  const today = bank.daily('regular', 20000);
  const first = bank.bonus('regular', 'history', 5, [], [today.id], 's');
  assert.equal(first.length, 5);
  assert.ok(first.every((q) => q.cat === 'history' && q.id !== today.id));
  const second = bank.bonus('regular', 'history', 5, first.map((q) => q.id), [today.id], 's2');
  assert.equal(second.filter((q) => first.includes(q)).length, 0);
  assert.equal(bank.categoryFrom('American history'), 'history');
  assert.equal(bank.categoryFrom('mixed'), null);
});

// ------------------------------------------------------------- conversations

test('first launch: name, level, today\'s question, right answer, streak, done -> board', async () => {
  const h = household();
  let r = await h.say({ type: 'LaunchRequest' });
  assert.match(speech(r), /What's the first player's name/);
  r = await h.say(intent('NameIntent', { name: 'sam' }));
  assert.match(speech(r), /Should Sam get easier questions/);
  r = await h.say(intent('AMAZON.NoIntent'));
  assert.match(speech(r), /Here's today's question for Sam/);
  assert.match(speech(r), /A: .* B: .* C: /);
  const dyn = directive(r, 'Dialog.UpdateDynamicEntities');
  assert.deepEqual(dyn.types[0].values.map((v) => v.id), ['A', 'B', 'C']);
  assert.equal(h.session.s, 'answer');

  r = await h.say(intent('AnswerIntent', { choice: { value: letterFor(h).toLowerCase(), id: letterFor(h) } }));
  assert.match(speech(r), /right|Correct|got it|that's it|Nailed/i);
  assert.match(speech(r), /Your streak starts today/);
  assert.equal(h.state().players[0].week.pts, 1);

  r = await h.say(intent('DoneIntent'));
  assert.match(speech(r), /Sam, you have 1 point this week/);
  assert.equal(r.shouldEndSession, true);
});

test('answering by text via dynamic entity, and a wrong answer reveals the right one', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const q = bank.get(h.session.q.id);
  const { choices, correct } = bank.choicesFor(q);
  const wrong = (correct + 1) % 3;
  const r = await h.say(intent('AnswerIntent', { choice: { value: choices[wrong], id: g.LETTERS[wrong] } }));
  assert.match(speech(r), new RegExp(`Not quite. It's ${g.LETTERS[correct]}`));
  assert.equal(h.state().players[0].week.pts, 0);
  assert.equal(h.state().players[0].streak, 1, 'playing counts for the streak even when wrong');
});

test('unclear answer re-asks without scoring; I don\'t know reveals and records', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  let r = await h.say(intent('AnswerIntent', { choice: 'purple elephant' }));
  assert.match(speech(r), /didn't catch that/);
  assert.equal(h.session.s, 'answer');
  assert.equal(h.state().players[0].daily, null);
  r = await h.say(intent('DontKnowIntent'));
  assert.match(speech(r), /No worries. It's [ABC]/);
  assert.equal(h.state().players[0].daily.ok, false);
});

test('second player gets easier questions; "who\'s next" names who hasn\'t played', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  let r = await h.say(intent('AnswerIntent', { choice: 'Alex' }));       // a name heard as AnswerIntent
  assert.match(speech(r), /Should Alex get easier questions/);
  r = await h.say(intent('AMAZON.YesIntent'));
  assert.match(speech(r), /Alex will get easier questions/);
  const q = bank.get(h.session.q.id);
  assert.equal(q.level, 'easy');
  assert.equal(q.id, bank.daily('easy', g.dayNum(now, TZ)).id);
  r = await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h, false) } }));
  assert.match(speech(r), /Anyone else/);
  r = await h.say(intent('DoneIntent'));
  assert.match(speech(r), /This week, Sam leads with 1 point/);
});

test('coming back the same day: already answered; next day: new question and a 2-day streak', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const first = h.session.q.id;
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  await h.say(intent('DoneIntent'));

  let r = await h.say({ type: 'LaunchRequest' });
  assert.match(speech(r), /Who's playing\? Sam, or someone new/);
  r = await h.say(intent('NameIntent', { name: 'Sam' }));
  assert.match(speech(r), /already answered today's question and got it right/);

  now = T0 + DAY;
  await h.say({ type: 'LaunchRequest' });
  r = await h.say(intent('NameIntent', { name: 'sam' }));
  assert.notEqual(h.session.q.id, first);
  r = await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  assert.match(speech(r), /That's 2 days in a row/);
});

test('recognized voice is linked on first play and greeted by name after', async () => {
  const h = household({ person: 'amzn1.ask.person.SAM' });
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  assert.equal(h.state().people['amzn1.ask.person.SAM'], 'Sam');
  now = T0 + DAY;
  const r = await h.say({ type: 'LaunchRequest' });
  assert.match(speech(r), /Welcome back, Sam. Here's today's question for Sam/);
});

test('Monday recap names last week\'s winner once', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  now = T0 + 5 * DAY;                                                    // the next Monday
  let r = await h.say({ type: 'LaunchRequest' });
  assert.match(speech(r), /Last week's winner was Sam, with 1 point/);
  r = await h.say({ type: 'LaunchRequest' });
  assert.doesNotMatch(speech(r), /Last week/);
});

test('leaderboard, players list, level change, remove', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  await h.say(intent('AddPlayerIntent', { name: 'Jo' }));
  await h.say(intent('AMAZON.YesIntent'));
  let r = await h.say(intent('LeaderboardIntent'));
  assert.match(speech(r), /Sam leads with 1 point/);
  r = await h.say(intent('ListPlayersIntent'));
  assert.match(speech(r), /The players are Sam and Jo. Jo gets easier questions/);
  r = await h.say(intent('SetLevelIntent', { name: 'Jo', level: { value: 'regular', id: 'regular' } }));
  assert.match(speech(r), /Jo will get regular questions/);
  assert.equal(h.state().players[1].easy, false);
  r = await h.say(intent('RemovePlayerIntent', { name: 'Jo' }));
  assert.match(speech(r), /removed Jo/);
  assert.equal(h.state().players.length, 1);
});

test('free household: bonus round triggers the monthly Upsell, carrying player and category', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  const r = await h.say(intent('BonusRoundIntent', { category: { value: 'history', id: 'history' } }));
  const d = directive(r, 'Connections.SendRequest');
  assert.equal(d.name, 'Upsell');
  assert.equal(d.payload.InSkillProduct.productId, MONTHLY.productId);
  assert.deepEqual(JSON.parse(d.token), { type: 'bonus', cat: 'history', p: 'Sam' });
});

test('upsell accepted starts the round it was for', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const r = await h.say({
    type: 'Connections.Response', name: 'Upsell', status: { code: '200', message: 'OK' },
    payload: { purchaseResult: 'ACCEPTED' }, token: JSON.stringify({ type: 'bonus', cat: 'science', p: 'Sam' }),
  }, { products: SUB });
  assert.match(speech(r), /You're all set! Here's a science bonus round for Sam/);
  assert.equal(bank.get(h.session.q.id).cat, 'science');
});

test('subscriber: 5-question round, scored, then another round', async () => {
  const h = household({ products: YEAR_SUB });
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  const todayId = h.state().players[0].daily.qid;
  let r = await h.say(intent('BonusRoundIntent', { category: { value: 'space', id: 'space' } }));
  assert.match(speech(r), /space bonus round for Sam: 5 questions. Question 1/);
  const asked = [];
  for (let i = 0; i < 5; i++) {
    asked.push(h.session.q.id);
    r = await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h, i !== 2) } }));
  }
  assert.match(speech(r), /Sam got 4 out of 5/);
  assert.equal(new Set(asked).size, 5);
  assert.ok(!asked.includes(todayId));
  assert.equal(h.state().players[0].week.pts, 1, 'bonus rounds do not change the weekly board');
  r = await h.say(intent('AMAZON.YesIntent'));
  assert.match(speech(r), /bonus round for Sam/);
  assert.ok(!asked.includes(h.session.q.id), 'next round starts with unseen questions');
});

test('subscriber who already answered is offered a bonus round', async () => {
  const h = household({ products: SUB });
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  await h.say(intent('DoneIntent'));
  await h.say({ type: 'LaunchRequest' });
  const r = await h.say(intent('NameIntent', { name: 'Sam' }));
  assert.match(speech(r), /Want a bonus round/);
});

test('closing pitch: free households hear it once a day; subscribers never', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('AnswerIntent', { choice: { value: 'x', id: letterFor(h) } }));
  let r = await h.say(intent('DoneIntent'));
  assert.match(speech(r), /bonus rounds anytime/);
  await h.say({ type: 'LaunchRequest' });
  r = await h.say(intent('DoneIntent'));
  assert.doesNotMatch(speech(r), /bonus rounds anytime/);
  const s = household({ products: SUB });
  await s.say({ type: 'LaunchRequest' });
  await s.say(intent('NameIntent', { name: 'Sam' }));
  await s.say(intent('AMAZON.NoIntent'));
  r = await s.say(intent('AMAZON.NoIntent'));                            // "no" during a question = unclear
  r = await s.say(intent('DontKnowIntent'));
  r = await s.say(intent('DoneIntent'));
  assert.doesNotMatch(speech(r), /bonus rounds anytime/);
});

test('buy / buy yearly / what can I buy / cancel target the right plan', async () => {
  const h = household();
  let r = await h.say(intent('BuyIntent'));
  assert.equal(directive(r, 'Connections.SendRequest').payload.InSkillProduct.productId, MONTHLY.productId);
  r = await h.say(intent('BuyAnnualIntent'));
  assert.equal(directive(r, 'Connections.SendRequest').payload.InSkillProduct.productId, YEARLY.productId);
  r = await h.say(intent('WhatCanIBuyIntent'));
  assert.match(speech(r), /yearly plan that costs about half/);
  r = await h.say(intent('BuyAnnualIntent'), { products: SUB });
  assert.match(speech(r), /cancel my subscription/);
  r = await h.say(intent('CancelSubscriptionIntent'), { products: YEAR_SUB });
  assert.equal(directive(r, 'Connections.SendRequest').payload.InSkillProduct.productId, YEARLY.productId);
  r = await h.say(intent('CancelSubscriptionIntent'), { products: SUB });
  assert.equal(directive(r, 'Connections.SendRequest').payload.InSkillProduct.productId, MONTHLY.productId);
});

test('ISP outage never unlocks bonus rounds', async () => {
  const h = household({ products: 'fail' });
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const r = await h.say(intent('BonusRoundIntent'));
  assert.equal(directive(r, 'Connections.SendRequest'), undefined);
  assert.match(speech(r), /isn't available on this account/);
});

test('repeat, help, fallback, stop, and session end all respond sensibly', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const id = h.session.q.id;
  let r = await h.say(intent('AMAZON.RepeatIntent'));
  assert.equal(h.session.q.id, id);
  assert.match(speech(r), /A: /);
  r = await h.say(intent('AMAZON.HelpIntent'));
  assert.match(speech(r), /Say the letter/);
  r = await h.say(intent('AMAZON.FallbackIntent'));
  assert.match(speech(r), /didn't catch that/);
  r = await h.say(intent('AMAZON.StopIntent'));
  assert.equal(r.shouldEndSession, true);
  r = await h.say({ type: 'SessionEndedRequest', reason: 'USER_INITIATED' });
  assert.equal(r.outputSpeech, undefined);
  r = await h.say(intent('AMAZON.HelpIntent'));
  assert.match(speech(r), /one new question a day/);
});

test('a first-name answer during a question is judged as an answer', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  const r = await h.say(intent('NameIntent', { name: 'Zebulon' }));
  assert.match(speech(r), /didn't catch that/);
  assert.equal(h.session.s, 'answer');
});

test('reset asks first; yes deletes everything, no keeps it', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  await h.say(intent('NameIntent', { name: 'Sam' }));
  await h.say(intent('AMAZON.NoIntent'));
  await h.say(intent('DontKnowIntent'));
  let r = await h.say(intent('ResetIntent'));
  assert.match(speech(r), /Are you sure/);
  r = await h.say(intent('AMAZON.NoIntent'));
  assert.match(speech(r), /nothing was deleted/);
  assert.equal(h.state().players.length, 1);
  await h.say(intent('ResetIntent'));
  r = await h.say(intent('AMAZON.YesIntent'));
  assert.match(speech(r), /deleted every player/);
  assert.equal(h.state(), undefined);
});

test('eight-player cap', async () => {
  const h = household();
  await h.say({ type: 'LaunchRequest' });
  for (const n of ['Ann', 'Ben', 'Cal', 'Dee', 'Eve', 'Fay', 'Gus', 'Hal']) {
    await h.say(intent('AddPlayerIntent', { name: n }));
    await h.say(intent('AMAZON.NoIntent'));
    await h.say(intent('DontKnowIntent'));
  }
  const r = await h.say(intent('AddPlayerIntent', { name: 'Ivy' }));
  assert.match(speech(r), /already has 8 players/);
});

test('model, manifest, and ISPs agree with the code', () => {
  const lm = require('../skill-package/interactionModels/custom/en-US.json').interactionModel.languageModel;
  const names = new Set(lm.intents.map((i) => i.name));
  for (const n of ['AnswerIntent', 'NameIntent', 'DontKnowIntent', 'DoneIntent', 'BonusRoundIntent', 'LeaderboardIntent', 'ListPlayersIntent',
    'AddPlayerIntent', 'RemovePlayerIntent', 'SetLevelIntent', 'CategoriesIntent', 'BuyIntent', 'BuyAnnualIntent', 'WhatCanIBuyIntent',
    'CancelSubscriptionIntent', 'ResetIntent', 'AMAZON.RepeatIntent']) assert.ok(names.has(n), n);
  const all = lm.intents.flatMap((i) => i.samples.map((s) => s.toLowerCase()));
  assert.equal(new Set(all).size, all.length, 'no sample appears twice across intents');
  for (const s of all) assert.ok(!/\d/.test(s.replace(/\{[^}]*\}/g, '')), `no digits in samples: ${s}`);
  const cats = lm.types.find((t) => t.name === 'CATEGORY').values.map((v) => v.id).filter((id) => id !== 'mixed');
  assert.deepEqual(cats.sort(), Object.keys(bank.CATEGORY_NAMES).sort());
  const m = require('../skill-package/skill.json').manifest;
  assert.equal(m.privacyAndCompliance.isChildDirected, false);
  assert.deepEqual(m.permissions, [{ name: 'alexa::person_id:read' }]);
  const mon = require('../skill-package/isps/subscription/premium.json').inSkillProductDefinition;
  const yr = require('../skill-package/isps/subscription/premium_annual.json').inSkillProductDefinition;
  assert.equal(mon.referenceName, 'premium');
  assert.equal(yr.referenceName, 'premium_annual');
  const price = (d) => d.publishingInformation.pricing['amazon.com'].defaultPriceListing.price;
  assert.ok(price(yr) <= 0.55 * 12 * price(mon), '"about half" as spoken');
});
