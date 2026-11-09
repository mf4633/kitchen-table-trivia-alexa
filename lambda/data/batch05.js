'use strict';
// Batch 5 (2026-11-09). Same line format and rules as questions.js.

const regular = `
words|What does benevolent mean?|Kind and generous|Angry and cruel|Shy and quiet
words|What does candid mean?|Honest and direct|Sweet like candy|Secret
words|Which word means to fix up a building and make it like new?|Renovate|Demolish|Relocate
words|What does the prefix anti mean?|Against|Before|Between
words|What does the prefix inter mean, as in international?|Between|Inside|Under
words|What does the prefix mono mean, as in monorail?|One|Many|Half
words|What does the prefix poly mean, as in polygon?|Many|One|Round
words|What is the opposite of permanent?|Temporary|Lasting|Fixed
words|What is the opposite of rural?|Urban|Rustic|Remote
words|Which word means using few words?|Concise|Verbose|Vague
words|What do you call a word made by joining two words, like sunflower?|A compound word|A contraction|A prefix
words|What do you call a shortened form like can't or I'm?|A contraction|A compound word|An acronym
words|What does unanimous mean?|Everyone agrees|No one agrees|Most people agree
words|What is a misnomer?|A wrong or misleading name|A spelling mistake|A lost letter
words|Which word means lasting a very short time?|Ephemeral|Eternal|Ancient
words|What does verbatim mean?|Word for word|In summary|Out loud
words|What do you call a joining word like and, but, or or?|A conjunction|A preposition|An interjection
words|The word alphabet comes from the first two letters of which language's alphabet?|Greek|Latin|Hebrew|Alpha and beta.
words|What do you call a phrase whose meaning isn't literal, like raining cats and dogs?|An idiom|A simile|A rhyme
words|If something is a piece of cake, what is it?|Easy|Delicious|A small part

space|What was the first U.S. satellite, launched in 1958?|Explorer 1|Vanguard 1|Telstar
space|Triton is a moon of which planet?|Neptune|Uranus|Saturn
space|What is the largest moon in the solar system?|Ganymede|Titan|Earth's Moon|Jupiter's moon Ganymede is bigger than the planet Mercury.
space|About how long does light from the Moon take to reach Earth?|About one second|About one minute|About eight minutes
space|Charon is the largest moon of which dwarf planet?|Pluto|Ceres|Eris
space|What was the first space station, launched in 1971?|Salyut 1|Skylab|Mir
space|Which is the densest planet in the solar system?|Earth|Jupiter|Saturn
space|The names of Mars's moons, Phobos and Deimos, mean what?|Fear and dread|Day and night|Fire and ice
space|Io, the most volcanic body in the solar system, is a moon of which planet?|Jupiter|Saturn|Neptune
space|From its Greek roots, what does the word astronaut mean?|Star sailor|Sky walker|Moon traveler
space|What is the name of China's space station?|Tiangong|Mir|Skylab
space|What is the name of NASA's program to send astronauts back to the Moon?|Artemis|Gemini|Voyager|In myth, Artemis is Apollo's twin sister.
space|About how far is one light-year in miles?|About 6 trillion miles|About 6 million miles|About 6 billion miles

music|Who composed the opera The Magic Flute?|Wolfgang Amadeus Mozart|Giuseppe Verdi|Richard Wagner
music|Who composed the opera Aida?|Giuseppe Verdi|Giacomo Puccini|Gioachino Rossini
music|Who composed Messiah, with its famous Hallelujah chorus?|George Frideric Handel|Johann Sebastian Bach|Joseph Haydn
music|Which Polish composer is famous for his piano nocturnes and waltzes?|Frederic Chopin|Franz Liszt|Antonin Dvorak
music|How many symphonies did Beethoven complete?|Nine|Five|Twelve
music|The oboe belongs to which family of instruments?|Woodwinds|Brass|Strings
music|Which jazz trumpeter was nicknamed Satchmo?|Louis Armstrong|Duke Ellington|Miles Davis
music|Who composed Rhapsody in Blue?|George Gershwin|Leonard Bernstein|Aaron Copland
music|Who wrote the music for West Side Story?|Leonard Bernstein|George Gershwin|Cole Porter
music|What is a piece for a solo instrument accompanied by an orchestra usually called?|A concerto|A sonata|A symphony
music|Counting black and white keys, how many different notes are in one octave?|12|8|7
music|Which singer is known as the Piano Man?|Billy Joel|Elton John|Ray Charles
music|Which band recorded the album The Dark Side of the Moon?|Pink Floyd|Led Zeppelin|The Doors
music|Which Lin-Manuel Miranda musical is about a U.S. founding father?|Hamilton|In the Heights|Rent
music|Who composed The Blue Danube waltz?|Johann Strauss the Second|Richard Strauss|Johann Sebastian Bach
music|In music, what does crescendo mean?|Getting gradually louder|Getting gradually softer|Getting faster
music|What does a cappella singing mean?|Singing without instruments|Singing very loudly|Singing in a round
music|Which instrument usually plays the note the orchestra tunes to?|The oboe|The trumpet|The piano
music|Which rock and roll pioneer wrote and sang Johnny B. Goode?|Chuck Berry|Buddy Holly|Bill Haley
music|Which musical features the song Memory?|Cats|Les Miserables|The Phantom of the Opera
music|Who composed The Planets, with movements named for each planet?|Gustav Holst|Edward Elgar|Ralph Vaughan Williams
music|Which singer was called the Godfather of Soul?|James Brown|Marvin Gaye|Ray Charles
music|Which instruments make up a standard string quartet?|Two violins, a viola, and a cello|Four violins|A violin, a guitar, a harp, and a cello
music|Flamenco music and dance come from which country?|Spain|Mexico|Argentina
music|The tango was born in the region shared by which two countries?|Argentina and Uruguay|Spain and Portugal|Brazil and Chile

animals|Giraffes live in the wild on which continent?|Africa|Asia|South America
animals|Which animal appears with the emu on Australia's coat of arms?|The kangaroo|The koala|The platypus
animals|What is a baby fox called?|A kit|A calf|A joey
animals|Which bird fans out colorful tail feathers to show off?|The peacock|The pelican|The puffin
animals|Which animal is nicknamed the sea cow?|The manatee|The walrus|The sea lion
animals|What do you call animals that carry their young in a pouch?|Marsupials|Rodents|Reptiles
animals|What is a group of ants called?|A colony|A pod|A pride
animals|What is the largest living reptile?|The saltwater crocodile|The Komodo dragon|The leatherback turtle
animals|Which bird can turn its head about 270 degrees?|The owl|The parrot|The penguin
animals|What are baby rabbits called?|Kits|Calves|Cubs
animals|What is one name for a group of zebras?|A dazzle|A pride|A murder
animals|Traditional mozzarella di bufala is made from which animal's milk?|The water buffalo|The goat|The sheep
animals|What is the largest living rodent?|The capybara|The beaver|The porcupine
animals|Which bird lays the largest eggs?|The ostrich|The emu|The eagle

general|Who painted The Scream?|Edvard Munch|Vincent van Gogh|Gustav Klimt
general|Who painted Girl with a Pearl Earring?|Johannes Vermeer|Rembrandt|Jan van Eyck
general|What is the square root of 81?|9|8|7
general|How many centimeters are in a meter?|100|10|1000
general|How many grams are in a kilogram?|1000|100|10
general|What is 10 percent of 250?|25|10|50
general|How many faces does a cube have?|Six|Four|Eight
general|Who wrote Don Quixote?|Miguel de Cervantes|Lope de Vega|Gabriel Garcia Marquez
general|Who wrote Moby-Dick?|Herman Melville|Nathaniel Hawthorne|Mark Twain
general|Who wrote the novel 1984?|George Orwell|Aldous Huxley|Ray Bradbury
general|Which ancient Greek poet is credited with The Odyssey?|Homer|Virgil|Sophocles
general|How many pieces does each player start with in chess?|16|12|20
general|In which board game do you score points by spelling words with letter tiles?|Scrabble|Monopoly|Clue
general|What do all the dots on a standard six-sided die add up to?|21|18|24

science|What is the chemical symbol for copper?|Cu|Co|Cp
science|What is the chemical symbol for lead?|Pb|Le|Ld|It comes from plumbum, the Latin word for lead, which also gave us plumber.
science|Which bone protects the brain?|The skull|The pelvis|The sternum
science|Which side of the chest is the heart mostly on?|The left|The right|The exact center
science|Which tube carries food from your mouth to your stomach?|The esophagus|The trachea|The intestine
science|What is the scientific name for the windpipe?|The trachea|The esophagus|The larynx
science|What do we call the amount of matter in an object?|Mass|Volume|Density
science|Which scale was famously used to rate the size of earthquakes?|The Richter scale|The Beaufort scale|The Kelvin scale
science|What does the Beaufort scale measure?|Wind speed|Earthquakes|Temperature
science|What is the coldest possible temperature called?|Absolute zero|Freezing point|Dew point
science|What is the study of living things called?|Biology|Geology|Physics
science|Which gas, high in the atmosphere, blocks much of the Sun's ultraviolet light?|Ozone|Helium|Methane
science|Which kind of animal is cold-blooded, has scales, and usually lays eggs on land?|A reptile|An amphibian|A mammal
science|What do you call the place where two bones meet?|A joint|A muscle|A tendon

history|Who is the youngest person ever elected U.S. president?|John F. Kennedy|Theodore Roosevelt|Bill Clinton|Theodore Roosevelt was younger when he took office, but he got there when McKinley died.
history|In what year did the American Civil War end?|1865|1861|1870
history|Who commanded the Union armies at the end of the Civil War?|Ulysses S. Grant|William Tecumseh Sherman|George McClellan
history|Which Confederate general surrendered at Appomattox in 1865?|Robert E. Lee|Stonewall Jackson|Jefferson Davis
history|Which ancient people built the Parthenon?|The Greeks|The Romans|The Egyptians
history|Who rode at night in 1775 to warn that British troops were coming?|Paul Revere|John Hancock|Nathan Hale
history|Who refused to give up her bus seat in Montgomery, Alabama, in 1955?|Rosa Parks|Harriet Tubman|Sojourner Truth
history|Which famous conductor of the Underground Railroad had escaped slavery in Maryland?|Harriet Tubman|Rosa Parks|Ida B. Wells
history|Which pair led the expedition across the American West to the Pacific, starting in 1804?|Lewis and Clark|Marquette and Joliet|Boone and Crockett
history|Genghis Khan founded which empire?|The Mongol Empire|The Ottoman Empire|The Roman Empire
history|Who was the first Roman Catholic president of the United States?|John F. Kennedy|Franklin D. Roosevelt|Herbert Hoover
history|What did the 19th Amendment, ratified in 1920, guarantee?|Women's right to vote|The end of slavery|The income tax
history|Which ship carried Charles Darwin around the world?|HMS Beagle|HMS Victory|HMS Bounty
history|What was the name of the Wright brothers' first powered airplane?|The Wright Flyer|The Spirit of St. Louis|The Kitty Hawk Clipper

geography|What is the capital of Switzerland?|Bern|Zurich|Geneva
geography|What is the capital of the Netherlands?|Amsterdam|Rotterdam|The Hague|The government sits in The Hague, but Amsterdam is the capital.
geography|What is the capital of Russia?|Moscow|Saint Petersburg|Kyiv
geography|What is the capital of India?|New Delhi|Mumbai|Kolkata
geography|What is the capital of Mexico?|Mexico City|Guadalajara|Cancun
geography|What is the capital of Colombia?|Bogota|Medellin|Cartagena
geography|What is the capital of Greece?|Athens|Sparta|Thessaloniki
geography|What is the capital of Sweden?|Stockholm|Oslo|Gothenburg
geography|Which U.S. state has the most active volcanoes?|Alaska|Hawaii|Washington|Hawaii's are the most famous, but Alaska has far more.
geography|Which country is called the Land of the Rising Sun?|Japan|China|Thailand
geography|What is the longest river in the United States?|The Missouri|The Mississippi|The Colorado
geography|What is the capital of Washington State?|Olympia|Seattle|Spokane
geography|Which U.S. state is nicknamed the Sunshine State?|Florida|California|Arizona
geography|Which U.S. state is nicknamed the Golden State?|California|Nevada|Colorado

food|Traditional marmalade is made from which fruit?|Oranges|Strawberries|Grapes
food|Which country is famous for producing most of the world's maple syrup?|Canada|Norway|Australia
food|Most Italian gnocchi are made mainly from what?|Potatoes|Rice|Beans
food|What is a croque monsieur?|A grilled ham and cheese sandwich|A chocolate pastry|A fish stew
food|Pierogi, filled dumplings, are a famous dish of which country?|Poland|Greece|Brazil
food|Baba ganoush is a dip made mainly from which vegetable?|Eggplant|Chickpeas|Zucchini
food|Along with coconut, which fruit flavors a pina colada?|Pineapple|Mango|Banana
food|Which Swiss cheese is famous for its big holes?|Emmental|Cheddar|Brie
food|In ceviche, raw fish is cured in what?|Citrus juice|Vinegar|Hot oil

sports|How many players does each field hockey team have on the field?|11|9|7
sports|The decathlon is part of which sport?|Track and field|Swimming|Cycling
sports|How many events are in a decathlon?|Ten|Seven|Five
sports|The America's Cup is a competition in which sport?|Sailing|Golf|Tennis
sports|Which major tennis tournament is played on clay courts in Paris?|The French Open|Wimbledon|The U.S. Open
sports|Sumo wrestling is the traditional national sport of which country?|Japan|Korea|Mongolia
sports|The Larry O'Brien Trophy goes to the champion of which sport?|Basketball|Football|Hockey
sports|In golf, what is another name for a hole in one?|An ace|A birdie|A bogey
sports|In tennis, what is a serve called if the opponent can't even touch it?|An ace|A let|A fault
`;

const easy = `
music|Which instrument with a round body and long neck is popular in bluegrass music?|The banjo|The tuba|The harp
music|What do you call the words of a song?|The lyrics|The notes|The beat
music|Which big brass instrument plays the lowest oom-pah notes in a band?|The tuba|The flute|The violin
music|What do you call a person who plays the piano?|A pianist|A painter|A pilot
music|Which brass instrument has three buttons called valves?|The trumpet|The guitar|The drum
music|Which round instrument with little jingles do you shake or tap?|A tambourine|A trumpet|A tuba
music|In a song, what do you call the part that repeats again and again?|The chorus|The title|The ending
music|Which holiday song is about a reindeer with a shiny red nose?|Rudolph the Red-Nosed Reindeer|Frosty the Snowman|Jingle Bells
music|Which song is about a snowman who comes to life?|Frosty the Snowman|Jingle Bells|Silent Night
music|What is the biggest instrument in the violin family?|The double bass|The violin|The viola
music|In the song about the bus, what goes round and round?|The wheels|The doors|The seats
music|How many people sing in a duet?|Two|Three|Five
music|What do musicians read to know which notes to play?|Sheet music|A map|A menu
music|What do you call a big group of musicians playing violins, horns, and drums together?|An orchestra|A choir|A parade
music|Which instrument has bellows that you squeeze in and out?|The accordion|The flute|The cello
music|Which black wooden instrument with silver keys uses a reed?|The clarinet|The trumpet|The harp
music|Which spider climbed up the water spout in the song?|The itsy bitsy spider|The big brown spider|The busy spider
music|What do you call the special song of a country?|The national anthem|The national lullaby|The national march

space|What do we call the time when the Sun goes down?|Sunset|Sunrise|Noon
space|What in the sky changes from a thin sliver to a full circle every month?|The Moon|The Sun|A cloud
space|Which bright planet is sometimes called the Morning Star?|Venus|Mars|Pluto
space|What do astronauts need to bring with them to breathe in space?|Oxygen|Water balloons|Fans
space|Where is the Sun when it's nighttime where you live?|Shining on the other side of the Earth|Asleep|In the ocean
space|What do we call the round holes on the Moon made by crashing space rocks?|Craters|Tunnels|Puddles
space|What kind of animal was the first to orbit the Earth?|A dog|A cat|A horse
space|What do we call a person trained to travel into space?|An astronaut|An acrobat|An architect
space|What is the name of Earth's natural satellite?|The Moon|The Sun|Mars
space|Which planet is named after the Roman god of war?|Mars|Venus|Earth
space|What does a rocket burn to blast off?|Fuel|Feathers|Wheels
space|Would you weigh less on the Moon or on the Earth?|On the Moon|On the Earth|The same on both

geography|Which ocean is the coldest, at the top of the world?|The Arctic|The Pacific|The Indian Ocean
geography|What do you call a hot spring that shoots water up into the air?|A geyser|A glacier|A canyon
geography|Which U.S. state is famous for the Alamo and cowboys?|Texas|Maine|Oregon
geography|What do you call a mountain that can erupt with lava?|A volcano|A hill|A cliff
geography|Which U.S. city is nicknamed the Big Apple?|New York City|Chicago|Boston
geography|What is the capital of Italy?|Rome|Venice|Paris
geography|What do you call the place where a river flows into the sea?|The mouth|The head|The knee
geography|In which country is the city of Sydney?|Australia|Canada|England
geography|What do you call a warm, wet forest with very tall trees and lots of rain?|A rainforest|A desert|A tundra
geography|What do you call land with water on three sides?|A peninsula|An island|A valley
geography|Which long, thin country runs along the west coast of South America?|Chile|Brazil|Mexico
`;

module.exports = { regular, easy };
