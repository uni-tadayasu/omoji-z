#!/usr/bin/env node
/**
 * Render the actual game model and procedural road renderer in Node.
 * Optional development dependency: npm install --no-save @napi-rs/canvas@0.1.100
 * Example: node tools/render-preview.mjs --output assets/art/hero-v3.webp
 * Extra QA samples: --samples /absolute/output/directory
 * No browser screenshot, external photograph, or substitute vehicle illustration is used.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let createCanvas,ImageData,Image;
try {({createCanvas,ImageData,Image}=require('@napi-rs/canvas'));}
catch {throw Error('Preview rendering needs @napi-rs/canvas@0.1.100. The browser game itself has no npm dependency.');}
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const argument=(name,fallback)=>{const index=process.argv.indexOf(name);return index<0?fallback:process.argv[index+1];};
const output=path.resolve(root,argument('--output','assets/art/hero-v3.webp'));
const samples=argument('--samples',null);
const source=fs.readFileSync(path.join(root,'assets/game.js'),'utf8'),imports={};
for(const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));
    for(const item of match[1].split(',')) {const [exported,local=exported]=item.trim().split(/\s+as\s+/);imports[local]=module[exported];}
}
const core=source.replace(/^import\s+[^\n]+\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(path.join(root,'assets/game.js')).href));
const cutoff=core.indexOf('var Y=n=>document.getElementById(n)');
if(cutoff<0)throw Error('Core/UI boundary not found; update this preview helper after an intentional refactor.');
const noop=()=>{},newCanvas=()=>{const canvas=createCanvas(1,1);canvas.style={};return canvas;};
const imageLoads=[];
class AssetImage {
    constructor(){
        const image=new Image(),native=Object.getOwnPropertyDescriptor(Image.prototype,'src');
        Object.defineProperty(image,'src',{get:()=>native.get.call(image),set:value=>{
            let finish;imageLoads.push(new Promise(resolve=>{finish=resolve}));
            const loaded=image.onload,failed=image.onerror;
            image.onload=(...args)=>{try{loaded?.(...args)}finally{finish()}};
            image.onerror=(...args)=>{try{failed?.(...args)}finally{finish()}};
            try{
                const file=String(value).startsWith('file:')?fileURLToPath(value):path.resolve(root,value);
                if(!file.startsWith(root+path.sep))throw Error('Image reference leaves checkout');
                native.set.call(image,fs.readFileSync(file));
            }catch(error){image.onerror?.(error);}
        }});
        return image;
    }
}
const context={...imports,document:{querySelectorAll:()=>[],body:{children:[]},createElement:()=>newCanvas()},window:{addEventListener:noop},navigator:{userAgent:''},console,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,AbortController,ImageData,Image:AssetImage,OffscreenCanvas:class{constructor(w,h){return createCanvas(w,h)}}};
context.globalThis=context;vm.createContext(context);
vm.runInContext(core.slice(0,cutoff)+';globalThis.__preview={cars:Tn,tracks:hn,Kc,fr,ra,ax,ix,th,Zt,B,Tt,ch,omojiCameraFraming};',context,{timeout:30000});
const api=context.__preview;
async function renderRoad(trackId,distance,width,height,lane=0) {
    const route=api.Kc(trackId),canvas=createCanvas(width,height),renderer=new api.th(canvas);
    canvas.clientWidth=width;canvas.clientHeight=height;
    renderer.setWorld(route);renderer.setSize(width,height);
    await Promise.all(imageLoads);
    if(renderer.panorama?.ready)renderer.panorama.since=performance.now()-1000;
    const stats=api.cars.find(car=>car.originalDesignFamily==='sport'&&!car.operatorOnly);
    const mesh=api.fr(stats,{quality:'medium',beam:route.track.dark}),shadow=new api.Tt,point={};
    const player={stats,distance,offset:lane*route.width,heading:0,pitch:0,roll:0,steering:0,brake:0,throttle:.6,speed:25,nitroActive:false};
    api.ch.prototype.updateCar.call({rendererMode:'software',world:route},mesh,shadow,player,1/60,point);
    const frame=api.omojiCameraFraming(width,height,width<700,'normal',25,false,0,stats.dimensions[0]);
    const camera=new api.Zt(frame.fov,width/height,.1,2000);
    camera.position.set(mesh.position.x-Math.sin(point.heading)*frame.distance,mesh.position.y+frame.height,mesh.position.z+Math.cos(point.heading)*frame.distance);
    const ahead=route.sample(distance+19,{});camera.lookAt(new api.B(ahead.x,mesh.position.y+.92,ahead.z));
    const state={camera,player,playerCar:mesh,rival:null,opponents:new Map,cameraMode:0,status:'running',renderStep:0,effects:{items:[]}};
    const start=performance.now();renderer.renderGame(state);const coldMs=performance.now()-start;
    const warm=performance.now();renderer.renderGame(state);const warmMs=performance.now()-warm;
    api.ra(mesh);renderer.dispose();
    return {canvas,track:trackId,distance,width,height,carCode:stats.code,panorama:renderer.panoramaName,panoramaReady:!!renderer.panorama?.ready,mode:'actual game software renderer',coldMs:Math.round(coldMs),warmMs:Math.round(warmMs)};
}
const hero=await renderRoad(argument('--track','shiosaki'),Number(argument('--distance','700')),2400,900,-.175);
const crop=createCanvas(1600,900);crop.getContext('2d').drawImage(hero.canvas,0,0);hero.canvas=crop;hero.width=1600;hero.height=900;hero.composition='Left crop of a 2400 px game viewport; car on the right half';
fs.mkdirSync(path.dirname(output),{recursive:true});
if(!hero.panoramaReady&&!process.argv.includes('--allow-fallback'))throw Error('Hero panorama was not loaded; supply the four original sky-v3 images or use --allow-fallback for QA.');
let encoded;for(const quality of [76,68,60,52,44]){encoded=hero.canvas.toBuffer('image/webp',quality);if(encoded.length<96000)break;}
fs.writeFileSync(output,encoded);
const {canvas,coldMs,warmMs,...metadata}=hero;
fs.writeFileSync(output.replace(/\.[^.]+$/,'.json'),JSON.stringify({...metadata,source:'assets/game.js + assets/vehicles.js + assets/classic-visuals.js',rendererVersion:'classic-remaster-v1',externalReferences:false,originalGeneratedBackdrop:'assets/art/sky-v3-'+metadata.panorama+'.webp',originalGeneratedFoliage:'assets/art/foliage-v3.webp'},null,2)+'\n');
if(samples) {
    const directory=path.resolve(samples);fs.mkdirSync(directory,{recursive:true});
    const metrics=[];
    for(const [track,distance]of [['haruna',600],['shiramine',700],['shiosaki',700],['kirisawa',700]])for(const [width,height]of [[1440,810],[390,844]]) {
        const sample=await renderRoad(track,distance,width,height);fs.writeFileSync(path.join(directory,`${track}-${width}.png`),sample.canvas.toBuffer('image/png'));
        const {canvas,...meta}=sample;metrics.push(meta);
    }
    for(const family of ['compact','fastback','tourer','executive','sport','estate','utility','van']) {
        const car=api.cars.find(car=>car.originalDesignFamily===family);
        for(const [angleName,angle]of [['front',.56],['rear',2.62]]) {
            const raster=api.ax(api.ix(car,car.paint,'garage',0,true),angle,'garage',false,.24,true);
            fs.writeFileSync(path.join(directory,`${family}-${angleName}.png`),raster.canvas.toBuffer('image/png'));
        }
    }
    fs.writeFileSync(path.join(directory,'render-metrics.json'),JSON.stringify(metrics,null,2)+'\n');
}
console.log(JSON.stringify({output,bytes:fs.statSync(output).size,coldMs,warmMs,...metadata}));
