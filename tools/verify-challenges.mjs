#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import * as codec from '../assets/challenges.js';
const course={id:'sample-course',name:'検証コース'}, technique={id:'technique',name:'Technique',endlessTechnique:true};
const lookup=id=>id===course.id?course:id===technique.id?technique:undefined;
const options={excludedTrackId:technique.id};
const base='https://example.test/game/?old=1#garage';
const issue=ms=>codec.createTimeChallengeUrl(base,{trackId:course.id,ms,regulation:'v3'});
const parse=url=>codec.parseTimeChallenge(url,lookup,options);
const current=issue(12345),legacy='https://example.test/game/?tz=1.sample-course.12345';
assert.equal(new URL(current).searchParams.get('tz'),'1.sample-course.12345');
assert.equal(new URL(current).searchParams.get('regulation'),'v3');
assert.equal(new URL(current).hash,'#time-challenge-offer');
assert.equal(new URL(current).searchParams.has('old'),false);
assert.deepEqual(parse(current),{trackId:course.id,milliseconds:12345,regulation:'v3'});
assert.equal(parse(legacy).regulation,'legacy');
assert.equal(parse(legacy+'&regulation=v1').regulation,'legacy');
assert.equal(parse(legacy+'&regulation=v2').regulation,'legacy');
assert.equal(parse(base),null);
assert.equal(parse(issue(86_400_000)).milliseconds,86_400_000);
assert.equal(parse(issue(1)).milliseconds,1);
for(const value of [0,-1,86_400_001,NaN,Infinity,1.1,'12345'])assert.equal(issue(value),'');
assert.equal(codec.createTimeChallengeUrl(base,{trackId:course.id,ms:1000}), '');
assert.equal(codec.createTimeChallengeUrl(base,{trackId:course.id,ms:1000,regulation:'v2'}), '');
assert.equal(codec.createTimeChallengeUrl(base,{trackId:123,ms:1000,regulation:'v3'}), '');
const invalid=[
 'not a url','javascript:alert(1)','https://user:pass@example.test/?tz=1.sample-course.1000',
 legacy+'&tz=1.sample-course.1000',legacy+'&regulation=v3&regulation=v3',
 legacy+'&regulation=v4',legacy+'&regulation=',
 'https://example.test/?tz=2.sample-course.1000','https://example.test/?tz=1.sample-course.0',
 'https://example.test/?tz=1.sample-course.001','https://example.test/?tz=1.sample-course.-1',
 'https://example.test/?tz=1.sample-course.1e3','https://example.test/?tz=1.sample-course.1.0',
 'https://example.test/?tz=1.sample-course.86400001','https://example.test/?tz=1.sample-course.1000.extra',
 'https://example.test/?tz=1.unknown.1000','https://example.test/?tz=1.technique.1000',
 'https://example.test/?tz=1.'+'x'.repeat(61)+'.1000',
 'https://example.test/?tz=1.%3Cscript%3E.1000',legacy+'&padding='+'x'.repeat(512),
];
for(const url of invalid)assert.equal(parse(url),false,url);
const row={trackId:course.id,milliseconds:1000,name:'Alice',regulation:'v3'};
assert.deepEqual(codec.normalizeChallengeRanking([row,{...row,regulation:undefined},{...row,regulation:'v2'}],lookup),[row]);
assert.equal(codec.normalizeChallengeRanking([{...row,name:'A\u202eB'}],lookup).length,0);
assert.equal(codec.normalizeChallengeRanking([{...row,name:'A\0B'}],lookup).length,0);
assert.equal(codec.normalizeChallengeRanking([{...row,name:'🚗'.repeat(24)}],lookup).length,1);
assert.equal(codec.normalizeChallengeRanking([{...row,name:'🚗'.repeat(25)}],lookup).length,0);
assert.equal(codec.normalizeChallengeRanking([row,{...row,name:'alice'}],lookup).length,1);
assert.equal(codec.normalizeChallengeRanking(Array.from({length:101},(_,i)=>({...row,name:'Driver '+i})),lookup).length,100);
assert.equal(codec.normalizeChallengeRanking([{...row,regulation:undefined}],lookup,{regulation:'legacy'})[0].regulation,'legacy');

// Execute the actual patched parser, offer/share form and ranking submit path.
// The minimal DOM records textContent and listeners; it never interprets HTML.
class Element {
 constructor(tag='div'){this.tagName=tag;this.id='';this.value='';this.hidden=false;this.children=[];this.listeners=new Map();this.queries=new Map();this.className='';this.textContent='';this.elements={};}
 querySelector(selector){if(!this.queries.has(selector))this.queries.set(selector,new Element(selector));return this.queries.get(selector);}
 addEventListener(type,fn){this.listeners.set(type,fn);}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=nodes;if(!this.value&&nodes[0]?.value!==undefined)this.value=nodes[0].value;}
 insertCell(){const cell=new Element('td');this.append(cell);return cell;}
 setAttribute(){}
 focus(){this.focused=true;}
 select(){}
 reset(){}
 scrollIntoView(){}
}
const sourcePath=process.argv[2]??new URL('../assets/game.js',import.meta.url);
const source=await readFile(sourcePath,'utf8');
assert(source.includes('OMOJI_CHALLENGE_REGULATION_V3'),'Apply v3-challenge-patch.mjs before integration checks');
const chunk=(from,to)=>{const start=source.indexOf(from),end=source.indexOf(to,start+from.length);assert(start>=0&&end>start,from);return source.slice(start,end);};
const store=new Map(),writes=[];
const storage={getItem:key=>store.get(key)??null,setItem:(key,value)=>{writes.push(key);store.set(key,value);}};
const context=vm.createContext({URL,Map,Set,console,location:{href:current,hash:'',pathname:'/game/',origin:'https://example.test'},
 OMOJI_TECHNIQUE_TRACK:technique,Up:n=>Number.isSafeInteger(n)&&n>0&&n<=86_400_000,
 omojiParseTimeChallenge:codec.parseTimeChallenge,omojiCreateTimeChallengeUrl:codec.createTimeChallengeUrl,
 omojiNormalizeChallengeRanking:codec.normalizeChallengeRanking,omojiChallengeRankingKey:codec.CHALLENGE_RANKING_KEY,
 omojiLegacyChallengeRankingKey:codec.LEGACY_CHALLENGE_RANKING_KEY,omojiChallengeRegulation:codec.CHALLENGE_REGULATION,
 localStorage:storage,document:{createElement:tag=>new Element(tag),createDocumentFragment:()=>new Element('fragment')},
 window:{addEventListener(){}},navigator:{clipboard:{writeText:async()=>{}}},requestAnimationFrame:fn=>fn(),
 Option:class {constructor(text,value){this.text=text;this.value=value;}}});
vm.runInContext(chunk('function Op(','function h2(')+chunk('function h2(','var zp=')+chunk('var zp=','var Vp='),context);
assert.equal(context.Op(legacy,lookup).regulation,'legacy');
const localRecords={'time:sample-course:car':{time:10,score:0,updatedAt:1}};
for(const [url,expected] of [[legacy,false],[current,true]]) {
 context.location.href=url;
 const offer=new Element('offer'),share=new Element('share'),applied=[];
 const ui=context.h2({offer,share,trackById:lookup,readRecords:()=>localRecords,format:ms=>String(ms),onApply:id=>applied.push(id)});
 offer.querySelector('button').listeners.get('click')();
 assert.deepEqual(applied,[course.id]);
 const comparison=ui.compare({trackId:course.id,mode:'time',seconds:9,assisted:false,finished:true});
 if(expected)assert.equal(typeof comparison,'string');else{assert.equal(comparison,null);assert(offer.querySelector('p').textContent.includes('旧レギュレーション'));}
 assert.equal(new URL(share.querySelector('input').value).searchParams.get('regulation'),'v3');
}
const legacyRows=[{trackId:course.id,milliseconds:20,name:'旧記録'}];
const preserved=JSON.stringify(legacyRows);store.set(codec.LEGACY_CHALLENGE_RANKING_KEY,preserved);
const pane=new Element('ranking'),form=pane.querySelector('form');
form.elements.challenge=new Element('input');form.elements.nickname=new Element('input');
context.p2(pane,{trackById:lookup,tracks:[course,technique],readRecords:()=>({}),format:ms=>String(ms),parseChallenge:context.Op,savedBestTimes:context.Bp});
assert.equal(store.get(codec.LEGACY_CHALLENGE_RANKING_KEY),preserved);
assert.equal(writes.length,0);
form.elements.challenge.value=legacy;form.elements.nickname.value='Racer';
form.listeners.get('submit')({preventDefault(){}});
assert(pane.querySelector('[role=status]').textContent.includes('旧レギュレーション'));
assert.equal(writes.length,0,'Legacy link must not write current or old ranking');
form.elements.challenge.value=current;
form.listeners.get('submit')({preventDefault(){}});
assert.deepEqual(writes,[codec.CHALLENGE_RANKING_KEY]);
const ranked=JSON.parse(store.get(codec.CHALLENGE_RANKING_KEY));
assert.equal(ranked.length,1);assert.equal(ranked[0].regulation,'v3');
assert.equal(store.get(codec.LEGACY_CHALLENGE_RANKING_KEY),preserved,'Old data must remain byte-for-byte unchanged');
// A current storage entry without the regulation tag never joins the v3 table.
store.set(codec.CHALLENGE_RANKING_KEY,JSON.stringify([row,...legacyRows]));
assert.equal(context.Lh(lookup).length,1);
console.log('Challenges passed: v3 roundtrip/bounds, legacy setup-only, generation rejection, 100-row/name limits, actual offer comparison and ranking submit/storage isolation.');
