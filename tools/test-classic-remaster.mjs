import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { JSDOM, VirtualConsole } from 'jsdom';
import { vehicleCatalog } from '../assets/vehicles.js';

const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const baseline=JSON.parse(read('tools/classic-dom-contract.json'));
const errors=[],virtualConsole=new VirtualConsole();
virtualConsole.on('jsdomError',error=>errors.push(error));
const dom=new JSDOM(read('index.html'),{url:'https://omoji-z.example/?course=haruna#garage',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});
const {document}=dom.window;
const lookup=id=>{const element=document.getElementById(id);assert(element,`Missing original classic control #${id}`);return element;};
const modules=[...document.querySelectorAll('script[type="module"][src]')].map(script=>script.getAttribute('src').split('?')[0]);
assert(modules.includes('./assets/game.js'),'Full classic engine must load on the main entry.');
assert(!modules.includes('./assets/remake/app.js'),'The six-course game cannot replace the requested classic default.');
assert(modules.includes('./assets/classic-remaster-ui.js'),'Classic presentation module must be mounted.');
assert(document.body.classList.contains('classic-remastered'));
assert.equal(vehicleCatalog.length,515);assert.equal(vehicleCatalog.filter(car=>!car.operatorOnly).length,512);

const ids=[...document.querySelectorAll('[id]')].map(element=>element.id);
assert.equal(new Set(ids).size,ids.length,'Duplicate IDs break existing game bindings.');
for(const id of baseline.ids)lookup(id);
for(const id of baseline.views)assert(lookup(id).hasAttribute('data-menu-view'),`Original menu view removed: ${id}`);
for(const control of baseline.controls){
 const element=lookup(control.id);assert.equal(element.tagName.toLowerCase(),control.tag,`Control type changed for ${control.id}`);assert.equal(element.type,control.type,`Input semantics changed for ${control.id}`);
 if(control.options){const values=[...element.options].map(option=>option.value);for(const option of control.options)assert(values.includes(option),`Original choice ${option} removed from ${control.id}`);}
}
const expectedCounts=new Map();
for(const hook of baseline.hooks){const key=JSON.stringify(hook);expectedCounts.set(key,(expectedCounts.get(key)||0)+1);}
for(const [key,count]of expectedCounts){const hook=JSON.parse(key),actual=[...document.querySelectorAll(`${hook.tag}[${hook.attribute}]`)].filter(element=>element.getAttribute(hook.attribute)===hook.value).length;assert(actual>=count,`Original event binding removed: ${key}`);}
for(const target of baseline.views){const link=document.querySelector(`.simple-nav a[href="#${target}"]`);assert(link,`Main navigation no longer reaches ${target}`);}
assert.equal(lookup('operator-key').type,'password','Operator entry must retain its credential input semantics.');
assert.equal(document.querySelector('link[rel="canonical"]').href,'https://omoji-z.com/');
assert(!document.querySelector('meta[name="robots"]')?.content.includes('noindex'),'The full classic game must be indexable.');

// Every old course/car deep link still reaches the same full game at index.html.
const routeMap=JSON.parse(read('assets/catalog-routes.json'));
assert.equal(Object.keys(routeMap.courses).length,256);
assert.equal(Object.keys(routeMap.cars).length,512);
for(const id of ['haruna','mugen-apex-loop','hyakuri-endurance'])assert(routeMap.courses[id]);
for(const file of [routeMap.courses.haruna,routeMap.cars.hachi]){
 const page=new JSDOM(read(file),{url:`https://omoji-z.example/${file}`}).window.document;const launch=[...page.querySelectorAll('a[href]')].map(a=>new URL(a.href)).find(url=>url.searchParams.has('course')||url.searchParams.has('car'));assert(launch&&['/','/index.html'].includes(launch.pathname),'Classic catalog launch URL must retain the default game entry.');
}

const legacy=read('legacy.html'),legacyDOM=new JSDOM(legacy).window.document;
assert(legacyDOM.querySelector('meta[name="robots"]')?.content.includes('noindex'));
assert.equal(legacyDOM.querySelector('link[rel="canonical"]')?.href,'https://omoji-z.com/');
const redirectScripts=[...legacyDOM.querySelectorAll('script:not([src])')].map(element=>element.textContent).filter(text=>text.includes('location'));
assert(redirectScripts.length,'Legacy alias must preserve old bookmarked links through a redirect.');
let redirected='';
const location={href:'https://omoji-z.example/legacy.html?course=haruna&car=hachi#race-options',search:'?course=haruna&car=hachi',hash:'#race-options',replace:value=>{redirected=String(value);}};
const redirectContext=vm.createContext({location,window:{location},URL,document:legacyDOM});
for(const script of redirectScripts)vm.runInContext(script,redirectContext);
const redirect=new URL(redirected,location.href);
assert.equal(redirect.pathname,'/index.html');assert.equal(redirect.search,location.search);assert.equal(redirect.hash,location.hash);

const reborn=new JSDOM(read('reborn.html')).window.document;
assert(reborn.querySelector('script[src^="./assets/remake/app.js"]'));
assert(reborn.querySelector('meta[name="robots"]')?.content.includes('noindex'));

// Exercise the presentation module against actual classic containers and source events.
// Rendering/network/media are not implied by these DOM assertions.
const {mountClassicRemaster}=await import(new URL('../assets/classic-remaster-ui.js',import.meta.url));
let frameSequence=0;const frames=new Map();
dom.window.requestAnimationFrame=callback=>{const id=++frameSequence;frames.set(id,callback);return id;};
dom.window.cancelAnimationFrame=id=>frames.delete(id);
const flush=async()=>{for(let pass=0;pass<5;pass++){await Promise.resolve();await new Promise(resolve=>setImmediate(resolve));if(!frames.size)return;const pending=[...frames.values()];frames.clear();for(const callback of pending)callback(performance.now());}assert.equal(frames.size,0,'Presentation observers must settle instead of looping.');};
const originalEconomy=JSON.stringify({balance:23742,owned:['hachi','kagero'],cars:{hachi:{paint:'#abcdef'}}});
const originalSettings=JSON.stringify({car:'hachi',track:'haruna',operatorUnlocked:true});
dom.window.localStorage.setItem('omojiz.economy.v1',originalEconomy);
dom.window.localStorage.setItem('omoji-z.settings.v1',originalSettings);
const trackList=lookup('track-list'),modeList=lookup('mode-list');
trackList.innerHTML='<button data-track="haruna" aria-pressed="true"><strong class="track-name">銀樹峠</strong></button><button data-track="kirisawa" aria-pressed="false"><strong class="track-name">霧沢峠</strong></button>';
modeList.innerHTML='<button data-mode="time" aria-pressed="true"><strong class="mode-name">タイムアタック</strong></button><button data-mode="practice" aria-pressed="false"><strong class="mode-name">練習</strong></button>';
const atlas=JSON.parse(read('assets/classic-route-atlas.json'));assert.equal(Object.keys(atlas).length,256);
let fetchCalls=0,atlasSignal;
dom.window.fetch=async(url,options)=>{fetchCalls++;atlasSignal=options.signal;assert(String(url).endsWith('/assets/classic-route-atlas.json'));return {ok:true,json:async()=>({...atlas,'broken-route':{path:'<script>bad</script>',length:1200}})};};
const enhancement=mountClassicRemaster(document);assert(enhancement);
assert.equal(mountClassicRemaster(document),enhancement,'Mount is idempotent.');
assert.equal(document.querySelectorAll('.remaster-selected-brief').length,1);
assert(lookup('remaster-route-image').src.endsWith('/art/routes/haruna.svg'));
assert.equal(lookup('remaster-route-image').alt,'銀樹峠のコースイメージ');
assert.equal(lookup('remaster-session-mode').textContent,'タイムアタック');
await flush();assert.equal(fetchCalls,1,'Idempotent mounting makes only one optional atlas request.');
assert.equal(lookup('remaster-route-path').getAttribute('d'),atlas.haruna.path);
assert.equal(lookup('remaster-route-distance').textContent,`${(atlas.haruna.length/1000).toFixed(1)} km`);
assert.equal(lookup('remaster-route-label').textContent,'COURSE MAP');
assert.equal(lookup('remaster-route-outline').style.display,'');
const transmission=lookup('transmission'),difficulty=lookup('difficulty');
transmission.selectedIndex=transmission.options.length-1;
transmission.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
await flush();assert.equal(lookup('remaster-session-gear').textContent,transmission.selectedOptions[0].textContent.trim());
const cards=trackList.querySelectorAll('[data-track]');cards[0].setAttribute('aria-pressed','false');cards[1].setAttribute('aria-pressed','true');
await flush();assert(lookup('remaster-route-image').src.endsWith('/art/routes/kirisawa.svg'));
assert.equal(lookup('remaster-route-image').alt,'霧沢峠のコースイメージ');
assert.equal(lookup('remaster-route-path').getAttribute('d'),atlas.kirisawa.path);
const malformed=document.createElement('button');malformed.dataset.track='broken-route';malformed.setAttribute('aria-pressed','true');trackList.append(malformed);cards[1].setAttribute('aria-pressed','false');
await flush();assert.equal(lookup('remaster-route-outline').style.display,'none');assert(lookup('remaster-route-distance').hidden);assert.match(lookup('remaster-route-label').textContent,/COURSE ART/);
malformed.remove();cards[0].setAttribute('aria-pressed','true');await flush();
lookup('difficulty-field').hidden=true;await flush();assert.equal(lookup('remaster-session-difficulty').textContent,'SOLO');
lookup('difficulty-field').hidden=false;await flush();assert.equal(lookup('remaster-session-difficulty').textContent,difficulty.selectedOptions[0].textContent.trim());
modeList.hidden=true;await flush();assert.equal(lookup('remaster-session-mode').textContent,'テクニック走行');
modeList.hidden=false;lookup('car-count').textContent='24';lookup('track-count').textContent='12';await flush();
assert.match(lookup('remaster-library-counts').textContent,/24 MACHINES \/ 12 ROUTES/);
let shortcutClicks=0;const firstLink=document.querySelector('.simple-nav a');
firstLink.addEventListener('click',event=>{event.preventDefault();shortcutClicks++;});
const altOne=target=>target.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'1',altKey:true,bubbles:true,cancelable:true}));
altOne(document.body);assert.equal(shortcutClicks,1,'Alt+number opens an existing menu link.');
altOne(lookup('operator-key'));assert.equal(shortcutClicks,1,'Shortcut must not interrupt sensitive input.');
const overlay=document.querySelector('[data-overlay]');overlay.hidden=false;altOne(document.body);assert.equal(shortcutClicks,1,'Shortcut must not escape an active dialog.');overlay.hidden=true;
assert.equal(dom.window.localStorage.getItem('omojiz.economy.v1'),originalEconomy);
assert.equal(dom.window.localStorage.getItem('omoji-z.settings.v1'),originalSettings);
enhancement.destroy();await flush();assert(atlasSignal.aborted,'Destroy cancels the optional atlas request.');assert(!document.querySelector('.remaster-selected-brief'));assert(!document.querySelector('.remaster-nav-caption'));
altOne(document.body);assert.equal(shortcutClicks,1,'Destroy must remove navigation shortcuts.');
let resolveLate;dom.window.fetch=()=>new Promise(resolve=>{resolveLate=resolve;});
const late=mountClassicRemaster(document);late.destroy();resolveLate({ok:true,json:async()=>atlas});await flush();assert(!document.querySelector('.remaster-selected-brief'),'Late atlas completion cannot recreate destroyed UI.');
assert.equal(errors.length,0);
console.log('Classic presentation: actual 256-course atlas, invalid-atlas fallback, source-observed route/mode/gear/difficulty changes, stable observers, idempotent mounting, keyboard boundaries, unchanged saves and cleanup passed.');
console.log(`Classic remaster compatibility: ${baseline.ids.length} original IDs, ${baseline.controls.length} input contracts, ${baseline.hooks.length} action hooks, all 8 menu views, 512+3 cars, 256 course links, and query/hash-preserving legacy redirect passed.`);
dom.window.close();
