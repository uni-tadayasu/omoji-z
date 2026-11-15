const SOURCES = {
  garage: new URL('../audio/v3-blue-hour-menu.mp3', import.meta.url).href,
  race: new URL('../audio/v3-glass-vector-drive.mp3', import.meta.url).href
};
const clamp = (value, low, high) => Math.max(low, Math.min(high, Number.isFinite(value) ? value : low));

/** One music voice and one synthesized engine. Audio starts only after a gesture. */
export class GameAudio {
  constructor() {
    this.volume = .35; this.muted = false; this.scene = 'garage'; this.unlocked = false; this.suspended = false;
    this.music = null; this.context = null; this.nodes = []; this.lastPlayingSource = null; this.disposed = false;
  }
  async unlock() {
    if (this.disposed) return false;
    this.unlocked = true; this.suspended = false;
    try {
      if (!this.context) {
        const Context = globalThis.AudioContext ?? globalThis.webkitAudioContext;
        if (Context) {
          this.context = new Context();
          this.engineGain = this.context.createGain(); this.engineGain.gain.value = 0; this.engineGain.connect(this.context.destination);
          this.filter = this.context.createBiquadFilter(); this.filter.type = 'lowpass'; this.filter.frequency.value = 900; this.filter.connect(this.engineGain);
          [1, 2, 4].forEach((ratio, index) => {
            const oscillator = this.context.createOscillator(), gain = this.context.createGain();
            oscillator.type = index === 0 ? 'sawtooth' : 'triangle'; oscillator.frequency.value = 34 * ratio;
            gain.gain.value = [.28, .12, .055][index]; oscillator.connect(gain); gain.connect(this.filter); oscillator.start();
            this.nodes.push({ oscillator, gain, ratio });
          });
        }
      }
      if (this.context?.state === 'suspended') await this.context.resume();
    } catch { /* Music remains available if Web Audio is unavailable. */ }
    await this.playMusic();
    return true;
  }
  setVolume(value) { this.volume = clamp(value, 0, 1); this.applyVolume(); }
  setMuted(value) { this.muted = value === true; this.applyVolume(); if (!this.muted && this.unlocked && !this.suspended) void this.playMusic(); }
  setScene(scene) {
    const next = scene === 'race' ? 'race' : 'garage';
    if (this.scene === next) return;
    this.scene = next; this.lastPlayingSource = null;
    if (next === 'garage' && this.engineGain) this.engineGain.gain.setTargetAtTime(0, this.context.currentTime, .05);
    if (this.music) { this.music.pause(); this.music.currentTime = 0; }
    if (this.unlocked && !this.suspended) void this.playMusic();
  }
  applyVolume() {
    if (this.music) this.music.volume = this.muted || this.suspended ? 0 : this.volume * .55;
    if (this.muted || this.suspended) this.engineGain?.gain.setTargetAtTime(0, this.context.currentTime, .025);
  }
  async playMusic() {
    if (!this.unlocked || this.suspended || this.disposed || this.muted || typeof globalThis.Audio !== 'function') return;
    const source = SOURCES[this.scene];
    if (!this.music) { this.music = new Audio(); this.music.loop = true; this.music.preload = 'none'; }
    if (this.lastPlayingSource !== source) { this.music.pause(); this.music.src = source; this.lastPlayingSource = source; }
    this.applyVolume();
    if (!this.music.paused) return;
    try { await this.music.play(); } catch { /* The next intentional unlock retries; never retry on every frame. */ }
  }
  update(state = {}) {
    if (!this.context || !this.engineGain || this.disposed) return;
    const now = this.context.currentTime;
    const audible = this.unlocked && !this.suspended && !this.muted && this.scene === 'race' && state.paused !== true;
    const speed = Math.abs(Number(state.speed) || 0), throttle = clamp(state.throttle ?? .35, 0, 1);
    const rpm = Number.isFinite(state.rpm) ? clamp(state.rpm, 750, 9500) : 1000 + (speed * 125 % 4700) + throttle * 500;
    const base = 25 + rpm / 65;
    for (const { oscillator, ratio } of this.nodes) oscillator.frequency.setTargetAtTime(base * ratio, now, .075);
    this.filter.frequency.setTargetAtTime(420 + rpm * .22 + throttle * 600, now, .09);
    this.engineGain.gain.setTargetAtTime(audible ? this.volume * (.035 + throttle * .09 + Math.min(speed, 90) * .00035) : 0, now, .075);
  }
  suspend() { this.suspended = true; this.music?.pause(); this.applyVolume(); }
  dispose() {
    this.disposed = true; this.suspended = true;
    if (this.music) { this.music.pause(); this.music.removeAttribute('src'); this.music.load(); this.music = null; }
    for (const { oscillator, gain } of this.nodes) { try { oscillator.stop(); oscillator.disconnect(); gain.disconnect(); } catch {} }
    this.nodes = []; this.engineGain?.disconnect(); this.filter?.disconnect();
    if (this.context && this.context.state !== 'closed') this.context.close().catch(() => {});
    this.context = null;
  }
}
