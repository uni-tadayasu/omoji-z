#!/usr/bin/env node
/** Reproducible source/data/geometry checks. No browser, server, or npm install required. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import * as balanceV3 from '../assets/balance.js';
import * as musicV3 from '../assets/soundtrack.js';

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
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2].split('?')[0])));
    for (const item of match[1].split(',')) {
        const [exported, local=exported] = item.trim().split(/\s+as\s+/);
        coreImports[local] = module[exported];
    }
}
for (const match of source.matchAll(/^import\s+([\w$]+)\s+from\s+['"]([^'"]+)['"];?/gm)) {
    const module = await import(pathToFileURL(path.resolve(root, 'assets', match[2].split('?')[0])));
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

check('v3 performance, drivetrain identities and legacy save namespaces', () => {
    assert(game,'Game core did not load.');
    const publicCars=game.cars.filter(car=>!car.operatorOnly);
    assert(publicCars.length===512,'Public vehicle count must remain 512.');
    assert(game.cars.filter(car=>car.operatorOnly).length===3,'Operator vehicle count must remain 3.');
    const cars=new Map(game.cars.map(car=>[car.id,car]));
    assert(cars.size===515,'Vehicle IDs must be unique.');
    for(const expected of baseline.cars) {
        const car=cars.get(expected.id);assert(car,`Missing legacy vehicle ID: ${expected.id}`);
        assert(car.drive===expected.drive,`Legacy drivetrain identity changed: ${car.id}`);
        assert(car.balanceVersion===3,`Runtime stock balance was not applied: ${car.id}`);
        assert(Number.isFinite(car.power)&&car.power>=30&&car.power<=1000,`Stock output outside road-car envelope: ${car.id}`);
        assert(Number.isFinite(car.topSpeed)&&car.topSpeed>=100&&car.topSpeed<=360,`Stock speed outside road-car envelope: ${car.id}`);
        assert(Number.isFinite(car.mass)&&car.mass>=500&&car.mass<=3000,`Invalid stock mass: ${car.id}`);
        assert(Number.isFinite(car.accel)&&car.accel>=3&&car.accel<=16,`Invalid stock acceleration: ${car.id}`);
        assert(car.pp===balanceV3.performancePoints(car),`Runtime PP mismatch: ${car.id}`);
        assert(car.performanceClass===balanceV3.classForPP(car.pp),`Runtime PP class mismatch: ${car.id}`);
    }
    const free=publicCars.filter(car=>car.shopPrice===0).map(car=>car.id).sort();
    assert(JSON.stringify(free)===JSON.stringify([...balanceV3.STARTER_IDS].sort()),'New-player free selection must contain exactly the three starters.');
    for(const car of publicCars.filter(car=>car.shopPrice>0))assert(car.shopPrice>=1200&&car.shopPrice<=200000,`Invalid game-currency price: ${car.id}`);
    for(const key of baseline.saveKeys)assert(source.includes(key),`Missing legacy save namespace: ${key}`);
    return '515 legacy IDs/drivetrains; bounded stock performance; 3 starters; normalized PP/prices';
});

check('independent vehicle designs and finite low-quality meshes', () => {
    assert(game,'Game core did not load.');
    const fingerprints = new Set(); let meshes=0, vertices=0;
    for (const car of game.cars) {
        const visual=coreImports.originalVehicleVisual ? coreImports.originalVehicleVisual(car) : car;
        assert(typeof visual.originalDesignFamily==='string'&&visual.originalDesignFamily.length>0,`Design family missing: ${car.id}`);
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
        assert(Number(attrs['data-pp'])===car.pp&&Number(attrs['data-price'])===car.shopPrice,`Vehicle catalog PP/price mismatch: ${id}`);
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

check('772 useful static pages have canonical metadata, JSON-LD and crawlable links', () => {
    const routes=JSON.parse(fs.readFileSync(path.join(root,'assets/catalog-routes.json'),'utf8'));
    assert(Object.keys(routes.cars).length===512&&Object.keys(routes.courses).length===256,'Canonical route map is incomplete.');
    const pages=['index.html','cars.html','courses.html','guide.html',...Object.values(routes.cars),...Object.values(routes.courses)];
    assert(new Set(pages).size===772,'Canonical paths must be unique.');
    const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
    const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
    assert(urls.length===772&&new Set(urls).size===772,'Sitemap must contain exactly 772 unique content URLs.');
    const titles=new Set(),descriptions=new Set();
    for(const relative of pages) {
        const file=path.join(root,relative);assert(fs.existsSync(file),`Missing static detail page: ${relative}`);
        const html=fs.readFileSync(file,'utf8');
        const canonical='https://omoji-z.com/'+(relative==='index.html'?'':relative);
        assert(urls.includes(canonical),`Page not present in sitemap: ${relative}`);
        const canonicalLinks=[...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/g)];
        assert(canonicalLinks.length===1&&canonicalLinks[0][1]===canonical,`Wrong/duplicate canonical URL: ${relative}`);
        const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
        const description=html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/)?.[1];
        assert(title&&!titles.has(title),`Missing/duplicate document title: ${relative}`);titles.add(title);
        assert(description&&description.length>=45&&!descriptions.has(description),`Thin/duplicate meta description: ${relative}`);descriptions.add(description);
        assert((html.match(/<h1\b/g)||[]).length===1,`Page must have one visible main heading: ${relative}`);
        assert(!/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html),`Public content is noindexed: ${relative}`);
        const jsonld=[...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)];
        assert(jsonld.length===1,`One coherent JSON-LD graph is required: ${relative}`);
        const schema=JSON.parse(jsonld[0][1]);assert(schema['@context']==='https://schema.org'&&Array.isArray(schema['@graph']),`Invalid JSON-LD graph: ${relative}`);
        assert(!/"(?:aggregateRating|priceCurrency)"/.test(jsonld[0][1]),`Unsupported rating/real-currency offer: ${relative}`);
        const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
        for(const item of schema['@graph']) {
            const types=Array.isArray(item['@type'])?item['@type']:[item['@type']];
            if(types.includes('FAQPage'))for(const question of item.mainEntity??[]) {
                assert(visible.includes(question.name)&&visible.includes(question.acceptedAnswer?.text),`FAQ structured data does not match visible content: ${relative}`);
            }
        }
        const expectedTheme='assets/site.css';
        assert(html.includes(expectedTheme)&&!html.includes('theme-catalog.css'),`Expected page theme not applied: ${relative}`);
    }
    const carsHTML=fs.readFileSync(path.join(root,'cars.html'),'utf8'),coursesHTML=fs.readFileSync(path.join(root,'courses.html'),'utf8');
    for(const [id,relative]of Object.entries(routes.cars)) {
        assert(/^cars\/oz-\d{3}\.html$/.test(relative),`Vehicle canonical must use an original code: ${id}`);
        assert(carsHTML.includes(`href="./${relative}"`),`Vehicle detail is not linked from catalog: ${id}`);
    }
    for(const [id,relative]of Object.entries(routes.courses)) {
        assert(/^courses\/stage-\d{3}\.html$/.test(relative),`Stage canonical must use an independent stage code: ${id}`);
        assert(coursesHTML.includes(`href="./${relative}"`),`Course detail is not linked from catalog: ${id}`);
    }
    return '512 car details + 256 course details + 4 hubs; unique titles/descriptions; original-code canonicals; sitemap reachability';
});

check('classic remaster is the canonical game and alternate entries preserve compatibility', () => {
    const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
    assert(index.includes('./assets/game.js'),'Classic engine must be the default game.');
    assert(!index.includes('./assets/remake/app.js'),'Experimental REBORN must not replace the classic default.');
    assert(index.includes('classic-remastered')&&index.includes('./assets/classic-remaster.css'),'Classic remaster styling must be mounted.');
    assert(index.includes('./assets/classic-remaster-ui.js'),'Classic remaster presentation enhancements must be mounted.');
    const legacy=fs.readFileSync(path.join(root,'legacy.html'),'utf8');
    assert(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(legacy),'Legacy alias must be noindexed.');
    assert(legacy.includes('<link rel="canonical" href="https://omoji-z.com/">'),'Legacy alias must point to the main game canonical.');
    assert(legacy.includes('./index.html')||legacy.includes('./assets/game.js'),'Legacy entry must redirect or retain a playable classic game.');
    const reborn=fs.readFileSync(path.join(root,'reborn.html'),'utf8');
    assert(reborn.includes('./assets/remake/app.js'),'Optional REBORN game must remain reachable at its own entry.');
    assert(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(reborn),'Optional REBORN entry must not compete with the main canonical.');
    return 'Full classic game is the default; legacy entry retained; experimental REBORN is separate';
});

check('static car diagrams and road maps match the current playable geometry', () => {
    assert(game,'Game core did not load.');
    const routes=JSON.parse(fs.readFileSync(path.join(root,'assets/catalog-routes.json'),'utf8'));
    for(const car of game.cars.filter(car=>!car.operatorOnly)) {
        const visual=coreImports.originalVehicleVisual(car);
        const hash=createHash('sha256').update(JSON.stringify([visual.dimensions,visual.profile,visual.cab,visual.axle,visual.wheel])).digest('hex');
        assert(routes.vehicleGeometry[car.id]===hash,`Stale vehicle diagram metadata: ${car.id}`);
        const html=fs.readFileSync(path.join(root,routes.cars[car.id]),'utf8');
        assert(html.includes(`data-design-sha256="${hash}"`),`Vehicle detail is not based on current coachwork: ${car.id}`);
    }
    for(const track of game.tracks) {
        const road=game.Kc(track.id),geometry=[];
        for(let index=0;index<=256;index++) {
            const p=road.sample(road.length*index/256,{});
            geometry.push([p.x,p.y,p.z].map(value=>value.toFixed(6)).join(','));
        }
        const hash=createHash('sha256').update(geometry.join('\n')).digest('hex');
        assert(routes.roadGeometry[track.id]===hash,`Stale road geometry metadata: ${track.id}`);
        const html=fs.readFileSync(path.join(root,routes.courses[track.id]),'utf8');
        assert((html.match(new RegExp(`data-road-sha256="${hash}"`,'g'))||[]).length===2,`Route/elevation figures do not match current game road: ${track.id}`);
    }
    return '512 side-profile fingerprints and 256 road/elevation fingerprints agree with runtime geometry';
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
        if(file.startsWith(path.join(root,'assets/remake')+path.sep)) {
            // ES modules declare their dependencies explicitly. Download filenames and
            // MIME accept strings are generated UI data, not files to request from disk.
            const imports=[
                /\b(?:import|export)\s*(?:\*\s*(?:as\s+\w+\s*)?|\{[^}]*\}|[A-Za-z_$][\w$]*(?:\s*,\s*(?:\*\s*as\s+\w+|\{[^}]*\}))?)\s*from\s*(["'])([^"'\n]+)\1/g,
                /(?:^|[;\n])\s*import\s*(["'])([^"'\n]+)\1/g,
                /\bimport\s*\(\s*(["'])([^"'\n]+)\1\s*\)/g
            ];
            for(const pattern of imports)for(const match of content.matchAll(pattern)) {
                const reference=match[2];
                assert(/^(?:\.{1,2}\/|\/|[a-z]+:)/i.test(reference),`Unresolved bare module import: ${path.relative(root,file)} → ${reference}`);
                verifyReference(file,reference);
            }
            for(const match of content.matchAll(/new\s+URL\(\s*(["'])([^"'\n]+)\1\s*,\s*import\.meta\.url\s*\)/g))verifyReference(file,match[2]);
            continue;
        }
        for(const match of content.matchAll(/["']([^"'\n<>]{1,150}\.(?:webp|jpg|png|svg|mp3|bin|glb|json)(?:\?[^"'\n<>]*)?)["']/g)) {
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

check('33 original audio files, 8 race themes and 128 saved-ID aliases agree', () => {
    const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/original-score.json'),'utf8'));
    assert(Array.isArray(manifest.files)&&manifest.files.length===33,'Production manifest must describe 33 real audio files.');
    assert(musicV3.selectableSoundtrack.length===33&&musicV3.soundtrack.length===128,'Selectable recordings and saved IDs must remain distinct.');
    const expected=[...musicV3.expectedAudioFiles].sort();
    const actual=files.filter(file=>file.endsWith('.mp3')).map(file=>path.basename(file)).sort();
    assert(JSON.stringify(expected)===JSON.stringify(actual),'Missing/unreferenced MP3s remain in the release.');
    const hashes=new Set(),themes=new Map();
    for(const track of manifest.files) {
        const bytes=fs.readFileSync(path.join(root,'assets/audio',track.file));
        assert(bytes.length>10000&&bytes.length===track.bytes,`Incomplete audio: ${track.file}`);
        const hash=createHash('sha256').update(bytes).digest('hex');
        assert(hash===track.sha256,`Production audio SHA-256 mismatch: ${track.file}`);
        assert(!hashes.has(hash),`Duplicate real recording: ${track.file}`);hashes.add(hash);
        assert(track.duration>20&&track.duration<150,`Invalid score duration: ${track.file}`);
        if(track.scene!=='menu') {
            if(!themes.has(track.themeId))themes.set(track.themeId,new Set());
            themes.get(track.themeId).add(track.mixId);
        }
    }
    assert(themes.size===8,'There must be eight race themes.');
    for(const [theme,mixes]of themes)assert(['drive','night','focus','peak'].every(mix=>mixes.has(mix)),`Incomplete theme mixes: ${theme}`);
    for(let index=0;index<128;index++) {
        const id=`parapara-${String(index).padStart(3,'0')}`,score=musicV3.scoreForId(id);
        assert(score&&expected.includes(score.file),`Unresolved legacy song selection: ${id}`);
        const alias=musicV3.soundtrack.find(track=>track.id===id);
        assert(alias&&score.id===musicV3.canonicalSongId(id)&&alias.file===score.file,`Saved song alias does not match actual audio: ${id}`);
    }
    return `${hashes.size} distinct recording hashes; ${themes.size} race themes × 4 mixes + menu; all 128 saved IDs resolve`;
});

check('license notices retained and obsolete imported meshes removed', () => {
    for(const file of ['assets/THREE-LICENSE.txt','assets/peerjs-LICENSE.txt','assets/fonts/OFL.txt']) assert(fs.statSync(path.join(root,file)).size>400,`Missing license notice: ${file}`);
    const forbidden=['maybach-model.bin','rolls-royce.bin','century-royal.bin','operator-glass-panes.json'];
    for(const name of forbidden) {
        assert(!files.some(file=>path.basename(file)===name),`Unverified asset still distributed: ${name}`);
        assert(!source.includes(name),`Obsolete model loader reference remains: ${name}`);
    }
    return 'Three.js MIT, PeerJS MIT, font OFL retained; obsolete binary imports absent; new user-supplied GLB has separate provenance';
});

const report={checkedAt:new Date().toISOString(),baseCommit:baseline.baseCommit,browserQA:'not performed: this verifier checks source, data and geometry in Node.js',passed:results.every(result=>result.status==='passed'),results};
for(const result of results)console.log(`${result.status==='passed'?'PASS':'FAIL'} ${result.name}${result.detail?` — ${result.detail}`:''}${result.error?` — ${result.error}`:''}`);
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
const reportArg=process.argv.indexOf('--report');
if(reportArg>=0&&process.argv[reportArg+1])fs.writeFileSync(process.argv[reportArg+1],JSON.stringify(report,null,2)+'\n');
process.exitCode=report.passed?0:1;
