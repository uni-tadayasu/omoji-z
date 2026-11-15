import assert from 'node:assert/strict';
import {DrivingInput} from '../assets/remake/input.js';

class Surface {
  constructor(control=null){this.listeners=new Map();this.dataset=control?{control}:{};this.classes=new Set();this.classList={add:name=>this.classes.add(name),remove:name=>this.classes.delete(name)};this.field=false;}
  addEventListener(type,listener,{signal}={}){if(!this.listeners.has(type))this.listeners.set(type,new Set());this.listeners.get(type).add(listener);signal?.addEventListener('abort',()=>this.listeners.get(type).delete(listener),{once:true});}
  dispatch(type,properties={}){const event={type,target:this,prevented:false,repeat:false,preventDefault(){this.prevented=true;},...properties};for(const listener of [...(this.listeners.get(type)||[])])listener(event);return event;}
  closest(){return this.field?this:null;}
  setPointerCapture(id){this.capture=id;}
}
const controls=['left','right','throttle','brake','handbrake','boost'].map(control=>new Surface(control));
const doc=new Surface(),win=new Surface();doc.querySelectorAll=()=>controls;doc.hidden=false;
let paused=false,pauseCalls=0,cameraCalls=0,gamepads=[];
const previousNavigator=Object.getOwnPropertyDescriptor(globalThis,'navigator');
Object.defineProperty(globalThis,'navigator',{configurable:true,value:{getGamepads:()=>gamepads}});
const neutral={throttle:0,brake:0,steer:0,handbrake:0,boost:false};
const input=new DrivingInput({document:doc,window:win,isPaused:()=>paused,onPause:()=>{pauseCalls++;paused=!paused;input.setActive(!paused);},onCamera:()=>cameraCalls++});
const key=(type,code,properties)=>doc.dispatch(type,{code,...properties});
try{
  assert.deepEqual(input.read(),neutral);
  const homeEscape=key('keydown','Escape');
  key('keydown','KeyP');key('keydown','KeyC');key('keydown','KeyW');
  assert.equal(pauseCalls,0,'home cannot pause or resume');assert.equal(cameraCalls,0);assert.equal(homeEscape.prevented,false,'home dialogs keep native Escape');assert.deepEqual(input.read(),neutral);
  input.setActive(true);
  assert(key('keydown','KeyW').prevented);key('keydown','KeyD');key('keydown','ShiftLeft');
  assert.deepEqual(input.read(),{throttle:1,brake:0,steer:1,handbrake:0,boost:true});
  key('keyup','KeyD');key('keyup','ShiftLeft');assert.equal(input.read().steer,0);assert.equal(input.read().boost,false);
  key('keydown','KeyC');key('keydown','KeyC',{repeat:true});assert.equal(cameraCalls,1,'camera ignores key repeat');
  const field=new Surface();field.field=true;key('keydown','KeyS',{target:field});assert.equal(input.read().brake,0,'text fields do not drive');
  const pauseEvent=key('keydown','KeyP');assert(pauseEvent.prevented);assert(paused);assert(!input.active);assert.deepEqual(input.read(),neutral);
  const repeatEscape=key('keydown','Escape',{repeat:true});assert(repeatEscape.prevented,'paused modal cannot close via native repeated Escape');assert.equal(pauseCalls,1);
  const resumeEvent=key('keydown','Escape');assert(resumeEvent.prevented,'resuming consumes Escape before dialog cancel');assert(!paused);assert(input.active);assert.equal(pauseCalls,2);assert.deepEqual(input.read(),neutral,'resume clears stale throttle');

  const gas=controls.find(button=>button.dataset.control==='throttle'),left=controls[0];
  gas.dispatch('pointerdown',{pointerId:10});left.dispatch('pointerdown',{pointerId:11});
  assert.deepEqual(input.read(),{throttle:1,brake:0,steer:-1,handbrake:0,boost:false});assert(gas.classes.has('pressed'));
  gas.dispatch('pointerdown',{pointerId:12});gas.dispatch('pointerup',{pointerId:10});assert.equal(input.read().throttle,1,'second finger keeps same pedal pressed');assert(gas.classes.has('pressed'));
  gas.dispatch('pointercancel',{pointerId:12});left.dispatch('lostpointercapture',{pointerId:11});assert.deepEqual(input.read(),neutral);assert(!gas.classes.has('pressed'));
  key('keydown','ArrowUp');gas.dispatch('pointerdown',{pointerId:13});win.dispatch('blur');assert.deepEqual(input.read(),neutral,'blur releases every input');
  key('keydown','ArrowLeft');doc.hidden=true;doc.dispatch('visibilitychange');assert.deepEqual(input.read(),neutral,'hidden page releases input');doc.hidden=false;

  const pad={connected:true,axes:[.56],buttons:Array.from({length:16},()=>({pressed:false,value:0}))};gamepads=[null,pad];pad.buttons[7].value=.73;pad.buttons[6].value=.2;
  const analog=input.read();assert(Math.abs(analog.steer-.5)<1e-10);assert.equal(analog.throttle,.73);assert.equal(analog.brake,.2);
  pad.buttons[9].pressed=true;const pausedRead=input.read();assert(paused);assert.deepEqual(pausedRead,neutral,'same frame as START returns neutral controls');const afterPause=pauseCalls;
  for(let i=0;i<10;i++)input.read();assert.equal(pauseCalls,afterPause,'held START cannot rapidly toggle pause');
  pad.buttons[9].pressed=false;input.read();pad.buttons[9].pressed=true;input.read();assert(!paused);assert(input.active);assert.equal(pauseCalls,afterPause+1,'START resumes from inactive pause state');
  input.read();assert.equal(pauseCalls,afterPause+1,'resume remains edge-latched');
  pad.buttons[9].pressed=false;input.read();input.setActive(false);const beforeHome=pauseCalls;pad.buttons[9].pressed=true;assert.deepEqual(input.read(),neutral);assert.equal(pauseCalls,beforeHome,'home ignores START');
  input.setActive(true);input.read();assert.equal(pauseCalls,beforeHome,'START held from home does not pause new race');
  gamepads=[];input.read();gamepads=[pad];pad.buttons[9].pressed=false;pad.axes[0]=Infinity;pad.buttons[7].value=NaN;pad.buttons[6].value=5;
  const bounded=input.read();assert.equal(bounded.steer,0);assert.equal(bounded.throttle,0);assert.equal(bounded.brake,1,'untrusted controller ranges bounded');
  globalThis.navigator.getGamepads=()=>{throw new Error('gamepad denied');};assert.deepEqual(input.read(),neutral,'denied gamepad API remains playable');
  input.dispose();key('keydown','KeyW');gas.dispatch('pointerdown',{pointerId:20});assert.deepEqual(input.read(),neutral,'dispose removes event handlers');
  console.log('Remake input: keyboard, pointers, focus loss, pause/resume, gamepad edge latching, inactive controls and disposal verified.');
}finally{input.dispose();if(previousNavigator)Object.defineProperty(globalThis,'navigator',previousNavigator);else delete globalThis.navigator;}
