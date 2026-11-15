#!/usr/bin/env node
/** Reproducible source/data/geometry checks. No browser, server, or npm install required. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseline = JSON.parse(fs.readFileSync(path.join(root, 'tools/compatibility-baseline.json'), 'utf8'));
const results = [];
function assert(condition, message) { if (!condition) throw Error(message); }
function check(name, fn) {
    try { const detail = fn(); results.push({name, status:'passed', ...(detail && {detail})}); }
    catch (error) { results.push({name, status:'failed', error:error.message}); }
}
function allFiles(directory) {
    return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry => {
        if (entry.name === '.git' || entry.name === 'node_modules') return [];
        const item = path.join(directory,entry.name);
        return entry.isDirectory() ? allFiles(item) : [item];
    });
}
const files = allFiles(root);
let source = fs.readFileSync(path.join(root, 'assets/game.js'), 'utf8');
const coreImports = {};
for (const match of source.matchAll(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2])));
    for (const item of match[1].split(',')) {
        const [exported, local=exported] = item.trim().split(/\s+as\s+/);
        coreImports[local] = module[exported];
    }
}
for (const match of source.matchAll(/^import\s+([\w$]+)\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2])));
    coreImports[match[1]] = module.default;
}
const coreSource = source.replace(/^import\s+[^\n]+\n/gm, '')
    .replaceAll('import.meta.url', JSON.stringify(pathToFileURL(path.join(root, 'assets/game.js')).href));
const cutoff = coreSource.indexOf('var Y=n=>document.getElementById(n)');
let game;
check('game core loads without a browser', () => {
    assert(cutoff > 0, 'Core/UI boundary was not found; update this verifier after an intentional refactor.');
    const noop = () => {};
    const context = {
        ...coreImports,
        document: {querySelectorAll:()=>[], body:{children:[]}, createElement:()=>({style:{},getContext:()=>null})},
        window:{addEventListener:noop}, navigator:{userAgent:''},
        console:{log:noop,warn:noop,error:noop}, URL, TextDecoder, TextEncoder,
        setTimeout, clearTimeout, performance, AbortController
    };
    context.globalThis=context;
    vm.createContext(context);
    vm.runInContext(coreSource.slice(0,cutoff) + ';globalThis.__verification={cars:Tn,tracks:hn,Kc,fr,ah,ep,Wi};',context,{timeout:20000});
    game=context.__verification;
    return `${game.cars.length} vehicles / ${game.tracks.length} stages`;
});

check('JavaScript syntax', () => {
    const scripts = files.filter(file=>/\.(?:js|mjs|cjs)$/.test(file));
    for (const file of scripts) {
        try { execFileSync(process.execPath,['--check',file],{stdio:'pipe',timeout:30000}); }
        catch(error) { throw Error(`${path.relative(root,file)}: ${String(error.stderr || error.message).slice(0,400)}`); }
    }
    return `${scripts.length} scripts`;
});

check('vehicle identities and save-compatible statistics', () => {
    assert(game,'Game core did not load.');
    assert(game.cars.filter(car=>!car.operatorOnly).length === 512,'Public vehicle count must remain 512.');
    assert(game.cars.filter(car=>car.operatorOnly).length === 3,'Operator vehicle count must remain 3.');
    const cars = new Map(game.cars.map(car=>[car.id,car]));
    assert(cars.size===515,'Vehicle IDs must be unique.');
    for (const expected of baseline.cars) {
        const car=cars.get(expected.id); assert(car,`Missing legacy vehicle ID: ${expected.id}`);
        for (const [key,value] of Object.entries(expected)) assert(car[key]===value,`Changed compatibility value: ${expected.id}.${key}`);
    }
    for (const key of baseline.saveKeys) assert(source.includes(key),`Missing legacy save namespace: ${key}`);
    return '515 IDs, original mechanical values and primary save namespaces retained';
});

check('independent vehicle designs and finite low-quality meshes', () => {
    assert(game,'Game core did not load.');
    const fingerprints = new Set(); let meshes=0, vertices=0;
    for (const car of game.cars) {
        const visual=coreImports.originalVehicleVisual ? coreImports.originalVehicleVisual(car) : car;
        assert(visual.originalDesignVersion===2,`Original design marker missing: ${car.id}`);
        assert(visual.dimensions.every(value=>Number.isFinite(value)&&value>0),`Invalid dimensions: ${car.id}`);
        const fingerprint=JSON.stringify([visual.dimensions,visual.profile,visual.cab,visual.axle]);
        assert(!fingerprints.has(fingerprint),`Duplicate complete coachwork: ${car.id}`); fingerprints.add(fingerprint);
        const model=game.fr(car,{quality:'low',showroom:false}); let count=0;
        model.traverse(node=>{
            if (!node.isMesh) return; meshes++; count++;
            const position=node.geometry?.attributes?.position;
            assert(position?.count>0,`Empty mesh: ${car.id}`); vertices+=position.count;
            for (const value of position.array) assert(Number.isFinite(value),`Non-finite mesh vertex: ${car.id}`);
            for (const value of node.geometry.attributes.normal?.array ?? []) assert(Number.isFinite(value),`Non-finite normal: ${car.id}`);
            if(node.geometry.index) for(const value of node.geometry.index.array) assert(value>=0&&value<position.count,`Out-of-range mesh index: ${car.id}`);
        });
        assert(count>4,`Incomplete car mesh: ${car.id}`);
        model.userData.animate?.({steering:.3,speed:35,dt:1/60,brake:true});
        model.traverse(node=>{
            if(!node.isMesh) return;
            node.geometry.dispose();
            for(const material of Array.isArray(node.material)?node.material:[node.material]) material?.dispose();
        });
    }
    return `${fingerprints.size} unique coachworks, ${meshes} meshes, ${vertices} finite vertices`;
});

check('representative high-detail coachworks remain finite', () => {
    assert(game,'Game core did not load.');
    const families=new Map();
    for(const car of game.cars) {
        const visual=coreImports.originalVehicleVisual(car);
        if(!families.has(visual.originalDesignFamily))families.set(visual.originalDesignFamily,car);
    }
    let vertices=0;
    for(const [family,car]of families) {
        const model=game.fr(car,{quality:'high',beam:true});
        model.traverse(node=>{
            if(!node.isMesh)return;
            const position=node.geometry.attributes.position;
            vertices+=position.count;
            for(const value of position.array)assert(Number.isFinite(value),`Non-finite high-detail vertex: ${family}`);
            for(const value of node.geometry.attributes.normal?.array??[])assert(Number.isFinite(value),`Non-finite high-detail normal: ${family}`);
            node.geometry.dispose();
            for(const material of Array.isArray(node.material)?node.material:[node.material])material?.dispose();
        });
    }
    return `${families.size} body families, ${vertices} finite high-detail vertices`;
});

check('all 256 stages sample finite road geometry', () => {
    assert(game,'Game core did not load.');
    const ids=new Set(game.tracks.map(track=>track.id));
    assert(ids.size===256,'Stage count and unique IDs must remain 256.');
    for(const id of baseline.tracks) assert(ids.has(id),`Missing legacy stage ID: ${id}`);
    let samples=0;
    for(const track of game.tracks) {
        const world=game.Kc(track.id);
        assert(Number.isFinite(world.length)&&world.length>0,`Invalid length: ${track.id}`);
        assert(Number.isFinite(world.width)&&world.width>0,`Invalid road width: ${track.id}`);
        for(let index=0;index<=32;index++) {
            const distance=world.length*index/32;
            const point=world.sample(distance,{});
            for(const key of ['x','y','z','heading','grade','curve']) assert(Number.isFinite(point[key]),`Invalid ${key}: ${track.id} at ${distance}`);
            const grip=world.gripAt(distance); assert(Number.isFinite(grip)&&grip>0,`Invalid road grip: ${track.id}`);
            samples++;
        }
    }
    return `${samples} road positions and grip samples`;
});

check('driving simulation accelerates, brakes and responds to wet grip', () => {
    assert(game,'Game core did not load.');
    const sourceCar=game.cars.find(car=>!car.operatorOnly&&car.drive==='FR');
    const car={...sourceCar,baseTopSpeed:sourceCar.topSpeed};
    function road(grip=1,wet=false) { return {width:12,length:10000,track:{grip,wet},gripAt:()=>grip,sample:(_distance,out={})=>Object.assign(out,{x:0,y:0,z:0,heading:0,grade:0,curve:0})}; }
    const dt=1/120, world=road(), state=game.ah(car);
    for(let step=0;step<1200;step++) game.ep(state,{throttle:1,reverse:false},world,dt,{});
    assert(Number.isFinite(state.speed)&&state.speed>8,'Throttle did not produce forward acceleration.');
    const speed=state.speed;
    for(let step=0;step<360;step++) game.ep(state,{brake:1,reverse:false},world,dt,{});
    assert(Number.isFinite(state.speed)&&state.speed<speed*.65,'Service brake did not materially reduce speed.');
    function brakingDistance(grip,wet) {
        const state=game.ah(car); state.speed=25; state.gear=3;
        for(let step=0;step<2400&&state.speed>.5;step++) game.ep(state,{brake:1,reverse:false},road(grip,wet),dt,{});
        assert(Number.isFinite(state.distance)&&Number.isFinite(state.speed),'Braking simulation became non-finite.');
        assert(state.speed<1,'Vehicle did not stop in 20 seconds.');
        return state.distance;
    }
    const dry=brakingDistance(1,false),wet=brakingDistance(.68,true);
    assert(dry>0&&wet>dry*1.05,'Reduced wet grip did not increase the stopping distance.');
    return `10 s acceleration ${(speed*3.6).toFixed(1)} km/h; stop from 90 km/h: dry ${dry.toFixed(1)} m, wet ${wet.toFixed(1)} m`;
});

check('catalog entries agree with playable vehicle and course data', () => {
    assert(game,'Game core did not load.');
    const cars=new Map(game.cars.filter(car=>!car.operatorOnly).map(car=>[car.id,car]));
    const tracks=new Map(game.tracks.map(track=>[track.id,track]));
    const seenCars=new Set(),seenTracks=new Set();
    const attributes=text=>Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(match=>[match[1],match[2]]));
    for(const match of fs.readFileSync(path.join(root,'cars.html'),'utf8').matchAll(/<li id="car-([^"]+)"\s+([^>]+)>/g)) {
        const [id,attrs]=[match[1],attributes(match[2])],car=cars.get(id);
        assert(car,`Non-playable catalog vehicle: ${id}`);assert(!seenCars.has(id),`Duplicate catalog vehicle: ${id}`);seenCars.add(id);
        assert(attrs['data-title']===car.name,`Vehicle catalog name mismatch: ${id}`);
        for(const [attribute,key]of [['data-power','power'],['data-speed','topSpeed'],['data-year','year']])assert(Number(attrs[attribute])===car[key],`Vehicle catalog ${key} mismatch: ${id}`);
        assert(attrs['data-drive']===car.drive,`Vehicle catalog drive mismatch: ${id}`);
    }
    for(const match of fs.readFileSync(path.join(root,'courses.html'),'utf8').matchAll(/<li id="course-([^"]+)"\s+([^>]+)>/g)) {
        const [id,attrs]=[match[1],attributes(match[2])],track=tracks.get(id);
        assert(track,`Non-playable catalog stage: ${id}`);assert(!seenTracks.has(id),`Duplicate catalog stage: ${id}`);seenTracks.add(id);
        assert(attrs['data-title']===track.name,`Stage catalog name mismatch: ${id}`);
        assert(Math.abs(Number(attrs['data-distance'])-track.length/1000)<.001,`Stage catalog length mismatch: ${id}`);
    }
    assert(seenCars.size===512&&seenTracks.size===256,'Catalog entries missing.');
    return '512 vehicle names/specifications and 256 course names/distances match runtime data';
});

check('local HTML, CSS and manifest asset links', () => {
    let checked=0;
    function verifyReference(file,value) {
        const clean=value.trim().split(/[?#]/)[0];
        if(!clean||/^(?:[a-z]+:|\/\/)/i.test(clean))return;
        // Deployment-domain absolute links are content URLs; local asset references stay relative.
        const target=clean.startsWith('/')?path.join(root,clean):path.resolve(path.dirname(file),clean);
        assert(target.startsWith(root+path.sep)||target===root,`Reference escapes project: ${path.relative(root,file)} → ${clean}`);
        assert(fs.existsSync(target),`Missing local link: ${path.relative(root,file)} → ${clean}`); checked++;
    }
    for(const file of files.filter(file=>/\.(?:html|css)$/.test(file))) {
        const content=fs.readFileSync(file,'utf8');
        if(file.endsWith('.html')) {
            for(const match of content.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/g)) verifyReference(file,match[1]);
            for(const match of content.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/g)) for(const candidate of match[1].split(',')) verifyReference(file,candidate.trim().split(/\s+/)[0]);
        }
        for(const match of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) verifyReference(file,match[1]);
    }
    // Concrete source filenames are checked as well as HTML/CSS links. Dynamic route IDs
    // are exercised by the core geometry checks and the soundtrack production manifest.
    for(const file of files.filter(file=>file.startsWith(path.join(root,'assets')+path.sep)&&file.endsWith('.js'))) {
        const content=fs.readFileSync(file,'utf8');
        for(const match of content.matchAll(/["']([^"'\n<>]{1,150}\.(?:webp|jpg|png|svg|mp3|bin|json)(?:\?[^"'\n<>]*)?)["']/g)) {
            const reference=match[1];
            if(reference.includes('${')||reference.includes(' + '))continue;
            const owner=reference.endsWith('.mp3')?path.join(root,'assets/audio/source.js'):reference==='./announcements.json'?path.join(root,'index.html'):file;
            verifyReference(owner,reference);
        }
    }
    const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
    for(const icon of manifest.icons??[])verifyReference(path.join(root,'manifest.webmanifest'),icon.src);
    return `${checked} local links`;
});

check('128 newly composed audio files match their production manifest', () => {
    const manifestPath=path.join(root,'assets/audio/original-score.json');
    assert(fs.existsSync(manifestPath),'Original soundtrack production manifest is missing.');
    const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
    const tracks=Array.isArray(manifest)?manifest:manifest.tracks;
    assert(Array.isArray(tracks)&&tracks.length===128,'Soundtrack manifest must contain 128 tracks.');
    const hashes=new Set();
    for(let index=0;index<128;index++) {
        const expected=`parapara-${String(index).padStart(3,'0')}.mp3`;
        const track=tracks.find(track=>(track.file??track.filename)===expected);
        assert(track,`Soundtrack metadata missing: ${expected}`);
        const data=fs.readFileSync(path.join(root,'assets/audio',expected));
        assert(data.length>10000,`Empty or incomplete soundtrack: ${expected}`);
        const hash=createHash('sha256').update(data).digest('hex');
        assert(!hashes.has(hash),`Duplicate audio: ${expected}`);hashes.add(hash);
        if(track.sha256)assert(track.sha256===hash,`Audio hash mismatch: ${expected}`);
        assert(track.duration>20,`Track duration missing/too short: ${expected}`);
    }
    const remaining=files.filter(file=>file.endsWith('.mp3')).map(file=>path.basename(file));
    assert(remaining.length===128,'Unused legacy MP3 files remain in the release.');
    return `${hashes.size} unique MP3 hashes`;
});

check('license notices retained and unverified imported meshes removed', () => {
    for(const file of ['assets/THREE-LICENSE.txt','assets/peerjs-LICENSE.txt','assets/fonts/OFL.txt']) assert(fs.statSync(path.join(root,file)).size>400,`Missing license notice: ${file}`);
    const forbidden=['maybach-model.bin','rolls-royce.bin','century-royal.bin','operator-glass-panes.json'];
    for(const name of forbidden) {
        assert(!files.some(file=>path.basename(file)===name),`Unverified asset still distributed: ${name}`);
        assert(!source.includes(name),`Obsolete model loader reference remains: ${name}`);
    }
    return 'Three.js MIT, PeerJS MIT, font OFL retained; imported manufacturer meshes absent';
});

const report={checkedAt:new Date().toISOString(),baseCommit:baseline.baseCommit,browserQA:'not performed: this verifier checks source, data and geometry in Node.js',passed:results.every(result=>result.status==='passed'),results};
for(const result of results)console.log(`${result.status==='passed'?'PASS':'FAIL'} ${result.name}${result.detail?` — ${result.detail}`:''}${result.error?` — ${result.error}`:''}`);
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
const reportArg=process.argv.indexOf('--report');
if(reportArg>=0&&process.argv[reportArg+1])fs.writeFileSync(process.argv[reportArg+1],JSON.stringify(report,null,2)+'\n');
process.exitCode=report.passed?0:1;
