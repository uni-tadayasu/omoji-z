/** Execute the actual classic handlers against nested-dialog and controller transitions. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../assets/game.js',import.meta.url),'utf8');
function method(start,end){const at=source.indexOf(start);assert(at>=0,`Missing ${start}`);const to=source.indexOf(end,at+start.length);assert(to>at);return source.slice(at,to);}
const pieces=[method('key(e,t){','setInput(e,t){'),method('clearInputs(){','queueShift(e){'),method('pollGamepad(){','onPadFrame(){'),method('resume(){','restart(){')];
const doc={hidden:false};let pad={pause:0},frames=0,cleared=0;
const context=vm.createContext({E1:{KeyW:'accelerate',Space:'handbrake'},A1:{KeyQ:-1,KeyE:1},document:doc,S1:()=>pad,
 omojiClearDrivingState:()=>cleared++,requestAnimationFrame:()=>++frames,cancelAnimationFrame:()=>{}});
vm.runInContext('globalThis.handlers={'+pieces.join(',')+'};',context);
let blocked=false,toggles=0,resumes=0,cameras=0,shifts=0;
const handlers=context.handlers;
const race={...handlers,status:'paused',canvas:{closest:selector=>{assert.equal(selector,'[inert]');return blocked?{}:null;}},
 player:{transmission:'mt'},heldKeys:new Set(),heldActions:new Set(),gamepadSuspended:false,padButtons:{pause:0},
 togglePause(){toggles++;this.status=this.status==='paused'?'running':'paused';},queueShift(){shifts++;},cycleCamera(){cameras++;},resetCar(){},
 canResume:()=>true,onPause:value=>{assert.equal(value,false);resumes++;},frame(){},resumeStatus:'running'};
const event=(code,options={})=>({code,repeat:false,target:null,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;},stopPropagation(){},...options});
// Closing nested settings with Escape must not also resume the background race.
race.key(event('Escape',{defaultPrevented:true}),true);assert.equal(toggles,0);assert.equal(race.status,'paused');
blocked=true;race.heldKeys.add('KeyW');race.heldActions.add('accelerate');race.pendingShift=1;
race.key(event('Escape'),true);assert.equal(toggles,0);assert.equal(race.heldKeys.size,0);assert.equal(race.heldActions.size,0);assert.equal(race.pendingShift,0);
race.resume();assert.equal(resumes,0);assert.equal(race.status,'paused');
// Pad polling still latches edges under the modal; dismissal with a held button is neutral.
pad={pause:1,camera:1,gearUp:1,accelerate:1};race.pollGamepad();assert.equal(toggles,0);assert.equal(race.gamepadControls,null);assert.equal(cameras,0);assert.equal(shifts,0);
blocked=false;race.pollGamepad();assert.equal(toggles,0);assert.equal(race.status,'paused');
pad={pause:0,camera:0,gearUp:0,accelerate:0};race.pollGamepad();pad={...pad,pause:1};race.pollGamepad();assert.equal(toggles,1);assert.equal(race.status,'running');
// Real keyboard/gamepad controls still operate when the race owns input.
race.key(event('KeyW'),true);assert(race.heldKeys.has('KeyW'));
race.key(event('KeyW',{defaultPrevented:true}),false);assert.equal(race.heldKeys.size,0,'A consumed keyup must release the key');
race.key(event('KeyE'),true);assert.equal(shifts,1);race.key(event('KeyC'),true);assert.equal(cameras,1);
race.status='paused';race.resume();assert.equal(resumes,1);assert.equal(race.status,'running');assert.equal(frames,1);
// Online exit-menu pause toggling remains available; it deliberately uses gamepadSuspended.
race.gamepadSuspended=true;pad={pause:0};race.pollGamepad();pad={pause:1};race.pollGamepad();assert.equal(toggles,2);
// Page visibility cancels held input without replaying the button when focus returns.
race.heldKeys.add('KeyW');race.heldActions.add('accelerate');doc.hidden=true;pad={pause:0};race.pollGamepad();assert.equal(race.heldKeys.size,0);assert.equal(race.heldActions.size,0);assert.equal(race.gamepadControls,null);
assert(cleared>=3);
console.log('Classic input quality: nested settings Escape, inert keyboard/pad ownership, edge latching, resume guard, online menu toggle and hidden-page release passed.');
