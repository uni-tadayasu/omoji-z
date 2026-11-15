#!/usr/bin/env node
import assert from 'node:assert/strict';
import {vehicleCatalog} from '../assets/vehicles.js';
import {balancedBaseStats,performancePoints,classForPP,balancedRaceReward,prepareWorkshopStats,
    normalizeWorkshop,WORKSHOP_PARTS,quoteWorkshopUpgrade,migrateEconomyV3,createSeason,
    recordQualifyingRace,workshopTier,boundedTechniqueAward,STARTER_IDS,balancedCourse} from '../assets/balance.js';

const cars=vehicleCatalog.map(balancedBaseStats),publicCars=cars.filter(car=>!car.operatorOnly);
assert.equal(publicCars.length,512);assert.equal(cars.length,515);
assert.equal(publicCars.filter(car=>!car.shopPrice).length,3);
assert.deepEqual(publicCars.filter(car=>!car.shopPrice).map(car=>car.id).sort(),[...STARTER_IDS].sort());
assert.equal(new Set(cars.map(car=>car.id)).size,515);
let highestSpeed=0,highestPower=0,highestRatio=0;
const maxLegacy={stars:16,xp:840,turbineLevel:24,nitroLevel:15,levels:Object.fromEntries(['engine','transmission','tires','suspension','brakes','nitro'].map(key=>[key,32]))};
const fullLevels=Object.fromEntries(WORKSHOP_PARTS.map(part=>[part.id,3]));
for(const car of cars) {
    assert(car.topSpeed<=355&&car.power<=950,car.id+' stock inflation');
    assert.equal(car.pp,performancePoints(car));assert.equal(car.performanceClass,classForPP(car.pp));
    for(const compound of ['road','sport','wet','track'])for(const finalDrive of [-2,0,2])for(const downforce of [0,3]) {
        const stats=prepareWorkshopStats(car,maxLegacy,{levels:fullLevels,settings:{compound,finalDrive,downforce,ride:2,lsd:3}});
        assert(stats.topSpeed+stats.nitroLevelSpeedBonus<400,car.id+' exceeds speed envelope');
        assert(stats.power<=1100&&stats.mass>400&&stats.grip>0&&stats.handling>0,car.id+' invalid upgraded stats');
        assert(stats.accel<=car.accel*1.300001,car.id+' acceleration stacking');
        assert(stats.power<=car.power*1.281+1,car.id+' power stacking');
        highestSpeed=Math.max(highestSpeed,stats.topSpeed+stats.nitroLevelSpeedBonus);
        highestPower=Math.max(highestPower,stats.power);highestRatio=Math.max(highestRatio,stats.accel/car.accel);
    }
}

const car=cars.find(car=>car.id==='hachi');
const stock=prepareWorkshopStats(car),wet=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{compound:'wet'}});
const track=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{compound:'track'}});
assert(wet.wetGrip>track.wetGrip&&wet.dryGrip<track.dryGrip,'tyre compounds need a real dry/wet tradeoff');
const short=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{finalDrive:2}}),long=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{finalDrive:-2}});
assert(short.accel>long.accel&&short.topSpeed<long.topSpeed,'final drive must trade acceleration against speed');
const lowAero=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{downforce:0}}),highAero=prepareWorkshopStats(car,{}, {levels:fullLevels,settings:{downforce:3}});
assert(highAero.aeroGrip>lowAero.aeroGrip&&highAero.topSpeed<lowAero.topSpeed,'aero must trade grip against drag');
assert(prepareWorkshopStats(car,{}, {levels:{cooling:3}}).mass>stock.mass,'cooling hardware must have a weight cost');
assert.equal(normalizeWorkshop({levels:{tires:0},settings:{compound:'track'}}).settings.compound,'road');
assert.equal(quoteWorkshopUpgrade({},'ecu',createSeason()).available,true);
assert.equal(quoteWorkshopUpgrade({levels:{ecu:1}},'ecu',createSeason()).reason,'mastery');
assert.equal(quoteWorkshopUpgrade({levels:{ecu:3}},'ecu',{races:100,validKm:300}).reason,'max');

const repeated=balancedRaceReward({mode:'time',trackLength:3000,time:120},1);
const veteran=balancedRaceReward({mode:'time',trackLength:3000,time:120,bonusReward:1200000,fixedCourseBonus:true,xpBonus:4200},151);
assert.deepEqual(repeated,veteran,'old level multiplier and fixed millions must not leak into v3');
const quick=balancedRaceReward({mode:'time',trackLength:100,time:5});
const longReward=balancedRaceReward({mode:'time',trackLength:30000,time:1080});
assert(quick.raceZ/5*60<=520&&quick.raceXP/5*60<=40,'five-second loop must be rate bounded');
assert(quick.raceZ/5*60<repeated.raceZ/2,'short trials must not beat an ordinary full race income rate');
assert(quick.raceXP/5*60<=(repeated.raceXP/120*60)*1.5,'short races must not dominate XP per minute');
assert(longReward.raceZ/18<=(repeated.raceZ/2)*1.2,'long-route income should remain comparable');
const first=balancedRaceReward({mode:'time',trackLength:100,time:5,firstClear:true});
assert((first.raceXP+first.courseXP)/5*60<=40&&first.raceZ/5*60<=650,'first-clear awards share the rate budget');
assert.equal(balancedRaceReward({mode:'time',trackLength:100,time:1}).raceXP,0);
assert(balancedRaceReward({mode:'time',trackLength:100000,time:3600,endurance:true}).raceZ<20000,'endurance must not pay a fixed million');
assert(balancedCourse({id:'bonus',length:30000,bonusStage:true,bonusReward:1200000,xpStage:true,xpReward:4200}).bonusReward<3000);

const oldFree=vehicleCatalog.filter(car=>!car.operatorOnly&&!car.shopPrice).map(car=>car.id);
const old={balance:999999999,xp:100000,cars:{hachi:{stars:16,levels:{engine:32}}},owned:['tune-luma'],receipts:['old-race'],damage:{hachi:{body:30}}};
const migrated=migrateEconomyV3(old,oldFree,true);
assert.equal(migrated.balance,old.balance);assert.deepEqual(migrated.cars,old.cars);assert.deepEqual(migrated.damage,old.damage);
assert(oldFree.every(id=>migrated.owned.includes(id)));assert.deepEqual(migrateEconomyV3(migrated,oldFree,true),migrated,'migration must be idempotent');
const fresh=migrateEconomyV3({},oldFree,false);assert.equal(fresh.balance,3000);assert.equal(fresh.owned.length,0);

let season=createSeason(),wallet=3000,income10=0,income50=0;
for(let i=0;i<50;i++) {
    const trackId='route-'+Math.floor(i/3),firstClear=!season.firstClears.includes(trackId);
    const race={id:'race-'+i,mode:'duel',trackId,trackLength:3000,time:120,won:true,difficulty:'normal',firstClear};
    wallet+=balancedRaceReward(race).raceZ;season=recordQualifyingRace(season,race);
    if(i===9)income10=wallet;if(i===49)income50=wallet;
}
assert.equal(season.races,50);assert.equal(season.validKm,150);assert.equal(workshopTier(season),3);
assert(income10>8000&&income10<15000&&income50>30000&&income50<55000,'starter progression target');
const allDevelopmentCost=WORKSHOP_PARTS.reduce((sum,part)=>sum+part.price*(1+1.9+3.2),0);
assert(allDevelopmentCost>income50,'50 ordinary races should not buy every maximum upgrade');
const before=JSON.stringify(season);assert.equal(JSON.stringify(recordQualifyingRace(season,{id:'race-49',trackLength:3000,time:120})),before,'race receipts must prevent duplicate mastery');
let tiny=createSeason();for(let i=0;i<100;i++)tiny=recordQualifyingRace(tiny,{id:'tiny-'+i,trackLength:300,time:5});
assert.equal(tiny.races,0);assert.equal(workshopTier(tiny),1,'short trials cannot unlock mastery tiers');
let technique=createSeason(),techniqueIncome=0;
for(let second=0;second<120;second++){const award=boundedTechniqueAward(technique,'infinite',2500,100000+second*1000);technique=award.season;techniqueIncome+=award.earned;}
assert(techniqueIncome<=160&&techniqueIncome/2<repeated.raceZ/2,'endless techniques must not beat ordinary racing income');
const backwards=boundedTechniqueAward(technique,'infinite',2500,150000);assert.equal(backwards.earned,0,'clock rewind must not reset a consumed award window');

console.log(JSON.stringify({passed:true,vehicles:cars.length,setupCases:cars.length*24,highestSpeed,highestPower,highestAccelerationRatio:highestRatio,
    creditsAfter10Races:income10,creditsAfter50Races:income50,allDevelopmentCost,
    repeatZPerMinute:repeated.raceZ/2,quickZPerMinute:quick.raceZ/5*60,longZPerMinute:longReward.raceZ/18,
    repeatXPPerMinute:repeated.raceXP/2,quickXPPerMinute:quick.raceXP/5*60,techniqueZPerMinute:techniqueIncome/2},null,2));
