#!/usr/bin/env node
/** Input/assist regressions, real simulation integration, and pointer release. Standard Node only. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import {DRIVING_PRESETS,drivingSteering,drivingYaw,clearDrivingState,prepareDrivingInput,
  cornerSpeedEnvelope,matchedCpuCar,bindAnalogSteering,startDrivingTutorial,drivingTrainingStatus,drivingPreferences} from '../assets/driving.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sourceArg=process.argv.indexOf('--source');
const sourcePath=sourceArg>=0?process.argv[sourceArg+1]:path.join(root,'assets/game.js');
const reports=[];
function test(name,fn){try{const detail=fn();reports.push({name,passed:true,detail});console.log('PASS '+name+(detail?' — '+detail:''));}catch(error){reports.push({name,passed:false,error:error.message});console.error('FAIL '+name+' — '+error.message);}}
const car={id:'driving-test',topSpeed:350,accel:8,power:200,mass:1200,gears:6,drive:'FR',layout:'FR',engineType:'inline4',grip:1,handling:1,drift:1,dimensions:[4.2,1.8,1.4],axle:[-.6,.6]};
function route(surface=1,curvature=0,wet=false){return{track:{grip:surface,wet},width:14,length:100000,gripAt:()=>surface,sample:(d,p={})=>Object.assign(p,{d,x:0,y:0,z:-d,heading:curvature*Math.max(0,d-100),grade:0,curve:d>=100?curvature:0})};}
const flat=route();
const human={drivingHuman:true,drivingPreset:'beginner',drivingAssist:true,steeringProfile:'digital',throttle:1,brake:0,steering:0,handbrake:0};
test('digital steering has no initial jump and returns smoothly',()=>{
  const vehicle={stats:car,omojiDrivePreset:'beginner'};
  const first=drivingSteering(vehicle,1,'digital',40,0,1/60);
  assert(first>0&&first<.04);
  for(let i=0;i<60;i++)drivingSteering(vehicle,1,'digital',40,0,1/60);
  let previous=drivingSteering(vehicle,1,'digital',40,0,1/60);
  for(let i=0;i<60;i++){const next=drivingSteering(vehicle,0,'digital',40,0,1/60);assert(Math.abs(next)<=Math.abs(previous)+1e-9);previous=next;}
  assert(Math.abs(previous)<1e-8);return 'first-frame demand < 0.04; release settles at zero';
});
test('steering ramps are independent of 30/60/120 Hz rendering',()=>{
  for(const preset of Object.keys(DRIVING_PRESETS))for(const speed of [5,25,55,90]){
    const values=[30,60,120].map(rate=>{const v={stats:car,omojiDrivePreset:preset};let steering=0;for(let i=0;i<rate*2;i++)steering=drivingSteering(v,i<rate?1:-1,'digital',speed,0,1/rate);return steering;});
    assert(Math.max(...values)-Math.min(...values)<1e-8,`${preset} at ${speed} m/s differs by frame rate`);
  }return '36 rate/speed/preset combinations';
});
test('high-speed steering and human lateral force stay inside tyre limits',()=>{
  for(const preset of Object.keys(DRIVING_PRESETS)){
    const slow={stats:car,omojiDrivePreset:preset},fast={stats:car,omojiDrivePreset:preset};let a,b;
    for(let i=0;i<240;i++){a=drivingSteering(slow,1,'analog',8,0,1/120);b=drivingSteering(fast,1,'analog',85,0,1/120);}
    assert(b<a);
    for(const surface of [1,.7,.45])for(const speed of [10,25,50,90]){
      const v={stats:car,speed,distance:200,slipAngle:0,omojiDrivePreset:preset};
      const yaw=drivingYaw(v,route(surface),{curve:0},2,.5,5,1,0,0);
      assert(Math.abs(yaw)*speed<=9.35*surface+1e-8);
    }
  }return '36 grip/speed/preset cases; no automatic road steering';
});
test('future-curve braking uses road grip and actual brake/tyre setup',()=>{
  const v={stats:car,speed:48,distance:0};
  const dry=cornerSpeedEnvelope(v,route(1,.025));
  const wet=cornerSpeedEnvelope(v,route(.7,.025,true));
  const snow=cornerSpeedEnvelope(v,route(.45,.025));
  assert(dry.safeSpeed>wet.safeSpeed&&wet.safeSpeed>snow.safeSpeed);
  const tyres=cornerSpeedEnvelope({...v,stats:{...car,wetGrip:.18}},route(.7,.025,true));assert(tyres.safeSpeed>wet.safeSpeed);
  const brakes=cornerSpeedEnvelope({...v,stats:{...car,brakeForce:1.15}},route(1,.025));assert(brakes.safeSpeed>=dry.safeSpeed);
  const straight=prepareDrivingInput({...v,stats:car},{...human},flat,1/60);assert.equal(straight.brake,0);assert.equal(straight.steering,0);
  const assisted=prepareDrivingInput({...v,stats:car},{...human},route(.7,.025,true),1/60);
  assert(assisted.brake>0&&assisted.throttle<1);assert.equal(assisted.steering,0);
  return 'dry > wet > snow; tyres/brakes affect look-ahead; steering always belongs to driver';
});
test('brake takes priority and reverse requires deliberate stopped hold',()=>{
  const v={stats:car,speed:0,distance:0,slipAngle:0,slip:0};let input;
  for(let i=0;i<30;i++){input=prepareDrivingInput(v,{...human,throttle:1,brake:1},flat,1/60);assert.equal(input.throttle,0);assert.equal(input.reverse,false);}
  clearDrivingState(v);
  for(let i=0;i<40;i++){input=prepareDrivingInput(v,{...human,throttle:0,brake:1},flat,1/60);assert.equal(input.reverse,false);}
  for(let i=0;i<20;i++)input=prepareDrivingInput(v,{...human,throttle:0,brake:1},flat,1/60);
  assert.equal(input.reverse,true);
  prepareDrivingInput(v,{...human,throttle:0,brake:0},flat,1/60);
  assert.equal(prepareDrivingInput(v,{...human,throttle:0,brake:1},flat,1/60).reverse,false);
  return 'no accidental brake-to-reverse transition';
});
test('CPU selection matches performance and excludes existing grid cars',()=>{
  const cars=Array.from({length:100},(_,i)=>({id:'cpu-'+i,pp:250+i*8})),reference={pp:600};
  for(const difficulty of ['easy','normal','hard','master','legend'])for(let seed=0;seed<50;seed++){
    const selected=matchedCpuCar(cars,new Set(['cpu-43']),reference,difficulty,c=>c.pp,()=>seed/50);
    assert.notEqual(selected.id,'cpu-43');assert(selected.pp>480&&selected.pp<690);
  }return '250 selections; no unrestricted 1000 PP opponent for 600 PP car';
});
test('practical tutorial progresses only after actual manual goals',()=>{
  startDrivingTutorial();const v={stats:car,speed:11,distance:0,slipAngle:0,slip:0,impact:0,offset:0};
  for(let i=0;i<100;i++)prepareDrivingInput(v,{...human,drivingAssist:false},flat,1/60);
  assert.equal(drivingTrainingStatus().phase,1);
  v.speed=3;for(let i=0;i<20;i++)prepareDrivingInput(v,{...human,drivingAssist:false,throttle:0},flat,1/60);
  assert.equal(drivingTrainingStatus().phase,1,'automatic/slowing alone must not finish manual braking goal');
  prepareDrivingInput(v,{...human,drivingAssist:false,throttle:0,brake:.8},flat,1/60);assert.equal(drivingTrainingStatus().phase,2);
  v.speed=12;for(let i=0;i<125;i++)prepareDrivingInput(v,{...human,drivingAssist:false,steering:.3},flat,1/60);
  assert.equal(drivingTrainingStatus().phase,3);assert.equal(drivingPreferences().tutorialComplete,true);
  prepareDrivingInput({...v},{...human,drivingAssist:false},flat,1/60);assert.equal(drivingTrainingStatus().phase,3,'Finishing a tutorial must not silently restart it on the next car.');
  return 'launch, manual brake, stable turn; completion persisted in preferences';
});

let game;
let originalSource=fs.readFileSync(sourcePath,'utf8');
const bindings={};
for(const match of originalSource.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)){
  const module=await import(pathToFileURL(path.resolve(root,'assets',match[2].split('?')[0])));
  for(const item of match[1].split(',')){const [exported,local=exported]=item.trim().split(/\s+as\s+/);bindings[local]=module[exported];}
}
test('actual race simulation receives the driving hooks',()=>{
  assert(originalSource.includes('// OMOJI_DRIVING_V3'),'Apply v3-handling-patch.mjs before this integration test.');
  const source=originalSource.replace(/^import\s+[^\n]+\n/gm,'').replaceAll('import.meta.url',JSON.stringify(pathToFileURL(path.join(root,'assets/game.js')).href));
  const cutoff=source.indexOf('var Y=n=>document.getElementById(n)');assert(cutoff>0);
  const noop=()=>{}, context={...bindings,document:{querySelectorAll:()=>[],body:{children:[]},createElement:()=>({style:{},getContext:()=>null})},window:{addEventListener:noop},navigator:{userAgent:''},console:{log:noop,warn:noop,error:noop},URL,TextDecoder,TextEncoder,setTimeout,clearTimeout,performance,AbortController};context.globalThis=context;vm.createContext(context);
  vm.runInContext(source.slice(0,cutoff)+';globalThis.__driving={ep,ah,ch,cars:Tn,tracks:hn,Kc,ip,Wi,ga,B1,tp,Yr,omojiPickSoloGrid};',context,{timeout:20000});game=context.__driving;
  for(const surface of [1,.7,.45])for(const dt of [1/30,1/60,1/120])for(const preset of ['beginner','balanced','sport']){
    const vehicle=game.ah({...car},0,0,'at');vehicle.speed=25;
    for(let tick=0;tick<Math.round(5/dt);tick++){
      const steering=tick*dt<1?0:tick*dt<2?.5:tick*dt<3?-.5:0;
      game.ep(vehicle,{...human,drivingPreset:preset,steering,brake:tick*dt>3?.6:0,throttle:tick*dt>3?0:.45},route(surface),dt,{});
      for(const key of ['speed','offset','heading','angularSpeed','steering','slipAngle'])assert(Number.isFinite(vehicle[key]),`${preset}/${surface}/${dt}: invalid ${key}`);
    }
  }
  const rateSpeeds=[30,60,120].map(rate=>{const v=game.ah({...car},0,0,'at');for(let i=0;i<rate*8;i++)game.ep(v,{...human,drivingAssist:false},flat,1/rate,{});return v.speed;});
  assert(Math.max(...rateSpeeds)-Math.min(...rateSpeeds)<.5);
  return '27 surface/rate/preset simulations + <0.5 m/s difference over 8 seconds';
});
test('integrated CPU draws use the actual workshop performance rating',()=>{
  assert(game,'Simulation integration did not load.');assert.equal(typeof bindings.performancePoints,'function');
  for(const id of ['hachi','leopard','yukitsuba']){
    const reference=game.ga(game.Wi(id)), pp=bindings.performancePoints(reference),excluded=new Set([id]);
    for(const difficulty of ['easy','normal','hard','master','legend'])for(let i=0;i<12;i++){
      const opponent=game.ip(excluded,reference,difficulty), other=bindings.performancePoints(opponent);
      assert(!excluded.has(opponent.id));assert(Math.abs(other-pp)/pp<.19,`${id}: opponent ${other} vs ${pp} PP`);
    }
    const grid=game.omojiPickSoloGrid(id,7,'normal');assert.equal(grid.length,7);assert.equal(new Set(grid.map(row=>row.carId)).size,7);
  }return '180 real-PP selections and three unique 7-car grids';
});
test('CPU difficulty changes decisions without hidden engine, tyre or gear boosts',()=>{
  assert(game,'Simulation integration did not load.');assert(originalSource.includes('// OMOJI_FAIR_PHYSICS_V3'),'Apply the shared physical fairness patch.');
  const sample=game.cars.filter(row=>!row.operatorOnly).filter((_,index)=>index%31===0);
  for(const candidate of sample)for(const level of ['easy','normal','hard','master','legend']){
    const cpu=game.B1(game.ga(game.Wi('hachi')),level,candidate);
    for(const key of ['topSpeed','accel','power','mass','grip','handling','gears','brakeForce'])assert.equal(cpu[key],candidate[key],`Hidden CPU boost ${level}/${candidate.id}/${key}`);
  }
  const curve={...flat,sample:(d,p={})=>Object.assign(p,{d,x:0,y:0,z:-d,heading:d*.02,grade:0,curve:.02})};
  for(const surface of [1,.7,.45]){
    const world={...curve,track:{grip:surface},gripAt:()=>surface};
    const vehicle=game.ah({...car});vehicle.speed=Math.sqrt(9.35*surface/.02);
    const input=game.tp(vehicle,world,0,game.Yr.legend.pace,1,{},false,game.Yr.legend);
    assert(input.brake>.2,'Legend AI must brake rather than exceed the human tyre-force envelope.');
  }
  const humanCar=game.ah({...car}),cpuCar=game.ah(game.B1(car,'legend',car));
  for(let i=0;i<1200;i++){
    game.ep(humanCar,{...human,drivingPreset:'sport',drivingAssist:false},flat,1/120,{});
    game.ep(cpuCar,{throttle:1,brake:0,steering:0,handbrake:0,reverse:false},flat,1/120,{});
  }
  assert(Math.abs(humanCar.speed-cpuCar.speed)<1e-9);assert(Math.abs(humanCar.distance-cpuCar.distance)<1e-8);
  return `${sample.length*5} stock comparisons, three friction limits, identical 10-second player/CPU acceleration`;
});
test('all 515 maxed cars obey actual 375/385 km/h limits, including downhill nitro',()=>{
  assert(game,'Simulation integration did not load.');assert(originalSource.includes('// OMOJI_FAIR_PHYSICS_V3'),'Apply the shared physical fairness patch.');
  const levels=Object.fromEntries(['tires','brakes','suspension','differential','transmission','ecu','cooling','weight','aero'].map(id=>[id,3]));
  const legacy={stars:16,turbineLevel:24,nitroLevel:15,levels:{nitro:32,...Object.fromEntries(Array.from({length:63},(_,i)=>['old-'+i,32]))}};
  const workshop={levels,settings:{compound:'track',ride:2,finalDrive:-2,lsd:3,downforce:0,classCap:'open'}};
  const downhill={...flat,sample:(d,p={})=>Object.assign(p,{d,x:0,y:-.18*d,z:-d,heading:0,grade:-.18,curve:0})};
  let peak=0,cases=0;
  for(const stock of game.cars){
    const stats=bindings.prepareWorkshopStats(stock,legacy,workshop);
    assert(stats.topSpeed<=375);assert(stats.power<=1100);
    const running=game.ah(stats);assert.equal(running.nitroSeconds,stats.nitroSeconds);assert(running.nitroSeconds>=3.5&&running.nitroSeconds<=4.5);
    for(const nitro of [false,true]){
      const vehicle=game.ah(stats);vehicle.gear=vehicle.gearCount;vehicle.speed=(stats.topSpeed+(nitro?stats.nitroLevelSpeedBonus:0))/3.6-.025;vehicle.pedalThrottle=1;
      let max=0;
      for(let i=0;i<(nitro?720:180);i++){
        game.ep(vehicle,{...human,drivingPreset:'sport',drivingAssist:false,nitro},downhill,1/120,{});
        assert(Number.isFinite(vehicle.speed));max=Math.max(max,vehicle.speed*3.6);
        assert(vehicle.speed*3.6<=385+.00001,`${stock.id} exceeded 385 km/h`);
        if(!nitro)assert(vehicle.speed*3.6<=stats.topSpeed+.00001,`${stock.id} exceeded non-nitro top speed downhill`);
      }
      if(nitro){assert(vehicle.nitroRemaining<.01);assert(vehicle.speed*3.6<=stats.topSpeed+.00001,'Empty nitro must return to ordinary speed ceiling');}
      peak=Math.max(peak,max);cases++;
    }
  }
  return `${cases} max-workshop/legacy/downhill runs; measured peak ${peak.toFixed(3)} km/h; true nitro duration 3.5–4.5 seconds`;
});
test('actual dry, wet and snowy courses produce finite assisted/manual driving',()=>{
  assert(game,'Simulation integration did not load.');let cases=0;
  const courses=[game.tracks.find(row=>!row.dark&&!row.wet&&!row.snow&&!row.straight),game.tracks.find(row=>row.wet),game.tracks.find(row=>row.snow)];
  assert(courses.every(Boolean));
  for(const course of courses)for(const preset of ['beginner','balanced','sport']){
    const world=game.Kc(course.id),vehicle=game.ah(game.ga(game.Wi('hachi')));vehicle.distance=Math.min(200,world.length*.1);vehicle.speed=22;
    for(let i=0;i<1200;i++){
      const steering=Math.sin(i/120*.7)*.25;
      game.ep(vehicle,{...human,drivingPreset:preset,drivingAssist:preset!=='sport',steering,throttle:.55},world,1/120,{});
      for(const key of ['speed','offset','heading','angularSpeed','steering','slipAngle'])assert(Number.isFinite(vehicle[key]),`${course.id}/${preset}: invalid ${key}`);
      assert(vehicle.speed>=-8.61&&vehicle.speed<110);assert(Math.abs(vehicle.offset)<=world.width/2+1);
    }cases++;
  }return `${cases} real course/preset runs, 10 seconds each`;
});
test('race input supports analog steering and clears every held control',()=>{
  assert(game,'Simulation integration did not load.');assert(originalSource.includes('omojiBindAnalogSteering(race,setAction,clear)'),'Touch mode switching must clear held button pointers.');const race=Object.create(game.ch.prototype);
  Object.assign(race,{heldActions:new Set(),heldKeys:new Set(),pendingShift:0,gamepadControls:null,gamepadSuspended:false,status:'running',player:game.ah({...car}),assist:true,multiplayer:null});
  race.setInput('analogSteeringActive',true);race.setInput('analogSteering',.37);assert.equal(race.input().steering,.37);
  race.setInput('accelerate',true);assert.equal(race.input().throttle,1);race.clearInputs();assert.equal(race.input().steering,0);assert.equal(race.input().throttle,0);
  race.status='paused';race.setInput('analogSteeringActive',true);race.setInput('analogSteering',.8);assert.equal(race.input().steering,0);
  return 'analog value is continuous; clear/pause leave no stale throttle or steering';
});
test('official races reject assistance and paused activation marks the run',()=>{
  assert(game,'Simulation integration did not load.');const race=Object.create(game.ch.prototype);
  Object.assign(race,{mode:'duel',officialRace:'solo',status:'running',usedAssist:false,selected:{}});
  race.setAssist(true);assert.equal(race.assist,false);assert.equal(race.selected.assist,false);
  race.officialRace='online';race.setAssist(true);assert.equal(race.assist,false);
  race.officialRace=null;race.status='paused';race.setAssist(true);assert.equal(race.assist,true);assert.equal(race.usedAssist,true);
  race.setAssist(false);assert.equal(race.usedAssist,true,'Switching assistance off must not turn an assisted run into a manual record.');
  return 'solo/online official guard; assisted status survives pause and later disable';
});

test('touch slider pointercancel, capture loss and window blur release to neutral',()=>{
  const previous={document:globalThis.document,addEventListener:globalThis.addEventListener,localStorage:globalThis.localStorage};
  class Element {constructor(){this.handlers=new Map();this.dataset={};this.style={setProperty:()=>{}};this.capture=new Set();}addEventListener(type,fn){this.handlers.set(type,[...(this.handlers.get(type)||[]),fn]);}fire(type,event={}){for(const fn of this.handlers.get(type)||[])fn({button:0,preventDefault(){},stopPropagation(){},...event});}setAttribute(name,value){this[name]=value;}getBoundingClientRect(){return{left:0,width:140};}setPointerCapture(id){this.capture.add(id);}hasPointerCapture(id){return this.capture.has(id);}releasePointerCapture(id){this.capture.delete(id);} }
  try{
    const events=new Element(),doc=new Element(),slider=new Element(),toggle=new Element(),group=new Element(),left=new Element(),right=new Element(),race=new Element();left.parentElement=group;right.parentElement=group;group.prepend=()=>{};
    race.querySelector=selector=>selector.includes('left')?left:right;
    globalThis.document={...doc,addEventListener:doc.addEventListener.bind(doc),createElement:()=>Object.assign(new Element(),{querySelector:selector=>selector.includes('slider')?slider:toggle})};
    globalThis.addEventListener=events.addEventListener.bind(events);globalThis.localStorage={getItem:()=>null,setItem:()=>{}};
    let buttonClears=0;const held=new Map(),controller=bindAnalogSteering(race,(action,value)=>held.set(action,value),()=>buttonClears++);
    slider.fire('pointerdown',{pointerId:1,clientX:140});assert.equal(held.get('analogSteering'),1);assert.equal(held.get('analogSteeringActive'),true);
    slider.fire('pointermove',{pointerId:1,clientX:70});assert.equal(held.get('analogSteering'),0);
    slider.fire('pointercancel',{pointerId:1});assert.equal(held.get('analogSteeringActive'),false);assert.equal(held.get('analogSteering'),0);
    slider.fire('pointerdown',{pointerId:2,clientX:0});events.fire('blur');assert.equal(held.get('analogSteeringActive'),false);assert.equal(held.get('analogSteering'),0);
    slider.fire('pointerdown',{pointerId:3,clientX:140});slider.fire('lostpointercapture',{pointerId:3});assert.equal(held.get('analogSteering'),0);controller.clear();
    toggle.fire('click');assert.equal(buttonClears,1);assert.equal(held.get('analogSteering'),0);assert.equal(held.get('analogSteeringActive'),false);
  }finally{for(const [name,value]of Object.entries(previous)){if(value===undefined)delete globalThis[name];else globalThis[name]=value;}}
  return 'pointer release, cancellation, lost capture and app switch are deterministic';
});
const report={passed:reports.every(row=>row.passed),checks:reports.length,results:reports};
const flag=process.argv.indexOf('--report');if(flag>=0&&process.argv[flag+1])fs.writeFileSync(process.argv[flag+1],JSON.stringify(report,null,2)+'\n');
process.exitCode=report.passed?0:1;
