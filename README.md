# Kitchen Table Trivia

An Alexa skill: one new trivia question a day for each player in the house, with streaks and a weekly leaderboard.

```
"Alexa, open Kitchen Table Trivia"          -> "Who's playing?"  -> "Sam" -> today's question
"B" / "Jupiter" / "I don't know"            -> right or wrong, fun fact, streak, "who's next?"
"Who's winning?"                            -> this week's points and streaks
"Give Alex easier questions"                -> per-player level
"Play a history round"                      -> Premium: 5-question bonus round
```

| Tier | What you get |
|---|---|
| Free | Daily question per player, streaks, weekly leaderboard, Monday winner recap |
| Premium ($2.99/mo or $14.99/yr, 7-day free trial) | Unlimited 5-question bonus rounds for the household, by category or mixed |

## How it works

- **Same question for everyone.** The daily pick is a fixed shuffle of the bank indexed by local day number, per level (regular / easier), so everyone in a household, and every household, hears the same question on the same day.
- **Answers.** Multiple choice. Each question pushes its three answers as dynamic entities (`Dialog.UpdateDynamicEntities`) so "Jupiter" resolves as well as "B"; `src/game.js:matchChoice` backs that up with letter forms, containment, and close spelling.
- **Names vs answers.** A bare word can arrive as `NameIntent` or `AnswerIntent`; the session state (`answer` vs `who`) decides which it is.
- **Voice recognition (optional).** With `alexa::person_id:read`, a recognized speaker's `personId` is linked to the name they first give and greeted by name after. Without it, players say their name.
- **Streaks** count consecutive days played (right or wrong), so kids don't lose a streak on a hard question. **Points** count correct daily answers. Bonus rounds don't touch the board.
- **State** lives in the Alexa-hosted DynamoDB table, keyed by the skill user ID (one household). "Remove Sam" and "reset the game" delete it.

## Layout

```
lambda/index.js          handlers
lambda/src/game.js       days, weeks, seeded shuffles, answer matching, streaks, board
lambda/src/bank.js       question parsing, daily pick, choice order, bonus draws
lambda/data/questions.js the bank (one line per question; rules at the top)
skill-package/           manifest, interaction model, ISPs (monthly + yearly)
scripts/gen-model.js     writes the interaction model
scripts/gen-package.js   writes skill.json, ISPs, package.json
docs/                    privacy, terms, icons (GitHub Pages)
test/skill.test.js       full conversations through ask-sdk-core with fake ISP/time zone and in-memory persistence
```

`cd lambda && npm test`

## Adding questions

Append lines to `lambda/data/questions.js`: `category|question?|right|wrong|wrong|optional fun fact`. The test suite checks every question is answerable by its own text and letter, has three distinct-sounding choices, and ends with a question mark. Facts must be stable and checkable; avoid "currently" and records likely to fall.
