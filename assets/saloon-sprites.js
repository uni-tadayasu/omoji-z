/** Textured views rendered from the supplied GLB, used only by the CPU renderer. */
export function createSaloonSpriteLoader(options={}) {
    let atlas=null, metadata=null, pending=null, controller=null, generation=0, state='idle';
    const frames=new Map(),subscribers=new Set();
    const fetcher=options.fetch??globalThis.fetch?.bind(globalThis);
    const makeImage=options.createImage??(()=>new Image());
    const makeCanvas=options.createCanvas??(()=>document.createElement('canvas'));
    const abortError=()=>new DOMException('Sprite request cancelled','AbortError');
    function readImage(signal) {
        if(signal.aborted)return Promise.reject(abortError());
        return new Promise((resolve,reject)=>{
            const image=makeImage();
            const cleanup=()=>{image.onload=null;image.onerror=null;signal.removeEventListener('abort',abort);};
            const abort=()=>{cleanup();image.src='';reject(abortError());};
            image.onload=()=>{cleanup();resolve(image);};
            image.onerror=()=>{cleanup();reject(Error('Saloon sprite image unavailable'));};
            signal.addEventListener('abort',abort,{once:true});
            image.src=new URL('./models/saloon-sprites.webp',import.meta.url).href;
        });
    }
    async function build(signal) {
        const response=await fetcher(new URL('./models/saloon-sprites.json',import.meta.url),{signal});
        if(!response.ok)throw Error('Saloon sprite metadata unavailable');
        const data=await response.json();
        if(signal.aborted)throw abortError();
        if(data.frameCount!==24||data.frames?.length!==24||!(data.nativeWidth>0))throw Error('Invalid saloon sprites');
        const image=await readImage(signal);
        if(signal.aborted){image.src='';throw abortError();}
        if(image.naturalWidth!==data.imageWidth||image.naturalHeight!==data.imageHeight)throw Error('Incomplete saloon sprite image');
        return {image,data};
    }
    function load({signal}={}) {
        if(signal?.aborted)return Promise.reject(abortError());
        if(atlas&&metadata)return Promise.resolve(metadata);
        const subscriber={generation:pending?generation:generation+1};subscribers.add(subscriber);
        if(!pending){
            const current=++generation,active=controller=new AbortController();state='loading';
            const timer=setTimeout(()=>active.abort(),options.timeoutMs??20000);
            pending=build(active.signal).then(({image,data})=>{
                if(current!==generation||active.signal.aborted){image.src='';throw abortError();}
                atlas=image;metadata=data;state='ready';return data;
            }).catch(error=>{if(current===generation)state='error';throw error;})
                .finally(()=>{clearTimeout(timer);if(current===generation){pending=null;controller=null;}});
        }
        const shared=pending;
        const release=()=>{
            if(!subscribers.delete(subscriber))return;
            if(subscriber.generation===generation && pending && !atlas &&
                ![...subscribers].some(item=>item.generation===generation)){
                const active=controller;generation++;pending=null;controller=null;state='idle';active?.abort();
            }
        };
        let abort;
        const request=signal?new Promise((resolve,reject)=>{
            abort=()=>{release();reject(abortError());};signal.addEventListener('abort',abort,{once:true});shared.then(resolve,reject);
        }):shared;
        return request.finally(()=>{release();if(abort)signal.removeEventListener('abort',abort);});
    }
    function sprite(car,angle=0) {
        if(car?.id!=='rolls-royce-operator'||!atlas||!metadata)return null;
        const count=metadata.frameCount,index=((Math.round(angle/(Math.PI*2)*count)%count)+count)%count;
        if(frames.has(index))return frames.get(index);
        const frame=metadata.frames[index],canvas=makeCanvas();
        canvas.width=frame.width;canvas.height=frame.height;
        const context=canvas.getContext('2d');if(!context)return null;
        context.drawImage(atlas,frame.x,frame.y,frame.width,frame.height,0,0,frame.width,frame.height);
        const result={canvas,xOrigin:metadata.xOrigin,yOrigin:metadata.yOrigin,contactY:frame.contactY,nativeWidth:metadata.nativeWidth};
        frames.set(index,result);if(frames.size>6){const old=frames.keys().next().value;frames.get(old).canvas.width=1;frames.get(old).canvas.height=1;frames.delete(old);}return result;
    }
    return {load,sprite,get state(){return state;},dispose(){
        generation++;controller?.abort();controller=null;pending=null;state='idle';subscribers.clear();
        if(atlas)atlas.src='';atlas=null;metadata=null;
        for(const {canvas}of frames.values()){canvas.width=1;canvas.height=1;}frames.clear();
    }};
}
let sharedLoader;
export function loadSaloonSprites(options) {return (sharedLoader??=createSaloonSpriteLoader()).load(options);}
export function saloonSprite(car,angle=0) {return sharedLoader?.sprite(car,angle)??null;}
