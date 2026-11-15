import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import {mountStartup} from '../assets/startup.js';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
function fixture(early=false) {
 const dom=new JSDOM(html,{url:'https://example.com/',pretendToBeVisual:true});
 const {window:w}=dom,d=w.document;const tasks=new Map();let seq=0,reloads=0;
 w.setTimeout=(fn,delay)=>{tasks.set(++seq,{fn,delay});return seq;};w.clearTimeout=id=>tasks.delete(id);
 if(early)d.documentElement.dataset.engineReady='true';
 const ui=mountStartup(d,{reload:()=>reloads++});
 return {dom,w,d,tasks,ui,reloads:()=>reloads,run(delay){for(const[id,t]of [...tasks])if(t.delay===delay){tasks.delete(id);t.fn();}}};
}
{
 const f=fixture(),host=f.d.getElementById('startup-status'),start=f.d.querySelector('[data-start]');let starts=0;start.addEventListener('click',()=>starts++);
 assert(host.hidden);start.click();assert.equal(starts,0);assert(!host.hidden);
 f.run(800);assert.equal(host.dataset.state,'loading');f.run(25000);assert.equal(host.dataset.state,'slow');
 const retry=host.querySelector('button');retry.focus();f.w.dispatchEvent(new f.w.CustomEvent('omoji:engine-ready'));
 assert(host.hidden);assert.equal(f.d.activeElement,start);assert.equal(f.tasks.size,0);start.click();assert.equal(starts,1);
 f.w.dispatchEvent(new f.w.Event('offline'));assert(host.hidden,'Ready sessions ignore startup connection notices');f.dom.window.close();
}
{
 const f=fixture(),host=f.d.getElementById('startup-status');f.d.getElementById('game-module').dispatchEvent(new f.w.Event('error'));
 assert.equal(host.dataset.state,'error');f.run(800);f.run(25000);assert.equal(host.dataset.state,'error','Specific errors survive delayed messages');
 host.querySelector('button').click();assert.equal(f.reloads(),1);assert(host.querySelector('button').disabled);f.ui.destroy();f.dom.window.close();
}
{
 const f=fixture(),host=f.d.getElementById('startup-status');f.w.dispatchEvent(new f.w.Event('offline'));assert.equal(host.dataset.state,'offline');f.w.dispatchEvent(new f.w.Event('online'));assert.equal(host.dataset.state,'loading');f.ui.destroy();assert.equal(f.tasks.size,0);f.dom.window.close();
}
{
 const f=fixture(true);assert.equal(f.tasks.size,0);assert(f.d.getElementById('startup-status').hidden);f.dom.window.close();
}
assert(html.includes('game.js?v=classic-remaster-v4.2'));
console.log('Startup: real readiness, delayed/failed/offline recovery, no premature start, focus restoration and cleanup passed.');
