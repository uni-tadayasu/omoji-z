import assert from 'node:assert/strict';
import {TRACKS, createTrack} from '../assets/remake/tracks.js';
import {RaceSimulation, formatTime} from '../assets/remake/physics.js';

const straight = {
  id: 'test-straight', environment: 'city', width: 18, length: 2000,
  sample(distance) { return {x: 0, y: 0, z: distance, heading: 0, curvature: 0, grade: 0, pitch: 0, width: 18}; },
};
const car = {topSpeed: 240, accel: 8, grip: 1.1, handling: 1, gears: 6};
const advance = (sim, seconds, input = {}, fps = 120) => {
  for (let i = 0; i < Math.round(seconds * fps); i++) sim.step(1 / fps, input);
};
const start = (options = {}) => {
  const sim = new RaceSimulation({track: straight, car, mode: 'time', ...options});
  advance(sim, 3);
  assert.equal(sim.state.phase, 'running');
  assert.equal(sim.state.distance, 0, 'countdown cannot advance vehicle');
  return sim;
};

assert.equal(TRACKS.length, 6);
assert.equal(new Set(TRACKS.map(track => track.id)).size, 6);
for (const definition of TRACKS) {
  const track = createTrack(definition.id);
  assert(track.length > 1500 && track.length < 2700, `${definition.id} length ${track.length}`);
  assert(track.width >= 15 && track.width <= 19);
  const a = track.sample(0), b = track.sample(track.length), behind = track.sample(-1), ahead = track.sample(track.length - 1);
  assert(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 1e-8, 'closed geometry');
  assert(Math.hypot(behind.x - ahead.x, behind.z - ahead.z) < 1e-8, 'negative sample wraps');
  for (let i = 0; i < track.length; i += 19) {
    const p = track.sample(i), q = track.sample(i + 1);
    assert(Object.values(p).every(Number.isFinite), `${track.id}: finite sample`);
    assert(Math.abs(Math.hypot(q.x - p.x, q.z - p.z) - 1) < .03, 'arc length');
    assert(Math.abs(p.grade) < .35, 'driveable grade');
    assert(Math.abs(p.curvature) < .09, 'smooth curvature');
  }
}

const paused = new RaceSimulation({track: straight, car});
paused.setPaused(true);
const pausedSnapshot = JSON.stringify(paused.state);
advance(paused, 10, {throttle: 1});
assert.equal(JSON.stringify(paused.state), pausedSnapshot, 'pause freezes countdown and all race state');
paused.setPaused(false);
advance(paused, 3);
assert.equal(paused.state.phase, 'running');
paused.setPaused(true);
const runningSnapshot = JSON.stringify(paused.state);
advance(paused, 5, {throttle: 1});
assert.equal(JSON.stringify(paused.state), runningSnapshot, 'pause freezes race');

const accelerating = start();
advance(accelerating, 6, {throttle: 1});
assert(accelerating.state.speed > 30 && accelerating.state.speed < 50, 'plausible acceleration');
const movingDistance = accelerating.state.distance;
advance(accelerating, 4, {brake: 1});
assert.equal(accelerating.state.speed, 0, 'brakes stop');
assert(accelerating.state.distance > movingDistance, 'braking travels forward');
advance(accelerating, 3, {brake: 1});
assert.equal(accelerating.state.speed, 0, 'brake never creates reverse motion');

const steering = start();
advance(steering, 3, {throttle: 1});
advance(steering, .35, {throttle: 1, steer: 1});
assert(steering.state.lateral > .05 && steering.state.yaw > 0, 'right input turns right');
advance(steering, 8, {throttle: 1, steer: 1});
assert(steering.state.collisions > 0, 'barrier collision counts');
assert(Math.abs(steering.state.lateral) <= straight.width / 2 - 1.05, 'barrier contains car');
assert(Number.isFinite(steering.state.speed));

const boost = start({mode: 'free'}), stock = start({mode: 'free'});
advance(boost, 8, {throttle: 1, boost: true});
advance(stock, 8, {throttle: 1});
assert(boost.state.speed > stock.state.speed, 'nitro increases acceleration');
assert(boost.state.nitro < 1, 'nitro consumed');
const depleted = boost.state.nitro;
advance(boost, 5, {});
assert(boost.state.nitro > depleted, 'nitro recovers');

const finish = start({laps: 2});
finish.state.distance = straight.length - .1;
finish.state.speed = 30;
finish.step(1 / 120, {throttle: 1});
assert.equal(finish.state.lap, 2, 'first crossing starts lap two');
assert.equal(finish.state.phase, 'running');
assert(finish.state.bestLap > 0);
finish.state.distance = straight.length * 2 - .1;
finish.step(1 / 120, {throttle: 1});
assert.equal(finish.state.phase, 'finished');
assert.equal(finish.state.progress, 1);
assert(finish.state.result.reward >= 100 && finish.state.result.reward <= 2400, 'reward bounded');
assert.equal(finish.state.distance, straight.length * 2, 'finish stops at line');
const finishedSnapshot = JSON.stringify(finish.state);
advance(finish, 2, {throttle: 1, boost: true});
assert.equal(JSON.stringify(finish.state), finishedSnapshot, 'completed result immutable');
finish.reset();
assert.equal(finish.state.phase, 'countdown');
assert.equal(finish.state.result, null);
assert.equal(finish.state.distance, 0);

const free = start({mode: 'free', laps: 1});
free.state.distance = straight.length - .1;
free.state.speed = 30;
free.step(1 / 120, {throttle: 1});
assert.equal(free.state.phase, 'running', 'free mode continues');
assert.equal(free.state.lap, 2);
assert.equal(free.state.result, null);

const fpsStates = [30, 60, 120].map(fps => {
  const sim = start({mode: 'free'});
  advance(sim, 8, {throttle: 1}, fps);
  advance(sim, 2, {brake: .5}, fps);
  return sim.state;
});
for (const other of fpsStates.slice(1)) {
  assert(Math.abs(other.distance - fpsStates[0].distance) < 1e-7, 'frame-independent distance');
  assert(Math.abs(other.speed - fpsStates[0].speed) < 1e-7, 'frame-independent speed');
  assert(Math.abs(other.elapsed - fpsStates[0].elapsed) < 1e-7, 'frame-independent clock');
}

const rivals = start({mode: 'race', difficulty: 'hard'});
advance(rivals, 35, {throttle: 1});
assert.equal(rivals.state.opponents.length, 3);
assert(rivals.state.opponents.every(opponent => opponent.speed <= rivals.topSpeed + 1e-8), 'AI shares speed ceiling');
assert(rivals.state.position >= 1 && rivals.state.position <= 4);
const invalid = start({mode: 'free'});
invalid.step(NaN, {throttle: 1});
invalid.step(-5, {throttle: 1});
invalid.step(.1, {throttle: Infinity, steer: NaN, brake: -8});
assert(Number.isFinite(invalid.state.speed) && Number.isFinite(invalid.state.distance));
assert.equal(formatTime(65.432), '01:05.432');
assert.equal(formatTime(null), '--:--.---');

// An independent closed-loop test driver completes the actual geometry; no teleporting.
// This verifies that road curvature, the lateral convention, steering and lap timing agree.
for (const definition of TRACKS) {
  const track = createTrack(definition.id);
  const sim = new RaceSimulation({track, car, mode: 'time', laps: 1});
  for (let i = 0; i < 120 * 150 && sim.state.phase !== 'finished'; i++) {
    const state = sim.state, point = track.sample(state.distance);
    let targetSpeed = 45;
    for (let ahead = 0; ahead <= 100; ahead += 10) {
      const curvature = Math.abs(track.sample(state.distance + ahead).curvature);
      const cornerSpeed = Math.sqrt(9.8 * sim.grip / Math.max(curvature, .00001));
      targetSpeed = Math.min(targetSpeed, Math.sqrt(cornerSpeed ** 2 + 20 * Math.max(0, ahead - 8)));
    }
    const yawRate = point.curvature * state.speed - state.heading * 2 - state.lateral * .10;
    const steer = Math.atan(yawRate * 2.65 / Math.max(4, state.speed)) / (.42 / (1 + state.speed * .038));
    sim.step(1 / 120, {throttle: state.speed < targetSpeed ? 1 : .15,
      brake: Math.max(0, Math.min(1, (state.speed - targetSpeed) * .2)), steer});
  }
  assert.equal(sim.state.phase, 'finished', `${track.id}: full lap completed`);
  assert.equal(sim.state.collisions, 0, `${track.id}: geometry and controls agree without barriers`);
  assert(sim.state.elapsed > 35 && sim.state.elapsed < 100, `${track.id}: plausible lap duration`);
  assert.equal(sim.state.bestLap, sim.state.result.time, `${track.id}: timing agrees at final line`);
}
console.log('Remake simulation: 6 complete collision-free laps; geometry, acceleration, braking, steering, barriers, nitro, results, pause, AI, and frame-rate invariance verified.');
