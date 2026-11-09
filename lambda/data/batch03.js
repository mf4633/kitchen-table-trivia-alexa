'use strict';
// Batch 3 (2026-11-09). Same line format and rules as questions.js.

const regular = `
words|What is the opposite of brave?|Cowardly|Bold|Clever
words|Which word means to look at something very carefully?|Examine|Ignore|Wander
words|What does the prefix un mean, as in unhappy?|Not|Very|Again
words|What does the prefix re mean, as in redo?|Again|Never|Before
words|What does the suffix ful mean, as in hopeful?|Full of|Without|Less than
words|What is the plural of tooth?|Teeth|Tooths|Teeths
words|What do you call words spelled the same with different meanings, like bat the animal and a baseball bat?|Homonyms|Synonyms|Antonyms
words|Stories that are made up by the author are called what?|Fiction|Nonfiction|Biography
words|What is the story of a person's life, written by that same person, called?|An autobiography|A biography|An encyclopedia
words|What do you call a word that describes a noun, like blue or tall?|An adjective|An adverb|A verb
words|What do you call a word that describes a verb, like quickly?|An adverb|An adjective|A pronoun
words|Which of these words is a pronoun?|She|Run|Green
words|What is the opposite of expand?|Contract|Grow|Explode
words|What is a bibliophile?|A person who loves books|A person who collects coins|A person who studies birds
words|What does ambidextrous mean?|Able to use both hands equally well|Able to run very fast|Able to speak many languages
words|Which word means a fear of heights?|Acrophobia|Claustrophobia|Agoraphobia
words|What does it mean to procrastinate?|To put things off|To plan ahead|To work quickly
words|What do you call a new word made by rearranging the letters of another, like listen and silent?|An anagram|A palindrome|A crossword
words|What does it mean to hibernate?|To sleep through the winter|To fly south|To shed skin
words|What is a haiku?|A short Japanese poem|A Japanese sword|A kind of sushi
words|How many syllables does a traditional haiku have?|17|14|21|Five, then seven, then five.
words|What is a limerick?|A funny five-line poem|A long story poem|An Irish song
words|The sandwich is named after what?|An English earl|A beach|A baker|The Earl of Sandwich is said to have eaten meat between bread so he could keep playing cards.
words|The word robot comes from which language?|Czech|German|Russian|It first appeared in Karel Capek's 1920 play R.U.R.
words|What do the letters e.g. stand for?|For example|That is|And so on
words|What does i.e. mean?|That is|For example|In the end
words|What is a pseudonym?|A false name|A long word|A kind of poem
words|Which word means a group of three?|Trio|Duet|Quartet
words|Which of these words is spelled the same forward and backward?|Racecar|Raceway|Carrot
words|What does nostalgia mean?|A longing for the past|A fear of the future|A love of travel
words|Which word means to make something less severe?|Mitigate|Aggravate|Imitate
words|What is the opposite of an optimist?|A pessimist|A realist|An idealist

food|What kind of food is brie?|A cheese|A bread|A sausage
food|Gouda cheese comes from which country?|The Netherlands|Belgium|Denmark
food|What is the main ingredient in risotto?|Rice|Pasta|Potatoes
food|Which fruit is baked upside down in a classic French tarte Tatin?|Apples|Pears|Peaches
food|Gazpacho, the cold Spanish soup, is made mainly from what?|Tomatoes|Potatoes|Beans
food|Couscous is made from what?|Semolina wheat|Rice|Corn
food|Tiramisu is a dessert from which country?|Italy|France|Austria
food|Which nut is the main flavor in Nutella?|Hazelnuts|Almonds|Walnuts
food|Polenta is made from what?|Cornmeal|Rice flour|Potatoes
food|Indian dal is a dish made mainly from what?|Lentils|Rice|Potatoes
food|Bratwurst is a sausage from which country?|Germany|Italy|Spain
food|A dill pickle is usually made from which vegetable?|A cucumber|A zucchini|A carrot
food|Which pepper is hotter, a jalapeno or a habanero?|A habanero|A jalapeno|They're the same
food|Which spice is made from the dried bark of a tree?|Cinnamon|Nutmeg|Black pepper
food|Vanilla comes from which kind of plant?|An orchid|A lily|A palm
food|Pad thai comes from which country?|Thailand|Vietnam|Japan
food|Which ingredient surprises many people in Mexican mole poblano sauce?|Chocolate|Cheese|Ketchup
food|The bagel is traditionally traced to Jewish bakers in which country?|Poland|Germany|Italy
food|Which pasta is shaped like little bow ties?|Farfalle|Fusilli|Rigatoni
food|Which pasta is shaped like spirals?|Fusilli|Penne|Farfalle
food|What is the main ingredient in a quiche filling?|Eggs|Rice|Potatoes
food|In Britain, the herb Americans call cilantro is usually called what?|Coriander|Parsley|Basil
food|Which fruit is sometimes called the alligator pear?|The avocado|The kiwi|The guava
food|What kind of food is prosciutto?|Ham|Cheese|Bread
food|Which lettuce is used in a classic Caesar salad?|Romaine|Iceberg|Butter lettuce
food|Malt for Scotch whisky is usually made from which grain?|Barley|Corn|Rice
food|The Cavendish is the most common variety of which fruit?|The banana|The apple|The grape
food|What does a sommelier specialize in?|Wine|Cheese|Bread
food|Goulash is a stew from which country?|Hungary|Greece|Spain
food|What is the Japanese dish of thin slices of raw fish, served without rice?|Sashimi|Sushi|Tempura
food|Besides butter, what is the main ingredient in hollandaise sauce?|Egg yolks|Cream|Flour

sports|In which sport would you see a triple axel?|Figure skating|Gymnastics|Diving
sports|How many players does each rugby union team have on the field?|15|11|13
sports|How many innings are in a standard Major League Baseball game?|Nine|Seven|Ten
sports|In which game do you win by saying checkmate?|Chess|Checkers|Backgammon
sports|How far apart are the bases in Major League Baseball?|90 feet|60 feet|100 feet
sports|How high is a regulation basketball hoop?|10 feet|8 feet|12 feet
sports|The Davis Cup is a team competition in which sport?|Tennis|Golf|Sailing
sports|How many players does a cricket team have?|11|9|15
sports|In which sport do players shout fore as a warning?|Golf|Tennis|Archery
sports|What is the name of the trophy awarded to the Super Bowl winner?|The Vince Lombardi Trophy|The Stanley Cup|The Larry O'Brien Trophy
sports|Which boxer called himself The Greatest?|Muhammad Ali|Joe Frazier|George Foreman
sports|In which sport would you use a foil, an epee, or a sabre?|Fencing|Archery|Polo
sports|In doubles tennis, how many players are on each side?|Two|Four|Three
sports|The Masters tournament is played at Augusta National in which sport?|Golf|Tennis|Polo
sports|In basketball, how many points is a shot from behind the three-point line worth?|Three|Two|Four
sports|In American football, what is the area at each end of the field where touchdowns are scored?|The end zone|The pocket|The backfield
sports|Basketball was invented in 1891 in which U.S. state?|Massachusetts|New York|Kansas|James Naismith used peach baskets for hoops in Springfield.
sports|Who invented basketball?|James Naismith|Abner Doubleday|Walter Camp
sports|Which sport has lifts called the snatch and the clean and jerk?|Weightlifting|Wrestling|Rowing
sports|Including the goalie, how many players does each water polo team have in the water?|Seven|Six|Five
sports|Which horse race is nicknamed the Run for the Roses?|The Kentucky Derby|The Belmont Stakes|The Preakness Stakes
sports|Who has won the most Olympic gold medals of any athlete?|Michael Phelps|Usain Bolt|Carl Lewis|The swimmer won 23 golds across four Olympics.
sports|What sport did Serena Williams play?|Tennis|Golf|Basketball
sports|Which sport is raced on a banked oval track called a velodrome?|Track cycling|Speed skating|Horse racing
sports|The marathon recalls a legendary run from the town of Marathon to which city?|Athens|Sparta|Rome
sports|In golf, what is two strokes under par called?|An eagle|A birdie|A bogey
sports|The Fosbury flop is a technique in which event?|High jump|Pole vault|Diving
sports|Under the rules of golf, what is the most clubs a player may carry?|14|12|18
sports|In soccer, which player may use their hands inside their own penalty area?|The goalkeeper|The striker|The defender
sports|In American football, how many points is a safety worth?|Two|One|Three
sports|How many minutes long is each quarter of an NBA game?|12|10|15
sports|What does NBA stand for?|National Basketball Association|North Basketball Alliance|National Ball Association

history|Who was the first U.S. president born a citizen of the United States?|Martin Van Buren|John Quincy Adams|Andrew Jackson|Every president before him was born a British subject.
history|Which city was the first capital of the United States under the Constitution?|New York City|Philadelphia|Boston
history|Which war ended with the Treaty of Paris in 1783?|The American Revolutionary War|The War of 1812|The Civil War
history|Which explorer first reached India by sea from Europe, in 1498?|Vasco da Gama|Christopher Columbus|Ferdinand Magellan
history|Which of the Seven Wonders of the Ancient World is the only one still standing?|The Great Pyramid of Giza|The Colossus of Rhodes|The Hanging Gardens of Babylon
history|Who wrote The Communist Manifesto with Friedrich Engels?|Karl Marx|Vladimir Lenin|Leon Trotsky
history|The Battle of Waterloo in 1815 was the final defeat of whom?|Napoleon Bonaparte|Louis the Sixteenth|Charles de Gaulle
history|Which U.S. president was elected to more than two terms?|Franklin D. Roosevelt|Theodore Roosevelt|Woodrow Wilson|He won four elections; the 22nd Amendment now limits presidents to two.
history|Who led the first expedition to reach the South Pole, in 1911?|Roald Amundsen|Robert Falcon Scott|Ernest Shackleton
history|Which empire was ruled from Constantinople for about a thousand years?|The Byzantine Empire|The Mongol Empire|The Persian Empire
history|What was the code name of the American project that built the first atomic bombs?|The Manhattan Project|The Apollo Program|Project Mercury
history|In what year did the stock market crash that began the Great Depression?|1929|1919|1939
history|Who became South Africa's first president elected in a fully democratic election, in 1994?|Nelson Mandela|Desmond Tutu|F. W. de Klerk
history|Which queen of Egypt was an ally of Mark Antony?|Cleopatra|Nefertiti|Hatshepsut
history|Which was the last state to join the United States?|Hawaii|Alaska|Arizona
history|Who delivered the Gettysburg Address in 1863?|Abraham Lincoln|Ulysses S. Grant|Frederick Douglass
history|Which Chinese emperor was buried with the Terracotta Army?|Qin Shi Huang|Kublai Khan|Genghis Khan
history|Which ocean liner was sunk by a German submarine in 1915?|The Lusitania|The Titanic|The Britannic
history|The Rosetta Stone helped scholars learn to read which ancient writing?|Egyptian hieroglyphs|Mayan glyphs|Chinese characters

geography|What is the capital of Portugal?|Lisbon|Porto|Madrid
geography|What is the capital of Germany?|Berlin|Munich|Frankfurt
geography|What is the capital of Thailand?|Bangkok|Phuket|Hanoi
geography|What is the capital of Peru?|Lima|Cusco|Quito
geography|What is the capital of Poland?|Warsaw|Krakow|Prague
geography|What is the capital of New York State?|Albany|New York City|Buffalo
geography|What is the capital of California?|Sacramento|Los Angeles|San Francisco
geography|What is the capital of Florida?|Tallahassee|Miami|Orlando
geography|What is the largest country in South America?|Brazil|Argentina|Peru
geography|Which country is completely surrounded by South Africa?|Lesotho|Eswatini|Botswana
geography|What is the largest lake in the world by area?|The Caspian Sea|Lake Superior|Lake Victoria|Despite its name, the Caspian Sea is a lake.
geography|Casablanca is a city in which country?|Morocco|Egypt|Algeria
geography|Which U.S. state is home to the Everglades?|Florida|Louisiana|Georgia
geography|Mount Everest is in which mountain range?|The Himalayas|The Andes|The Alps
geography|Mumbai is a city in which country?|India|Pakistan|Sri Lanka
geography|Which Australian city is famous for its Opera House?|Sydney|Melbourne|Perth
geography|Serengeti National Park is in which country?|Tanzania|Nigeria|Morocco
geography|What is the capital of Cuba?|Havana|Santiago|San Juan
geography|The Dead Sea lies between Israel and which country?|Jordan|Egypt|Syria

science|What is the chemical symbol for silver?|Ag|Au|Si
science|What is the chemical symbol for potassium?|K|P|Po
science|Which element has atomic number 1?|Hydrogen|Helium|Oxygen
science|What is the main job of red blood cells?|Carrying oxygen|Fighting germs|Digesting food
science|What do white blood cells mainly do?|Fight infections|Carry oxygen|Store fat
science|What is the process plants use to make food from sunlight?|Photosynthesis|Respiration|Digestion
science|What do we call the change from a liquid to a gas?|Evaporation|Condensation|Freezing
science|What is the force that resists motion between two surfaces rubbing together?|Friction|Gravity|Inertia
science|What kind of lens is thicker in the middle than at the edges?|Convex|Concave|Flat
science|What unit is used to measure electric current?|The ampere|The ohm|The joule
science|What is the most common metal in the Earth's crust?|Aluminum|Iron|Copper
science|What do you call a substance that speeds up a chemical reaction without being used up?|A catalyst|A solvent|An acid
science|Which organ makes bile?|The liver|The pancreas|The kidneys
science|Traditionally, what is normal human body temperature in Fahrenheit?|98.6 degrees|96 degrees|100.4 degrees
science|What protein in red blood cells carries oxygen?|Hemoglobin|Keratin|Collagen

animals|What is a baby owl called?|An owlet|A cygnet|A kit
animals|What is a group of whales called?|A pod|A herd|A flock
animals|Which of these animals has the longest pregnancy?|The elephant|The giraffe|The blue whale|Elephants carry their babies for about 22 months.
animals|Which mammal has the thickest fur of any animal?|The sea otter|The polar bear|The arctic fox
animals|What is the largest primate?|The gorilla|The chimpanzee|The orangutan
animals|Which of these large animals cannot jump?|The elephant|The horse|The kangaroo
animals|What is a group of owls called?|A parliament|A murder|A gaggle
animals|Which big cat can't fully pull in its claws?|The cheetah|The lion|The leopard|Its claws grip the ground like a sprinter's spikes.
animals|What does a blue whale mainly eat?|Krill|Seals|Seaweed
animals|Which bird is a traditional symbol of peace?|The dove|The crow|The hawk
animals|What is a female pig called?|A sow|A mare|A hen
animals|Which animal is famous for building dams?|The beaver|The otter|The muskrat

general|What is 12 squared?|144|124|132
general|How many sides does a heptagon have?|Seven|Six|Nine
general|Who wrote The Cat in the Hat?|Dr. Seuss|Roald Dahl|Shel Silverstein
general|Who wrote the Harry Potter books?|J. K. Rowling|C. S. Lewis|Roald Dahl
general|Which author created the land of Narnia?|C. S. Lewis|J. R. R. Tolkien|Lewis Carroll
general|Who wrote Alice's Adventures in Wonderland?|Lewis Carroll|C. S. Lewis|Beatrix Potter
general|What is the largest prime number less than 20?|19|17|18
general|How many weeks are in a year?|52|48|56
general|What city does Batman protect?|Gotham City|Metropolis|Star City
general|What is Superman's home planet?|Krypton|Mars|Asgard
general|How many musicians play in a quartet?|Four|Three|Five
general|Which painter is famous for melting clocks?|Salvador Dali|Pablo Picasso|Andy Warhol
general|Who wrote the poem The Raven?|Edgar Allan Poe|Walt Whitman|Robert Frost
general|What do you get if you multiply any number by zero?|Zero|The same number|One
general|How many zeros are in one billion?|Nine|Six|Twelve
`;

const easy = `
space|What color is the planet Mars?|Red|Blue|Green
space|What makes the Moon shine at night?|Light from the Sun|Light bulbs|Fire
space|Which planet next to Earth is very hot and covered in clouds?|Venus|Neptune|Saturn
space|What is the floating feeling astronauts have in space called?|Weightlessness|Dizziness|Sleepiness
space|Which is closer to Earth, the Moon or the Sun?|The Moon|The Sun|They're the same distance
space|What do you call a space rock that lands on Earth?|A meteorite|A comet|A crater
space|Who was the first person in space?|Yuri Gagarin|Neil Armstrong|Buzz Lightyear
space|What do we call the Sun with all its planets and moons?|The solar system|The ocean|The weather
space|Which dwarf planet used to be called the ninth planet?|Pluto|Mars|Saturn
space|What shape is the Sun?|A ball|A star with points|A square
space|What does NASA build to explore space?|Rockets and spacecraft|Submarines|Race cars
space|What is the giant ball of hot gas at the center of our solar system?|The Sun|The Moon|Jupiter
space|How long does it take the Earth to spin around once?|One day|One week|One year
space|When it's daytime where you are, what is it on the other side of the Earth?|Nighttime|Also daytime|Always winter

animals|What is a baby duck called?|A duckling|A kitten|A puppy
animals|Which animal has a long sticky tongue for eating ants?|The anteater|The giraffe|The hippo
animals|What color is a flamingo?|Pink|Blue|Green
animals|Which animal has a big horn on its nose?|The rhinoceros|The hippo|The elephant
animals|Which ocean animal breathes through a blowhole?|The whale|The shark|The crab
animals|What does a spider spin?|A web|A nest|A shell
animals|Which animal has long ears and hops?|The rabbit|The mouse|The cat
animals|Which very big bird cannot fly?|The ostrich|The robin|The eagle
animals|Which animal starts life as a tadpole?|The frog|The fish|The snake
animals|Which animal is the fastest runner on land?|The cheetah|The turtle|The cow
animals|Which animal sleeps through much of the winter in a den?|The bear|The horse|The chicken
animals|Which bird is a symbol of the United States?|The bald eagle|The penguin|The parrot
animals|What is a baby deer called?|A fawn|A cub|A calf
animals|How many humps does a dromedary camel have?|One|Two|Four

science|What do we call little balls of ice that fall from the sky?|Hail|Fog|Dew
science|Which part of your body do you taste with?|Your tongue|Your elbow|Your ear
science|What do you call a scientist who studies animals?|A zoologist|A chef|A pilot
science|Which is heavier, a pound of feathers or a pound of rocks?|They weigh the same|The rocks|The feathers
science|What do plants give off that we breathe?|Oxygen|Smoke|Salt
science|What happens to water when it gets very, very cold?|It freezes|It boils|It disappears
science|What tool helps you see tiny things up close?|A microscope|A telescope|A periscope
science|Which body part has a pupil?|The eye|The nose|The foot
science|Which of these is a gas?|Air|A rock|Juice
science|What do you call a scientist who studies rocks?|A geologist|A dentist|A baker
science|Which force makes things fall to the ground?|Gravity|Wind|Magnetism
science|What does a caterpillar make before it becomes a butterfly?|A chrysalis|A nest|A web
science|What do you see when sunlight shines through a prism?|All the colors of the rainbow|Only black|Nothing at all
science|Which season is usually the hottest?|Summer|Winter|Fall
science|When you hold the same ends of two magnets together, what happens?|They push apart|They stick together|They melt

geography|What is the capital of France?|Paris|London|Rome
geography|What is the capital of England?|London|Paris|Dublin
geography|In which country is the Great Wall?|China|Mexico|Egypt
geography|What do you call a very tall landform with a peak at the top?|A mountain|A lake|A beach
geography|Most of the Amazon rainforest is in which country?|Brazil|Canada|Egypt
geography|What is the name of the imaginary line around the middle of the Earth?|The equator|The border|The horizon
geography|Which U.S. state is famous for oranges and Walt Disney World?|Florida|Alaska|Maine
geography|Which country is famous for windmills and tulips?|The Netherlands|Egypt|India
geography|What do you call a small body of still water?|A pond|An ocean|A river
geography|What is the capital of Japan?|Tokyo|Beijing|Seoul
geography|Brazil is on which continent?|South America|Africa|Europe
geography|Which U.S. city is famous for Hollywood?|Los Angeles|Boston|Seattle
geography|Which big river flows past St. Louis and New Orleans?|The Mississippi|The Nile|The Thames
geography|What is a giant, slow-moving river of ice called?|A glacier|A geyser|A canyon

general|How many days are in a year that isn't a leap year?|365|300|100
general|What color is a stop sign?|Red|Green|Purple
general|What is 9 plus 6?|15|14|16
general|What is the opposite of tall?|Short|Big|Long
general|Which fairy tale has a girl in a red hood and a big bad wolf?|Little Red Riding Hood|Cinderella|Rapunzel
general|In which month is Halloween?|October|December|July
general|How many fingers are on two hands?|Ten|Eight|Twelve
general|What is 4 times 5?|20|9|25
general|What do you call a doctor who takes care of teeth?|A dentist|A vet|A chef
general|What do you call a doctor who takes care of animals?|A vet|A dentist|A pilot
general|What do you call a shape with eight sides?|An octagon|A square|A circle
general|In the fairy tale, who climbed the beanstalk?|Jack|Hansel|Peter Pan
general|How many wheels does a bicycle have?|Two|Three|Four
general|What is the first month of the year?|January|March|December
general|In which season do leaves fall from the trees?|Fall|Spring|Summer
`;

module.exports = { regular, easy };
