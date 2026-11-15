/** Generate the launcher's exact course outlines from the playable classic roads. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),bindings={};
for(const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)){
 const module=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));
 for(const item of match[1].split(',')){const [name,local=name]=item.trim().split(/\s+as\s+/);bindings[local]=module[name];}
}
const code=source.replace(/^import\s+[^\n]+\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(path.join(root,'assets/game.js')).href));
const cutoff=code.indexOf('var Y=n=>document.getElementById(n)');if(cutoff<0)throw Error('Classic core boundary missing');
const noop=()=>{};
const context={...bindings,document:{querySelectorAll:()=>[],body:{children:[]},createElement:()=>({style:{},getContext:()=>null})},window:{addEventListener:noop},navigator:{userAgent:''},console:{log:noop,warn:noop,error:noop},URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,AbortController};
context.globalThis=context;vm.createContext(context);vm.runInContext(code.slice(0,cutoff)+';globalThis.routes={tracks:hn,Kc};',context,{timeout:30000});
const atlas={};
for(const def of context.routes.tracks){
 const route=context.routes.Kc(def.id),points=Array.from({length:129},(_,i)=>route.sample(route.length*i/128,{}));
 if(points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.z)))throw Error('Invalid road '+def.id);
 const xs=points.map(p=>p.x),zs=points.map(p=>p.z),minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs);
 const scale=Math.min(212/Math.max(1,maxX-minX),112/Math.max(1,maxZ-minZ)),ox=(240-(maxX-minX)*scale)/2,oy=(140-(maxZ-minZ)*scale)/2;
 atlas[def.id]={name:def.name,length:Math.round(route.length),viewBox:'0 0 240 140',path:points.map((p,i)=>`${i?'L':'M'}${(ox+(p.x-minX)*scale).toFixed(1)},${(oy+(p.z-minZ)*scale).toFixed(1)}`).join(' ')};
}
const output=path.join(root,'assets/classic-route-atlas.json'),contents=JSON.stringify(atlas)+'\n';
if(process.argv.includes('--check')){if(fs.readFileSync(output,'utf8')!==contents)throw Error('Course atlas is stale; run node tools/build-classic-atlas.mjs');}else fs.writeFileSync(output,contents);
console.log(`Classic course atlas: ${Object.keys(atlas).length} exact road outlines (${Buffer.byteLength(contents)} bytes)`);
