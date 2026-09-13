"use client";
import { useState } from 'react';
import type { ArabicUnit } from './ks2-content';

type Work = { draft:string; revision:string; reflection:string; spoken:boolean; handwriting:boolean };
const empty:Work={draft:'',revision:'',reflection:'',spoken:false,handwriting:false};

export function Ks2Workshop({unit,grade,difficulty,lessonId,learnerKey}:{unit:ArabicUnit;grade:number;difficulty:string;lessonId:number;learnerKey:string}) {
  let owner=`local-${learnerKey}`;
  try { owner=localStorage.getItem('atollingo_legacy_owner')||owner; } catch { /* Storage may be disabled. */ }
  const storageKey=`oceanarabic-workshop-${owner}-G${grade}-${difficulty}-U${lessonId}`;
  const [work,setWork]=useState<Work>(()=>{
    try {const saved=JSON.parse(localStorage.getItem(storageKey)||'null');return saved&&typeof saved.draft==='string'&&typeof saved.revision==='string'&&typeof saved.reflection==='string'?{...empty,...saved}:empty;} catch{return empty;}
  });
  const [notice,setNotice]=useState('');
  const change=(patch:Partial<Work>)=>{const next={...work,...patch};setWork(next);try{localStorage.setItem(storageKey,JSON.stringify(next));setNotice('Saved on this device.');}catch{setNotice('Saving is unavailable. Copy your writing before leaving this lesson.');}};
  const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(work));setNotice('Saved on this device.');}catch{setNotice('Saving is unavailable. Copy your writing before leaving this lesson.');}};
  return <section className="ks2-workshop" aria-label="Writing and speaking workshop">
    <p className="eyebrow">CREATE · SHARE · REVISE</p><h4>Your Arabic workshop</h4>
    <p>{unit.writing}</p>
    {difficulty==='Hard'?<p className="extension-task"><b>Level 7 challenge:</b> {unit.extension} Plan your response independently, then ask for feedback.</p>:<p>Plan your ideas with a partner. Use the passage as a model, then write your own sentences.</p>}
    <label>First draft<textarea lang="ar" dir="rtl" value={work.draft} maxLength={6000} onChange={e=>change({draft:e.target.value})} placeholder="اكتب هنا…"/></label>
    <label>Improved version<textarea lang="ar" dir="rtl" value={work.revision} maxLength={6000} onChange={e=>change({revision:e.target.value})} placeholder="راجع كتابتك…"/></label>
    <label>What did you improve, and why?<textarea dir="auto" value={work.reflection} maxLength={1500} onChange={e=>change({reflection:e.target.value})}/></label>
    <h4>Speak and share</h4><p>{unit.speaking}</p>
    <label className="workshop-check"><input type="checkbox" checked={work.spoken} onChange={e=>change({spoken:e.target.checked})}/>I practised with a partner or adult and asked for feedback.</label>
    <label className="workshop-check"><input type="checkbox" checked={work.handwriting} onChange={e=>change({handwriting:e.target.checked})}/>I wrote a short part on paper and checked its legibility.</label>
    <p className="workshop-note">Ask your reviewer about meaning, organization, language and clarity. These checkboxes record practice; an adult or teacher judges speaking and handwriting.</p>
    <button className="check-btn" onClick={save}>Save my writing</button><p role="status">{notice}</p>
    <details><summary>Curriculum connection</summary><p>Original OceanArabic teaching material linked to NIE Arabic Key Stage 2, PDF pages {unit.pages.join(', ')}. Educator review pending.</p><a href="https://saruna.mnu.edu.mv/handle/123456789/16555" target="_blank" rel="noreferrer">View the syllabus record</a></details>
  </section>;
}
