import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const modules = [
  "grade1-easy", "grade1-lessons", "grade2-lessons", "grade3-lessons",
  "practice-data", "grade1-practice", "grade2-practice", "grade3-practice",
  "grade1-games", "grade2-games", "grade3-games",
];
const compiledDir = await mkdtemp(join(tmpdir(), "oceanarabic-audio-"));

for (const name of modules) {
  const source = await readFile(new URL(`../app/${name}.ts`, import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText.replace(/from\s+(["'])\.\/([^"']+)\1/g, 'from "./$2.mjs"');
  await writeFile(join(compiledDir, `${name}.mjs`), output, "utf8");
}

const load = name => import(`${new URL(`file:///${join(compiledDir, `${name}.mjs`).replaceAll("\\", "/")}`).href}?${Date.now()}`);
const lessonModules = [await load("grade1-lessons"), await load("grade2-lessons"), await load("grade3-lessons")];
const practiceModules = [await load("grade1-practice"), await load("grade2-practice"), await load("grade3-practice")];
const gameModules = [await load("grade1-games"), await load("grade2-games"), await load("grade3-games")];
const { practiceItems } = await load("practice-data");
const phrases = new Set(practiceItems.map(item => item.spoken).filter(Boolean));

for (let grade = 1; grade <= 3; grade++) for (const difficulty of ["Easy", "Medium", "Hard"]) {
  const lessons = lessonModules[grade - 1][`grade${grade}LessonsFor`](difficulty);
  for (const lesson of lessons) for (const step of lesson.subLessons) {
    for (const example of step.examples ?? []) if (example.word) phrases.add(example.word.trim());
  }
  for (let level = 1; level <= 20; level++) {
    for (const question of practiceModules[grade - 1][`grade${grade}PracticeFor`](difficulty, level)) if (question.spoken) phrases.add(question.spoken.trim());
    for (const round of gameModules[grade - 1][`grade${grade}GameFor`](difficulty, level)) if (round.spoken) phrases.add(round.spoken.trim());
  }
}

const audioDir = new URL("../public/audio/", import.meta.url);
await mkdir(audioDir, { recursive: true });
const audioMap = {};
let completed = 0;

for (const phrase of [...phrases].sort((a, b) => a.localeCompare(b, "ar"))) {
  const file = `${createHash("sha256").update(phrase).digest("hex").slice(0, 20)}.mp3`;
  const destination = new URL(file, audioDir);
  const response = await fetch(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodeURIComponent(phrase)}`);
  if (!response.ok || !response.headers.get("content-type")?.includes("audio")) throw new Error(`TTS failed for ${phrase}: ${response.status}`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  audioMap[phrase] = `/audio/${file}`;
  completed++;
  if (completed % 50 === 0) console.log(`Generated ${completed}/${phrases.size}`);
}

await writeFile(new URL("../app/audio-map.json", import.meta.url), `${JSON.stringify(audioMap, null, 2)}\n`, "utf8");
console.log(`Generated ${completed} bundled Arabic audio clips.`);
