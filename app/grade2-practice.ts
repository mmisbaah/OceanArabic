import type { QuizQuestion } from "./quiz-data";

type Difficulty = "Easy" | "Medium" | "Hard";
type Item = { answer: string; visual: string; hint: string; cloze: string };

const scenes = [
  "Sentence Sandbank", "Football Jetty", "Picture Palm", "Question Cove", "Pronoun Pier",
  "Opposite Atoll", "Grammar Dhoni", "Reef Classroom", "Island Stadium", "Moon Letter Bay",
  "Sun Letter Shore", "Tense Lagoon", "Preposition Port", "Word Order Reef", "Heritage Harbour",
  "Museum Walk", "Islamic Centre Garden", "Hero Island", "Food Market", "Tableware Cafe",
];

const banks: Record<Difficulty, [Item[], Item[], Item[]]> = {
  Easy: [
    [
      { answer: "البَحْرُ هَادِئٌ", visual: "🌊", hint: "Begin with the thing you describe.", cloze: "البَحْرُ ___" },
      { answer: "النَّخْلَةُ طَوِيلَةٌ", visual: "🌴", hint: "The palm is feminine.", cloze: "النَّخْلَةُ ___" },
      { answer: "يَسْبَحُ حَسَنٌ", visual: "🏊", hint: "Begin with the action.", cloze: "___ حَسَنٌ" },
      { answer: "تَقْرَأُ آمِنَةُ", visual: "👧📖", hint: "Aminath is reading.", cloze: "___ آمِنَةُ" },
      { answer: "الصَّيَّادُ يَصِيدُ", visual: "🎣", hint: "Choose the island action.", cloze: "الصَّيَّادُ ___" },
    ],
    [
      { answer: "وَ", visual: "🐟➕🐚", hint: "Use this to join two things.", cloze: "سَمَكٌ ___ صَدَفَةٌ" },
      { answer: "هَذَا قَارِبٌ", visual: "🚤", hint: "Use هَذَا with a masculine noun.", cloze: "___ قَارِبٌ" },
      { answer: "هَذِهِ جَزِيرَةٌ", visual: "🏝️", hint: "Use هَذِهِ with a feminine noun.", cloze: "___ جَزِيرَةٌ" },
      { answer: "أَيْنَ المَدْرَسَةُ؟", visual: "🏫❓", hint: "Ask about a place.", cloze: "___ المَدْرَسَةُ؟" },
      { answer: "السَّمَكُ فِي البَحْرِ", visual: "🐟🌊", hint: "The fish is in the sea.", cloze: "السَّمَكُ ___ البَحْرِ" },
    ],
    [
      { answer: "كِتَابِي", visual: "📘", hint: "The ending means my.", cloze: "هَذَا ___" },
      { answer: "قَارِبُكَ", visual: "🚤", hint: "The ending means your.", cloze: "هَذَا ___" },
      { answer: "كَبِيرٌ / صَغِيرٌ", visual: "🐋🐟", hint: "These are opposites.", cloze: "الحُوتُ ___ وَالسَّمَكُ ___" },
      { answer: "أُحِبُّ لَعِبَ الكُرَةِ", visual: "⚽", hint: "Use أُحِبُّ to say what you like.", cloze: "___ لَعِبَ الكُرَةِ" },
      { answer: "أَلْعَبُ مَعَ صَدِيقِي", visual: "🧒🧒", hint: "مَعَ means with.", cloze: "أَلْعَبُ ___ صَدِيقِي" },
    ],
  ],
  Medium: [
    [
      { answer: "طَالِبَانِ", visual: "👦👦", hint: "Use the dual form for two boys.", cloze: "هَذَانِ ___" },
      { answer: "طَالِبَتَانِ", visual: "👧👧", hint: "Use the feminine dual form.", cloze: "هَاتَانِ ___" },
      { answer: "مُعَلِّمُونَ", visual: "👨‍🏫👨‍🏫", hint: "Use the masculine plural.", cloze: "هَؤُلَاءِ ___" },
      { answer: "طَالِبَاتٌ", visual: "👧👧👧", hint: "Use the feminine plural.", cloze: "هُنَّ ___" },
      { answer: "هُمْ لَاعِبُونَ", visual: "⚽👥", hint: "Use هُمْ for a group.", cloze: "___ لَاعِبُونَ" },
    ],
    [
      { answer: "الشَّمْسُ", visual: "☀️", hint: "ش is a sun letter.", cloze: "___ طَالِعَةٌ" },
      { answer: "السَّمَكُ", visual: "🐟", hint: "س is a sun letter.", cloze: "___ فِي البَحْرِ" },
      { answer: "القَمَرُ", visual: "🌙", hint: "ق is a moon letter.", cloze: "___ مُنِيرٌ" },
      { answer: "كَتَبَ", visual: "✍️", hint: "This action happened before now.", cloze: "أَمْسِ ___ الطَّالِبُ" },
      { answer: "يَكْتُبُ", visual: "📝", hint: "This action is happening now.", cloze: "الآنَ ___ الطَّالِبُ" },
    ],
    [
      { answer: "بِالقَارِبِ", visual: "🚤", hint: "بِـ tells how you travel.", cloze: "أَذْهَبُ ___" },
      { answer: "مِنَ المَالْدِيفِ", visual: "🏝️", hint: "مِنْ shows origin.", cloze: "أَنَا ___" },
      { answer: "عَلَى المَكْتَبِ", visual: "✏️", hint: "عَلَى means on.", cloze: "القَلَمُ ___" },
      { answer: "يَذْهَبُ الطَّالِبُ إِلَى المَدْرَسَةِ", visual: "👦🏫", hint: "Put the verb before the doer.", cloze: "___ ___ إِلَى المَدْرَسَةِ" },
      { answer: "أَيْنَ القَارِبُ؟", visual: "🚤❓", hint: "Ask where the boat is.", cloze: "___ القَارِبُ؟" },
    ],
  ],
  Hard: [
    [
      { answer: "المُتْحَفُ الوَطَنِيُّ", visual: "🏛️", hint: "This place keeps historical objects.", cloze: "زُرْنَا ___" },
      { answer: "المَرْكَزُ الإِسْلَامِيُّ", visual: "🕌", hint: "Look for the golden dome in Male.", cloze: "هَذَا ___" },
      { answer: "مَدِينَةُ مَالِيه", visual: "🏙️", hint: "This is the capital city.", cloze: "المَرْكَزُ فِي ___" },
      { answer: "قُبَّةٌ ذَهَبِيَّةٌ", visual: "🟡", hint: "Describe the dome and its colour.", cloze: "لَهُ ___" },
      { answer: "مَعْلَمٌ تَارِيخِيٌّ", visual: "📍", hint: "Use this for an important old place.", cloze: "المُتْحَفُ ___" },
    ],
    [
      { answer: "بَطَلٌ مَالْدِيفِيٌّ", visual: "🛡️", hint: "Muhammad Thakurufaanu was a national hero.", cloze: "هُوَ ___" },
      { answer: "دَافَعَ عَنِ الوَطَنِ", visual: "🛡️🏝️", hint: "Choose the action of protecting the homeland.", cloze: "البَطَلُ ___" },
      { answer: "هُوَ قَرَأَ", visual: "👦📖", hint: "Use the masculine past verb.", cloze: "___ الكِتَابَ" },
      { answer: "هِيَ قَرَأَتْ", visual: "👧📖", hint: "Use the feminine past verb.", cloze: "___ الكِتَابَ" },
      { answer: "هِيَ تَكْتُبُ", visual: "👧✍️", hint: "Use the feminine present verb.", cloze: "___ الدَّرْسَ" },
    ],
    [
      { answer: "بَيْت", visual: "🏠", hint: "This word ends with open ت.", cloze: "اخْتَرِ التَّاءَ المَفْتُوحَةَ: ___" },
      { answer: "مَدْرَسَة", visual: "🏫", hint: "This word ends with ة.", cloze: "اخْتَرِ التَّاءَ المَرْبُوطَةَ: ___" },
      { answer: "سَمَك", visual: "🐟", hint: "This is familiar island food.", cloze: "آكُلُ ___" },
      { answer: "مِلْعَقَة", visual: "🥄", hint: "Use this for soup.", cloze: "آكُلُ الحَسَاءَ بِـ ___" },
      { answer: "طَبَق", visual: "🍽️", hint: "Food is placed on this.", cloze: "السَّمَكُ فِي ___" },
    ],
  ],
};

const rotate = <T,>(items: T[], amount: number) => items.map((_, index) => items[(index + amount) % items.length]);
const itemsFor = (difficulty: Difficulty, level: number) => {
  const [phase1, phase2, phase3] = banks[difficulty];
  return level <= 7 ? phase1 : level <= 14 ? [...phase1, ...phase2] : [...phase1, ...phase2, ...phase3];
};

export function grade2PracticeFor(difficulty: string, level: number): QuizQuestion[] {
  const safe = (difficulty in banks ? difficulty : "Easy") as Difficulty;
  const pool = itemsFor(safe, level);
  const route = safe === "Easy" ? "sentence route" : safe === "Medium" ? "grammar route" : "heritage route";
  return Array.from({ length: 5 }, (_, questionIndex) => {
    const seed = (level - 1) * 5 + questionIndex;
    const item = pool[(seed * 3 + level) % pool.length];
    const alternatives = [item, pool[(seed * 3 + level + 2) % pool.length], pool[(seed * 3 + level + 4) % pool.length]];
    const options = rotate([...new Set(alternatives.map((candidate) => candidate.answer))], seed % 3);
    while (options.length < 3) options.push(pool[(seed + options.length) % pool.length].answer);
    const type: QuizQuestion["type"] = questionIndex % 3 === 0 ? "Dictation" : questionIndex % 3 === 1 ? "Multiple Choice" : "Fill in the Blank";
    const task = type === "Dictation" ? "Hear Nooru and choose the exact Arabic." : type === "Multiple Choice" ? "Match the picture to the best Arabic." : `Complete: ${item.cloze}`;
    return {
      id: `G2-${safe}-L${level}-Q${questionIndex + 1}`,
      type,
      prompt: `${scenes[level - 1]} - ${route}, task ${questionIndex + 1}: ${task}`,
      visual: type === "Dictation" ? "👂" : item.visual,
      spoken: type === "Dictation" ? item.answer : undefined,
      options,
      answer: item.answer,
      hint: item.hint,
    };
  });
}

export function grade2PracticePhase(difficulty: string, level: number): string {
  const phase = level <= 7 ? "Phase 1" : level <= 14 ? "Phases 1–2" : "All three phases";
  const focus = difficulty === "Easy"
    ? level <= 7 ? "Sentence types" : level <= 14 ? "Sentences, joining and questions" : "Complete Grade 2 foundations"
    : difficulty === "Medium"
      ? level <= 7 ? "Number and agreement" : level <= 14 ? "Agreement, letter patterns and tenses" : "Complete Grade 2 grammar"
      : level <= 7 ? "Maldivian landmarks" : level <= 14 ? "Heritage and verb agreement" : "Complete Grade 2 syllabus";
  return `${phase} · ${focus}`;
}
