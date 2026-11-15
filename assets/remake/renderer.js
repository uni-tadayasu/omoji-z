import * as THREE from './vendor/three.module.min.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mix = (a, b, t) => a + (b - a) * t;
const palettes = {
  city: {sky:0x101d32, fog:0x243b51, ground:0x162838, sun:0xabbfe4, light:0xffddb5, road:0x29333e, water:true},
  coast: {sky:0x7ba5b7, fog:0x97b8c3, ground:0x2b6270, sun:0xffe4bd, light:0xffd39a, road:0x48515a, water:true},
  mountain: {sky:0x8da9bc, fog:0x9fb7c6, ground:0x364d49, sun:0xffe6bc, light:0xffd8a3, road:0x424951},
  forest: {sky:0x738b8e, fog:0x8aa39d, ground:0x263e35, sun:0xe4f3c3, light:0xffdbad, road:0x39433f},
  snow: {sky:0x91b3c8, fog:0xb9d0dd, ground:0xb9cccf, sun:0xe6f2ff, light:0xffddab, road:0x46505a},
  sunset: {sky:0x614652, fog:0x886b77, ground:0x3b3c50, sun:0xffb886, light:0xffcb91, road:0x41414e, water:true}
};
function seeded(seed = 1) { let value=seed>>>0; return () => {value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;}; }
function hash(text='') {return [...text].reduce((a,c)=>Math.imul(a^c.charCodeAt(0),16777619),2166136261)>>>0;}
function color(value, fallback='#b9c0c9') {try{return new THREE.Color(typeof value==='string'&&/^#[0-9a-f]{6}$/i.test(value)?value:fallback);}catch{return new THREE.Color(fallback);}}
function disposeObject(object) {
  const geometries=new Set(),materials=new Set(),textures=new Set();
  object.traverse(node=>{if(node.geometry)geometries.add(node.geometry); for(const material of node.material?(Array.isArray(node.material)?node.material:[node.material]):[]){materials.add(material);for(const key of ['map','normalMap','roughnessMap','alphaMap'])if(material[key])textures.add(material[key]);}});
  geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
}
function merge(parts) {
  const positions=[],normals=[],uvs=[];
  for(const {geometry,matrix} of parts){const g=geometry.index?geometry.toNonIndexed():geometry.clone();if(matrix)g.applyMatrix4(matrix);const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++){positions.push(p.getX(i),p.getY(i),p.getZ(i));normals.push(n?.getX(i)||0,n?.getY(i)||1,n?.getZ(i)||0);uvs.push(u?.getX(i)||0,u?.getY(i)||0);}g.dispose();geometry.dispose();}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.computeBoundingSphere();return g;
}
function matrix(x=0,y=0,z=0,sx=1,sy=1,sz=1,rx=0,ry=0,rz=0){return new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(sx,sy,sz));}
function partBox(parts,x,y,z,w,h,d,rx=0,ry=0,rz=0){parts.push({geometry:new THREE.BoxGeometry(w,h,d),matrix:matrix(x,y,z,1,1,1,rx,ry,rz)});}
function partRod(parts,a,b,r=.025){const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),direction=to.clone().sub(from),q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),direction.clone().normalize());parts.push({geometry:new THREE.CylinderGeometry(r,r,direction.length(),8),matrix:new THREE.Matrix4().compose(from.add(to).multiplyScalar(.5),q,new THREE.Vector3(1,1,1))});}
function mesh(geometry,material,parent,shadows=true){const m=new THREE.Mesh(geometry,material);m.castShadow=shadows;m.receiveShadow=shadows;parent?.add(m);return m;}
function asphaltTexture(){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d'),rng=seeded(17);ctx.fillStyle='#85898e';ctx.fillRect(0,0,256,256);for(let i=0;i<20000;i++){const v=80+Math.floor(rng()*110);ctx.fillStyle=`rgba(${v},${v},${v},.17)`;ctx.fillRect(rng()*256,rng()*256,1+rng()*1.4,1+rng()*1.4);}const tex=new THREE.CanvasTexture(canvas);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;return tex;
}
function windowTexture(){
  const c=document.createElement('canvas');c.width=128;c.height=256;const ctx=c.getContext('2d'),r=seeded(43);ctx.fillStyle='#182733';ctx.fillRect(0,0,128,256);for(let y=2;y<256;y+=12)for(let x=3;x<128;x+=12){ctx.fillStyle=r()>.45?(r()>.4?'#7595a5':'#cfc0a0'):'#1b3443';ctx.fillRect(x,y,5,7);}const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return t;
}
function glowTexture(){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.14,'rgba(255,255,255,.6)');g.addColorStop(.45,'rgba(255,255,255,.08)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);}
function skylineScene(renderer){
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x647889);
  const black=new THREE.MeshBasicMaterial({color:0x13202c,side:THREE.BackSide});mesh(new THREE.BoxGeometry(30,24,30),black,scene,false);
  for(const [x,y,z,w,h,d,c] of [[-9,5,0,1,14,20,0xb6d9ee],[8,8,0,1,5,24,0xffffff],[0,11,0,12,1,20,0xffffff],[0,2,12,18,9,1,0x688fae]]){const o=mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:c}),scene,false);o.position.set(x,y,z);}
  const gen=new THREE.PMREMGenerator(renderer),target=gen.fromScene(scene,.1);disposeObject(scene);gen.dispose();return target;
}
function createBody(length,width,height,type='coupe') {
  const half=width/2,stations=64,sides=24,positions=[],uv=[],indices=[];
  for(let s=0;s<=stations;s++){const f=s/stations,z=(f-.5)*length,taper=.90+.10*Math.sin(Math.PI*f),top=.66+height*.12+.065*Math.sin(Math.PI*f),bottom=.28;
    for(let r=0;r<=sides;r++){const a=r/sides*TAU,side=Math.sin(a),up=Math.cos(a),x=Math.sign(side)*Math.pow(Math.abs(side),.55)*half*taper,y=mix(bottom,top,(Math.sign(up)*Math.pow(Math.abs(up),.62)+1)/2);positions.push(x,y,z);uv.push(r/sides,f);}
  }
  for(let s=0;s<stations;s++)for(let r=0;r<sides;r++){const a=s*(sides+1)+r,b=a+sides+1;indices.push(a,b,a+1,b,b+1,a+1);}
  for(const front of [false,true]){const ring=(front?stations:0)*(sides+1),cap=positions.length/3,z=(front?.5:-.5)*length,cy=(.66+height*.12+.28)/2;positions.push(0,cy,z);uv.push(.5,.5);for(let r=0;r<=sides;r++){const i=(ring+r)*3;positions.push(positions[i],positions[i+1],positions[i+2]);uv.push(r/sides,front?1:0);}for(let r=0;r<sides;r++){if(front)indices.push(cap,cap+r+2,cap+r+1);else indices.push(cap,cap+r+1,cap+r+2);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
function cabinGeometry(length,width,height,type){
  const shape=({hatch:[-.40,-.25,.06,.27,.96],coupe:[-.31,-.12,.06,.27,.92],sedan:[-.29,-.16,.08,.29,.96],van:[-.42,-.35,.20,.40,.99],estate:[-.41,-.32,.12,.31,.96],bed:[-.06,0,.20,.35,.98]})[type]||[-.31,-.12,.06,.27,.94];
  const roofY=Math.max(1.12,height*shape[4]),base=.79;
  const sections=[[length*shape[0],base,width*.43],[length*shape[1],roofY,width*.33],[length*shape[2],roofY,width*.33],[length*shape[3],base,width*.43]];
  const pos=[],indices=[];
  sections.forEach(([z,y,w])=>{pos.push(-w,base,z,-w,y,z,w,y,z,w,base,z);});
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){const a=i*4+j,b=a+4;indices.push(a,a+1,b,b,a+1,b+1);}indices.push(0,2,1,0,3,2,12,13,14,12,14,15);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(indices);g.computeVertexNormals();return {geometry:g,sections,roofY};
}
function createCar(car={},paint,environment,compact=false){
  const group=new THREE.Group(),dims=car.dimensions||[4.5,1.86,1.32];const length=clamp(dims[0],3.4,5.5),width=clamp(dims[1],1.6,2.2),height=clamp(dims[2],1.12,1.9),type=car.coachwork||'coupe';
  const bodyColor=color(paint||car.paint),bodyMat=new THREE.MeshPhysicalMaterial({color:bodyColor,metalness:.78,roughness:.24,clearcoat:1,clearcoatRoughness:.13,envMap:environment,envMapIntensity:1.2});
  const black=new THREE.MeshStandardMaterial({color:0x080d14,metalness:.12,roughness:.58}),metal=new THREE.MeshStandardMaterial({color:0x9da8b2,metalness:.9,roughness:.25,envMap:environment}),glass=new THREE.MeshPhysicalMaterial({color:0x182b3b,metalness:.4,roughness:.09,clearcoat:1,transparent:true,opacity:.94,envMap:environment,envMapIntensity:1.4,side:THREE.DoubleSide});
  const lightsFront=new THREE.MeshStandardMaterial({color:0xe9f6ff,emissive:0x8ecbff,emissiveIntensity:3,toneMapped:false}),lightsRear=new THREE.MeshStandardMaterial({color:0xed344a,emissive:0xff142c,emissiveIntensity:2.6,toneMapped:false});
  const paintParts=[],blackParts=[],chromeParts=[],frontParts=[],rearParts=[];
  mesh(createBody(length,width,height,type),bodyMat,group);
  const cab=cabinGeometry(length,width,height,type);mesh(cab.geometry,glass,group);
  const zA=cab.sections[1][0],zB=cab.sections[2][0],roofWidth=width*.675;
  partBox(paintParts,0,cab.roofY+.015,(zA+zB)/2,roofWidth,.055,zB-zA+.08);
  for(const side of [-1,1]){
    for(const [a,b] of [[0,1],[2,3]]){const ca=cab.sections[a],cb=cab.sections[b];partRod(paintParts,[ca[2]*side,ca[1],ca[0]],[cb[2]*side,cb[1],cb[0]],.035);}
    partRod(chromeParts,[width*.43*side,.82,cab.sections[0][0]],[width*.43*side,.82,cab.sections[3][0]],.014);
    const mid=(zA+zB)*.25;partRod(blackParts,[width*.43*side,.82,mid],[width*.335*side,cab.roofY,mid],.04);
    partBox(blackParts,side*(width*.5-.045),.31,0,.09,.16,length*.66);
    partBox(chromeParts,side*(width*.5+.02),.76,-length*.03,.018,.025,.17);
    partBox(paintParts,side*(width*.5+.09),.99,length*.18,.21,.10,.23,0,side*-.17,0);
    partBox(blackParts,side*(width*.5+.095),.99,length*.165,.18,.074,.035);
    partBox(frontParts,side*width*.31,.69,length*.493,width*.25,.065,.035,0,side*-.09,0);
    partBox(rearParts,side*width*.30,.70,-length*.492,width*.29,.065,.04);
    partBox(blackParts,side*width*.32,.43,length*.49,width*.23,.12,.045);
    partBox(chromeParts,side*width*.27,.30,-length*.49,.12,.085,.12);
  }
  if(type==='bed'){partBox(blackParts,0,.84,-length*.26,width*.79,.035,length*.35);for(const side of [-1,1])partBox(paintParts,side*width*.44,.94,-length*.26,.12,.23,length*.39);partBox(paintParts,0,.94,-length*.45,width*.87,.23,.10);}
  partBox(blackParts,0,.45,length*.49,width*.36,.13,.04);partBox(chromeParts,0,.65,length*.501,.06,.045,.012);
  partBox(blackParts,0,.31,-length*.49,width*.62,.12,.06);partBox(rearParts,0,.72,-length*.496,width*.34,.018,.035);
  // A real rear deck, brake diffuser and plate distinguish the car from a simple box.
  partBox(blackParts,0,.51,-length*.502,.42,.13,.014);partBox(chromeParts,0,.515,-length*.51,.36,.085,.008);
  const spoiler=car.spoiler||['coupe','fastback'].includes(type)&&car.power>260;
  if(spoiler){for(const side of [-1,1])partBox(blackParts,side*width*.3,.95,-length*.40,.035,.24,.10);partBox(paintParts,0,1.09,-length*.40,width*.96,.06,.26,0,0,0);}
  mesh(merge(paintParts),bodyMat,group);mesh(merge(blackParts),black,group);mesh(merge(chromeParts),metal,group);mesh(merge(frontParts),lightsFront,group);mesh(merge(rearParts),lightsRear,group);
  const wheels=[],wheelRadius=clamp(height*.235,.30,.38),wheelWidth=.22,axleFront=length*.31,axleRear=-length*.29;
  const rubber=new THREE.MeshStandardMaterial({color:0x080c12,roughness:.87,metalness:.02});
  for(const z of [axleFront,axleRear])for(const side of [-1,1]){
    const assembly=new THREE.Group();assembly.position.set(side*(width*.5-.035),wheelRadius,z);group.add(assembly);
    const tire=new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius,wheelRadius,wheelWidth,32,1),rubber);tire.rotation.z=Math.PI/2;tire.castShadow=true;assembly.add(tire);
    const rimParts=[],rimR=wheelRadius*.71;rimParts.push({geometry:new THREE.TorusGeometry(rimR,.024,8,24),matrix:matrix(side*(wheelWidth/2+.008),0,0,1,1,1,0,Math.PI/2,0)});rimParts.push({geometry:new THREE.CylinderGeometry(.058,.058,.025,16),matrix:matrix(side*(wheelWidth/2+.018),0,0,1,1,1,0,0,Math.PI/2)});
    for(let s=0;s<10;s++){const a=s/10*TAU;partRod(rimParts,[side*(wheelWidth/2+.02),Math.sin(a)*.05,Math.cos(a)*.05],[side*(wheelWidth/2+.02),Math.sin(a+.1)*rimR,Math.cos(a+.1)*rimR],.014);}
    mesh(merge(rimParts),metal,assembly,false);wheels.push({group:assembly,front:z>0,side});
  }
  const shadow=mesh(new THREE.PlaneGeometry(width*1.65,length*1.38),new THREE.MeshBasicMaterial({color:0x000000,map:glowTexture(),transparent:true,opacity:.62,depthWrite:false}),group,false);shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;
  group.userData={wheels,wheelRadius,lightsRear,bodyMat,length,width,height,compact};return group;
}
function ribbon(track,lateral,width,step=5,y=.025,interval=null){
  const positions=[],uvs=[],indices=[],n=Math.max(80,Math.ceil(track.length/step));
  for(let i=0;i<=n;i++){const d=i/n*track.length,p=track.sample(d),rightX=Math.cos(p.heading),rightZ=-Math.sin(p.heading),l=typeof lateral==='function'?lateral(p,d):lateral,w=typeof width==='function'?width(p,d):width;
    for(const side of [-1,1]){const offset=l+side*w/2;positions.push(p.x+rightX*offset,p.y+y,p.z+rightZ*offset);uvs.push(side<0?0:1,d/8);}if(i<n&&(!interval||interval(d))){const k=i*2;indices.push(k,k+2,k+1,k+2,k+3,k+1);}}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
function retainingWall(track,lateral,height=1.4){const positions=[],indices=[],count=Math.ceil(track.length/6);for(let i=0;i<=count;i++){const p=track.sample(i/count*track.length),x=p.x+Math.cos(p.heading)*lateral,z=p.z-Math.sin(p.heading)*lateral;positions.push(x,p.y-.09,z,x,p.y-height,z);if(i<count){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setIndex(indices);g.computeVertexNormals();return g;}
function instanced(geometry,material,transforms,parent,cast=false){if(!transforms.length){geometry.dispose();return null;}const object=new THREE.InstancedMesh(geometry,material,transforms.length);transforms.forEach((m,i)=>object.setMatrixAt(i,m));object.castShadow=cast;object.receiveShadow=true;object.instanceMatrix.needsUpdate=true;object.computeBoundingSphere();parent.add(object);return object;}
function canvasSign(text,width=512,height=128){const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.fillStyle='#102c37';ctx.fillRect(0,0,width,height);ctx.strokeStyle='#91b8b8';ctx.lineWidth=4;ctx.strokeRect(5,5,width-10,height-10);ctx.fillStyle='#effaff';ctx.textAlign='center';ctx.font='600 39px sans-serif';ctx.fillText(text,width/2,height*.46);ctx.font='18px sans-serif';ctx.fillStyle='#8db8c0';ctx.fillText('OMOJI Z   /   CLOSED COURSE',width/2,height*.79);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;return tex;}

export class GameRenderer {
  constructor(canvas,{quality='high',onError}={}){
    this.canvas=canvas;this.onError=onError;this.quality=quality;this.mode='garage';this.cameraMode='chase';this.clock=0;this.track=null;this.currentCar=null;this.cameraReady=false;
    try{this.renderer=new THREE.WebGLRenderer({canvas,antialias:quality!=='low',alpha:false,powerPreference:'high-performance'});}catch(error){onError?.(error);throw new Error('3D描画を開始できません。ブラウザーのハードウェアアクセラレーションを確認してください。',{cause:error});}
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.12;this.renderer.shadowMap.enabled=quality==='high';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.environmentTarget=skylineScene(this.renderer);this.environment=this.environmentTarget.texture;
    this.camera=new THREE.PerspectiveCamera(50,1,.1,2200);this.lookAt=new THREE.Vector3();this.desiredLook=new THREE.Vector3();this.desiredPosition=new THREE.Vector3();
    this.scene=new THREE.Scene();this.garageScene=new THREE.Scene();this.garageScene.background=new THREE.Color(0x101820);this.garageScene.fog=new THREE.FogExp2(0x101820,.018);this.garageScene.environment=this.environment;this.scene.environment=this.environment;
    this.trackGroup=new THREE.Group();this.scene.add(this.trackGroup);this.carGroup=new THREE.Group();this.scene.add(this.carGroup);this.opponents=[];
    this.scene.add(new THREE.HemisphereLight(0xbdd9f2,0x183744,2));this.sun=new THREE.DirectionalLight(0xffd9bb,3.2);this.sun.position.set(-30,70,45);this.sun.castShadow=true;this.sun.shadow.mapSize.set(2048,2048);this.sun.shadow.camera.left=-35;this.sun.shadow.camera.right=35;this.sun.shadow.camera.top=45;this.sun.shadow.camera.bottom=-35;this.sun.shadow.camera.near=1;this.sun.shadow.camera.far=180;this.sun.shadow.bias=-.0002;this.sun.shadow.normalBias=.04;this.scene.add(this.sun,this.sun.target);
    this.buildGarage();this.setQuality(quality);this.resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>this.resize()):null;this.resizeObserver?.observe(canvas);this.resize();
    this.contextLost=e=>{e.preventDefault();this.onError?.(new Error('3D描画が一時停止しました。ページを再読み込みしてください。'));};canvas.addEventListener('webglcontextlost',this.contextLost);
  }
  buildGarage(){
    const scene=this.garageScene;scene.add(new THREE.HemisphereLight(0xe2edf4,0x1b2837,2.8));const key=new THREE.DirectionalLight(0xf4efff,4);key.position.set(-5,9,8);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.03;scene.add(key);
    const rim=new THREE.DirectionalLight(0x75bfe4,2);rim.position.set(6,4,-7);scene.add(rim);
    const floor=mesh(new THREE.CircleGeometry(18,96),new THREE.MeshStandardMaterial({color:0x1c2935,metalness:.63,roughness:.31,envMap:this.environment}),scene,false);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=-.02;
    const pedestal=mesh(new THREE.CylinderGeometry(4.4,4.45,.12,96),new THREE.MeshStandardMaterial({color:0x283340,metalness:.58,roughness:.27,envMap:this.environment}),scene,false);pedestal.position.y=-.07;pedestal.receiveShadow=true;
    const ring=mesh(new THREE.TorusGeometry(4.36,.012,6,128),new THREE.MeshBasicMaterial({color:0x67b4c8}),scene,false);ring.rotation.x=Math.PI/2;ring.position.y=.002;
    const r=seeded(92),buildings=[];for(let i=0;i<90;i++){const a=i/90*TAU,d=35+r()*75,h=5+r()*28;buildings.push(matrix(Math.cos(a)*d,h/2-3,Math.sin(a)*d,3+r()*6,h,3+r()*6));}const wt=windowTexture();instanced(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x354354,map:wt,emissiveMap:wt,emissive:0x3b4a56,emissiveIntensity:.8,roughness:.88}),buildings,scene);
    this.garageCar=new THREE.Group();scene.add(this.garageCar);
  }
  setQuality(quality){this.quality=['low','medium','high'].includes(quality)?quality:'high';this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,this.quality==='high'?1.75:this.quality==='medium'?1.25:1));this.renderer.shadowMap.enabled=this.quality==='high';this.resize();}
  setCamera(mode){this.cameraMode=['chase','hood','far'].includes(mode)?mode:'chase';this.cameraReady=false;}
  setMode(mode){this.mode=mode==='race'?'race':'garage';this.cameraReady=false;if(this.mode==='race')this.camera.clearViewOffset();}
  setCar(car,paint){
    this.currentCar=car;for(const group of [this.carGroup,this.garageCar]){for(const child of [...group.children]){group.remove(child);disposeObject(child);}}
    this.playerCar=createCar(car,paint,this.environment);this.carGroup.add(this.playerCar);this.showroomCar=createCar(car,paint,this.environment);this.garageCar.add(this.showroomCar);this.cameraReady=false;
  }
  setTrack(track){
    if(this.track?.id===track.id)return;this.track=track;this.cameraReady=false;disposeObject(this.trackGroup);this.trackGroup.clear();this.opponents.forEach(c=>{this.scene.remove(c);disposeObject(c);});this.opponents=[];
    const environment=track.environment||'city',p=palettes[environment]||palettes.city;this.scene.background=new THREE.Color(p.sky);this.scene.fog=new THREE.FogExp2(p.fog,environment==='city'?.0009:.00065);this.sun.color.setHex(p.sun);this.sun.intensity=environment==='city'?2.2:3.5;this.renderer.toneMappingExposure=environment==='city'?1.25:1.05;
    const group=this.trackGroup,roadTex=asphaltTexture(),roadMat=new THREE.MeshStandardMaterial({color:p.road,map:roadTex,roughness:environment==='city'?.42:.88,metalness:environment==='city'?.24:.06,envMap:this.environment,envMapIntensity:.4});
    mesh(ribbon(track,0,(point)=>point.width||track.width,5,0),roadMat,group,false).receiveShadow=true;
    const lineMat=new THREE.MeshBasicMaterial({color:0xe6dec4}),edgeMat=new THREE.MeshBasicMaterial({color:0xb9d0d3});
    mesh(ribbon(track,0,.13,2,.035,d=>Math.floor(d/5)%3===0),lineMat,group,false);
    const fullWidth=track.width||16;
    for(const side of [-1,1])mesh(retainingWall(track,side*(fullWidth/2+.65),p.water?1.4:3),new THREE.MeshStandardMaterial({color:0x4a565e,roughness:.92,side:THREE.DoubleSide}),group,false);
    for(const side of [-1,1]){mesh(ribbon(track,side*(fullWidth/2-.45),.15,4,.04),edgeMat,group,false);mesh(ribbon(track,side*(fullWidth/2+.25),.8,5,-.10),new THREE.MeshStandardMaterial({color:0x747f85,roughness:.9}),group,false);}
    const guardrails=[],posts=[],lightPosts=[],lightHeads=[],supports=[],chevrons=[];const railMat=new THREE.MeshStandardMaterial({color:0x70818c,metalness:.66,roughness:.4}),darkMat=new THREE.MeshStandardMaterial({color:0x293a46,roughness:.77});
    const sampleStep=10,segments=Math.ceil(track.length/sampleStep);for(let i=0;i<segments;i++){const d=i/segments*track.length,point=track.sample(d),next=track.sample((i+1)/segments*track.length),dx=next.x-point.x,dz=next.z-point.z,length=Math.hypot(dx,dz)+.12,heading=Math.atan2(dx,dz);for(const side of [-1,1]){const off=side*(fullWidth/2+.35),x=(point.x+next.x)/2+Math.cos(heading)*off,z=(point.z+next.z)/2-Math.sin(heading)*off,y=(point.y+next.y)/2;guardrails.push(matrix(x,y+.75,z,.14,.27,length,0,heading,0));posts.push(matrix(point.x+Math.cos(point.heading)*off,point.y+.43,point.z-Math.sin(point.heading)*off,.13,.85,.13));}
      if(i%7===0){const side=i%14===0?1:-1,off=side*(fullWidth/2+.75),x=point.x+Math.cos(point.heading)*off,z=point.z-Math.sin(point.heading)*off;lightPosts.push(matrix(x,point.y+4.9,z,.12,9.8,.12));const inner=off-side*1.2;lightHeads.push(matrix(point.x+Math.cos(point.heading)*inner,point.y+9.8,point.z-Math.sin(point.heading)*inner,2.5,.10,.35,0,-point.heading,0));}
      if(i%6===0&&(environment==='city'||environment==='sunset'||environment==='coast')){const supportH=point.y+18;supports.push(matrix(point.x,point.y-supportH/2,point.z,1.5,supportH,2.5,0,point.heading,0));}
      if(Math.abs(point.curvature)>.007&&i%3===0){const side=point.curvature>0?-1:1,off=side*(fullWidth/2+.2);chevrons.push(matrix(point.x+Math.cos(point.heading)*off,point.y+1.6,point.z-Math.sin(point.heading)*off,1.1,.55,.04,0,point.heading,0));}
    }
    instanced(new THREE.BoxGeometry(1,1,1),railMat,guardrails,group);instanced(new THREE.BoxGeometry(1,1,1),darkMat,posts,group);instanced(new THREE.BoxGeometry(1,1,1),darkMat,lightPosts,group);instanced(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xd6f3ff}),lightHeads,group);instanced(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x293945,roughness:.95}),supports,group);instanced(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xe1af56}),chevrons,group);
    const mapPoints=track.mapPoints||Array.from({length:80},(_,i)=>track.sample(i/80*track.length));const xs=mapPoints.map(v=>v.x),zs=mapPoints.map(v=>v.z),minX=Math.min(...xs),maxX=Math.max(...xs),minZ=Math.min(...zs),maxZ=Math.max(...zs),centerX=(minX+maxX)/2,centerZ=(minZ+maxZ)/2;
    const groundMaterial=new THREE.MeshStandardMaterial({color:p.ground,metalness:p.water?.5:0,roughness:p.water?.3:1,envMap:this.environment,envMapIntensity:.4});
    const roadTerrain=Array.from({length:240},(_,i)=>track.sample(i*track.length/240));
    const terrainAt=(x,z)=>{let distance=Infinity,nearest=roadTerrain[0];for(const q of roadTerrain){const d=(q.x-x)**2+(q.z-z)**2;if(d<distance){distance=d;nearest=q;}}const away=Math.sqrt(distance);return nearest.y-2.5-Math.min(away*.10,15)+Math.sin(x*.025)*Math.cos(z*.02)*Math.min(away*.035,6);};
    if(!p.water){const spanX=maxX-minX+800,spanZ=maxZ-minZ+800,geo=new THREE.PlaneGeometry(spanX,spanZ,70,70);geo.rotateX(-Math.PI/2);geo.translate(centerX,0,centerZ);const pos=geo.attributes.position;for(let i=0;i<pos.count;i++)pos.setY(i,terrainAt(pos.getX(i),pos.getZ(i)));geo.computeVertexNormals();mesh(geo,groundMaterial,group,false).receiveShadow=true;}
    const ground=mesh(new THREE.PlaneGeometry(5000,5000),groundMaterial,group,false);ground.rotation.x=-Math.PI/2;ground.position.set(centerX,-18,centerZ);ground.receiveShadow=true;
    const rng=seeded(hash(track.id)),buildings=[],trees=[],trunks=[],mountains=[];const nearRoad=(x,z,margin)=>mapPoints.some(q=>(x-q.x)**2+(z-q.z)**2<margin*margin);
    if(environment==='city'||environment==='sunset'){
      for(let i=0;i<330;i++){const x=minX-420+rng()*(maxX-minX+840),z=minZ-420+rng()*(maxZ-minZ+840);if(nearRoad(x,z,35))continue;const h=10+rng()**2*155,w=12+rng()*30;buildings.push(matrix(x,h/2-8,z,w,h,12+rng()*35,0,Math.round(rng()*3)*Math.PI/2,0));}
      const wt=windowTexture();instanced(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x486174,map:wt,emissiveMap:wt,emissive:0x7094a5,emissiveIntensity:environment==='city'?1.05:.6,roughness:.75,metalness:.15}),buildings,group);
    }else if(!p.water){
      for(let i=0;i<650;i++){const x=minX-220+rng()*(maxX-minX+440),z=minZ-220+rng()*(maxZ-minZ+440);if(nearRoad(x,z,22))continue;const h=7+rng()*12,groundY=terrainAt(x,z);trees.push(matrix(x,h*.56+groundY,z,3+rng()*3,h,3+rng()*3));trunks.push(matrix(x,h*.2+groundY,z,.5,h*.5,.5));}
      instanced(new THREE.ConeGeometry(1,1,7),new THREE.MeshStandardMaterial({color:environment==='snow'?0xb9d0cf:0x244a3d,roughness:1}),trees,group);instanced(new THREE.CylinderGeometry(1,1,1,5),new THREE.MeshStandardMaterial({color:0x3e3831,roughness:1}),trunks,group);
    }
    for(let i=0;i<26;i++){const angle=i/26*TAU,range=Math.max(maxX-minX,maxZ-minZ)*.7+500+rng()*400,h=80+rng()*230;mountains.push(matrix(centerX+Math.cos(angle)*range,h/2-70,centerZ+Math.sin(angle)*range,250+rng()*300,h,250+rng()*300,0,rng()*TAU,0));}
    instanced(new THREE.ConeGeometry(1,1,7),new THREE.MeshStandardMaterial({color:environment==='snow'?0xb5c4cf:environment==='city'?0x23394b:0x627d7b,roughness:1,flatShading:true}),mountains,group);
    this.makeStartGate(track,group);
    // Far horizon sun/moon establishes depth without a postprocessing dependency.
    const sun=mesh(new THREE.SphereGeometry(environment==='city'?11:27,20,12),new THREE.MeshBasicMaterial({color:environment==='city'?0xc5dded:environment==='sunset'?0xffcb9b:0xf4ebd3,fog:false}),group,false);sun.position.set(centerX-650,environment==='sunset'?130:450,centerZ+950);
    this.cameraReady=false;
  }
  makeStartGate(track,parent){
    const p=track.sample(0),gate=new THREE.Group();gate.position.set(p.x,p.y,p.z);gate.rotation.y=p.heading;parent.add(gate);const w=track.width||16;const metal=new THREE.MeshStandardMaterial({color:0x243945,metalness:.6,roughness:.43});for(const s of [-1,1]){const post=mesh(new THREE.BoxGeometry(.35,6,.35),metal,gate);post.position.set(s*(w/2+.7),3,0);}const beam=mesh(new THREE.BoxGeometry(w+1.8,.32,.32),metal,gate);beam.position.y=6;
    const sign=mesh(new THREE.PlaneGeometry(8,2),new THREE.MeshBasicMaterial({map:canvasSign('OMOJI Z  /  START'),side:THREE.DoubleSide}),gate,false);sign.position.set(0,4.8,.2);
    const stripeParts=[];for(let x=0;x<Math.floor(w/.6);x++)for(let z=0;z<3;z++)if((x+z)%2===0)partBox(stripeParts,-w/2+x*.6+.3,.025,z*.6,.58,.02,.58);mesh(merge(stripeParts),new THREE.MeshBasicMaterial({color:0xd9e6e6}),gate,false);
    for(let i=0;i<5;i++){const lamp=mesh(new THREE.SphereGeometry(.13,10,8),new THREE.MeshBasicMaterial({color:0x84e6b2}),gate,false);lamp.position.set((i-2)*.5,3.55,.2);}
  }
  updateCar(car,state,dt){
    if(!car||!state)return;car.position.set(state.x||0,(state.y||0)+.025,state.z||0);car.rotation.set(0,state.yaw||0,0,'YXZ');const roll=clamp(-(state.steer||0)*(state.speed||0)*.00085,-.045,.045);car.rotation.z=roll;car.rotation.x=-(state.pitch||0)+clamp((state.acceleration||0)*.0015,-.025,.025);
    const data=car.userData;for(const wheel of data.wheels||[]){wheel.group.rotation.x+=(state.speed||0)*dt/data.wheelRadius;wheel.group.rotation.y=wheel.front?(state.steer||0)*.35:0;}
    if(data.lightsRear)data.lightsRear.emissiveIntensity=state.braking||((data.lastSpeed||0)-(state.speed||0)>dt*3)?5:2.2;data.lastSpeed=state.speed||0;
  }
  render(state,dt=1/60){
    dt=clamp(dt||0,0,.1);this.clock+=dt;
    if(this.mode==='garage'){
      this.renderer.toneMappingExposure=1.15;
      const composition={chase:{angle:.60,range:8.9,height:3.1},hood:{angle:2.55,range:8.9,height:2.7},far:{angle:1.48,range:10,height:3.6}}[this.cameraMode];
      const angle=composition.angle+Math.sin(this.clock*.045)*.15;
      const viewportWidth=this.canvas?.clientWidth||1280,viewportHeight=this.canvas?.clientHeight||720,mobile=viewportWidth<800,aspect=viewportWidth/viewportHeight;
      const dimensions=this.showroomCar?.userData||{length:4.5,width:1.9};
      const projectedSpan=dimensions.width*Math.abs(Math.cos(angle))+dimensions.length*Math.abs(Math.sin(angle));
      const range=Math.max(composition.range,projectedSpan/(2*Math.tan(20*Math.PI/180)*aspect*(mobile?.60:.55)*.88));
      const rise=composition.height*range/composition.range;
      this.camera.setViewOffset(viewportWidth,viewportHeight,-viewportWidth*(mobile?.16:.14),viewportHeight*(mobile?.19:.07),viewportWidth,viewportHeight);
      this.desiredPosition.set(Math.sin(angle)*range,rise,Math.cos(angle)*range);
      if(!this.cameraReady){this.camera.position.copy(this.desiredPosition);this.cameraReady=true;}else this.camera.position.lerp(this.desiredPosition,1-Math.exp(-dt*3));
      this.camera.fov=40;this.camera.lookAt(0,.7,0);this.camera.updateProjectionMatrix();this.renderer.render(this.garageScene,this.camera);return;
    }
    if(!state||!this.track||!this.playerCar)return;this.renderer.toneMappingExposure=this.track.environment==='city'?1.25:1.08;this.updateCar(this.playerCar,state,dt);
    const opponents=state.opponents||[];while(this.opponents.length<opponents.length){const index=this.opponents.length,opponent=opponents[index],car=createCar({...this.currentCar,spoiler:index!==1,power:300},opponent.color||['#cf6b40','#a8bbd1','#365b6a'][index%3],this.environment,true);this.opponents.push(car);this.scene.add(car);}
    for(let i=0;i<this.opponents.length;i++){this.opponents[i].visible=i<opponents.length;if(opponents[i])this.updateCar(this.opponents[i],opponents[i],dt);}
    const speed=state.speed||0,yaw=state.yaw||0,dirX=Math.sin(yaw),dirZ=Math.cos(yaw),carHeight=this.playerCar.userData.height||1.4;
    if(this.cameraMode==='hood'){
      this.desiredPosition.set(state.x+dirX*.4,state.y+carHeight+.06,state.z+dirZ*.4);this.desiredLook.set(state.x+dirX*35,this.track.sample((state.distance||0)+35).y+carHeight-.2,state.z+dirZ*35);this.playerCar.visible=false;
    }else{
      this.playerCar.visible=true;const dist=(this.cameraMode==='far'?11:7.6)+clamp(speed/55,0,1.5),height=this.cameraMode==='far'?5:3.3;const p=this.track.sample((state.distance||0)+18);this.desiredPosition.set(state.x-dirX*dist,state.y+height,state.z-dirZ*dist);this.desiredLook.set(mix(state.x+dirX*13,p.x,.35),state.y+.95,mix(state.z+dirZ*13,p.z,.35));
    }
    if(!this.cameraReady){this.camera.position.copy(this.desiredPosition);this.lookAt.copy(this.desiredLook);this.cameraReady=true;}else{const smooth=1-Math.exp(-dt*(this.cameraMode==='hood'?20:7));this.camera.position.lerp(this.desiredPosition,smooth);this.lookAt.lerp(this.desiredLook,1-Math.exp(-dt*10));}
    this.camera.lookAt(this.lookAt);const fov=this.cameraMode==='hood'?66:51+clamp(speed/80,0,1)*9;this.camera.fov=mix(this.camera.fov,fov,1-Math.exp(-dt*4));this.camera.updateProjectionMatrix();
    this.sun.position.set(state.x-25,state.y+65,state.z+35);this.sun.target.position.set(state.x,state.y,state.z);this.renderer.render(this.scene,this.camera);
  }
  resize(){const width=Math.max(1,this.canvas.clientWidth||this.canvas.parentElement?.clientWidth||800),height=Math.max(1,this.canvas.clientHeight||this.canvas.parentElement?.clientHeight||500);this.renderer.setSize(width,height,false);this.camera.aspect=width/height;this.camera.updateProjectionMatrix();}
  dispose(){this.resizeObserver?.disconnect();this.canvas.removeEventListener('webglcontextlost',this.contextLost);disposeObject(this.scene);disposeObject(this.garageScene);this.environmentTarget.dispose();this.renderer.dispose();}
}

// Geometry builders are exported for headless structural validation; GPU rendering is tested separately.
export {createCar as buildVehicle, disposeObject as disposeSceneObject};
