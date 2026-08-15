"use client";
import { useEffect, useRef, useState } from "react";
import { curriculum } from "./curriculum";
import { grade1EasyLessons } from "./grade1-easy";
import { grade1LessonsFor } from "./grade1-lessons";
import { grade2LessonsFor } from "./grade2-lessons";
import { grade3LessonsFor } from "./grade3-lessons";
import { practiceItems } from "./practice-data";
import { grade1PracticeFor, grade1PracticePhase } from "./grade1-practice";
import { grade2PracticeFor, grade2PracticePhase } from "./grade2-practice";
import { grade3PracticeFor, grade3PracticePhase } from "./grade3-practice";
import { grade1GameFor, grade1GamePhase } from "./grade1-games";
import { grade2GameFor, grade2GamePhase } from "./grade2-games";
import { grade3GameFor, grade3GamePhase } from "./grade3-games";

const nav = [
  ["🏠", "Home"], ["📖", "Learn"], ["✏️", "Practice"], ["🎮", "Play"], ["🏆", "Rewards"], ["📈", "Progress"],
];

export default function Home() {
  type ProgressState={lessons:(string|number)[];quizStars:Record<string,number>;gameStars:Record<string,number>};
  const emptyProgress:ProgressState={lessons:[],quizStars:{},gameStars:{}};
  const [progress,setProgress]=useState<ProgressState>(emptyProgress),[hydrated,setHydrated]=useState(false),[systemNotice,setSystemNotice]=useState("");
  const safeRead=<T,>(key:string,fallback:T):T=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback}catch{setSystemNotice("🛟 Nooru repaired saved data that could not be read.");return fallback}};
  const safeWrite=(key:string,value:unknown)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{setSystemNotice("🛟 Progress could not be saved on this device. Please keep this page open.");return false}};
  const safeRemove=(key:string)=>{try{localStorage.removeItem(key)}catch{setSystemNotice("🛟 This device blocked the storage change. Please try again.")}};
  useEffect(()=>{const restored=safeRead<ProgressState>("oceanarabic-progress",emptyProgress);setProgress(restored&&Array.isArray(restored.lessons)&&restored.quizStars&&restored.gameStars?restored:emptyProgress);const weak=safeRead<unknown>("oceanarabic-weak",[]);setWeakIds(Array.isArray(weak)?weak.filter((id):id is string=>typeof id==="string"):[]);const saved=safeRead<any>("oceanarabic-learner",null);const valid=saved&&typeof saved.name==="string"&&typeof saved.avatar==="string"&&[1,2,3].includes(saved.grade)&&["Easy","Medium","Hard"].includes(saved.difficulty);setLearner(valid?saved:null);if(valid){setGrade(saved.grade);setDifficulty(saved.difficulty)}setHydrated(true)},[]);
  useEffect(()=>{if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js").catch(()=>{})}},[]);
  useEffect(()=>{const sync=()=>{const parts=location.pathname.split("/").filter(Boolean);const page=parts[0]||"home";setActive(`${page[0].toUpperCase()}${page.slice(1)}`);if(page==="learn"&&parts.length>=3){setLessonId(Math.min(grade1EasyLessons.length,Math.max(1,Number(parts[1])||1)));setSubIndex(Math.min(4,Math.max(0,(Number(parts[2])||1)-1)));setShowLesson(true)}else setShowLesson(false);window.scrollTo({top:0})};sync();addEventListener("popstate",sync);return()=>removeEventListener("popstate",sync)},[]);
  useEffect(()=>{if(hydrated)safeWrite("oceanarabic-progress",progress)},[progress,hydrated]);
  const [active, setActive] = useState("Home");
  const [grade, setGrade] = useState(1);
  const [difficulty, setDifficulty] = useState("Easy");
  const plan = curriculum.find(item => item.grade === grade && item.level === difficulty)!;
  const [lessonId,setLessonId]=useState(1), [subIndex,setSubIndex]=useState(0), [answer,setAnswer]=useState<number|null>(null), [checked,setChecked]=useState(false), [hint,setHint]=useState(false), [showLesson,setShowLesson]=useState(false);
  const lessonBank=grade===1?grade1LessonsFor(difficulty):grade===2?grade2LessonsFor(difficulty):grade3LessonsFor(difficulty);
  const lesson=lessonBank.find(x=>x.id===lessonId)||grade1EasyLessons[0], sub=lesson.subLessons[subIndex];
  const [audioNotice,setAudioNotice]=useState("");
  const audioRef=useRef<HTMLAudioElement|null>(null);
  const speak=(rawText:string,slow=false)=>{
    if(typeof window==="undefined")return;
    const text=rawText.trim();
    if(!text){setAudioNotice("🔇 There is no word to play yet.");return}

    audioRef.current?.pause();
    if("speechSynthesis" in window)window.speechSynthesis.cancel();

    const fallbackToDeviceVoice=()=>{
      if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
        setAudioNotice("🔇 Audio could not start. Check this device's sound and internet, then tap again.");
        return;
      }
      const synth=window.speechSynthesis;
      const utterance=new SpeechSynthesisUtterance(text);
      utterance.lang="ar-SA";
      utterance.rate=slow?.52:.88;
      utterance.pitch=1.06;
      utterance.volume=1;
      const arabicVoices=synth.getVoices().filter(voice=>voice.lang.toLowerCase().startsWith("ar"));
      const preferred=/salma|hoda|laila|layla|mariam|maryam|zeina|female|zira|sara/i;
      utterance.voice=arabicVoices.find(voice=>preferred.test(voice.name))||arabicVoices.find(voice=>/sa|ae|eg/i.test(voice.lang))||arabicVoices[0]||null;
      setAudioNotice(slow?"🐢 Playing slowly…":"🔊 Playing at normal speed…");
      utterance.onend=()=>window.setTimeout(()=>setAudioNotice(""),700);
      utterance.onerror=()=>setAudioNotice("🔇 Audio could not play. Check the device volume and tap again.");
      synth.speak(utterance);
    };

    const source=`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=${encodeURIComponent(text)}`;
    const audio=new Audio(source);
    audioRef.current=audio;
    audio.preload="auto";
    audio.playbackRate=slow?.7:1;
    audio.preservesPitch=true;
    audio.onplay=()=>setAudioNotice(slow?"🐢 Playing slowly…":"🔊 Playing at normal speed…");
    audio.onended=()=>window.setTimeout(()=>setAudioNotice(""),700);
    audio.onerror=fallbackToDeviceVoice;
    audio.play().catch(fallbackToDeviceVoice);
  };
  const clear=()=>{setAnswer(null);setChecked(false);setHint(false);window.scrollTo({top:0})};
  const openLesson=(id:number,step=0)=>{setLessonId(id);setSubIndex(step);setShowLesson(true);setActive("Learn");history.pushState({},"",`/learn/${id}/${step+1}`);clear()};
  const next=()=>{if(subIndex<4)openLesson(lessonId,subIndex+1);else{const lessonKey=`G${grade}-${difficulty}-L${lessonId}`;setProgress(p=>({...p,lessons:Array.from(new Set([...p.lessons,lessonKey]))}));if(lessonId<lessonBank.length)openLesson(lessonId+1,0);else{setShowLesson(false);history.pushState({},"","/learn");window.scrollTo({top:0})}}};
  const [practiceSkill,setPracticeSkill]=useState("Letters"),[practiceIndex,setPracticeIndex]=useState(0),[practiceChoice,setPracticeChoice]=useState(""),[practiceResult,setPracticeResult]=useState<"right"|"wrong"|"">(""),[practiceHint,setPracticeHint]=useState(false),[weakIds,setWeakIds]=useState<string[]>([]);
  const actionLock=useRef(false);
  const pool=practiceSkill==="Weak skills"?(weakIds.length?practiceItems.filter(x=>weakIds.includes(x.id)):practiceItems):practiceItems.filter(x=>x.skill===practiceSkill);const practice=pool[practiceIndex%pool.length];
  const choosePractice=(choice:string)=>{if(actionLock.current)return;actionLock.current=true;setPracticeChoice(choice);const ok=choice===practice.answer;setPracticeResult(ok?"right":"wrong");const nextWeak=ok?weakIds.filter(x=>x!==practice.id):Array.from(new Set([...weakIds,practice.id]));setWeakIds(nextWeak);safeWrite("oceanarabic-weak",nextWeak);window.setTimeout(()=>{actionLock.current=false},250)};
  const nextPractice=()=>{setPracticeIndex((practiceIndex+1)%pool.length);setPracticeChoice("");setPracticeResult("");setPracticeHint(false)};
  const [quizLevel,setQuizLevel]=useState(1),[quizIndex,setQuizIndex]=useState(0),[quizChoice,setQuizChoice]=useState(""),[quizChecked,setQuizChecked]=useState(false),[quizHint,setQuizHint]=useState(false),[quizScore,setQuizScore]=useState(0),[quizDone,setQuizDone]=useState(false),[quizStarted,setQuizStarted]=useState(false),[quizNextReady,setQuizNextReady]=useState(false);
  const practiceAvailable=grade<=3;
  const quiz=grade===1?grade1PracticeFor(difficulty,quizLevel):grade===2?grade2PracticeFor(difficulty,quizLevel):grade3PracticeFor(difficulty,quizLevel), question=quiz[quizIndex];
  const practicePhase=grade===1?grade1PracticePhase(difficulty,quizLevel):grade===2?grade2PracticePhase(difficulty,quizLevel):grade3PracticePhase(difficulty,quizLevel);
  const practiceLevelLabel=(level:number)=>grade===1?(level<=7?"حُرُوف":level<=14?"كَلِمَات":"كُلُّ المَهَارَات"):grade===2?(level<=7?"جُمَل":level<=14?"قَوَاعِد":"إِتْقَان"):(level<=7?"تَرَاكِيب":level<=14?"قِرَاءَة":"إِتْقَان");
  const checkQuiz=()=>{if(!quizChoice||quizChecked||actionLock.current)return;actionLock.current=true;setQuizNextReady(false);setQuizChecked(true);if(quizChoice===question.answer)setQuizScore(score=>score+1);window.setTimeout(()=>{actionLock.current=false;setQuizNextReady(true)},900)};
  const advanceQuiz=()=>{if(!quizNextReady||actionLock.current)return;actionLock.current=true;setQuizNextReady(false);if(quizIndex<4){setQuizIndex(index=>index+1);setQuizChoice("");setQuizChecked(false);setQuizHint(false);window.scrollTo({top:0})}else{const earned=quizScore/5<.6?1:quizScore/5<=.8?2:3,key=`G${grade}-${difficulty}-L${quizLevel}`;setProgress(p=>({...p,quizStars:{...p.quizStars,[key]:Math.max(p.quizStars[key]||0,earned)}}));setQuizDone(true);window.scrollTo({top:0})}window.setTimeout(()=>{actionLock.current=false},300)};
  const openQuizLevel=(level:number)=>{setQuizStarted(true);setQuizLevel(level);setQuizIndex(0);setQuizChoice("");setQuizChecked(false);setQuizNextReady(false);setQuizHint(false);setQuizScore(0);setQuizDone(false);setTimeout(()=>document.querySelector(".quiz-player")?.scrollIntoView({behavior:"smooth",block:"start"}),20)};
  const stars=quizScore/5<.6?1:quizScore/5<=.8?2:3;
  const [gameLevel,setGameLevel]=useState(1),[gameIndex,setGameIndex]=useState(0),[gameChoice,setGameChoice]=useState(""),[gameHint,setGameHint]=useState(false),[gameScore,setGameScore]=useState(0),[gameDone,setGameDone]=useState(false),[gameFeedback,setGameFeedback]=useState<"right"|"wrong"|"">(""),[gameStarted,setGameStarted]=useState(false),[timeLeft,setTimeLeft]=useState(0);
  const gameAvailable=grade<=3,rounds=grade===1?grade1GameFor(difficulty,gameLevel):grade===2?grade2GameFor(difficulty,gameLevel):grade3GameFor(difficulty,gameLevel),round=rounds[gameIndex];
  const currentGamePhase=grade===1?grade1GamePhase(difficulty,gameLevel):grade===2?grade2GamePhase(difficulty,gameLevel):grade3GamePhase(difficulty,gameLevel);
  const gameLevelLabel=(level:number)=>grade===1?(level<=7?"حُرُوف":level<=14?"كَلِمَات":"مُحَادَثَة"):grade===2?(level<=7?"جُمَل":level<=14?"قَوَاعِد":"إِتْقَان"):(level<=7?"تَرَاكِيب":level<=14?"تَحَدِّي":"إِتْقَان");
  const openGameLevel=(level:number)=>{setGameStarted(true);setGameLevel(level);setGameIndex(0);setGameChoice("");setGameHint(false);setGameScore(0);setGameDone(false);setGameFeedback("");setTimeout(()=>document.querySelector(".game-player")?.scrollIntoView({behavior:"smooth",block:"start"}),20)};
  const playChoice=(choice:string)=>{if(gameFeedback||actionLock.current)return;actionLock.current=true;setGameChoice(choice);const ok=choice===round.answer,nextScore=gameScore+(ok?1:0);setGameFeedback(ok?"right":"wrong");if(ok)setGameScore(nextScore);setTimeout(()=>{if(gameIndex<4){setGameIndex(v=>v+1);setGameChoice("");setGameHint(false);setGameFeedback("")}else{const earned=nextScore/5<.6?1:nextScore/5<=.8?2:3,key=`G${grade}-${difficulty}-L${gameLevel}`;setProgress(p=>({...p,gameStars:{...p.gameStars,[key]:Math.max(p.gameStars[key]||0,earned)}}));setGameDone(true)}actionLock.current=false},900)};
  useEffect(()=>{if(!gameStarted||gameDone||gameFeedback||!round?.seconds){setTimeLeft(0);return}setTimeLeft(round.seconds);const timer=window.setInterval(()=>setTimeLeft(value=>{if(value<=1){window.clearInterval(timer);window.setTimeout(()=>playChoice("__timeout__"),0);return 0}return value-1}),1000);return()=>window.clearInterval(timer)},[gameStarted,gameDone,gameLevel,gameIndex,round?.seconds]);
  const gameStars=gameScore/5<.6?1:gameScore/5<=.8?2:3;
  const totalStars=Object.values(progress.quizStars).reduce((a,b)=>a+b,0)+Object.values(progress.gameStars).reduce((a,b)=>a+b,0);
  const selectedPrefix=`G${grade}-${difficulty}-L`,selectedLessons=progress.lessons.filter(id=>String(id).startsWith(selectedPrefix)),selectedQuizKeys=Object.keys(progress.quizStars).filter(key=>key.startsWith(selectedPrefix)),selectedGameKeys=Object.keys(progress.gameStars).filter(key=>key.startsWith(selectedPrefix));
  const completedActivities=selectedLessons.length+selectedQuizKeys.length+selectedGameKeys.length,selectedStars=selectedQuizKeys.reduce((sum,key)=>sum+(progress.quizStars[key]||0),0)+selectedGameKeys.reduce((sum,key)=>sum+(progress.gameStars[key]||0),0);
  const badges=[{name:"Lesson Pearl",icon:"🦪",detail:"Finish 3 lessons",on:selectedLessons.length>=3},{name:"Curriculum Diver",icon:"🤿",detail:"Finish 7 lessons",on:selectedLessons.length>=7},{name:"Quiz Dolphin",icon:"🐬",detail:"Complete 5 practice levels",on:selectedQuizKeys.length>=5},{name:"Game Star",icon:"⭐",detail:"Complete 5 game levels",on:selectedGameKeys.length>=5},{name:"Nooru’s Friend",icon:"💙",detail:"Complete 15 activities",on:completedActivities>=15},{name:"Island Champion",icon:"🏆",detail:"Complete 30 activities",on:completedActivities>=30}],unlocked=badges.filter(b=>b.on);
  type Learner={name:string;avatar:string;grade:number;difficulty:string};
  const [learner,setLearner]=useState<Learner|null>(null);
  const [entryName,setEntryName]=useState(""),[entryAvatar,setEntryAvatar]=useState("/assets/avatars/avatar-01.png"),[resetOpen,setResetOpen]=useState(false);
  const avatars=Array.from({length:18},(_,i)=>`/assets/avatars/avatar-${String(i+1).padStart(2,"0")}.png`);
  const imageFallback=(fallback:string)=>(event:React.SyntheticEvent<HTMLImageElement>)=>{const image=event.currentTarget;if(image.dataset.fallbackApplied)return;image.dataset.fallbackApplied="true";image.src=fallback};
  const resetActivityViews=()=>{setShowLesson(false);setLessonId(1);setSubIndex(0);clear();setQuizStarted(false);setQuizLevel(1);setQuizIndex(0);setQuizChoice("");setQuizChecked(false);setQuizNextReady(false);setQuizHint(false);setQuizScore(0);setQuizDone(false);setGameStarted(false);setGameLevel(1);setGameIndex(0);setGameChoice("");setGameHint(false);setGameScore(0);setGameDone(false);setGameFeedback("");setTimeLeft(0)};
  const enterApp=()=>{if(!entryName.trim()||actionLock.current)return;actionLock.current=true;resetActivityViews();setActive("Home");history.replaceState({},"","/");window.scrollTo({top:0});const data={name:entryName.trim(),avatar:entryAvatar,grade,difficulty};safeWrite("oceanarabic-learner",data);setLearner(data);window.setTimeout(()=>{actionLock.current=false},300)};
  const logout=()=>{if(actionLock.current)return;actionLock.current=true;resetActivityViews();setActive("Home");history.replaceState({},"","/");window.scrollTo({top:0});safeRemove("oceanarabic-learner");setLearner(null);setEntryName("");window.setTimeout(()=>{actionLock.current=false},300)};
  const resetAll=()=>{if(actionLock.current)return;actionLock.current=true;setProgress(emptyProgress);setWeakIds([]);safeRemove("oceanarabic-progress");safeRemove("oceanarabic-weak");resetActivityViews();setResetOpen(false);setSystemNotice("🫧 Progress reset. Your new Arabic voyage is ready!");window.setTimeout(()=>{actionLock.current=false;setSystemNotice("")},1800)};
  const goTo=(label:string)=>{setActive(label);if(label==="Learn")setShowLesson(false);if(label==="Practice")setQuizStarted(false);if(label==="Play")setGameStarted(false);history.pushState({},"",label==="Home"?"/":`/${label.toLowerCase()}`);window.scrollTo({top:0})};
  if(!hydrated)return <main className="entry-loading"><img src="/assets/nooru.png" onError={imageFallback("/assets/avatars/avatar-01.png")} alt="OceanArabic is loading"/></main>;
  if(!learner)return <main className="entry-page"><section className="entry-card"><img src="/assets/nooru.png" onError={imageFallback("/assets/avatars/avatar-01.png")} alt="Nooru the OceanArabic dolphin"/><p className="arabic entry-salam" dir="rtl">السَّلَامُ عَلَيْكُمْ</p><p className="eyebrow">WELCOME TO OCEANARABIC</p><h1>Ready for an Arabic adventure?</h1><p>Choose your learner and Nooru will guide the way.</p><label>Your name<input value={entryName} onChange={e=>setEntryName(e.target.value)} placeholder="Type your name" maxLength={20}/></label><div className="login-choice"><b>Choose your grade</b><div>{[1,2,3].map(n=><button key={n} className={grade===n?"on":""} onClick={()=>setGrade(n)}>Grade {n}</button>)}</div><b>Choose difficulty</b><div>{["Easy","Medium","Hard"].map(d=><button key={d} className={difficulty===d?"on":""} onClick={()=>setDifficulty(d)}>{d}</button>)}</div></div><fieldset><legend>Choose your avatar</legend><div className="avatar-picker">{avatars.map((a,i)=><button key={a} aria-label={`Avatar ${i+1}`} onClick={()=>setEntryAvatar(a)} className={entryAvatar===a?"on":""}><img src={a} onError={imageFallback("/assets/avatars/avatar-01.png")} alt=""/></button>)}</div></fieldset><button className="enter-button" disabled={!entryName.trim()} onClick={enterApp}>Start with Nooru →</button></section></main>;
  return <main className={`app-shell page-${active.toLowerCase()}`}>
    <header className="topbar">
      <div className="logo"><img className="deck-mascot" src="/assets/nooru.png" onError={imageFallback("/assets/avatars/avatar-01.png")} alt="Nooru mascot"/><div><b>OceanArabic</b><small>Arabic adventures by Atollingo</small></div></div>
      <div className="profile"><div className="avatar"><img src={learner.avatar} onError={imageFallback("/assets/avatars/avatar-01.png")} alt={`${learner.name} avatar`}/></div><div className="learner-label"><b>Hello, {learner.name}</b><small>G{learner.grade} · {learner.difficulty}</small></div><div className="status-stack" aria-label="Learning rewards"><span title="Stars">⭐ {totalStars}</span><span title="Rewards">🏅 {unlocked.length}</span><span title="Learning streak">🔥 {completedActivities?1:0}</span></div><button aria-label="Reset progress" onClick={()=>setResetOpen(true)}>🫧<small>Reset</small></button><button aria-label="Log out" onClick={logout}>🚪<small>Logout</small></button></div>
    </header>
    {(audioNotice||systemNotice)&&<div className="audio-notice" role="status" aria-live="polite">{audioNotice||systemNotice}</div>}

    <section className="hero">
      <div className="copy">
        <p className="arabic greeting" lang="ar" dir="rtl">السَّلَامُ عَلَيْكُمْ</p>
        <p className="eyebrow">MEET NOORU · YOUR ARABIC GUIDE</p>
        <h1>Let’s begin an<br/><em>Arabic adventure!</em></h1>
        <p>Listen, look, speak and play as Nooru guides you through letters, words and friendly island conversations.</p>
        <button className="cta" onClick={()=>goTo("Learn")}>Start the journey <span>←</span></button>
      </div>
      <div className="mascot-wrap"><span className="spark s1">✦</span><span className="spark s2">✦</span><img src="/assets/nooru.png" alt="Nooru the dolphin holding the Arabic letter baa"/><div className="speech arabic" dir="rtl">هَيَّا نَتَعَلَّمْ!</div></div>
    </section>

    <section className="preview">
      <p className="eyebrow">YOUR LEARNING HARBOUR</p><h2>Five ways to grow</h2>
      <div className="feature-row">
        {nav.slice(1).map(([icon,label])=><button key={label} onClick={()=>goTo(label)} className={active===label?"selected":""}><span>{icon}</span><b>{label}</b></button>)}
      </div>
      <div className="coming"><span>🐚</span><div><b>Choose your next Arabic adventure</b><p>Learn letters, practise sounds, play games and collect rewards with Nooru.</p></div></div>
    </section>

    <section className="curriculum-map" aria-hidden="true"><div className="map-head"><div><p className="eyebrow">STAGE 2 · CURRICULUM MAP</p><h2>Three steps to grade mastery</h2></div><p>Easy establishes the basics. Medium extends them. Hard completes the selected grade syllabus.</p></div><div className="selectors"><div>{[1,2,3].map(n=><button className={grade===n?"on":""} onClick={()=>setGrade(n)} key={n}>Grade {n}</button>)}</div><div>{["Easy","Medium","Hard"].map(d=><button className={difficulty===d?"on":""} onClick={()=>setDifficulty(d)} key={d}>{d}</button>)}</div></div><article className="plan-card"><header><div><span>Grade {plan.grade}</span><b>{plan.level}</b></div><p>{plan.goal}</p></header><div className="phase-grid">{plan.phases.map((phase,index)=><section key={phase[0] as string}><div className="phase-no">{index+1}</div><p className="eyebrow">PHASE {index+1}</p><h3>{phase[0]}</h3><ul>{(phase[1] as string[]).map(topic=><li key={topic}>{topic}</li>)}</ul><div className="mastery"><b>Mastery</b><p>{phase[2]}</p></div></section>)}</div><footer><b>Assessment evidence</b><div>{plan.checks.map(item=><span key={item}>✓ {item}</span>)}</div></footer></article><p className="matrix-note">Medium retains Easy knowledge. Hard assesses the complete syllabus for the grade.</p></section>

    <section className="game-engine">
      <div className="game-head"><div><p className="eyebrow">STAGE 6 · GAME ENGINE</p><h2>Nooru’s game islands</h2><p>Twenty levels with four different ways to play. Tap, listen, build and race through Arabic.</p></div><div className="game-bubble">🎮<b>5 rounds</b><small>per level</small></div></div>
      {gameAvailable?<>
      {!gameStarted&&<div className="game-levels">{Array.from({length:20},(_,i)=>i+1).map(level=><button key={level} onClick={()=>openGameLevel(level)} className={`${level<=7?"p1":level<=14?"p2":"p3"}`}><b>{level}</b><small className="arabic">{gameLevelLabel(level)}</small></button>)}</div>}
      {gameStarted&&<div className="activity-scene"><button className="back-levels" onClick={()=>setGameStarted(false)}>← <span className="arabic">المُسْتَوَيَات</span></button><article className="game-player">{!gameDone?<><header><div><b>Level {gameLevel}</b><span>Round {gameIndex+1}/5</span><strong>⭐ {gameScore}</strong></div><p>{currentGamePhase}</p></header><div className={`game-board ${round.kind.toLowerCase().replace(" ","-")}`}><div className="game-kind">{round.kind==="Picture Match"?"🖼️":round.kind==="Sound Hunt"?"🎧":round.kind==="Letter Builder"?"🧩":"⏱️"} {round.kind}</div>{round.seconds&&<div className="timer" aria-live="polite">{timeLeft}s reef challenge</div>}<div className="game-visual">{round.visual}</div><h3>{round.prompt}</h3>{round.spoken&&<div className="game-audio"><button onClick={()=>speak(round.spoken!)}>🔊 Hear</button><button onClick={()=>speak(round.spoken!,true)}>🐢 Slower</button></div>}{round.pieces&&<div className="game-pieces">{round.pieces.map((piece,i)=><span key={`${piece}-${i}`} className="arabic">{piece}</span>)}</div>}<div className="game-options">{round.options.map(option=><button key={option} onClick={()=>playChoice(option)} className={`${gameChoice===option?gameFeedback:""}`}><b className="arabic" dir="rtl">{option}</b></button>)}</div><button className="game-hint" onClick={()=>setGameHint(!gameHint)}>💡 {gameHint?round.hint:"Show hint"}</button>{gameFeedback&&<div className={`game-feedback ${gameFeedback}`}>{gameFeedback==="right"?"أَحْسَنْتَ! Splash-tastic!":gameChoice==="__timeout__"?"Time’s up! Nooru will show the next round.":"Nice try! Nooru will show the next round."}</div>}</div></>:<div className="game-result"><span>{"⭐".repeat(gameStars)}</span><h3>Island level complete!</h3><p>You won <b>{gameScore} of 5</b> rounds.</p><button onClick={()=>openGameLevel(gameLevel)}>Play again</button>{gameLevel<20&&gameScore>=3?<button className="next-game" onClick={()=>openGameLevel(gameLevel+1)}>Next island →</button>:gameScore<3?<p>Win 3 rounds to sail onward.</p>:null}</div>}</article></div>}
      </>:<div className="curriculum-pending"><span>🎮</span><b>Grade {grade} Play is next</b><p>This grade will receive its own curriculum games instead of reusing Grade 1.</p></div>}
    </section>

    <section className="quiz-engine">
      <div className="quiz-head"><div><p className="eyebrow">PRACTICE SETS</p><h2>Twenty guided practice sets</h2><p>Each five-question set follows the selected grade and difficulty, with pictures, listening and hidden hints.</p></div><div className="quiz-medal">🏅<b>5 questions</b><small>each level</small></div></div>
      {practiceAvailable?<>
      {!quizStarted&&<div className="quiz-levels">{Array.from({length:20},(_,i)=>i+1).map(level=><button key={level} onClick={()=>openQuizLevel(level)} className={`${level<=7?"p1":level<=14?"p2":"p3"}`}><span>{level}</span><small className="arabic">{practiceLevelLabel(level)}</small></button>)}</div>}
      {quizStarted&&<div className="activity-scene"><button className="back-levels" onClick={()=>setQuizStarted(false)}>← <span className="arabic">المُسْتَوَيَات</span></button><article className="quiz-player">
        {!quizDone?<><header><div><span>Level {quizLevel}</span><b>Question {quizIndex+1} of 5</b><strong>Score {quizScore}</strong></div><p>{practicePhase}</p></header><div className="quiz-body"><div className="question-type">{question.type==="Dictation"?"🔊":question.type==="Reading"?"📖":"🖼️"} {question.type}</div><div className="quiz-visual">{question.visual}</div>{question.passage&&<div className="quiz-passage arabic" dir="rtl">{question.passage}</div>}<h3>{question.prompt}</h3>{question.spoken&&<div className="quiz-audio"><button onClick={()=>speak(question.spoken!)}>🔊 Hear</button><button onClick={()=>speak(question.spoken!,true)}>🐢 Slower</button></div>}<div className="quiz-options">{question.options.map((option,i)=><button key={option} disabled={quizChecked} onClick={()=>setQuizChoice(option)} className={`${quizChoice===option?"chosen":""} ${quizChecked&&quizChoice===option?(option===question.answer?"right":"wrong"):""}`}><span>{String.fromCharCode(65+i)}</span><b className="arabic" dir="rtl">{option}</b></button>)}</div><div className="quiz-actions"><button className="hint-btn" onClick={()=>setQuizHint(!quizHint)}>💡 {quizHint?question.hint:"Show hint"}</button>{!quizChecked?<button className="check-btn" disabled={!quizChoice} onClick={checkQuiz}>Check answer</button>:<button className="check-btn" onClick={advanceQuiz}>{quizIndex<4?"Next question →":"See results →"}</button>}</div>{quizChecked&&<div className={quizChoice===question.answer?"feedback good":"feedback retry"}>{quizChoice===question.answer?"أَحْسَنْتَ! Correct!":`The answer is ${question.answer}.`}</div>}</div></>:<div className="quiz-results"><span className="result-stars">{"⭐".repeat(stars)}</span><h3>Level {quizLevel} complete!</h3><p>You answered <b>{quizScore} of 5</b> correctly.</p><div><button onClick={()=>openQuizLevel(quizLevel)}>Try again</button>{quizLevel<20&&quizScore>=3?<button className="next-level" onClick={()=>openQuizLevel(quizLevel+1)}>Next level →</button>:quizScore<3?<p>Score 3/5 to open the next level.</p>:null}</div></div>}
      </article></div>}
      </>:<div className="curriculum-pending"><span>📝</span><b>Grade {grade} Practice is next</b><p>This grade will not reuse Grade 1 questions.</p></div>}
    </section>

    <section className="practice-engine">
      <div className="practice-head"><div><p className="eyebrow">STAGE 4 · PRACTICE ENGINE</p><h2>Practice with Nooru</h2><p>Try as many times as you need. Mistakes help build your personal review.</p></div><div className="weak-count">💡<b>{weakIds.length}</b><small>skills to review</small></div></div>
      <div className="skill-picker">{["Letters","Sounds","Words","Build","Listening","Weak skills"].map(skill=><button key={skill} className={practiceSkill===skill?"on":""} onClick={()=>{setPracticeSkill(skill);setPracticeIndex(0);setPracticeChoice("");setPracticeResult("");setPracticeHint(false)}}><span>{skill==="Letters"?"ا":skill==="Sounds"?"🔊":skill==="Words"?"🖼️":skill==="Build"?"🧩":skill==="Listening"?"👂":"💪"}</span>{skill}</button>)}</div>
      <article className="practice-board"><div className="practice-progress"><span>{practiceSkill}</span><b>Practice {practiceIndex+1} of {pool.length}</b></div><div className="practice-visual">{practice.visual}</div><h3>{practice.prompt}</h3>{practice.spoken&&<div className="practice-audio"><button onClick={()=>speak(practice.spoken!)}>🔊 Hear</button><button onClick={()=>speak(practice.spoken!,true)}>🐢 Slower</button></div>}<div className="practice-options">{practice.options.map(option=><button key={option} className={`${practiceChoice===option?"chosen":""} ${practiceChoice===option?practiceResult:""}`} onClick={()=>choosePractice(option)}><b className="arabic" dir="rtl">{option}</b></button>)}</div><div className="practice-actions"><button onClick={()=>setPracticeHint(!practiceHint)}>💡 {practiceHint?practice.hint:"Show hint"}</button>{practiceResult&&<button className="next-practice" onClick={nextPractice}>{practiceResult==="right"?"Next practice →":"Try a new one →"}</button>}</div>{practiceResult&&<div className={`practice-feedback ${practiceResult}`}>{practiceResult==="right"?"أَحْسَنْتَ! You got it!":"Good try. This skill was added to your review."}</div>}{practiceSkill==="Weak skills"&&!weakIds.length&&<p className="all-clear">No weak skills yet—so Nooru is giving you a mixed review.</p>}</article>
    </section>

    <section className="rewards-dashboard">
      <div className="dashboard-head"><div><p className="eyebrow">GRADE {grade} · {difficulty.toUpperCase()} · REWARDS</p><h2>Nooru’s treasure chest</h2><p>Complete this learning route to fill its badge reef.</p></div><div className="reward-total"><span>⭐</span><b>{selectedStars}</b><small>route stars</small></div></div>
      <div className="badge-grid">{badges.map(b=><article key={b.name} className={b.on?"unlocked":"locked"}><div>{b.on?b.icon:"🔒"}</div><h3>{b.name}</h3><p>{b.on?"Unlocked—wonderful work!":b.detail}</p></article>)}</div>
    </section>

    <section className="progress-dashboard">
      <div className="dashboard-head"><div><p className="eyebrow">GRADE {grade} · {difficulty.toUpperCase()} · PROGRESS</p><h2>Your Arabic voyage</h2><p>See what you have finished in the selected curriculum route.</p></div><img src="/assets/nooru.png" alt="Nooru celebrating progress"/></div>
      <div className="progress-summary"><article><span>📖</span><b>{selectedLessons.length}/9</b><small>Lessons</small><i style={{width:`${Math.min(100,selectedLessons.length/9*100)}%`}}/></article><article><span>❓</span><b>{selectedQuizKeys.length}/20</b><small>Practice levels</small><i style={{width:`${Math.min(100,selectedQuizKeys.length/20*100)}%`}}/></article><article><span>🎮</span><b>{selectedGameKeys.length}/20</b><small>Game levels</small><i style={{width:`${Math.min(100,selectedGameKeys.length/20*100)}%`}}/></article><article><span>🏅</span><b>{unlocked.length}/6</b><small>Badges</small><i style={{width:`${unlocked.length/6*100}%`}}/></article></div>
      <div className="voyage-card"><div><b>Grade {grade} · {difficulty}</b><span>{completedActivities} of 49 activities complete</span></div><div className="voyage-track"><i style={{width:`${Math.min(100,completedActivities/49*100)}%`}}/><span>🐬</span></div><p>{completedActivities===0?`Begin the Grade ${grade} ${difficulty} route—Nooru is waiting!`:completedActivities<25?"Great swimming! Keep following the learning bubbles.":"You are crossing the final reef!"}</p></div>
    </section>

    <section className={`lesson-prototype ${showLesson?"lesson-detail-page":"lesson-catalogue-page"}`}>
      {!showLesson?<>
      <div className="lesson-head"><div><p className="eyebrow">GRADE {grade} · {difficulty.toUpperCase()}</p><h2>{grade===1?difficulty==="Easy"?"Alphabet Island":difficulty==="Medium"?"Word Bridge":"Grade 1 Voyage":grade===2?difficulty==="Easy"?"Sentence Lagoon":difficulty==="Medium"?"Grammar Reef":"Heritage Harbour":difficulty==="Easy"?"Noun Atoll":difficulty==="Medium"?"Sentence Sea":"Time and Compass Bay"}</h2><p>Choose a lesson to open its learning adventure.</p></div><img src="/assets/nooru.png" alt="Nooru, the Arabic guide"/></div>
      {lessonBank.length?<div className="lesson-map">{lessonBank.map(l=><button key={l.id} className={`phase-${l.phase}`} onClick={()=>openLesson(l.id,0)}><span>{l.id}</span><b>{l.title}</b><small className="arabic" dir="rtl">{l.arabicTitle}</small><small>Phase {l.phase}</small></button>)}</div>:<div className="curriculum-pending"><span>📚</span><b>Not available yet</b><p>This grade will not reuse another grade's lessons.</p></div>}
      </>:<>
      <button className="back-lessons" onClick={()=>{setShowLesson(false);history.pushState({},"","/learn");window.scrollTo({top:0})}}>← All lessons</button>
      <article className="lesson-player"><header><div><p>LESSON {lesson.id} · STEP {subIndex+1} OF 5</p><h3>{lesson.title}</h3><div className="arabic" dir="rtl">{lesson.arabicTitle}</div></div><div className="step-tabs">{lesson.subLessons.map((s,i)=><button onClick={()=>openLesson(lessonId,i)} className={i===subIndex?"on":""} key={s.step}><span>{i+1}</span>{s.step}</button>)}</div></header>
        <section className="instruction"><span>{["👀","👂","🗣️","🧩","⭐"][subIndex]}</span><div><b>{sub.title}</b><p>{sub.instruction}</p></div>{subIndex===1||subIndex===2?<div className="audio-controls"><button onClick={()=>speak(sub.examples[0].word)}>🔊 Normal</button><button onClick={()=>speak(sub.examples[0].word,true)}>🐢 Slow</button></div>:null}</section>
        <div className="visual-cards">{sub.examples.map(ex=><button key={ex.word} onClick={()=>speak(ex.word)}><span>{ex.visual}</span><b className="arabic" dir="rtl">{ex.letter}</b><small className="arabic" dir="rtl">{ex.word}</small><i>🔊 Tap</i></button>)}</div>
        <section className="mini-task"><p className="eyebrow">YOUR TURN</p><h4>{sub.task.prompt}</h4><div className="task-options">{sub.task.options.map((op,i)=><button key={`${op.label}-${i}`} className={`${answer===i?"chosen":""} ${checked&&answer===i?(op.correct?"right":"wrong"):""}`} onClick={()=>{setAnswer(i);setChecked(false)}}><span>{op.visual}</span><b className="arabic" dir="rtl">{op.label}</b></button>)}</div><div className="task-actions"><button className="hint-btn" onClick={()=>setHint(!hint)}>💡 {hint?sub.task.hint:"Show hint"}</button><button className="check-btn" disabled={answer===null} onClick={()=>setChecked(true)}>Check</button></div>{checked&&<div className={sub.task.options[answer!]?.correct?"feedback good":"feedback retry"}>{sub.task.options[answer!]?.correct?"أَحْسَنْتَ! Great job!":"Try again. Use the hint."}</div>}</section>
        <footer><button disabled={subIndex===0&&lessonId===1} onClick={()=>subIndex>0?openLesson(lessonId,subIndex-1):openLesson(lessonId-1,4)}>← Previous</button><button className="next-btn" disabled={!checked||!sub.task.options[answer!]?.correct} onClick={next}>{subIndex<4?"Next step →":lessonId<lessonBank.length?"Next lesson →":`Finish Grade ${grade} ${difficulty} ★`}</button></footer>
      </article>
      </>}
    </section>

    <nav className="dock" aria-label="Main navigation">
      {nav.map(([icon,label])=><button key={label} onClick={()=>goTo(label)} className={active===label?"active":""}><span>{icon}</span><small>{label}</small></button>)}
    </nav>
    {resetOpen&&<div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reset-title"><section className="reset-modal"><img src="/assets/nooru.png" alt="Nooru protecting your treasure"/><div className="bubble-pop">🫧</div><h2 id="reset-title">Splash everything away?</h2><p>This clears all lessons, stars, badges and practice on this device.</p><div><button onClick={()=>setResetOpen(false)}>Keep my treasure</button><button className="reset-confirm" onClick={resetAll}>Yes, reset</button></div></section></div>}
  </main>;
}










