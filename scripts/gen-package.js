// Writes skill.json, the two ISP definitions, and lambda/package.json. Run: node scripts/gen-package.js
const fs = require('fs');
const path = require('path');

const BASE = 'https://mf4633.github.io/kitchen-table-trivia-alexa';
const out = (rel, obj) => fs.writeFileSync(path.join(__dirname, '..', rel), `${JSON.stringify(obj, null, 2)}\n`);

out('lambda/package.json', {
  name: 'kitchen-table-trivia-alexa',
  version: '1.0.0',
  description: 'Alexa skill: a daily trivia question for each player in the house, with streaks and a weekly leaderboard',
  main: 'index.js',
  private: true,
  scripts: { test: 'node --test ../test/skill.test.js' },
  dependencies: {
    'ask-sdk-core': '^2.14.0',
    'ask-sdk-model': '^1.86.0',
    'ask-sdk-dynamodb-persistence-adapter': '^2.14.0',
  },
  license: 'MIT',
});

const description = [
  'One new trivia question a day for everyone in the house, and a weekly leaderboard to settle who knows the most.',
  '',
  'Each player answers today\'s question by name: "It\'s Sam." Everyone at the same level gets the same question, so you can compare at dinner. Get it right for a point; play every day to build your streak. On Monday, Alexa announces last week\'s winner.',
  '',
  'Younger players can get easier questions while the grown-ups get regular ones, on the same device. If you\'ve set up Alexa voice profiles and turn on personalization for this skill, Alexa can recognize who\'s playing on its own.',
  '',
  'Questions cover history, science, geography, space, animals, sports, food, music, words, and general knowledge. Answer with the letter, A, B, or C, or just say the answer.',
  '',
  'The daily question is free. Kitchen Table Trivia Premium adds bonus rounds for the whole household: five questions at a time, in any category, as many as you like. Monthly with a free week, or yearly.',
  '',
  'Try saying:',
  '- "Alexa, open Kitchen Table Trivia"',
  '- "Who\'s winning?"',
  '- "Add a player named Alex"',
  '- "Give Alex easier questions"',
  '- "Play a history round"',
].join('\n');

out('skill-package/skill.json', {
  manifest: {
    manifestVersion: '1.0',
    publishingInformation: {
      locales: {
        'en-US': {
          name: 'Kitchen Table Trivia',
          summary: 'A new trivia question every day for each player in the house, with streaks and a weekly leaderboard.',
          description,
          examplePhrases: [
            'Alexa, open Kitchen Table Trivia',
            "Alexa, ask Kitchen Table Trivia who's winning",
            'Alexa, ask Kitchen Table Trivia for a history round',
          ],
          keywords: ['trivia', 'family', 'quiz', 'daily question', 'game', 'leaderboard', 'streak', 'household', 'history',
            'science', 'geography'],
          smallIconUri: `${BASE}/icon-108.png`,
          largeIconUri: `${BASE}/icon-512.png`,
        },
      },
      isAvailableWorldwide: false,
      distributionCountries: ['US'],
      testingInstructions: [
        'Say "open Kitchen Table Trivia". With no players yet, it asks for a name: say "Sam", then "no" (regular questions).',
        "Today's question follows; answer with a letter (\"B\") or the answer text. It confirms, gives the streak, and asks who's next.",
        'Say "Alex", then "yes" (easier questions) to add a second player, who gets a question from the easier set.',
        'Say "done" to hear the weekly leaderboard. Reopening and saying "Sam" again says Sam has already answered today.',
        '"Who\'s winning" reads scores and streaks. "Give Alex regular questions" changes level. "Remove Alex" deletes a player.',
        'Premium: "play a history round" triggers the Upsell (monthly plan with a 7-day trial); accept it in the sandbox to play a 5-question round.',
        '"Buy the yearly plan" buys the yearly plan instead. "What can I buy" and "cancel my subscription" are supported.',
        'Personalization (alexa::person_id:read) is optional: a recognized voice is linked to the name it gives the first time, and is greeted by name afterward. Without it, players say their name.',
        'Data stored: first names the players give, their scores and streaks, and (if personalization is on) the person ID linked to each name. "Remove <name>" deletes a player.',
      ].join(' '),
      category: 'KNOWLEDGE_AND_TRIVIA',
    },
    apis: { custom: { endpoint: { sourceDir: 'lambda' } } },
    permissions: [{ name: 'alexa::person_id:read' }],
    privacyAndCompliance: {
      allowsPurchases: true,
      usesPersonalInfo: true,
      isChildDirected: false,
      isExportCompliant: true,
      containsAds: false,
      locales: { 'en-US': { privacyPolicyUrl: `${BASE}/privacy.html`, termsOfUseUrl: `${BASE}/terms.html` } },
    },
  },
});

function isp(ref, freq, price, name, summary, extra) {
  return {
    vendorId: '',
    inSkillProductDefinition: {
      version: '1.0',
      type: 'SUBSCRIPTION',
      referenceName: ref,
      purchasableState: 'PURCHASABLE',
      subscriptionInformation: { subscriptionPaymentFrequency: freq, subscriptionTrialPeriodDays: 7 },
      publishingInformation: {
        locales: {
          'en-US': {
            name,
            smallIconUri: `${BASE}/icon-108.png`,
            largeIconUri: `${BASE}/icon-512.png`,
            summary,
            description: `Bonus rounds for everyone in the house: five trivia questions at a time in history, science, geography, space, animals, sports, food, music, words, or a mix, as many as you like. The daily question and the leaderboard stay free.${extra}`,
            examplePhrases: ['Alexa, open Kitchen Table Trivia', freq === 'YEARLY' ? 'buy the yearly plan' : 'play a bonus round'],
            keywords: ['trivia', 'bonus round', 'family', 'quiz'],
            customProductPrompts: {
              purchasePromptDescription: `${name} adds unlimited five-question bonus rounds for the whole household, in any category.`,
              boughtCardDescription: `You now have ${name}. Say "bonus round" anytime.`,
            },
          },
        },
        distributionCountries: ['US'],
        pricing: { 'amazon.com': { releaseDate: '2026-11-09', defaultPriceListing: { price, currency: 'USD' } } },
        taxInformation: { category: 'INFORMATION_SERVICES' },
      },
      privacyAndCompliance: { locales: { 'en-US': { privacyPolicyUrl: `${BASE}/privacy.html` } } },
      testingInstructions: `Say "play a bonus round" (or "${freq === 'YEARLY' ? 'buy the yearly plan' : 'buy premium'}"). Either subscription (premium or premium_annual) unlocks bonus rounds.`,
    },
  };
}

out('skill-package/isps/subscription/premium.json',
  isp('premium', 'MONTHLY', 2.99, 'Kitchen Table Trivia Premium', 'Unlimited bonus rounds for the whole household.', ' Billed monthly after a free week.'));
out('skill-package/isps/subscription/premium_annual.json',
  isp('premium_annual', 'YEARLY', 14.99, 'Kitchen Table Trivia Premium (Yearly)', 'A year of unlimited bonus rounds for the whole household.',
    ' Billed yearly after a free week; about half the cost of twelve monthly payments.'));
console.log('wrote package.json, skill.json, 2 ISPs');
