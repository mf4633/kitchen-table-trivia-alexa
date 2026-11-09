// Writes skill-package/interactionModels/custom/en-US.json. Run: node scripts/gen-model.js
const fs = require('fs');
const path = require('path');

const v = (id, value, synonyms = []) => ({ id, name: { value, synonyms } });
const intent = (name, samples, slots = []) => ({ name, slots, samples });
const builtins = ['AMAZON.HelpIntent', 'AMAZON.StopIntent', 'AMAZON.CancelIntent', 'AMAZON.NavigateHomeIntent', 'AMAZON.FallbackIntent',
  'AMAZON.YesIntent', 'AMAZON.NoIntent', 'AMAZON.RepeatIntent'].map((n) => ({ name: n, samples: [] }));
const choice = [{ name: 'choice', type: 'CHOICE' }];
const nameSlot = [{ name: 'name', type: 'AMAZON.FirstName' }];

const model = {
  interactionModel: {
    languageModel: {
      invocationName: 'kitchen table trivia',
      intents: [
        ...builtins,
        intent('AnswerIntent', ['{choice}', 'is it {choice}', "it's {choice}", "I think it's {choice}", 'I think {choice}', 'my answer is {choice}',
          'the answer is {choice}', "I'll say {choice}", 'I say {choice}', 'letter {choice}', 'option {choice}', 'answer {choice}',
          "I'll go with {choice}", 'go with {choice}', '{choice} is my answer', 'final answer {choice}', 'I guess {choice}'], choice),
        intent('NameIntent', ['{name}', "I'm {name}", 'this is {name}', 'my name is {name}', '{name} is playing', "{name}'s turn",
          "it is {name}'s turn", '{name} here', 'call me {name}', "it's {name}'s turn", 'now {name}', '{name} wants to play', '{name} is next',
          'next is {name}'], nameSlot),
        intent('AddPlayerIntent', ['add {name}', 'add a player named {name}', 'add player {name}', 'new player {name}', 'add {name} to the game',
          'add a new player named {name}'], nameSlot),
        intent('RemovePlayerIntent', ['remove {name}', 'remove player {name}', 'delete {name}', 'take {name} out of the game',
          'remove {name} from the game'], nameSlot),
        intent('SetLevelIntent', ['give {name} {level} questions', "make {name}'s questions {level}", 'set {name} to {level}',
          '{level} questions for {name}', 'switch {name} to {level} questions', 'change {name} to {level} questions',
          'give me {level} questions', 'switch to {level} questions'],
          [{ name: 'name', type: 'AMAZON.FirstName' }, { name: 'level', type: 'LEVEL' }]),
        intent('BonusRoundIntent', ['bonus round', 'play a bonus round', 'start a bonus round', 'give me a bonus round', 'more questions',
          'another round', 'play more', 'keep playing', 'a {category} round', '{category} round', 'play a {category} round',
          'bonus round on {category}', 'give me {category} questions', 'ask me {category} questions', 'play {category}', 'bonus {category}',
          'a {category} bonus round', '{category} bonus round', "let's do {category}", '{category} please', 'more trivia', 'ask me more'],
          [{ name: 'category', type: 'CATEGORY' }]),
        intent('LeaderboardIntent', ["who's winning", "what's the score", 'scores', 'the scores', 'leaderboard', 'the leaderboard',
          'how am I doing', 'what are the scores', 'who is in the lead', "who's ahead", "what's my streak", 'streaks', 'who is winning',
          'tell me the scores']),
        intent('ListPlayersIntent', ['list players', 'list the players', 'who are the players', 'which players are there', 'who plays',
          'tell me the players']),
        intent('ResetIntent', ['reset the game', 'delete everything', 'forget everyone', 'delete all players', 'start over from scratch',
          'erase all scores', 'delete all my data', 'forget all players']),
        intent('CategoriesIntent', ['what categories are there', 'list categories', 'which categories', 'what are the categories',
          'what topics are there', 'categories', 'what categories do you have']),
        intent('DontKnowIntent', ["I don't know", 'pass', 'skip', 'no idea', 'I have no idea', 'I give up', 'tell me the answer', "I'm not sure",
          'skip this one', "what's the answer", "I don't know the answer"]),
        intent('DoneIntent', ['done', "I'm done", "we're done", "that's all", "that's everyone", 'nobody', 'no one', 'no one else',
          'nobody else', 'finished', 'all done', 'we are done']),
        intent('BuyIntent', ['buy premium', 'subscribe', 'upgrade', 'get premium', 'buy kitchen table trivia premium', 'sign up for premium',
          'buy the subscription', 'start a free trial', 'start the free trial', 'buy the monthly plan']),
        intent('BuyAnnualIntent', ['buy the yearly plan', 'buy the annual plan', 'buy yearly', 'buy annual', 'get the yearly plan',
          'subscribe yearly', 'subscribe for a year', 'buy the yearly subscription', 'switch to yearly', 'switch to the yearly plan',
          'pay yearly']),
        intent('WhatCanIBuyIntent', ['what can I buy', 'what is premium', 'tell me about premium', 'what do I get with premium',
          'what does premium include', "what's in premium", 'what can I get']),
        intent('CancelSubscriptionIntent', ['cancel my subscription', 'cancel premium', 'unsubscribe', 'stop my subscription',
          'refund premium', 'I want a refund', 'end my subscription']),
      ],
      types: [
        { name: 'CHOICE', values: [
          v('A', 'a', ['ay', 'letter a', 'option a', 'the first one', 'first one', 'first', 'number one']),
          v('B', 'b', ['bee', 'be', 'letter b', 'option b', 'the second one', 'second one', 'second', 'number two']),
          v('C', 'c', ['see', 'sea', 'letter c', 'option c', 'the third one', 'third one', 'third', 'number three']),
        ] },
        { name: 'LEVEL', values: [
          v('easy', 'easier', ['easy', 'kids', 'kid', 'simpler', 'younger', 'simple']),
          v('regular', 'regular', ['harder', 'normal', 'grown up', 'adult', 'hard', 'grownup']),
        ] },
        { name: 'CATEGORY', values: [
          v('mixed', 'mixed', ['anything', 'everything', 'random', 'a mix', 'all categories', 'any']),
          v('general', 'general knowledge', ['general', 'general trivia']),
          v('history', 'history', ['historical', 'american history', 'world history']),
          v('science', 'science', ['the human body', 'chemistry', 'biology']),
          v('space', 'space', ['astronomy', 'planets', 'outer space', 'the solar system']),
          v('geography', 'geography', ['places', 'countries', 'maps', 'world geography', 'capitals']),
          v('animals', 'animals', ['nature', 'wildlife', 'animal']),
          v('sports', 'sports', ['sport']),
          v('food', 'food', ['food and drink', 'cooking', 'cuisine']),
          v('words', 'words', ['vocabulary', 'language', 'spelling', 'word']),
          v('music', 'music', ['musical', 'songs', 'composers', 'instruments']),
        ] },
      ],
    },
  },
};

fs.writeFileSync(path.join(__dirname, '../skill-package/interactionModels/custom/en-US.json'), `${JSON.stringify(model, null, 2)}\n`);
console.log('model written:', model.interactionModel.languageModel.intents.length, 'intents');
