# OceanArabic: Grade 4–5 curriculum development map

Research checked 12 September 2026. Scope: Arabic in the Maldives national curriculum, for arabic.atollingo.com.

## Finding and source status

The official NIE Key Stage 2 Arabic syllabus covers Grades 4, 5 and 6. A complete 50-page copy is available through the Maldives National University Saruna archive. It specifies learning outcomes and performance indicators across listening/speaking, reading/viewing and writing. It does **not** prescribe the nine-unit sequence proposed below, OceanArabic difficulty levels, a lesson count or a complete vocabulary inventory.

- [MNU catalogue record](https://saruna.mnu.edu.mv/handle/123456789/16555)
- [Original syllabus PDF through the MNU public repository](https://saruna.mnu.edu.mv/server/api/core/bitstreams/b3808235-270d-4b36-9328-eebd7078a5ef/content)
- [NIE download listing](https://nie.edu.mv/download/dhivehi/)

The MNU catalogue records 2021; the PDF copyright page says 2017. This is a verified available syllabus, **not a verified latest revision**. The 2026 repository accession date is not a curriculum revision. The local filename retains the catalogue year. References below use PDF page numbers; printed page numbers are one lower.

Grade 4 detailed standards occupy PDF pages 17–25; Grade 5 occupies pages 27–35. Pages 49–50 discuss teaching and assessment. The PDF was text-extracted and the detailed grade tables visually checked because some embedded Arabic fonts extract incorrectly.

## What already exists in OceanArabic

The local application has Grades 1–3, Easy/Medium/Hard routes, nine lessons per route, lesson steps, quizzes, practice and games. Previous development added bundled normal/slow Arabic audio, learner profiles, stars, badges and streaks, responsive ocean styling, PWA support and the Atollingo profile connection. This is a local-code and task-history inventory, not a fresh production deployment audit.

Grade 3 already introduces noun number and gender, nominal/verbal sentences, subject and predicate, verb and doer, descriptions, occupations, numbers, calendars, time and directions. Grades 4–5 should reuse those foundations inside sustained comprehension and communication. Additional word cards and multiple-choice grammar exercises alone cannot cover the next stage.

Relevant implementation files: `app/curriculum.ts`, `app/grade3-lessons.ts`, `app/quiz-data.ts`, the grade-specific practice/game modules, and `app/page.tsx`.

## Verified grade progression

These are condensed outcome clusters, not a verbatim transcription of every indicator. The JSON companion gives each cluster an internal OceanArabic ID and a source page. These IDs are not NIE outcome codes.

| Area | Grade 4 | Grade 5 | PDF pages G4 / G5 |
|---|---|---|---|
| Listening and speaking: purposes | Participate in familiar MSA exchanges; follow directions; identify information; recount an event with an opening, sequence and ending. | Adapt familiar MSA to audience and context; clarify information; organize a recount; sustain exchanges and respond to others. | 17 / 27 |
| Listening and speaking: strategies | Listen for gist/detail, take turns, explain a view and retell ideas in sequence. | Infer and summarize, use reasons and supporting evidence, adapt register, respond to feedback and prepare discussion. | 18 / 28 |
| Listening and speaking: language | Questions and negation; past/present/imperative; nominal/verbal sentences; adjectives; roots and familiar dual/plural patterns. | Agreement and sentence patterns; pronouns, conjunctions, prepositions, adverbs, relatives and demonstratives; dictionary/root work and active participles. | 19 / 29 |
| Reading and viewing: purposes | Read familiar literary and informational texts; identify main ideas, key words and details; read aloud expressively. | Explain and summarize texts, distinguish literary/informational purposes, compare ideas, cite textual support and take accurate notes. | 20 / 30 |
| Reading and viewing: strategies | Predict from title/images, connect prior knowledge, use context/phonics, reread and discuss vocabulary. | Skim, test and revise predictions, self-correct, use supporting references, organize a mind map and give an organized group presentation. | 21 / 31 |
| Reading and viewing: language | Interpret visual information and text organization; use connectives, tense clues and a simple dictionary. | Recognize informative/persuasive/imaginative purposes; definiteness, comparisons, simple simile, sentence components, roots, punctuation and spelling. | 22 / 32 |
| Writing: purposes | Write supported diary entries, recounts, descriptions, explanations and connected paragraphs for familiar purposes. | Produce focused directions, informational writing and logically ordered descriptions for purpose and audience. See source anomaly below. | 23 / 33 |
| Writing: strategies | Plan, draft, reread, correct and respond to peer feedback; develop legible handwriting and dictation. | Plan for audience using models, brainstorm/research, organize and draft, consult a dictionary, peer-review and revise against criteria. | 24 / 34 |
| Writing: language | Link sentences; use agreement, number, tense, relatives, adverbs and possessive structures; apply spelling, sun/moon lam and tanwin. | Build and expand complete simple/compound sentences; use tense/pronouns, adjectives, adverbs, حال and active/passive participles; develop paragraphing, hamza and handwriting. | 25 / 35 |

Two details matter for implementation. Grade 5 PDF page 31 specifies a **five-minute group oral presentation**, not five minutes from every individual child. Grade 5 page 35 names **اسم الفاعل والمفعول** in the context of participles; this should not be collapsed into the separate verb–doer–object requirement on page 32.

## Proposed teaching sequence

The following themes, order and task products are OceanArabic design proposals. The source does not assign these unit titles or theme order. Each unit should contain three sessions: encounter a text/audio model; investigate and practise; communicate and revise. Nine units × three sessions gives an initial 27-session authoring framework per grade, not an official annual timetable or a claim of exhaustive indicator coverage.

| Unit | Grade 4 proposed theme | Observable product |
|---|---|---|
| G4-U01 | Our classroom conversations | Ask for clarification, follow directions and write a short classroom exchange. |
| G4-U02 | A day on our island | Listen to a recount, sequence events and write a supported diary entry. |
| G4-U03 | People and places | Describe a place using agreement, possessive structures and visual information. |
| G4-U04 | Read, wonder and retell | Predict a story, explain its main idea and retell it in order. |
| G4-U05 | Discover our sea | Read a short information text/chart, identify details and write an explanation. |
| G4-U06 | Plan a class visit | Discuss roles, follow/read instructions and write a visit plan. |
| G4-U07 | Words and patterns | Use a beginner dictionary and revise number, spelling and sentence patterns in context. |
| G4-U08 | Explain a good choice | Give a reason, distinguish information from a viewpoint and revise a persuasive paragraph. |
| G4-U09 | Our class exhibition | Present a recount and an information poster; revise a writing portfolio. |

| Unit | Grade 5 proposed theme | Observable product |
|---|---|---|
| G5-U01 | Speak for your audience | Adapt a request/explanation to two audiences and revise a written exchange. |
| G5-U02 | Stories with evidence | Summarize a story, support an interpretation and compare descriptions. |
| G5-U03 | Island information desk | Read two information texts, compare ideas and write accurate notes. |
| G5-U04 | Better descriptions | Expand sentences with appropriate comparisons, adjectives, adverbs and participles. |
| G5-U05 | How we do it | Explain a process orally and write ordered instructions for an audience. |
| G5-U06 | Discuss and persuade | Take turns, support a view with evidence and revise a persuasive text. |
| G5-U07 | Research and report | Use references and a dictionary, organize notes and produce an information report. |
| G5-U08 | Writers' workshop | Compare a draft against criteria; peer-review grammar, paragraphing, hamza and handwriting. |
| G5-U09 | Our Arabic showcase | Deliver a five-minute group presentation and a revised independent portfolio piece. |

Every unit integrates all three strands. A complete scope-and-sequence review must later check individual performance indicators against authored lessons; attaching a broad cluster to a unit is only a planning link.

### Difficulty and support

Easy, Medium and Hard should provide different scaffolding for the same grade requirements. Easy supplies pictures, replayable audio, worked models and sentence frames. Medium gradually removes prompts and asks learners to explain choices. Hard expects more independent listening, text evidence, composition and revision. Do not hide required speaking/writing solely in Hard, or equate a difficulty selection with national attainment.

Text length, vocabulary load, lesson duration and score thresholds remain authoring decisions to pilot with teachers; the source has not supplied numeric targets for them. New content should be reviewed for MSA accuracy and appropriate Maldivian context. Religious references in the source require verified wording and context when authored; this map does not invent quotations.

## Assessment and app development requirements

The syllabus recommends varied, ongoing assessment integrated with learning: classroom tasks, checklists, observation, journals and communication (PDF p50). It also supports thematic, differentiated and collaborative teaching (p49–50).

| Evidence needed | Appropriate OceanArabic interaction | Completion rule |
|---|---|---|
| Listening comprehension | Audio-first task with transcript revealed after the initial response; gist/detail/sequence responses. | Record response evidence and support used; text-only completion does not prove listening. |
| Oral interaction | Partner role-play or teacher/adult observation, with an optional recording workflow designed separately. | Human rubric checks meaning, intelligibility, response and turn-taking. A replay/tap is practice only. |
| Reading comprehension | Real short texts and visuals, prediction, highlighting evidence, sequencing and summaries. | Include both selected and constructed responses; separate decoding from comprehension. |
| Writing process | Plan → draft → feedback → revision, with a local saved draft or offline worksheet. | Preserve the learner's draft and revision; judge purpose, sequence, language and response to feedback. |
| Handwriting/dictation | Printable or on-paper task with adult observation. | Typed accuracy cannot establish handwriting mastery. |
| Group presentation | Shared planning and a group presentation checklist. | For G5, observe the five-minute group task; do not replace it with a solo quiz. |

Proposed rubric statuses: not yet observed, with support, increasingly independent, independently demonstrated. These are app design labels, not official NIE grades. Keep activity completion, automated correctness and observed skill attainment separate. Do not award a complete-syllabus mastery badge merely for finishing multiple-choice questions.

### Development backlog in order

1. Use `curriculum-map.json` as the source-linked authoring contract. Each future lesson references cluster IDs and, eventually, individual indicators checked by an Arabic educator.
2. Extend the lesson model to hold passage/audio, communicative purpose, evidence task, source references, support variants and review state. Keep Grade 4–5 unavailable to learners until a coherent route exists.
3. Build the complete G4-U01 learning cycle first: listening directions, reading a dialogue, composing a reply, partner performance and a review checklist. Validate right-to-left input and preservation of drafts.
4. Add the remaining units, reviewed Arabic texts and bundled audio. Audit normal/slow audio coverage for each new spoken text.
5. Add Grade 5 with its increased independence, evidence-based discussion, drafting and group presentation requirements.
6. Check grade selectors, route recovery, progress storage migration, accessibility, mobile layout, profile compatibility and existing Grade 1–3 behaviour. Run project build/tests after runtime changes.
7. Validate authored coverage and teacher feedback before claiming syllabus alignment or publishing the new grades.

This research change does not add live Grade 4–5 lessons, alter learner progress or deploy the website.

## Source issues and remaining verification

- **Version:** catalogue 2021 versus PDF copyright 2017; a current Ministry/NIE confirmation is still needed to describe it as the active syllabus.
- **Handwriting progression:** Grade 4 p24 has stronger Ruq'ah wording than Grade 5 p32, which introduces it with teacher support. Preserve this discrepancy. Proposed teaching is Naskh consolidation with guided Ruq'ah exposure pending clarification.
- **Cross-strand wording:** Grade 5 writing purposes p33 repeats listening/speaking language under a writing heading. The map retains the source's category and uses unambiguous writing indicators for writing assessment.
- **Textbooks and pacing:** no verified matching Grade 4/5 Arabic student book, teacher guide, vocabulary list or current school scheme of work was obtained. These are outstanding source gaps, not proof that those resources do not exist.
- **Coverage:** this map covers all nine detailed strand/substrand groups per grade at cluster level. It is not an indicator-by-indicator compliance certification.

## Search register

| Source/channel | Result and use |
|---|---|
| NIE Arabic syllabus listings | Official KS2 title found. Direct NIE file/page access was unreliable. Different filenames are not assumed to be different revisions. |
| MNU Saruna Local Textbooks collection and public API | Full NIE KS2 PDF recovered; primary curriculum evidence for this map. Repository metadata is provenance, not a new curriculum issue date. |
| [NIE student books](https://nie.edu.mv/download/student-books-downloads/) | Listing found; no matching Arabic Grade 4/5 book verified. |
| [Ministry Filaa Grade 4](https://filaa.moe.gov.mv/?grade=4) and [Grade 5](https://filaa.moe.gov.mv/?grade=5&page=1) | No matching Arabic resource retrieved in this search. Quran content is not treated as a substitute Arabic syllabus. |
| [National Curriculum Framework](https://nie.edu.mv/wp-content/uploads/2023/09/National-Curriculum-Framework.pdf) | Historical framework context for KS2 and optional Arabic. Do not use an older timetable allocation as a guaranteed current school schedule. |
| Local workspace, Downloads and OneDrive document filenames | Found an Arabic Grades 1–3 syllabus and unrelated subject PDFs; no matching KS2 Arabic PDF before the archive retrieval. Filename search is not a complete full-text search of every personal file. |
| Connected Google Drive | Arabic/general search plus filename filters for Arabic, Syllabus and العربية produced no verified relevant KS2 file. |
| Prior OceanArabic task and local source | Established the Grade 1–3 implementation baseline. No new production audit was completed. |
| Wider web and document hosts | Excluded a Mindanao State University Arabic syllabus and an Indian Muallim guide; these cannot establish Maldives requirements. Generic international resources may later supplement teaching after alignment review. |

The search covers accessible public and connected/local sources described here. It does not claim to exhaust unavailable school materials, every private account or every internet resource.

## Companion data

`curriculum-map.json` contains 18 source-linked outcome clusters, 18 proposed units, support levels, evidence types and explicit release status. `validate-map.mjs` checks references, grade/page boundaries, unit coverage and three-strand integration. Raw PDF/text and rendered pages are local research evidence; they are excluded from Git by this folder's `.gitignore`.
