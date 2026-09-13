# Seven-level Arabic update

Implemented 12 September 2026. This follows the research map with an initial usable sequence: nine five-step lessons for Grade 4 and nine for Grade 5. It is not the proposed 27-session-per-grade authoring expansion or a complete indicator-level syllabus certification.

| Level | Route |
|---|---|
| 1 | Grade 1 Easy: First Arabic |
| 2 | Grade 1 Medium: Word Bridge |
| 3 | Grade 2 Medium: Sentence Lagoon |
| 4 | Grade 3 Medium: Independent Explorer |
| 5 | Grade 4 Medium: Island Communicator |
| 6 | Grade 5 Medium: Thoughtful Reader |
| 7 | Grade 5 Hard: Independent Author |

Grades 4 and 5 each have nine original Arabic passages, 45 comprehension/language questions, nine practice sets and nine reading games. Games deliberately reinforce the same passage questions. Level 7 revisits Grade 5 texts with independent evidence prompts and additional writing extensions; it is not a separately authored third bank of reading passages.

Each lesson has a writing workshop with draft, revision and reflection fields plus partner-speaking and handwriting checklists. Drafts autosave locally by learner and route. They are not uploaded to the Atollingo hub. Hub activity/star synchronization retains its existing behaviour. Comprehension completion is separate from teacher judgment of productive skills.

All 18 new passages have bundled MP3 audio using the app's existing TTS provider; normal and slow playback use the same recording at different rates. A transcript reveal supports listening practice. Synthetic pronunciation and all teaching texts still benefit from Arabic educator review.

Existing Grade 1–3 lesson/practice/game modules and progress key formats remain intact. A saved legacy route outside the seven main routes remains usable until the learner selects a new level. The seven primary routes do not expose every former grade/difficulty combination as a separate level.

Validation: production build, existing regression suite, KS2 data/reference/audio checks; browser checks of onboarding, level changes, lessons, draft reload, games and audio. Standalone TypeScript checking still reports pre-existing missing preview/Cloudflare types; the production build succeeds.

Entry points: `app/learning-levels.ts`, `app/ks2-content.ts`, `app/ks2-workshop.tsx`, `app/page.tsx`, `atollingo/components/AppHubConnector.jsx`. Rebuild audio with `node scripts/generate-ks2-audio.mjs`; it preserves existing clips.
