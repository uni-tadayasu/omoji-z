#!/usr/bin/env node
/** Export playable catalog and measured route geometry for static documentation. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'assets/game.js'),'utf8');
const imports={};
for(const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)) {
 const module=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));
 for(const item of match[1].split(',')) {const [name,local=name]=item.trim().split(/\s+as\s+/);imports[local]=module[name];}
}
for(const match of source.matchAll(/^import\s+([\w$]+)\s+from\s+['"]([^'"]+)['"];?/gm)) {
 const module=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));imports[match[1]]=module.default;
}
const core=source.replace(/^import\s+[^\n]+\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(path.join(root,'assets/game.js')).href));
const cutoff=core.indexOf('var Y=n=>document.getElementById(n)');
if(cutoff<0)throw Error('Cannot find the game core/UI boundary.');
const noop=()=>{};
const context={...imports,document:{querySelectorAll:()=>[],body:{children:[]},createElement:()=>({style:{},getContext:()=>null})},window:{addEventListener:noop},navigator:{userAgent:''},console:{log:noop,warn:noop,error:noop},URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,AbortController};
context.globalThis=context;vm.createContext(context);
vm.runInContext(core.slice(0,cutoff)+';globalThis.catalogCore={cars:Tn,tracks:hn,Kc};',context,{timeout:30000});
const game=context.catalogCore;
const {vehicleCatalog}=await import(pathToFileURL(path.join(root,'assets/vehicles.js')));
const visualModule=await import(pathToFileURL(path.join(root,'assets/vehicle-design.js')));
const balanceFile=path.join(root,'assets/balance.js');
if(!fs.existsSync(balanceFile))throw Error('v3 balance.js must be ready before generating public performance pages.');
const balance=await import(pathToFileURL(balanceFile));
const normalize=balance.balancedBaseStats??balance.normalizeStockCar;
if(typeof normalize!=='function')throw Error('v3 balancedBaseStats export is missing.');
const cars=vehicleCatalog.filter(car=>!car.operatorOnly).map(raw=>{
 const car=normalize(raw),visual=visualModule.originalVehicleVisual(car);
 const visualFingerprint=createHash('sha256').update(JSON.stringify([visual.dimensions,visual.profile,visual.cab,visual.axle,visual.wheel])).digest('hex');
 return {...car,visual,visualFingerprint,pp:balance.performancePoints(car),ppClass:balance.classForPP(balance.performancePoints(car))};
});
const finite=(value,label)=>{if(!Number.isFinite(value))throw Error('Non-finite route value '+label);return value;};
const tracks=game.tracks.map(rawTrack=>{
 const track=balance.balancedCourse(rawTrack);
 const road=game.Kc(track.id), points=[],elevations=[],grips=[],geometry=[];
 let totalUp=0,totalDown=0,maxGrade=0,totalTurn=0,previous;
 for(let i=0;i<=256;i++) {
  const distance=road.length*i/256,p=road.sample(distance,{});
  for(const key of ['x','y','z','heading'])finite(p[key],track.id+'.'+key);
  const grip=finite(road.gripAt(distance),track.id+'.grip');grips.push(grip);geometry.push([p.x,p.y,p.z].map(value=>value.toFixed(6)).join(','));
  if(previous) {
   const horizontal=Math.hypot(p.x-previous.x,p.z-previous.z),dy=p.y-previous.y;
   if(dy>0)totalUp+=dy;else totalDown-=dy;
   if(horizontal>.001)maxGrade=Math.max(maxGrade,Math.abs(dy)/horizontal);
   let turn=p.heading-previous.heading;
   while(turn>Math.PI)turn-=Math.PI*2;while(turn< -Math.PI)turn+=Math.PI*2;
   totalTurn+=Math.abs(turn);
  }
  if(i%2===0){points.push([p.x,p.z]);elevations.push(p.y);}
  previous=p;
 }
 const geometryFingerprint=createHash('sha256').update(geometry.join('\n')).digest('hex');
 return {...track,measured:{geometryFingerprint,length:road.length,width:road.width,points,elevations,totalUp,totalDown,maxGrade,totalTurnDegrees:totalTurn*180/Math.PI,minGrip:Math.min(...grips),maxGrip:Math.max(...grips),lowGripShare:grips.filter(value=>value<.9).length/grips.length}};
});
if(cars.length!==512||tracks.length!==256)throw Error('The published catalog must contain 512 cars and 256 stages.');
process.stdout.write(JSON.stringify({version:3,cars,tracks}));
