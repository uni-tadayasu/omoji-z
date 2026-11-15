/** Physical controls are kept independent from render and simulation rates. */
export class DrivingInput {
  constructor({document:doc=globalThis.document, window:win=globalThis.window, onPause=()=>{},onCamera=()=>{},isPaused=()=>false}={}) {
    this.doc=doc;this.win=win;this.keys=new Set();this.pointers=new Map();this.active=false;this.gamepadPause=false;this.abort=new AbortController();this.isPaused=isPaused;
    const signal=this.abort.signal;
    doc.addEventListener('keydown',event=>{
      if(event.target?.closest?.('input,select,textarea'))return;
      if(event.code==='Escape'||event.code==='KeyP'){
        if(this.active||this.isPaused()){event.preventDefault();if(!event.repeat)onPause();}
        return;
      }
      if(!this.active)return;
      if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','ShiftLeft','ShiftRight','KeyW','KeyA','KeyS','KeyD'].includes(event.code)){event.preventDefault();this.keys.add(event.code);}
      if(event.code==='KeyC'&&!event.repeat){event.preventDefault();onCamera();}
    },{signal});
    doc.addEventListener('keyup',event=>this.keys.delete(event.code),{signal});
    win.addEventListener('blur',()=>this.clear(),{signal});
    doc.addEventListener('visibilitychange',()=>{if(doc.hidden)this.clear();},{signal});
    doc.querySelectorAll('[data-control]').forEach(button=>{
      button.addEventListener('pointerdown',event=>{if(!this.active)return;event.preventDefault();button.setPointerCapture?.(event.pointerId);this.pointers.set(event.pointerId,button.dataset.control);button.classList.add('pressed');},{signal});
      const release=event=>{this.pointers.delete(event.pointerId);if(![...this.pointers.values()].includes(button.dataset.control))button.classList.remove('pressed');};
      for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,release,{signal});
      button.addEventListener('contextmenu',event=>event.preventDefault(),{signal});
    });
    this.onPause=onPause;
  }
  read(){
    const neutral=()=>({throttle:0,brake:0,steer:0,handbrake:0,boost:false});
    if(this.disposed)return neutral();
    let pad=null;
    try{pad=[...(globalThis.navigator?.getGamepads?.()||[])].find(value=>value?.connected)||null;}catch{}
    const pause=pad?.buttons?.[9]?.pressed===true,pauseEdge=pause&&!this.gamepadPause;
    // Latch before the callback, which may clear controls while opening or closing a modal.
    this.gamepadPause=pause;
    if(pauseEdge&&(this.active||this.isPaused()))this.onPause();
    if(!this.active)return neutral();
    const has=(...keys)=>keys.some(key=>this.keys.has(key)),touch=control=>[...this.pointers.values()].includes(control);
    const input={throttle:Number(has('KeyW','ArrowUp')||touch('throttle')),brake:Number(has('KeyS','ArrowDown')||touch('brake')),steer:Number(has('KeyD','ArrowRight')||touch('right'))-Number(has('KeyA','ArrowLeft')||touch('left')),handbrake:Number(has('Space')||touch('handbrake')),boost:has('ShiftLeft','ShiftRight')||touch('boost')};
    if(pad){
      const bounded=value=>Number.isFinite(value)?Math.max(0,Math.min(1,value)):0;
      const axis=Number.isFinite(pad.axes?.[0])?Math.max(-1,Math.min(1,pad.axes[0])):0;
      if(Math.abs(axis)>.12)input.steer=Math.sign(axis)*(Math.abs(axis)-.12)/.88;
      input.throttle=Math.max(input.throttle,bounded(pad.buttons?.[7]?.value),bounded(pad.buttons?.[0]?.value));
      input.brake=Math.max(input.brake,bounded(pad.buttons?.[6]?.value));input.handbrake=Math.max(input.handbrake,bounded(pad.buttons?.[1]?.value));input.boost ||= pad.buttons?.[4]?.pressed===true;
    }
    return input;
  }
  clear(){this.keys.clear();this.pointers.clear();this.doc.querySelectorAll('[data-control]').forEach(button=>button.classList.remove('pressed'));}
  setActive(value){this.active=!!value;this.clear();}
  dispose(){this.disposed=true;this.active=false;this.abort.abort();this.clear();}
}
