#!/usr/bin/env node
/** CPU structural checks of the real Three.js scenes. This does not claim GPU rendering coverage. */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as THREE from '../assets/remake/vendor/three.module.min.js';
import {GameRenderer,buildVehicle,disposeSceneObject} from '../assets/remake/renderer.js';
import {vehicleCatalog} from '../assets/vehicles.js';
import {TRACKS,createTrack} from '../assets/remake/tracks.js';

// Only image-painting calls are stubbed. Geometry, matrices, materials, bounds, scene graph,
// instances, cameras and disposal all run in the vendored production Three.js library.
const previousDocument=globalThis.document;
let texturePaints=0;
globalThis.document={createElement(tag){assert.equal(tag,'canvas');return {width:0,height:0,getContext(kind){assert.equal(kind,'2d');texturePaints++;return {fillRect(){},strokeRect(){},fillText(){},createRadialGradient(){return {addColorStop(){}};}};}};}};

function geometryFingerprint(object){const hash=createHash('sha256');object.traverse(node=>{if(node.geometry)hash.update(new Uint8Array(node.geometry.attributes.position.array.buffer));});return hash.digest('hex');}
function validateScene(object,label){
  let meshes=0,vertices=0,instances=0;
  object.updateMatrixWorld(true);
  object.traverse(node=>{
    if(!node.isMesh)return;meshes++;const geometry=node.geometry;assert.ok(geometry?.isBufferGeometry,`${label}: buffer geometry`);
    for(const [name,attribute] of Object.entries(geometry.attributes)){assert.ok(attribute.count>0,`${label}: ${name} is populated`);for(const value of attribute.array)assert.ok(Number.isFinite(value),`${label}: finite ${name}`);}
    assert.ok(geometry.attributes.position.count>2,`${label}: drawable geometry`);vertices+=geometry.attributes.position.count;
    if(geometry.index){const max=geometry.attributes.position.count;for(const index of geometry.index.array)assert.ok(index>=0&&index<max,`${label}: valid triangle index`);}
    geometry.computeBoundingBox();geometry.computeBoundingSphere();assert.ok(Number.isFinite(geometry.boundingSphere.radius)&&geometry.boundingSphere.radius>0,`${label}: nonempty bounds`);
    for(const value of node.matrixWorld.elements)assert.ok(Number.isFinite(value),`${label}: finite world transform`);
    if(node.isInstancedMesh){assert.ok(node.count>0);instances+=node.count;for(const value of node.instanceMatrix.array)assert.ok(Number.isFinite(value),`${label}: finite instance transform`);}
    for(const material of Array.isArray(node.material)?node.material:[node.material]){assert.ok(material?.isMaterial,`${label}: production material`);if(material.color)assert.ok([material.color.r,material.color.g,material.color.b].every(Number.isFinite));}
  });
  return {meshes,vertices,instances};
}
function verifyDisposal(object){
  const geometries=new Set(),materials=new Set(),textures=new Set();object.traverse(n=>{if(n.geometry)geometries.add(n.geometry);for(const m of n.material?(Array.isArray(n.material)?n.material:[n.material]):[]){materials.add(m);for(const key of ['map','normalMap','roughnessMap','alphaMap'])if(m[key])textures.add(m[key]);}});
  let geometryCount=0,materialCount=0,textureCount=0;geometries.forEach(g=>g.addEventListener('dispose',()=>geometryCount++));materials.forEach(m=>m.addEventListener('dispose',()=>materialCount++));textures.forEach(t=>t.addEventListener('dispose',()=>textureCount++));disposeSceneObject(object);
  assert.equal(geometryCount,geometries.size,'all geometries disposed exactly once');assert.equal(materialCount,materials.size,'all materials disposed exactly once');assert.equal(textureCount,textures.size,'all image textures disposed exactly once');
}

try{
  const publicCars=vehicleCatalog.filter(car=>!car.operatorOnly);assert.equal(publicCars.length,512);
  const shapes=new Set(),families=new Set();let maxCarMeshes=0;
  for(const car of publicCars){
    const model=buildVehicle(car,undefined,null);const metrics=validateScene(model,car.id);assert.equal(model.userData.wheels.length,4,`${car.id}: four independently animated wheels`);assert.equal(model.userData.wheels.filter(w=>w.front).length,2);
    const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3());assert.ok(size.x>1.5&&size.x<4,`${car.id}: car width bounds`);assert.ok(size.y>1&&size.y<2.5,`${car.id}: car height bounds`);assert.ok(size.z>3&&size.z<8,`${car.id}: car length bounds`);assert.ok(bounds.min.y>=-.04,`${car.id}: no buried chassis`);
    assert.ok(metrics.meshes<=24,`${car.id}: bounded per-car draw calls`);assert.ok(metrics.vertices<16000,`${car.id}: bounded vertex count`);maxCarMeshes=Math.max(maxCarMeshes,metrics.meshes);
    assert.ok(model.children.some(n=>n.material?.transparent&&n.material?.isMeshPhysicalMaterial),`${car.id}: physical glazed cabin`);assert.ok(model.userData.bodyMat.clearcoat===1&&model.userData.bodyMat.metalness>.5,`${car.id}: reflective paint`);
    shapes.add(geometryFingerprint(model));families.add(car.coachwork);verifyDisposal(model);
  }
  assert.ok(shapes.size>=500,`expected varied actual geometry, received ${shapes.size} shapes`);assert.equal(families.size,6);
  const archetypes=new Set();for(const coachwork of families){const model=buildVehicle({dimensions:[4.5,1.9,1.5],coachwork,power:200},'#cad5df',null);archetypes.add(geometryFingerprint(model));verifyDisposal(model);}assert.equal(archetypes.size,families.size,'all six body families change geometry at identical dimensions');

  const renderer=Object.create(GameRenderer.prototype);renderer.scene=new THREE.Scene();renderer.trackGroup=new THREE.Group();renderer.scene.add(renderer.trackGroup);renderer.sun=new THREE.DirectionalLight();renderer.scene.add(renderer.sun,renderer.sun.target);renderer.renderer={toneMappingExposure:1};renderer.environment=null;renderer.opponents=[];
  const trackMetrics=[];
  for(const definition of TRACKS){
    const track=createTrack(definition.id);renderer.setTrack(track);assert.equal(renderer.track,track);const metrics=validateScene(renderer.trackGroup,track.id);assert.ok(metrics.meshes<70,`${track.id}: scenery batches limit draw calls`);assert.ok(metrics.instances>300,`${track.id}: populated instanced scenery`);assert.ok(metrics.vertices<150000,`${track.id}: bounded scenery geometry`);
    const bounds=new THREE.Box3().setFromObject(renderer.trackGroup);assert.ok(bounds.containsPoint(new THREE.Vector3(track.sample(0).x,track.sample(0).y,track.sample(0).z)),`${track.id}: start inside scene`);
    const before=renderer.trackGroup.children.length;renderer.setTrack(track);assert.equal(renderer.trackGroup.children.length,before,'selecting same track does not duplicate scene');trackMetrics.push({id:track.id,...metrics});
  }
  verifyDisposal(renderer.trackGroup);

  // Exercise production garage and race camera paths without invoking a GPU.
  renderer.camera=new THREE.PerspectiveCamera();renderer.lookAt=new THREE.Vector3();renderer.desiredLook=new THREE.Vector3();renderer.desiredPosition=new THREE.Vector3();renderer.garageScene=new THREE.Scene();renderer.garageCar=new THREE.Group();renderer.garageScene.add(renderer.garageCar);renderer.carGroup=new THREE.Group();renderer.scene.add(renderer.carGroup);renderer.clock=0;renderer.renderer.render=(scene,camera)=>{scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);assert.ok(scene.isScene);assert.ok(camera.isPerspectiveCamera);for(const n of camera.matrixWorld.elements)assert.ok(Number.isFinite(n));};
  renderer.setCar(publicCars[0],'#b9c7d8');renderer.setMode('garage');const garageAngles=[];
  for(const camera of ['chase','hood','far']){renderer.setCamera(camera);renderer.render(null,1/60);garageAngles.push(renderer.camera.position.toArray().map(n=>n.toFixed(3)).join(','));}assert.equal(new Set(garageAngles).size,3,'garage camera button changes view');
  renderer.canvas={clientWidth:390,clientHeight:844};renderer.setCamera('chase');renderer.render(null,1/60);assert.equal(renderer.camera.view.enabled,true,'garage uses responsive presentation framing');assert.equal(renderer.camera.view.offsetX,-390*.16);assert.equal(renderer.camera.view.offsetY,844*.19);const mobileDistance=renderer.camera.position.length();
  const focal=new THREE.Vector3(0,.7,0).project(renderer.camera);assert.ok(Math.abs((focal.x*.5+.5)-.66)<.001&&Math.abs((-.5*focal.y+.5)-.31)<.001,'mobile focal point stays above the selection deck');
  renderer.canvas={clientWidth:1440,clientHeight:900};renderer.setCamera('chase');renderer.render(null,1/60);assert.equal(renderer.camera.view.offsetX,-1440*.14);assert.ok(renderer.camera.position.length()<mobileDistance,'portrait framing increases camera distance');
  renderer.setMode('race');assert.equal(renderer.camera.view.enabled,false,'race camera clears garage framing');const point=renderer.track.sample(450),state={...point,yaw:point.heading,distance:450,speed:40,steer:.2,opponents:[]};for(const camera of ['chase','hood','far']){renderer.setCamera(camera);renderer.render(state,1/60);assert.equal(renderer.playerCar.visible,camera!=='hood');const wheelRot=renderer.playerCar.userData.wheels[0].group.rotation.x;renderer.render(state,0);assert.equal(renderer.playerCar.userData.wheels[0].group.rotation.x,wheelRot,'paused renderer does not spin wheels');}
  const paint=renderer.playerCar.userData.bodyMat.color.getHexString();assert.equal(paint,'b9c7d8','selected paint reaches physical material');verifyDisposal(renderer.carGroup);verifyDisposal(renderer.garageCar);
  assert.ok(texturePaints>=publicCars.length+TRACKS.length*2,'procedural material generation exercised');
  console.log(JSON.stringify({test:'remake-renderer-structure',status:'passed',cars:publicCars.length,uniqueVehicleGeometry:shapes.size,bodyFamilies:families.size,maxCarMeshes,tracks:trackMetrics,gpuRendering:'not exercised by this CPU-only test'},null,2));
}finally{if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;}
