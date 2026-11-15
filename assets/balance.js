/** OMOJI Z v3: bounded road-car performance, transparent rewards and reversible setup. */
export const BALANCE_VERSION = 3;
export const STARTER_IDS = Object.freeze(['hachi', 'leopard', 'yukitsuba']);
const finite = (value, fallback=0) => Number.isFinite(value) ? value : fallback;
export const clamp = (value, low, high) => Math.max(low, Math.min(high, finite(value,low)));
const integer = (value, high=Number.MAX_SAFE_INTEGER) => Math.floor(clamp(value,0,high));
const round = (value, places=0) => Math.round(value * 10 ** places) / 10 ** places;
const softCeiling = (value, start, span) => value <= start ? value : start + span * -Math.expm1(-(value-start)/span/3);

export function performancePoints(car) {
    const powerWeight = Math.max(15, finite(car.power,100) / Math.max(450,finite(car.mass,1200)) * 1000);
    const effectiveTop=finite(car.topSpeed,170)+clamp(car.nitroLevelSpeedBonus??0,0,10);
    return Math.round(clamp(120 + Math.sqrt(powerWeight)*16 + (effectiveTop-110)*.8 +
        (finite(car.grip,1)-.8)*130 + (finite(car.handling,1)-.8)*80 +
        ((finite(car.brakeForce,1)-1)*45)+Math.max(0,finite(car.nitroSeconds,3.5)-3.5)*4, 180, 999));
}

export function classForPP(pp) {
    return pp <= 450 ? 'D' : pp <= 550 ? 'C' : pp <= 650 ? 'B' : pp <= 750 ? 'A' : pp <= 850 ? 'S' : 'X';
}

export function balancedBaseStats(car) {
    if (!car || car.balanceVersion === BALANCE_VERSION) return car;
    const power = Math.round(softCeiling(clamp(car.power,30,10000),700,250));
    const topSpeed = Math.round(softCeiling(clamp(car.topSpeed,100,1500),300,55));
    const mass = Math.round(clamp(car.mass,500,2900));
    const acceleration = Math.min(clamp(car.accel,3,14),4.4+Math.sqrt(power*1000/mass)*.43);
    const next = {...car, balanceVersion:BALANCE_VERSION,
        legacyPerformance:car.legacyPerformance || {power:car.power,topSpeed:car.topSpeed,accel:car.accel,grip:car.grip,handling:car.handling,shopPrice:car.shopPrice??0},
        power,topSpeed,mass,accel:round(acceleration,3),grip:round(clamp(car.grip,.84,1.34),3),
        handling:round(clamp(car.handling,.88,1.32),3),nitroSeconds:3.5};
    next.pp=performancePoints(next); next.performanceClass=classForPP(next.pp);
    next.shopPrice=car.operatorOnly || STARTER_IDS.includes(car.id) ? 0 : Math.round((1200+(next.pp-180)**2*.20)/100)*100;
    return next;
}
export const normalizeStockCar = balancedBaseStats;

export function balancedCourse(track) {
    if(!track||track.balanceVersion===3)return track;
    const km=clamp(finite(track.length,3200)/1000,.1,100);
    const firstClear=Math.round((90+175*Math.min(km,30))*.5);
    const next={...track,balanceVersion:3,firstClearReward:firstClear,
        bonusReward:track.bonusStage?firstClear:0,xpReward:track.xpStage?Math.min(35,Math.round((18+10*km)*.25)):0,
        fixedCourseBonus:false};
    if(track.longStraight||track.endurance||track.xpStage) {
        next.description=String(track.description||'').replace(/[^。]*(?:[0-9０-９][0-9０-９,，.万]*\s*(?:Z|Ｚ|XP)|報酬|ボーナス)[^。]*。?/g,'').trim()+
            ' 完走報酬は距離・実走時間・結果で決まり、初回は探索ボーナスを獲得できます。';
    }
    return Object.freeze(next);
}

export const WORKSHOP_PARTS = Object.freeze([
    {id:'tires',name:'タイヤとホイール',description:'接地と旋回を改善。柔らかいタイヤは雨で不利。',price:1200},
    {id:'brakes',name:'ブレーキ',description:'制動力・踏力の応答を改善。最大制動は路面に依存。',price:1000},
    {id:'suspension',name:'サスペンション',description:'姿勢と舵の追従を調整。硬すぎる足は低グリップ路で不利。',price:1300},
    {id:'differential',name:'LSD・駆動系',description:'立ち上がりの空転を抑制。強いロックは旋回を穏やかに。',price:1100},
    {id:'transmission',name:'ギヤ・ファイナル',description:'短いギヤは加速、長いギヤは最高速と引き換え。',price:1500},
    {id:'ecu',name:'ECU・吸排気',description:'出力と応答を小幅改善。冷却との組合せが重要。',price:1600},
    {id:'cooling',name:'冷却・潤滑',description:'高負荷域の余裕を増やす代わりに重量が増加。',price:900},
    {id:'weight',name:'軽量化・剛性',description:'重量を抑え加速を改善。乗りやすさは足回りとの組合せ次第。',price:1400},
    {id:'aero',name:'空力・アンダーフロア',description:'高速接地を改善。ダウンフォースを増すと最高速が低下。',price:1500}
].map(Object.freeze));
export const CLASS_LIMITS = Object.freeze({D:450,C:550,B:650,A:750,S:850,open:999});
export const DEFAULT_SETTINGS = Object.freeze({compound:'road',ride:0,finalDrive:0,lsd:1,downforce:1,classCap:'open'});
const COMPOUNDS = new Set(['road','sport','wet','track']);

export function normalizeWorkshop(raw) {
    const levels=Object.fromEntries(WORKSHOP_PARTS.map(part=>[part.id,integer(raw?.levels?.[part.id],3)]));
    const settings={compound:COMPOUNDS.has(raw?.settings?.compound)?raw.settings.compound:'road',
        ride:Math.round(clamp(raw?.settings?.ride??0,-2,2)),finalDrive:Math.round(clamp(raw?.settings?.finalDrive??0,-2,2)),
        lsd:integer(raw?.settings?.lsd??1,3),downforce:integer(raw?.settings?.downforce??1,3),
        classCap:Object.hasOwn(CLASS_LIMITS,raw?.settings?.classCap)?raw.settings.classCap:'open'};
    if (levels.tires<1 && settings.compound!=='road') settings.compound='road';
    if (levels.tires<2 && settings.compound==='track') settings.compound='sport';
    if (!levels.suspension) settings.ride=0;
    if (!levels.transmission) settings.finalDrive=0;
    if (!levels.differential) settings.lsd=1;
    if (!levels.aero) settings.downforce=1;
    const presets=Array.isArray(raw?.presets)?raw.presets.slice(0,3).map(p=>p&&typeof p==='object'?{
        name:String(p.name||'セット').replace(/[\u0000-\u001f<>]/g,'').slice(0,20),settings:normalizeWorkshop({levels,settings:p.settings}).settings
    }:null):[];
    return {version:3,levels,settings,presets};
}

export function createSeason() {return {version:3,races:0,validKm:0,firstClears:[],receipts:[],technique:{windowStart:0,windowZ:0,day:0,dayZ:0}};}
export function normalizeSeason(raw) {
    const base=createSeason();if(!raw||typeof raw!=='object')return base;
    const ids=a=>Array.isArray(a)?[...new Set(a.filter(x=>typeof x==='string'&&/^[a-zA-Z0-9:_-]{1,96}$/.test(x)))].slice(-1024):[];
    return {...base,races:integer(raw.races,100000),validKm:round(clamp(raw.validKm,0,1000000),3),
        firstClears:ids(raw.firstClears).slice(-300),receipts:ids(raw.receipts),
        technique:{windowStart:integer(raw.technique?.windowStart,864e13),windowZ:integer(raw.technique?.windowZ,80),
            day:integer(raw.technique?.day,1e8),dayZ:integer(raw.technique?.dayZ,1600)}};
}

export function migrateEconomyV3(raw,legacyFreeIds=[],existing=true) {
    const prior=raw&&typeof raw==='object'?raw:{};
    const owned=Array.isArray(prior.owned)?prior.owned.filter(x=>typeof x==='string'):[];
    return {...prior,balanceVersion:3,balance:integer(prior.balance??(existing?0:3000),999999999),
        owned:[...new Set([...owned,...(existing&&prior.balanceVersion!==3?legacyFreeIds:[])])],
        season:normalizeSeason(prior.season)};
}

export function workshopTier(season) {
    const p=normalizeSeason(season);
    return p.races>=30&&p.validKm>=90?3:p.races>=12&&p.validKm>=36?2:1;
}
export function quoteWorkshopUpgrade(workshop,partId,season) {
    const setup=normalizeWorkshop(workshop),part=WORKSHOP_PARTS.find(x=>x.id===partId);
    if(!part)return {available:false,reason:'unknown'};
    const from=setup.levels[part.id],to=from+1,price=Math.round(part.price*[1,1.9,3.2][from]||0);
    return {available:from<3&&to<=workshopTier(season),reason:from>=3?'max':to>workshopTier(season)?'mastery':'ready',partId,from,to,price};
}

export function prepareWorkshopStats(car,legacySetup={},rawWorkshop,options={}) {
    const stock=balancedBaseStats(car),setup=normalizeWorkshop(rawWorkshop??legacySetup.workshop),l=setup.levels,s=setup.settings;
    const levels=Object.values(legacySetup.levels||{}).filter(Number.isFinite);
    const legacy=Math.min(1,(levels.length?levels.reduce((a,b)=>a+clamp(b,0,32),0)/(levels.length*32):0)*.7+clamp(legacySetup.stars,0,16)/16*.3);
    const powerGain=.052*l.ecu+.007*l.cooling+.06*legacy;
    const weightRatio=1-.025*l.weight+.004*l.cooling+.002*l.brakes;
    const gearing=s.finalDrive*.018;
    const drag=s.downforce>1?(s.downforce-1)*.014*l.aero:0;
    const topGain=.012*l.ecu+.008*l.transmission+.018*legacy-gearing-drag;
    const compound={road:{dry:0,wet:0,grip:0},sport:{dry:.065,wet:-.035,grip:.025},wet:{dry:-.035,wet:.16,grip:.005},track:{dry:.12,wet:-.18,grip:.045}}[s.compound];
    const stiff=s.ride*.012;
    const lock=Math.max(0,s.lsd-1)*l.differential;
    const next={...stock,balanceVersion:3,workshop:setup,legacyUpgradeProgress:round(legacy,3),
        power:Math.min(1100,Math.round(stock.power*Math.min(1.28,1+powerGain))),
        mass:Math.round(stock.mass*weightRatio),
        topSpeed:round(clamp(stock.topSpeed*(1+topGain),stock.topSpeed*.89,375),1),
        accel:round(clamp(stock.accel*(1+.036*l.ecu+.018*l.weight+.012*l.transmission+gearing+.045*legacy),stock.accel*.94,Math.min(16,stock.accel*1.30)),3),
        grip:round(stock.grip*(1+.012*l.tires+compound.grip+.005*l.suspension),3),
        handling:round(stock.handling*(1+.016*l.suspension+stiff-.004*lock),3),
        brakeForce:round(1+.085*l.brakes+.025*legacy,3),brakeResponse:round(1+.035*l.brakes,3),
        wetGrip:round(compound.wet+.012*l.tires-Math.max(0,stiff)*1.3,3),dryGrip:compound.dry,
        tractionAid:round(.035*l.differential+.016*lock,3),
        steeringResponse:round(1+.035*l.suspension+stiff,3),steeringRatio:0,
        rollSupport:round(.035*l.suspension+Math.max(0,stiff),3),
        aeroGrip:round(.022*l.aero*s.downforce,3),dragReduction:round(.006*l.aero,3),
        shiftTimeFactor:round(1-.055*l.transmission,3),torqueResponse:round(.018*l.ecu+.012*l.cooling,3),
        pedalResponse:round(1+.03*l.ecu,3),handbrakeForce:1,handbrakeYaw:0,
        nitroSeconds:3.5+Math.min(.5,integer(legacySetup.levels?.nitro,32)/64),nitroForce:1.08,nitroSpeed:0,
        nitroLevel:options.includeNitroLevel===false?0:integer(legacySetup.nitroLevel,15),
        nitroLevelSpeedBonus:options.includeNitroLevel===false?0:Math.min(10,integer(legacySetup.nitroLevel,15)*2/3),
        turbineLevel:integer(legacySetup.turbineLevel,24),turbineSpeedBonus:0,turbineAccelerationBonus:0,
        vehicleSpeedBonus:0,baseTopSpeed:round(clamp(stock.topSpeed*(1+topGain),stock.topSpeed*.89,375),1),
        omojiGearAnchor:stock.topSpeed,tuningDynamics:0};
    // All upgrades, including a maxed legacy save, remain below a 400 km/h envelope.
    next.pp=performancePoints(next);next.performanceClass=classForPP(next.pp);
    return next;
}

const MODES={practice:.78,time:1,drift:.96,duel:1.04,online:1.04,ranked:1.08};
export function balancedRaceReward(race={},playerLevel=1) {
    const km=clamp(finite(race.trackLength,3200)/1000,.1,100);
    const seconds=clamp(finite(race.time,km*36+12),1,14400);
    const effortKm=Math.min(km,Math.max(.1,seconds/25));
    const mode=MODES[race.mode]??1;
    const shortTrial=km<2||seconds<50;
    const startAllowance=90*Math.min(1,km/2,seconds/50);
    const base=Math.round((startAllowance+175*effortKm)*mode*(race.wet||race.snow?1.045:1));
    let premium=0;
    if(race.mode==='duel'&&race.won)premium={easy:.04,normal:.08,hard:.12,master:.16,legend:.20}[race.difficulty]??.08;
    if(race.mode==='time')premium={gold:.14,silver:.08,bronze:.03}[race.medal]??0;
    if(race.mode==='drift')premium=clamp(finite(race.score)/(6000*Math.max(.5,km/3)),0,.16);
    if(['online','ranked'].includes(race.mode)&&race.total>1)premium=clamp((race.total-race.position)/(race.total-1),0,1)*.16;
    if(race.cleanRun===true)premium+=.05;
    const rateCap=Math.floor(seconds/60*(shortTrial?280:520));
    const regular=Math.max(0,Math.min(rateCap,Math.round(base*(1+Math.min(.25,premium)))));
    const baseZ=Math.min(base,regular),performanceZ=regular-baseZ;
    const courseZ=race.firstClear===true?Math.max(0,Math.min(Math.round(baseZ*.5),Math.floor(seconds/60*(shortTrial?340:650))-regular)):0;
    const raceXP=Math.min(Math.round(clamp((18+10*effortKm)*(race.mode==='practice'?.8:1),0,420)),Math.floor(seconds/60*32));
    const courseXP=race.firstClear===true?Math.max(0,Math.min(35,Math.round(raceXP*.25),Math.floor(seconds/60*40)-raceXP)):0;
    return {baseZ,performanceZ,courseZ,raceZ:regular+courseZ,raceXP,courseXP,levelMultiplier:1};
}

export function recordQualifyingRace(raw,race={}) {
    const season=normalizeSeason(raw),id=String(race.id||'');
    if(!/^[a-zA-Z0-9:_-]{1,96}$/.test(id)||season.receipts.includes(id))return season;
    season.receipts.push(id);if(season.receipts.length>1024)season.receipts.shift();
    const km=finite(race.trackLength)/1000,seconds=finite(race.time);
    if(km>=2&&seconds>=50&&seconds<=7200&&!race.dnf&&!race.error){season.races++;season.validKm=round(season.validKm+Math.min(km,30),3);}
    const track=String(race.trackId||'');if(/^[a-zA-Z0-9:_-]{1,96}$/.test(track)&&!season.firstClears.includes(track))season.firstClears.push(track);
    return season;
}

export function boundedTechniqueAward(raw,raceId,amount,now=Date.now()) {
    const season=normalizeSeason(raw),t=season.technique,day=Math.floor((now+32400000)/86400000);
    if(day>t.day){t.day=day;t.dayZ=0;}
    if(now>=t.windowStart+60000){t.windowStart=now;t.windowZ=0;}
    const requested=Math.min(25,Math.max(1,Math.round(clamp(amount,0,2500)*.02)));
    const earned=Math.max(0,Math.min(requested,80-t.windowZ,1600-t.dayZ));
    t.windowZ+=earned;t.dayZ+=earned;
    return {season,earned};
}
