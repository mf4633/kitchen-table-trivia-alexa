'use strict';
// Batch 4 (2026-11-09): more space, and the new music category.
// Music rules: composers, instruments, terms, and long-settled facts only. No chart
// positions, sales records, or "most streamed", which change and are disputed.

const regular = `
space|Which planet has the largest known volcano, Olympus Mons?|Mars|Venus|Jupiter|It's about two and a half times as tall as Mount Everest.
space|How many moons does Mars have?|Two|One|Four
space|Which Apollo mission had to abandon its Moon landing after an oxygen tank exploded?|Apollo 13|Apollo 11|Apollo 1
space|Who was the first American woman in space?|Sally Ride|Mae Jemison|Christa McAuliffe
space|Who was the first woman in space, in 1963?|Valentina Tereshkova|Sally Ride|Svetlana Savitskaya
space|What do we call billions of stars held together by gravity?|A galaxy|A constellation|A nebula
space|What is Jupiter mostly made of?|Hydrogen and helium|Rock|Ice
space|Where is the main asteroid belt?|Between Mars and Jupiter|Between Earth and Mars|Beyond Neptune
space|What is the largest object in the asteroid belt?|Ceres|Vesta|Pallas
space|Europa, a moon that may have an ocean under its ice, orbits which planet?|Jupiter|Saturn|Uranus
space|Which spacecraft is the farthest human-made object from Earth?|Voyager 1|Pioneer 10|New Horizons
space|Which NASA spacecraft flew past Pluto in 2015?|New Horizons|Voyager 2|Cassini
space|Who was the first American in space, in 1961?|Alan Shepard|John Glenn|Gus Grissom
space|How many people have walked on the Moon?|12|6|24|All of them on Apollo missions between 1969 and 1972.
space|What color are the hottest stars?|Blue|Red|Yellow
space|What kind of star is the Sun often called?|A yellow dwarf|A red giant|A white dwarf
space|When the lit part of the Moon grows bigger each night, the Moon is said to be what?|Waxing|Waning|Eclipsing
space|About how old is the universe?|13.8 billion years|4.6 billion years|1 million years
space|About how old is the Earth?|4.5 billion years|13.8 billion years|10 thousand years
space|On which planet is a day longer than its year?|Venus|Mercury|Mars|Venus spins so slowly that it orbits the Sun before turning once.
space|What are the dark, cooler patches on the Sun's surface called?|Sunspots|Moon shadows|Craters
space|What do we call a rocky object that orbits the Sun, mostly between Mars and Jupiter?|An asteroid|A comet|A moon
space|What is a comet's glowing tail made of?|Gas and dust|Smoke|Lava
space|Which planet is named after the Roman god of the sea?|Neptune|Uranus|Saturn
space|Which planet is named after the Roman messenger god?|Mercury|Mars|Jupiter
space|The James Webb Space Telescope was built mainly to see what kind of light?|Infrared|X-rays|Ultraviolet
space|What is the Kuiper Belt?|A region of icy bodies beyond Neptune|A ring around Saturn|A belt of stars in our galaxy
space|Which constellation is known as the Hunter?|Orion|Ursa Major|Leo

music|Which band came from Liverpool and included John, Paul, George, and Ringo?|The Beatles|The Rolling Stones|The Who
music|Who was known as the King of Rock and Roll?|Elvis Presley|Chuck Berry|Little Richard
music|How many lines are on a standard music staff?|Five|Four|Six
music|Which instrument is the cellist Yo-Yo Ma famous for?|The cello|The violin|The piano
music|Freddie Mercury was the lead singer of which band?|Queen|Aerosmith|Kiss
music|Which composer kept writing music after he lost his hearing?|Ludwig van Beethoven|Wolfgang Amadeus Mozart|Franz Schubert|His Ninth Symphony premiered when he was almost completely deaf.
music|What does an orchestra conductor usually hold?|A baton|A bow|A mallet
music|Which large instrument has strings that are plucked and a tall triangular frame?|The harp|The cello|The double bass
music|How many strings does a violin have?|Four|Five|Six
music|Which singer is called the Queen of Soul?|Aretha Franklin|Diana Ross|Whitney Houston
music|Which singer was known as the Man in Black?|Johnny Cash|Willie Nelson|Hank Williams
music|What is the highest standard female singing voice?|Soprano|Alto|Tenor
music|In music, what does tempo mean?|Speed|Loudness|Pitch
music|Who composed the music for the ballet The Nutcracker?|Pyotr Ilyich Tchaikovsky|Johann Strauss|Igor Stravinsky
music|The Sound of Music tells the story of which singing family?|The von Trapps|The Jacksons|The Osmonds
music|Bob Marley is most famous for which style of music?|Reggae|Calypso|Ska
music|Which instrument did Jimi Hendrix famously play?|The electric guitar|The drums|The bass
music|In music, what does forte mean?|Loud|Soft|Fast
music|In music, what does piano mean, as an instruction?|Soft|Loud|Slow|The instrument's full name, pianoforte, means soft-loud.
music|Elvis Presley's home, Graceland, is in which city?|Memphis|Nashville|New Orleans
music|The saxophone is made of brass, but which family of instruments does it belong to?|Woodwinds|Brass|Percussion|It makes its sound with a reed, like a clarinet.
music|Who was the drummer for the Beatles?|Ringo Starr|Paul McCartney|Keith Moon
music|Which city is nicknamed Music City and is the home of country music?|Nashville|Memphis|Austin
music|What is a group of five musicians called?|A quintet|A quartet|A sextet
music|What instruments does a timpanist play?|Kettle drums|Cymbals|Xylophones
music|Who composed the Bridal Chorus, often called Here Comes the Bride?|Richard Wagner|Felix Mendelssohn|Johann Sebastian Bach
music|Who composed Fur Elise?|Ludwig van Beethoven|Frederic Chopin|Franz Liszt
music|The didgeridoo comes from which country?|Australia|New Zealand|South Africa
music|Bagpipes are most closely associated with which country?|Scotland|Spain|Norway
music|Which singer was nicknamed the Material Girl?|Madonna|Cher|Cyndi Lauper
music|What does a metronome do?|Keeps a steady beat|Tunes a guitar|Makes music louder
music|Which composer wrote more than 600 works and died at 35 in 1791?|Wolfgang Amadeus Mozart|Joseph Haydn|Antonio Vivaldi
music|Which instrument has a slide that the player moves in and out?|The trombone|The trumpet|The tuba
music|What is the lowest standard male singing voice?|Bass|Tenor|Baritone
music|Who composed the Brandenburg Concertos?|Johann Sebastian Bach|George Frideric Handel|Franz Joseph Haydn
`;

const easy = `
music|Which instrument do you hit with sticks?|A drum|A flute|A violin
music|How many strings does a ukulele usually have?|Four|Six|Ten
music|Which long silver instrument do you hold sideways and blow across?|The flute|The trumpet|The tuba
music|The song Twinkle, Twinkle is about what?|A little star|A little car|A little bird
music|Which instrument do you play with a bow?|The violin|The drum|The piano
music|What do you call a group of people who sing together?|A choir|A team|A crowd
music|What do you call the person who leads an orchestra?|The conductor|The coach|The captain
music|Which instrument usually has six strings and is strummed?|The guitar|The harp|The piano
music|Which instrument is shaped like a triangle and goes ding?|The triangle|The tambourine|The drum
music|What do you hit a xylophone with?|Mallets|A bow|Your elbows
music|In the song, what did Old MacDonald have?|A farm|A boat|A castle
music|Which song do people sing to celebrate a birthday?|Happy Birthday|Jingle Bells|Rock-a-bye Baby
music|Which instrument has keys and pedals and sits in many living rooms?|The piano|The trumpet|The banjo
music|Which instrument do you shake to make a rattling sound?|Maracas|A flute|A cello
music|What do you call music with no singing, just instruments?|Instrumental|Opera|A lullaby
music|What is a soft song sung to help a baby sleep?|A lullaby|A march|An anthem
`;

module.exports = { regular, easy };
