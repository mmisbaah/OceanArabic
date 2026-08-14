import type { GameKind, GameRound } from "./game-data";

type Difficulty = "Easy" | "Medium" | "Hard";
type GameItem = { answer: string; visual: string; spoken: string; hint: string; pieces: string[] };

const scenes = [
  "Sentence Sandbank", "Palm Description", "Fishing Action", "Question Cove", "Joining Jetty",
  "Picture Pier", "Sentence Dhoni", "Pronoun Port", "Opposite Atoll", "Grammar Reef",
  "Moon Letter Bay", "Sun Letter Shore", "Tense Lagoon", "Preposition Path", "Word Order Wave",
  "Museum Mission", "Golden Dome Garden", "Hero Harbour", "Island Food Market", "Tableware Treasure",
];

const banks: Record<Difficulty, [GameItem[], GameItem[], GameItem[]]> = {
  Easy: [
    [
      { answer: "البَحْرُ هَادِئٌ", visual: "🌊", spoken: "البَحْرُ هَادِئٌ", hint: "Describe the calm sea.", pieces: ["البَحْرُ", "هَادِئٌ"] },
      { answer: "النَّخْلَةُ طَوِيلَةٌ", visual: "🌴", spoken: "النَّخْلَةُ طَوِيلَةٌ", hint: "The palm is feminine.", pieces: ["النَّخْلَةُ", "طَوِيلَةٌ"] },
      { answer: "يَسْبَحُ حَسَنٌ", visual: "🏊", spoken: "يَسْبَحُ حَسَنٌ", hint: "Begin with the swimming action.", pieces: ["يَسْبَحُ", "حَسَنٌ"] },
      { answer: "تَقْرَأُ آمِنَةُ", visual: "👧📖", spoken: "تَقْرَأُ آمِنَةُ", hint: "Aminath is reading.", pieces: ["تَقْرَأُ", "آمِنَةُ"] },
      { answer: "الصَّيَّادُ يَصِيدُ", visual: "🎣", spoken: "الصَّيَّادُ يَصِيدُ", hint: "Match the fisher to the action.", pieces: ["الصَّيَّادُ", "يَصِيدُ"] },
    ],
    [
      { answer: "وَ", visual: "🐟➕🐚", spoken: "وَ", hint: "Use this to join two things.", pieces: ["وَ"] },
      { answer: "هَذَا قَارِبٌ", visual: "🚤", spoken: "هَذَا قَارِبٌ", hint: "Use هَذَا with the boat.", pieces: ["هَذَا", "قَارِبٌ"] },
      { answer: "هَذِهِ جَزِيرَةٌ", visual: "🏝️", spoken: "هَذِهِ جَزِيرَةٌ", hint: "Use هَذِهِ with the island.", pieces: ["هَذِهِ", "جَزِيرَةٌ"] },
      { answer: "أَيْنَ المَدْرَسَةُ؟", visual: "🏫❓", spoken: "أَيْنَ المَدْرَسَةُ؟", hint: "Ask where the school is.", pieces: ["أَيْنَ", "المَدْرَسَةُ؟"] },
      { answer: "السَّمَكُ فِي البَحْرِ", visual: "🐟🌊", spoken: "السَّمَكُ فِي البَحْرِ", hint: "The fish is in the sea.", pieces: ["السَّمَكُ", "فِي", "البَحْرِ"] },
    ],
    [
      { answer: "كِتَابِي", visual: "📘", spoken: "كِتَابِي", hint: "The ending means my.", pieces: ["كِتَاب", "ي"] },
      { answer: "قَارِبُكَ", visual: "🚤", spoken: "قَارِبُكَ", hint: "The ending means your.", pieces: ["قَارِبُ", "كَ"] },
      { answer: "كَبِيرٌ وَصَغِيرٌ", visual: "🐋🐟", spoken: "كَبِيرٌ وَصَغِيرٌ", hint: "These size words are opposites.", pieces: ["كَبِيرٌ", "وَ", "صَغِيرٌ"] },
      { answer: "أُحِبُّ لَعِبَ الكُرَةِ", visual: "⚽", spoken: "أُحِبُّ لَعِبَ الكُرَةِ", hint: "Say which activity you like.", pieces: ["أُحِبُّ", "لَعِبَ", "الكُرَةِ"] },
      { answer: "أَلْعَبُ مَعَ صَدِيقِي", visual: "🧒🧒", spoken: "أَلْعَبُ مَعَ صَدِيقِي", hint: "مَعَ means with.", pieces: ["أَلْعَبُ", "مَعَ", "صَدِيقِي"] },
    ],
  ],
  Medium: [
    [
      { answer: "طَالِبَانِ", visual: "👦👦", spoken: "طَالِبَانِ", hint: "Use the dual for two boys.", pieces: ["طَالِب", "انِ"] },
      { answer: "طَالِبَتَانِ", visual: "👧👧", spoken: "طَالِبَتَانِ", hint: "Use the feminine dual.", pieces: ["طَالِبَت", "انِ"] },
      { answer: "مُعَلِّمُونَ", visual: "👨‍🏫👨‍🏫", spoken: "مُعَلِّمُونَ", hint: "Use the masculine sound plural.", pieces: ["مُعَلِّم", "ونَ"] },
      { answer: "طَالِبَاتٌ", visual: "👧👧👧", spoken: "طَالِبَاتٌ", hint: "Use the feminine sound plural.", pieces: ["طَالِب", "اتٌ"] },
      { answer: "هُمْ لَاعِبُونَ", visual: "⚽👥", spoken: "هُمْ لَاعِبُونَ", hint: "Use هُمْ for a group.", pieces: ["هُمْ", "لَاعِبُونَ"] },
    ],
    [
      { answer: "الشَّمْسُ", visual: "☀️", spoken: "الشَّمْسُ", hint: "ش is a sun letter.", pieces: ["ال", "شَّمْسُ"] },
      { answer: "القَمَرُ", visual: "🌙", spoken: "القَمَرُ", hint: "ق is a moon letter.", pieces: ["ال", "قَمَرُ"] },
      { answer: "كَتَبَ", visual: "✍️⬅️", spoken: "كَتَبَ", hint: "This action happened before now.", pieces: ["كَ", "تَ", "بَ"] },
      { answer: "يَكْتُبُ", visual: "📝", spoken: "يَكْتُبُ", hint: "This action is happening now.", pieces: ["يَ", "كْ", "تُ", "بُ"] },
      { answer: "اُكْتُبْ", visual: "👉✍️", spoken: "اُكْتُبْ", hint: "This is an instruction.", pieces: ["اُكْ", "تُبْ"] },
    ],
    [
      { answer: "بِالقَارِبِ", visual: "🚤", spoken: "بِالقَارِبِ", hint: "بِـ tells how you travel.", pieces: ["بِ", "القَارِبِ"] },
      { answer: "مِنَ المَالْدِيفِ", visual: "🏝️", spoken: "مِنَ المَالْدِيفِ", hint: "مِنْ shows origin.", pieces: ["مِنَ", "المَالْدِيفِ"] },
      { answer: "عَلَى المَكْتَبِ", visual: "✏️", spoken: "عَلَى المَكْتَبِ", hint: "The pencil is on the desk.", pieces: ["عَلَى", "المَكْتَبِ"] },
      { answer: "يَذْهَبُ الطَّالِبُ إِلَى المَدْرَسَةِ", visual: "👦🏫", spoken: "يَذْهَبُ الطَّالِبُ إِلَى المَدْرَسَةِ", hint: "Put the verb before the doer.", pieces: ["يَذْهَبُ", "الطَّالِبُ", "إِلَى", "المَدْرَسَةِ"] },
      { answer: "أَيْنَ القَارِبُ؟", visual: "🚤❓", spoken: "أَيْنَ القَارِبُ؟", hint: "Ask where the boat is.", pieces: ["أَيْنَ", "القَارِبُ؟"] },
    ],
  ],
  Hard: [
    [
      { answer: "المُتْحَفُ الوَطَنِيُّ", visual: "🏛️", spoken: "المُتْحَفُ الوَطَنِيُّ", hint: "This place keeps historical objects.", pieces: ["المُتْحَفُ", "الوَطَنِيُّ"] },
      { answer: "المَرْكَزُ الإِسْلَامِيُّ", visual: "🕌", spoken: "المَرْكَزُ الإِسْلَامِيُّ", hint: "Find the landmark with a golden dome.", pieces: ["المَرْكَزُ", "الإِسْلَامِيُّ"] },
      { answer: "مَدِينَةُ مَالِيه", visual: "🏙️", spoken: "مَدِينَةُ مَالِيه", hint: "This is the capital city.", pieces: ["مَدِينَةُ", "مَالِيه"] },
      { answer: "قُبَّةٌ ذَهَبِيَّةٌ", visual: "🟡", spoken: "قُبَّةٌ ذَهَبِيَّةٌ", hint: "Describe the golden dome.", pieces: ["قُبَّةٌ", "ذَهَبِيَّةٌ"] },
      { answer: "مَعْلَمٌ تَارِيخِيٌّ", visual: "📍", spoken: "مَعْلَمٌ تَارِيخِيٌّ", hint: "This describes an important old place.", pieces: ["مَعْلَمٌ", "تَارِيخِيٌّ"] },
    ],
    [
      { answer: "بَطَلٌ مَالْدِيفِيٌّ", visual: "🛡️🇲🇻", spoken: "بَطَلٌ مَالْدِيفِيٌّ", hint: "Muhammad Thakurufaanu was a national hero.", pieces: ["بَطَلٌ", "مَالْدِيفِيٌّ"] },
      { answer: "دَافَعَ عَنِ الوَطَنِ", visual: "🛡️🏝️", spoken: "دَافَعَ عَنِ الوَطَنِ", hint: "Choose the action of protecting the homeland.", pieces: ["دَافَعَ", "عَنِ", "الوَطَنِ"] },
      { answer: "هُوَ قَرَأَ", visual: "👦📖", spoken: "هُوَ قَرَأَ", hint: "Use masculine past agreement.", pieces: ["هُوَ", "قَرَأَ"] },
      { answer: "هِيَ قَرَأَتْ", visual: "👧📖", spoken: "هِيَ قَرَأَتْ", hint: "Use feminine past agreement.", pieces: ["هِيَ", "قَرَأَتْ"] },
      { answer: "هِيَ تَكْتُبُ", visual: "👧✍️", spoken: "هِيَ تَكْتُبُ", hint: "Use feminine present agreement.", pieces: ["هِيَ", "تَكْتُبُ"] },
    ],
    [
      { answer: "بَيْت", visual: "🏠", spoken: "بَيْت", hint: "This word ends with open ت.", pieces: ["ب", "ي", "ت"] },
      { answer: "مَدْرَسَة", visual: "🏫", spoken: "مَدْرَسَة", hint: "This word ends with ة.", pieces: ["مَدْرَس", "ة"] },
      { answer: "سَمَك", visual: "🐟", spoken: "سَمَك", hint: "This is familiar island food.", pieces: ["س", "م", "ك"] },
      { answer: "مِلْعَقَة", visual: "🥄", spoken: "مِلْعَقَة", hint: "Use this for soup.", pieces: ["مِلْعَق", "ة"] },
      { answer: "طَبَق", visual: "🍽️", spoken: "طَبَق", hint: "Food is placed on this.", pieces: ["ط", "ب", "ق"] },
    ],
  ],
};

const kinds: GameKind[] = ["Picture Match", "Sound Hunt", "Letter Builder", "Reef Rush"];
const rotate = <T,>(items: T[], amount: number) => items.map((_, index) => items[(index + amount) % items.length]);
const poolFor = (difficulty: Difficulty, level: number) => {
  const [phase1, phase2, phase3] = banks[difficulty];
  return level <= 7 ? phase1 : level <= 14 ? [...phase1, ...phase2] : [...phase1, ...phase2, ...phase3];
};

export function grade2GameFor(difficulty: string, level: number): GameRound[] {
  const safe = (difficulty in banks ? difficulty : "Easy") as Difficulty;
  const pool = poolFor(safe, level);
  return Array.from({ length: 5 }, (_, roundIndex) => {
    const seed = (level - 1) * 5 + roundIndex;
    const item = pool[(seed * 3 + level) % pool.length];
    const kind = kinds[(level + roundIndex) % kinds.length];
    const choices = [item.answer, pool[(seed * 3 + level + 2) % pool.length].answer, pool[(seed * 3 + level + 4) % pool.length].answer];
    const options = rotate([...new Set(choices)], (seed + level) % 3);
    while (options.length < 3) options.push(pool[(seed + options.length) % pool.length].answer);
    const prompt = kind === "Sound Hunt" ? "Hear Nooru and catch the matching phrase."
      : kind === "Letter Builder" ? "Arrange the pieces, then tap the completed Arabic."
        : kind === "Reef Rush" ? "Race the dhoni: choose the correct Grade 2 Arabic."
          : "Match the island picture and Arabic.";
    return { id: `G2-${safe}-L${level}-R${roundIndex + 1}`, kind, prompt: `${scenes[level - 1]}: ${prompt}`, visual: kind === "Sound Hunt" ? "🎧🐚" : item.visual, spoken: item.spoken, pieces: kind === "Letter Builder" ? item.pieces : undefined, options, answer: item.answer, hint: item.hint, seconds: kind === "Reef Rush" ? Math.max(8, 15 - Math.floor(level / 3)) : undefined };
  });
}

export function grade2GamePhase(difficulty: string, level: number): string {
  const phase = level <= 7 ? "Phase 1" : level <= 14 ? "Phases 1–2" : "All three phases";
  const focus = difficulty === "Easy"
    ? level <= 7 ? "Sentence play" : level <= 14 ? "Joining and questions" : "Complete Grade 2 foundations"
    : difficulty === "Medium"
      ? level <= 7 ? "Number and agreement" : level <= 14 ? "Letter patterns and tenses" : "Complete Grade 2 grammar"
      : level <= 7 ? "Maldivian landmarks" : level <= 14 ? "Heritage and verb agreement" : "Complete Grade 2 syllabus";
  return `${phase} · ${focus}`;
}
