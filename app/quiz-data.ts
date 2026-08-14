export type QuizType="Dictation"|"Multiple Choice"|"Fill in the Blank"|"Reading";
export type QuizQuestion={id:string;type:QuizType;prompt:string;visual:string;spoken?:string;passage?:string;options:string[];answer:string;hint:string};
const letters=["أ","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];
const words=[
  ["أَسَد","🦁"],["بَطَّة","🦆"],["تُفَّاح","🍎"],["ثَعْلَب","🦊"],["جَمَل","🐪"],["حُوت","🐋"],["خَرُوف","🐑"],["دَلْفِين","🐬"],["ذُرَة","🌽"],["رُمَّان","🔴"],["زَهْرَة","🌺"],["سَمَك","🐟"],["شَمْس","☀️"],["صَدَفَة","🐚"],["ضِفْدَع","🐸"],["طَائِرَة","✈️"],["ظَرْف","✉️"],["عَيْن","👁️"],["غَيْمَة","☁️"],["فِيل","🐘"],["قَمَر","🌙"],["كِتَاب","📘"],["لَيْمُون","🍋"],["مَوْز","🍌"],["نَجْمَة","⭐"],["هِلَال","🌙"],["وَرْدَة","🌹"],["يَد","✋"]
];
const rotate=<T,>(a:T[],n:number)=>a.map((_,i)=>a[(i+n)%a.length]);
export function quizForLevel(level:number):QuizQuestion[]{
  const phase=level<=7?1:level<=14?2:3;
  return Array.from({length:5},(_,q)=>{
    const seed=(level-1)*5+q, li=seed%letters.length, wi=seed%words.length, letter=letters[li], word=words[wi];
    if(phase===1){const opts=rotate([letter,letters[(li+5)%28],letters[(li+11)%28]],(seed*7+level)%3);return {id:`L${level}Q${q+1}`,type:q%2?"Multiple Choice":"Dictation",prompt:q%2?`Which picture begins with ${letter}?`:"Listen. Tap the letter.",visual:q%2?word[1]:"👂",spoken:letter,options:opts,answer:letter,hint:`Look for ${letter}.`};}
    if(phase===2){const opts=rotate([word[0],words[(wi+7)%28][0],words[(wi+13)%28][0]],(seed*5+2)%3);return {id:`L${level}Q${q+1}`,type:q%2?"Multiple Choice":"Dictation",prompt:q%2?"Tap the word for the picture.":"Listen. Tap the word.",visual:word[1],spoken:word[0],options:opts,answer:word[0],hint:`The word begins with ${word[0][0]}.`};}
    const greetings=[["أَهْلًا","👋"],["شُكْرًا","💛"],["اِسْمِي","🙂"],["مَعَ السَّلَامَة","🚶"]];const g=greetings[seed%4];const opts=rotate([g[0],greetings[(seed+1)%4][0],words[(wi+9)%28][0]],(seed*11+1)%3);return {id:`L${level}Q${q+1}`,type:q===0?"Dictation":"Multiple Choice",prompt:q===0?"Listen. Tap the word.":q===4?"A friend meets you. What do you say?":"Tap the matching word.",visual:q===4?"👧🏽👦🏽":g[1],spoken:g[0],options:opts,answer:g[0],hint:q===4?"Choose a greeting.":`Look at the ${g[1]} clue.`};
  });
}
export const phaseName=(level:number)=>level<=7?"Phase 1 · Alphabet":level<=14?"Phases 1–2 · Letters and words":"All phases · First communication";
