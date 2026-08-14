import type { GameKind, GameRound } from "./game-data";

type Difficulty = "Easy" | "Medium" | "Hard";
type GameItem = { answer: string; visual: string; spoken: string; hint: string; pieces: string[] };

const scenes = [
  "Harbour Breakfast", "Two Cup Cafe", "Fisher Team", "Plural Palm", "Book Boat",
  "Animal Reef", "Noun Island", "Family Table", "Dialogue Dhoni", "Portrait Pier",
  "Clothes Jetty", "Sentence Lagoon", "Pet Palm", "Craft Harbour", "Workshop Wave",
  "Number Reef", "Friday Calendar", "Island Clock", "Routine Route", "Compass Voyage",
];

const banks: Record<Difficulty, [GameItem[], GameItem[], GameItem[]]> = {
  Easy: [
    [
      { answer: "أُرِيدُ سَمَكًا", visual: "🐟", spoken: "أُرِيدُ سَمَكًا", hint: "Ask for fish politely.", pieces: ["أُرِيدُ", "سَمَكًا"] },
      { answer: "مَاءٌ مِنْ فَضْلِكَ", visual: "💧", spoken: "مَاءٌ مِنْ فَضْلِكَ", hint: "Use the polite expression.", pieces: ["مَاءٌ", "مِنْ", "فَضْلِكَ"] },
      { answer: "الطَّعَامُ لَذِيذٌ", visual: "😋", spoken: "الطَّعَامُ لَذِيذٌ", hint: "Describe the food.", pieces: ["الطَّعَامُ", "لَذِيذٌ"] },
      { answer: "مَطْعَمَانِ", visual: "🍽️🍽️", spoken: "مَطْعَمَانِ", hint: "Use the dual for two restaurants.", pieces: ["مَطْعَم", "انِ"] },
      { answer: "فِنْجَانَانِ", visual: "☕☕", spoken: "فِنْجَانَانِ", hint: "There are two cups.", pieces: ["فِنْجَان", "انِ"] },
    ],
    [
      { answer: "صَيَّادُونَ", visual: "🎣🎣", spoken: "صَيَّادُونَ", hint: "Use the masculine sound plural.", pieces: ["صَيَّاد", "ونَ"] },
      { answer: "مُعَلِّمَاتٌ", visual: "👩‍🏫👩‍🏫", spoken: "مُعَلِّمَاتٌ", hint: "Use the feminine sound plural.", pieces: ["مُعَلِّم", "اتٌ"] },
      { answer: "كُتُبٌ", visual: "📚", spoken: "كُتُبٌ", hint: "This is the broken plural of كِتَاب.", pieces: ["كُ", "تُ", "بٌ"] },
      { answer: "أَقْلَامٌ", visual: "✏️✏️", spoken: "أَقْلَامٌ", hint: "This is the broken plural of قَلَم.", pieces: ["أَقْ", "لَا", "مٌ"] },
      { answer: "نَخْلَاتٌ", visual: "🌴🌴", spoken: "نَخْلَاتٌ", hint: "Use the feminine plural ending ات.", pieces: ["نَخْل", "اتٌ"] },
    ],
    [
      { answer: "سُلَحْفَاةٌ", visual: "🐢", spoken: "سُلَحْفَاةٌ", hint: "This animal swims near the reef.", pieces: ["سُلَحْفَاةٌ"] },
      { answer: "البَحْرُ", visual: "🌊", spoken: "البَحْرُ", hint: "الـ makes the noun definite.", pieces: ["ال", "بَحْرُ"] },
      { answer: "كِتَابٌ", visual: "📘", spoken: "كِتَابٌ", hint: "The tanween is a noun sign.", pieces: ["كِتَاب", "ٌ"] },
      { answer: "مَاذَا تُرِيدُ؟", visual: "🍽️❓", spoken: "مَاذَا تُرِيدُ؟", hint: "Ask what your friend wants.", pieces: ["مَاذَا", "تُرِيدُ؟"] },
      { answer: "نَعَمْ، أُحِبُّ السَّمَكَ", visual: "🐟👍", spoken: "نَعَمْ، أُحِبُّ السَّمَكَ", hint: "Give a positive answer.", pieces: ["نَعَمْ،", "أُحِبُّ", "السَّمَكَ"] },
    ],
  ],
  Medium: [
    [
      { answer: "هُوَ طَوِيلٌ", visual: "🧍", spoken: "هُوَ طَوِيلٌ", hint: "Use the masculine adjective.", pieces: ["هُوَ", "طَوِيلٌ"] },
      { answer: "شَعْرُهَا طَوِيلٌ", visual: "👧", spoken: "شَعْرُهَا طَوِيلٌ", hint: "Describe her hair.", pieces: ["شَعْرُهَا", "طَوِيلٌ"] },
      { answer: "قَمِيصٌ أَبْيَضُ", visual: "👕", spoken: "قَمِيصٌ أَبْيَضُ", hint: "Name the white clothing.", pieces: ["قَمِيصٌ", "أَبْيَضُ"] },
      { answer: "فُسْتَانٌ أَزْرَقُ", visual: "👗", spoken: "فُسْتَانٌ أَزْرَقُ", hint: "Name the blue clothing.", pieces: ["فُسْتَانٌ", "أَزْرَقُ"] },
      { answer: "البَحْرُ هَادِئٌ", visual: "🌊", spoken: "البَحْرُ هَادِئٌ", hint: "Match the predicate to the subject.", pieces: ["البَحْرُ", "هَادِئٌ"] },
    ],
    [
      { answer: "البِنْتُ صَغِيرَةٌ", visual: "👧", spoken: "البِنْتُ صَغِيرَةٌ", hint: "Use feminine agreement.", pieces: ["البِنْتُ", "صَغِيرَةٌ"] },
      { answer: "القَمَرُ جَمِيلٌ", visual: "🌙", spoken: "القَمَرُ جَمِيلٌ", hint: "Use masculine agreement.", pieces: ["القَمَرُ", "جَمِيلٌ"] },
      { answer: "عِنْدِي قِطٌّ", visual: "🐈", spoken: "عِنْدِي قِطٌّ", hint: "Say which pet you have.", pieces: ["عِنْدِي", "قِطٌّ"] },
      { answer: "الصَّيَّادُ", visual: "🎣", spoken: "الصَّيَّادُ", hint: "الـ makes the noun definite.", pieces: ["ال", "صَّيَّادُ"] },
      { answer: "جَزِيرَةٌ", visual: "🏝️", spoken: "جَزِيرَةٌ", hint: "This noun is indefinite.", pieces: ["جَزِيرَة", "ٌ"] },
    ],
    [
      { answer: "النَّجَّارُ يَصْنَعُ", visual: "🪚", spoken: "النَّجَّارُ يَصْنَعُ", hint: "Match the worker and action.", pieces: ["النَّجَّارُ", "يَصْنَعُ"] },
      { answer: "المُعَلِّمُ يُعَلِّمُ", visual: "👨‍🏫", spoken: "المُعَلِّمُ يُعَلِّمُ", hint: "Match the teacher and action.", pieces: ["المُعَلِّمُ", "يُعَلِّمُ"] },
      { answer: "صَنَعَ النَّجَّارُ", visual: "🪚🪑", spoken: "صَنَعَ النَّجَّارُ", hint: "Put the verb before the doer.", pieces: ["صَنَعَ", "النَّجَّارُ"] },
      { answer: "النَّخْلَةُ طَوِيلَةٌ", visual: "🌴", spoken: "النَّخْلَةُ طَوِيلَةٌ", hint: "Build a nominal sentence.", pieces: ["النَّخْلَةُ", "طَوِيلَةٌ"] },
      { answer: "زَرَعَ الفَلَّاحُ النَّخْلَةَ", visual: "🌱🌴", spoken: "زَرَعَ الفَلَّاحُ النَّخْلَةَ", hint: "Build a verbal sentence.", pieces: ["زَرَعَ", "الفَلَّاحُ", "النَّخْلَةَ"] },
    ],
  ],
  Hard: [
    [
      { answer: "خَمْسَةٌ", visual: "5️⃣", spoken: "خَمْسَةٌ", hint: "Count five shells.", pieces: ["خَمْ", "سَةٌ"] },
      { answer: "عَشَرَةٌ", visual: "🔟", spoken: "عَشَرَةٌ", hint: "This number is ten.", pieces: ["عَ", "شَ", "رَةٌ"] },
      { answer: "عِشْرُونَ", visual: "2️⃣0️⃣", spoken: "عِشْرُونَ", hint: "This number is twenty.", pieces: ["عِشْ", "رُونَ"] },
      { answer: "مِائَةٌ", visual: "💯", spoken: "مِائَةٌ", hint: "This number is one hundred.", pieces: ["مِا", "ئَةٌ"] },
      { answer: "يَوْمُ الجُمُعَةِ", visual: "🕌", spoken: "يَوْمُ الجُمُعَةِ", hint: "This is the weekly prayer day.", pieces: ["يَوْمُ", "الجُمُعَةِ"] },
    ],
    [
      { answer: "شَهْرُ رَمَضَانَ", visual: "🌙", spoken: "شَهْرُ رَمَضَانَ", hint: "Name the fasting month.", pieces: ["شَهْرُ", "رَمَضَانَ"] },
      { answer: "مَا التَّارِيخُ؟", visual: "📅❓", spoken: "مَا التَّارِيخُ؟", hint: "Ask for the date.", pieces: ["مَا", "التَّارِيخُ؟"] },
      { answer: "السَّاعَةُ الثَّالِثَةُ", visual: "🕒", spoken: "السَّاعَةُ الثَّالِثَةُ", hint: "Read the clock.", pieces: ["السَّاعَةُ", "الثَّالِثَةُ"] },
      { answer: "أَذْهَبُ صَبَاحًا", visual: "🌅", spoken: "أَذْهَبُ صَبَاحًا", hint: "The trip happens in the morning.", pieces: ["أَذْهَبُ", "صَبَاحًا"] },
      { answer: "أَنَامُ لَيْلًا", visual: "🌙😴", spoken: "أَنَامُ لَيْلًا", hint: "Sleeping happens at night.", pieces: ["أَنَامُ", "لَيْلًا"] },
    ],
    [
      { answer: "الصَّيْفُ", visual: "☀️", spoken: "الصَّيْفُ", hint: "This season is hot.", pieces: ["ال", "صَّيْفُ"] },
      { answer: "الشِّتَاءُ", visual: "🌧️", spoken: "الشِّتَاءُ", hint: "This season brings cooler rain.", pieces: ["ال", "شِّتَاءُ"] },
      { answer: "الشَّرْقُ", visual: "🌅➡️", spoken: "الشَّرْقُ", hint: "The sun rises here.", pieces: ["ال", "شَّرْقُ"] },
      { answer: "الغَرْبُ", visual: "🌇⬅️", spoken: "الغَرْبُ", hint: "The sun sets here.", pieces: ["ال", "غَرْبُ"] },
      { answer: "مَالِيه شَمَالُ الجَزِيرَةِ", visual: "🧭🏙️", spoken: "مَالِيه شَمَالُ الجَزِيرَةِ", hint: "Use a direction to locate Male.", pieces: ["مَالِيه", "شَمَالُ", "الجَزِيرَةِ"] },
    ],
  ],
};

const kinds: GameKind[] = ["Picture Match", "Sound Hunt", "Letter Builder", "Reef Rush"];
const rotate = <T,>(items: T[], amount: number) => items.map((_, index) => items[(index + amount) % items.length]);
const poolFor = (difficulty: Difficulty, level: number) => {
  const [phase1, phase2, phase3] = banks[difficulty];
  return level <= 7 ? phase1 : level <= 14 ? [...phase1, ...phase2] : [...phase1, ...phase2, ...phase3];
};

export function grade3GameFor(difficulty: string, level: number): GameRound[] {
  const safe = (difficulty in banks ? difficulty : "Easy") as Difficulty;
  const pool = poolFor(safe, level);
  return Array.from({ length: 5 }, (_, roundIndex) => {
    const seed = (level - 1) * 5 + roundIndex;
    const item = pool[(seed * 3 + level) % pool.length];
    const kind = kinds[(level + roundIndex + 1) % kinds.length];
    const options = rotate([...new Set([item.answer, pool[(seed * 3 + level + 2) % pool.length].answer, pool[(seed * 3 + level + 4) % pool.length].answer])], (seed + level) % 3);
    while (options.length < 3) options.push(pool[(seed + options.length) % pool.length].answer);
    const prompt = kind === "Sound Hunt" ? "Listen and catch the matching Grade 3 phrase."
      : kind === "Letter Builder" ? "Arrange the pieces, then tap the finished sentence."
        : kind === "Reef Rush" ? "Race the reef clock and choose the correct Arabic."
          : "Match the picture, number, grammar, or island scene.";
    return { id: `G3-${safe}-L${level}-R${roundIndex + 1}`, kind, prompt: `${scenes[level - 1]}: ${prompt}`, visual: kind === "Sound Hunt" ? "🎧🐬" : item.visual, spoken: item.spoken, pieces: kind === "Letter Builder" ? item.pieces : undefined, options, answer: item.answer, hint: item.hint, seconds: kind === "Reef Rush" ? Math.max(7, 14 - Math.floor(level / 3)) : undefined };
  });
}

export function grade3GamePhase(difficulty: string, level: number): string {
  const phase = level <= 7 ? "Phase 1" : level <= 14 ? "Phases 1–2" : "All three phases";
  const focus = difficulty === "Easy"
    ? level <= 7 ? "Food and dual forms" : level <= 14 ? "Plural challenges" : "Complete Grade 3 foundations"
    : difficulty === "Medium"
      ? level <= 7 ? "Description and clothing" : level <= 14 ? "Agreement and nouns" : "Complete Grade 3 grammar"
      : level <= 7 ? "Numbers and weekdays" : level <= 14 ? "Dates, clocks and routines" : "Complete Grade 3 extension";
  return `${phase} · ${focus}`;
}
