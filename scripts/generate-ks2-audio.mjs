import {createHash} from 'node:crypto';
import {mkdir,mkdtemp,readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';

const source=await readFile(new URL('../app/ks2-content.ts',import.meta.url),'utf8');
const dir=await mkdtemp(join(tmpdir(),'ks2-audio-'));
const compiled=join(dir,'content.mjs');
await writeFile(compiled,ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);
const {grade4Units,grade5Units}=await import(pathToFileURL(compiled).href);
const mapPath=new URL('../app/audio-map.json',import.meta.url);
const map=JSON.parse(await readFile(mapPath,'utf8'));
const audioDir=new URL('../public/audio/',import.meta.url);
await mkdir(audioDir,{recursive:true});
for(const unit of [...grade4Units,...grade5Units]){
  const phrase=unit.passage;
  if(map[phrase])continue;
  // Fetch sentence-sized fragments to stay within the existing TTS provider's request limit.
  const chunks=[];let chunk='';
  for(const word of phrase.split(' ')){
    if((chunk+' '+word).length>160){chunks.push(chunk);chunk=word;}else chunk=chunk?chunk+' '+word:word;
  }
  if(chunk)chunks.push(chunk);
  const parts=[];
  for(const text of chunks){
    const response=await fetch(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodeURIComponent(text)}`,{signal:AbortSignal.timeout(30000)});
    if(!response.ok||!response.headers.get('content-type')?.includes('audio'))throw Error(`Audio generation failed (${response.status}) for ${unit.title}`);
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length<500)throw Error(`Empty audio for ${unit.title}`);
    parts.push(bytes);
  }
  const file=`ks2-${createHash('sha256').update(phrase).digest('hex').slice(0,20)}.mp3`;
  await writeFile(new URL(file,audioDir),Buffer.concat(parts));
  map[phrase]=`/audio/${file}`;
  await writeFile(mapPath,JSON.stringify(map,null,2)+'\n');
  console.log(`Bundled: ${unit.title}`);
}
console.log('All 18 KS2 passages have bundled audio.');
