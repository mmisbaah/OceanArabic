import type { QuizQuestion } from "./quiz-data";

type Item={answer:string;visual:string;hint:string;spoken?:string};
type Difficulty="Easy"|"Medium"|"Hard";

const scenes=["Alphabet Beach","Dolphin Dock","Palm Garden","Coral Path","Shell Cove","Lagoon School","Dhoni Harbour","Island Library","Coconut Grove","Sunny Jetty","Turtle Reef","Sandbank Camp","Moonlit Pier","Atoll Classroom","Rainbow Reef","Airport Island","Market Street","Sports Shore","Friendship Ferry","Nooru's Bay"];
const rotate=<T,>(items:T[],amount:number)=>items.map((_,index)=>items[(index+amount)%items.length]);

const banks:Record<Difficulty,[Item[],Item[],Item[]]>={
  Easy:[
    [
      {answer:"أ",visual:"🦁",hint:"The lion word أَسَد begins with this letter."},{answer:"ب",visual:"🦆",hint:"The duck word بَطَّة begins with this letter."},{answer:"ت",visual:"🍎",hint:"The apple word تُفَّاح begins with this letter."},{answer:"ث",visual:"🦊",hint:"The fox word ثَعْلَب begins with this letter."},{answer:"ج",visual:"🐪",hint:"The camel word جَمَل begins with this letter."},{answer:"ح",visual:"🐋",hint:"The whale word حُوت begins with this letter."},{answer:"خ",visual:"🐑",hint:"The sheep word خَرُوف begins with this letter."},{answer:"د",visual:"🐬",hint:"The dolphin word دُلْفِين begins with this letter."},{answer:"ر",visual:"🔴",hint:"The pomegranate word رُمَّان begins with this letter."},{answer:"س",visual:"🐟",hint:"The fish word سَمَك begins with this letter."},{answer:"ش",visual:"☀️",hint:"The sun word شَمْس begins with this letter."},{answer:"ق",visual:"🌙",hint:"The moon word قَمَر begins with this letter."},
    ],
    [
      {answer:"أَسَد",visual:"🦁",hint:"Look for the lion."},{answer:"بَطَّة",visual:"🦆",hint:"Look for the duck."},{answer:"تُفَّاح",visual:"🍎",hint:"Look for the apple."},{answer:"ثَعْلَب",visual:"🦊",hint:"Look for the fox."},{answer:"جَمَل",visual:"🐪",hint:"Look for the camel."},{answer:"حُوت",visual:"🐋",hint:"Look for the whale."},{answer:"سَمَك",visual:"🐟",hint:"Look for the fish."},{answer:"شَمْس",visual:"☀️",hint:"Look for the sun."},{answer:"قَمَر",visual:"🌙",hint:"Look for the moon."},{answer:"كِتَاب",visual:"📘",hint:"Look for the book."},{answer:"مَوْز",visual:"🍌",hint:"Look for the banana."},{answer:"يَد",visual:"✋",hint:"Look for the hand."},
    ],
    [
      {answer:"أَهْلًا",visual:"👋",hint:"We say this when meeting a friend."},{answer:"مَرْحَبًا",visual:"🙂",hint:"This is a friendly hello."},{answer:"شُكْرًا",visual:"💛",hint:"We say this after someone helps."},{answer:"مَعَ السَّلَامَة",visual:"🚶",hint:"We say this when leaving."},{answer:"السَّلَامُ عَلَيْكُمْ",visual:"🧒🏽🧒🏽",hint:"Choose the Islamic greeting."},{answer:"اِسْمِي",visual:"🙋",hint:"Use this before saying your name."},{answer:"مَا اسْمُكَ؟",visual:"❓",hint:"This asks for a name."},{answer:"نُورُ",visual:"🐬",hint:"This is the mascot's name."},
    ],
  ],
  Medium:[
    [
      {answer:"بـ",visual:"🏠",hint:"ب is joined at the start of بَيْت."},{answer:"ـتـ",visual:"📘",hint:"ت appears in the middle of كِتَاب."},{answer:"ـم",visual:"✏️",hint:"م appears at the end of قَلَم."},{answer:"سـ",visual:"🐟",hint:"س begins سَمَك."},{answer:"ـيـ",visual:"🏠",hint:"ي is in the middle of بَيْت."},{answer:"ـب",visual:"📘",hint:"ب ends كِتَاب."},{answer:"قـ",visual:"✏️",hint:"ق begins قَلَم."},{answer:"ـك",visual:"🐟",hint:"ك ends سَمَك."},
    ],
    [
      {answer:"بَيْت",visual:"🏠",hint:"Join ب + ي + ت."},{answer:"قَلَم",visual:"✏️",hint:"Join ق + ل + م."},{answer:"سَمَك",visual:"🐟",hint:"Join س + م + ك."},{answer:"كِتَاب",visual:"📘",hint:"Join ك + ت + ا + ب."},{answer:"أَنَا",visual:"🙋",hint:"Use this when speaking about yourself."},{answer:"أَنْتَ",visual:"👦",hint:"Use this when speaking to a boy."},{answer:"أَنْتِ",visual:"👧",hint:"Use this when speaking to a girl."},{answer:"هُوَ",visual:"👦",hint:"Use this for he."},{answer:"هِيَ",visual:"👧",hint:"Use this for she."},{answer:"نَحْنُ",visual:"🧒🏽🧒🏽",hint:"Use this for we."},
    ],
    [
      {answer:"المالديف",visual:"🇲🇻",hint:"Our island country."},{answer:"الهند",visual:"🇮🇳",hint:"Match the Indian flag."},{answer:"أمريكا",visual:"🇺🇸",hint:"Match the American flag."},{answer:"أستراليا",visual:"🇦🇺",hint:"Match the Australian flag."},{answer:"ديفيهية",visual:"🏝️",hint:"The language of Maldives."},{answer:"عربية",visual:"🗣️",hint:"The language we are learning."},{answer:"إِسْمِي عَلِيٌّ",visual:"🙂",hint:"This sentence tells a name."},{answer:"مَا اسْمُكَ؟",visual:"❓",hint:"This sentence asks a name."},
    ],
  ],
  Hard:[
    [
      {answer:"مَطَار",visual:"🛫",hint:"Planes arrive and leave here."},{answer:"طَائِرَة",visual:"✈️",hint:"It flies in the sky."},{answer:"تَذْكِرَة",visual:"🎫",hint:"You show this before travelling."},{answer:"حَقِيبَة",visual:"🧳",hint:"You pack clothes in it."},{answer:"أُسَافِرُ",visual:"🧭",hint:"This verb means I travel."},{answer:"إِلَى",visual:"➡️",hint:"This points toward a destination."},{answer:"مَعِي",visual:"🙋",hint:"This means I have it with me."},{answer:"أَيْنَ؟",visual:"❓",hint:"This asks about a place."},
    ],
    [
      {answer:"سَيَّارَة",visual:"🚗",hint:"It travels on a road."},{answer:"دَرَّاجَة",visual:"🚲",hint:"It has two wheels."},{answer:"قَارِب",visual:"🚤",hint:"It travels across the lagoon."},{answer:"سُوق",visual:"🛍️",hint:"People buy things here."},{answer:"مَدْرَسَة",visual:"🏫",hint:"Children learn here."},{answer:"مَسْجِد",visual:"🕌",hint:"People pray here."},{answer:"أَمَامَ",visual:"⬆️",hint:"This means in front of."},{answer:"خَلْفَ",visual:"↩️",hint:"This means behind."},{answer:"فِي",visual:"📍",hint:"This means in."},{answer:"بِالسَّيَّارَةِ",visual:"🚗",hint:"This says by car."},
    ],
    [
      {answer:"مَلْعَب",visual:"🏟️",hint:"Sports are played here."},{answer:"مُدَرِّب",visual:"🧑‍🏫",hint:"This person teaches a team."},{answer:"مِضْرَب",visual:"🏸",hint:"Players hold this in racket sports."},{answer:"بُطُولَة",visual:"🏆",hint:"Teams compete to win this."},{answer:"كُرَةُ القَدَمِ",visual:"⚽",hint:"Players kick the ball."},{answer:"كُرَةُ الطَّاوِلَةِ",visual:"🏓",hint:"This sport uses a table."},{answer:"المُلَاكَمَةُ",visual:"🥊",hint:"Boxers wear gloves."},{answer:"رَفْعُ الأَثْقَالِ",visual:"🏋️",hint:"Athletes lift heavy weights."},
    ],
  ],
};

function availableItems(difficulty:Difficulty,level:number):Item[]{
  const [phase1,phase2,phase3]=banks[difficulty];
  if(level<=7)return phase1;
  if(level<=14)return [...phase1,...phase2];
  return [...phase1,...phase2,...phase3];
}

export function grade1PracticeFor(difficulty:string,level:number):QuizQuestion[]{
  const safeDifficulty=(difficulty in banks?difficulty:"Easy") as Difficulty;
  const pool=availableItems(safeDifficulty,level);
  const route=safeDifficulty==="Easy"?"Starter route":safeDifficulty==="Medium"?"Explorer route":"Champion route";
  const dictationPrompts=["Nooru opens the first sound bubble. Listen and choose.","The dhoni bell plays an Arabic clue. Listen and choose.","A reef shell whispers an Arabic clue. Listen and choose.","The lagoon radio plays a word. Listen and choose.","The final treasure bubble speaks. Listen and choose."];
  const picturePrompts=["Match the first island picture to its Arabic.","A picture card arrives by dhoni. Choose its Arabic.","Match the reef picture to the correct Arabic.","A classroom picture needs its Arabic label.","Choose the Arabic label for the treasure picture."];
  return Array.from({length:5},(_,questionIndex)=>{
    const seed=(level-1)*5+questionIndex;
    const item=pool[(seed*7+level)%pool.length];
    const distractor1=pool[(seed*7+level+Math.max(2,Math.floor(pool.length/3)))%pool.length];
    const distractor2=pool[(seed*7+level+Math.max(4,Math.floor(pool.length*2/3)))%pool.length];
    const type:QuizQuestion["type"]=questionIndex%2===0?"Dictation":"Multiple Choice";
    const options=rotate(Array.from(new Set([item.answer,distractor1.answer,distractor2.answer])),(seed+level)%3);
    while(options.length<3){const candidate=pool[(seed+options.length+3)%pool.length].answer;if(!options.includes(candidate))options.push(candidate)}
    const scene=scenes[level-1];
    return {
      id:`G1-${safeDifficulty}-L${level}-Q${questionIndex+1}`,
      type,
      prompt:`${scene} - ${route}: ${type==="Dictation"?dictationPrompts[questionIndex]:picturePrompts[questionIndex]}`,
      visual:type==="Dictation"?"👂":item.visual,
      spoken:type==="Dictation"?(item.spoken||item.answer):undefined,
      options,
      answer:item.answer,
      hint:item.hint,
    };
  });
}

export function grade1PracticePhase(difficulty:string,level:number):string{
  const phase=level<=7?"Phase 1":level<=14?"Phases 1–2":"All three phases";
  const focus=difficulty==="Easy"?level<=7?"Letters":level<=14?"Letters and picture words":"Alphabet and first communication":difficulty==="Medium"?level<=7?"Letter forms":level<=14?"Forms, words and pronouns":"Introductions, countries and languages":level<=7?"Travel":level<=14?"Travel, transport and locations":"Complete Grade 1 curriculum";
  return `${phase} · ${focus}`;
}
