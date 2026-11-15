import assert from 'node:assert/strict';
import { PROFILE_KEY, STARTER_IDS, loadProfile, normalizeProfile, saveProfile, purchaseCar, carPrice, upgradeCar, tunedCar, recordResult } from '../assets/remake/profile.js';
import { vehicleCatalog } from '../assets/vehicles.js';
class MemoryStorage {
  constructor(initial = {}) { this.data = new Map(Object.entries(initial)); }
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
}
const fresh = loadProfile(new MemoryStorage());
assert.equal(fresh.credits, 12000); assert.deepEqual(fresh.owned, STARTER_IDS);
const operator = vehicleCatalog.find(car => car.operatorOnly);
const invalid = normalizeProfile({ credits: Infinity, owned: [operator.id, 'missing'], selectedCar: operator.id, paint: '<script>', volume: -2, quality: 'ultra', upgrades: { hachi: { engine: 500, grip: -1 } } });
assert.equal(invalid.credits, 12000); assert.equal(invalid.volume, 0); assert.equal(invalid.quality, 'high'); assert.equal(invalid.upgrades.hachi.engine, 3); assert(!invalid.owned.includes(operator.id));
const candidate = vehicleCatalog.find(car => !car.operatorOnly && !STARTER_IDS.includes(car.id));
const legacyText = JSON.stringify({ balance: 45678, owned: [candidate.id, operator.id], cars: { [candidate.id]: { stars: 8 } } });
const storage = new MemoryStorage({ 'omojiz.economy.v1': legacyText, 'omoji-z.settings.v1': JSON.stringify({ car: candidate.id }) });
const migrated = loadProfile(storage);
assert.equal(migrated.credits, 45678); assert(migrated.owned.includes(candidate.id)); assert(!migrated.owned.includes(operator.id)); assert.equal(migrated.selectedCar, candidate.id); assert.equal(storage.getItem('omojiz.economy.v1'), legacyText);
assert(migrated.owned.includes('leopard') && migrated.owned.includes('yukitsuba'), 'implicit legacy starters survive');
const v3Migrated = loadProfile(new MemoryStorage({ 'omojiz.economy.v1': JSON.stringify({balanceVersion:3,balance:3000,owned:[]}) }));
assert(v3Migrated.owned.includes('leopard')); assert(!v3Migrated.owned.includes(candidate.id), 'v3 saves do not regain pre-v3 free cars');
const invalidOwnership = loadProfile(new MemoryStorage({ 'omojiz.economy.v1': JSON.stringify({balanceVersion:3,balance:0,owned:{[operator.id]:true}}) }));
assert(!invalidOwnership.owned.includes(operator.id)); assert.equal(invalidOwnership.credits, 0);
storage.setItem('omojiz.economy.v1', JSON.stringify({ balance: 999 })); assert.equal(loadProfile(storage).credits, 45678, 'migration happens once');
const corrupt = new MemoryStorage({ [PROFILE_KEY]: '{invalid' }); assert.equal(loadProfile(corrupt).credits, 12000);
const denied = { getItem() { throw Error('denied'); }, setItem() { throw Error('full'); } }; assert.equal(loadProfile(denied).credits, 12000); assert.equal(saveProfile(fresh, denied), false);
assert.equal(purchaseCar(fresh, candidate).ok, false); const funded = { ...fresh, credits: 300000 };
const bought = purchaseCar(funded, candidate); assert(bought.ok); assert.equal(bought.profile.credits, funded.credits - carPrice(candidate)); assert.equal(funded.owned.includes(candidate.id), false, 'transactions do not mutate input');
assert.equal(purchaseCar(bought.profile, candidate).ok, false); assert.equal(purchaseCar(funded, operator).ok, false);
const upgrade = upgradeCar(funded, 'hachi', 'engine'); assert(upgrade.ok); assert.equal(upgrade.profile.credits, 297500); assert.equal(upgrade.profile.upgrades.hachi.engine, 1);
const baseCar = vehicleCatalog.find(car => car.id === 'hachi'); assert(tunedCar(upgrade.profile, baseCar).accel > baseCar.accel);
const request = { trackId: 'neon-bay', carId: 'hachi', mode: 'race', result: { id: 'test-finish-1', finished: true, time: 80, position: 1, distance: 2000, reward: 800, score: 12 } };
const finished = recordResult(fresh, request); assert.equal(finished.credits, 12800); assert.equal(finished.wins, 1); assert.equal(finished.records['neon-bay:hachi:race'].bestTime, 80);
assert.deepEqual(recordResult(finished, request), finished, 'repeated finish callbacks cannot pay twice');
const fiveLaps = recordResult(finished, {...request,result:{...request.result,id:'five-laps',time:350,bestLap:65}});
assert.equal(fiveLaps.records['neon-bay:hachi:race'].bestTime, 65, 'best lap compares fairly across session lap counts');
assert.equal(fiveLaps.records['neon-bay:hachi:race'].lastTime, 350, 'last session total remains available');
const slowerLap = recordResult(fiveLaps, {...request,result:{...request.result,id:'one-lap',time:75,bestLap:75}});
assert.equal(slowerLap.records['neon-bay:hachi:race'].bestTime, 65);
assert.equal(recordResult(fresh, { ...request, result: { ...request.result, finished: false } }).credits, fresh.credits);
assert.equal(recordResult(fresh, { ...request, result: { ...request.result, time: 1 } }).credits, fresh.credits);
assert.equal(recordResult(fresh, { ...request, result: { ...request.result, reward: 1e10 } }).credits, 17000);
console.log('Remake profile: validation, non-destructive migration, purchases, upgrades and result receipts passed.');

// Music lifecycle: a frame update never retries autoplay or creates extra voices.
const { GameAudio } = await import('../assets/remake/audio.js');
const originalAudio = globalThis.Audio;
let voices = 0, plays = 0;
globalThis.Audio = class {
  constructor() { voices++; this.paused = true; }
  play() { this.paused = false; plays++; return Promise.resolve(); }
  pause() { this.paused = true; }
  removeAttribute() {}
  load() {}
};
try {
  const audio = new GameAudio();
  audio.setScene('race'); assert.equal(voices, 0, 'no sound is created before a gesture');
  await audio.unlock(); assert.equal(voices, 1); assert.equal(plays, 1);
  for (let index = 0; index < 100; index++) audio.update({ speed: 20, throttle: 1 });
  audio.setScene('race'); assert.equal(plays, 1);
  audio.setScene('garage'); assert.equal(plays, 2); assert.equal(voices, 1);
  audio.setMuted(true); assert.equal(audio.music.volume, 0);
  audio.suspend(); assert(audio.music.paused);
  audio.setMuted(false); assert.equal(plays, 2, 'unmuting while paused does not resume the race soundtrack');
  audio.setScene('race'); assert.equal(plays, 2);
  await audio.unlock(); assert.equal(plays, 3, 'an explicit resume restarts paused race audio');
  assert.equal(audio.suspended, false); assert.equal(audio.music.paused, false); assert(audio.music.volume > 0);
  audio.suspend(); await audio.unlock(); assert.equal(plays, 4); assert.equal(voices, 1);
  audio.dispose(); assert.equal(audio.music, null);
} finally { if (originalAudio === undefined) delete globalThis.Audio; else globalThis.Audio = originalAudio; }
console.log('Remake audio: gesture gating, single music voice, scene changes and disposal passed.');
