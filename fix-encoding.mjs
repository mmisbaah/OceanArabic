import fs from "node:fs";
import path from "node:path";
const root="app";
const cp={"€":128,"‚":130,"ƒ":131,"„":132,"…":133,"†":134,"‡":135,"ˆ":136,"‰":137,"Š":138,"‹":139,"Œ":140,"Ž":142,"‘":145,"’":146,"“":147,"”":148,"•":149,"–":150,"—":151,"˜":152,"™":153,"š":154,"›":155,"œ":156,"ž":158,"Ÿ":159};
const bad=/[ØÙðâÂ]/g;
function decodeRun(s){const bytes=[];for(const ch of s){const n=ch.codePointAt(0);if(n<=255)bytes.push(n);else if(cp[ch]!=null)bytes.push(cp[ch]);else return s}const out=new TextDecoder().decode(new Uint8Array(bytes));return (out.match(bad)||[]).length<(s.match(bad)||[]).length&&!out.includes("�")?out:s}
for(const name of fs.readdirSync(root)){if(!/\.(ts|tsx|css)$/.test(name))continue;const file=path.join(root,name),src=fs.readFileSync(file,"utf8");let out=src.replace(/[^\x00-\x7F]+/g,decodeRun);out=out.replace(/[^\x00-\x7F]+/g,decodeRun);fs.writeFileSync(file,out,"utf8")}
