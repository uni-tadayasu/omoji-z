import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from '../assets/remake/vendor/three.module.min.js';
import {SALOON_MODEL,parseSaloonGLB,createSaloonModelLoader} from '../assets/saloon-model.js';
const file=new URL('../assets/models/grand-saloon.glb',import.meta.url),bytes=fs.readFileSync(file);
const response=()=>({ok:true,headers:new Headers({'content-length':String(bytes.length)}),arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)});
const image=()=>({width:4096,height:4096,closed:0,close(){this.closed++;}});
const parsed=parseSaloonGLB(bytes);
assert.equal(bytes.length,SALOON_MODEL.bytes);assert.equal(parsed.metadata.vertices,344326);assert.equal(parsed.metadata.triangles,551070);
assert.equal(parsed.positions.length,344326*3);assert.equal(parsed.normals.length,parsed.positions.length);assert.equal(parsed.uv.length,344326*2);assert.equal(parsed.indices.length,1653210);
assert.equal(parsed.images.baseColor.mimeType,'image/jpeg');assert.equal(parsed.images.normal.mimeType,'image/png');assert.equal(parsed.images.roughnessMetalness.mimeType,'image/jpeg');
const broken=Buffer.from(bytes);broken.writeUInt32LE(bytes.length-4,8);assert.throws(()=>parseSaloonGLB(broken),/Truncated GLB/);
const nan=Buffer.from(bytes);const jsonLength=nan.readUInt32LE(12);const json=JSON.parse(nan.subarray(20,20+jsonLength));const bin=20+jsonLength+8;nan.writeFloatLE(NaN,bin+(json.bufferViews[0].byteOffset??0));assert.throws(()=>parseSaloonGLB(nan),/Non-finite/);

let downloads=0;const images=[];const progress=[];
const loader=createSaloonModelLoader(THREE,{fetch:async()=>{downloads++;return response();},decodeImage:async()=>{const value=image();images.push(value);return value;}});
assert.equal(loader.state,'idle');assert.equal(loader.createModel({id:SALOON_MODEL.id}),null);
const [one,two]=await Promise.all([loader.load({onProgress:value=>progress.push(value.phase)}),loader.load()]);
assert.equal(downloads,1);assert.equal(one,two);assert.equal(loader.state,'ready');assert.deepEqual(progress,['textures','ready']);
await loader.load();assert.equal(downloads,1,'Cached model does not download again');
assert.equal(loader.createModel({id:'hachi'}),null,'Only Grand Saloon receives uploaded model');
const vehicle={id:SALOON_MODEL.id,code:'OZ-L02',dimensions:[5.419,1.956,1.555],paint:'#ff0000'};
const first=loader.createModel(vehicle),second=loader.createModel(vehicle),mesh=first.children[0].children[0],other=second.children[0].children[0];
assert.equal(first.userData.importedQuality,'original-glb');assert.equal(first.userData.omojiBodyGroup,undefined,'Generic damage/paint overlays must not target uploaded material');
assert.deepEqual(first.userData.wheels,[]);first.userData.animate({steering:1,speed:100,dt:1});
assert.equal(mesh.geometry.attributes.position.count,344326);assert.equal(mesh.geometry.index.count,1653210);
assert.deepEqual(mesh.geometry.attributes.position.array,parsed.positions);assert.deepEqual(mesh.geometry.attributes.normal.array,parsed.normals);assert.deepEqual(mesh.geometry.attributes.uv.array,parsed.uv);assert.deepEqual(mesh.geometry.index.array,parsed.indices);
assert.notEqual(mesh.geometry,other.geometry);assert.notEqual(mesh.material,other.material);assert.equal(mesh.material.map,other.material.map);
assert.equal(mesh.material.roughness,1);assert.equal(mesh.material.metalness,1);assert.equal(mesh.material.map.colorSpace,THREE.SRGBColorSpace);assert.equal(mesh.material.normalMap.colorSpace,'');assert.equal(mesh.material.map.flipY,false);assert.equal(mesh.material.map.wrapS,THREE.RepeatWrapping);assert.equal(mesh.material.normalMap.image.width,4096);assert.equal(mesh.material.roughnessMap,mesh.material.metalnessMap);assert.equal(mesh.material.color.getHex(),0xffffff,'Player paint must not recolor the supplied texture');
first.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(first),size=bounds.getSize(new THREE.Vector3());
assert.ok(Math.abs(size.z-5.419)<1e-6);assert.ok(Math.abs(bounds.min.y)<1e-6);assert.ok(Math.abs(bounds.min.x+bounds.max.x)<1e-6);assert.ok(Math.abs(size.x/size.z-parsed.metadata.width/parsed.metadata.length)<1e-8);
mesh.geometry.dispose();mesh.material.dispose();const third=loader.createModel(vehicle);assert.equal(third.children[0].children[0].geometry.attributes.position.count,344326,'Disposing an instance cannot damage the template');assert(images.every(value=>value.closed===0));
loader.dispose();assert.equal(loader.state,'idle');assert(images.every(value=>value.closed===1));assert.equal(loader.createModel(vehicle),null);

// A checksum error never reaches texture decoding and may be retried.
let attempts=0,decoded=0;const bad=Buffer.from(bytes);bad[100]^=1;
const retry=createSaloonModelLoader(THREE,{fetch:async()=>{attempts++;return attempts===1?{ok:true,arrayBuffer:async()=>bad}:response();},decodeImage:async()=>{decoded++;return image();}});
await assert.rejects(retry.load(),/checksum/);assert.equal(retry.state,'error');assert.equal(decoded,0);await retry.load();assert.equal(retry.state,'ready');assert.equal(attempts,2);retry.dispose();

// Failed decoding releases already-created textures, then a retry creates a fresh template.
const failImages=[];let count=0;
const fail=createSaloonModelLoader(THREE,{fetch:async()=>response(),decodeImage:async()=>{if(++count===2)throw Error('decode');const value=image();failImages.push(value);return value;}});
await assert.rejects(fail.load(),/decode/);assert.equal(failImages[0].closed,1);await fail.load();assert.equal(fail.state,'ready');fail.dispose();assert(failImages.every(value=>value.closed===1));

// Cancelling one screen stops its progress subscription, without interrupting another consumer.
let finishFetch,sharedSignal;const shared=createSaloonModelLoader(THREE,{fetch:(_url,{signal})=>{sharedSignal=signal;return new Promise(resolve=>{finishFetch=resolve;});},decodeImage:async()=>image()});
const cancel=new AbortController(),events=[];const cancelled=shared.load({signal:cancel.signal,onProgress:value=>events.push(value)});const remaining=shared.load();cancel.abort();await assert.rejects(cancelled,{name:'AbortError'});assert.equal(sharedSignal.aborted,false,'An active second consumer keeps the network request alive');finishFetch(response());await remaining;assert.equal(events.length,0);assert.equal(shared.state,'ready');shared.dispose();

// The last cancelled consumer aborts the real transfer; a fresh caller retries immediately.
let actualSignal,networkRequests=0;
const cancellable=createSaloonModelLoader(THREE,{fetch:async(_url,{signal})=>{
  actualSignal=signal;networkRequests++;
  if(networkRequests===1)return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));
  return response();
},decodeImage:async()=>image()});
const last=new AbortController(),lastRequest=cancellable.load({signal:last.signal});last.abort();
await assert.rejects(lastRequest,{name:'AbortError'});assert(actualSignal.aborted,'Final cancellation must stop network IO');assert.equal(cancellable.state,'idle');
await cancellable.load();assert.equal(networkRequests,2);assert.equal(cancellable.state,'ready');cancellable.dispose();

// A stalled fetch is aborted by timeout; disposal aborts an in-flight transfer too.
const waiting=(_url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));
const timeout=createSaloonModelLoader(THREE,{fetch:waiting,timeoutMs:5});await assert.rejects(timeout.load(),{name:'AbortError'});assert.equal(timeout.state,'error');timeout.dispose();
const disposed=createSaloonModelLoader(THREE,{fetch:waiting});const abandoned=disposed.load();disposed.dispose();await assert.rejects(abandoned,{name:'AbortError'});assert.equal(disposed.state,'idle');
console.log('Grand Saloon model: original GLB integrity, 344326 vertices/551070 triangles, unchanged UV/normals/PBR, uniform normalization, isolated clones, shared loading, retries, decoding cleanup, cancellation and timeout passed.');
