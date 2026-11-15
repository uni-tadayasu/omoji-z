/** Report engine startup without touching the player's saved data. */
export function mountStartup(document, options = {}) {
  const win = document.defaultView;
  const host = document.getElementById('startup-status');
  if (!host || !win) return null;
  const text = host.querySelector('[data-startup-message]');
  const retry = host.querySelector('button');
  const controller = new win.AbortController();
  const {signal} = controller;
  const timers = [];
  let ready = false;
  let failed = false;
  const show = (message, state, canRetry = false) => {
    if (ready) return;
    text.textContent = message;
    host.dataset.state = state;
    retry.hidden = !canRetry;
    host.hidden = false;
  };
  const offline = () => show('接続がありません。通信が戻ったら、もう一度読み込めます。', 'offline', true);
  const finish = () => {
    if (ready) return;
    ready = true;
    timers.forEach(id => win.clearTimeout(id));
    if (host.contains(document.activeElement)) document.querySelector('[data-start]')?.focus({preventScroll:true});
    host.hidden = true;
    document.documentElement.dataset.engineReady = 'true';
    controller.abort();
  };
  const fail = () => { failed = true; show('ゲームの読み込みが完了しませんでした。再読み込みして試してください。', 'error', true); };
  win.addEventListener('omoji:engine-ready', finish, {signal});
  // Resource errors do not expose nested module filenames in every browser. The
  // delayed message below also handles dependency failures without guessing success.
  win.addEventListener('error', event => {
    const target = event.target;
    if (target?.id === 'game-module' || /\/assets\/(?:game|vehicles|driving|balance|workshop|classic-visuals)\.js(?:[?:]|$)/.test(event.filename || '')) fail();
  }, {capture:true, signal});
  win.addEventListener('offline', offline, {signal});
  win.addEventListener('online', () => show(failed ? '通信が戻りました。再読み込みしてゲームを準備できます。' : '通信が戻りました。ゲームを準備しています。', 'loading', true), {signal});
  document.addEventListener('click', event => {
    if (!ready && event.target.closest?.('[data-start]')) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (win.navigator.onLine === false) offline();
      else show('コースと車両を準備しています。準備完了後に走行を開始できます。', 'loading', failed);
    }
  }, {capture:true, signal});
  retry.addEventListener('click', () => {
    retry.disabled = true;
    text.textContent = '再読み込みしています…';
    (options.reload || (() => win.location.reload()))();
  }, {signal});
  if (document.documentElement.dataset.engineReady === 'true') finish();
  else {
    timers.push(win.setTimeout(() => {
      if (failed) return;
      if (win.navigator.onLine === false) offline();
      else show('コースと車両を準備しています…', 'loading');
    }, 800));
    timers.push(win.setTimeout(() => {
      if (failed) return;
      if (win.navigator.onLine === false) offline();
      else show('読み込みに時間がかかっています。接続を確認し、待つか再読み込みしてください。', 'slow', true);
    }, 25000));
  }
  return {finish, destroy() {timers.forEach(id => win.clearTimeout(id));controller.abort();}};
}
if (typeof document !== 'undefined') mountStartup(document);
