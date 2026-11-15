import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import{fileURLToPath,pathToFileURL}from'node:url';import{createHash}from'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),source=fs.readFileSync(root+'/assets/game.js','utf8'),bindings={};
for(const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)){const m=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));for(const item of match[1].split(',')){const[a,b=a]=item.trim().split(/\s+as\s+/);bindings[b]=m[a];}}
const core=source.replace(/^import\s+[^\n]+\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(root+'/assets/game.js').href));const noop=()=>{};
const context={...bindings,document:{querySelectorAll:()=>[],body:{children:[]},createElement:()=>({style:{},getContext:()=>null})},window:{addEventListener:noop},navigator:{userAgent:''},console,URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,AbortController};context.globalThis=context;vm.createContext(context);
vm.runInContext(core.slice(0,core.indexOf('var Y=n=>document.getElementById(n)'))+';globalThis.api={fr,ra,Tn,omojiGetSaloonLoader,omojiApplyCarAppearance};',context,{timeout:30000});
const api=context.api,target=api.Tn.find(x=>x.id==='rolls-royce-operator');assert(target.operatorOnly);const original=fs.readFileSync(root+'/assets/models/grand-saloon.glb');
const fetchBefore=globalThis.fetch,bitmapBefore=globalThis.createImageBitmap;let fetches=0;
globalThis.fetch=async()=>{fetches++;return new Response(original)};globalThis.createImageBitmap=async()=>({width:4096,height:4096,close(){}});
try{
 const loader=api.omojiGetSaloonLoader();await loader.load();assert.equal(fetches,1);
 const model=api.fr(target,{quality:'high'}),mesh=model.children[0].children[0];
 assert.equal(model.userData.importedQuality,'original-glb');assert.equal(mesh.geometry.attributes.position.count,344326);assert.equal(mesh.geometry.index.count,1653210);
 assert.equal(mesh.material.map.colorSpace,'srgb');assert.equal(mesh.material.normalMap.colorSpace,'');assert.equal(mesh.material.roughnessMap,mesh.material.metalnessMap);
 const before=Array.from(mesh.geometry.attributes.position.array.slice(0,30));api.omojiApplyCarAppearance(model,999999);assert.deepEqual(Array.from(mesh.geometry.attributes.position.array.slice(0,30)),before);
 const same=api.fr({...target,paint:'#ff0000'},{color:'#00ff00',quality:'low'});assert.equal(same.children[0].children[0].material.color.getHex(),0xffffff,'Original textured finish is not tinted by old paints');
 const generated=api.fr(api.Tn.find(x=>x.id==='hachi'),{quality:'low'});assert.notEqual(generated.userData.importedQuality,'original-glb');
 const cpuFallback=api.fr(target,{software:true,quality:'low'});assert.notEqual(cpuFallback.userData.importedQuality,'original-glb','CPU raw-geometry path never rasterizes 551k textured triangles');
 for(const item of [model,same,generated,cpuFallback])api.ra(item);
 const again=api.fr(target);assert.equal(again.userData.importedQuality,'original-glb');api.ra(again);assert.equal(loader.state,'ready');loader.dispose();
}finally{globalThis.fetch=fetchBefore;globalThis.createImageBitmap=bitmapBefore;}
const atlas=JSON.parse(fs.readFileSync(root+'/assets/models/saloon-sprites.json','utf8'));
assert.equal(atlas.sourceSha256,createHash('sha256').update(original).digest('hex'));assert.equal(atlas.frames.length,24);assert(atlas.nativeWidth>0);
for(const frame of atlas.frames){assert(frame.x>=0&&frame.y>=0&&frame.x+frame.width<=atlas.imageWidth&&frame.y+frame.height<=atlas.imageHeight);assert(frame.contactY>0&&frame.contactY<frame.height);assert(frame.bounds[0]>0&&frame.bounds[1]>0&&frame.bounds[2]<frame.width-1&&frame.bounds[3]<frame.height-1,'Rendered car must fit without cropping');}
assert.equal(atlas.frames[0].angle,0);assert(Math.abs(atlas.frames[12].angle-Math.PI)<1e-6);
console.log('Saloon integration: actual bundled Three classes, exact full mesh/PBR, only operator target replaced, original finish, race disposal/reuse, CPU bypass and 24 exact-model sprite bounds passed.');
