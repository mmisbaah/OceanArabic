import assert from "node:assert/strict";
import { access, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

async function loadCurriculumModules() {
  const names = ["grade1-easy","grade1-lessons","grade2-lessons","grade3-lessons","quiz-data","grade1-practice","grade2-practice","grade3-practice","game-data","grade1-games","grade2-games","grade3-games"];
  const out = await mkdtemp(join(tmpdir(), "oceanarabic-qa-"));
  for (const name of names) {
    const source = await readFile(new URL(`../app/${name}.ts`, import.meta.url), "utf8");
    const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText.replace(/from\s+(["'])\.\/([^"']+)\1/g, 'from "./$2.mjs"');
    await writeFile(join(out, `${name}.mjs`), compiled, "utf8");
  }
  const load = name => import(`${new URL(`file:///${join(out, `${name}.mjs`).replaceAll("\\", "/")}`).href}?${Date.now()}`);
  return { lessons: [await load("grade1-lessons"), await load("grade2-lessons"), await load("grade3-lessons")], practice: [await load("grade1-practice"), await load("grade2-practice"), await load("grade3-practice")], games: [await load("grade1-games"), await load("grade2-games"), await load("grade3-games")] };
}

test("renders every public OceanArabic route", async () => {
  for (const path of ["/", "/learn", "/learn/1/1", "/practice", "/play", "/rewards", "/progress"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), /OceanArabic|OceanArabic is loading/);
  }
});

test("ships production metadata, sharing artwork and an installable manifest", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /OceanArabic \| Arabic Adventures with Nooru/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /og\.png/);
  const manifest = JSON.parse(await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
  assert.equal(manifest.name, "OceanArabic — Arabic Adventures with Nooru");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.icons[0].sizes, "1280x1280");
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/sw.js", import.meta.url));
  assert.match(await readFile(new URL("../app/page.tsx", import.meta.url), "utf8"), /serviceWorker\.register\("\/sw\.js"\)/);
});

test("source content remains clean UTF-8 without mojibake", async () => {
  const appDir = new URL("../app/", import.meta.url);
  const files = (await readdir(appDir)).filter(name => /\.(ts|tsx|css)$/.test(name));
  for (const name of files) {
    const text = await readFile(new URL(name, appDir), "utf8");
    assert.doesNotMatch(text, /�|Ã|Â|ðŸ|â€/u, name);
  }
});

test("all nine curriculum routes have complete, distinct lesson banks", async () => {
  const { lessons } = await loadCurriculumModules();
  const seenTitles = new Set();
  for (let grade = 1; grade <= 3; grade++) for (const difficulty of ["Easy", "Medium", "Hard"]) {
    const bank = lessons[grade - 1][`grade${grade}LessonsFor`](difficulty);
    assert.equal(bank.length, 9, `G${grade} ${difficulty} lesson count`);
    for (const lesson of bank) {
      assert.equal(lesson.subLessons.length, 5, `${lesson.title} step count`);
      const routeTitle = `G${grade}-${difficulty}-${lesson.title}`;
      assert.ok(!seenTitles.has(routeTitle), `duplicate lesson title ${routeTitle}`);
      seenTitles.add(routeTitle);
      assert.ok(lesson.subLessons.every(step => step.task?.options?.filter(option => option.correct).length === 1), `${lesson.title} answer mapping`);
    }
  }
});

test("Practice supplies 20 unique five-question sets for every route", async () => {
  const { practice } = await loadCurriculumModules();
  for (let grade = 1; grade <= 3; grade++) for (const difficulty of ["Easy", "Medium", "Hard"]) {
    const prompts = new Set();
    for (let level = 1; level <= 20; level++) {
      const set = practice[grade - 1][`grade${grade}PracticeFor`](difficulty, level);
      assert.equal(set.length, 5, `G${grade} ${difficulty} practice L${level}`);
      for (const q of set) {
        assert.ok(q.options.includes(q.answer), `missing answer in G${grade} ${difficulty} L${level}`);
        const key = `${q.prompt}|${q.answer}`;
        assert.ok(!prompts.has(key), `repeated Practice question: ${key}`);
        prompts.add(key);
      }
    }
    assert.equal(prompts.size, 100);
  }
});

test("Play supplies 20 unique five-round levels for every route", async () => {
  const { games } = await loadCurriculumModules();
  for (let grade = 1; grade <= 3; grade++) for (const difficulty of ["Easy", "Medium", "Hard"]) {
    const rounds = new Set();
    for (let level = 1; level <= 20; level++) {
      const set = games[grade - 1][`grade${grade}GameFor`](difficulty, level);
      assert.equal(set.length, 5, `G${grade} ${difficulty} game L${level}`);
      for (const round of set) {
        assert.ok(round.options.includes(round.answer), `missing game answer in G${grade} ${difficulty} L${level}`);
        const key = `${round.prompt}|${round.answer}`;
        assert.ok(!rounds.has(key), `repeated game round: ${key}`);
        rounds.add(key);
      }
    }
    assert.equal(rounds.size, 100);
  }
});

test("scoring boundaries match the reward policy", () => {
  const stars = score => score < 0.6 ? 1 : score <= 0.8 ? 2 : 3;
  assert.equal(stars(0.59), 1);
  assert.equal(stars(0.6), 2);
  assert.equal(stars(0.8), 2);
  assert.equal(stars(0.81), 3);
});

test("Arabic dictation uses real audio with distinct normal and slow speeds", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const audioMap = JSON.parse(await readFile(new URL("../app/audio-map.json", import.meta.url), "utf8"));
  assert.match(source, /<audio ref=\{audioRef\}/, "audio player must be attached to the page");
  assert.match(source, /audio\.src=source/, "audio source must be assigned to the attached player");
  assert.match(source, /bundledSource\|\|/, "bundled audio must be preferred");
  assert.match(source, /audio\.playbackRate=slow\?\.7:1/, "normal and slow playback speeds must differ");
  assert.match(source, /fallbackToDeviceVoice/, "missing device-voice fallback");
  assert.ok(Object.keys(audioMap).length > 100, "audio library is unexpectedly incomplete");
  for (const path of Object.values(audioMap)) await access(new URL(`../public${path}`, import.meta.url));
});

test("lesson, Practice, and Play transitions reset to the page top after rendering", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /requestAnimationFrame\(\(\)=>window\.requestAnimationFrame/, "top reset must wait for rendering");
  assert.match(source, /const nextPractice=.*scrollPageTop\(\)/, "Practice questions must reset to top");
  assert.match(source, /const advanceQuiz=.*scrollPageTop\(\)/, "quiz questions must reset to top");
  assert.match(source, /const playChoice=.*scrollPageTop\(\)/, "game rounds must reset to top");
  assert.match(source, /const openLesson=.*scrollPageTop\(\)/, "lesson steps must reset to top");
});

test("upper deck keeps identity left, rewards centered, and account actions right", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(page, /className="header-left"/, "missing left identity group");
  assert.match(page, /className="header-actions"/, "missing right action group");
  assert.match(css, /grid-template-columns:minmax\(0,1fr\) auto minmax\(0,1fr\)/, "header must use three stable zones");
  assert.match(css, /\.topbar>\.status-stack\{justify-self:center/, "rewards must be centered");
  assert.match(css, /\.header-actions\{[^}]*justify-self:end/, "actions must align right");
});
