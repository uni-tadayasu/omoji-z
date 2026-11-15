#!/usr/bin/env node
/** Exercise the classic visual layer against real bundled scene and vehicle classes. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {
    classicLightProfile, classicResolutionLimit, classicBeginFrame,
    classicEndFrame, classicReleaseFrame, drawClassicReflection, drawClassicContactShadow
} from '../assets/classic-visuals.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'assets/game.js'), 'utf8');
const imported = {};
const calls = {begin:0, end:0, shadow:0, reflection:0};
for (const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2].split('?')[0])));
    for (const item of match[1].split(',')) {
        const [name, local=name] = item.trim().split(/\s+as\s+/);
        imported[local] = module[name];
        if (name === 'classicBeginFrame') imported[local] = (...args) => {
            calls.begin++;
            return module[name](...args);
        };
        if (name === 'classicEndFrame') imported[local] = (...args) => {
            calls.end++;
            return module[name](...args);
        };
        if (name === 'drawClassicContactShadow' || name === 'drawClassicReflection') imported[local] = (...args) => {
            calls[name === 'drawClassicContactShadow' ? 'shadow' : 'reflection']++;
            return module[name](...args);
        };
    }
}
for (const match of source.matchAll(/^import\s+([\w$]+)\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2].split('?')[0])));
    imported[match[1]] = module.default;
}
const noop = () => {};
const context = {
    ...imported,
    document: {querySelectorAll:()=>[], getElementById:()=>null, body:{children:[]},
        createElement:()=>({style:{},getContext:()=>null})},
    window:{addEventListener:noop, devicePixelRatio:2, matchMedia:()=>({matches:false})},
    navigator:{userAgent:'node classic visuals', hardwareConcurrency:8},
    // The software rasterizer only needs a pixel buffer; no native canvas dependency.
    OffscreenCanvas:class {
        constructor(width,height) { this.width=width;this.height=height; }
        getContext() {
            return {
                createImageData:(width,height)=>({width,height,data:new Uint8ClampedArray(width*height*4)}),
                putImageData:image=>{this.pixels=image;}
            };
        }
    },
    console:{log:noop,warn:noop,error:noop}, URL, TextDecoder, TextEncoder,
    setTimeout, clearTimeout, performance, AbortController
};
context.globalThis = context;
vm.createContext(context);
const core = source.replace(/^import\s+[^\n]+\n/gm, '')
    .replaceAll('import.meta.url', JSON.stringify(pathToFileURL(path.join(root, 'assets/game.js')).href));
const cutoff = core.indexOf('var Y=n=>document.getElementById(n)');
assert.ok(cutoff > 0, 'Classic engine boundary must remain discoverable.');
vm.runInContext(core.slice(0,cutoff) + `;globalThis.__visualTest={
    cars:Tn,Kc,fr,ch,ax,ix,sa,Scene:Bi,Mesh:Fe,Plane:en,Physical:Ws,Directional:Gi,
    Hemisphere:Nr,Camera:Zt,Group:Tt,Vector:B};`, context, {timeout:20000});
const engine = context.__visualTest;

function race(quality='high', mode='webgl') {
    const scene = new engine.Scene();
    const sunlight = new engine.Directional('#fff1dd',3);
    sunlight.position.set(1,2,1);
    const sky = new engine.Hemisphere('#a7cde1','#52634c',1.2);
    const asphalt = new engine.Physical({color:'#555d63',roughness:.39});
    asphalt.name = 'OMOJI Layered Asphalt';
    const road = new engine.Mesh(new engine.Plane(14,120),asphalt);
    road.rotation.x = -Math.PI/2;
    const playerCar = engine.fr(engine.cars[0],{quality:'high'});
    playerCar.position.set(0,0,-25);
    scene.add(sky,sunlight,road,playerCar);
    const world = {...engine.Kc('haruna'),scene,dispose(){scene.clear();}};
    let ratio = 1.8;
    const resize = [];
    const renderer = {
        shadowMap:{enabled:false,type:0},
        capabilities:{getMaxAnisotropy:()=>8},
        getPixelRatio:()=>ratio,
        setPixelRatio(value){ratio=value;resize.push(value);},
        setSize:noop,
        getContext:()=>({isContextLost:()=>false}),
        render(renderedScene,camera){
            assert.equal(renderedScene,world.scene);
            assert.ok(camera.isPerspectiveCamera);
        },
        renderGame:noop
    };
    const canvas = {clientWidth:1280,clientHeight:720};
    const game = {
        quality,classicQuality:quality,classicDeviceRatio:2,rendererMode:mode,world,renderer,canvas,
        softwareCanvas:canvas,pixelRatio:ratio,size:[1280,720],
        playerCar,player:{distance:25,speed:30,stats:engine.cars[0]},
        opponents:new Map(),camera:new engine.Camera(64,16/9,.13,2450),
        renderStep:1/60,status:'running',clearInputs:noop
    };
    return {game,road,sunlight,resize,ratio:()=>ratio};
}

const tests = [];
function test(name,run) { tests.push([name,run]); }

test('lighting responds to weather while keeping finite renderer inputs', () => {
    const profiles = [{},{dark:true},{wet:true},{foggy:true},{snow:true}].map(classicLightProfile);
    for (const profile of profiles) {
        assert.ok(profile && typeof profile.key === 'string');
        assert.ok(Number.isFinite(profile.exposure) && profile.exposure > 0);
        for (const channel of ['body','specular']) {
            assert.equal(profile[channel].length,3);
            assert.ok(profile[channel].every(value=>Number.isFinite(value) && value >= 0));
        }
    }
    assert.notDeepEqual(profiles[0],profiles[1], 'Night needs distinct lighting.');
    assert.notDeepEqual(profiles[0],profiles[2], 'Rain needs distinct lighting.');
});

test('resolution limits cap high-DPI and large displays', () => {
    for (const mode of ['webgl','software']) {
        for (const quality of ['low','medium','high','auto']) {
            const normal = classicResolutionLimit(quality,2,1280,720,mode);
            const huge = classicResolutionLimit(quality,5,7680,4320,mode);
            assert.ok(Number.isFinite(normal) && normal > 0 && normal <= 2);
            assert.ok(Number.isFinite(huge) && huge > 0 && huge <= 5);
            assert.ok(huge <= normal, 'A larger screen must not increase internal resolution.');
        }
    }
    assert.ok(classicResolutionLimit('low',2,1280,720) <= classicResolutionLimit('high',2,1280,720));
    assert.ok(classicResolutionLimit('high',1,1280,720) <= 1, 'DPR 1 should not supersample.');
});

test('real classic vehicle meshes cast shadows, windows stay transparent, asphalt receives', () => {
    const {game,road,sunlight} = race();
    const texture = {isTexture:true,dispose(){throw Error('Shared reflection must remain owned by the engine.');}};
    const physics = JSON.stringify(game.player);
    classicBeginFrame(game,()=>texture,0);
    assert.equal(game.world.scene.environment,texture);
    assert.equal(game.renderer.shadowMap.enabled,true);
    assert.equal(road.receiveShadow,true);
    assert.ok(road.material.envMapIntensity > 0);
    assert.ok(sunlight.shadow.mapSize.x >= 512);
    assert.ok(sunlight.target.position.distanceTo(game.playerCar.position) < 1e-8);
    let opaque = 0, transparent = 0;
    game.playerCar.traverse(node=>{
        if (!node.isMesh) return;
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        if (materials.every(material=>material.transparent || material.opacity === 0)) {
            transparent++;
            assert.equal(node.castShadow,false, 'Glass and light planes cannot cast solid silhouettes.');
        } else {
            opaque++;
            assert.equal(node.castShadow,true);
        }
    });
    assert.ok(opaque > 5 && transparent > 0, 'Exercise both real coachwork and optical meshes.');
    assert.equal(JSON.stringify(game.player),physics,'Visual setup must not write simulation state.');
    const oldScene = game.world.scene;
    game.world.dispose();
    assert.equal(oldScene.environment,texture,'Shared HDR data must survive a race teardown.');
});

test('streamed road sectors and replacement vehicles receive visual setup', () => {
    const {game} = race();
    classicBeginFrame(game,()=>({isTexture:true}),0);
    const sector = new engine.Group();
    const material = new engine.Physical({roughness:.4});
    material.name = 'OMOJI Layered Asphalt';
    const nextRoad = new engine.Mesh(new engine.Plane(14,200),material);
    sector.add(nextRoad); game.world.scene.add(sector);
    const replacement = engine.fr(engine.cars[1],{quality:'low'});
    game.opponents.set('joined-driver',{car:replacement});
    game.world.scene.add(replacement);
    classicBeginFrame(game,()=>{throw Error('An unchanged world must reuse its environment.');},20);
    assert.equal(nextRoad.receiveShadow,true);
    let casters = 0;
    replacement.traverse(node=>{if(node.isMesh && node.castShadow)casters++;});
    assert.ok(casters > 0,'Late multiplayer cars must cast shadows too.');
});

test('endurance sunlight follows changing biome directions and elevated cars', () => {
    const {game,sunlight} = race();
    classicBeginFrame(game,()=>({isTexture:true}),0);
    sunlight.position.set(-.6,.8,0);
    game.playerCar.position.set(200,130,-620);
    classicBeginFrame(game,()=>null,20);
    const direction = sunlight.position.clone().sub(game.playerCar.position).normalize();
    assert.ok(direction.distanceTo(new engine.Vector(-.6,.8,0)) < 1e-8);
    assert.ok(sunlight.target.position.distanceTo(game.playerCar.position) < 1e-8);
});

test('race exit disposes shadow targets once while retaining cached environment', () => {
    const {game,sunlight} = race();
    let disposed = 0;
    const texture = {isTexture:true,dispose(){throw Error('Shared environment was disposed.');}};
    classicBeginFrame(game,()=>texture,0);
    sunlight.shadow.map = {dispose(){disposed++;}};
    engine.ch.prototype.exit.call(game);
    assert.equal(disposed,1,'The actual race exit must release its shadow render target.');
    assert.equal(game.classicVisuals,null);
    classicReleaseFrame(game);
    assert.equal(disposed,1,'Repeated teardown must be harmless.');
});

test('renderer fallback releases WebGL shadows before entering software mode', () => {
    const {game,sunlight} = race();
    let disposed = 0;
    classicBeginFrame(game,()=>({isTexture:true}),0);
    sunlight.shadow.map = {dispose(){disposed++;}};
    game.rendererMode = 'software';
    classicBeginFrame(game,()=>{throw Error('Fallback cannot allocate HDR maps.');},20);
    assert.equal(disposed,1);
    classicReleaseFrame(game);
    assert.equal(disposed,1);
});

test('automatic resolution excludes startup, inactive frames and isolated stalls', () => {
    const {game,ratio} = race('auto');
    classicBeginFrame(game,()=>({isTexture:true}),0);
    const initial = ratio();
    for (let frame=0; frame<40; frame++) classicEndFrame(game,0,100);
    assert.equal(ratio(),initial,'Compilation warmup cannot lower quality.');
    game.status = 'paused';
    for (let frame=0; frame<150; frame++) classicEndFrame(game,0,100);
    game.status = 'countdown';
    for (let frame=0; frame<150; frame++) classicEndFrame(game,0,100);
    game.status = 'running';
    for (let frame=0; frame<150; frame++) classicEndFrame(game,0,500);
    assert.equal(ratio(),initial,'Inactive frames and tab-sized stalls cannot lower quality.');
    for (let frame=0; frame<180; frame++) classicEndFrame(game,0,40);
    assert.ok(ratio() < initial,'Sustained render pressure should reduce automatic resolution.');
    for (let frame=0; frame<1800; frame++) classicEndFrame(game,0,40);
    const minimum = ratio();
    assert.ok(minimum > 0 && minimum >= initial * .5,'Adaptive quality needs a usable lower bound.');
    for (let frame=0; frame<1800; frame++) classicEndFrame(game,0,4);
    assert.ok(ratio() > minimum && ratio() <= initial,'Recovered performance restores only the original resolution budget.');
});

test('explicit graphics presets remain fixed and software needs no WebGL objects', () => {
    for (const quality of ['low','high']) {
        const {game,ratio} = race(quality);
        classicBeginFrame(game,()=>({isTexture:true}),0);
        const initial = ratio();
        for (let frame=0; frame<300; frame++) classicEndFrame(game,0,50);
        assert.equal(ratio(),initial);
        if (quality === 'low') assert.equal(game.renderer.shadowMap.enabled,false);
    }
    const {game,ratio} = race('auto','software');
    delete game.renderer.shadowMap;
    classicBeginFrame(game,()=>{throw Error('Software must not allocate WebGL reflection maps.');},0);
    assert.ok(ratio() <= 1);
});

test('actual classic draw dispatches both visual hooks for both rendering paths', () => {
    for (const mode of ['webgl','software']) {
        const {game} = race('high',mode);
        const before = {...calls};
        engine.ch.prototype.draw.call(game);
        assert.equal(calls.begin,before.begin+1);
        assert.equal(calls.end,before.end+1);
        if (mode === 'webgl') assert.ok(game.world.scene.environment?.isTexture);
    }
});

test('real software vehicle contact is the bottom opaque raster row', () => {
    const model = engine.ix(engine.cars[0],undefined,'race',0,false);
    for (const angle of [.08,1.4,Math.PI]) {
        const sprite = engine.ax(model,angle,'race',false,.21,false,'wet');
        const {width,height,data} = sprite.canvas.pixels;
        let bottom = -1;
        for (let row=0; row<height; row++) {
            for (let column=0; column<width; column++) {
                if (data[(row*width+column)*4+3] > 192) bottom=row;
            }
        }
        assert.ok(bottom > 0,'Actual vehicle raster must contain opaque pixels.');
        assert.equal(sprite.contactY,bottom+1,'Ground contact must follow the rendered tyres, not the model origin.');
        assert.ok(sprite.contactY <= height);
    }
});

function canvasRecorder() {
    const commands = [], stack = [];
    const context = {
        globalAlpha:.63,imageSmoothingEnabled:false,fillStyle:'#abcdef',
        save(){stack.push({globalAlpha:this.globalAlpha,imageSmoothingEnabled:this.imageSmoothingEnabled,fillStyle:this.fillStyle});},
        restore(){Object.assign(this,stack.pop());},
        translate(...args){commands.push(['translate',...args]);},
        scale(...args){commands.push(['scale',...args]);},
        createRadialGradient(...args){
            commands.push(['gradient',...args]);
            return {addColorStop(...stop){commands.push(['stop',...stop]);}};
        },
        fillRect(...args){commands.push(['fillRect',...args]);},
        beginPath:noop,
        ellipse(...args){commands.push(['ellipse',...args]);},
        fill:noop,
        drawImage(...args){commands.push(['image',this.globalAlpha,...args]);}
    };
    return {context,commands,stack};
}

test('contact shadow anchors to actual tyre pixels and restores canvas state', () => {
    const {context,commands,stack} = canvasRecorder();
    const sprite = {yOrigin:165,contactY:175};
    drawClassicContactShadow(context,sprite,400,500,1.5,240,0);
    const translation = commands.find(([kind])=>kind === 'translate');
    assert.equal(translation[1],400);
    assert.equal(translation[2],500+(175-165)*1.5-240*.012);
    assert.ok(commands.some(([kind])=>kind === 'gradient'),'Contact shadow needs soft edges.');
    assert.equal(context.fillStyle,'#abcdef');
    assert.equal(context.globalAlpha,.63); assert.equal(stack.length,0);
    context.fillRect=()=>{throw Error('Shadow raster failure');};
    assert.throws(()=>drawClassicContactShadow(context,sprite,0,0,1,240,0),/Shadow raster failure/);
    assert.equal(context.fillStyle,'#abcdef'); assert.equal(stack.length,0);
});

test('actual software race car dispatches tyre shadow and wet reflection', () => {
    const {context} = canvasRecorder();
    const before = {...calls};
    engine.sa(context,engine.cars[0],{x:400,y:500,width:180,angle:.1,view:'race',reflection:true,lighting:'wet'});
    assert.equal(calls.shadow,before.shadow+1);
    assert.equal(calls.reflection,before.reflection+1);
});

test('wet-road reflection mirrors the source and restores all canvas state', () => {
    const commands = [], stack = [];
    const context = {
        globalAlpha:.63,imageSmoothingEnabled:false,
        save(){stack.push({globalAlpha:this.globalAlpha,imageSmoothingEnabled:this.imageSmoothingEnabled});},
        restore(){Object.assign(this,stack.pop());},
        translate(...args){commands.push(['translate',...args]);},
        scale(...args){commands.push(['scale',...args]);},
        drawImage(...args){commands.push(['image',this.globalAlpha,...args]);}
    };
    const sprite = {canvas:{width:240,height:180},xOrigin:120,yOrigin:165,contactY:174};
    drawClassicReflection(context,sprite,400,500,1.5,'night');
    const imageCommands = commands.filter(([kind])=>kind === 'image');
    const translation = commands.find(([kind])=>kind === 'translate');
    assert.equal(translation[2],500+(174-165)*1.5+Math.max(1,1.5*1.6),'Reflection must begin below actual tyre contact.');
    assert.ok(Math.abs(imageCommands[0][4]+imageCommands[0][6]-174) < 1e-8,'Reflection samples through the tyre-contact row.');
    assert.ok(imageCommands.length > 1,'Reflection should fade across multiple road bands.');
    assert.ok(commands.some(([kind,x,y])=>kind === 'scale' && x > 0 && y < 0),'Reflection must be vertically mirrored.');
    assert.ok(imageCommands.every(([,alpha])=>alpha > 0 && alpha < .5));
    assert.ok(imageCommands.at(-1)[1] < imageCommands[0][1],'Reflection fades away from the tyres.');
    assert.equal(context.globalAlpha,.63); assert.equal(context.imageSmoothingEnabled,false);
    assert.equal(stack.length,0);
    context.drawImage=()=>{throw Error('Raster failure');};
    assert.throws(()=>drawClassicReflection(context,sprite,0,0,1),/Raster failure/);
    assert.equal(context.globalAlpha,.63); assert.equal(stack.length,0,'Even a failed raster must restore context.');
});

let failed = 0;
for (const [name,run] of tests) {
    try { run(); console.log(`PASS ${name}`); }
    catch (error) { failed++; console.error(`FAIL ${name}\n${error.stack}`); }
}
if (failed) process.exitCode = 1;
else console.log(`Classic visuals: ${tests.length} checks passed.`);
