/** Exact user-supplied GLB for the operator Grand Saloon. No catalogue/save changes. */
export const SALOON_MODEL = Object.freeze({
  id:'rolls-royce-operator', url:new URL('./models/grand-saloon.glb', import.meta.url).href,
  bytes:24970372, sha256:'730254e6e74205c927bb2da14abe97419406df5ea09bc4e284eabec71e3743cd'
});
const MAX_BYTES=32*1024*1024;
function requireValue(test,message){if(!test)throw new Error(message);}
function bytesOf(source){
  if(ArrayBuffer.isView(source))return new Uint8Array(source.buffer,source.byteOffset,source.byteLength);
  return new Uint8Array(source);
}

/** This asset has one static PBR mesh. Reject unsupported input rather than silently flatten it. */
export function parseSaloonGLB(source){
  const bytes=bytesOf(source), view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
  requireValue(bytes.length>=28 && bytes.length<=MAX_BYTES,'Invalid GLB size');
  requireValue(view.getUint32(0,true)===0x46546c67 && view.getUint32(4,true)===2,'Expected glTF 2 GLB');
  requireValue(view.getUint32(8,true)===bytes.length,'Truncated GLB');
  const chunks=[];let offset=12;
  while(offset<bytes.length){
    requireValue(offset+8<=bytes.length,'Truncated GLB chunk');
    const length=view.getUint32(offset,true),type=view.getUint32(offset+4,true);offset+=8;
    requireValue(length%4===0 && offset+length<=bytes.length,'Invalid GLB chunk bounds');
    chunks.push({type,bytes:bytes.subarray(offset,offset+length)});offset+=length;
  }
  requireValue(chunks.length===2 && chunks[0].type===0x4e4f534a && chunks[1].type===0x004e4942,'Expected embedded JSON and BIN');
  const gltf=JSON.parse(new TextDecoder().decode(chunks[0].bytes)),bin=chunks[1].bytes;
  requireValue(gltf.asset?.version==='2.0' && !(gltf.extensionsRequired?.length),'Unsupported GLB extensions');
  requireValue(gltf.buffers?.length===1 && !gltf.buffers[0].uri && gltf.buffers[0].byteLength<=bin.length,'Expected one embedded buffer');
  requireValue(gltf.nodes?.length===1 && gltf.meshes?.length===1 && gltf.scenes?.length===1 && gltf.nodes[0].mesh===0,'Expected one static mesh');
  requireValue(gltf.scenes[0].nodes?.length===1 && gltf.scenes[0].nodes[0]===0,'Invalid scene root');
  requireValue(!gltf.skins?.length && !gltf.animations?.length && !['matrix','translation','rotation','scale'].some(key=>gltf.nodes[0][key]),'Unsupported node transform');
  const primitive=gltf.meshes[0].primitives?.[0];
  requireValue(gltf.meshes[0].primitives?.length===1 && (primitive.mode??4)===4 && !primitive.targets,'Expected static triangles');
  function bufferView(index){
    const entry=gltf.bufferViews?.[index];
    requireValue(entry && (entry.buffer??0)===0 && Number.isSafeInteger(entry.byteLength) && entry.byteLength>0,'Invalid buffer view');
    const start=entry.byteOffset??0;
    requireValue(Number.isSafeInteger(start) && start>=0 && start+entry.byteLength<=gltf.buffers[0].byteLength,'Buffer view outside binary');
    return {entry,bytes:bin.subarray(start,start+entry.byteLength)};
  }
  function accessor(index,type,componentType,components){
    const item=gltf.accessors?.[index];
    requireValue(item && item.type===type && item.componentType===componentType && !item.sparse && !item.normalized,'Unsupported vertex accessor');
    requireValue(Number.isSafeInteger(item.count) && item.count>0 && item.count<=2000000,'Invalid accessor count');
    const {entry,bytes:raw}=bufferView(item.bufferView),start=item.byteOffset??0;
    requireValue(!entry.byteStride || entry.byteStride===components*4,'Interleaved accessor not supported');
    requireValue(Number.isSafeInteger(start) && start>=0 && start%4===0 && start+item.count*components*4<=raw.length,'Invalid accessor range');
    const copied=raw.slice(start,start+item.count*components*4);
    const data=componentType===5126?new Float32Array(copied.buffer):new Uint32Array(copied.buffer);
    if(componentType===5126)for(const value of data)requireValue(Number.isFinite(value),'Non-finite vertex data');
    return {data,count:item.count,item};
  }
  const positions=accessor(primitive.attributes?.POSITION,'VEC3',5126,3);
  const normals=accessor(primitive.attributes?.NORMAL,'VEC3',5126,3);
  const uv=accessor(primitive.attributes?.TEXCOORD_0,'VEC2',5126,2);
  const indices=accessor(primitive.indices,'SCALAR',5125,1);
  requireValue(normals.count===positions.count && uv.count===positions.count && indices.count%3===0,'Attribute/triangle counts differ');
  for(const index of indices.data)requireValue(index<positions.count,'Triangle index outside vertices');
  const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(let i=0;i<positions.data.length;i++){const axis=i%3,v=positions.data[i];min[axis]=Math.min(min[axis],v);max[axis]=Math.max(max[axis],v);}
  const dimensions=max.map((value,i)=>value-min[i]);requireValue(dimensions.every(value=>value>0 && value<1000),'Invalid model bounds');
  const material=gltf.materials?.[primitive.material],pbr=material?.pbrMetallicRoughness;
  requireValue(material && pbr && !material.extensions && (material.alphaMode??'OPAQUE')==='OPAQUE','Unsupported material');
  function imageAt(textureIndex){
    const texture=gltf.textures?.[textureIndex],image=gltf.images?.[texture?.source];
    requireValue(image && !image.uri && ['image/png','image/jpeg'].includes(image.mimeType),'Expected embedded PNG/JPEG');
    const raw=bufferView(image.bufferView).bytes;
    return {bytes:raw,mimeType:image.mimeType,sampler:gltf.samplers?.[texture.sampler]??{}};
  }
  const images={baseColor:imageAt(pbr.baseColorTexture?.index),normal:imageAt(material.normalTexture?.index),roughnessMetalness:imageAt(pbr.metallicRoughnessTexture?.index)};
  return {positions:positions.data,normals:normals.data,uv:uv.data,indices:indices.data,images,material,
    metadata:Object.freeze({vertices:positions.count,triangles:indices.count/3,min:Object.freeze(min),max:Object.freeze(max),width:dimensions[0],height:dimensions[1],length:dimensions[2]})};
}

async function defaultDecodeImage(bytes,mimeType,signal){
  const blob=new Blob([bytes],{type:mimeType});
  if(typeof createImageBitmap==='function'){
    const bitmap=await createImageBitmap(blob,{imageOrientation:'none',premultiplyAlpha:'none',colorSpaceConversion:'none'});
    if(signal.aborted){bitmap.close();throw new DOMException('Aborted','AbortError');}
    return bitmap;
  }
  return new Promise((resolve,reject)=>{
    const image=new Image(),url=URL.createObjectURL(blob);
    const release=()=>{URL.revokeObjectURL(url);signal.removeEventListener('abort',abort);};
    const abort=()=>{image.src='';release();reject(new DOMException('Aborted','AbortError'));};
    image.onload=()=>{release();resolve(image);};image.onerror=()=>{release();reject(new Error('Model texture decoding failed'));};
    if(signal.aborted){abort();return;}signal.addEventListener('abort',abort,{once:true});image.src=url;
  });
}

export function createSaloonModelLoader(THREE,options={}){
  let template=null,metadata=null,pending=null,controller=null,generation=0,state='idle',error=null;
  const subscribers=new Set();
  const fetcher=options.fetch??globalThis.fetch?.bind(globalThis),decodeImage=options.decodeImage??defaultDecodeImage;
  const notify=progress=>{for(const subscriber of subscribers){if(subscriber.generation===generation && subscriber.onProgress){try{subscriber.onProgress(progress);}catch{}}}};
  function disposeTemplate(value){
    if(!value)return;value.geometry.dispose();value.material.dispose();
    for(const texture of value.textures){texture.dispose();texture.image?.close?.();}
  }
  async function build(signal){
    requireValue(typeof fetcher==='function','Fetch unavailable');
    const response=await fetcher(options.url??SALOON_MODEL.url,{signal,cache:'force-cache'});
    requireValue(response.ok,'Model download failed');
    const advertised=Number(response.headers?.get?.('content-length'));
    requireValue(!Number.isFinite(advertised) || advertised<=MAX_BYTES,'Model download too large');
    const expected=options.expectedBytes??SALOON_MODEL.bytes;let bytes;
    if(response.body?.getReader){
      const reader=response.body.getReader(),chunks=[];let loaded=0;
      try{for(;;){const {done,value}=await reader.read();if(done)break;loaded+=value.length;requireValue(loaded<=MAX_BYTES && loaded<=expected,'Model download too large');chunks.push(value);notify({phase:'download',state:'loading',loaded,total:expected});}
      }catch(cause){await reader.cancel().catch(()=>{});throw cause;}finally{reader.releaseLock?.();}
      bytes=new Uint8Array(loaded);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
    }else bytes=new Uint8Array(await response.arrayBuffer());
    requireValue(bytes.length===expected,'Model byte count differs');
    if(signal.aborted)throw new DOMException('Aborted','AbortError');
    const digest=options.expectedSha256??SALOON_MODEL.sha256;
    requireValue(globalThis.crypto?.subtle,'Secure model integrity verification unavailable');
    const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(value=>value.toString(16).padStart(2,'0')).join('');
    requireValue(hash===digest,'Model checksum differs');
    if(signal.aborted)throw new DOMException('Aborted','AbortError');
    const data=parseSaloonGLB(bytes);notify({phase:'textures',state:'decoding',loaded:expected,total:expected});
    const textures=[];let geometry,material;
    try{
      const maps={};
      for(const [name,entry]of Object.entries(data.images)){
        if(signal.aborted)throw new DOMException('Aborted','AbortError');
        const image=await decodeImage(entry.bytes,entry.mimeType,signal);
        if(signal.aborted){image.close?.();throw new DOMException('Aborted','AbortError');}
        const texture=new THREE.Texture(image);textures.push(texture);texture.flipY=false;
        texture.colorSpace=name==='baseColor'?(THREE.SRGBColorSpace??'srgb'):'';
        const filters={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter};
        const wraps={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping};
        texture.magFilter=filters[entry.sampler.magFilter??9729]??texture.magFilter;
        texture.minFilter=filters[entry.sampler.minFilter??9987]??texture.minFilter;
        texture.wrapS=wraps[entry.sampler.wrapS??10497]??texture.wrapS;texture.wrapT=wraps[entry.sampler.wrapT??10497]??texture.wrapT;
        texture.generateMipmaps=true;texture.needsUpdate=true;maps[name]=texture;
      }
      geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(data.positions,3));geometry.setAttribute('normal',new THREE.BufferAttribute(data.normals,3));geometry.setAttribute('uv',new THREE.BufferAttribute(data.uv,2));geometry.setIndex(new THREE.BufferAttribute(data.indices,1));geometry.computeBoundingBox();geometry.computeBoundingSphere();
      const pbr=data.material.pbrMetallicRoughness,factor=pbr.baseColorFactor??[1,1,1,1];
      material=new THREE.MeshStandardMaterial({map:maps.baseColor,normalMap:maps.normal,roughnessMap:maps.roughnessMetalness,metalnessMap:maps.roughnessMetalness,roughness:pbr.roughnessFactor??1,metalness:pbr.metallicFactor??1,opacity:factor[3]??1});
      material.color.setRGB(factor[0],factor[1],factor[2]);material.normalScale.setScalar(data.material.normalTexture.scale??1);material.name='User supplied Grand Saloon — original GLB material';
      return {geometry,material,textures,metadata:data.metadata};
    }catch(cause){geometry?.dispose();material?.dispose();for(const texture of textures){texture.dispose();texture.image?.close?.();}throw cause;}
  }
  function load({onProgress,signal}={}){
    if(signal?.aborted)return Promise.reject(new DOMException('Aborted','AbortError'));
    if(template)return Promise.resolve(metadata);
    const subscriber={onProgress,generation:pending?generation:generation+1};
    subscribers.add(subscriber);
    if(!pending){
      const current=++generation;controller=new AbortController();state='loading';error=null;
      const active=controller,timer=setTimeout(()=>active.abort(),options.timeoutMs??60000);
      pending=build(active.signal).then(value=>{
        if(current!==generation || active.signal.aborted){disposeTemplate(value);throw new DOMException('Aborted','AbortError');}
        template=value;metadata=value.metadata;state='ready';notify({phase:'ready',state:'ready',loaded:SALOON_MODEL.bytes,total:SALOON_MODEL.bytes});return metadata;
      }).catch(cause=>{if(current===generation){state='error';error=cause;}throw cause;}).finally(()=>{clearTimeout(timer);if(current===generation){pending=null;controller=null;}});
    }
    const shared=pending;
    const release=()=>{
      if(!subscribers.delete(subscriber))return;
      // Cancel the 25 MB transfer once its last consumer leaves. A garage/race
      // which still needs the same asset keeps the single shared request alive.
      if(subscriber.generation===generation && pending && !template &&
          ![...subscribers].some(item=>item.generation===generation)){
        const active=controller;generation++;controller=null;pending=null;state='idle';error=null;
        active?.abort();
      }
    };
    let abort;
    const request=signal?new Promise((resolve,reject)=>{
      abort=()=>{release();reject(new DOMException('Aborted','AbortError'));};
      signal.addEventListener('abort',abort,{once:true});
      shared.then(resolve,reject);
    }):shared;
    return request.finally(()=>{release();if(abort)signal.removeEventListener('abort',abort);});
  }
  function createModel(vehicle,{rotationY=0}={}){
    if(vehicle?.id!==SALOON_MODEL.id || !template)return null;
    const root=new THREE.Group(),body=new THREE.Group(),mesh=new THREE.Mesh(template.geometry.clone(),template.material.clone());
    root.name=vehicle.code??'Grand Saloon';mesh.name='Original uploaded luxury car';mesh.castShadow=true;mesh.receiveShadow=true;
    const length=Number(vehicle.dimensions?.[0])||5.419,scale=length/metadata.length;
    body.scale.setScalar(scale);body.rotation.y=rotationY;
    mesh.position.set(-(metadata.min[0]+metadata.max[0])/2,-metadata.min[1],-(metadata.min[2]+metadata.max[2])/2);
    body.add(mesh);root.add(body);
    root.userData={data:vehicle,wheels:[],frontWheels:[],tailLights:[],headlights:[],importedQuality:'original-glb',originalGLBSha256:SALOON_MODEL.sha256,animate(){}};
    return root;
  }
  return {load,createModel,get state(){return state;},get error(){return error;},get metadata(){return metadata;},
    dispose(){generation++;controller?.abort();pending=null;controller=null;disposeTemplate(template);template=null;metadata=null;state='idle';error=null;subscribers.clear();}};
}
