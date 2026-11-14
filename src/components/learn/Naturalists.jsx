"use client";
// Restored from client module 77417 (exports: Naturalists)
import * as t from "react/jsx-runtime";
import * as n from "next/link";
import * as o from "react";
import * as a from "@/lib/learn/rungs";
import * as s from "@/lib/learn/badges";
import * as l from "@/components/learn/ActivityArt";
import * as d from "@/components/learn/family";
import * as u from "@/lib/learn/use-learn";
let i = [],
  r = [
    {
      slug: "acorns-in-tens",
      title: "A hundred acorns",
      theme: "Counting",
      blurb: "Gather a heap, then discover that the only way to count a heap is to stop treating it as one.",
      art: "acorn",
      pitch: "The oak dropped hundreds of acorns. Shall we find out how many?",
      maths: "Grouping as a counting strategy — the first real step towards place value.",
      minutes: 45,
      months: [9, 10, 11],
      why: "Oaks across a whole county drop an enormous crop in the same autumn and almost nothing for the two or three years between. Oaks across a region share weather cues that synchronise their big years, and the effect is to starve the squirrel and jay populations down in the lean years so that when the big crop comes it outruns everything with a mouth. A child filling a bucket this year and half a hatful in two years' time is watching a strategy. The counting problem is the one every numeral system on earth solved the same way: somewhere past twenty you stop counting things and start counting groups of things, and the child has to hit that wall themselves before the trick means anything.",
      look: [
        "Whether this is a heavy year or a thin one — ask anyone who feeds birds, they will know",
        "Small round holes in some of them: a weevil laid an egg in the green acorn and the grub chewed its way out",
        "Which ones the squirrels left behind. White oak acorns sprout the same autumn, so squirrels eat those first and bury the red oak ones that keep",
        "Caps still on, or caps off. The cap is not part of the nut and comes away clean when it is ripe",
      ],
      missteps: {
        two: "Tips the bucket out and wanders off. That is not the lesson failing — gathering IS the lesson at two, and the counting belongs to somebody else in the family. Let them fill and tip as many times as they like.",
        four: "Counts to seventeen twice and gets a different number both times. Nearly always a tracking problem rather than a counting one: they have no way to keep the counted separate from the uncounted. Show them moving each acorn from one heap to another as they say the number, and it usually fixes inside one session.",
        six: "Builds the tens correctly and then counts the piles one, two, three. They have the grouping without the point of it yet. Count the piles aloud with them a few times — ten, twenty, thirty — and let them hear where it goes.",
      },
      evidence:
        "They reach for the egg carton or start making piles without being told to. The moment grouping becomes their idea rather than yours is the whole lesson.",
      reads: {
        href: "/foraging/acorn",
        label: "Acorns in the field guide",
      },
      need: ["A bucket or a hat", "An egg carton, if you have one", "A stick to draw with"],
      steps: [
        "Find a tree dropping acorns, or beech nuts, or maple keys — anything that falls in hundreds. Fill the bucket together. Nobody counts yet.",
        "Tip the heap out on a flat rock or a path and look at it. Ask how many. Let the guesses be wild; write them in the dirt with the stick.",
        "Now count it properly — and the moment it goes wrong, which it will at about seventeen, stop and ask what would make it easier.",
        "Make piles of ten. An egg carton does this for you: one in each hole, and a full carton is a dozen, which is its own conversation.",
        "Count the piles by tens, then add the leftovers. Compare with the guesses in the dirt.",
      ],
      say: {
        two: [
          "Put one acorn in the bucket. One. Now another one — two.",
          "Hand me two acorns. Not three. Two.",
          "Which pile is big? Which is little? Point at the big one.",
        ],
        four: [
          "Count them into my hand, one at a time. One number for each acorn — don't say two numbers for the same one.",
          "How many was that? The last number you said is how many there were.",
          "Make me a pile of ten. Now another ten. How many is two tens?",
        ],
        six: [
          "Count them in tens. Ten, twenty, thirty — and what do we do with the seven left over?",
          "Your brother guessed forty and there are sixty-three. How far out was he?",
          "If every pile is ten, how many piles would a hundred take?",
        ],
      },
      game: "count",
      gameNote: "The same counting, in groups of five on screen, so the grouping habit has somewhere to go on a rainy day.",
      extend: "Weigh ten acorns, then work out what a hundred would weigh without counting them. Then check.",
    },
    {
      slug: "five-minute-bird-count",
      title: "The five-minute bird count",
      theme: "Counting",
      blurb: "Sit still for five minutes and mark down every bird. The oldest one learns tally marks; the youngest learns to sit still.",
      art: "bird",
      pitch: "Let's sit very still for five minutes and count every bird that comes.",
      maths: "Tallying — counting in fives when the things being counted will not hold still.",
      minutes: 20,
      months: i,
      why: "The five-minute point count is not a made-up exercise — it is the actual unit ornithologists use, and most of what is known about which birds are declining comes from tens of thousands of ordinary people doing exactly this. It also teaches something no tidy worksheet can: the three papers will not agree, and none of them is wrong. What you counted is detections, not birds. The same chickadee crossing twice is two detections and one bird, the one calling in the hedge is a bird and not a detection, and learning that a number can be honest and still not be the truth is worth more than the number.",
      look: [
        "Birds passing through against birds that stay — a crow crossing high up is doing something different from a sparrow working the hedge",
        "The ones you hear and never see. Count them separately and the total roughly doubles",
        "What happens in the last minute, once everything has forgotten you are there",
        "The same time tomorrow, and the same time in January",
      ],
      missteps: {
        two: "Cannot sit for five minutes. Do ninety seconds. Sitting still outdoors is a skill being learned here alongside the counting, and it is the harder of the two.",
        four: "Marks three times for one loud bird. They are counting excitement rather than birds. Agree out loud beforehand: one mark when it arrives, nothing for the noise it makes.",
        six: "Insists their count is right and their brother's is wrong. This is the real lesson and it is worth ten minutes: ask what each of them was looking at. Different directions, different birds, both honest.",
      },
      evidence:
        "They start a second column without being asked — birds I saw, birds I heard, or crows and not-crows. Inventing a category is the beginning of a data set.",
      reads: {
        href: "/wildlife",
        label: "The wildlife guide",
      },
      need: ["A clipboard or a book to lean on", "Paper", "A pencil each", "A timer"],
      steps: [
        "Pick a spot where you can see a feeder, a hedge or a bit of open sky. Sit down. This is the hard part.",
        "Set the timer for five minutes. Nobody talks. Every bird that passes gets a mark.",
        "When it goes off, compare the three papers. They will not agree, and why they do not agree is the best conversation of the day.",
        "Do it again tomorrow at the same time and see whether the number holds.",
      ],
      say: {
        two: [
          "Bird! Point at it. Say bird.",
          "One bird. Two birds. Was that one bird or two?",
          "Draw a line on your paper for the bird. One line, one bird.",
        ],
        four: [
          "Every bird gets one mark. One bird, one mark — no double marks for a loud one.",
          "Count your marks at the end. How many?",
          "I got nine and you got six. Did we see different birds, or did one of us miss some?",
        ],
        six: [
          "Four lines and then a line across them — that is five, and now you never have to count past four.",
          "How many bundles of five? So how many birds?",
          "Same time tomorrow: was today a lot or a little?",
        ],
      },
      game: "tally",
      gameNote: "Reading tally bundles back as a number, which is the half of tallying that is easy to skip.",
      extend:
        "Split the count by kind — one column for small brown ones, one for crows, one for everything else. That is a bar chart before it is called one.",
    },
    {
      slug: "how-many-legs",
      title: "How many legs?",
      theme: "Living things",
      blurb: "Spiders have eight and beetles have six, which means a log with four spiders on it is a times table nobody had to invent.",
      art: "bug",
      pitch: "Who has more legs, a beetle or a spider? Let's go and count.",
      maths: "Skip counting and the beginning of multiplication, with a reason to do it.",
      minutes: 40,
      months: [4, 5, 6, 7, 8, 9, 10],
      why: "Six legs or eight is not a coincidence and not a rule someone made up. Insects are built from three body sections with one pair of legs on each part of the middle one; spiders are built from two sections with four pairs on the front one. The count is the body plan, which is why it never varies and why it is the fastest way to sort what you find under a stone. Millipedes and centipedes are neither, and have neither a thousand nor a hundred — millipedes and some centipedes add segments as they grow, so an old one has more legs than a young one of the same species, which children find outrageous and then never forget.",
      look: [
        "Body sections. Three means insect, two means spider, and you can see it with the naked eye on anything bigger than a grain of rice",
        "Where the legs attach. All six insect legs come off the middle section, never the tail end",
        "Which way it runs when the stone comes up — towards dark, or down into the soil",
        "Woodlice: fourteen legs, and not an insect at all. They are crustaceans, closer to a crab than to a beetle, and they breathe through gills",
      ],
      missteps: {
        two: "Wants to hold it. Redirect to a finger's distance and a big cloth to look at things on. The rule that everything goes back under the same stone the same way up matters more today than any number.",
        four: "Counts eight on a beetle. They are counting antennae, or counting a leg twice as it moves. Put it on a pale cloth where it will sit still for a second, and count from the front.",
        six: "Adds four eights by writing 8+8+8+8 and counting on fingers. That is fine and correct — but show them counting in eights once. The point is not that adding is wrong, it is that there is a faster road.",
      },
      evidence:
        "They sort a new find into six-legged or eight-legged before being asked what it is. Body plan before name is how a naturalist actually looks.",
      reads: {
        href: "/wildlife/garden-spider",
        label: "The garden spider",
      },
      need: ["A hand lens if you have one", "A pale cloth or a sheet of paper to look at things on"],
      steps: [
        "Roll a log or lift a flat stone — then put it back the way it was, which matters more than anything found under it.",
        "Count the legs on one thing. Really count them: it is harder than it sounds and the answer is almost always six or eight.",
        "Sort what you find into the six-legged and the eight-legged. That is the actual difference between an insect and a spider, and a four-year-old can see it.",
        "Now count two of the same thing. Then three. Write the running total in the dirt.",
      ],
      say: {
        two: [
          "Look — legs! Lots of legs. Can you wiggle your fingers like that?",
          "How many legs have you got? Two. Count them: one, two.",
          "Gently. We look with our eyes and one finger.",
        ],
        four: [
          "Count the legs on this beetle. Point at each one as you say the number.",
          "Six legs. Now here is another beetle — how many legs on both of them?",
          "Spiders have eight. Is eight more than six, or less?",
        ],
        six: [
          "Four spiders. Eight legs each. Count in eights: eight, sixteen…",
          "If you found forty-eight legs and they were all beetles, how many beetles was that?",
          "Which is more — three spiders or four beetles? Work out both before you answer.",
        ],
      },
      watch:
        "Everything goes back under the same stone the same way up. Nothing comes indoors. Wash hands afterwards, and leave anything that stings alone — looking is the whole lesson.",
      game: "legs",
      gameNote: "The multiplication on its own, without the wriggling.",
      extend: "Millipedes and centipedes do not have a thousand or a hundred. Count the segments instead and multiply by two.",
    },
    {
      slug: "petal-numbers",
      title: "Count the petals",
      theme: "Shapes and patterns",
      blurb:
        "Flowers do not have random numbers of petals. Three, five, eight and thirteen come up again and again, and a six-year-old can find that out in an afternoon.",
      art: "flower",
      pitch: "Every flower has a secret number. Let's count the petals and find it.",
      maths: "Counting small sets accurately, then noticing that a set of counts has a pattern in it.",
      minutes: 40,
      months: [4, 5, 6, 7, 8, 9],
      why: "A growing tip puts out each new part about 137.5 degrees round from the last one. That angle is irrational — no whole number of turns ever brings it back to the start — so nothing ever lands directly above anything older, and nothing shades anything else. The counts that fall out of that packing are the Fibonacci numbers, which is why three, five, eight and thirteen turn up so often in spirals. Petals are a looser case: five is genuinely the commonest number in this half of the plant world, but every mustard has four, and four is not in the sequence at all. Teaching the pattern honestly, exceptions included, is better than teaching a tidier version that a child can disprove in a hedge.",
      look: [
        "Whether what looks like six is really three and three again — lilies and trilliums nearly always are, and the two rings sit at different heights",
        "Daisies and asters: what look like petals are whole flowers, and the yellow middle is hundreds more",
        "Flowers that fold one way only — peas, snapdragons, orchids. They have a left and a right, like a face",
        "Where the bees land, and whether the markings point them in",
      ],
      missteps: {
        two: "Pulls the petals off. Expected. Move to a fallen flower or a dandelion in a lawn where it costs nothing, and keep the pointing finger for the ones still standing.",
        four: "Counts round and round and never stops, because there is no edge to a circle. Give them a starting mark — a blade of grass laid across one petal — and the problem disappears.",
        six: "Wants the sequence to be a law and is annoyed by the mustards. Sit with the annoyance; it is the correct scientific feeling. Collect the exceptions on purpose and the annoyance turns into a project.",
      },
      evidence:
        "They come back with a number you did not ask for. A six-year-old who says the buttercups by the gate are all fives has started a survey.",
      reads: {
        href: "/learn/patterns",
        label: "Patterns and shapes",
      },
      need: ["Paper", "A pencil", "Somewhere with several kinds of flower — a verge is better than a garden"],
      steps: [
        "Find a flower. Count the petals without picking it — get your nose down to it instead.",
        "Write the number down. Draw the flower badly beside it; the drawing is how they look twice.",
        "Do ten flowers. Do not choose them to be different — take what is there.",
        "Now read the list of numbers aloud. Three, five, five, five, eight, five, thirteen… ask what they notice.",
      ],
      say: {
        two: [
          "Flower! What colour? Point at a petal. Just one petal.",
          "One, two, three. Three petals. Say three.",
          "Smell it. Do not pick it — it stays where it is so the bees can find it.",
        ],
        four: [
          "Touch each petal once as you count. Start where the sun is and go all the way round.",
          "Five. Now find another flower with five. Are they the same kind?",
          "Which flower has the most petals of all the ones we've found?",
        ],
        six: [
          "Write each number down as we go. Ten flowers, ten numbers.",
          "Look at your list. Which numbers keep coming back? Which ones never turn up at all?",
          "Three, five, eight, thirteen. Add three and five — what do you get? Now add five and eight.",
        ],
      },
      game: "count",
      gameNote: "Counting small groups fast, which is what petal-counting on a windy day turns into.",
      extend:
        "Those numbers — 1, 1, 2, 3, 5, 8, 13, 21 — each one the sum of the two before it. Count the spirals on a pine cone or a sunflower head and they turn up again.",
    },
    {
      slug: "fold-a-leaf",
      title: "Fold a leaf in half",
      theme: "Shapes and patterns",
      blurb: "Most leaves fold onto themselves almost exactly. Almost is the interesting part.",
      art: "leaf",
      pitch: "Can you fold a leaf so both halves match exactly?",
      maths: "Symmetry, matching, and the idea that two halves can be the same shape and opposite hands.",
      minutes: 30,
      months: [5, 6, 7, 8, 9, 10],
      why: "A leaf is roughly symmetrical because it grows from a single line of dividing cells and both sides get the same instructions — symmetry is cheap to build, not clever. It is also never exact: light comes from one side, an insect took a bite early, the bud was pressed against a twig. Elms go further and are lopsided at the base on purpose, one side of the leaf starting lower on the stalk than the other, which is the easiest way to identify an elm from ten metres. The gap between nearly and exactly is where the real looking happens, and a four-year-old who says no, it does not quite match, has done better than one who says yes.",
      look: [
        "Elm, hackberry and begonia: the two sides of the base start at different heights on the stalk",
        "Count the side veins left and right. One out is normal; five out means something happened",
        "Holes and bites — and whether the leaf grew around them or they came later",
        "Ginkgo, which has no midrib at all and does not fold onto itself in the usual way",
      ],
      missteps: {
        two: "Screws the leaf up instead of folding it. Fine. Crayon rubbings work with a crushed leaf and give the same shape back.",
        four: "Says yes it matches to everything, because yes is the answer that ends the question. Hand them an elm leaf without comment and wait.",
        six: "Folds it, sees a two-millimetre gap, and declares it not symmetrical. Correct and worth praising — then ask how close is close enough, which is a genuinely hard question and the beginning of measurement error.",
      },
      evidence: "They start folding things you did not give them. A feather, a beetle, their own hand.",
      reads: {
        href: "/regions",
        label: "What grows where you are",
      },
      need: ["Fallen leaves, a good handful", "Paper", "Wax crayons with the paper peeled off"],
      steps: [
        "Collect fallen leaves only — a dozen, as different as you can find.",
        "Fold each one down its middle vein. Does the edge land on the edge? Some do it perfectly. Ginkgo and elm do not.",
        "Sort into two piles: folds neatly, does not.",
        "Rub a crayon over paper on top of a leaf. Fold the paper on the vein line and hold it to the window.",
      ],
      say: {
        two: [
          "Big leaf, little leaf. Give me the big one.",
          "Fold it — press. Now open it. Look, a line down the middle.",
          "Scribble on the paper. Look what came through.",
        ],
        four: [
          "Fold it down the middle. Do the two sides match?",
          "Put the matching ones in this pile and the odd ones in that pile. How many in each?",
          "Your hands do this too. Put them together — same shape, opposite ways round.",
        ],
        six: [
          "How many of the twelve folded neatly? So how many did not?",
          "Count the side veins on the left, then on the right. Same number, or one out?",
          "Find something outside that folds in half more than one way. A flower might. A leaf usually cannot.",
        ],
      },
      game: "symmetry",
      gameNote: "Picking the mirrored half, which is the fold done in the head instead of the hands.",
    },
    {
      slug: "shadow-clock",
      title: "The shadow clock",
      theme: "Time and the sky",
      blurb: "Put a stick in the ground and mark its shadow every hour. By evening there is a clock on the lawn that nobody wound.",
      art: "sun",
      pitch: "Your shadow moves all day long. Let's catch it with stones.",
      maths: "Measuring the same thing repeatedly, comparing lengths, and reading a sequence of numbers as a shape.",
      minutes: 30,
      months: i,
      why: "The shadow is shortest when the sun is highest, and the sun is highest at solar noon — which is almost never twelve o'clock. Your clock is set to a time zone that can be half an hour of longitude wide, daylight saving moves it another hour, and the earth's own orbit runs a little fast in one part of the year and slow in another. So a shadow clock and a wristwatch can disagree by more than an hour in summer, and the shadow is the one telling the truth about the sun. That gap is the most teachable thing in the sky: it is the difference between a natural fact and a human agreement, standing on your lawn where a child can see both.",
      look: [
        "Where the shortest shadow points. In the northern hemisphere it is very nearly due north, and a compass points roughly the same way — though in much of North America a compass can be 10–20° off true north (magnetic declination), so the shadow is the truer north",
        "How much faster the shadow moves in the first and last hour than around the middle of the day",
        "Whether the stones curve. In summer they bow one way, in midwinter the other, and at the equinoxes they fall almost in a straight line",
        "The shadow of something with a hole in it — a colander, a tree in leaf. Every spot of light is a little image of the sun",
      ],
      missteps: {
        two: "Stands on the stones and moves them. Give them their own stick and their own stone somewhere harmless.",
        four: "Measures in footsteps with gaps between them, or with one big step and three small ones. The unit has to be the same every time, which is the whole idea of a unit, and it is worth saying out loud.",
        six: "Predicts the next stone in a straight line from the last two. Let them be wrong; the curve is the interesting part, and being wrong about it once is how it gets noticed.",
      },
      evidence:
        "They ask what the shadow does in winter. That is the question the lesson is for, and the only honest answer is to leave the stick in and find out.",
      reads: {
        href: "/the-day",
        label: "The day, hour by hour",
      },
      need: ["A straight stick, about knee-high", "Stones or pegs to mark with", "A tape measure or a piece of string"],
      steps: [
        "Push the stick into open ground first thing in the morning. Somewhere the sun reaches all day.",
        "Every hour, put a stone at the tip of the shadow. Say the time out loud each time.",
        "Measure the shadow at each visit, in whatever unit you like — footsteps work, and so does the four-year-old's arm.",
        "At the end of the day, stand back and look at the curve of stones. Ask which stone is closest to the stick, and why.",
      ],
      say: {
        two: [
          "Stand in the shadow. Now jump out of it. In, out.",
          "Put the stone here, right at the end. Good. One stone.",
          "Is the shadow long or short? Say long.",
        ],
        four: [
          "How many of your steps is the shadow? Heel to toe, no gaps.",
          "It was twelve steps this morning and it is five now. Is it getting longer or shorter?",
          "Where do you think it will be after lunch? Put a stick where you guess, and we'll check.",
        ],
        six: [
          "Write the time and the length each hour. Seven numbers by teatime.",
          "Which hour had the shortest shadow? That is when the sun was highest — near enough to noon, though not exactly, and that is worth arguing about.",
          "Do it again in a month. Same stick, same spot. Is the shortest shadow longer or shorter than it was?",
        ],
      },
      game: "more",
      gameNote: "Which group is bigger, and by how much — the comparison the shadow measurements are made of.",
      extend: "The shortest shadow points due north in the northern hemisphere. Check it against a compass and see how close the lawn got.",
    },
    {
      slug: "moon-calendar",
      title: "A month of moons",
      theme: "Time and the sky",
      blurb:
        "Draw the moon every night for a month. It takes twenty-nine and a half nights to come back to where it started, and no calendar teaches that as well as twenty-nine drawings in a row.",
      art: "moon",
      pitch: "Let's draw the moon every night and see how it changes.",
      maths: "Counting a long sequence, keeping a record, and meeting a cycle that is not seven days long.",
      minutes: 5,
      months: i,
      why: "The moon takes twenty-seven and a third days to go round the earth, but twenty-nine and a half days to get back to the same shape, because the earth has moved along its own orbit in the meantime and the sunlight is coming from a different angle. That gap is why a lunar calendar drifts against a solar one and why every culture that used the moon needed a correction. The other half of the lesson is simpler and stranger: the moon is up in the daytime for about half of every month, plainly visible in a blue sky, and most adults have never once noticed it.",
      look: [
        "The daytime moon. A waxing moon is up in the afternoon; a waning one in the morning",
        "Which side is lit. The lit side always points at the sun, wherever the sun happens to be, including below the horizon",
        "Earthshine — the dark part of a thin crescent faintly visible, lit by sunlight bouncing off the earth",
        "How much later it rises each night. Roughly fifty minutes, which is why it seems to disappear for a week",
      ],
      missteps: {
        two: "Draws a circle every night regardless. Good. The habit of going out and looking is the whole of it at two.",
        four: "Draws the crescent facing whichever way is easiest to draw. Stand beside them and point at the real one; direction is half the record.",
        six: "Gives up on the cloudy nights and abandons the strip. Mark the gaps as clouds and keep going — a record with honest holes in it is a record, and a record with invented nights is not.",
      },
      evidence: "They spot the moon in daylight and tell you, unprompted, before you have seen it.",
      reads: {
        href: "/almanac",
        label: "The almanac",
      },
      need: ["A long strip of paper, or a grid of thirty squares", "A pencil", "A dark pencil or charcoal for the shadowed part"],
      steps: [
        "Rule thirty squares. Number them.",
        "Every clear night, go out, look at the moon, come in and draw it in that night's square. Cloudy nights get a cloud — the gaps are part of the record.",
        "Do not skip the daytime moon. It is up in daylight for half of every month and most people never notice.",
        "At the end, hold the strip at arm's length and look at the shape the month makes.",
      ],
      say: {
        two: [
          "Moon! Point at the moon. Is it a circle or a banana?",
          "Draw a circle. That's the moon.",
          "Say goodnight to the moon. Tomorrow we look again.",
        ],
        four: [
          "Is tonight's moon fatter or thinner than last night's?",
          "How many nights have we drawn so far? Count the squares.",
          "How many squares are left before the strip is full?",
        ],
        six: [
          "From full to full is about twenty-nine and a half nights. How many is that shorter than a month of thirty-one days?",
          "Count the nights from new moon to full. Now count full back to new. Are they the same?",
          "Which half of the month was the moon up in the daytime?",
        ],
      },
      game: "count",
      gameNote: "Quick counting, for the nights the sky is solid cloud.",
    },
    {
      slug: "frost-chain",
      title: "Counting down to frost",
      theme: "Time and the sky",
      blurb:
        "A paper chain with one link for every day until the first frost. Break one off each morning, and on the morning the grass crunches, count what is left.",
      art: "thermometer",
      pitch: "How many sleeps until the first frost? Let's make a chain and find out.",
      maths: "Counting down, subtraction as distance, and what an average actually promises.",
      minutes: 30,
      months: [8, 9, 10],
      why: "An average first-frost date is not a forecast and not a promise. It is the day by which, in about half of past years, it had already frosted — so being a week out in either direction is the normal case, not a failure of the number. Where it gets interesting is that frost is local to a degree almost nothing else is. On a still clear night the ground radiates heat away and the air right above it chills and, being heavy, runs downhill like water and pools in the low ground. A garden at the bottom of a slope can frost while one three hundred metres up the hill does not, on the same night, in the same weather. If you live in a valley, the map is wrong about you, and finding that out is a real piece of science a family can do.",
      look: [
        "Where the frost sits first — the low corner of the garden, the hollow, the field beside the river",
        "Whether the cars frosted and the ground did not, or the other way round",
        "Clear still nights against cloudy windy ones. Cloud is a blanket and wind stirs the cold layer away",
        "What survived it. Kale and parsnip get sweeter; basil is gone by breakfast",
      ],
      missteps: {
        two: "Wants to break the whole chain at once. Hang it out of reach and bring it down each morning.",
        four: "Counts the remaining links from the wrong end, or recounts from one every day. Recounting is not wasted — it is practice — but number the links and they will start reading instead of counting.",
        six: "Treats the average as a deadline and calls it wrong when the frost comes late. Ask how many years would have to be late before the number itself was wrong. That question is the whole of statistics, at six.",
      },
      evidence: "They ask whether it frosted last night before anyone tells them, and go and look at the grass to find out.",
      reads: {
        href: "/zones",
        label: "Hardiness zones and frost dates",
      },
      need: ["Strips of paper", "Glue or tape", "Your town's average first-frost date, which this site will tell you"],
      steps: [
        "Look up the first-frost date for where you live and work out how many days away it is.",
        "Make that many paper links and hang the chain somewhere everyone walks past.",
        "Break one link off every morning, out loud, with the number said.",
        "When the first real frost comes, stop. Count the links left over — or count how many days past zero you went.",
      ],
      say: {
        two: [
          "Break one. Just one. Now it's gone.",
          "Cold. Touch the window — cold. Now touch your cup — warm.",
          "Is the chain long or short today?",
        ],
        four: [
          "How many links are left? Count them.",
          "There were twenty yesterday. How many now?",
          "Will it be frosty tomorrow? What would we look for in the morning?",
        ],
        six: [
          "Thirty-one days is four weeks and how many days?",
          "The frost came eight days early. So was the average wrong, or is an average not a promise?",
          "Next spring we'll do it backwards — counting up to the last frost, when it's safe to plant.",
        ],
      },
      game: "tally",
      gameNote: "Reading a number off a group of marks, which is the chain in shorthand.",
      extend:
        "Keep the number the frost actually came on. Do it three years running and you have your own frost record for your own garden, which beats any map.",
    },
    {
      slug: "sort-the-stones",
      title: "Sort the stones",
      theme: "Measuring",
      blurb: "Heavy, light, rough, smooth, and then the harder question: can something be both?",
      art: "stone",
      pitch: "Which stone is the heaviest? Let's line them up and see.",
      maths: "Sorting by one attribute, then by two at once, which is a grid before it is called one.",
      minutes: 40,
      months: i,
      why: "A rounded stone has travelled. Rock breaks off angular and gets its corners knocked off by being rolled, so roundness is a record of distance in water or ice — and a smooth stone in a field a hundred kilometres from any river was almost certainly carried there by a glacier and dropped when the ice melted. Weight is the other half: two stones the same size can differ by half again in weight, because what they are made of differs. Sorting by two things at once is the step where sorting becomes a grid, and a grid is a table, and a table is how every piece of data a person will ever handle is arranged.",
      look: [
        "Round against angular, and where each kind is lying",
        "Stones with layers you can see — those were laid down as sediment, in water, and the layers are time",
        "A stone with a different stone inside it. Conglomerate is a stone made of older stones",
        "Whether it is the same rock as the bedrock nearby, or a stranger that arrived from somewhere else",
      ],
      missteps: {
        two: "Sorts by a rule that changes halfway through. Ask them what the rule is rather than correcting it — sometimes it is a real rule and a surprising one.",
        four: "Cannot order more than three by weight. Expected. Do it as a series of pairs — heavier than this one? — and the line builds itself.",
        six: "Assumes bigger is heavier and stops testing. Hand them a big pumice or a light sandstone against a small dense one, and let the scales settle it.",
      },
      evidence: "They pick up a stone on a walk and say where they think it came from. Wrong is fine; the question is the achievement.",
      reads: {
        href: "/ground/rocks",
        label: "Kinds of rock",
      },
      need: ["A dozen stones, collected together", "A tray or a patch of flat ground", "Kitchen scales, indoors, for afterwards"],
      steps: [
        "Collect a dozen stones from one place — a beach, a stream bed, a driveway.",
        "Sort them into two piles. Do not say how. Let each child sort them their own way, then guess each other's rule.",
        "Now sort by weight, by hand, into heaviest to lightest. Then check on the scales and see who was wrong.",
        "Last: two piles by size, and within each pile two piles by roughness. Four piles from two questions.",
      ],
      say: {
        two: [
          "Heavy! Ooh, heavy. Now this one — light.",
          "Put the rough ones here. Rub it. Rough, or smooth?",
          "Two piles. This pile, that pile.",
        ],
        four: [
          "Which is heavier, this one or this one? Hold one in each hand.",
          "Put them in a line, heaviest at that end, lightest at this end.",
          "How many are in the heavy pile? How many in the light one? Which has more?",
        ],
        six: [
          "Weigh them. Write the number on a sticky note beside each one.",
          "How much heavier is the biggest than the smallest?",
          "Big and rough, big and smooth, small and rough, small and smooth. Does every stone fit one of the four?",
        ],
      },
      game: "more",
      gameNote: "Which group has more, and by how many — sorting reduced to its comparison.",
      extend:
        "Where did the stones come from? The rock page for your area says what is under you, and rounded stones have usually travelled.",
    },
    {
      slug: "seeds-to-a-hundred",
      title: "Getting to a hundred",
      theme: "Counting",
      blurb: "Sunflower seeds, dried beans or maple keys, and the discovery that a hundred is not very many once it is in tens.",
      art: "seed",
      pitch: "Can we find a hundred seeds? Let's count them in tens.",
      maths: "Counting past the fingers, and ten tens as a thing you can see.",
      minutes: 35,
      months: [8, 9, 10, 11],
      why: "Ten is not special and everyone knows why we use it: we have ten fingers. What is special is the idea that a group can stand in for its contents — that once ten seeds are in a hollow you never have to look at them again and the hollow itself becomes one thing worth counting. That substitution is the whole of place value, and every child meets it as a shock rather than as a definition. It is also worth knowing that nobody, adult or child, can see more than about four things at once without counting. Past four, everyone is either counting or grouping, and grouping is faster.",
      look: [
        "How high they can guess accurately before it becomes a wild number. Four is typical; six is exceptional",
        "Whether a hundred of something big fills the jar to the same mark as a hundred of something small",
        "What a hundred looks like spread out against a hundred in a heap",
        "A seed head — a sunflower, a poppy, a dock — and how many seeds one plant is prepared to lose",
      ],
      missteps: {
        two: "Wants to pour rather than place. Pouring is a lesson too — give them a second container and let them.",
        four: "Puts eleven in a hollow and does not notice. Ten has to be checkable at a glance, which is what an egg carton or an ice tray gives you and a loose pile does not.",
        six: "Counts the full hollows one by one. Slow them down and count in tens out loud together; the speed difference is the argument.",
      },
      evidence: "Faced with a big pile of something new, they start making tens without being told.",
      reads: {
        href: "/gardening",
        label: "This week in the garden",
      },
      need: ["A hundred small seeds or beans", "An ice cube tray or an egg carton", "A jar"],
      steps: [
        "Put ten seeds in each hollow of an egg carton. A dozen hollows: stop at ten and ask what the two spare ones are for.",
        "Count the tens out loud, pointing: ten, twenty, thirty.",
        "Tip the hundred into a jar and mark the level with a pen. Ask how big two hundred would look.",
        "Next day, fill the jar to the mark with something else — acorns, pebbles, pasta — and count that. Is it a hundred too?",
      ],
      say: {
        two: [
          "One seed in the hole. One. Another one — two.",
          "Full. This one's full and this one's empty.",
          "Pour them. Listen to the sound.",
        ],
        four: [
          "Ten in each hole. Count as you drop them in.",
          "Ten, twenty, thirty — keep going. What comes after ninety?",
          "How many holes did we fill? How many seeds is that?",
        ],
        six: [
          "Ten tens is a hundred. So how many is five tens? Fifteen tens?",
          "If half the jar is a hundred, how many seeds does the whole jar hold?",
          "Count out a hundred of something much bigger. Does it reach the same mark?",
        ],
      },
      game: "count",
      gameNote: "Grouped counting on screen, in the same fives and tens the carton makes.",
    },
    {
      slug: "bark-and-repeats",
      title: "Patterns in bark and stone",
      theme: "Shapes and patterns",
      blurb: "Make a pattern from what is on the ground, then get somebody else to finish it.",
      art: "tree",
      pitch: "Trees and stones make patterns. Let's find one and keep it going.",
      maths: "Repeating units — AB, ABB, ABC — which is where algebra quietly begins.",
      minutes: 35,
      months: i,
      why: "A repeating pattern is a rule, and a rule is a thing that can be stated apart from the objects that obey it — stone, cone, stone, cone is the same rule as red, blue, red, blue and as A, B, A, B. That leap, from the things to the rule, is the leap into algebra, and it happens at four with pine cones rather than at fourteen with letters. Bark has patterns of its own worth stealing for the lesson: furrows run vertically because the trunk splits as it thickens, and the pattern a species makes is consistent enough to identify it in winter with no leaves at all.",
      look: [
        "Bark furrows: ash is a neat diamond net, oak is deep ridges, beech stays smooth its whole life",
        "Patterns that repeat and patterns that grow — a fern frond does both at once",
        "Whether a pattern can be read backwards and still be the same pattern",
        "The patterns nobody made: ripples in sand, cracks in dried mud, frost on a window",
      ],
      missteps: {
        two: "Lays out a row with no rule and calls it a pattern. Continue it anyway, inventing a rule that fits, and see whether they object. Sometimes they do, and that is the day they got it.",
        four: "Can continue a pattern but cannot make one. Making is much harder — it needs holding the rule while placing the objects. Start them with a rule you say out loud for them.",
        six: "Reads a four-long unit as a three-long one and gets stuck. Have them say the unit aloud and clap on the first item; hearing it is what finds the length.",
      },
      evidence:
        "They build one and refuse to tell you the rule, waiting for you to work it out. That is the game the lesson is trying to start.",
      reads: {
        href: "/ground/rocks",
        label: "Kinds of rock",
      },
      need: ["Whatever is underfoot: stones, cones, leaves, sticks", "A flat bit of path"],
      steps: [
        "Collect several of each of three things. Ten stones, ten cones, ten leaves.",
        "Lay out stone, cone, stone, cone, stone — and stop. Ask what comes next.",
        "Now a harder one: stone, cone, cone, stone, cone, cone. Then one with three things in the unit.",
        "Let each of them build a pattern for the others to continue. The two-year-old's will not be a pattern; continue it anyway and see what happens.",
      ],
      say: {
        two: [
          "Stone. Cone. Stone. Cone. Say it with me.",
          "Which one comes next? Put it there.",
          "Same, same, different. Point at the different one.",
        ],
        four: [
          "Read the pattern out loud from the start. It helps — you can hear a pattern before you can see it.",
          "Stone, cone, cone. Stone, cone, cone. What comes next?",
          "Make one for me to finish. Don't tell me the rule.",
        ],
        six: [
          "Call them A and B. A, B, B, A, B, B — say the letters instead of the things.",
          "If the pattern is three long and you lay out twenty, what is the twentieth one?",
          "Make a pattern that grows instead of repeating: one stone, two stones, three stones.",
        ],
      },
      game: "pattern",
      gameNote: "Continuing a unit of two, three or four — the same puzzle, laid out for them instead of by them.",
    },
    {
      slug: "mushroom-count",
      title: "Counting mushrooms, hands behind backs",
      theme: "Living things",
      blurb:
        "After rain in autumn there are more mushrooms within fifty steps than anyone expects. This lesson is about counting them and only counting them.",
      art: "mushroom",
      pitch: "Hands behind backs — how many mushrooms can you spot without touching?",
      maths: "Counting things that are scattered rather than lined up, and counting gills in fives.",
      minutes: 30,
      months: [8, 9, 10, 11],
      why: "What comes up after rain is the fruit, not the organism. The fungus itself is a network of threads through the soil or the wood, sometimes hectares of it and decades old, and it puts up a mushroom for the same reason an apple tree puts up an apple. That is why they arrive in flushes two or three days after rain, why they come up in rings and lines, and why picking one does no more harm to the fungus than picking an apple does to the tree. The reason this lesson still takes no basket is different and simpler: the deadly ones and the good ones can look alike enough that experienced adults get it wrong, the worst of them destroy a liver over days with no warning at the time, and a child cannot hold that judgement. So the answer at these ages is never, with no exceptions, and a child who has been told never does not have to weigh anything.",
      look: [
        "Rings and arcs — the fungus growing outward from where it started, fruiting at its edge",
        "Which ones come up under which trees. Many species will only grow with one kind of root partner",
        "Gills, pores or spines underneath. Three different ways of doing the same job",
        "What has been eating them. Slugs and squirrels do not follow our rules and are not evidence of anything",
      ],
      missteps: {
        two: "Reaches for one. Hands behind backs is a physical rule, not a spoken one, at this age — give the hands a job.",
        four: "Asks whether this one is the good kind. Answer plainly: some are and some are not, and we never find out by tasting. Do not soften it into maybe.",
        six: "Wants to identify them and starts making confident calls from a book or a photograph. Take the interest seriously — it is a good instinct — and hold the line that identifying and eating are two separate permissions, and only one of them is on offer.",
      },
      evidence:
        "They say the rule back to you before you say it, and tell somebody else's child off for reaching. That is the rule installed rather than obeyed.",
      reads: {
        href: "/foraging",
        label: "The foraging guide, for adults",
      },
      need: ["Nothing. Deliberately nothing — no basket, no bag, no knife"],
      steps: [
        "Pick a wet day two or three days after rain, and a patch of woodland or old grass.",
        "Set the rule before you leave the house, and have the six-year-old say it back: we look, we count, we do not touch, nothing goes in a mouth.",
        "Walk fifty steps and count every mushroom you pass. Then fifty more.",
        "Choose one that has fallen over on its own and look underneath without lifting it. Count the gills in fives — there are usually more than you can manage.",
        "Photograph the interesting ones instead of taking them. The photograph is the collection.",
      ],
      say: {
        two: [
          "Mushroom! Point with one finger. Hands behind your back.",
          "One mushroom. Two mushrooms. How many?",
          "We look at mushrooms. We never, ever eat them.",
        ],
        four: [
          "Count the mushrooms without moving your feet. Now take five steps and count again.",
          "Are they all the same kind? Which two look the same as each other?",
          "What is the rule? Say it back to me.",
        ],
        six: [
          "Count the gills in fives. How far did you get before you lost track?",
          "Twelve in the first fifty steps and five in the next fifty. Which patch was better, and can you say why?",
          "Why do we never taste a wild mushroom, even one a grown-up says is fine? Because the dangerous one and the good one can look the same, and being nearly sure is not sure.",
        ],
      },
      watch:
        "This lesson is counting and nothing else. No child on this site is ever taught that a wild mushroom is safe to eat, and a photograph — including one on this page — is never enough to identify one. Keep hands behind backs, and wash them at home.",
      game: "count",
      gameNote: "Scattered counting, where the things are not in a tidy row.",
    },
  ],
  h = (e) => r.find((t) => t.slug === e);
let c = {
  two: "var(--azure)",
  four: "var(--moss)",
  six: "var(--gold)",
};
function CG_({ kidName: e, mastered: o, rung: a, onTick: i }) {
  let r = (0, s.nextSkills)(o, a, 3);
  return (
    <div className="card relative overflow-hidden">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-azure" aria-hidden="true" />
      <div className="p-5 pl-6 sm:p-6 sm:pl-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-azure">
          {"1 · Next for "}
          {e}
        </p>
        {0 === r.length ? (
          <p className="mt-3 text-ink-2">Every step ticked. Time for a harder ladder than this one.</p>
        ) : (
          <ul className="mt-4 grid gap-4">
            {r.map((e) => {
              let o = e.lessons.map(h).find(Boolean);
              return (
                <li key={e.id} className="flex gap-4">
                  {o ? (
                    <n.default href={`/learn/lessons/${o.slug}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
                      <l.ActivityArt art={o.art} className="h-16 w-16 transition hover:rotate-[-4deg]" />
                    </n.default>
                  ) : (
                    <l.ActivityArt art="sprout" className="h-16 w-16 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold leading-snug">{e.label}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-2">{e.tell}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {o && (
                        <n.default
                          href={`/learn/lessons/${o.slug}`}
                          className="rounded-full bg-moss px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-moss-2"
                        >
                          Try “{o.title}”
                        </n.default>
                      )}
                      <button
                        type="button"
                        onClick={() => i(e.id)}
                        className="rounded-full border border-edge px-3.5 py-1.5 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
                      >
                        Seen it ✓
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
function CM_({ kidName: e, rows: o }) {
  let a = (0, s.earnedBadges)(o),
    i = (0, s.nextBadges)(o, 2);
  return (
    <div className="card relative overflow-hidden">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-gold-fill" aria-hidden="true" />
      <div className="p-5 pl-6 sm:p-6 sm:pl-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">
          {"2 · "}
          {e}’s badges
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {a.map((e) => (
            <span key={e.id} title={e.note} className="rounded-full border border-gold-fill/60 bg-gold-fill/10 px-3 py-1 text-sm font-semibold">
              {"★ "}
              {e.name}
            </span>
          ))}
          {0 === a.length && (
            <p className="text-sm text-ink-2">
              None yet — they arrive off real entries in{" "}
              <n.default href="/learn/journal" className="font-medium text-moss underline hover:no-underline">
                the journal
              </n.default>
              {", with "}
              {e}’s name on them or done all together.
            </p>
          )}
        </div>
        {i.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {i.map((e) => {
              let n = e.progress?.(o);
              return (
                <div key={e.id} className="rounded-tile bg-paper-2/60 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">Nearly</p>
                  <p className="font-display text-base font-semibold">{e.name}</p>
                  <p className="text-xs text-ink-2">{e.how}</p>
                  {n && (
                    <>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                        <div
                          className="h-full rounded-full bg-gold-fill"
                          style={{
                            width: `${Math.round((n.now / n.need) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-ink-2">
                        {n.now}
                        {" of "}
                        {n.need}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export const Naturalists = function () {
  let e = (0, u.useLearn)(),
    i = (0, d.useFamily)(),
    r = i.kids,
    [h, l] = (0, d.useChosenKid)(r),
    w = (0, o.useMemo)(() => (0, u.countedFor)(e.journal), [e.journal]),
    f = r.find((e) => e.id === h) ?? r[0],
    y = f ? r.indexOf(f) : 0,
    p = (0, o.useMemo)(() => (f ? (0, u.countedFor)(e.journal, f.id) : []), [e.journal, f]),
    b = (t) => {
      f && (i.ensure(), e.toggleSkill(f.id, t));
    };
  return (
    <section>
      <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {r.map((n, o) => {
          let i = (0, d.rungOf)(n),
            r = (0, s.skillsFor)(i),
            h = r.filter((e) => n.skills.includes(e.id)).length,
            c = (0, s.earnedBadges)((0, u.countedFor)(e.journal, n.id)).length,
            g = f?.id === n.id;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => l(n.id)}
              aria-pressed={g}
              className={`card group flex items-center gap-3 p-3 text-left transition hover:shadow-lift hover:border-moss ${g ? "border-moss ring-2 ring-moss/40" : ""}`}
            >
              <d.Avatar kid={n} i={o} size={52} />
              <span className="min-w-0 flex-1">
                <span className="font-display block text-[17px] font-semibold leading-tight group-hover:text-moss">{n.name}</span>
                <span className="mt-0.5 block text-xs text-ink-2">
                  {0 === n.age ? "under 1" : `age ${n.age}`}
                  {" · "}
                  {a.RUNGS.find((e) => e.id === i).label}
                </span>
                <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-paper-2">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${r.length ? (h / r.length) * 100 : 0}%`,
                      background: d.KID_COLOURS[o % d.KID_COLOURS.length],
                    }}
                  />
                </span>
                <span className="mt-1 block text-[11px] text-ink-2">
                  {h}
                  {" of "}
                  {r.length}
                  {" on this rung"}
                  {c ? ` \xb7 ★ ${c}` : ""}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {f && (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <aside className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24">
            <d.WhoBlock title="Whose ladder?" value={f.id} onChange={l} />
            <div>
              <d.Label aside="Move it when it stops being right">Rung</d.Label>
              <div className="mt-3 grid grid-cols-3 gap-1 rounded-full border border-edge bg-paper/60 p-1">
                {a.RUNGS.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={(0, d.rungOf)(f) === e.id}
                    onClick={() =>
                      i.update(f.id, {
                        rung: e.id,
                      })
                    }
                    className={`rounded-full px-2 py-1.5 text-[13px] font-medium leading-tight transition ${(0, d.rungOf)(f) === e.id ? "bg-moss text-white" : "text-ink-2 hover:text-moss"}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">{a.RUNGS.find((e) => e.id === (0, d.rungOf)(f)).skill}</p>
            </div>
            <p className="text-xs leading-relaxed text-ink-2">
              Tick a step when you have seen it happen twice on an ordinary walk. Nothing here is a test.
            </p>
          </aside>
          <div className="grid gap-5">
            <div>
              <h2 className="font-display flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                <d.Avatar kid={f} i={y} size={40} />
                {f.name}’s ladder
              </h2>
              <p className="mt-1 text-sm text-ink-2">
                {f.skills.length} {1 === f.skills.length ? "step" : "steps"}
                {" ticked · "}
                {(0, s.earnedBadges)(p).length}
                {" badges from the journal"}
              </p>
            </div>
            <CG_ kidName={f.name} mastered={f.skills} rung={(0, d.rungOf)(f)} onTick={b} />
            <CM_ kidName={f.name} rows={p} />
            <div className="card relative overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-moss" aria-hidden="true" />
              <div className="p-5 pl-6 sm:p-6 sm:pl-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">3 · The whole ladder</p>
                <div className="mt-4 grid gap-6">
                  {a.RUNGS.map((e) => {
                    let n = c[e.id],
                      o = (0, d.rungOf)(f) === e.id;
                    return (
                      <div key={e.id}>
                        <div className="flex items-baseline gap-2">
                          <p
                            className="font-display text-2xl font-semibold leading-none"
                            style={{
                              color: n,
                            }}
                          >
                            {e.age}
                          </p>
                          <p className="font-display text-lg font-semibold">{e.label}</p>
                          {o && (
                            <span className="rounded-full bg-moss-soft px-2 py-0.5 text-xs font-semibold text-moss">
                              {f.name}
                              {" is here"}
                            </span>
                          )}
                        </div>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {s.SKILLS.filter((t) => t.rung === e.id).map((e) => {
                            let n = f.skills.includes(e.id);
                            return (
                              <li key={e.id}>
                                <button
                                  type="button"
                                  onClick={() => b(e.id)}
                                  aria-pressed={n}
                                  className={`flex h-full w-full items-start gap-3 rounded-tile border p-3 text-left transition ${n ? "border-moss/50 bg-moss/5" : "border-line/80 bg-surface hover:border-moss/60"}`}
                                >
                                  <span
                                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${n ? "border-moss bg-moss text-white" : "border-edge text-transparent"}`}
                                    aria-hidden="true"
                                  >
                                    ✓
                                  </span>
                                  <span className="min-w-0">
                                    <span className={`block text-sm font-semibold leading-snug ${n ? "text-moss-2" : ""}`}>{e.label}</span>
                                    <span className="mt-0.5 block text-xs leading-snug text-ink-2">{e.tell}</span>
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Every badge there is</h2>
        <p className="mt-1.5 max-w-3xl text-ink-2">
          All of them are earned off real entries in{" "}
          <n.default href="/learn/journal" className="font-medium text-moss underline hover:no-underline">
            the journal
          </n.default>{" "}
          — counts that happened, written down. None can be got by tapping a screen, which is deliberate: the games here are a drill, and
          drills do not deserve medals.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.BADGES.map((e) => {
            let n = e.earned(w);
            return (
              <div key={e.id} className={`card flex gap-3 p-4 ${n ? "border-gold-fill/60 bg-gold-fill/5" : ""}`}>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${n ? "bg-gold-fill text-ink" : "bg-paper-2 text-ink-2"}`}
                  aria-hidden="true"
                >
                  ★
                </span>
                <span className="min-w-0">
                  <span className={`font-display block text-lg font-semibold leading-tight ${n ? "" : "text-ink-2"}`}>{e.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink-2">{e.note}</span>
                  <span className="mt-1.5 block text-xs leading-snug text-ink-2">{e.how}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};
