import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createSaloonSpriteLoader} from '../assets/saloon-sprites.js';
const data=JSON.parse(fs.readFileSync(new URL('../assets/models/saloon-sprites.json',import.meta.url),'utf8'));
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const ok=()=>({ok:true,json:async()=>data});
function fixture(fetcher=async()=>ok()){
 const images=[],canvases=[];let requests=0;
 const loader=createSaloonSpriteLoader({fetch:(...args)=>{requests++;return fetcher(...args);},
  createImage(){const image={src:'',naturalWidth:data.imageWidth,naturalHeight:data.imageHeight,onload:null,onerror:null};images.push(image);return image;},
  createCanvas(){const canvas={width:0,height:0,getContext:()=>({drawImage(){}})};canvases.push(canvas);return canvas;}});
 return {loader,images,canvases,get requests(){return requests;}};
}
// Cancelling metadata download stops actual fetch and permits an immediate retry.
{
 let signal,count=0;
 const f=fixture(async(_url,options)=>{signal=options.signal;if(++count===1)return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));return ok();});
 const controller=new AbortController(),request=f.loader.load({signal:controller.signal});controller.abort();
 await assert.rejects(request,{name:'AbortError'});assert(signal.aborted);assert.equal(f.loader.state,'idle');
 const retry=f.loader.load();await tick();f.images[0].onload();await retry;assert.equal(f.requests,2);assert.equal(f.loader.state,'ready');f.loader.dispose();
}
// Cancelling while Image is in flight clears its source and does not strand the shared task.
{
 const f=fixture(),controller=new AbortController(),request=f.loader.load({signal:controller.signal});await tick();
 const old=f.images[0],late=old.onload;assert(old.src.endsWith('saloon-sprites.webp'));controller.abort();await assert.rejects(request,{name:'AbortError'});
 assert.equal(old.src,'');assert.equal(old.onload,null);assert.equal(f.loader.state,'idle');
 const retry=f.loader.load();await tick();f.images[1].onload();await retry;late();await tick();assert.equal(f.loader.state,'ready','An old Image event must not clear the new successful request');f.loader.dispose();
}
// One cancelled consumer cannot interrupt another, and cached frames retain their contract.
{
 let signal;const f=fixture(async(_url,options)=>{signal=options.signal;return ok();});
 const cancel=new AbortController(),one=f.loader.load({signal:cancel.signal}),two=f.loader.load();await tick();cancel.abort();await assert.rejects(one,{name:'AbortError'});
 assert.equal(signal.aborted,false);assert(f.images[0].src);f.images[0].onload();await two;assert.equal(f.requests,1);await f.loader.load();assert.equal(f.requests,1);
 const car={id:'rolls-royce-operator'};assert.equal(f.loader.sprite({id:'hachi'}),null);
 const frame=f.loader.sprite(car,0);assert.equal(frame,f.loader.sprite(car,0));assert.equal(frame.nativeWidth,data.nativeWidth);
 for(let i=1;i<8;i++)f.loader.sprite(car,i/24*Math.PI*2);assert.equal(frame.canvas.width,1,'Evicted frames release their backing canvas');
 f.loader.dispose();assert.equal(f.loader.sprite(car),null);assert(f.canvases.every(canvas=>canvas.width===1));
}
// Metadata/image failures and timeouts remain retryable.
{
 const f=fixture();const first=f.loader.load();await tick();f.images[0].onerror();await assert.rejects(first,/unavailable/);assert.equal(f.loader.state,'error');
 const retry=f.loader.load();await tick();f.images[1].onload();await retry;assert.equal(f.loader.state,'ready');f.loader.dispose();
}
{
 let signal;const loader=createSaloonSpriteLoader({timeoutMs:5,fetch:(_url,options)=>{signal=options.signal;return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));}});
 await assert.rejects(loader.load(),{name:'AbortError'});assert(signal.aborted);assert.equal(loader.state,'error');loader.dispose();
}
console.log('Saloon sprites: last-consumer JSON/Image cancellation, immediate retry, stale-event isolation, concurrent consumers, cached frame eviction, errors and timeout passed.');
