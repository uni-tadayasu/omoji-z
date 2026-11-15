#!/usr/bin/env node
/** Numerical renderer regression tests: real Three.js cameras/resources, no GPU claim. */
import assert from 'node:assert/strict';
import * as THREE from '../assets/remake/vendor/three.module.min.js';
import {classicResolutionLimit,classicBeginFrame,classicReleaseFrame} from '../assets/classic-visuals.js';

function fixture(quality='high') {
    const scene=new THREE.Scene(), sun=new THREE.DirectionalLight(0xffffff,2);
    sun.position.set(.7,1,.3); scene.add(sun);
    const playerCar=new THREE.Group(); playerCar.position.set(53.1,12.4,-81.6);scene.add(playerCar);
    const road=new THREE.Mesh(new THREE.PlaneGeometry(20,200),new THREE.MeshPhysicalMaterial());
    road.material.name='OMOJI Layered Asphalt';scene.add(road);
    const calls=[];
    const game={world:{scene,track:{}},rendererMode:'webgl',classicQuality:quality,classicDeviceRatio:2,
        canvas:{clientWidth:1920,clientHeight:1080},size:[1920,1080],playerCar,opponents:new Map(),
        renderer:{shadowMap:{enabled:false},setPixelRatio(value){calls.push(value);}},status:'running'};
    const environment=new THREE.Texture();
    const begin=()=>classicBeginFrame(game,()=>environment,0);
    return {game,scene,sun,calls,begin,environment};
}

let count=0;
function test(name,run){run();count++;console.log(`PASS ${name}`);}

test('render buffers respect their actual pixel budgets, including 8K and ultrawide',()=>{
    for(const [quality,budget] of [['low',1100000],['medium',1850000],['auto',1850000],['high',2800000]])
        for(const mode of ['webgl','software'])
            for(const [width,height] of [[320,568],[390,844],[1920,1080],[3840,2160],[7680,4320],[10240,2160]])
                for(const dpr of [.5,1,2,4]){
                    const ratio=classicResolutionLimit(quality,dpr,width,height,mode);
                    assert.ok(Number.isFinite(ratio)&&ratio>0&&ratio<=dpr);
                    assert.ok(width*height*ratio*ratio<=budget+1e-6,`${quality}/${mode}/${width} exceeds ${budget}`);
                    if(mode==='software')assert.ok(ratio<=1);
                }
    for(const value of [0,-1,NaN,Infinity])assert.ok(Number.isFinite(classicResolutionLimit('high',value,value,value)));
});

test('device scale changes on a constant viewport resize only the render buffer',()=>{
    const {game,calls,begin}=fixture();begin();const previous=calls.at(-1);
    game.classicDeviceRatio=.75;begin();
    assert.equal(calls.at(-1),.75);assert.ok(calls.at(-1)<previous);
    const changes=calls.length;begin();assert.equal(calls.length,changes,'Unchanged dimensions/DPR must not trigger resizing.');
});

test('a quality switch releases old targets and never reuses disposed maps',()=>{
    const {game,sun,begin,environment}=fixture();let map=0,pass=0,environmentDisposed=0;
    environment.dispose=()=>environmentDisposed++;
    begin();const first=game.classicVisuals, direction=first.sunDirection.clone();
    sun.shadow.map={dispose(){map++;}};sun.shadow.mapPass={dispose(){pass++;}};
    game.classicQuality='low';begin();
    assert.notEqual(game.classicVisuals,first);assert.equal(map,1);assert.equal(pass,1);
    assert.equal(sun.shadow.map,null);assert.equal(sun.shadow.mapPass,null);
    assert.equal(sun.castShadow,false);assert.equal(game.renderer.shadowMap.enabled,false);
    game.classicQuality='high';begin();assert.equal(sun.castShadow,true);assert.equal(game.renderer.shadowMap.enabled,true);
    assert.ok(game.classicVisuals.sunDirection.distanceTo(direction)<1e-10,'Quality switches must retain the world-space sun direction.');
    assert.equal(environmentDisposed,0);classicReleaseFrame(game);classicReleaseFrame(game);
    assert.equal(map,1);assert.equal(pass,1);
});

test('renderer replacement initializes its own graphics state without a world replacement',()=>{
    const {game,begin}=fixture();begin();const initial=game.classicVisuals;
    game.renderer={shadowMap:{enabled:false},setPixelRatio(){}};begin();
    assert.notEqual(game.classicVisuals,initial);assert.equal(game.renderer.shadowMap.enabled,true);
    assert.ok(game.renderer.toneMappingExposure>0);
});

test('sun shadows remain on a stable texel grid during sub-texel car movement',()=>{
    const {game,scene,sun,begin}=fixture();begin();
    // Choose a focus away from the rounding boundary, in light-plane coordinates.
    const state=game.classicVisuals,step=36/sun.shadow.mapSize.x;
    const right=state.shadowRight.clone(),up=state.shadowUp.clone();
    game.playerCar.position.copy(right).multiplyScalar(step*100).addScaledVector(up,step*200);
    const point=game.playerCar.position.clone().add(new THREE.Vector3(1,2,3));
    const sample=()=>{begin();scene.updateMatrixWorld(true);sun.shadow.updateMatrices(sun);return point.clone().project(sun.shadow.camera);};
    const before=sample();game.playerCar.position.addScaledVector(right,step*.1).addScaledVector(up,step*.1);
    const after=sample();
    assert.ok(Math.abs(before.x-after.x)<1e-10);assert.ok(Math.abs(before.y-after.y)<1e-10);
    assert.ok(sun.target.position.distanceTo(game.playerCar.position)<1e-10,'Light target still tracks the actual car.');
    assert.equal(sun.shadow.camera.right-sun.shadow.camera.left,36);
    assert.equal(sun.shadow.camera.top-sun.shadow.camera.bottom,36);
    // Biome/sun changes and steep elevated terrain must stay finite as well.
    sun.position.set(0,1,0);game.playerCar.position.set(2000,600,-17000);sample();
    assert.ok(sun.shadow.camera.projectionMatrix.elements.every(Number.isFinite));
});

console.log(`Quality rendering: ${count} checks passed; no browser/GPU frame-rate claim.`);
