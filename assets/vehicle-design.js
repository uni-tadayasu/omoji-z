/**
 * OMOJI independent vehicle design system, version 2.
 * Fictional coachwork is generated from an ID and a broad vehicle category.
 * No manufacturer blueprint, scanned mesh, logo, photo, or protected texture is used.
 * Mechanical game statistics and save IDs are retained.
 */
export function vehicleDesignSeed(value) {
    let seed=2166136261;
    for(const character of String(value)) seed=Math.imul(seed^character.charCodeAt(0),16777619);
    return seed>>>0;
}

export function originalVehicleVisual(car) {
    if(!car || car.originalDesignVersion===2) return car;
    const seed=vehicleDesignSeed(car.id);
    let state=seed;
    const random=()=>{
        state+=0x6d2b79f5;
        let value=Math.imul(state^state>>>15,state|1);
        value^=value+Math.imul(value^value>>>7,value|61);
        return ((value^value>>>14)>>>0)/4294967296;
    };
    const sourceType=car.coachwork||'';
    const family=car.originalDesignFamily || (/van/.test(sourceType)?'van':/bed/.test(sourceType)?'utility':
        /estate/.test(sourceType)?'estate':/flagship|touring/.test(sourceType)||car.mass>2050?'executive':
        car.power>490?'sport':car.mass<1080?'compact':car.doors===4||car.mass>1550?'tourer':'fastback');
    const classes={
        compact:[3.66,.42,1.69,.12,1.40,.12,'hatch',.590],
        fastback:[4.31,.40,1.82,.12,1.29,.11,'coupe',.635],
        tourer:[4.51,.43,1.83,.12,1.42,.11,'sedan',.635],
        executive:[5.01,.42,1.94,.11,1.48,.10,'sedan',.640],
        sport:[4.36,.43,1.93,.13,1.16,.10,'coupe',.665],
        estate:[4.46,.43,1.82,.11,1.49,.11,'estate',.620],
        utility:[4.72,.48,1.94,.14,1.68,.14,'bed',.630],
        van:[4.43,.44,1.87,.12,1.79,.15,'van',.602]
    };
    const spec=classes[family]||classes.fastback;
    const [l,lv,w,wv,h,hv,coachwork,belt]=spec;
    const dimensions=[l+lv*random(),w+wv*random(),h+hv*random()].map(v=>Math.round(v*1000)/1000);
    const height=dimensions[2], shoulder=height*belt+.025;
    const variant=seed%3;
    const midEngine=family==='sport' && variant===1;
    const wheelRadius=family==='sport'?.321+random()*.025:
        family==='utility'?.371+random()*.022:family==='van'?.325+random()*.022:.294+random()*.038;
    const archFront=.566+random()*.052, archRear=-.604-random()*.040;
    const shoulderWarp=(random()-.5)*.015;
    const noseDrop=family==='sport'?.218:family==='fastback'?.156:family==='utility'?.112:.124;
    const tailDrop=family==='sport'?.082:family==='fastback'?.118:.095;
    const noseWidth=family==='sport'?.769:family==='fastback'?.804:family==='van'?.874:.842;
    const tailWidth=family==='sport'?.854:family==='compact'?.853:.872;
    const profile=Array.from({length:25},(_,i)=>{
        const z=-1+i/12;
        const tip=z>0?Math.pow(z,4.2)*noseDrop:Math.pow(-z,4.7)*tailDrop;
        const archBulge=.017*Math.exp(-(((z-archFront)/.19)**2))+.013*Math.exp(-(((z-archRear)/.20)**2));
        const sideWaist=.014*Math.exp(-((z/.27)**2));
        const width=(z>0?1-(1-noseWidth)*Math.pow(z,4):1-(1-tailWidth)*Math.pow(-z,4))-sideWaist+archBulge;
        return [Math.round(z*10000)/10000,Math.round(width*10000)/10000,
            Math.round((shoulder-tip+archBulge+shoulderWarp*z)*10000)/10000];
    });
    const cabins={
        compact:[-.935,-.685,.255,.658,.914,.770],
        fastback:[-.925,-.445,.025,.378,.895,.724],
        tourer:[-.763,-.454,.198,.542,.908,.775],
        executive:[-.776,-.470,.187,.533,.910,.790],
        sport:midEngine?[-.550,-.213,.224,.605,.867,.687]:[-.803,-.446,-.065,.296,.874,.701],
        estate:[-.946,-.787,.209,.576,.931,.812],
        utility:[-.167,-.084,.287,.580,.920,.812],
        van:[-.955,-.873,.469,.771,.947,.849]
    };
    const cab=(cabins[family]||cabins.fastback).map((value,index)=>value+(random()-.5)*(index<4?.025:.014));
    const styles=['prism','arc','blade','facet','pixel'];
    const familyStyles={compact:['facet','arc','pixel'],fastback:['blade','arc','prism'],
        tourer:['pixel','blade','facet'],executive:['arc','facet','blade'],sport:['blade','prism','arc'],
        estate:['pixel','arc','facet'],utility:['prism','facet','pixel'],van:['arc','pixel','facet']};
    const chosenStyle=(familyStyles[family]||familyStyles.fastback)[seed%3];
    const styleIndex=styles.indexOf(chosenStyle);
    return {
        ...car,
        originalDesignVersion:2,originalDesignFamily:family,originalDesignSeed:seed,
        originalLampStyle:styles[styleIndex],originalRimStyle:seed%3,
        dimensions,profile,cab,axle:[archRear,archFront],
        wheel:[wheelRadius,family==='sport'?.239+random()*.027:.191+random()*.032,6+seed%6],
        coachwork,doors:['fastback','sport'].includes(family)||family==='compact'&&seed%3===0?2:4,
        roof:family==='fastback'?'fastback':'closed',
        front:'original-'+styles[styleIndex],rear:'original-'+styles[(styleIndex+2)%styles.length],
        chrome:false,twoTone:null,lower:null,stripes:null,
        spoiler:family==='sport'&&variant===2?'duck':null,
        inlet:family==='sport'&&midEngine,whitewall:false,tailfins:false,rearGrille:false,
        exhaust:car.engineType==='electric'?0:family==='sport'?2:1+(seed%4===0?1:0),
        accent:car.accent||'#1c2530'
    };
}
