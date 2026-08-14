import { grade1EasyLessons, type Lesson, type SubLesson } from "./grade1-easy";

type Card = readonly [letter:string, word:string, visual:string];

const steps = ["Look", "Listen", "Say", "Match", "Check"] as const;

export function lesson(
  id:number,
  phase:1|2|3,
  title:string,
  arabicTitle:string,
  focus:string,
  cards:readonly Card[],
):Lesson {
  const subLessons:SubLesson[] = steps.map((step,index)=>{
    const target=cards[index%cards.length];
    const distractorA=cards[(index+1)%cards.length];
    const distractorB=cards[(index+2)%cards.length];
    const titles=[`See ${focus}`,`Hear ${focus}`,`Say ${focus}`,`Match ${focus}`,`Check ${focus}`];
    const instructions=["Look at each picture and Arabic word.","Tap a card and listen carefully.","Listen, then say the Arabic aloud.","Match the picture to the correct Arabic.","Choose the best answer by yourself."];
    return {
      step,
      title:titles[index],
      instruction:instructions[index],
      letters:cards.map(card=>card[0]),
      examples:cards.map(card=>({letter:card[0],word:card[1],visual:card[2]})),
      task:{
        prompt:index===0?`Find ${target[1]}.`:index===1?"Which word did Nooru say?":index===2?`Which card says ${target[1]}?`:index===3?`Match ${target[2]} to its Arabic word.`:`Complete the ${focus} check.`,
        options:[
          {label:distractorA[1],visual:distractorA[2]},
          {label:target[1],visual:target[2],correct:true},
          {label:distractorB[1],visual:distractorB[2]},
        ],
        hint:`Look for the ${target[2]} picture and the word ${target[1]}.`,
      },
    };
  });
  return {id,phase,title,arabicTitle,focus,subLessons};
}

export const grade1MediumLessons:Lesson[] = [
  lesson(1,1,"Letters at the start","الحُرُوفُ فِي أَوَّلِ الكَلِمَةِ","initial letter forms",[["بـ","بَيْت","🏠"],["تـ","تُفَّاح","🍎"],["جـ","جَمَل","🐪"],["سـ","سَمَك","🐟"]]),
  lesson(2,1,"Letters in the middle","الحُرُوفُ فِي وَسَطِ الكَلِمَةِ","middle letter forms",[["ـتـ","كِتَاب","📘"],["ـمـ","سَمَك","🐟"],["ـلـ","قَلَم","✏️"],["ـيـ","بَيْت","🏠"]]),
  lesson(3,1,"Letters at the end","الحُرُوفُ فِي آخِرِ الكَلِمَةِ","final letter forms",[["ـب","كِتَاب","📘"],["ـت","بَيْت","🏠"],["ـم","قَلَم","✏️"],["ـك","سَمَك","🐟"]]),
  lesson(4,2,"Join the letters","وَصْلُ الحُرُوفِ","joining letters",[["ب + ي + ت","بَيْت","🏠"],["ق + ل + م","قَلَم","✏️"],["س + م + ك","سَمَك","🐟"],["ك + ت + ا + ب","كِتَاب","📘"]]),
  lesson(5,2,"Words for me and you","أَنَا وَأَنْتَ وَأَنْتِ","personal pronouns",[["أَنَا","أَنَا طَالِبٌ","🙋"],["أَنْتَ","أَنْتَ طَالِبٌ","👦"],["أَنْتِ","أَنْتِ طَالِبَةٌ","👧"],["نَحْنُ","نَحْنُ أَصْدِقَاءُ","🧒🏽🧒🏽"]]),
  lesson(6,2,"He, she and they","هُوَ وَهِيَ وَهُمْ","third-person pronouns",[["هُوَ","هُوَ وَلَدٌ","👦"],["هِيَ","هِيَ بِنْتٌ","👧"],["هُمَا","هُمَا صَدِيقَانِ","🧒🏽🧒🏽"],["هُمْ","هُمْ طُلَّابٌ","👨‍👩‍👧"]]),
  lesson(7,3,"Meet a new friend","حِوَارُ التَّعَارُفِ","introduction dialogue",[["مَرْحَبًا","مَرْحَبًا يَا صَدِيقِي","👋"],["مَا اسْمُكَ؟","مَا اسْمُكَ؟","❓"],["اِسْمِي","اِسْمِي عَلِيٌّ","🙂"],["شُكْرًا","شُكْرًا","💛"]]),
  lesson(8,3,"Countries","أَسْمَاءُ البُلْدَانِ","country names",[["المالديف","المالديف","🏝️"],["الهند","الهند","🇮🇳"],["أمريكا","أمريكا","🇺🇸"],["أستراليا","أستراليا","🇦🇺"]]),
  lesson(9,3,"Languages we speak","اللُّغَاتُ","languages and nationality",[["ديفيهية","أَتَكَلَّمُ الدِّيفِيهِيَّةَ","🏝️"],["عربية","أَتَكَلَّمُ العَرَبِيَّةَ","🗣️"],["إنجليزية","أَتَكَلَّمُ الإِنْجِلِيزِيَّةَ","🔤"],["مالديفي","أَنَا مَالْدِيفِيٌّ","🇲🇻"]]),
];

export const grade1HardLessons:Lesson[] = [
  lesson(1,1,"At the airport","فِي المَطَارِ","airport vocabulary",[["مَطَار","هَذَا مَطَارٌ","🛫"],["طَائِرَة","هَذِهِ طَائِرَةٌ","✈️"],["تَذْكِرَة","مَعِي تَذْكِرَةٌ","🎫"],["حَقِيبَة","هَذِهِ حَقِيبَةٌ","🧳"]]),
  lesson(2,1,"A short journey","رِحْلَةٌ قَصِيرَةٌ","travel expressions",[["أَيْنَ؟","أَيْنَ المَطَارُ؟","❓"],["إِلَى","أَذْهَبُ إِلَى المَطَارِ","➡️"],["مَعِي","مَعِي تَذْكِرَةٌ","🎫"],["أُسَافِرُ","أُسَافِرُ بِالطَّائِرَةِ","✈️"]]),
  lesson(3,1,"Ways to travel","وَسَائِلُ المُوَاصَلَاتِ","transport words",[["طَائِرَة","طَائِرَة","✈️"],["سَيَّارَة","سَيَّارَة","🚗"],["دَرَّاجَة","دَرَّاجَة","🚲"],["قَارِب","قَارِب","🚤"]]),
  lesson(4,2,"Places in town","أَمَاكِنُ المَدِينَةِ","town places",[["سُوق","السُّوقُ","🛍️"],["مَدْرَسَة","المَدْرَسَةُ","🏫"],["مَسْجِد","المَسْجِدُ","🕌"],["شُرْطَة","قِسْمُ الشُّرْطَةِ","👮"]]),
  lesson(5,2,"Where is it?","أَيْنَ هُوَ؟","location words",[["أَمَامَ","أَمَامَ المَدْرَسَةِ","⬆️"],["خَلْفَ","خَلْفَ المَسْجِدِ","↩️"],["فِي","فِي السُّوقِ","📍"],["إِلَى","إِلَى المَطَارِ","➡️"]]),
  lesson(6,2,"Ask for the way","حِوَارُ الطَّرِيقِ","transport dialogue",[["أَيْنَ السُّوقُ؟","أَيْنَ السُّوقُ؟","❓"],["أَمَامَكَ","السُّوقُ أَمَامَكَ","⬆️"],["كَيْفَ أَذْهَبُ؟","كَيْفَ أَذْهَبُ؟","🧭"],["بِالسَّيَّارَةِ","أَذْهَبُ بِالسَّيَّارَةِ","🚗"]]),
  lesson(7,3,"Sports words","كَلِمَاتُ الرِّيَاضَةِ","sports vocabulary",[["مَلْعَب","مَلْعَب","🏟️"],["مُدَرِّب","مُدَرِّب","🧑‍🏫"],["مِضْرَب","مِضْرَب","🏸"],["بُطُولَة","بُطُولَة","🏆"]]),
  lesson(8,3,"Which sport?","أَيُّ رِيَاضَةٍ؟","sport names",[["كُرَةُ القَدَمِ","كُرَةُ القَدَمِ","⚽"],["كُرَةُ الطَّاوِلَةِ","كُرَةُ الطَّاوِلَةِ","🏓"],["المُلَاكَمَةُ","المُلَاكَمَةُ","🥊"],["رَفْعُ الأَثْقَالِ","رَفْعُ الأَثْقَالِ","🏋️"]]),
  lesson(9,3,"My Grade 1 conversation","مُرَاجَعَةُ الصَّفِّ الأَوَّلِ","complete Grade 1 dialogue",[["السَّلَامُ عَلَيْكُمْ","السَّلَامُ عَلَيْكُمْ","👋"],["أَنَا مِنَ المَالْدِيفِ","أَنَا مِنَ المَالْدِيفِ","🏝️"],["أَذْهَبُ بِالقَارِبِ","أَذْهَبُ بِالقَارِبِ","🚤"],["أُحِبُّ كُرَةَ القَدَمِ","أُحِبُّ كُرَةَ القَدَمِ","⚽"]]),
];

export function grade1LessonsFor(difficulty:string):Lesson[]{
  if(difficulty==="Medium")return grade1MediumLessons;
  if(difficulty==="Hard")return grade1HardLessons;
  return grade1EasyLessons;
}
