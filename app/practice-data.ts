export type PracticeItem={id:string;skill:"Letters"|"Sounds"|"Words"|"Build"|"Listening";prompt:string;spoken?:string;visual:string;options:string[];answer:string;hint:string};
export const practiceItems:PracticeItem[]=[
{id:"letter-b",skill:"Letters",prompt:"Tap the letter ب",visual:"🦆",options:["ت","ب","ث"],answer:"ب",hint:"ب has one dot below."},
{id:"letter-sh",skill:"Letters",prompt:"Which letter has three dots above?",visual:"☀️",options:["س","ش","ص"],answer:"ش",hint:"Look above the letter."},
{id:"sound-m",skill:"Sounds",prompt:"Hear the sound. Tap the letter.",spoken:"م",visual:"👂",options:["ن","م","ل"],answer:"م",hint:"م begins مَوْز."},
{id:"sound-q",skill:"Sounds",prompt:"Hear the sound. Tap the letter.",spoken:"ق",visual:"👂",options:["ف","ك","ق"],answer:"ق",hint:"ق has two dots above."},
{id:"word-fish",skill:"Words",prompt:"Tap the word for the picture.",visual:"🐟",options:["سَمَك","قَمَر","كِتَاب"],answer:"سَمَك",hint:"It begins with س."},
{id:"word-moon",skill:"Words",prompt:"Tap the word for the picture.",visual:"🌙",options:["شَمْس","قَمَر","مَوْز"],answer:"قَمَر",hint:"It begins with ق."},
{id:"build-book",skill:"Build",prompt:"Choose the letters that make كِتَاب.",visual:"📘",options:["ك ت ا ب","ق ت ا ب","ك د ا ب"],answer:"ك ت ا ب",hint:"Book begins with ك."},
{id:"build-fish",skill:"Build",prompt:"Choose the letters that make سَمَك.",visual:"🐟",options:["س م ك","ش م ك","س ن ك"],answer:"س م ك",hint:"Fish begins with س."},
{id:"listen-hello",skill:"Listening",prompt:"Listen. What did Nooru say?",spoken:"أهلاً",visual:"👋",options:["أَهْلًا","شُكْرًا","مَعَ السَّلَامَة"],answer:"أَهْلًا",hint:"It is a greeting."},
{id:"listen-thanks",skill:"Listening",prompt:"Listen. What did Nooru say?",spoken:"شكراً",visual:"💛",options:["أَهْلًا","شُكْرًا","اِسْمِي"],answer:"شُكْرًا",hint:"We say it after someone helps."},
];
