import type { QuizQuestion } from "./quiz-data";

type Difficulty = "Easy" | "Medium" | "Hard";
type Item = { answer: string; visual: string; hint: string; cloze: string };

const scenes = [
  "Harbour Breakfast", "Two Cup Cafe", "Fisher Team", "School Garden", "Turtle Clinic",
  "Book Boat", "Animal Reef", "Noun Island", "Family Table", "Clothes Jetty",
  "Portrait Pier", "Sentence Lagoon", "Pet Palm", "Craft Harbour", "Dhoni Workshop",
  "Number Reef", "Friday Calendar", "Island Clock", "Weather Compass", "Grade Three Voyage",
];

const banks: Record<Difficulty, [Item[], Item[], Item[]]> = {
  Easy: [
    [
      { answer: "أُرِيدُ سَمَكًا", visual: "🐟", hint: "Use أُرِيدُ to ask for food.", cloze: "___ سَمَكًا" },
      { answer: "مَاءٌ مِنْ فَضْلِكَ", visual: "💧", hint: "Use the polite expression.", cloze: "مَاءٌ ___" },
      { answer: "الطَّعَامُ لَذِيذٌ", visual: "😋", hint: "Describe the food.", cloze: "الطَّعَامُ ___" },
      { answer: "مَطْعَمَانِ", visual: "🍽️🍽️", hint: "Use the dual ending for two restaurants.", cloze: "هَذَانِ ___" },
      { answer: "فِنْجَانَانِ", visual: "☕☕", hint: "There are two cups.", cloze: "عَلَى الطَّاوِلَةِ ___" },
    ],
    [
      { answer: "صَيَّادُونَ", visual: "🎣🎣", hint: "Use the masculine sound plural.", cloze: "هَؤُلَاءِ ___" },
      { answer: "مُعَلِّمَاتٌ", visual: "👩‍🏫👩‍🏫", hint: "Use the feminine sound plural.", cloze: "هَؤُلَاءِ ___" },
      { answer: "كُتُبٌ", visual: "📚", hint: "This is the broken plural of كِتَاب.", cloze: "فِي المَكْتَبَةِ ___" },
      { answer: "أَقْلَامٌ", visual: "✏️✏️", hint: "This is the broken plural of قَلَم.", cloze: "عَلَى المَكْتَبِ ___" },
      { answer: "نَخْلَاتٌ", visual: "🌴🌴", hint: "Use the feminine plural ending ات.", cloze: "فِي الجَزِيرَةِ ___" },
    ],
    [
      { answer: "سُلَحْفَاةٌ", visual: "🐢", hint: "This animal swims near the reef.", cloze: "هَذِهِ ___" },
      { answer: "الـ", visual: "🌊", hint: "The definite article is a sign of a noun.", cloze: "___بَحْرُ" },
      { answer: "تَنْوِين", visual: "📘", hint: "Look at the final double vowel mark.", cloze: "كِتَابٌ فِيهِ ___" },
      { answer: "مَاذَا تُرِيدُ؟", visual: "🍽️❓", hint: "Ask what your friend wants.", cloze: "___ تُرِيدُ؟" },
      { answer: "نَعَمْ، أُحِبُّ السَّمَكَ", visual: "🐟👍", hint: "Give a positive answer.", cloze: "___، أُحِبُّ السَّمَكَ" },
    ],
  ],
  Medium: [
    [
      { answer: "هُوَ طَوِيلٌ", visual: "🧍", hint: "Use the masculine adjective.", cloze: "هُوَ ___" },
      { answer: "شَعْرُهَا طَوِيلٌ", visual: "👧", hint: "Describe her hair.", cloze: "___ طَوِيلٌ" },
      { answer: "قَمِيصٌ أَبْيَضُ", visual: "👕", hint: "Name the clothing and colour.", cloze: "___ أَبْيَضُ" },
      { answer: "فُسْتَانٌ أَزْرَقُ", visual: "👗", hint: "Choose the blue clothing.", cloze: "___ أَزْرَقُ" },
      { answer: "البَحْرُ هَادِئٌ", visual: "🌊", hint: "Match the predicate to the subject.", cloze: "البَحْرُ ___" },
    ],
    [
      { answer: "البِنْتُ صَغِيرَةٌ", visual: "👧", hint: "Use feminine agreement.", cloze: "البِنْتُ ___" },
      { answer: "القَمَرُ جَمِيلٌ", visual: "🌙", hint: "Use masculine agreement.", cloze: "القَمَرُ ___" },
      { answer: "عِنْدِي قِطٌّ", visual: "🐈", hint: "Use عِنْدِي to say what you have.", cloze: "___ قِطٌّ" },
      { answer: "الصَّيَّادُ", visual: "🎣", hint: "Add الـ to make the noun definite.", cloze: "___ يَصِيدُ" },
      { answer: "جَزِيرَةٌ", visual: "🏝️", hint: "Without الـ, this noun is indefinite.", cloze: "هَذِهِ ___ جَمِيلَةٌ" },
    ],
    [
      { answer: "النَّجَّارُ يَصْنَعُ", visual: "🪚", hint: "Match the worker to the action.", cloze: "___ الكُرْسِيَّ" },
      { answer: "المُعَلِّمُ يُعَلِّمُ", visual: "👨‍🏫", hint: "Match the teacher to the action.", cloze: "___ الطُّلَّابَ" },
      { answer: "صَنَعَ النَّجَّارُ", visual: "🪚🪑", hint: "Put the verb before the doer.", cloze: "___ الكُرْسِيَّ" },
      { answer: "النَّخْلَةُ طَوِيلَةٌ", visual: "🌴", hint: "Build a nominal sentence.", cloze: "___ طَوِيلَةٌ" },
      { answer: "زَرَعَ الفَلَّاحُ النَّخْلَةَ", visual: "🌱🌴", hint: "Build a complete verbal sentence.", cloze: "___ الفَلَّاحُ النَّخْلَةَ" },
    ],
  ],
  Hard: [
    [
      { answer: "خَمْسَةٌ", visual: "5️⃣", hint: "Count five shells.", cloze: "عِنْدِي ___ أَصْدَافٍ" },
      { answer: "عَشَرَةٌ", visual: "🔟", hint: "This number is ten.", cloze: "فِي القَارِبِ ___ أَسْمَاكٍ" },
      { answer: "عِشْرُونَ", visual: "2️⃣0️⃣", hint: "This number is twenty.", cloze: "فِي الجَزِيرَةِ ___ نَخْلَةً" },
      { answer: "مِائَةٌ", visual: "💯", hint: "This number is one hundred.", cloze: "___" },
      { answer: "يَوْمُ الجُمُعَةِ", visual: "🕌", hint: "This is the weekly prayer day.", cloze: "غَدًا ___" },
    ],
    [
      { answer: "شَهْرُ رَمَضَانَ", visual: "🌙", hint: "Name the fasting month.", cloze: "هَذَا ___" },
      { answer: "مَا التَّارِيخُ؟", visual: "📅❓", hint: "Ask for the date.", cloze: "___؟" },
      { answer: "السَّاعَةُ الثَّالِثَةُ", visual: "🕒", hint: "Read the clock.", cloze: "___" },
      { answer: "أَذْهَبُ صَبَاحًا", visual: "🌅", hint: "The trip happens in the morning.", cloze: "___ إِلَى المَدْرَسَةِ" },
      { answer: "أَنَامُ لَيْلًا", visual: "🌙😴", hint: "Sleeping happens at night.", cloze: "___" },
    ],
    [
      { answer: "الصَّيْفُ", visual: "☀️", hint: "This season is hot.", cloze: "الجَوُّ حَارٌّ فِي ___" },
      { answer: "الشِّتَاءُ", visual: "🌧️", hint: "This season brings cooler rainy weather.", cloze: "هَذَا فَصْلُ ___" },
      { answer: "الشَّرْقُ", visual: "🌅➡️", hint: "The sun rises in this direction.", cloze: "تَطْلُعُ الشَّمْسُ مِنَ ___" },
      { answer: "الغَرْبُ", visual: "🌇⬅️", hint: "The sun sets in this direction.", cloze: "تَغْرُبُ الشَّمْسُ فِي ___" },
      { answer: "مَالِيه شَمَالُ الجَزِيرَةِ", visual: "🧭🏙️", hint: "Use the direction to locate Male.", cloze: "___" },
    ],
  ],
};

const storyOpeners: Record<Difficulty, string[]> = {
  Easy: [
    "حَسَنٌ فِي مَطْعَمِ الجَزِيرَةِ. طَلَبَ سَمَكًا وَمَاءً.",
    "رَأَتْ آمِنَةُ صَيَّادَيْنِ عِنْدَ القَارِبِ. مَعَهُمَا أَسْمَاكٌ.",
    "سَبَحَتْ سُلَحْفَاةٌ قُرْبَ الشَّاطِئِ. ضَحِكَ الأَطْفَالُ.",
  ],
  Medium: [
    "يَعْمَلُ النَّجَّارُ فِي وَرْشَةِ الدُّهُونِي. صَنَعَ كُرْسِيًّا صَغِيرًا لِلقِطِّ.",
    "لَبِسَ حَسَنٌ قَمِيصًا أَبْيَضَ. لَبِسَتْ مَرْيَمُ فُسْتَانًا أَزْرَقَ.",
    "زَرَعَ الفَلَّاحُ نَخْلَةً طَوِيلَةً. جَلَسَ طَائِرٌ عَلَيْهَا.",
  ],
  Hard: [
    "يَوْمَ الجُمُعَةِ ذَهَبَتْ مَرْيَمُ إِلَى المَسْجِدِ صَبَاحًا. عَادَتْ عِنْدَ السَّاعَةِ العَاشِرَةِ.",
    "عَدَّ حَسَنٌ عِشْرِينَ نَخْلَةً فِي شَرْقِ الجَزِيرَةِ. كَانَ الجَوُّ حَارًّا.",
    "فِي رَمَضَانَ رَأَى الأَطْفَالُ الهِلَالَ فِي الغَرْبِ. فَرِحَتِ الجَزِيرَةُ.",
  ],
};

const storyDetails = [
  "ضَحِكَ طِفْلٌ لِأَنَّ سَمَكَةً صَغِيرَةً قَفَزَتْ قُرْبَ القَارِبِ.",
  "حَمَلَتْ آمنَةُ كُوبَيْنِ إِلَى جَدَّتِهَا عِنْدَ الشَّاطِئِ.",
  "رَكَلَ حَسَنٌ الكُرَةَ فَوَقَعَتْ فِي سَلَّةِ السَّمَكِ.",
  "سَقَى الأَطْفَالُ نَخْلَةً صَغِيرَةً فِي حَدِيقَةِ المَدْرَسَةِ.",
  "سَاعَدَ الصَّيَّادُ سُلَحْفَاةً ثُمَّ لَوَّحَتْ لَهُ بِزَعْنَفَتِهَا.",
  "وَصَلَ كِتَابٌ فِي قَارِبٍ وَجَلَسَ سَرْطَانٌ فَوْقَ غِلَافِهِ.",
  "اخْتَبَأَتْ سَمَكَةٌ وَرَاءَ صَدَفَةٍ كَأَنَّهَا تَلْعَبُ الغُمَّيْضَةَ.",
  "رَسَمَتْ مَرْيَمُ جَزِيرَةً وَأَضَافَتْ لَهَا نَخْلَةً تَبْتَسِمُ.",
  "وَضَعَ الأَبُ مَوْزَةً عَلَى المَائِدَةِ فَحَمَلَهَا بَبَّغَاءٌ فَضُحِكَ الجَمِيعُ.",
  "لَبِسَ حَسَنٌ قُبَّعَةً كَبِيرَةً فَغَطَّتْ عَيْنَيْهِ.",
  "رَسَمَتْ آمنَةُ صُورَةَ جَدِّهَا وَجَعَلَتْ شَارِبَهُ مِثْلَ مَوْجَتَيْنِ.",
  "قَرَأَ الطَّالِبُ جُمْلَةً عَنِ البَحْرِ ثُمَّ سَمِعَ مَوْجَةً تُصَفِّقُ.",
  "جَلَسَ القِطُّ تَحْتَ النَّخْلَةِ وَحَاوَلَ أَنْ يَعُدَّ جَوْزَ الهِنْدِ.",
  "صَنَعَ النَّجَّارُ كُرْسِيًّا صَغِيرًا لِدُمْيَةِ الطِّفْلِ.",
  "طَلَى العُمَّالُ قَارِبَ الدُّهُونِي فَتَرَكَ سَرْطَانٌ آثَارَ أَقْدَامِهِ عَلَيْهِ.",
  "عَدَّ حَسَنٌ الأَصْدَافَ مَرَّتَيْنِ لِأَنَّ وَاحِدَةً تَدَحْرَجَتْ إِلَى المَاءِ.",
  "فِي يَوْمِ الجُمُعَةِ سَاعَدَ الأَطْفَالُ فِي تَرْتِيبِ سَاحَةِ المَسْجِدِ.",
  "نَظَرَتْ مَرْيَمُ إِلَى السَّاعَةِ فَرَأَتْ وَزَغَةً صَغِيرَةً عَلَى العَقْرَبِ.",
  "هَبَّتْ رِيحٌ خَفِيفَةٌ فَطَارَتْ قُبَّعَةُ الصَّيَّادِ إِلَى القَارِبِ.",
  "فِي نِهَايَةِ الرِّحْلَةِ شَكَرَ نُورُو الأَطْفَالَ وَقَفَزَ فَوْقَ مَوْجَةٍ.",
];

const rotate = <T,>(items: T[], amount: number) => items.map((_, index) => items[(index + amount) % items.length]);
const itemsFor = (difficulty: Difficulty, level: number) => {
  const [phase1, phase2, phase3] = banks[difficulty];
  return level <= 7 ? phase1 : level <= 14 ? [...phase1, ...phase2] : [...phase1, ...phase2, ...phase3];
};

export function grade3PracticeFor(difficulty: string, level: number): QuizQuestion[] {
  const safe = (difficulty in banks ? difficulty : "Easy") as Difficulty;
  const pool = itemsFor(safe, level);
  const types: QuizQuestion["type"][] = ["Dictation", "Multiple Choice", "Fill in the Blank", "Reading", "Multiple Choice"];
  return types.map((type, questionIndex) => {
    const seed = (level - 1) * 5 + questionIndex;
    const item = pool[(seed * 3 + level) % pool.length];
    const candidates = [item.answer, pool[(seed * 3 + level + 2) % pool.length].answer, pool[(seed * 3 + level + 4) % pool.length].answer];
    const options = rotate([...new Set(candidates)], (seed + level) % 3);
    while (options.length < 3) options.push(pool[(seed + options.length) % pool.length].answer);
    const passage = type === "Reading" ? `${storyOpeners[safe][(level + questionIndex) % storyOpeners[safe].length]} ${item.answer}. ${storyDetails[level - 1]}` : undefined;
    const prompt = type === "Dictation" ? "Listen and choose the exact Arabic."
      : type === "Fill in the Blank" ? `Complete the Grade 3 sentence: ${item.cloze}`
        : type === "Reading" ? "Read the island story. Choose the curriculum phrase that best matches it."
          : "Choose the Arabic that matches the picture and grammar clue.";
    return {
      id: `G3-${safe}-L${level}-Q${questionIndex + 1}`,
      type,
      prompt: `${scenes[level - 1]}, task ${questionIndex + 1}: ${prompt}`,
      visual: type === "Dictation" ? "👂" : type === "Reading" ? "📖🏝️" : item.visual,
      spoken: type === "Dictation" ? item.answer : undefined,
      passage,
      options,
      answer: item.answer,
      hint: item.hint,
    };
  });
}

export function grade3PracticePhase(difficulty: string, level: number): string {
  const phase = level <= 7 ? "Phase 1" : level <= 14 ? "Phases 1–2" : "All three phases";
  const focus = difficulty === "Easy"
    ? level <= 7 ? "Food, singular and dual" : level <= 14 ? "Number and plural forms" : "Complete Grade 3 foundations"
    : difficulty === "Medium"
      ? level <= 7 ? "Description and nominal sentences" : level <= 14 ? "Agreement and noun forms" : "Complete Grade 3 grammar"
      : level <= 7 ? "Numbers and weekdays" : level <= 14 ? "Dates, time and routines" : "Complete Grade 3 extension";
  return `${phase} · ${focus}`;
}
