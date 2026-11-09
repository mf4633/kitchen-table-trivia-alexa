'use strict';
// Batch 2 (2026-11-09). Same line format and rules as questions.js.

const regular = `
geography|What is the capital of Turkey?|Ankara|Istanbul|Izmir
geography|Which country has the largest land area in the world?|Russia|Canada|China
geography|What is the longest river in Europe?|The Volga|The Danube|The Rhine
geography|Juneau is the capital of which U.S. state?|Alaska|Hawaii|Montana|Juneau can't be reached by road from the rest of North America.
geography|What is the capital of Brazil?|Brasilia|Rio de Janeiro|Sao Paulo
geography|Which strait separates Alaska from Russia?|The Bering Strait|The Strait of Hormuz|The Strait of Magellan
geography|Which country has more ancient pyramids than Egypt?|Sudan|Mexico|Peru|Sudan has around 200, built by the kings of Kush.
geography|The Andes run along which side of South America?|The west|The east|The north
geography|Not counting continents, what is the largest island in the world?|Greenland|New Guinea|Borneo
geography|What is the capital of Argentina?|Buenos Aires|Santiago|Montevideo
geography|Which U.S. state borders only one other state?|Maine|Vermont|Delaware
geography|The ancient city of Petra is in which country?|Jordan|Israel|Lebanon
geography|What is the capital of South Korea?|Seoul|Busan|Pyongyang
geography|The Danube River empties into which sea?|The Black Sea|The Baltic Sea|The North Sea
geography|What is the deepest lake in the world?|Lake Baikal|Lake Tanganyika|Lake Superior|Lake Baikal, in Siberia, is more than a mile deep.
geography|Mount Rushmore is in which U.S. state?|South Dakota|North Dakota|Wyoming
geography|The Atacama, one of the driest deserts on Earth, is mostly in which country?|Chile|Peru|Argentina
geography|What is the capital of Kenya?|Nairobi|Mombasa|Kampala
geography|Which U.S. city is nicknamed the Windy City?|Chicago|Boston|Denver
geography|What is the capital of Norway?|Oslo|Bergen|Stockholm
geography|Which sea lies between Saudi Arabia and Africa?|The Red Sea|The Dead Sea|The Caspian Sea
geography|Which country has the longest coastline in the world?|Canada|Australia|Russia
geography|The island of Sicily belongs to which country?|Italy|Greece|Malta
geography|What is the capital of Vietnam?|Hanoi|Ho Chi Minh City|Da Nang
geography|Which river forms much of the border between Texas and Mexico?|The Rio Grande|The Colorado|The Pecos
geography|What is the highest mountain in North America?|Denali|Mount Whitney|Mount Rainier
geography|The Galapagos Islands belong to which country?|Ecuador|Peru|Colombia
geography|What is the capital of Ireland?|Dublin|Cork|Galway
geography|Which African country has the most people?|Nigeria|Ethiopia|Egypt
geography|The lower part of which U.S. state is shaped like a mitten?|Michigan|Wisconsin|Minnesota
geography|What is the capital of Iceland?|Reykjavik|Helsinki|Copenhagen
geography|In which country is the Taj Mahal?|India|Pakistan|Bangladesh
geography|What is the capital of Texas?|Austin|Houston|Dallas
geography|The Panama Canal connects the Pacific Ocean to which ocean?|The Atlantic|The Indian Ocean|The Arctic

history|Who was the first emperor of Rome?|Augustus|Julius Caesar|Nero|Julius Caesar was a dictator; his heir Augustus became the first emperor.
history|In what year did Christopher Columbus first reach the Americas?|1492|1512|1475
history|Which American war was fought between the North and the South?|The Civil War|The War of 1812|The Revolutionary War
history|Who was U.S. president when Pearl Harbor was attacked?|Franklin D. Roosevelt|Harry Truman|Herbert Hoover
history|What was the first permanent English settlement in America, founded in 1607?|Jamestown|Plymouth|Roanoke
history|Which civilization built the city of Tenochtitlan?|The Aztecs|The Inca|The Maya|Mexico City stands on its ruins.
history|In what year was the Boston Tea Party?|1773|1776|1765
history|Who was the first woman to win a Nobel Prize?|Marie Curie|Mother Teresa|Jane Addams|She won two: physics in 1903 and chemistry in 1911.
history|The United States bought Alaska from which country?|Russia|Canada|Britain
history|Whose nearly intact tomb was discovered in Egypt in 1922?|Tutankhamun|Ramses the Second|Cleopatra
history|Who gave the I Have a Dream speech in 1963?|Martin Luther King Jr.|Malcolm X|John Lewis
history|In what year did the French Revolution begin?|1789|1776|1815
history|Whose expedition was the first to sail all the way around the world?|Ferdinand Magellan's|Christopher Columbus's|Vasco da Gama's|Magellan died on the way; Juan Sebastian Elcano brought the last ship home in 1522.
history|Who was the 16th president of the United States?|Abraham Lincoln|James Buchanan|Andrew Johnson
history|Which Greek city-state was famous for its warriors and fought a long war against Athens?|Sparta|Corinth|Delphi
history|In what year was the Declaration of Independence adopted?|1776|1781|1787
history|Who led the Soviet Union during World War Two?|Joseph Stalin|Vladimir Lenin|Nikita Khrushchev
history|Which document begins with the words We the People?|The U.S. Constitution|The Declaration of Independence|The Gettysburg Address
history|The United States made the Louisiana Purchase from which country?|France|Spain|Britain
history|Which ancient people invented cuneiform, one of the first writing systems?|The Sumerians|The Egyptians|The Greeks
history|Which U.S. president is the only one to resign from office?|Richard Nixon|Andrew Johnson|Bill Clinton
history|Which Roman emperor ordered a famous wall built across northern England?|Hadrian|Nero|Caligula
history|Who was the first woman to be prime minister of the United Kingdom?|Margaret Thatcher|Theresa May|Queen Victoria
history|In what year did the United States enter World War One?|1917|1914|1919
history|What was the largest of Columbus's three ships in 1492?|The Santa Maria|The Pinta|The Nina
history|Which Greek philosopher tutored Alexander the Great?|Aristotle|Plato|Socrates
history|The Hundred Years' War was fought mainly between England and which country?|France|Spain|Scotland|Despite its name, it lasted 116 years.
history|Who was the first African American justice of the U.S. Supreme Court?|Thurgood Marshall|Clarence Thomas|Frederick Douglass
history|Which state was the first to ratify the U.S. Constitution?|Delaware|Pennsylvania|Virginia
history|In what year did the Soviet Union break apart?|1991|1989|1995
history|Who painted the ceiling of the Sistine Chapel?|Michelangelo|Raphael|Leonardo da Vinci
history|The ancient city of Troy was in what is now which country?|Turkey|Greece|Italy
history|Which French heroine was known as the Maid of Orleans?|Joan of Arc|Marie Antoinette|Catherine de Medici
history|Who demonstrated a long-lasting carbon-filament light bulb at Menlo Park in 1879?|Thomas Edison|Nikola Tesla|Benjamin Franklin
history|What is the name for Europe's great rebirth of art and learning after the Middle Ages?|The Renaissance|The Enlightenment|The Reformation

science|What is the chemical symbol for iron?|Fe|Ir|In|It comes from ferrum, the Latin word for iron.
science|Which part of a cell is called its powerhouse?|The mitochondria|The nucleus|The ribosome
science|Roughly how fast does light travel, in miles per second?|186000|86000|286000
science|Which part of the eye controls how much light gets in?|The iris|The retina|The lens
science|Which organs filter the blood and make urine?|The kidneys|The lungs|The spleen
science|On the pH scale, what is the pH of pure water?|7|0|14
science|Table salt is made of sodium and which other element?|Chlorine|Potassium|Calcium
science|Who proposed the theory of evolution by natural selection in On the Origin of Species?|Charles Darwin|Gregor Mendel|Louis Pasteur
science|What do you call animals that are mostly active at night?|Nocturnal|Diurnal|Migratory
science|Which gas makes the bubbles in soda?|Carbon dioxide|Oxygen|Helium
science|Including wisdom teeth, how many teeth does an adult usually have?|32|28|36
science|At sea level, water boils at what temperature in Celsius?|100 degrees|90 degrees|212 degrees
science|Which scientist described the laws of motion and universal gravitation?|Isaac Newton|Galileo Galilei|Johannes Kepler
science|What type of rock forms when lava or magma cools?|Igneous|Sedimentary|Metamorphic
science|Which organ makes insulin?|The pancreas|The liver|The thyroid
science|What do you call animals without a backbone?|Invertebrates|Vertebrates|Mammals
science|What is the longest bone in the human body?|The femur|The tibia|The humerus|The femur is the thigh bone.
science|What is the scientific study of weather called?|Meteorology|Geology|Ecology
science|Who discovered penicillin in 1928?|Alexander Fleming|Louis Pasteur|Jonas Salk
science|What is the unit of electrical resistance?|The ohm|The volt|The watt
science|What color is chlorophyll?|Green|Red|Yellow
science|What is the everyday name for sodium bicarbonate?|Baking soda|Table salt|Chalk
science|The cornea is part of which organ?|The eye|The ear|The heart
science|Bees make honey from what part of flowers?|Nectar|Pollen|Petals
science|What is the main gas in natural gas?|Methane|Propane|Butane
science|Which of these is a noble gas?|Neon|Nitrogen|Chlorine
science|Who studied heredity by breeding pea plants?|Gregor Mendel|Charles Darwin|Marie Curie
science|What is the outermost layer of the Earth called?|The crust|The mantle|The core
science|A frog is what kind of animal?|An amphibian|A reptile|A mammal
science|Which instrument measures air pressure?|A barometer|A thermometer|An anemometer
science|What is the hardest substance in the human body?|Tooth enamel|The skull|Fingernails
science|How many pairs of chromosomes do people usually have?|23|46|21
science|Who first saw Jupiter's four largest moons through a telescope, in 1610?|Galileo Galilei|Isaac Newton|Nicolaus Copernicus

space|What is the most common element in the universe?|Hydrogen|Helium|Oxygen
space|Which was the first space shuttle to fly into space, in 1981?|Columbia|Challenger|Discovery
space|What is the name of Mars's larger moon?|Phobos|Deimos|Titan
space|What is Saturn's largest moon?|Titan|Europa|Ganymede|Titan is the only moon with a thick atmosphere.
space|Which planet has the storm known as the Great Red Spot?|Jupiter|Mars|Saturn
space|About how long does it take Earth to travel once around the Sun?|About 365 days|About 30 days|About 24 hours
space|What was the name of the Apollo 11 lunar module?|Eagle|Columbia|Falcon|Columbia was the command module that stayed in orbit.
space|Which large spiral galaxy is the Milky Way's nearest big neighbor?|Andromeda|The Sombrero Galaxy|The Pinwheel Galaxy
space|What is a shooting star, really?|A meteor|A planet|A satellite
space|Which planet has the fastest winds in the solar system?|Neptune|Uranus|Earth
space|What do we call the huge explosion of a star at the end of its life?|A supernova|A nebula|A pulsar
space|Who was the first American to orbit the Earth?|John Glenn|Alan Shepard|Neil Armstrong
space|Which space telescope was launched in 1990?|Hubble|James Webb|Kepler
space|What is the boundary around a black hole, beyond which nothing can escape?|The event horizon|The singularity|The corona
space|Which planet takes the longest to travel around the Sun?|Neptune|Uranus|Saturn
space|Halley's Comet comes back about every how many years?|76|25|150
space|Which space station has had people aboard continuously since 2000?|The International Space Station|Mir|Skylab
space|What is the smallest planet in our solar system?|Mercury|Mars|Venus
space|Early astronomers thought the Moon's large dark patches were what?|Seas|Forests|Cities|They're still called maria, Latin for seas.
space|What was the NASA program that landed astronauts on the Moon?|Apollo|Gemini|Mercury
space|Which planet is often called Earth's twin because it's about the same size?|Venus|Mars|Mercury
space|About how long does the Moon take to travel once around the Earth?|About a month|About a week|About a year
space|What is the Sun's outer atmosphere, visible during a total eclipse, called?|The corona|The core|The aurora
space|The Big Dipper is part of which constellation?|Ursa Major|Orion|Cassiopeia
space|What causes the northern lights?|Particles from the Sun hitting the atmosphere|Moonlight shining on ice|City lights reflecting off clouds
space|Who discovered the planet Uranus in 1781?|William Herschel|Galileo Galilei|Edwin Hubble
space|What is the brightest star in the night sky?|Sirius|Polaris|Vega
space|What is the North Star's other name?|Polaris|Betelgeuse|Rigel
space|Which was the first animal to orbit the Earth, in 1957?|A dog named Laika|A monkey named Abel|A chimpanzee named Ham

animals|What is the largest bird in the world?|The ostrich|The emu|The albatross
animals|Which of these mammals lays eggs?|The platypus|The beaver|The otter
animals|What is a baby goat called?|A kid|A calf|A foal
animals|Counting its claws, how many legs does a lobster have?|Ten|Eight|Six
animals|Along with the bonobo, which ape is our closest living relative?|The chimpanzee|The gorilla|The orangutan
animals|What is a group of wolves called?|A pack|A pride|A school
animals|Which animal is famous for being one of the slowest mammals on Earth?|The sloth|The koala|The panda
animals|Which bird is famous for laying its eggs in other birds' nests?|The cuckoo|The robin|The sparrow
animals|What do koalas mostly eat?|Eucalyptus leaves|Bamboo|Grass
animals|How many arms does a typical starfish have?|Five|Eight|Ten
animals|What is the largest land animal?|The African elephant|The hippopotamus|The giraffe
animals|A female deer is called what?|A doe|A hen|A mare
animals|Which reptile can live more than 100 years and carries a heavy shell?|The tortoise|The iguana|The crocodile
animals|Which bird is famous for being able to fly backward?|The hummingbird|The swallow|The kingfisher
animals|The orca, or killer whale, is the largest member of which family?|The dolphins|The sharks|The seals
animals|Which insect chirps by rubbing its wings together?|The cricket|The butterfly|The ant
animals|What is a baby swan called?|A cygnet|A duckling|A gosling
animals|What is the fastest bird when diving?|The peregrine falcon|The golden eagle|The swift|In a dive it can top 200 miles per hour.
animals|How many compartments does a cow's stomach have?|Four|Two|One
animals|Which animal is the symbol of the World Wildlife Fund?|The giant panda|The tiger|The polar bear
animals|What do you call an animal that eats both plants and meat?|An omnivore|A herbivore|A carnivore
animals|Which of these animals is a marsupial?|The koala|The panda|The sloth
animals|What is the longest snake in the world?|The reticulated python|The anaconda|The king cobra|The green anaconda is heavier, but the reticulated python grows longer.
animals|What is a group of geese on the ground called?|A gaggle|A pod|A swarm
animals|What is a baby horse called?|A foal|A cub|A kid
animals|Emperor penguins live in which place?|Antarctica|The Arctic|Iceland
animals|Which salamander can regrow lost legs and even parts of its heart?|The axolotl|The newt|The hellbender
animals|Which bird has the largest wingspan?|The wandering albatross|The bald eagle|The California condor
animals|Counting its claws, how many legs does a crab have?|Ten|Eight|Twelve
animals|What is a male chicken called?|A rooster|A drake|A gander
animals|Which ocean animal has no brain, no heart, and no bones?|The jellyfish|The octopus|The squid
animals|What does a camel store in its hump?|Fat|Water|Milk
animals|What is the largest species of cat?|The tiger|The lion|The jaguar

sports|How many players does each basketball team have on the court?|Five|Six|Seven
sports|In which sport do players use a puck?|Ice hockey|Lacrosse|Field hockey
sports|In American football, how many points is a field goal worth?|Three|Two|Six
sports|Which country created the sport of judo?|Japan|China|Korea
sports|How many players does a baseball team have in the field on defense?|Nine|Ten|Eleven
sports|In golf, what is one stroke under par called?|A birdie|An eagle|A bogey
sports|How often are the Summer Olympic Games normally held?|Every four years|Every two years|Every year
sports|What sport is played at Wimbledon?|Tennis|Golf|Cricket
sports|How many periods are in a regulation NHL hockey game?|Three|Four|Two
sports|In which sport would you see a scrum?|Rugby|Cricket|Polo
sports|What is a perfect score in a game of ten-pin bowling?|300|200|250
sports|Which country won the first FIFA World Cup, in 1930?|Uruguay|Brazil|Argentina
sports|In cricket, what are the stumps and bails together called?|The wicket|The crease|The pitch
sports|How long is an Olympic swimming pool?|50 meters|25 meters|100 meters
sports|In Olympic archery, what color is the center of the target?|Gold|Red|Blue
sports|In tennis, what is a score of 40 to 40 called?|Deuce|Love|Advantage
sports|How many players does each volleyball team have on the court?|Six|Five|Seven
sports|The Ryder Cup is a competition in which sport?|Golf|Tennis|Sailing
sports|Which city hosted the 1996 Summer Olympics?|Atlanta|Los Angeles|Sydney
sports|Not counting stoppage time, how many minutes long is a soccer match?|90|80|100
sports|In baseball, what is it called when a batter hits a fair ball over the outfield fence?|A home run|A double|A bunt
sports|Which sport is often called the beautiful game?|Soccer|Basketball|Tennis
sports|In bowling, what are three strikes in a row called?|A turkey|A hat trick|A triple
sports|Which martial art's name means the way of the empty hand?|Karate|Judo|Taekwondo
sports|In which sport do you use a driver, an iron, and a putter?|Golf|Croquet|Polo
sports|The Super Bowl is the championship game of which league?|The NFL|The NBA|Major League Baseball
sports|Including the goalie, how many players does each ice hockey team have on the ice?|Six|Five|Seven
sports|In which sport do athletes compete on the pommel horse?|Gymnastics|Equestrian|Rodeo
sports|Which country hosted the 2008 Summer Olympics?|China|Greece|Australia

food|Which country is famous as the birthplace of pizza?|Italy|Greece|Spain
food|Miso is a paste made mainly from which fermented food?|Soybeans|Peanuts|Lentils
food|What kind of fruit is a Granny Smith?|An apple|A pear|A plum
food|Japanese sake is brewed from which grain?|Rice|Barley|Wheat
food|What is the main ingredient in traditional pesto sauce?|Basil|Spinach|Parsley
food|What is usually the hottest part of a chili pepper?|The white ribs inside|The tip|The stem
food|Which spiky Southeast Asian fruit is famous for its strong smell?|Durian|Mango|Lychee
food|Paella comes from which country?|Spain|Mexico|Portugal
food|Feta cheese traditionally comes from which country?|Greece|Italy|France
food|What is a dried grape called?|A raisin|A prune|A date
food|Which spice gives curry its bright yellow color?|Turmeric|Cumin|Cinnamon
food|Which nuts are used in traditional Italian pesto?|Pine nuts|Peanuts|Pecans
food|Which drink is made from fermented apple juice?|Cider|Mead|Sake
food|Which kind of pastry is used to make eclairs?|Choux pastry|Puff pastry|Shortcrust pastry
food|Which country grows the most coffee?|Brazil|Colombia|Ethiopia
food|Tahini is made from which seeds?|Sesame seeds|Sunflower seeds|Pumpkin seeds
food|Which Italian phrase, meaning to the tooth, describes pasta cooked firm?|Al dente|Al fresco|A la carte
food|Limoncello is made from which fruit?|Lemons|Limes|Oranges
food|Which vegetable gives borscht its deep red color?|Beets|Tomatoes|Red peppers
food|Falafel is usually made mainly from what?|Chickpeas|Potatoes|Rice
food|Kimchi comes from which country?|Korea|Japan|Thailand
food|What makes most bread dough rise?|Yeast|Salt|Sugar
food|Which berry is famous for being grown in flooded bogs?|The cranberry|The strawberry|The blackberry
food|Which cheese goes on a classic pizza Margherita?|Mozzarella|Cheddar|Swiss
food|Maple syrup is made by boiling down what?|Tree sap|Flower nectar|Honey
food|Pho is a noodle soup from which country?|Vietnam|Thailand|China
food|Valencia and navel are kinds of which fruit?|Orange|Apple|Grape
food|Chocolate is made from the seeds of which tree?|The cacao tree|The coconut palm|The coffee tree
food|Outside Japan, imitation wasabi is usually made from what?|Horseradish|Avocado|Green peas
food|Which herb, along with garlic and cucumber, flavors classic Greek tzatziki?|Dill|Basil|Rosemary

words|What is the opposite of generous?|Stingy|Kind|Wealthy
words|What is a group of words that expresses a complete thought?|A sentence|A syllable|A letter
words|What is the plural of child?|Children|Childs|Childer
words|What do you call a word made from the first letters of other words, like NASA?|An acronym|An anagram|A homonym
words|What does the Latin phrase et cetera mean?|And the rest|For example|That is
words|What is the past tense of the verb to run?|Ran|Runned|Ranned
words|A word that means the same as another word is called what?|A synonym|An antonym|A homophone
words|What does the prefix pre mean, as in preview?|Before|After|Against
words|A group of lines in a poem is called what?|A stanza|A chapter|A paragraph
words|What do you call a scientist who studies stars and planets?|An astronomer|A geologist|A botanist
words|What does the suffix less mean, as in fearless?|Without|More|Full of
words|What does RSVP on an invitation ask you to do?|Reply|Bring a gift|Dress up|It stands for the French phrase repondez s'il vous plait, please reply.
words|Which word means happening once a year?|Annual|Weekly|Perennial
words|What is the opposite of ascend?|Descend|Climb|Expand
words|A word that imitates a sound, like buzz or sizzle, is called what?|Onomatopoeia|Alliteration|Metaphor
words|Which word means to make something better?|Improve|Impair|Imply
words|Comparing two things using like or as is called what?|A simile|A metaphor|An idiom
words|What is the punctuation mark in the word don't called?|An apostrophe|A comma|A hyphen
words|What does bilingual mean?|Speaking two languages|Having two jobs|Living in two countries
words|Which of these words is a noun?|Happiness|Happily|Happy
words|What is the plural of goose?|Geese|Gooses|Geeses
words|What is the opposite of transparent?|Opaque|Clear|Fragile
words|The word kindergarten comes from which language?|German|French|Dutch|It means children's garden.
words|What does the Italian phrase al fresco mean?|Outdoors|Fancy|Very fresh
words|Starting several words with the same sound, as in Peter Piper picked peppers, is called what?|Alliteration|Rhyme|Onomatopoeia
words|What does the word omnivore literally mean?|Eats everything|Eats meat|Eats at night
words|Which of these words is a verb?|Jump|Blue|Quickly
words|What does the prefix sub mean, as in submarine?|Under|Over|Around
words|What is the comparative form of good, as in this one is blank than that one?|Better|Gooder|Best

general|How many sides does an octagon have?|Eight|Six|Ten
general|Who painted The Last Supper?|Leonardo da Vinci|Michelangelo|Rembrandt
general|How many cards are in a standard deck, not counting jokers?|52|54|48
general|Who composed the Moonlight Sonata?|Ludwig van Beethoven|Wolfgang Amadeus Mozart|Johann Sebastian Bach
general|Which famous puzzle was invented in Hungary in 1974?|The Rubik's Cube|The jigsaw puzzle|Sudoku
general|What is the freezing point of water in Fahrenheit?|32 degrees|0 degrees|40 degrees
general|Who wrote Pride and Prejudice?|Jane Austen|Charlotte Bronte|Emily Dickinson
general|In which city is the Colosseum?|Rome|Athens|Florence
general|How many degrees are in a right angle?|90|180|45
general|What is 7 times 8?|56|54|64
general|Who wrote The Adventures of Tom Sawyer?|Mark Twain|Charles Dickens|Jack London
general|What do you call a shape with five sides?|A pentagon|A hexagon|A heptagon
general|How many inches are in a foot?|12|10|16
general|Which instrument did Louis Armstrong famously play?|The trumpet|The saxophone|The trombone
general|What is the main ingredient in ordinary glass?|Sand|Salt|Clay
general|Which fictional detective lived at 221B Baker Street?|Sherlock Holmes|Hercule Poirot|Miss Marple
general|How many ounces are in a pound?|16|12|10
general|What shape is a U.S. stop sign?|An octagon|A hexagon|A circle
general|Who wrote Charlotte's Web?|E. B. White|Roald Dahl|Beverly Cleary
general|What do the angles inside a triangle add up to?|180 degrees|360 degrees|90 degrees
general|Which painter is famous for his pictures of water lilies?|Claude Monet|Edgar Degas|Salvador Dali
general|How many feet are in a mile?|5280|5000|3280
general|In a web address, what does www stand for?|World Wide Web|Wide World Web|Web Wide World
general|Which board game has properties called Boardwalk and Park Place?|Monopoly|Clue|Scrabble
general|How many squares are on a chessboard?|64|81|100
general|Which chess piece moves only diagonally?|The bishop|The rook|The knight
general|What is the next prime number after 7?|11|9|13
general|What is 25 percent of 200?|50|25|75
general|Which language has the most native speakers in the world?|Mandarin Chinese|English|Spanish
general|Who composed The Four Seasons?|Antonio Vivaldi|Johann Sebastian Bach|George Frideric Handel
general|How many sides does a dodecagon have?|12|10|20
general|How many hours are in two days?|48|36|24
general|Which honey-loving bear lives in the Hundred Acre Wood?|Winnie the Pooh|Paddington|Baloo
`;

const easy = `
animals|Which animal is often called man's best friend?|The dog|The cat|The goldfish
animals|What do cows give us to drink?|Milk|Juice|Lemonade
animals|Which insect lives in a hive?|The bee|The ant|The spider
animals|How many legs does a bird have?|Two|Four|Six
animals|What is a baby sheep called?|A lamb|A kid|A cub
animals|Which black and white animal eats bamboo?|The panda|The zebra|The skunk
animals|Which animal hops and carries its baby in a pouch?|The kangaroo|The rabbit|The frog
animals|What is a baby bear called?|A cub|A pup|A chick
animals|Which sea animal has eight arms?|The octopus|The starfish|The crab
animals|Which big cat lives in Africa, and the male has a mane?|The lion|The tiger|The leopard
animals|What do birds use to fly?|Wings|Fins|Paws
animals|Which slow animal carries its shell home on its back?|The snail|The rabbit|The squirrel
animals|Which striped animal looks like a horse?|The zebra|The panda|The cow
animals|What is a baby chicken called?|A chick|A duckling|A calf
animals|Where do fish live?|In water|In trees|In the sand
animals|Which animal is famous for its loud roar?|The lion|The mouse|The rabbit
animals|What do caterpillars like to eat?|Leaves|Rocks|Fish
animals|Which animal has a shell and can pull its head inside?|The turtle|The frog|The lizard
animals|Which farm animal says oink?|The pig|The cow|The sheep
animals|What is a bird's home called?|A nest|A burrow|A hive
animals|How many legs does a dog have?|Four|Two|Six
animals|Which animal has a bushy tail and gathers nuts?|The squirrel|The deer|The owl
animals|What do bats use to find their way in the dark?|Echoes|Flashlights|Maps|They make high squeaks and listen for the echoes.
animals|What is a mother horse called?|A mare|A hen|A doe
animals|Which of these animals is a mammal?|The whale|The shark|The tuna|Whales breathe air and feed their babies milk.

science|What do we call the center of the Earth?|The core|The crust|The cave
science|What do we use our ears for?|Hearing|Smelling|Seeing
science|Which season is the coldest?|Winter|Summer|Spring
science|What do you need to see a rainbow?|Sunlight and raindrops|Wind and snow|Clouds and thunder
science|What do most plants grow from?|Seeds|Rocks|Feathers
science|Which tool tells you the temperature?|A thermometer|A ruler|A clock
science|What do we call air that moves around outside?|Wind|Rain|Fog
science|Which body parts help you breathe?|The lungs|The stomach|The bones
science|What happens to ice when it gets warm?|It melts|It grows|It freezes
science|How many senses do people usually talk about?|Five|Three|Ten
science|Which part of a plant is usually under the ground?|The roots|The flowers|The leaves
science|What does a bee carry from flower to flower?|Pollen|Water|Sand
science|What white, cold stuff falls from clouds in winter?|Snow|Sand|Sugar
science|What covers most of the Earth's surface?|Water|Sand|Ice
science|Which part of your body do you think with?|The brain|The heart|The knee
science|What do we call water that has turned into a hot gas?|Steam|Ice|Rain
science|All the bones in your body together are called your what?|Skeleton|Skin|Muscles
science|Which direction does a compass needle point?|North|South|Up
science|What do you call the hard outside of an egg?|The shell|The yolk|The peel
science|Which of these is a solid?|A rock|Milk|Air
science|What gives us light during the day?|The Sun|The Moon|The stars
science|Frogs belong to which group of animals?|Amphibians|Birds|Fish
science|During a storm, what flash comes before the thunder?|Lightning|A rainbow|Sunshine

space|How many moons does Earth have?|One|Two|Four
space|What shape is a full moon?|A circle|A square|A triangle
space|Who was the first person to walk on the Moon?|Neil Armstrong|Christopher Columbus|George Washington
space|What do we call a group of stars that makes a picture in the sky?|A constellation|A comet|A rocket
space|Which planet is closest to the Sun?|Mercury|Earth|Jupiter
space|What do astronauts ride into space?|A rocket|A submarine|A train
space|When is the best time to see the stars?|At night|At noon|At breakfast time
space|What is the Moon covered with?|Rock and dust|Grass|Water
space|How many planets are in our solar system?|Eight|Three|Twenty
space|What is a shooting star?|A meteor|A bird|An airplane
space|What do we call the path a planet takes around the Sun?|An orbit|A road|A river
space|Which planet has a giant red spot?|Jupiter|Earth|Mercury
space|What is it called when the Moon blocks out the Sun?|A solar eclipse|A sunset|A rainbow
space|Which is bigger, the Sun or the Earth?|The Sun|The Earth|They're the same size|You could fit about a million Earths inside the Sun.
space|Where do astronauts live while they circle the Earth?|A space station|A castle|A submarine

geography|What is the biggest country in the world?|Russia|Canada|China
geography|Which country is just north of the United States?|Canada|Mexico|Brazil
geography|Which country is just south of the United States?|Mexico|Canada|Peru
geography|What is the name of the icy land around the South Pole?|Antarctica|Greenland|Alaska
geography|Which ocean is along the east coast of the United States?|The Atlantic|The Pacific|The Indian Ocean
geography|Which ocean is along the west coast of the United States?|The Pacific|The Atlantic|The Arctic
geography|What do we call a very dry place with very little rain?|A desert|A forest|A swamp
geography|Which is the biggest continent?|Asia|Europe|Australia
geography|In which country is the city of London?|The United Kingdom|France|Spain
geography|What is land with water all around it called?|An island|A mountain|A valley
geography|Which city has the Statue of Liberty?|New York City|Chicago|Miami
geography|In which country is the city of Tokyo?|Japan|China|Korea
geography|What is a map of the world shaped like a ball called?|A globe|A compass|A calendar
geography|Which country is famous for pizza and pasta?|Italy|Japan|Canada
geography|In which direction does the Sun rise?|The east|The west|The north
geography|Egypt is on which continent?|Africa|Asia|Europe
geography|What is the name of the long river in Egypt?|The Nile|The Amazon|The Mississippi
geography|Which is the biggest U.S. state?|Alaska|Texas|Rhode Island
geography|What is a big stream of moving water called?|A river|A pond|A puddle

general|How many legs does a table usually have?|Four|Three|Six
general|What color is a ripe banana?|Yellow|Blue|Purple
general|How many hours are in a day?|24|12|60
general|What do you call the person who flies an airplane?|A pilot|A chef|A farmer
general|How many years are in a decade?|Ten|Twelve|Five
general|How many years are in a century?|100|50|1000
general|What is 3 times 3?|9|6|12
general|Which month comes after March?|April|May|February
general|How many days are in September?|30|31|28
general|What is a house made of snow blocks called?|An igloo|A tent|A cabin
general|If you mix black and white paint, what color do you get?|Gray|Brown|Pink
general|On which holiday do people carve jack-o'-lanterns?|Halloween|Thanksgiving|Valentine's Day
general|What is the opposite of hot?|Cold|Warm|Wet
general|How many sides does a rectangle have?|Four|Three|Six
general|In the story, which girl visited the house of three bears?|Goldilocks|Cinderella|Little Red Riding Hood
general|What do you write with on a chalkboard?|Chalk|A crayon|A paintbrush
general|What is 20 minus 5?|15|10|25
general|How many squares are in a tic-tac-toe grid?|Nine|Six|Twelve
general|Which shape is round and has no corners?|A circle|A square|A triangle
general|Which day comes after Tuesday?|Wednesday|Monday|Friday
general|Which instrument has black and white keys?|The piano|The drum|The flute
general|Which wooden puppet's nose grew when he told a lie?|Pinocchio|Peter Pan|Aladdin
general|How many cents are in a dollar?|100|10|50
general|What color do you get when you mix yellow and red?|Orange|Green|Purple
general|What is half of 10?|5|2|20
`;

module.exports = { regular, easy };
