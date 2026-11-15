/* Progressive pit interface. Gameplay and save IDs stay unchanged. */
const race = document.getElementById('race');
const fullscreenButton = document.getElementById('race-fullscreen');
const displayStatus = document.getElementById('race-display-status');
const hint = document.getElementById('race-orientation-hint');
const closeHint = document.getElementById('dismiss-orientation-hint');
const header = document.querySelector('.site-header');
const nav = document.querySelector('.simple-nav');
const portrait = matchMedia('(orientation: portrait)');
const touch = matchMedia('(pointer: coarse)');
let hintTimer;
let hintDismissed = false;
try { hintDismissed = sessionStorage.getItem('omoji-display-hint-dismissed') === '1'; } catch {}

function updateHeaderHeight() {
  if (header) document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
}
if (header && typeof ResizeObserver === 'function') new ResizeObserver(updateHeaderHeight).observe(header);
updateHeaderHeight();
window.addEventListener('resize', updateHeaderHeight, { passive: true });
function updateVisibleViewport() {
  const height = window.visualViewport?.height || window.innerHeight;
  if (Number.isFinite(height) && height > 0) document.documentElement.style.setProperty('--visible-viewport-height', `${Math.round(height)}px`);
}
updateVisibleViewport();
window.visualViewport?.addEventListener('resize', updateVisibleViewport, { passive: true });
window.addEventListener('resize', updateVisibleViewport, { passive: true });

const presetButtons = [...document.querySelectorAll('[data-driving-preset]')];
const presetStatus = document.getElementById('driving-preset-status');
const presetDescriptions = {
  beginner: 'はじめて：ATと運転補助を使用。アクセルを離して減速し、ゆっくりハンドルを切ってみましょう。',
  balanced: 'バランス：ATと控えめな減速補助を使用。自分でハンドルを操作し、コーナーの速度を覚えられます。',
  sport: 'スポーツ：減速補助を使用せず、ハンドルの応答を高めます。AT / MTは設定画面で選べます。'
};
function paintPreset(preset) {
  if (!Object.hasOwn(presetDescriptions, preset)) return;
  for (const button of presetButtons) button.setAttribute('aria-pressed', String(button.dataset.drivingPreset === preset));
  if (presetStatus) presetStatus.textContent = presetDescriptions[preset];
}
window.addEventListener('omoji:driving-preset-changed', event => paintPreset(event.detail?.preset));
if (typeof window.omojiDrivingPreferences === 'function') paintPreset(window.omojiDrivingPreferences()?.preset);
window.dispatchEvent(new CustomEvent('omoji:driving-preset-request-current'));
for (const button of presetButtons) button.addEventListener('click', async () => {
  const preset = button.dataset.drivingPreset;
  if (!Object.hasOwn(presetDescriptions, preset)) return;
  try {
    if (typeof window.omojiApplyDrivingPreset === 'function') {
      await window.omojiApplyDrivingPreset(preset);
    } else {
      // A useful fallback while the game module is still starting.
      const assist = document.getElementById('assist');
      if (assist) {
        assist.checked = preset !== 'sport';
        assist.dispatchEvent(new Event('change', { bubbles: true }));
      }
      for (const id of ['transmission', 'settings-transmission']) {
        const field = document.getElementById(id);
        if (!field) continue;
        if (preset !== 'sport') field.value = 'at';
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
      window.dispatchEvent(new CustomEvent('omoji:driving-preset-request', { detail: { preset } }));
    }
    paintPreset(preset);
  } catch {
    if (presetStatus) presetStatus.textContent = '設定を切り替えられませんでした。設定画面から操作方法を変更できます。';
  }
});

// Keep the current tab visible in the scrollable small-screen navigation.
function revealCurrentTab() {
  const current = nav?.querySelector('[aria-current]');
  if (!nav || !current || nav.scrollWidth <= nav.clientWidth) return;
  const tabRect = current.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  if (tabRect.left < navRect.left || tabRect.right > navRect.right) {
    nav.scrollTo({ left: nav.scrollLeft + tabRect.left - navRect.left - (nav.clientWidth - tabRect.width) / 2, behavior: 'instant' });
  }
}
if (nav) new MutationObserver(revealCurrentTab).observe(nav, { attributes: true, subtree: true, attributeFilter: ['aria-current'] });
window.addEventListener('hashchange', revealCurrentTab);
revealCurrentTab();

function hideOrientationHint() {
  if (hint) hint.hidden = true;
  clearTimeout(hintTimer);
}
function updateOrientationHint() {
  hideOrientationHint();
  const overlayOpen = race && [...race.querySelectorAll('.race-overlay, .race-loading')].some(panel => !panel.hidden);
  if (!race || !hint || race.hidden || hintDismissed || !portrait.matches || !touch.matches || overlayOpen) return;
  hint.hidden = false;
  hintTimer = setTimeout(hideOrientationHint, 6500);
}
closeHint?.addEventListener('click', () => {
  hintDismissed = true;
  try { sessionStorage.setItem('omoji-display-hint-dismissed', '1'); } catch {}
  hideOrientationHint();
});
portrait.addEventListener('change', updateOrientationHint);
touch.addEventListener('change', updateOrientationHint);

function updateFullscreenButton() {
  if (!fullscreenButton) return;
  const active = document.fullscreenElement === race;
  fullscreenButton.setAttribute('aria-pressed', String(active));
  fullscreenButton.setAttribute('aria-label', active ? '全画面表示を終了' : '全画面で表示');
  fullscreenButton.title = active ? '全画面表示を終了' : '全画面で表示';
}
if (race && fullscreenButton && document.fullscreenEnabled && typeof race.requestFullscreen === 'function') {
  fullscreenButton.hidden = false;
  fullscreenButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === race) await document.exitFullscreen();
      else await race.requestFullscreen();
      if (displayStatus) displayStatus.textContent = document.fullscreenElement === race ? '全画面表示に切り替えました。' : '通常の表示に戻しました。';
    } catch {
      if (displayStatus) displayStatus.textContent = 'この環境では全画面表示に切り替えられませんでした。';
    }
    updateFullscreenButton();
  });
}
document.addEventListener('fullscreenchange', updateFullscreenButton);

// The race dialog already traps Tab. Move focus into newly opened local panels
// so keyboard users reach pause/results immediately, then restore it on close.
const focusOrigins = new WeakMap();
if (race) {
  const panels = [...race.querySelectorAll('.race-overlay')];
  const observer = new MutationObserver(records => {
    for (const { target } of records) {
      if (target === race) {
        if (race.hidden) {
          hideOrientationHint();
          if (document.fullscreenElement === race) document.exitFullscreen().catch(() => {});
        } else updateOrientationHint();
        continue;
      }
      if (!panels.includes(target)) { updateOrientationHint(); continue; }
      if (!target.hidden && !race.hidden) {
        focusOrigins.set(target, document.activeElement);
        requestAnimationFrame(() => {
          if (target.hidden || race.hidden || race.inert) return;
          const focus = target.querySelector('button:not([disabled]):not([hidden]), [href], input:not([disabled])');
          focus?.focus({ preventScroll: true });
        });
      } else {
        const origin = focusOrigins.get(target);
        if (origin instanceof HTMLElement && !origin.closest('[hidden], [inert]') && !race.hidden) origin.focus({ preventScroll: true });
      }
      updateOrientationHint();
    }
  });
  observer.observe(race, { attributes: true, attributeFilter: ['hidden'] });
  for (const panel of [...panels, ...race.querySelectorAll('.race-loading')]) observer.observe(panel, { attributes: true, attributeFilter: ['hidden'] });
}
