export const learningLevels = [
  { id: 1, grade: 1, difficulty: 'Easy', title: 'First Arabic', description: 'Letters, sounds and first greetings' },
  { id: 2, grade: 1, difficulty: 'Medium', title: 'Word Bridge', description: 'Connected letters and introductions' },
  { id: 3, grade: 2, difficulty: 'Medium', title: 'Sentence Lagoon', description: 'Number, gender and useful sentences' },
  { id: 4, grade: 3, difficulty: 'Medium', title: 'Independent Explorer', description: 'Descriptions, people and actions' },
  { id: 5, grade: 4, difficulty: 'Medium', title: 'Island Communicator', description: 'Read, retell, explain and write' },
  { id: 6, grade: 5, difficulty: 'Medium', title: 'Thoughtful Reader', description: 'Evidence, audience and connected writing' },
  { id: 7, grade: 5, difficulty: 'Hard', title: 'Independent Author', description: 'Compare, discuss and revise independently' },
] as const;

export function selectedLearningLevel(grade: number, difficulty: string) {
  return learningLevels.find(level => level.grade === grade && level.difficulty === difficulty);
}

// Same placement rule as OceanLearn's stageIndex, expressed as a one-based level.
export function levelForProfile(grade: number, difficulty: string) {
  const base=Math.min(5,Math.max(1,grade));
  const index=difficulty==='Easy'?base-1:difficulty==='Hard'?Math.min(6,base+1):base;
  return learningLevels[index];
}
