export type MiniTask = { prompt:string; options:{label:string; visual:string; correct?:boolean}[]; hint:string };
export type SubLesson = { step:string; title:string; instruction:string; letters:string[]; examples:{letter:string; word:string; visual:string}[]; task:MiniTask };
export type Lesson = { id:number; phase:1|2|3; title:string; arabicTitle:string; focus:string; subLessons:SubLesson[] };

const groups = [
  ["أ ب ت ث","الحروف: أ ب ت ث",[["أ","أَسَد","🦁"],["ب","بَطَّة","🦆"],["ت","تُفَّاح","🍎"],["ث","ثَعْلَب","🦊"]]],
  ["ج ح خ د","الحروف: ج ح خ د",[["ج","جَمَل","🐪"],["ح","حُوت","🐋"],["خ","خَرُوف","🐑"],["د","دَلْفِين","🐬"]]],
  ["ذ ر ز س","الحروف: ذ ر ز س",[["ذ","ذُرَة","🌽"],["ر","رُمَّان","🔴"],["ز","زَهْرَة","🌺"],["س","سَمَك","🐟"]]],
  ["ش ص ض ط","الحروف: ش ص ض ط",[["ش","شَمْس","☀️"],["ص","صَدَفَة","🐚"],["ض","ضِفْدَع","🐸"],["ط","طَائِرَة","✈️"]]],
  ["ظ ع غ ف","الحروف: ظ ع غ ف",[["ظ","ظَرْف","✉️"],["ع","عَيْن","👁️"],["غ","غَيْمَة","☁️"],["ف","فِيل","🐘"]]],
  ["ق ك ل م","الحروف: ق ك ل م",[["ق","قَمَر","🌙"],["ك","كِتَاب","📘"],["ل","لَيْمُون","🍋"],["م","مَوْز","🍌"]]],
  ["ن ه و ي","الحروف: ن ه و ي",[["ن","نَجْمَة","⭐"],["ه","هِلَال","🌙"],["و","وَرْدَة","🌹"],["ي","يَد","✋"]]],
] as const;

const steps = ["Look","Listen","Say","Match","Check"];
function makeSubs(letters:string, examples:readonly (readonly [string,string,string])[]):SubLesson[]{
  return steps.map((step,i)=>{
    const target=examples[i%examples.length];
    const options=[target,examples[(i+1)%examples.length],examples[(i+2)%examples.length]];
    return { step, title:i===0?"Look at the new letters":i===1?"Hear each sound":i===2?"Say it with Nooru":i===3?"Match letter and picture":"Show what you know", instruction:i===0?"Tap each card.":i===1?"Tap 🔊. Listen.":i===2?"Tap 🔊. Say the sound.":i===3?`Tap the picture for ${target[0]}.`:`Find ${target[0]}.`, letters:letters.split(" "), examples:examples.map(x=>({letter:x[0],word:x[1],visual:x[2]})), task:{prompt:`Which one starts with ${target[0]}?`,options:options.map((x,j)=>({label:x[1],visual:x[2],correct:j===0})),hint:`Look for ${target[0]} at the start.`} };
  });
}

export const grade1EasyLessons:Lesson[] = [
  ...groups.map((g,i)=>({id:i+1,phase:(i<3?1:i<6?2:3) as 1|2|3,title:`Letters ${g[0]}`,arabicTitle:g[1],focus:g[0],subLessons:makeSubs(g[0],g[2])})),
  {id:8,phase:3,title:"Hello, friend!",arabicTitle:"السَّلَامُ عَلَيْكُمْ",focus:"Greetings",subLessons:[
    {step:"Look",title:"A friendly greeting",instruction:"Look. Two friends meet.",letters:["السلام عليكم"],examples:[{letter:"👋",word:"السَّلَامُ عَلَيْكُمْ",visual:"👧🏽👦🏽"}],task:{prompt:"Tap the friendly greeting.",options:[{label:"السَّلَامُ عَلَيْكُمْ",visual:"👋",correct:true},{label:"كِتَاب",visual:"📘"},{label:"سَمَك",visual:"🐟"}],hint:"A greeting begins with السَّلام."}},
    {step:"Listen",title:"Hear the greeting",instruction:"Tap 🔊. Listen.",letters:["السلام عليكم"],examples:[{letter:"🔊",word:"السَّلَامُ عَلَيْكُمْ",visual:"👂"}],task:{prompt:"What did you hear?",options:[{label:"السَّلَامُ عَلَيْكُمْ",visual:"👋",correct:true},{label:"شُكْرًا",visual:"💛"},{label:"مَعَ السَّلَامَة",visual:"🚶"}],hint:"It is the greeting for meeting someone."}},
    {step:"Say",title:"Say hello",instruction:"Tap 🔊. Say it.",letters:["السلام عليكم"],examples:[{letter:"🗣️",word:"السَّلَامُ عَلَيْكُمْ",visual:"🐬"}],task:{prompt:"Tap after you say it.",options:[{label:"I said it!",visual:"⭐",correct:true}],hint:"Say it slowly with Nooru."}},
    {step:"Match",title:"Meet and leave",instruction:"Choose what we say when we meet.",letters:["السلام عليكم"],examples:[{letter:"👋",word:"السَّلَامُ عَلَيْكُمْ",visual:"🏝️"}],task:{prompt:"Two friends meet. What do they say?",options:[{label:"السَّلَامُ عَلَيْكُمْ",visual:"👋",correct:true},{label:"مَعَ السَّلَامَة",visual:"🚶"}],hint:"They are meeting, not leaving."}},
    {step:"Check",title:"Greeting check",instruction:"Choose the greeting.",letters:["السلام عليكم"],examples:[{letter:"⭐",word:"أَحْسَنْتَ!",visual:"🏆"}],task:{prompt:"Which card says hello?",options:[{label:"أَهْلًا",visual:"🙂",correct:true},{label:"مَوْز",visual:"🍌"},{label:"قَمَر",visual:"🌙"}],hint:"أَهْلًا means hello."}},
  ]},
  {id:9,phase:3,title:"My name",arabicTitle:"اِسْمِي…",focus:"Introduce yourself",subLessons:[
    {step:"Look",title:"Say your name",instruction:"Look. Nooru says a name.",letters:["اسمي"],examples:[{letter:"اِسْمِي",word:"اِسْمِي نُورُ",visual:"🐬"}],task:{prompt:"Which card means ‘My name is Nooru’ ?",options:[{label:"اِسْمِي نُورُ",visual:"🐬",correct:true},{label:"شُكْرًا",visual:"💛"}],hint:"Look for اِسْمِي."}},
    {step:"Listen",title:"Hear the name",instruction:"Tap 🔊. Listen.",letters:["اسمي نور"],examples:[{letter:"🔊",word:"اِسْمِي نُورُ",visual:"👂"}],task:{prompt:"What did Nooru say?",options:[{label:"اِسْمِي نُورُ",visual:"🐬",correct:true},{label:"مَعَ السَّلَامَة",visual:"🚶"}],hint:"Nooru is saying a name."}},
    {step:"Say",title:"Your turn",instruction:"Say: اِسْمِي …",letters:["اسمي"],examples:[{letter:"🗣️",word:"اِسْمِي …",visual:"🙂"}],task:{prompt:"Tap when you say your name.",options:[{label:"I said my name!",visual:"⭐",correct:true}],hint:"Say اِسْمِي, then your name."}},
    {step:"Match",title:"Name or thanks?",instruction:"Find ‘My name’. ",letters:["اسمي"],examples:[{letter:"اِسْمِي",word:"My name",visual:"👧"}],task:{prompt:"Tap اِسْمِي.",options:[{label:"اِسْمِي",visual:"👧",correct:true},{label:"شُكْرًا",visual:"💛"},{label:"أَهْلًا",visual:"👋"}],hint:"It begins with اِسْ."}},
    {step:"Check",title:"First dialogue",instruction:"Complete the answer.",letters:["ما اسمك؟","اسمي"],examples:[{letter:"؟",word:"مَا اسْمُكَ؟",visual:"👦"},{letter:"✓",word:"اِسْمِي …",visual:"👧"}],task:{prompt:"مَا اسْمُكَ؟",options:[{label:"اِسْمِي …",visual:"🙂",correct:true},{label:"قَمَر",visual:"🌙"}],hint:"Answer with اِسْمِي."}},
  ]},
];
