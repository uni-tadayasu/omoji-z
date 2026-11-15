import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';
import { vehicleCatalog } from '../assets/vehicles.js';
import { TRACKS, createTrack } from '../assets/remake/tracks.js';
import { RaceSimulation, formatTime } from '../assets/remake/physics.js';
import * as profileModule from '../assets/remake/profile.js';

// Real production DOM, app event handlers, input, audio lifecycle, save layer and physics.
// Only unavailable platform surfaces (GPU, media playback, modal top layer, RAF) are stubbed.
const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const errors = [], calls = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => errors.push(error));
const dom = new JSDOM(read('index.html'), {
  url: 'https://omoji-z.example/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole
});
const { window } = dom, { document } = window;
const context = dom.getInternalVMContext();
const select = selector => { const element = document.querySelector(selector); assert(element, `Missing UI control ${selector}`); return element; };
const flush = async () => { for (let count = 0; count < 6; count++) await Promise.resolve(); await new Promise(resolve => setImmediate(resolve)); };
const click = async selector => { select(selector).click(); await flush(); };
const change = async (selector, value, type = 'change') => { const node = select(selector); node.value = value; node.dispatchEvent(new window.Event(type, { bubbles: true })); await flush(); };
const key = async code => { document.dispatchEvent(new window.KeyboardEvent('keydown', { code, bubbles: true, cancelable: true })); await flush(); };
window.scrollTo = () => {};
window.requestAnimationFrame = () => 1;
window.cancelAnimationFrame = () => {};
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new window.Event('close')); };
window.Audio = class {
  constructor() { this.paused = true; this.currentTime = 0; this.volume = 1; calls.push(['audio.create']); }
  play() { this.paused = false; calls.push(['audio.play', this.src]); return Promise.resolve(); }
  pause() { this.paused = true; }
  removeAttribute() {}
  load() {}
};
window.navigator.getGamepads = () => [];
let lockTail = Promise.resolve();
Object.defineProperty(window.navigator, 'locks', { value: { request(_name, operation) { const result = lockTail.then(operation); lockTail = result.catch(() => {}); return result; } } });
class RendererStub {
  constructor(canvas, options) { assert.equal(canvas.id, 'scene'); this.options = options; calls.push(['renderer.create']); }
  setTrack(track) { calls.push(['track', track.id]); }
  setCar(car, paint) { calls.push(['car', car.id, paint]); }
  setMode(mode) { calls.push(['mode', mode]); }
  setCamera(mode) { calls.push(['camera', mode]); }
  setQuality(quality) { calls.push(['quality', quality]); }
  resize() { calls.push(['resize']); }
  render(state) { this.lastState = state; }
}
Object.assign(window, { vehicleCatalog, TRACKS, createTrack, RaceSimulation, formatTime, GameRenderer: RendererStub, ...profileModule,
  loadProfile: () => profileModule.loadProfile(window.localStorage),
  saveProfile: profile => profileModule.saveProfile(profile, window.localStorage)
});
// Evaluate input and audio in the DOM realm so Event/AbortSignal brands match the real DOM.
vm.runInContext(read('assets/remake/input.js').replace('export class DrivingInput', 'class DrivingInput') + '\nglobalThis.DrivingInput = DrivingInput;', context);
vm.runInContext(`(()=>{${read('assets/remake/audio.js').replace('export class GameAudio', 'class GameAudio').replaceAll('import.meta.url', JSON.stringify(new URL('assets/remake/audio.js', root).href))}\nglobalThis.GameAudio=GameAudio;})()`, context);
const app = read('assets/remake/app.js').replace(/^import\s+[^\n]+\n/gm, '');
vm.runInContext(app + '\nglobalThis.__uiTest={snapshot:()=>({profile,track,mode,simulation,audio,input,currentPanel,sessionId}),frame,finishRace};', context, { filename: fileURLToPath(new URL('assets/remake/app.js', root)) });
const state = () => window.__uiTest.snapshot();
const saved = () => JSON.parse(window.localStorage.getItem(profileModule.PROFILE_KEY));
const latestCall = name => calls.filter(call => call[0] === name).at(-1);

try {
  assert.equal(errors.length, 0, 'startup has no DOM errors');
  assert.equal(select('#loading').hidden, true);
  assert.equal(select('#car-name').textContent, vehicleCatalog.find(car => car.id === 'hachi').name);
  assert.equal(saved().credits, 12000);

  await click('[data-open="garage"]');
  assert.equal(select('#car-count').textContent, '3台');
  await change('#car-filter', 'all');
  assert.equal(select('#car-count').textContent, '512台');
  assert.equal(document.querySelectorAll('#car-list .car-card').length, 18, 'catalog is paginated');
  await click('[data-page="1"]');
  assert.match(select('#car-paging').textContent, /2 \/ 29/);
  await change('#car-search', 'OZ-003', 'input');
  assert.equal(select('#car-count').textContent, '1台');
  assert(select('[data-car="kagero"]'));
  await change('#car-search', 'not-a-real-car-8831', 'input');
  assert.equal(select('#car-count').textContent, '0台');
  assert.match(select('#car-list').textContent, /該当する車両がありません/);
  await change('#car-search', 'OZ-003', 'input');
  await click('[data-car="kagero"]');
  assert.equal(saved().selectedCar, 'kagero');
  assert.equal(select('#panel').open, false);
  assert.equal(latestCall('car')[1], 'kagero');

  await click('[data-open="tracks"]');
  assert.equal(document.querySelectorAll('[data-track]').length, TRACKS.length);
  await click(`[data-track="${TRACKS[1].id}"]`);
  assert.equal(saved().selectedTrack, TRACKS[1].id);
  assert.equal(select('#track-name').textContent, TRACKS[1].name);
  assert.equal(latestCall('track')[1], TRACKS[1].id);
  await click('[data-mode="time"]');
  assert(select('#difficulty').disabled); assert(!select('#laps').disabled);
  await click('[data-mode="free"]');
  assert(select('#difficulty').disabled); assert(select('#laps').disabled);
  await click('[data-mode="race"]');
  assert(!select('#difficulty').disabled); assert(!select('#laps').disabled);
  assert.equal(select('[data-mode="race"]').getAttribute('aria-pressed'), 'true');

  await click('[data-open="workshop"]');
  const beforeUpgrade = saved().credits;
  await click('[data-upgrade="engine"]');
  assert.equal(saved().credits, beforeUpgrade - 2500);
  assert.equal(saved().upgrades.kagero.engine, 1);
  assert.match(select('[data-upgrade="engine"]').textContent, /5,000/);
  await click('[data-paint="#164e8c"]');
  assert.equal(saved().paint, '#164e8c'); assert.equal(latestCall('car')[2], '#164e8c');
  await change('#custom-paint', '#9165be');
  assert.equal(saved().paint, '#9165be'); assert.equal(latestCall('car')[2], '#9165be');
  await click('[data-close]');

  await click('[data-open="settings"]');
  await click('#mute'); assert.equal(saved().muted, true); assert.equal(state().audio.muted, true);
  await change('#volume', '62', 'input'); await change('#volume', '62');
  assert.equal(saved().volume, .62); assert.equal(state().audio.volume, .62);
  await change('#quality', 'low'); assert.equal(saved().quality, 'low'); assert.equal(latestCall('quality')[1], 'low');
  await click('#mute'); assert.equal(saved().muted, false);
  await click('[data-close]');

  await click('#start');
  assert(state().simulation instanceof RaceSimulation);
  assert.equal(state().simulation.state.opponents.length, 3);
  assert.equal(select('#shell').hidden, true); assert.equal(select('#race-ui').hidden, false);
  assert.equal(state().simulation.state.phase, 'countdown');
  await key('KeyW'); assert.equal(state().input.read().throttle, 1);
  await key('Escape'); assert.equal(state().simulation.paused, true); assert.equal(state().audio.suspended, true);
  assert.equal(select('#panel').open, true); assert.equal(state().input.read().throttle, 0);
  await key('Escape'); assert.equal(state().simulation.paused, false); assert.equal(select('#panel').open, false);
  assert.equal(state().audio.suspended, false); assert.equal(state().input.read().throttle, 0, 'held inputs clear on resume');
  const firstSession = state().sessionId;
  await click('#pause-button'); await click('#restart');
  assert.notEqual(state().sessionId, firstSession); assert.equal(state().simulation.state.elapsed, 0); assert.equal(state().simulation.state.phase, 'countdown');
  await click('#pause-button'); await click('#leave-race');
  assert.equal(state().simulation, null); assert.equal(select('#shell').hidden, false); assert.equal(select('#race-ui').hidden, true);
  assert.equal(latestCall('mode')[1], 'garage'); assert.equal(saved().races, 0, 'abandoned race pays no reward');

  // Complete an actual one-lap simulation through the UI-created session.
  await click('[data-mode="time"]'); await change('#laps', '1'); await click('#start');
  const sim = state().simulation, creditsBeforeFinish = saved().credits;
  for (let index = 0; index < 120 * 180 && sim.state.phase !== 'finished'; index++) {
    const sample = sim.track.sample(sim.state.distance), current = sim.state;
    let targetSpeed = 42;
    for (let ahead = 0; ahead <= 100; ahead += 10) {
      const curve = Math.abs(sim.track.sample(current.distance + ahead).curvature);
      const cornerSpeed = Math.sqrt(9.8 * sim.grip / Math.max(curve, .00001));
      targetSpeed = Math.min(targetSpeed, Math.sqrt(cornerSpeed ** 2 + 20 * Math.max(0, ahead - 8)));
    }
    const yawRate = sample.curvature * current.speed - current.heading * 2 - current.lateral * .10;
    const steer = Math.atan(yawRate * 2.65 / Math.max(4, current.speed)) / (.42 / (1 + current.speed * .038)) / sim.handling;
    sim.step(1 / 120, { throttle: current.speed < targetSpeed ? 1 : .15, brake: Math.max(0, Math.min(1, (current.speed - targetSpeed) * .2)), steer });
  }
  assert.equal(sim.state.phase, 'finished', 'actual selected track and upgraded car complete one full lap');
  window.__uiTest.frame(window.performance.now()); await flush();
  assert.equal(select('#panel-title').textContent, 'セッションリザルト');
  assert.equal(saved().races, 1); assert(saved().credits > creditsBeforeFinish);
  const recordKey = `${TRACKS[1].id}:kagero:time`;
  assert.equal(saved().records[recordKey].bestTime, sim.state.result.bestLap);
  const afterFinish = window.localStorage.getItem(profileModule.PROFILE_KEY);
  window.__uiTest.frame(window.performance.now()); await window.__uiTest.finishRace(); await flush();
  assert.equal(window.localStorage.getItem(profileModule.PROFILE_KEY), afterFinish, 'repeated result renders do not credit twice');
  await click('#result-home');
  await click('[data-open="records"]');
  assert.match(select('#panel-content').textContent, /ベストラップ/);
  assert.match(select('#panel-content').textContent, new RegExp(TRACKS[1].name));
  assert.equal(errors.length, 0, errors.map(error => error.stack).join('\n'));
  console.log('Remake UI: 512-car search/paging, selection, 6 tracks, modes, upgrades, paint, settings, keyboard pause/resume, restart, abandonment and exactly-once real-lap results passed.');
  console.log('DOM verification only: GPU rendering, CSS layout, physical touch devices and audible playback are not verified by this test.');
} finally {
  state().input.dispose(); state().audio.dispose(); dom.window.close();
}
