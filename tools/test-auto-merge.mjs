import assert from 'node:assert/strict';
import {mergeVerified, mergeBranchWithGit, validateCandidate} from './auto-merge.mjs';

const candidate = {repository:'owner/game', branch:'feature/remake', head:'a'.repeat(40), base:'b'.repeat(40), runURL:'https://github.com/owner/game/actions/runs/1'};
const pr = {number:7, draft:false, head:{repo:{full_name:'owner/game'}, ref:candidate.branch, sha:candidate.head}, base:{ref:'main'}};
function fake(overrides={}) {
  const calls=[];
  const api=async (method,path,body)=>{
    calls.push({method,path,body});
    if (overrides.handle) { const value=await overrides.handle(method,path,body,calls); if (value!==undefined) return value; }
    if (path.endsWith('git/ref/heads/feature%2Fremake')) return {object:{sha:overrides.head || candidate.head}};
    if (path.endsWith('git/ref/heads/main')) return {object:{sha:overrides.base || candidate.base}};
    if (method==='GET' && path.includes('/pulls?')) return overrides.existing || [];
    if (method==='POST' && path.endsWith('/pulls')) return pr;
    if (method==='PUT' && path.endsWith('/merge')) return {merged:true,sha:'c'.repeat(40)};
    if (path.endsWith('/dispatches')) return null;
    throw Error(`Unexpected request: ${method} ${path}`);
  };
  return {api,calls};
}

validateCandidate(candidate);
for(const branch of ['main','gh-pages','bad\nbranch','../main','-head','bad name']) assert.throws(()=>validateCandidate({...candidate,branch}));
assert.throws(()=>validateCandidate({...candidate,head:'short'}));

{
  const {api,calls}=fake();
  const result=await mergeVerified({...candidate,api});
  assert.equal(result.merged,true);
  assert.equal(calls.find(c=>c.method==='PUT').body.sha,candidate.head);
  assert.ok(calls.at(-1).path.endsWith('/workflows/pages.yml/dispatches'));
  assert.deepEqual(calls.at(-1).body,{ref:'main'});
}
{
  const {api,calls}=fake({head:'d'.repeat(40)});
  assert.equal((await mergeVerified({...candidate,api})).reason,'head-changed');
  assert.ok(!calls.some(c=>c.method!=='GET'));
}
{
  const {api,calls}=fake({base:'e'.repeat(40)});
  assert.equal((await mergeVerified({...candidate,api})).reason,'base-changed');
  assert.ok(!calls.some(c=>c.method==='PUT'));
  assert.deepEqual(calls.at(-1).body,{ref:'main',inputs:{branch:candidate.branch}});
}
{
  const {api,calls}=fake({existing:[{...pr,draft:true}]});
  assert.equal((await mergeVerified({...candidate,api})).reason,'draft');
  assert.ok(!calls.some(c=>c.method==='PUT'));
}
{
  const {api,calls}=fake({existing:[pr],handle:(method,path)=>{
    if(method==='PUT') { const error=new Error('Protection'); error.status=405; throw error; }
  }});
  await assert.rejects(()=>mergeVerified({...candidate,api}),/remains open/);
  assert.ok(!calls.some(c=>c.path.endsWith('/dispatches')));
}
{
  const {api,calls}=fake({handle:(method,path)=>{
    if(method==='POST' && path.endsWith('/pulls')) {const error=new Error('Forbidden');error.status=403;throw error;}
  }});
  let received;
  const result=await mergeVerified({...candidate,api,gitMerge:async value=>{received=value;return {merged:true,sha:'c'.repeat(40)};}});
  assert.equal(result.method,'git');
  assert.equal(received.head,candidate.head);assert.equal(received.base,candidate.base);
  assert.ok(result.url.endsWith('/commit/'+'c'.repeat(40)));
  assert.ok(calls.at(-1).path.endsWith('/workflows/pages.yml/dispatches'));
}
{
  const {api,calls}=fake({handle:(method,path)=>{
    if(method==='POST' && path.endsWith('/pulls')) {const error=new Error('Forbidden');error.status=403;throw error;}
  }});
  const result=await mergeVerified({...candidate,api,gitMerge:async()=>({merged:false,reason:'base-changed'})});
  assert.equal(result.reason,'base-changed');
  assert.ok(calls.at(-1).path.endsWith('/workflows/auto-merge.yml/dispatches'));
}
{
  const {api}=fake({handle:(method,path)=>{
    if(method==='POST' && path.endsWith('/pulls')) {const error=new Error('Unauthorized');error.status=401;throw error;}
  }});
  let fallback=false;
  await assert.rejects(()=>mergeVerified({...candidate,api,gitMerge:()=>{fallback=true;}}),/Unauthorized/);
  assert.equal(fallback,false);
}
{
  const {api}=fake({existing:[pr],handle:method=>{
    if(method==='PUT') {const error=new Error('Protected');error.status=403;throw error;}
  }});
  let fallback=false;
  await assert.rejects(()=>mergeVerified({...candidate,api,gitMerge:()=>{fallback=true;}}),/remains open/);
  assert.equal(fallback,false);
}
{
  const {api,calls}=fake({handle:(method,path)=>{
    if(path.endsWith('/workflows/pages.yml/dispatches')) {const error=new Error('Forbidden');error.status=403;throw error;}
  }});
  await assert.rejects(()=>mergeVerified({...candidate,api}),/merged successfully, but Pages dispatch failed/);
  assert.equal(calls.filter(c=>c.method==='PUT').length,1);
}
{
  const commands=[];
  const run=args=>{
    commands.push(args);
    if(args[0]==='rev-parse')return args[1]==='refs/remotes/origin/main'?candidate.base:args[1]==='HEAD'?'c'.repeat(40):candidate.head;
    return '';
  };
  assert.equal(mergeBranchWithGit(candidate,run).merged,true);
  assert.deepEqual(commands.find(c=>c[0]==='push'),['push','origin','HEAD:refs/heads/main']);
  assert.ok(!commands.some(c=>c.includes('--force')||c.includes('--force-with-lease')));
  const merge=commands.find(c=>c.includes('merge'));
  assert.ok(merge.includes(candidate.head));
  assert.ok(commands.some(c=>c[0]==='checkout'&&c[2]===candidate.base));
}
{
  const run=args=>{
    if(args[0]==='rev-parse')return args[1]==='refs/remotes/origin/main'?candidate.base:args[1]==='HEAD'?'c'.repeat(40):candidate.head;
    if(args[0]==='push')throw new Error('non-fast-forward');
    if(args[0]==='ls-remote')return 'e'.repeat(40)+'\trefs/heads/main';
    return '';
  };
  assert.equal(mergeBranchWithGit(candidate,run).reason,'base-changed');
}
{
  const run=args=>{
    if(args[0]==='rev-parse')return args[1]==='refs/remotes/origin/main'?candidate.base:args[1]==='HEAD'?'c'.repeat(40):candidate.head;
    if(args[0]==='push')throw new Error('branch protection');
    if(args[0]==='ls-remote')return candidate.base+'\trefs/heads/main';
    return '';
  };
  assert.throws(()=>mergeBranchWithGit(candidate,run),/protection rejected/);
}
console.log('Automatic merge: exact SHA, moved refs, drafts, protections, PR fallback, non-force Git push and Pages dispatch verified.');
