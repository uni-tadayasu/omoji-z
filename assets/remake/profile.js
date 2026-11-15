import { vehicleCatalog } from '../vehicles.js';

export const PROFILE_KEY = 'omoji-z.remake.v1';
export const STARTER_IDS = Object.freeze(['hachi', 'kagero', 'raimei']);
const cars = new Map(vehicleCatalog.filter(car => !car.operatorOnly).map(car => [car.id, car]));
const MAX_CREDITS = 999999999;
const number = (value, fallback = 0, maximum = Number.MAX_SAFE_INTEGER) => Number.isFinite(value) ? Math.max(0, Math.min(maximum, value)) : fallback;
const integer = (value, fallback = 0, maximum = Number.MAX_SAFE_INTEGER) => Math.floor(number(value, fallback, maximum));
const safeId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,64}$/.test(value);
const list = (value, known = cars, maximum = 512) => Array.isArray(value) ? [...new Set(value.filter(id => known.has(id)))].slice(0, maximum) : [];
function storageOrDefault(storage) { try { return storage ?? globalThis.localStorage; } catch { return null; } }
function parse(storage, key) { try { const value = JSON.parse(storage?.getItem(key) ?? 'null'); return value && typeof value === 'object' && !Array.isArray(value) ? value : null; } catch { return null; } }

export function normalizeProfile(raw) {
  const value = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const owned = [...new Set([...STARTER_IDS, ...list(value.owned)])];
  const upgrades = {};
  for (const id of owned) {
    const data = value.upgrades?.[id];
    if (data && typeof data === 'object') upgrades[id] = { engine: integer(data.engine, 0, 3), grip: integer(data.grip, 0, 3), brakes: integer(data.brakes, 0, 3) };
  }
  const records = {};
  for (const [key, entry] of Object.entries(value.records && typeof value.records === 'object' ? value.records : {}).slice(-2048)) {
    if (!/^[a-zA-Z0-9_-]{1,64}:[a-zA-Z0-9_-]{1,64}:[a-zA-Z0-9_-]{1,32}$/.test(key) || !entry || typeof entry !== 'object') continue;
    records[key] = { bestTime: number(entry.bestTime, 0, 86400), bestScore: integer(entry.bestScore, 0, 1e9), races: integer(entry.races, 0, 1e7), wins: integer(entry.wins, 0, 1e7), lastTime: number(entry.lastTime, 0, 86400) };
  }
  return {
    version: 1, credits: integer(value.credits, 12000, MAX_CREDITS), owned,
    selectedCar: owned.includes(value.selectedCar) ? value.selectedCar : STARTER_IDS[0],
    selectedTrack: safeId(value.selectedTrack) ? value.selectedTrack : 'neon-bay',
    paint: typeof value.paint === 'string' && /^#[0-9a-f]{6}$/i.test(value.paint) ? value.paint : '#c8d4dc',
    quality: ['low', 'medium', 'high'].includes(value.quality) ? value.quality : 'high',
    volume: number(value.volume, .35, 1), muted: value.muted === true,
    records, races: integer(value.races, 0, 1e7), wins: integer(value.wins, 0, 1e7), distance: number(value.distance, 0, 1e12),
    upgrades, favorites: list(value.favorites),
    receipts: Array.isArray(value.receipts) ? [...new Set(value.receipts.filter(id => typeof id === 'string' && /^[a-zA-Z0-9:_-]{1,128}$/.test(id)))].slice(-256) : [],
    migratedFromLegacy: value.migratedFromLegacy === true
  };
}

export function loadProfile(storage) {
  storage = storageOrDefault(storage);
  const saved = parse(storage, PROFILE_KEY);
  if (saved?.version === 1) return normalizeProfile(saved);
  const old = parse(storage, 'omojiz.economy.v1');
  const settings = parse(storage, 'omoji-z.settings.v1');
  // v3 starter cars were implicitly owned and were not always written into owned.
  // Earlier saves also implicitly owned the original free catalog, as in v3's migration.
  const legacyOwned = old ? [...list(old.owned), 'hachi', 'leopard', 'yukitsuba',
    ...(old.balanceVersion === 3 ? [] : [...cars.values()].filter(car => !car.shopPrice).map(car => car.id))] : [];
  const profile = normalizeProfile(old ? { credits: number(old.balance, 12000, MAX_CREDITS), owned: legacyOwned, selectedCar: settings?.car, migratedFromLegacy: true } : null);
  // A separate key preserves every legacy save and keeps the new physics' records separate.
  saveProfile(profile, storage);
  return profile;
}

export function saveProfile(profile, storage) {
  storage = storageOrDefault(storage);
  try { if (!storage?.setItem) return false; storage.setItem(PROFILE_KEY, JSON.stringify(normalizeProfile(profile))); return true; } catch { return false; }
}

export function carPrice(car) {
  if (!car || !cars.has(car.id) || car.operatorOnly) return Infinity;
  if (STARTER_IDS.includes(car.id)) return 0;
  const canonical = cars.get(car.id);
  const power = number(canonical.power, 150, 2000), speed = number(canonical.topSpeed, 200, 500);
  return Math.round(Math.max(8000, Math.min(250000, 6000 + power * 62 + Math.max(0, speed - 180) * 140)) / 100) * 100;
}

export function purchaseCar(profile, car) {
  const next = normalizeProfile(profile);
  if (!car || !cars.has(car.id) || car.operatorOnly) return { ok: false, reason: 'この車両は購入できません。', profile: next };
  if (next.owned.includes(car.id)) return { ok: false, reason: 'すでに所有しています。', profile: next };
  const price = carPrice(car);
  if (next.credits < price) return { ok: false, reason: 'Zが不足しています。', profile: next };
  next.credits -= price; next.owned.push(car.id); next.selectedCar = car.id;
  return { ok: true, reason: '購入しました。', profile: next };
}

export function upgradeCar(profile, carId, part) {
  const next = normalizeProfile(profile);
  if (!next.owned.includes(carId) || !['engine', 'grip', 'brakes'].includes(part)) return { ok: false, reason: '強化できません。', profile: next };
  const setup = next.upgrades[carId] ?? { engine: 0, grip: 0, brakes: 0 };
  if (setup[part] >= 3) return { ok: false, reason: '最大レベルです。', profile: next };
  const price = (setup[part] + 1) * 2500;
  if (next.credits < price) return { ok: false, reason: 'Zが不足しています。', profile: next };
  next.credits -= price; next.upgrades[carId] = { ...setup, [part]: setup[part] + 1 };
  return { ok: true, reason: '強化しました。', profile: next, price };
}

export function tunedCar(profile, car) {
  if (!car) return null;
  const setup = normalizeProfile(profile).upgrades[car.id] ?? { engine: 0, grip: 0, brakes: 0 };
  return { ...car, power: car.power * (1 + setup.engine * .045), accel: car.accel * (1 + setup.engine * .055), topSpeed: Math.min(375, car.topSpeed * (1 + setup.engine * .018)), grip: car.grip * (1 + setup.grip * .035), handling: car.handling * (1 + setup.grip * .018), brakeForce: (car.brakeForce ?? 1) * (1 + setup.brakes * .075), upgrades: { ...setup } };
}

export function recordResult(profile, { trackId, carId, mode, result } = {}) {
  const next = normalizeProfile(profile);
  if (!safeId(trackId) || !cars.has(carId) || !next.owned.includes(carId) || !['race', 'time', 'drift', 'practice'].includes(mode) || result?.finished !== true || !Number.isFinite(result.time) || result.time <= 0 || result.time > 86400) return next;
  const receipt = typeof result.id === 'string' && /^[a-zA-Z0-9:_-]{1,128}$/.test(result.id) ? result.id : null;
  if (receipt && next.receipts.includes(receipt)) return next;
  const key = `${trackId}:${carId}:${mode}`;
  const old = next.records[key] ?? { bestTime: 0, bestScore: 0, races: 0, wins: 0, lastTime: 0 };
  const won = mode === 'race' && result.position === 1;
  // Compare single laps so changing a session from one lap to five never penalizes a record.
  const lapTime = Number.isFinite(result.bestLap) && result.bestLap > 0 && result.bestLap <= result.time ? result.bestLap : result.time;
  next.records[key] = { bestTime: old.bestTime > 0 ? Math.min(old.bestTime, lapTime) : lapTime, bestScore: Math.max(old.bestScore, integer(result.score ?? result.driftScore, 0, 1e9)), races: old.races + 1, wins: old.wins + Number(won), lastTime: result.time };
  next.races += 1; next.wins += Number(won); next.distance += number(result.distance, 0, 1e6);
  // Never trust an unbounded reward supplied by a save or result payload.
  const fallback = 150 + Math.min(1200, number(result.distance) * .055) + (won ? 300 : 0);
  const reward = result.time >= 10 && mode !== 'practice' ? integer(result.reward, fallback, 5000) : 0;
  next.credits = Math.min(MAX_CREDITS, next.credits + reward);
  if (receipt) next.receipts = [...next.receipts, receipt].slice(-256);
  return normalizeProfile(next);
}
