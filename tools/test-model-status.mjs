/** Model loading status uses real progress and preserves user-controlled retry/cancel ownership. */
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {mountModelStatus} from '../assets/model-status.js';

const dom = new JSDOM('<p id="rolls-model-status" role="status" hidden>original</p>', {url:'https://game.example/', pretendToBeVisual:true});
const win = dom.window, document = win.document, host = document.querySelector('p');
let online = true, retries = 0, cancels = 0, rejectRetry;
Object.defineProperty(win.navigator, 'onLine', {get:()=>online});
const status = mountModelStatus({document,
  onRetry:()=>{retries++;return new Promise((resolve,reject)=>{rejectRetry=reject;});},
  onCancel:()=>{cancels++;}
});
assert.equal(mountModelStatus({document}), status, 'Mounting is idempotent.');
assert.equal(host.querySelectorAll('progress').length, 1);
assert(host.hidden);
status.setActive(true);
status.update({state:'loading', loaded:1024, total:4096});
const meter = host.querySelector('progress'), quantity = host.querySelector('.model-status-quantity');
const live = host.querySelector('[role=status]'), retry = host.querySelector('.model-status-retry'), cancel = host.querySelector('.model-status-cancel');
assert.equal(host.getAttribute('role'), 'group');
assert(!host.hasAttribute('aria-busy'), 'A busy ancestor must not suppress live progress updates.');
assert.equal(meter.value,1024);assert.equal(meter.max,4096);assert.match(quantity.textContent,/25%/);
assert.match(live.textContent,/25%受信済み/);
const spoken = live.textContent;
for (let bytes=1025;bytes<2048;bytes+=7) status.update({state:'loading',loaded:bytes,total:4096});
assert.equal(live.textContent,spoken,'Frequent byte reports do not change the live announcement within a bucket.');
status.update({state:'loading',loaded:2048,total:4096});assert.match(live.textContent,/50%受信済み/);
status.update({state:'loading',loaded:9000,total:4096});assert.equal(meter.value,4096);assert.match(quantity.textContent,/100%/);
status.update({state:'loading',loaded:2500});assert(!meter.hasAttribute('value'));assert.match(quantity.textContent,/受信済み/);
status.update({state:'loading',loaded:NaN,total:-10});assert(!meter.hasAttribute('value'));assert(!quantity.textContent.includes('NaN'));
status.update({state:'decoding'});assert(!meter.hasAttribute('value'));assert(!meter.hidden);assert(quantity.hidden);assert(!cancel.hidden);
cancel.click();assert.equal(cancels,1);assert.equal(host.dataset.modelState,'cancelled');assert(!retry.hidden);assert(cancel.hidden);
retry.focus();retry.click();assert.equal(retries,1);assert.equal(host.dataset.modelState,'loading');assert(retry.hidden);assert.equal(document.activeElement,host,'Hiding the focused action keeps a useful focus target.');
cancel.click();assert.equal(cancels,2);rejectRetry(new Error('Late failure after abort'));await Promise.resolve();await Promise.resolve();assert.equal(host.dataset.modelState,'cancelled');
status.update({state:'error',message:'<img src=x onerror=alert(1)>'});assert.equal(host.querySelectorAll('img').length,0,'Messages are text only.');
online=false;win.dispatchEvent(new win.Event('offline'));assert(retry.disabled);retry.click();assert.equal(retries,1);
assert.match(live.textContent,/オフライン/);
online=true;win.dispatchEvent(new win.Event('online'));assert(!retry.disabled);assert.equal(retries,1,'Returning online must never begin a download by itself.');
retry.click();assert.equal(retries,2);status.setActive(false);rejectRetry(new Error('Late failure after selection changed'));await Promise.resolve();await Promise.resolve();assert(host.hidden);
status.setActive(true);status.update({state:'ready'});assert(meter.hidden);assert(cancel.hidden);assert(retry.hidden);assert.match(live.textContent,/準備ができました/);
status.update({state:'unsupported'});assert.equal(host.dataset.modelState,'ready');
status.destroy();assert(host.hidden);assert.equal(host.getAttribute('role'),'status');assert.equal(host.textContent,'original');assert(!host.classList.contains('model-status'));assert(!host.hasAttribute('tabindex'));
win.dispatchEvent(new win.Event('offline'));assert.equal(host.textContent,'original');
assert.equal(mountModelStatus({document:new JSDOM('').window.document}),null);
dom.window.close();
console.log('Model status: truthful determinate/unknown progress, announcement throttling, offline/retry/cancel ownership, stale callback isolation, text safety, focus and lifecycle passed.');
