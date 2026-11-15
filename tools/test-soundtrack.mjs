#!/usr/bin/env node
// Catalog-level checks; audio decoding and file digests are checked by the composer.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  soundtrack, selectableSoundtrack, soundtrackThemes, menuScore,
  canonicalSongId, scoreForId, expectedAudioFiles, soundtrackVersion,
} from '../assets/soundtrack.js';
const manifest = JSON.parse(await readFile(new URL('../assets/audio/original-score.json', import.meta.url),'utf8'));
assert.equal(soundtrack.length,128);
assert.equal(selectableSoundtrack.length,33);
assert.equal(soundtrackThemes.length,9);
assert.equal(selectableSoundtrack.filter(track=>track.scene!=='menu').length,32);
assert.equal(new Set(expectedAudioFiles).size,33);
assert.equal(menuScore.id,'parapara-000');
assert.equal(menuScore.file,'v3-blue-hour-menu.mp3');
assert.equal(canonicalSongId('auto'),'auto');
assert.equal(canonicalSongId('unknown'),'auto');
assert.equal(canonicalSongId(null),'auto');
assert.equal(scoreForId('unknown'),null);
assert.equal(scoreForId('auto'),null);
assert.equal(canonicalSongId('parapara-033'),'parapara-001');
assert.equal(canonicalSongId('parapara-127'),'parapara-031');
assert(Object.isFrozen(soundtrack) && Object.isFrozen(selectableSoundtrack));
for (let i=0;i<128;i++) {
  const id=`parapara-${String(i).padStart(3,'0')}`;
  const track=soundtrack[i];
  assert.equal(track.id,id);
  assert(Object.isFrozen(track));
  const canonical=scoreForId(id);
  assert(canonical && !canonical.legacyAlias);
  assert.equal(canonical.id,canonicalSongId(id));
  assert.equal(track.file,canonical.file);
  assert.equal(track.legacyAlias,track.id!==track.canonicalId);
  assert(expectedAudioFiles.includes(track.file));
  assert(Math.abs(track.duration-32*4*60/track.bpm)<.000001);
}
for (const theme of soundtrackThemes.filter(theme=>theme.scene!=='menu')) {
  const variations=selectableSoundtrack.filter(track=>track.themeId===theme.id);
  assert.equal(variations.length,4);
  assert.deepEqual(new Set(variations.map(x=>x.mixId)),new Set(['drive','night','focus','peak']));
}
assert.equal(manifest.version,soundtrackVersion);
assert.equal(manifest.tracks.length,128);
assert.equal(manifest.files.length,33);
assert.deepEqual(manifest.expectedAudioFiles,[...expectedAudioFiles]);
for (const track of soundtrack) {
  const saved=manifest.tracks.find(x=>x.id===track.id);
  assert.equal(saved.file,track.file);
  assert.equal(saved.canonicalId,track.canonicalId);
  assert.equal(saved.legacyAlias,track.legacyAlias);
}
console.log('Soundtrack catalog passed: 9 themes, 33 selectable mixes, 128 saved IDs, canonical normalization and manifest consistency.');
