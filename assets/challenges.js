/** Time challenges use explicit handling regulations; legacy times remain references. */
export const CHALLENGE_REGULATION = 'v3';
export const CHALLENGE_RANKING_KEY = 'omojiz.challengeRanking.v3';
export const LEGACY_CHALLENGE_RANKING_KEY = 'omojiz.challengeRanking.v1';
export const CHALLENGE_URL_LIMIT = 512;
export const CHALLENGE_TIME_LIMIT = 86_400_000;
const trackPattern = /^[a-z\d-]{1,60}$/;
const encodedTimePattern = /^[1-9]\d{0,7}$/;
const oldRegulations = new Set(['legacy', 'v1', 'v2']);
const validTime = value => Number.isSafeInteger(value) && value > 0 && value <= CHALLENGE_TIME_LIMIT;
const validTrack = (id, lookup, excluded) => typeof id === 'string' && trackPattern.test(id) && id !== excluded && Boolean(lookup(id));

export function parseTimeChallenge(value, trackById, {excludedTrackId} = {}) {
  try {
    const url = new URL(value);
    if (url.href.length > CHALLENGE_URL_LIMIT || !['https:', 'http:'].includes(url.protocol) || url.username || url.password) return false;
    const query = url.searchParams;
    if (!query.has('tz')) return null;
    if (query.getAll('tz').length !== 1 || query.getAll('regulation').length > 1) return false;
    const [format, trackId, encodedTime, ...extra] = query.get('tz').split('.');
    if (format !== '1' || extra.length || !encodedTimePattern.test(encodedTime ?? '') ||
        !validTime(Number(encodedTime)) || !validTrack(trackId, trackById, excludedTrackId)) return false;
    const tag = query.get('regulation');
    if (tag !== null && tag !== CHALLENGE_REGULATION && !oldRegulations.has(tag)) return false;
    return {trackId, milliseconds:Number(encodedTime), regulation:tag === CHALLENGE_REGULATION ? CHALLENGE_REGULATION : 'legacy'};
  } catch { return false; }
}

export function createTimeChallengeUrl(base, challenge) {
  try {
    if (challenge?.regulation !== CHALLENGE_REGULATION || typeof challenge.trackId !== 'string' || !trackPattern.test(challenge.trackId)) return '';
    const ms = challenge.milliseconds ?? challenge.ms;
    if (!validTime(ms)) return '';
    const url = new URL(base);
    if (!['https:', 'http:'].includes(url.protocol)) return '';
    url.username = ''; url.password = ''; url.search = ''; url.hash = 'time-challenge-offer';
    url.searchParams.set('tz', `1.${challenge.trackId}.${ms}`);
    url.searchParams.set('regulation', CHALLENGE_REGULATION);
    return url.href.length <= CHALLENGE_URL_LIMIT ? url.href : '';
  } catch { return ''; }
}

export function normalizeChallengeRanking(rows, trackById, {regulation = CHALLENGE_REGULATION, excludedTrackId} = {}) {
  if (!Array.isArray(rows)) return [];
  const result = new Map();
  for (const row of rows.slice(0,100)) {
    if (!row || !validTrack(row.trackId,trackById,excludedTrackId) || !validTime(row.milliseconds)) continue;
    if (regulation === CHALLENGE_REGULATION ? row.regulation !== CHALLENGE_REGULATION :
        row.regulation !== undefined && !oldRegulations.has(row.regulation)) continue;
    const name = typeof row.name === 'string' ? row.name.normalize('NFC').trim().replace(/\s+/gu,' ') : '';
    if (!name || [...name].length > 24 || /[\p{Cc}\p{Bidi_Control}]/u.test(name)) continue;
    const entry = {trackId:row.trackId, milliseconds:row.milliseconds, name, regulation};
    result.set(JSON.stringify([entry.trackId,entry.milliseconds,entry.name.toLocaleLowerCase('ja'),regulation]),entry);
  }
  return [...result.values()];
}
