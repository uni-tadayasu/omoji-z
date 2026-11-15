/** Accessible status for the selected operator model. Network ownership stays with the caller. */
const mounted = new WeakMap();
const states = new Set(['idle', 'loading', 'decoding', 'ready', 'fallback', 'error', 'cancelled']);
const labels = {
  idle: '専用モデルを準備できます。',
  loading: 'グランドサルーンの専用モデルを読み込んでいます。',
  decoding: '車体の形状と材質を準備しています。',
  ready: 'グランドサルーンの専用モデルの準備ができました。',
  fallback: '専用モデルを読み込めませんでした。現在は簡易表示です。',
  error: '専用モデルを読み込めませんでした。接続を確認して再試行できます。',
  cancelled: '専用モデルの読み込みを中止しました。もう一度読み込めます。'
};
const mb = bytes => `${(bytes / 1000000).toFixed(1)} MB`;

export function mountModelStatus({document = globalThis.document, onRetry, onCancel} = {}) {
  const host = document?.getElementById('rolls-model-status');
  const win = document?.defaultView;
  if (!host || !win) return null;
  if (mounted.has(host)) return mounted.get(host);
  const controller = new win.AbortController();
  const {signal} = controller;
  const original = {
    hidden: host.hidden,
    attributes: ['role', 'aria-label', 'aria-busy', 'tabindex'].map(name => [name, host.getAttribute(name)]),
    children: [...host.childNodes]
  };
  let active = false;
  let disposed = false;
  let action = 0;
  let data = {state:'idle'};
  let lastAnnouncement = '';
  host.replaceChildren();
  host.classList.add('model-status');
  host.setAttribute('role', 'group');
  host.setAttribute('aria-label', 'グランドサルーンのモデル読み込み');
  host.setAttribute('tabindex', '-1');
  // Do not mark the live-region ancestor busy: assistive technology would defer its progress announcements.
  host.removeAttribute('aria-busy');
  const add = (tag, className) => {
    const node = document.createElement(tag);
    node.className = className;
    host.append(node);
    return node;
  };
  const message = add('span', 'model-status-message');
  message.setAttribute('aria-hidden', 'true');
  const meter = add('progress', 'model-status-progress');
  meter.setAttribute('aria-label', '専用モデルの受信量');
  const quantity = add('span', 'model-status-quantity');
  quantity.setAttribute('aria-hidden', 'true');
  const announcement = add('span', 'model-status-announcement');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-atomic', 'true');
  const retry = add('button', 'model-status-retry');
  retry.type = 'button';
  retry.textContent = 'モデルを再読込';
  const cancel = add('button', 'model-status-cancel');
  cancel.type = 'button';
  cancel.textContent = '読み込みを中止';

  function render() {
    if (disposed) return;
    host.hidden = !active;
    if (!active) return;
    const state = data.state;
    const receiving = state === 'loading';
    const busy = receiving || state === 'decoding';
    const offline = win.navigator.onLine === false;
    const recoverable = ['error', 'fallback', 'cancelled'].includes(state);
    const customMessage = typeof data.message === 'string' && data.message.trim() ? data.message.trim().slice(0, 400) : null;
    const statusMessage = offline && (busy || recoverable)
      ? '現在オフラインです。通信が戻ったらモデルを再読み込みできます。'
      : customMessage || labels[state];
    const hadButtonFocus = document.activeElement === retry || document.activeElement === cancel;
    const loaded = Number.isFinite(data.loaded) && data.loaded >= 0 ? data.loaded : null;
    const total = Number.isFinite(data.total) && data.total > 0 ? data.total : null;
    const known = receiving && loaded !== null && total !== null;
    const amount = known ? Math.min(loaded, total) : loaded;
    const percent = known ? Math.floor(amount / total * 100) : null;
    message.textContent = statusMessage;
    host.dataset.modelState = state;
    meter.hidden = !busy;
    if (known) {
      meter.max = total;
      meter.value = amount;
      meter.setAttribute('aria-valuetext', `${percent}%、${mb(amount)} / ${mb(total)}`);
    } else {
      meter.removeAttribute('value');
      meter.removeAttribute('aria-valuetext');
    }
    quantity.hidden = !receiving;
    quantity.textContent = known ? `${percent}% · ${mb(amount)} / ${mb(total)}`
      : loaded !== null ? `${mb(loaded)} 受信済み` : '受信量を確認しています';
    retry.hidden = !recoverable || typeof onRetry !== 'function';
    retry.disabled = offline;
    cancel.hidden = !busy || typeof onCancel !== 'function';
    cancel.disabled = false;
    // Live-region changes are limited to actual stages, connection changes and 25% buckets.
    const bucket = known ? Math.floor(percent / 25) * 25 : null;
    const spoken = `${statusMessage}${known && !offline ? ` ${bucket}%受信済み。` : ''}`;
    if (spoken !== lastAnnouncement) {announcement.textContent = spoken;lastAnnouncement = spoken;}
    if (hadButtonFocus && document.activeElement.hidden) host.focus({preventScroll:true});
  }
  function update(next = {}) {
    if (disposed || !states.has(next.state)) return;
    data = {...next};
    render();
  }
  retry.addEventListener('click', () => {
    if (disposed || !active || retry.disabled || retry.hidden) return;
    const ticket = ++action;
    update({state:'loading'});
    try {
      Promise.resolve(onRetry()).catch(error => {
        if (disposed || ticket !== action || !active || !['loading', 'decoding'].includes(data.state)) return;
        update({state:error?.name === 'AbortError' ? 'cancelled' : 'error'});
      });
    } catch {if (ticket === action) update({state:'error'});}
  }, {signal});
  cancel.addEventListener('click', () => {
    if (disposed || !active || cancel.hidden) return;
    action++;
    update({state:'cancelled'});
    try {onCancel();} catch {update({state:'error'});}
  }, {signal});
  win.addEventListener('offline', render, {signal});
  win.addEventListener('online', render, {signal});
  const api = {
    setActive(value) {
      if (disposed) return;
      const next = Boolean(value);
      if (active !== next) {action++;lastAnnouncement = '';}
      active = next;
      render();
    },
    update,
    destroy() {
      if (disposed) return;
      disposed = true;
      action++;
      controller.abort();
      host.replaceChildren(...original.children);
      host.classList.remove('model-status');
      delete host.dataset.modelState;
      for (const [name, value] of original.attributes) value === null ? host.removeAttribute(name) : host.setAttribute(name, value);
      host.hidden = original.hidden;
      mounted.delete(host);
    }
  };
  mounted.set(host, api);
  render();
  return api;
}
