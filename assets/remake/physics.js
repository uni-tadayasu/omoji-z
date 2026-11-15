/** Deterministic, route-relative vehicle simulation. SI units throughout. */
import {createTrack} from './tracks.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
const approach = (value, target, rate, dt) => value + clamp(target - value, -rate * dt, rate * dt);
const follow = (value, target, rate, dt) => value + (target - value) * (1 - Math.exp(-rate * dt));
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--.---';
  const ms = Math.floor(seconds * 1000 + .00001);
  return `${Math.floor(ms / 60000).toString().padStart(2, '0')}:${Math.floor(ms / 1000 % 60).toString().padStart(2, '0')}.${(ms % 1000).toString().padStart(3, '0')}`;
}

export class RaceSimulation {
  constructor({track = createTrack(), car = {}, mode = 'race', difficulty = 'normal', laps = 2} = {}) {
    this.track = typeof track === 'string' || typeof track.sample !== 'function' ? createTrack(track) : track;
    this.car = car;
    this.mode = ['race', 'time', 'free'].includes(mode) ? mode : 'race';
    this.difficulty = ['easy', 'normal', 'hard'].includes(difficulty) ? difficulty : 'normal';
    this.laps = Math.round(clamp(finite(laps, 2), 1, 10));
    this.topSpeed = clamp(finite(car.topSpeed, 230), 120, 375) / 3.6;
    this.acceleration = clamp(finite(car.accel, 7), 4, 13);
    this.grip = clamp(finite(car.grip, 1), .75, 1.4) * (this.track.environment === 'snow' ? .77 : 1);
    this.handling = clamp(finite(car.handling, 1), .75, 1.35);
    this.brakeForce = clamp(finite(car.brakeForce, 1), .8, 1.35);
    this.reset();
  }

  reset() {
    this.paused = false;
    this.completedLaps = 0;
    this.lastLapAt = 0;
    this.collisionCooldown = 0;
    this.yawRate = 0;
    this.lateralVelocity = 0;
    this.maxDistance = 0;
    const start = this.track.sample(0);
    this.state = {
      phase: 'countdown', countdown: 3, elapsed: 0, lap: 1, laps: this.laps,
      position: this.mode === 'race' ? 4 : 1, speed: 0, progress: 0, distance: 0,
      lateral: 0, heading: 0, x: start.x, y: start.y, z: start.z, yaw: start.heading,
      pitch: start.pitch || 0, steer: 0, drift: 0, nitro: 1, boosting: false,
      gear: 1, rpm: 900, bestLap: null, lapTime: 0, lastLap: null, result: null,
      collisions: 0, driftScore: 0, offroad: false,
      opponents: this.mode === 'race' ? [
        {name: 'REN', color: '#f3c95c', distance: 12, lateral: -3.1, speed: 0, skill: .95},
        {name: 'AOI', color: '#55c9d9', distance: 23, lateral: 2.9, speed: 0, skill: .985},
        {name: 'KAI', color: '#f37171', distance: 34, lateral: -.8, speed: 0, skill: 1},
      ] : [],
    };
    this.state.opponents.forEach(opponent => this.placeOpponent(opponent));
    return this.state;
  }

  setPaused(value) { this.paused = !!value; }

  step(dt, input = {}) {
    if (this.paused || this.state.phase === 'finished' || !Number.isFinite(dt) || dt <= 0) return this.state;
    let remaining = Math.min(dt, .1);
    const command = {
      throttle: clamp(finite(input.throttle, 0), 0, 1), brake: clamp(finite(input.brake, 0), 0, 1),
      steer: clamp(finite(input.steer, 0), -1, 1), handbrake: clamp(finite(input.handbrake, 0), 0, 1),
      boost: input.boost === true || finite(input.boost, 0) > .5,
    };
    while (remaining > 1e-10 && this.state.phase !== 'finished') {
      const step = Math.min(remaining, 1 / 120);
      this.advance(step, command);
      remaining -= step;
    }
    return this.state;
  }

  advance(dt, input) {
    const s = this.state;
    if (s.phase === 'countdown') {
      const countdownStep = Math.min(s.countdown, dt);
      s.countdown = Math.max(0, s.countdown - countdownStep);
      if (s.countdown > 1e-9) return;
      s.countdown = 0;
      s.phase = 'running';
      dt -= countdownStep;
      if (dt <= 1e-9) return;
    }
    const road = this.track.sample(s.distance), previousDistance = s.distance, previousTime = s.elapsed;
    s.elapsed += dt;
    s.lapTime = s.elapsed - this.lastLapAt;
    this.collisionCooldown = Math.max(0, this.collisionCooldown - dt);
    const speedRatio = clamp(s.speed / this.topSpeed, 0, 1.3);
    const steeringRate = input.steer === 0 || Math.sign(input.steer) !== Math.sign(s.steer) ? 4.6 : 2.9;
    s.steer = approach(s.steer, input.steer, steeringRate, dt);
    const traction = this.grip * (1 - input.handbrake * .46);
    const wheelAngle = s.steer * (.42 / (1 + s.speed * .038)) * this.handling;
    const intendedYawRate = Math.tan(wheelAngle) * s.speed / 2.65;
    const gripYaw = (15.6 * traction) / Math.max(s.speed, 5);
    const actualYaw = clamp(intendedYawRate, -gripYaw, gripYaw) * (1 + input.handbrake * .47);
    this.yawRate = follow(this.yawRate, actualYaw, input.handbrake > .1 ? 4 : 8, dt);
    const longitudinal = s.speed * Math.cos(s.heading);
    const correction = clamp(1 - road.curvature * s.lateral, .65, 1.35);
    const distanceStep = longitudinal * dt / correction;
    s.heading += this.yawRate * dt - road.curvature * distanceStep;
    s.heading = clamp(s.heading, -1.25, 1.25);
    const desiredLateral = Math.sin(s.heading) * s.speed;
    this.lateralVelocity = follow(this.lateralVelocity, desiredLateral, input.handbrake > .1 ? 2.6 : 9.5 * traction, dt);
    s.lateral += this.lateralVelocity * dt;
    s.distance = Math.max(0, s.distance + distanceStep);
    const edge = this.track.width / 2 - 1.05;
    s.offroad = Math.abs(s.lateral) > edge - 1.2;
    if (Math.abs(s.lateral) > edge) {
      const side = Math.sign(s.lateral);
      s.lateral = side * edge;
      if (side * this.lateralVelocity > 0) this.lateralVelocity = -side * Math.min(2.5, Math.abs(this.lateralVelocity) * .14);
      if (side * s.heading > 0) s.heading = -side * .025;
      this.yawRate *= .4;
      if (this.collisionCooldown <= 0 && s.speed > 8) {
        s.speed *= .66;
        s.collisions++;
        this.collisionCooldown = .7;
      }
    }
    const nitroActive = input.boost && input.throttle > .2 && input.brake < .2 && s.nitro > .008 && s.speed > 4;
    s.boosting = nitroActive;
    s.nitro = clamp(s.nitro + (nitroActive ? -.22 : .035) * dt, 0, 1);
    const targetTop = this.topSpeed * (nitroActive ? 1.11 : 1);
    const engine = this.acceleration * (1 - .69 * speedRatio ** 1.6) * input.throttle;
    const aerodynamic = .65 + .00018 * s.speed * s.speed;
    const rolling = s.offroad ? 4.2 : 0;
    const braking = input.brake * 17 * this.grip * this.brakeForce + input.handbrake * 5.4;
    const cornerDrag = Math.abs(s.heading) * s.speed * .032;
    const gravity = (road.grade || 0) * 9.81;
    s.speed = clamp(s.speed + (engine + (nitroActive ? 5.5 : 0) - aerodynamic - rolling - braking - cornerDrag - gravity) * dt, 0, targetTop);
    if (input.throttle < .001 && s.speed < .15) s.speed = 0;
    s.drift = clamp(Math.abs(s.heading) * 1.7 + input.handbrake * Math.abs(s.steer) * .35, 0, 1);
    if (s.speed > 12 && s.drift > .18 && !s.offroad) s.driftScore += (s.drift - .18) * s.speed * dt * .7;
    s.gear = Math.round(clamp(Math.floor(s.speed / Math.max(7, this.topSpeed / 6)) + 1, 1, finite(this.car.gears, 6)));
    const gearSpan = this.topSpeed / Math.max(4, finite(this.car.gears, 6));
    s.rpm = Math.round(clamp(1800 + ((s.speed / gearSpan) % 1) * 5500 + input.throttle * 700, s.speed < .5 ? 900 : 1600, 8000));
    this.updateOpponents(dt);
    this.resolveTraffic();
    this.updateWorld();
    s.position = 1 + s.opponents.filter(opponent => opponent.distance > s.distance).length;
    this.maxDistance = Math.max(this.maxDistance, s.distance);
    const nextLine = (this.completedLaps + 1) * this.track.length;
    if (s.distance >= nextLine) {
      const fraction = clamp((nextLine - previousDistance) / Math.max(.0001, s.distance - previousDistance), 0, 1);
      const crossingTime = previousTime + dt * fraction;
      const lapTime = crossingTime - this.lastLapAt;
      s.lastLap = lapTime;
      s.bestLap = s.bestLap === null ? lapTime : Math.min(s.bestLap, lapTime);
      this.lastLapAt = crossingTime;
      this.completedLaps++;
      s.lap = this.mode === 'free' ? this.completedLaps + 1 : Math.min(this.laps, this.completedLaps + 1);
      s.lapTime = s.elapsed - this.lastLapAt;
      if (this.mode !== 'free' && this.completedLaps >= this.laps) {
        s.phase = 'finished';
        s.elapsed = crossingTime;
        s.distance = nextLine;
        s.progress = 1;
        s.lapTime = lapTime;
        s.boosting = false;
        this.updateWorld();
        const distanceBonus = this.track.length * this.laps / 1000 * 80;
        const positionBonus = this.mode === 'race' ? [220, 150, 90, 45][s.position - 1] : 100;
        s.result = Object.freeze({finished: true, time: crossingTime, distance: nextLine, position: s.position, bestLap: s.bestLap,
          reward: Math.round(clamp(100 + distanceBonus + positionBonus + Math.min(100, s.driftScore / 15), 100, 2400)),
          driftScore: Math.floor(s.driftScore), collisions: s.collisions, laps: this.laps, mode: this.mode, trackId: this.track.id});
      }
    }
  }

  placeOpponent(opponent) {
    const point = this.track.sample(opponent.distance);
    opponent.x = point.x + Math.cos(point.heading) * opponent.lateral;
    opponent.y = point.y;
    opponent.z = point.z - Math.sin(point.heading) * opponent.lateral;
    opponent.yaw = point.heading;
    opponent.pitch = point.pitch || 0;
  }

  updateOpponents(dt) {
    const difficulty = {easy: .78, normal: .89, hard: .98}[this.difficulty];
    for (const opponent of this.state.opponents) {
      const pace = difficulty * opponent.skill;
      let target = this.topSpeed * pace;
      const brake = 13 * this.grip;
      for (let ahead = 0; ahead <= 150; ahead += 15) {
        const curvature = Math.abs(this.track.sample(opponent.distance + ahead).curvature);
        if (curvature > .00001) {
          const corner = Math.sqrt(14.2 * this.grip / curvature) * pace;
          target = Math.min(target, Math.sqrt(corner * corner + 2 * brake * Math.max(0, ahead - 5)));
        }
      }
      const rate = target < opponent.speed ? brake : this.acceleration * (.97 - .67 * (opponent.speed / this.topSpeed) ** 1.6);
      opponent.speed = approach(opponent.speed, target, Math.max(1, rate), dt);
      // A shared road, not ghost traffic: rivals leave braking room for the human.
      const gap = this.state.distance - opponent.distance;
      if (gap > 0 && gap < 8 && Math.abs(this.state.lateral - opponent.lateral) < 2.1) {
        opponent.speed = Math.min(opponent.speed, Math.max(0, this.state.speed + (gap - 5) * 1.2));
      }
      opponent.distance += opponent.speed * dt;
      this.placeOpponent(opponent);
    }
  }

  resolveTraffic() {
    const s = this.state;
    if (this.collisionCooldown > 0) return;
    for (const opponent of s.opponents) {
      const rawGap = opponent.distance - s.distance;
      const lapGap = ((rawGap + this.track.length / 2) % this.track.length + this.track.length) % this.track.length - this.track.length / 2;
      if (Math.abs(lapGap) < 4.4 && Math.abs(opponent.lateral - s.lateral) < 1.9 && s.speed > 7) {
        if (lapGap >= 0 && s.speed > opponent.speed) s.speed = Math.max(0, opponent.speed - 1.5);
        else s.speed *= .92;
        const side = Math.sign(s.lateral - opponent.lateral) || 1;
        s.lateral = clamp(s.lateral + side * .4, -this.track.width / 2 + 1.05, this.track.width / 2 - 1.05);
        s.heading += side * .022;
        s.collisions++;
        this.collisionCooldown = .8;
        break;
      }
    }
  }

  updateWorld() {
    const s = this.state, point = this.track.sample(s.distance);
    s.x = point.x + Math.cos(point.heading) * s.lateral;
    s.y = point.y;
    s.z = point.z - Math.sin(point.heading) * s.lateral;
    s.yaw = point.heading + s.heading;
    s.pitch = point.pitch || 0;
    s.progress = s.phase === 'finished' ? 1 : ((s.distance % this.track.length) + this.track.length) % this.track.length / this.track.length;
  }
}
