/** Driving input, optional safety aids, and practical training. Units: m, s, m/s. */
const clamp = (value, min, max) => Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
const lerp = (a, b, t) => a + (b - a) * clamp(t, 0, 1);
const approach = (value, target, speed, dt) => value + clamp(target - value, -speed * dt, speed * dt);
const fade = (rate, dt) => 1 - Math.exp(-rate * dt);
const KEY = 'omoji-z.driving.v3';
export const DRIVING_PRESETS = Object.freeze({
  beginner: Object.freeze({id:'beginner', label:'ビギナー', assist:true, transmission:'at',
    rackRate:2.05, returnRate:3.7, lockAtSpeed:.47, analogCenter:.47, brakeAssist:.98, safety:.82, preview:3.6}),
  balanced: Object.freeze({id:'balanced', label:'バランス', assist:true, transmission:'at',
    rackRate:2.65, returnRate:4.8, lockAtSpeed:.56, analogCenter:.58, brakeAssist:.76, safety:.90, preview:3.1}),
  sport: Object.freeze({id:'sport', label:'スポーツ', assist:false, transmission:null,
    rackRate:3.55, returnRate:6.1, lockAtSpeed:.72, analogCenter:.72, brakeAssist:.48, safety:.98, preview:2.6})
});
let preferences = {preset:'beginner', analogTouch:true, tutorialComplete:false};
let installed = null;
const states = new WeakMap();
const training = {active:false, phase:0, value:0, armed:false, vehicle:null, finishedAt:0};
export function drivingPreset(value = preferences.preset) { return DRIVING_PRESETS[value] || DRIVING_PRESETS.beginner; }
function stateFor(vehicle) {
  let state = states.get(vehicle);
  if (!state) { state = {rack:0, reverseHold:0, previewAge:1, previewDistance:-1e6, previewSpeed:0, preview:null}; states.set(vehicle,state); }
  return state;
}
export function clearDrivingState(vehicle) {
  if (vehicle && typeof vehicle==='object') { states.delete(vehicle); vehicle.omojiDigitalSteer=0; }
}

/** Constant-input ramps are independent of event repeat and display frame rate. */
export function drivingSteering(vehicle, demand, profile, speed, handbrake, dt) {
  const state=stateFor(vehicle), preset=drivingPreset(vehicle.omojiDrivePreset);
  const step=clamp(dt,0,.1), pace=clamp(Math.abs(speed)/80,0,1);
  const raw=clamp(demand,-1,1), analog=profile!=='digital';
  const dead=analog?.025:0, magnitude=Math.max(0,(Math.abs(raw)-dead)/(1-dead));
  const shaped=analog?preset.analogCenter*magnitude+(1-preset.analogCenter)*magnitude**3:magnitude;
  const lock=lerp(.96,preset.lockAtSpeed,pace*pace);
  const target=Math.sign(raw)*shaped*(handbrake>.1?Math.max(.78,lock):lock);
  const returning=!raw || target*state.rack<0;
  const rate=(returning?preset.returnRate:preset.rackRate)*(analog?1.35:1)*lerp(1,.65,pace);
  state.rack=approach(state.rack,target,rate,step);
  vehicle.omojiDigitalSteer=analog?0:state.rack;
  return state.rack;
}

/** No lane-centering or steering towards the road tangent: the driver chooses the line. */
export function drivingYaw(vehicle, route, road, limit, pace, command, intended, slide, handbrake) {
  const speed=Math.abs(vehicle.speed);
  if(speed<3.5 || handbrake>.08 || slide>.025) return clamp(command,-limit,limit);
  const mu=drivingFriction(vehicle.stats, route, vehicle.distance);
  const available=Math.min(limit,(9.35*mu)/Math.max(speed,7));
  const stability=vehicle.omojiDrivingAssist===true?clamp(vehicle.slipAngle||0,-.15,.15)*.32:0;
  const target=command-stability;
  return clamp(target,-available,available);
}

export function drivingFriction(stats={}, route={}, distance=0) {
  const surface=route.gripAt?.(distance) ?? route.track?.grip ?? 1;
  const tyre=route.track?.wet?(stats.wetGrip??0):(stats.dryGrip??0);
  return clamp((stats.grip||1)*surface*(1+tyre),.25,1.9);
}

/** Brake to a future curve using v² = v_corner² + 2 a distance; never steers the car. */
export function cornerSpeedEnvelope(vehicle, route, preset=drivingPreset(vehicle.omojiDrivePreset)) {
  const speed=Math.max(0,vehicle.speed||0), stats=vehicle.stats||{};
  const current=clamp(vehicle.distance||0,-30,Math.max(1,route.length||1e6));
  const mu=drivingFriction(stats,route,current);
  const currentRoad=route.sample?.(current,{})||{};
  const braking=clamp(8.6*mu*(stats.brakeForce??1) - Math.max(0,-(currentRoad.grade||0))*9.81,2.2,13.5);
  const lookahead=clamp(20+speed*preset.preview+.46*speed*speed/(2*braking),40,760);
  let allowed=Math.max(5,(stats.topSpeed||190)/3.6), cornerLimit=allowed, cornerDistance=0;
  for(let distance=0;distance<=lookahead;distance+=Math.max(5,lookahead/42)) {
    const point=route.sample?.(Math.min(current+distance,route.length||1e6),{})||{};
    const curvature=Math.abs(point.curve||0);
    if(curvature<.00012) continue;
    const friction=drivingFriction(stats,route,current+distance);
    const bendSpeed=Math.sqrt((8.5*friction*preset.safety)/Math.max(curvature,.00012));
    const candidate=Math.sqrt(bendSpeed*bendSpeed+2*braking*Math.max(0,distance-4-speed*.13));
    if(candidate<allowed) {allowed=candidate;cornerLimit=bendSpeed;cornerDistance=distance;}
  }
  return {safeSpeed:Math.max(3,allowed),cornerSpeed:Math.max(3,cornerLimit),distance:cornerDistance,braking,lookahead};
}

export function prepareRaceInput(game, input) {
  const preset=drivingPreset();
  return {...input,drivingPreset:preset.id,drivingHuman:true,drivingAssist:game.assist===true,
    steeringProfile:input.steeringProfile||'analog'};
}

export function prepareDrivingInput(vehicle, input, route, dt) {
  if(!input?.drivingHuman) return input;
  const step=clamp(dt,0,.1), state=stateFor(vehicle), preset=drivingPreset(input.drivingPreset);
  vehicle.omojiDrivePreset=preset.id;
  vehicle.omojiDrivingAssist=input.drivingAssist===true;
  const manualBrake=clamp(input.brake||0,0,1), manualThrottle=clamp(input.throttle||0,0,1);
  const out={...input,throttle:manualThrottle,brake:manualBrake,reverse:false};
  // A held brake stops first. Reverse requires a deliberate hold after coming to rest.
  if(manualBrake>.55 && manualThrottle<.08 && Math.abs(vehicle.speed)<.30)state.reverseHold+=step;
  else state.reverseHold=0;
  if(state.reverseHold>.8)out.reverse=true;
  if(vehicle.speed<-.3 && manualBrake>.2 && manualThrottle<.08)out.reverse=true;
  state.previewAge+=step;
  if(input.drivingAssist && (input.handbrake||0)<.08 && vehicle.speed>2) {
    if(!state.preview || state.previewAge>.12 || Math.abs(vehicle.distance-state.previewDistance)>15 || Math.abs(vehicle.speed-state.previewSpeed)>5) {
      state.preview=cornerSpeedEnvelope(vehicle,route,preset);state.previewAge=0;
      state.previewDistance=vehicle.distance;state.previewSpeed=vehicle.speed;
    }
    const excess=vehicle.speed-state.preview.safeSpeed;
    const assistBrake=clamp(excess/Math.max(3.8,Math.abs(vehicle.speed)*.12),0,1)*preset.brakeAssist;
    out.brake=Math.max(out.brake,assistBrake);
    out.throttle*=1-clamp(assistBrake*1.4,0,1);
    const slip=Math.max(Math.abs(vehicle.slipAngle||0),vehicle.slip||0);
    const traction=clamp((slip-.13)*1.25,0,.55)*(1-clamp(vehicle.stats.tractionAid||0,0,.8));
    out.throttle*=1-traction;
    vehicle.omojiBrakeAssistance=assistBrake;
    vehicle.omojiSafeCornerKph=Math.round(state.preview.cornerSpeed*3.6/5)*5;
  } else {vehicle.omojiBrakeAssistance=0;vehicle.omojiSafeCornerKph=null;}
  // Human brake priority is applied to every car, not only one operator vehicle.
  if(out.brake>.06)out.throttle*=1-clamp(out.brake*1.55,0,1);
  if(out.brake>.65)out.throttle=0;
  out.reverse=out.reverse && out.brake===manualBrake;
  trainingTick(vehicle,{...input,brake:manualBrake,throttle:manualThrottle},route,step);
  return out;
}

function rating(stats) {
  return (stats.topSpeed||190)*1.1+Math.sqrt(Math.max(1,stats.power||150)/Math.max(500,stats.mass||1200))*650+
    (stats.grip||1)*80+(stats.handling||1)*60;
}
export function matchedCpuCar(cars, excluded=new Set(), reference=null, difficulty='normal', rate=rating, random=Math.random) {
  const available=cars.filter(car=>!excluded.has(car.id));
  const source=available.length?available:cars;
  if(!source.length)return null;
  const base=reference||source[0], target=rate(base)*({easy:.91,normal:.98,hard:1.015,master:1.035,legend:1.055}[difficulty]||.98);
  const ordered=source.map(car=>({car,gap:Math.abs(rate(car)-target)/Math.max(1,target)})).sort((a,b)=>a.gap-b.gap);
  const tolerance=Math.max(.075,ordered[0].gap+.025);
  const pool=ordered.filter(entry=>entry.gap<=tolerance).slice(0,24);
  const weights=pool.map(entry=>Math.exp(-entry.gap*16)), total=weights.reduce((a,b)=>a+b,0);
  let draw=clamp(random(),0,.9999999)*total;
  for(let index=0;index<pool.length;index++){draw-=weights[index];if(draw<=0)return pool[index].car;}
  return pool.at(-1).car;
}

function savePreferences() {try{globalThis.localStorage?.setItem(KEY,JSON.stringify(preferences));}catch{}}
function readPreferences() {
  let loaded=false;
  try { const value=JSON.parse(globalThis.localStorage?.getItem(KEY)||'null');if(value&&typeof value==='object') {
    if(Object.hasOwn(DRIVING_PRESETS,value.preset)){preferences.preset=value.preset;loaded=true;}
    if(typeof value.analogTouch==='boolean')preferences.analogTouch=value.analogTouch;
    preferences.tutorialComplete=value.tutorialComplete===true;
  }}catch{}
  return loaded;
}
function emitPreference() {
  if(typeof globalThis.dispatchEvent==='function'&&typeof CustomEvent==='function')globalThis.dispatchEvent(new CustomEvent('omoji:driving-preset-changed',{detail:{preset:preferences.preset,...drivingPreset()}}));
}
function applyPreset(name) {
  if(!Object.hasOwn(DRIVING_PRESETS,name))return false;
  preferences.preset=name;savePreferences();installed?.onPreset?.(drivingPreset());
  clearDrivingState(installed?.getRace?.()?.player);emitPreference();return true;
}
export function drivingPreferences() {return {...preferences};}
function startTraining() {
  applyPreset('beginner');Object.assign(training,{active:true,phase:0,value:0,armed:false,vehicle:null,finishedAt:0});
  const game=installed?.getRace?.();
  if(!game||!['running','countdown'].includes(game.status))installed?.onTutorialStart?.();
  renderCoach();return true;
}
export function startDrivingTutorial() {return startTraining();}
export function drivingTrainingStatus() {return {active:training.active,phase:training.phase,progress:training.value,complete:preferences.tutorialComplete};}
function trainingTick(vehicle,input,route,dt) {
  if(!training.active||training.phase>=3)return;
  if(training.vehicle!==vehicle){training.vehicle=vehicle;training.phase=0;training.value=0;training.armed=false;}
  const speed=Math.max(0,vehicle.speed||0);
  if(training.phase===0) {
    if(speed>=9.7&&input.throttle>.15&&vehicle.impact<.18)training.value+=dt;
    else training.value=Math.max(0,training.value-dt*.4);
    if(training.value>=1.5){training.phase=1;training.value=0;training.armed=true;}
  } else if(training.phase===1) {
    if(speed>=9.7)training.armed=true;
    if(training.armed&&input.brake>.25&&speed<3.4){training.phase=2;training.value=0;}
  } else if(training.phase===2) {
    const margin=(route.width||10)/2-(vehicle.stats.dimensions?.[1]||1.8)/2-.25;
    if(speed>4&&speed<24&&Math.abs(input.steering)>.1&&Math.abs(vehicle.slipAngle||0)<.19&&vehicle.impact<.15&&Math.abs(vehicle.offset)<margin)training.value+=dt;
    else training.value=Math.max(0,training.value-dt*.25);
    if(training.value>=2){training.phase=3;training.finishedAt=Date.now();preferences.tutorialComplete=true;savePreferences();}
  }
}
function renderCoach() {
  const panel=installed?.coach;if(!panel)return;
  if(training.phase>=3&&training.finishedAt&&Date.now()-training.finishedAt>12000)training.active=false;
  const game=installed.getRace?.(), open=!!game&&['countdown','running'].includes(game.status);
  panel.hidden=!training.active||!open;
  if(panel.hidden)return;
  const phases=[['1 / 3 発進','アクセルをゆっくり開け、35 km/h以上を1.5秒保ちます。'],['2 / 3 減速','ブレーキを押し、12 km/h未満まで減速します。'],['3 / 3 旋回','15〜85 km/hで左右に操作し、道路の内側で滑らかに2秒曲がります。'],['基本操作クリア','発進・減速・旋回を練習できました。次は補助を少しずつ減らせます。']];
  const text=phases[Math.min(training.phase,3)];
  panel.querySelector('strong').textContent=text[0];panel.querySelector('[data-coach-copy]').textContent=text[1];
  panel.querySelector('progress').value=training.phase>=3?1:training.phase===1?0:clamp(training.value/(training.phase===0?1.5:2),0,1);
}

export function bindAnalogSteering(race,setAction,clearButtons=()=>{}) {
  readPreferences();
  const left=race.querySelector('button[data-action="left"]'), right=race.querySelector('button[data-action="right"]');
  if(!left||!right)return {clear(){}};
  const group=left.parentElement;group.dataset.steerMode=preferences.analogTouch?'analog':'buttons';
  const control=document.createElement('div');control.className='driving-touch';control.dataset.drivingAnalog='';
  control.innerHTML='<div class="driving-slider" role="slider" tabindex="0" aria-label="左右にスライドしてハンドル操作" aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0"><span class="driving-slider-line" aria-hidden="true"></span><span class="driving-slider-thumb" aria-hidden="true"></span><small aria-hidden="true">← スライド →</small></div><button type="button" class="driving-touch-mode" aria-label="左右ボタン操作へ切り替える">ボタン</button>';
  group.prepend(control);const slider=control.querySelector('[role="slider"]'), toggle=control.querySelector('button');
  toggle.textContent=preferences.analogTouch?'ボタン':'スライド';
  toggle.setAttribute('aria-label',preferences.analogTouch?'左右ボタン操作へ切り替える':'スライド操作へ切り替える');
  let pointer=null, value=0;
  function emit(next,active=true) {
    value=clamp(next,-1,1);setAction('analogSteeringActive',active);setAction('analogSteering',value);
    slider.style.setProperty('--steer',String(value));slider.setAttribute('aria-valuenow',String(Math.round(value*100)));
    slider.setAttribute('aria-valuetext',value<-.04?`左 ${Math.round(-value*100)}%`:value>.04?`右 ${Math.round(value*100)}%`:'中央');
  }
  function update(event) {const box=slider.getBoundingClientRect();emit((event.clientX-box.left-box.width/2)/Math.max(44,box.width*.43));}
  function clear() {const released=pointer;pointer=null;if(released!==null&&slider.hasPointerCapture?.(released)){try{slider.releasePointerCapture(released);}catch{}}emit(0,false);}
  slider.addEventListener('pointerdown',event=>{if(event.button!==0||pointer!==null)return;event.preventDefault();pointer=event.pointerId;try{slider.setPointerCapture(pointer);}catch{}update(event);});
  slider.addEventListener('pointermove',event=>{if(event.pointerId!==pointer)return;event.preventDefault();update(event);},{passive:false});
  for(const type of ['pointerup','pointercancel','lostpointercapture'])slider.addEventListener(type,event=>{if(pointer===event.pointerId)clear();});
  for(const type of ['blur','pagehide'])globalThis.addEventListener(type,clear);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});race.addEventListener('close',clear);
  slider.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End','Escape'].includes(event.key))return;event.preventDefault();event.stopPropagation();if(event.key==='Escape'||event.key==='Home')clear();else emit(event.key==='End'?1:clamp(value+(event.key==='ArrowRight'?.12:-.12),-1,1));});
  slider.addEventListener('keyup',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();event.stopPropagation();clear();}});
  slider.addEventListener('blur',clear);
  toggle.addEventListener('click',()=>{clearButtons();clear();preferences.analogTouch=!preferences.analogTouch;savePreferences();group.dataset.steerMode=preferences.analogTouch?'analog':'buttons';toggle.textContent=preferences.analogTouch?'ボタン':'スライド';toggle.setAttribute('aria-label',preferences.analogTouch?'左右ボタン操作へ切り替える':'スライド操作へ切り替える');});
  return {clear};
}

export function installDrivingControls(options) {
  if(installed)return installed;
  const hadProfile=readPreferences();installed=options;
  globalThis.omojiApplyDrivingPreset=applyPreset;globalThis.omojiStartDrivingTutorial=startTraining;globalThis.omojiDrivingPreferences=drivingPreferences;
  if(!document.querySelector('link[href*="driving.css"]')) {
    const style=document.createElement('link');style.rel='stylesheet';style.dataset.drivingStyle='';style.href=new URL('./driving.css',import.meta.url).href;document.head.append(style);
  }
  const race=document.getElementById('race');
  if(race){const coach=document.createElement('section');coach.className='driving-coach';coach.dataset.drivingCoach='';coach.hidden=true;coach.setAttribute('aria-label','基本操作練習');coach.innerHTML='<strong></strong><p data-coach-copy></p><progress max="1" value="0" aria-label="現在の練習目標"></progress><button type="button" aria-label="練習表示を閉じる">閉じる</button>';coach.querySelector('button').addEventListener('click',()=>{training.active=false;coach.hidden=true;});race.append(coach);installed.coach=coach;}
  document.addEventListener('click',event=>{if(event.target.closest?.('[data-driving-tutorial]')){event.preventDefault();startTraining();}});
  globalThis.addEventListener('omoji:driving-preset',event=>applyPreset(event.detail?.preset));
  globalThis.addEventListener('omoji:driving-preset-request-current',emitPreference);
  if(!hadProfile){options.onPreset?.(drivingPreset());savePreferences();}emitPreference();
  const tick=()=>{renderCoach();if(installed){installed.timer=globalThis.setTimeout(tick,180);installed.timer?.unref?.();}};tick();
  return installed;
}
