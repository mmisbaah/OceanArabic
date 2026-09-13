import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import test from 'node:test';
import ts from 'typescript';

const out=await mkdtemp(join(tmpdir(),'arabic-ks2-'));
async function load(name){
  const source=await readFile(new URL(`../app/${name}.ts`,import.meta.url),'utf8');
  const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  const path=join(out,`${name}.mjs`);await writeFile(path,js);return import(pathToFileURL(path).href);
}
const {learningLevels,levelForProfile}=await load('learning-levels');
const {ks2UnitsFor,ks2LessonsFor,ks2PracticeFor,ks2GameFor}=await load('ks2-content');
test('seven stages follow the Atollingo grade progression',()=>{
  assert.deepEqual(learningLevels.map(x=>x.id),[1,2,3,4,5,6,7]);
  assert.deepEqual(learningLevels.map(x=>x.grade),[1,1,2,3,4,5,5]);
  assert.equal(learningLevels[6].difficulty,'Hard');
});
test('all fifteen grade/challenge selections match OceanLearn placement',()=>{
  const expected=[[1,2,3],[2,3,4],[3,4,5],[4,5,6],[5,6,7]];
  for(let grade=1;grade<=5;grade++)for(const [index,challenge] of ['Easy','Medium','Hard'].entries()){
    assert.equal(levelForProfile(grade,challenge).id,expected[grade-1][index]);
  }
  assert.deepEqual(levelForProfile(4,'Hard'),levelForProfile(5,'Medium'));
});
test('every new route supplies its own complete text, practice and game banks',()=>{
  const passages=new Set();
  for(const grade of [4,5]){
    const units=ks2UnitsFor(grade);assert.equal(units.length,9);
    for(const unit of units){
      assert.ok(!passages.has(unit.passage),'A passage was reused across units');passages.add(unit.passage);
      assert.ok(unit.passage.length>100);assert.equal(unit.checks.length,5);
      assert.ok(unit.writing&&unit.speaking&&unit.extension);
      assert.ok(unit.pages.every(page=>page>=(grade===4?17:27)&&page<=(grade===4?25:35)));
    }
    for(const difficulty of ['Medium','Hard']){
      const lessons=ks2LessonsFor(grade,difficulty);assert.equal(lessons.length,9);
      for(let set=1;set<=9;set++){
        const lesson=lessons[set-1];assert.equal(lesson.subLessons.length,5);
        assert.ok(lesson.subLessons.every(step=>step.task.options.filter(o=>o.correct).length===1));
        const practice=ks2PracticeFor(grade,difficulty,set),games=ks2GameFor(grade,difficulty,set);
        assert.equal(practice.length,5);assert.equal(games.length,5);
        for(const question of [...practice,...games]){
          assert.equal(new Set(question.options).size,question.options.length);
          assert.equal(question.options.filter(x=>x===question.answer).length,1);
          assert.equal(question.passage,units[set-1].passage);
          assert.ok(question.id.includes(`G${grade}-${difficulty}`));
        }
      }
    }
  }
  assert.equal(passages.size,18);
});
test('extension route raises independence and retains a distinct progress namespace',()=>{
  const guided=ks2LessonsFor(5,'Medium'),advanced=ks2LessonsFor(5,'Hard');
  assert.notEqual(guided[0].subLessons[0].instruction,advanced[0].subLessons[0].instruction);
  assert.notEqual(ks2PracticeFor(5,'Medium',1)[0].id,ks2PracticeFor(5,'Hard',1)[0].id);
  assert.match(ks2UnitsFor(5)[8].speaking,/five-minute/);
});
test('every KS2 passage has a nonempty bundled MP3',async()=>{
  const map=JSON.parse(await readFile(new URL('../app/audio-map.json',import.meta.url),'utf8'));
  for(const grade of [4,5])for(const unit of ks2UnitsFor(grade)){
    assert.match(map[unit.passage]||'',/^\/audio\/ks2-[a-f0-9]+\.mp3$/);
    const audio=await readFile(new URL(`../public${map[unit.passage]}`,import.meta.url));
    assert.ok(audio.length>1000,unit.title);
    assert.ok(audio.subarray(0,3).toString()==='ID3'||audio[0]===0xff,`Invalid MP3 header: ${unit.title}`);
  }
});
