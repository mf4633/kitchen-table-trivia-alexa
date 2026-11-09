'use strict';
// Question bank. One question per line:
//   category | question | correct answer | wrong answer | wrong answer | optional fun fact
// Rules for writers:
//   - Facts must be stable (no "current", "tallest today", records likely to fall) and checkable.
//   - The three choices must sound different from each other when spoken.
//   - No "|" inside text. Numbers as digits without commas (Alexa reads 1440 naturally).
//   - Changing a question's text changes its id (ids are a hash of the text).

const regular = `
geography|What is the capital of Australia?|Canberra|Sydney|Melbourne|Canberra was built as a compromise between Sydney and Melbourne.
geography|Which is the longest river in South America?|The Amazon|The Orinoco|The Parana
geography|Which U.S. state has the longest coastline?|Alaska|Florida|California|Alaska has more coastline than all the other states combined.
geography|What is the smallest country in the world by area?|Vatican City|Monaco|San Marino
geography|Mount Kilimanjaro is in which country?|Tanzania|Kenya|Uganda
geography|What is the capital of Canada?|Ottawa|Toronto|Montreal
geography|Which desert covers much of northern Africa?|The Sahara|The Gobi|The Kalahari
geography|Which is the largest ocean on Earth?|The Pacific|The Atlantic|The Indian Ocean
geography|Which of the Great Lakes is the largest by surface area?|Lake Superior|Lake Michigan|Lake Huron
geography|Which U.S. state is nicknamed the Lone Star State?|Texas|Nevada|Montana
geography|What is the capital of Spain?|Madrid|Barcelona|Seville
geography|In which country would you find Machu Picchu?|Peru|Bolivia|Chile
geography|The Strait of Gibraltar separates Spain from which country?|Morocco|Algeria|Portugal
geography|Which is the only U.S. state made up entirely of islands?|Hawaii|Alaska|Rhode Island
geography|What is the capital of Egypt?|Cairo|Alexandria|Luxor
geography|Which river flows through Paris?|The Seine|The Loire|The Rhine
geography|Which mountain range is often used as the border between Europe and Asia?|The Ural Mountains|The Alps|The Pyrenees
geography|What is the largest U.S. state by area?|Alaska|Texas|California
geography|What is the capital of New Zealand?|Wellington|Auckland|Christchurch
geography|In which U.S. state is the Grand Canyon?|Arizona|Utah|Colorado
geography|Which African country was once known as Abyssinia?|Ethiopia|Sudan|Somalia
geography|Which country has the most natural lakes?|Canada|Russia|Brazil|Canada holds more than half of the world's natural lakes.
geography|Venice, the city of canals, is in which country?|Italy|Greece|Croatia

history|In what year did the Titanic sink?|1912|1905|1921
history|Who was the first President of the United States?|George Washington|John Adams|Thomas Jefferson
history|Which ancient wonder was a giant bronze statue of the sun god Helios?|The Colossus of Rhodes|The Lighthouse of Alexandria|The Temple of Artemis
history|In what year did astronauts first land on the Moon?|1969|1965|1972
history|Who wrote the first draft of the Declaration of Independence?|Thomas Jefferson|Benjamin Franklin|John Adams
history|In what year did the Berlin Wall fall?|1989|1991|1985
history|Which civilization built Machu Picchu?|The Inca|The Aztecs|The Maya
history|Who was Britain's prime minister for most of World War Two?|Winston Churchill|Neville Chamberlain|Clement Attlee
history|Which president issued the Emancipation Proclamation?|Abraham Lincoln|Ulysses S. Grant|Andrew Johnson
history|Which country gave the Statue of Liberty to the United States?|France|England|Spain
history|In what year did World War One begin?|1914|1917|1910
history|Who was the first woman to fly solo across the Atlantic Ocean?|Amelia Earhart|Bessie Coleman|Harriet Quimby|She made the flight in 1932, from Newfoundland to Northern Ireland.
history|The Magna Carta was sealed in 1215 in which country?|England|France|Scotland
history|Who was the first person to walk on the Moon?|Neil Armstrong|Buzz Aldrin|John Glenn
history|The Wright brothers made their first powered flight in which state?|North Carolina|Ohio|Virginia|They flew at Kitty Hawk in December 1903.
history|Who was granted the first U.S. patent for the telephone, in 1876?|Alexander Graham Bell|Thomas Edison|Nikola Tesla
history|Which British monarch reigned for more than 70 years?|Elizabeth the Second|Victoria|George the Third
history|Which Roman town was buried when Mount Vesuvius erupted in the year 79?|Pompeii|Carthage|Sparta
history|In which city was President John F. Kennedy assassinated?|Dallas|Houston|Chicago
history|What was the name of the ship that carried the Pilgrims to America in 1620?|The Mayflower|The Santa Maria|The Endeavour
history|Who was the first U.S. president to live in the White House?|John Adams|George Washington|Thomas Jefferson|Washington chose the site, but Adams moved in first, in 1800.
history|The Great Wall was built to protect which country?|China|Japan|Mongolia

science|What is the chemical symbol for gold?|Au|Ag|Gd
science|Which gas do plants take in from the air to make food?|Carbon dioxide|Oxygen|Nitrogen
science|How many bones are in the adult human body?|206|186|226
science|What is the hardest natural substance?|Diamond|Quartz|Granite
science|At sea level, water boils at what temperature in Fahrenheit?|212 degrees|200 degrees|180 degrees
science|In an animal cell, where is most of the DNA kept?|The nucleus|The cell membrane|The cytoplasm
science|What is the most common gas in Earth's atmosphere?|Nitrogen|Oxygen|Carbon dioxide|Nitrogen makes up about 78 percent of the air.
science|What is the largest organ of the human body?|The skin|The liver|The brain
science|Sound travels fastest through which of these?|Steel|Water|Air
science|Which blood type is known as the universal donor for red blood cells?|O negative|A positive|AB positive
science|Who developed the theory of general relativity?|Albert Einstein|Isaac Newton|Niels Bohr
science|What is the chemical symbol for sodium?|Na|So|Sd|It comes from natrium, the Latin name.
science|Which vitamin does your skin make in sunlight?|Vitamin D|Vitamin C|Vitamin A
science|What does a seismograph measure?|Earthquakes|Wind speed|Rainfall
science|How many chambers does the human heart have?|Four|Two|Three
science|About how long does sunlight take to reach Earth?|Eight minutes|Eight seconds|Eight hours
science|What kind of energy does a moving object have?|Kinetic energy|Potential energy|Chemical energy
science|What is the freezing point of water in Celsius?|Zero degrees|32 degrees|Ten degrees
science|Which part of a plant makes most of its food?|The leaves|The roots|The flowers
science|What is the center of an atom called?|The nucleus|The shell|The orbit
science|Which metal is liquid at room temperature?|Mercury|Lead|Tin

space|Which planet is known as the Red Planet?|Mars|Jupiter|Venus
space|What is the largest planet in our solar system?|Jupiter|Saturn|Neptune
space|Which planet is closest to the Sun?|Mercury|Venus|Mars
space|What is the name of our galaxy?|The Milky Way|Andromeda|The Whirlpool
space|Which planet has the brightest, best-known rings?|Saturn|Uranus|Neptune
space|Which planet is the hottest in our solar system?|Venus|Mercury|Mars|Venus is farther from the Sun than Mercury, but its thick atmosphere traps heat.
space|What was the first artificial satellite, launched in 1957?|Sputnik 1|Explorer 1|Vanguard 1
space|A light-year is a measure of what?|Distance|Time|Brightness
space|How many planets are in our solar system?|Eight|Nine|Seven
space|Which former ninth planet was reclassified as a dwarf planet in 2006?|Pluto|Ceres|Eris
space|Which NASA rover landed on Mars in February 2021?|Perseverance|Curiosity|Opportunity
space|Who was the first person to travel into space?|Yuri Gagarin|Alan Shepard|John Glenn|He orbited Earth once, in April 1961.
space|The Sun is made mostly of which element?|Hydrogen|Helium|Carbon
space|Which planet rotates on its side?|Uranus|Neptune|Saturn

animals|What is the fastest land animal?|The cheetah|The lion|The pronghorn
animals|How many legs does a spider have?|Eight|Six|Ten
animals|What is the largest animal alive today?|The blue whale|The African elephant|The whale shark
animals|What is a group of lions called?|A pride|A pack|A herd
animals|Which of these mammals can truly fly?|The bat|The flying squirrel|The sugar glider|Flying squirrels and sugar gliders only glide.
animals|What is a baby kangaroo called?|A joey|A kit|A cub
animals|How many hearts does an octopus have?|Three|One|Two
animals|What is the national bird of the United States?|The bald eagle|The wild turkey|The golden eagle
animals|What is a male duck called?|A drake|A gander|A cob
animals|Which animal is called the ship of the desert?|The camel|The horse|The donkey
animals|What kind of animal is a Komodo dragon?|A lizard|A snake|A crocodile
animals|Giant pandas eat mostly what?|Bamboo|Eucalyptus|Grass
animals|What is the largest kind of fish?|The whale shark|The great white shark|The hammerhead shark
animals|What is a group of crows called?|A murder|A parliament|A pod
animals|Which bird cannot fly but is the fastest runner of all birds?|The ostrich|The emu|The penguin
animals|Which animal sleeps standing up and is measured in hands?|The horse|The cow|The camel

sports|How many players does each soccer team have on the field?|Eleven|Ten|Nine
sports|In which sport would you perform a slam dunk?|Basketball|Volleyball|Tennis
sports|In American football, how many points is a touchdown worth before the extra point?|Six|Seven|Three
sports|About how long is a marathon?|26 miles|22 miles|31 miles
sports|Which country hosted the first modern Olympic Games in 1896?|Greece|France|England
sports|In tennis, what is a score of zero called?|Love|Nil|Duck
sports|How many holes are in a standard round of golf?|18|9|21
sports|What color jersey does the overall leader of the Tour de France wear?|Yellow|Green|Red
sports|How many strikes make an out in baseball?|Three|Four|Two
sports|In bowling, what do you call knocking down all ten pins with your first ball?|A strike|A spare|A split
sports|Which sport uses a shuttlecock?|Badminton|Squash|Table tennis
sports|How many rings are on the Olympic flag?|Five|Six|Four
sports|The Stanley Cup is awarded in which sport?|Ice hockey|Basketball|Baseball

food|Guacamole is made mainly from which fruit?|Avocado|Lime|Tomatillo
food|Sushi comes from which country?|Japan|China|Korea
food|What is the main ingredient in hummus?|Chickpeas|Lentils|White beans
food|Which spice comes from the dried threads of a crocus flower?|Saffron|Turmeric|Paprika|It takes thousands of flowers to make a single ounce.
food|Which pasta's name means little ears in Italian?|Orecchiette|Farfalle|Penne
food|Which nut is used to make marzipan?|Almonds|Cashews|Hazelnuts
food|A prune is a dried what?|Plum|Grape|Fig
food|Parmigiano Reggiano cheese comes from which country?|Italy|France|Switzerland
food|Which fruit wears its seeds on the outside?|The strawberry|The raspberry|The kiwi
food|Tofu is made from what?|Soybeans|Rice|Chickpeas
food|Which vegetable is the main ingredient in sauerkraut?|Cabbage|Cucumber|Onion

words|What is a word that reads the same forward and backward called?|A palindrome|An anagram|An acronym
words|What is the plural of mouse, the animal?|Mice|Mouses|Meese
words|Which word means a fear of spiders?|Arachnophobia|Claustrophobia|Acrophobia
words|What does the prefix bi mean, as in bicycle?|Two|Half|Many
words|What do you call words that sound alike but mean different things, like pair and pear?|Homophones|Synonyms|Antonyms
words|In the acronym scuba, what does the S stand for?|Self-contained|Submarine|Sea|Scuba stands for self-contained underwater breathing apparatus.
words|Which of these words is a synonym for happy?|Joyful|Gloomy|Weary
words|What is the past tense of the verb to swim?|Swam|Swimmed|Swammed

general|How many days are in a leap year?|366|365|364
general|What color do you get when you mix blue and yellow?|Green|Purple|Orange
general|How many sides does a hexagon have?|Six|Five|Eight
general|Whose portrait is on the U.S. one-dollar bill?|George Washington|Abraham Lincoln|Alexander Hamilton
general|How many minutes are in a full day?|1440|1240|1640
general|Who painted the Mona Lisa?|Leonardo da Vinci|Michelangelo|Raphael
general|What is the square root of 144?|12|14|16
general|Who wrote Romeo and Juliet?|William Shakespeare|Charles Dickens|Jane Austen
general|What is the main language spoken in Brazil?|Portuguese|Spanish|French
general|How many zeros are in one million?|Six|Five|Seven
general|How many strings does a standard guitar have?|Six|Four|Eight
general|In the U.S., Thanksgiving falls on which Thursday of November?|The fourth|The third|The last|Most years the fourth is also the last, but not when November has five Thursdays.
general|In Roman numerals, what number is X?|Ten|Five|Fifty
general|How many hours are in a week?|168|148|188
general|Who painted The Starry Night?|Vincent van Gogh|Claude Monet|Pablo Picasso
general|How many keys does a standard piano have?|88|76|96
general|What is 15 times 4?|60|45|75
`;

const easy = `
animals|How many legs does an insect have?|Six|Eight|Four
animals|What do bees make?|Honey|Milk|Jam
animals|Which animal is the tallest in the world?|The giraffe|The elephant|The horse
animals|What is a baby dog called?|A puppy|A kitten|A calf
animals|What is a baby cat called?|A kitten|A cub|A foal
animals|Which bird hoots at night?|An owl|A duck|A robin
animals|What can a caterpillar grow up to be?|A butterfly|A bee|A ladybug
animals|Which animal has a long trunk?|The elephant|The rhino|The hippo
animals|How many legs does a spider have?|Eight|Six|Ten
animals|Which lizard is famous for changing its color?|The chameleon|The iguana|The gecko
animals|What are baby frogs called?|Tadpoles|Pups|Chicks
animals|Which animal sleeps hanging upside down?|The bat|The bear|The deer
animals|What is a group of fish swimming together called?|A school|A class|A team
animals|Which bird is famous for copying words people say?|The parrot|The robin|The pigeon
animals|An animal that eats only plants is called a what?|Herbivore|Carnivore|Insectivore
animals|Which big cat has stripes?|The tiger|The lion|The cheetah
animals|Where does a polar bear live?|The Arctic|The jungle|The desert
animals|What do you call a baby cow?|A calf|A lamb|A piglet

science|What do plants need from the Sun to grow?|Light|Snow|Wind
science|What is frozen water called?|Ice|Steam|Fog
science|What do we call water that falls from clouds?|Rain|Dew|Mist
science|Which sense do you use your nose for?|Smell|Taste|Hearing
science|Which body part pumps blood around your body?|The heart|The lungs|The stomach
science|What do you call a scientist who studies dinosaur fossils?|A paleontologist|An astronaut|A chemist
science|A magnet will stick to which of these?|Iron|Wood|Plastic
science|Which gas do we need to breathe in to live?|Oxygen|Helium|Carbon dioxide
science|What shape is the Earth closest to?|A ball|A cube|A flat plate
science|How many colors are usually named in a rainbow?|Seven|Five|Ten
science|What do we call the hot, melted rock that comes out of a volcano?|Lava|Sand|Clay
science|Which of these is a liquid at room temperature?|Water|Ice|Wood

space|What is the name of the planet we live on?|Earth|Mars|Venus
space|What does the Moon travel around?|The Earth|Mars|Jupiter
space|Which planet is famous for its rings?|Saturn|Mars|Mercury
space|What is the biggest planet in our solar system?|Jupiter|Earth|Mars
space|What is the Sun?|A star|A planet|A moon
space|Which planet is called the Red Planet?|Mars|Neptune|Venus
space|What do astronauts wear to go outside their spacecraft?|A spacesuit|A raincoat|A wetsuit
space|What is the star closest to Earth?|The Sun|The North Star|Sirius

geography|Which is the biggest ocean?|The Pacific|The Atlantic|The Arctic
geography|In which country is the Eiffel Tower?|France|Italy|Germany
geography|How many continents are there?|Seven|Five|Ten
geography|Which continent is the coldest?|Antarctica|Europe|Africa
geography|What is the capital of the United States?|Washington, D.C.|New York City|Philadelphia
geography|In which country do kangaroos live in the wild?|Australia|Brazil|Canada
geography|Which U.S. state is a group of islands in the Pacific Ocean?|Hawaii|Florida|Maine
geography|Which country is shaped like a boot?|Italy|Spain|Japan
geography|In which country are the Great Pyramids of Giza?|Egypt|Mexico|China
geography|Which is the tallest mountain in the world above sea level?|Mount Everest|Mount Fuji|Mount Rushmore

general|How many days are in a week?|Seven|Five|Ten
general|What color do you get when you mix red and white?|Pink|Purple|Orange
general|How many sides does a triangle have?|Three|Four|Five
general|How many months are in a year?|Twelve|Ten|Fourteen
general|What is 5 plus 7?|12|11|13
general|Which shape has four equal sides and four corners?|A square|A triangle|A circle
general|What do you use to see stars that are far away?|A telescope|A microscope|A stethoscope
general|How many minutes are in an hour?|60|100|30
general|What color are most school buses in the U.S.?|Yellow|Red|Blue
general|Which season comes after winter?|Spring|Summer|Fall
general|How many letters are in the English alphabet?|26|24|30
general|What is 10 times 10?|100|1000|20
general|Which fruit is long, yellow, and curved?|A banana|An apple|A grape
general|In the fairy tale, who left behind a glass slipper?|Cinderella|Snow White|Rapunzel
general|How many wheels does a tricycle have?|Three|Two|Four
general|What do you call a word that means the opposite of another word?|An antonym|A synonym|A rhyme
`;

module.exports = { regular, easy };
