#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'assets/game.js'),'utf8');
const match=source.match(/function he\(H,N\)\{[\s\S]*?\}(?=function ne\()/);
assert(match,'Locate the actual P2P telemetry validator after an intentional refactor.');
const fields=['distance','offset','speed','heading','roll','brake','slip'];
const context={t:()=>({length:3200}),i:()=>null,M:'test-track',Ap:fields,
  Jr:(n,min,max)=>Math.max(min,Math.min(max,n)),yr:n=>Number.isFinite(n)&&n>0?n:null};
vm.createContext(context);vm.runInContext(match[0]+';globalThis.validate=he;',context);
const packet={distance:100,offset:0,speed:0,heading:0,roll:0,brake:0,slip:0};
for(const [speed,expected]of [[0,0],[100/3.6,100/3.6],[10000,385/3.6],[-1000,-8.6]]){
  const result=context.validate({...packet,speed},{});assert.equal(result.speed,expected);
}
for(const field of fields){const result=context.validate({...packet,[field]:NaN},{});assert.equal(Object.keys(result).length,0);}
const bounds=context.validate({...packet,distance:99999,offset:999,heading:999},{});
assert.equal(bounds.distance,3200);assert.equal(bounds.offset,240);assert.equal(bounds.heading,25);
console.log('PASS actual P2P telemetry: m/s bounds match 385 km/h, reverse limit, finite fields and track bounds. This is input sanity, not server authentication.');
