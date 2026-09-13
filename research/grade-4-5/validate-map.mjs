import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const map = JSON.parse(readFileSync(new URL('./curriculum-map.json', import.meta.url), 'utf8'));
assert.equal(map.learnerReleaseReady, false, 'Research must not imply release readiness');
assert.equal(map.outcomes.length, 18);
assert.equal(map.units.length, 18);
const outcomes = new Map(map.outcomes.map(outcome => [outcome.id, outcome]));
assert.equal(outcomes.size, map.outcomes.length, 'Duplicate outcome ID');
assert.equal(new Set(map.units.map(unit => unit.id)).size, map.units.length, 'Duplicate unit ID');
const covered = new Set();
for (const outcome of map.outcomes) {
  assert.ok(map.sources.some(source => source.id === outcome.sourceId));
  const start = outcome.grade === 4 ? 17 : 27;
  assert.ok(outcome.pdfPage >= start && outcome.pdfPage <= start + 8);
  assert.equal(outcome.printedPage, outcome.pdfPage - 1);
}
for (const unit of map.units) {
  assert.equal(unit.officialUnit, false);
  assert.equal(unit.status, 'proposed-not-authored');
  assert.equal(unit.sessions.length, 3);
  const strands = new Set();
  for (const id of unit.outcomeIds) {
    const outcome = outcomes.get(id);
    assert.ok(outcome, `Unknown reference ${id}`);
    assert.equal(outcome.grade, unit.grade, `Cross-grade reference ${id}`);
    covered.add(id);
    strands.add(outcome.strand);
  }
  assert.deepEqual([...strands].sort(), ['listening-speaking', 'reading-viewing', 'writing']);
}
for (const grade of [4, 5]) {
  assert.deepEqual(map.units.filter(unit => unit.grade === grade).map(unit => unit.sequence), [1,2,3,4,5,6,7,8,9]);
}
assert.equal(covered.size, outcomes.size, 'Unmapped outcome clusters');
console.log('Validated: 18 outcome clusters, 18 proposed units, valid source pages, complete cluster references and three strands per unit. This does not certify individual-indicator or authored-lesson coverage.');
