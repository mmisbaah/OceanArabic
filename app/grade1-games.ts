import type { GameKind, GameRound } from "./game-data";

type Difficulty = "Easy" | "Medium" | "Hard";
type GameItem = { answer: string; visual: string; spoken: string; hint: string; pieces?: string[] };

const scenes = [
  "Alphabet Beach", "Dolphin Sound Bay", "Picture Palm", "Letter Shells", "Starfish Start",
  "Nooru Says", "Alphabet Dhoni", "Word Reef", "Joining Jetty", "Pronoun Pier",
  "Friendship Lagoon", "Country Compass", "Language Island", "Airport Atoll", "Travel Trail",
  "Town Treasure", "Direction Dock", "Sports Shore", "Conversation Cove", "Grade One Voyage",
];

const banks: Record<Difficulty, [GameItem[], GameItem[], GameItem[]]> = {
  Easy: [
    [
      { answer: "أ", visual: "🦁", spoken: "أ", hint: "أَسَد begins with أ.", pieces: ["أ"] },
      { answer: "ب", visual: "🦆", spoken: "ب", hint: "بَطَّة begins with ب.", pieces: ["ب"] },
      { answer: "ت", visual: "🍎", spoken: "ت", hint: "تُفَّاح begins with ت.", pieces: ["ت"] },
      { answer: "س", visual: "🐟", spoken: "س", hint: "سَمَك begins with س.", pieces: ["س"] },
      { answer: "ق", visual: "🌙", spoken: "ق", hint: "قَمَر begins with ق.", pieces: ["ق"] },
    ],
    [
      { answer: "أَسَد", visual: "🦁", spoken: "أَسَد", hint: "Listen for the lion word.", pieces: ["أ", "س", "د"] },
      { answer: "سَمَك", visual: "🐟", spoken: "سَمَك", hint: "This animal swims.", pieces: ["س", "م", "ك"] },
      { answer: "قَمَر", visual: "🌙", spoken: "قَمَر", hint: "It shines at night.", pieces: ["ق", "م", "ر"] },
      { answer: "مَوْز", visual: "🍌", spoken: "مَوْز", hint: "This is a yellow fruit.", pieces: ["م", "و", "ز"] },
      { answer: "يَد", visual: "✋", spoken: "يَد", hint: "You wave with it.", pieces: ["ي", "د"] },
    ],
    [
      { answer: "أَهْلًا", visual: "👋", spoken: "أَهْلًا", hint: "Say this when meeting a friend.", pieces: ["أَهْلًا"] },
      { answer: "شُكْرًا", visual: "💛", spoken: "شُكْرًا", hint: "Say this after receiving help.", pieces: ["شُكْرًا"] },
      { answer: "اِسْمِي", visual: "🙂", spoken: "اِسْمِي", hint: "Use this before your name.", pieces: ["اِسْمِي"] },
      { answer: "مَعَ السَّلَامَة", visual: "🚶", spoken: "مَعَ السَّلَامَة", hint: "Say this when leaving.", pieces: ["مَعَ", "السَّلَامَة"] },
      { answer: "السَّلَامُ عَلَيْكُمْ", visual: "👧👦", spoken: "السَّلَامُ عَلَيْكُمْ", hint: "This is a complete greeting.", pieces: ["السَّلَامُ", "عَلَيْكُمْ"] },
    ],
  ],
  Medium: [
    [
      { answer: "بـ", visual: "🏠", spoken: "ب", hint: "بَيْت begins with the joined form بـ.", pieces: ["بـ"] },
      { answer: "ـمـ", visual: "🐟", spoken: "م", hint: "م is in the middle of سَمَك.", pieces: ["ـمـ"] },
      { answer: "ـت", visual: "🏠", spoken: "ت", hint: "ت is at the end of بَيْت.", pieces: ["ـت"] },
      { answer: "بَيْت", visual: "🏠", spoken: "بَيْت", hint: "Join ب + ي + ت.", pieces: ["ب", "ي", "ت"] },
      { answer: "قَلَم", visual: "✏️", spoken: "قَلَم", hint: "Join ق + ل + م.", pieces: ["ق", "ل", "م"] },
    ],
    [
      { answer: "أَنَا", visual: "🙋", spoken: "أَنَا", hint: "Use this when speaking about yourself.", pieces: ["أَنَا"] },
      { answer: "أَنْتِ", visual: "👧", spoken: "أَنْتِ", hint: "Use this when speaking to a girl.", pieces: ["أَنْتِ"] },
      { answer: "هُوَ", visual: "👦", spoken: "هُوَ", hint: "Use this for one boy.", pieces: ["هُوَ"] },
      { answer: "هِيَ", visual: "👧", spoken: "هِيَ", hint: "Use this for one girl.", pieces: ["هِيَ"] },
      { answer: "نَحْنُ", visual: "🧒🧒", spoken: "نَحْنُ", hint: "Use this for we.", pieces: ["نَحْنُ"] },
    ],
    [
      { answer: "مَا اسْمُكَ؟", visual: "❓🙂", spoken: "مَا اسْمُكَ؟", hint: "Ask a new friend for a name.", pieces: ["مَا", "اسْمُكَ؟"] },
      { answer: "اِسْمِي عَلِيٌّ", visual: "🙂", spoken: "اِسْمِي عَلِيٌّ", hint: "Answer with your name.", pieces: ["اِسْمِي", "عَلِيٌّ"] },
      { answer: "المَالْدِيف", visual: "🏝️", spoken: "المَالْدِيف", hint: "This is our island country.", pieces: ["المَالْدِيف"] },
      { answer: "العَرَبِيَّة", visual: "🗣️", spoken: "العَرَبِيَّة", hint: "This is the language you are learning.", pieces: ["العَرَبِيَّة"] },
      { answer: "أَنَا مَالْدِيفِيٌّ", visual: "🇲🇻", spoken: "أَنَا مَالْدِيفِيٌّ", hint: "Say your Maldivian nationality.", pieces: ["أَنَا", "مَالْدِيفِيٌّ"] },
    ],
  ],
  Hard: [
    [
      { answer: "مَطَار", visual: "🛫", spoken: "مَطَار", hint: "Planes arrive here.", pieces: ["م", "ط", "ا", "ر"] },
      { answer: "طَائِرَة", visual: "✈️", spoken: "طَائِرَة", hint: "This flies in the sky.", pieces: ["طَائِرَة"] },
      { answer: "تَذْكِرَة", visual: "🎫", spoken: "تَذْكِرَة", hint: "You need this to travel.", pieces: ["تَذْكِرَة"] },
      { answer: "قَارِب", visual: "🚤", spoken: "قَارِب", hint: "Islanders travel by this.", pieces: ["ق", "ا", "ر", "ب"] },
      { answer: "أُسَافِرُ بِالطَّائِرَةِ", visual: "🧳✈️", spoken: "أُسَافِرُ بِالطَّائِرَةِ", hint: "Say how you travel by air.", pieces: ["أُسَافِرُ", "بِالطَّائِرَةِ"] },
    ],
    [
      { answer: "مَدْرَسَة", visual: "🏫", spoken: "مَدْرَسَة", hint: "Children learn here.", pieces: ["مَدْرَسَة"] },
      { answer: "مَسْجِد", visual: "🕌", spoken: "مَسْجِد", hint: "People pray here.", pieces: ["مَسْجِد"] },
      { answer: "أَمَامَ", visual: "⬆️", spoken: "أَمَامَ", hint: "This means in front of.", pieces: ["أَمَامَ"] },
      { answer: "أَيْنَ السُّوقُ؟", visual: "🛍️❓", spoken: "أَيْنَ السُّوقُ؟", hint: "Ask where the market is.", pieces: ["أَيْنَ", "السُّوقُ؟"] },
      { answer: "أَذْهَبُ بِالقَارِبِ", visual: "🚤", spoken: "أَذْهَبُ بِالقَارِبِ", hint: "Say how you travel between islands.", pieces: ["أَذْهَبُ", "بِالقَارِبِ"] },
    ],
    [
      { answer: "كُرَةُ القَدَمِ", visual: "⚽", spoken: "كُرَةُ القَدَمِ", hint: "This sport uses a football.", pieces: ["كُرَةُ", "القَدَمِ"] },
      { answer: "مَلْعَب", visual: "🏟️", spoken: "مَلْعَب", hint: "Sports are played here.", pieces: ["مَلْعَب"] },
      { answer: "بُطُولَة", visual: "🏆", spoken: "بُطُولَة", hint: "Teams compete in this event.", pieces: ["بُطُولَة"] },
      { answer: "أُحِبُّ كُرَةَ القَدَمِ", visual: "⚽💙", spoken: "أُحِبُّ كُرَةَ القَدَمِ", hint: "Say which sport you like.", pieces: ["أُحِبُّ", "كُرَةَ", "القَدَمِ"] },
      { answer: "أَنَا مِنَ المَالْدِيفِ", visual: "🏝️🙂", spoken: "أَنَا مِنَ المَالْدِيفِ", hint: "Complete the Grade 1 introduction.", pieces: ["أَنَا", "مِنَ", "المَالْدِيفِ"] },
    ],
  ],
};

const kinds: GameKind[] = ["Picture Match", "Sound Hunt", "Letter Builder", "Reef Rush"];
const rotate = <T,>(items: T[], amount: number) => items.map((_, index) => items[(index + amount) % items.length]);
const poolFor = (difficulty: Difficulty, level: number) => {
  const [phase1, phase2, phase3] = banks[difficulty];
  return level <= 7 ? phase1 : level <= 14 ? [...phase1, ...phase2] : [...phase1, ...phase2, ...phase3];
};

export function grade1GameFor(difficulty: string, level: number): GameRound[] {
  const safe = (difficulty in banks ? difficulty : "Easy") as Difficulty;
  const pool = poolFor(safe, level);
  return Array.from({ length: 5 }, (_, roundIndex) => {
    const seed = (level - 1) * 5 + roundIndex;
    const item = pool[(seed * 3 + level) % pool.length];
    const kind = kinds[(level + roundIndex - 1) % kinds.length];
    const choices = [item.answer, pool[(seed * 3 + level + 2) % pool.length].answer, pool[(seed * 3 + level + 4) % pool.length].answer];
    const options = rotate([...new Set(choices)], (seed + level) % 3);
    while (options.length < 3) options.push(pool[(seed + options.length) % pool.length].answer);
    const prompt = kind === "Sound Hunt" ? "Hear Nooru. Catch the matching shell!"
      : kind === "Letter Builder" ? "Use the pieces, then tap the finished Arabic."
        : kind === "Reef Rush" ? "Quick! Tap the Arabic before the dhoni sails."
          : "Match the picture to the Arabic.";
    return {
      id: `G1-${safe}-L${level}-R${roundIndex + 1}`,
      kind,
      prompt: `${scenes[level - 1]}: ${prompt}`,
      visual: kind === "Sound Hunt" ? "🎧🌊" : item.visual,
      spoken: item.spoken,
      pieces: kind === "Letter Builder" ? item.pieces : undefined,
      options,
      answer: item.answer,
      hint: item.hint,
      seconds: kind === "Reef Rush" ? Math.max(8, 16 - Math.floor(level / 3)) : undefined,
    };
  });
}

export function grade1GamePhase(difficulty: string, level: number): string {
  const phase = level <= 7 ? "Phase 1" : level <= 14 ? "Phases 1–2" : "All three phases";
  const focus = difficulty === "Easy"
    ? level <= 7 ? "Alphabet play" : level <= 14 ? "Letters and first words" : "Greetings and beginner communication"
    : difficulty === "Medium"
      ? level <= 7 ? "Letter positions and joining" : level <= 14 ? "Joining and pronouns" : "Introductions, countries and languages"
      : level <= 7 ? "Travel vocabulary" : level <= 14 ? "Travel, places and directions" : "Complete Grade 1 conversation";
  return `${phase} · ${focus}`;
}
