var Vu=Array.from(document.querySelectorAll("[data-overlay]")),Vi=[],xm=Array.from(document.body.children).filter(i=>!i.hasAttribute("data-overlay")&&!["SCRIPT","NOSCRIPT"].includes(i.tagName)),Mm='button:not([disabled]), a[href], select:not([disabled]), input:not([disabled]), [tabindex="0"]';function Hu(){let i=Vi.at(-1)?.panel;for(let e of xm)e.inert=!!i;for(let e of Vu)e.inert=!!(i&&i!==e)}for(let i of Vu)Object.defineProperty(i,"open",{get:()=>!i.hidden}),i.showModal=()=>{i.open||(Vi.push({panel:i,from:document.activeElement}),i.hidden=!1,i.style.zIndex=30+Vi.length,Hu(),i.focus({preventScroll:!0}))},i.close=()=>{if(!i.open)return;let e=Vi.findIndex(r=>r.panel===i);if(e<0)return;let t=e===Vi.length-1,[{from:n}]=Vi.splice(e,1);i.hidden=!0,Hu(),t&&n instanceof HTMLElement&&!n.closest("[hidden], [inert]")&&n.focus({preventScroll:!0}),i.dispatchEvent(new Event("close"))};window.addEventListener("keydown",i=>{let e=Vi.at(-1)?.panel;if(e){if(i.code==="Escape"&&e.id!=="race")i.preventDefault(),e.dispatchEvent(new Event("cancel",{cancelable:!0}))&&e.close();else if(i.code==="Tab"){let t=Array.from(e.querySelectorAll(Mm)).filter(s=>!s.closest("[hidden], [inert]"));if(!t.length){i.preventDefault();return}let n=t[0],r=t.at(-1);i.shiftKey&&(document.activeElement===n||document.activeElement===e)?(i.preventDefault(),r.focus()):!i.shiftKey&&(document.activeElement===r||document.activeElement===e)&&(i.preventDefault(),n.focus())}}});/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Td=0,Jc=1,Ed=2;var $c=1,Ad=2,On=3,es=0,Xt=1,Nt=2,Ii=0,tr=1,Bn=2,Qc=3,eh=4,Rd=5,ts=100,Cd=101,Id=102,Pd=103,Ld=104,Dd=200,Ud=201,Nd=202,Fd=203,Od=204,Bd=205,kd=206,zd=207,Gd=208,Hd=209,Vd=210,Wd=211,jd=212,Xd=213,qd=214,ol=0,ll=1,cl=2,ua=3,hl=4,ul=5,dl=6,pl=7,Yd=0,Zd=1,Kd=2,li=0,Jd=1,$d=2,Qd=3,ns=4,ep=5,tp=6,np=7;var th=300,is=301,nr=302,rs=303,fl=304,da=306,Fr=1e3,Or=1001,xo=1002,Nn=1003,ip=1004;var pa=1005;var tn=1006,ml=1007;var ir=1008;var kn=1009,nh=1010,ih=1011,ss=1012,gl=1013,rr=1014,Tn=1015,Pi=1016,vl=1017,yl=1018,as=1020,rh=35902,sh=35899,rp=1021,sp=1022,an=1023,fa=1026,ma=1027,_l=1028,xl=1029,ap=1030,ah=1031;var oh=1033,Ml=33776,bl=33777,Sl=33778,wl=33779,lh=35840,ch=35841,hh=35842,uh=35843,dh=36196,ph=37492,fh=37496,mh=37808,gh=37809,vh=37810,yh=37811,_h=37812,xh=37813,Mh=37814,bh=37815,Sh=37816,wh=37817,Th=37818,Eh=37819,Ah=37820,Rh=37821,Ch=36492,Ih=36494,Ph=36495,Lh=36283,Dh=36284,Uh=36285,Nh=36286;var Ls=2300,Mo=2301,yo=2302,Gc=2400,Hc=2401,Vc=2402;var op=3201;var lp=0,cp=1,sr="",yt="srgb",ni="srgb-linear",Ds="linear",nt="srgb";var Yi=7680;var hp=512,up=513,dp=514,Fh=515,pp=516,fp=517,mp=518,gp=519,bo=35044,Oh=35048;var Bh="300 es",ii=2e3,Us=2001;var ri=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var _o=Math.PI/180,So=180/Math.PI;function ei(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(zt[255&i]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]+"-"+zt[255&e]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[63&t|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[255&n]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]).toLowerCase()}function Oe(i,e,t){return Math.max(e,Math.min(t,i))}function bm(i,e){return(i%e+e)%e}function uc(i,e,t){return(1-t)*i+t*e}function Ln(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function it(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}var ie=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},wn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],p=s[a+1],m=s[a+2],y=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=d);if(o===1)return e[t+0]=u,e[t+1]=p,e[t+2]=m,void(e[t+3]=y);if(d!==y||l!==u||c!==p||h!==m){let f=1-o,g=l*u+c*p+h*m+d*y,v=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){let S=Math.sqrt(_),M=Math.atan2(S,g*v);f=Math.sin(f*M)/S,o=Math.sin(o*M)/S}let x=o*v;if(l=l*f+u*x,c=c*f+p*x,h=h*f+m*x,d=d*f+y*x,f===1-o){let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],u=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+h*d+l*p-c*u,e[t+1]=l*m+h*u+c*d-o*p,e[t+2]=c*m+h*p+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),u=l(n/2),p=l(r/2),m=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"YXZ":this._x=u*h*d+c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"ZXY":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d-u*p*m;break;case"ZYX":this._x=u*h*d-c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d+u*p*m;break;case"YZX":this._x=u*h*d+c*p*m,this._y=c*p*d+u*h*m,this._z=c*h*m-u*p*d,this._w=c*h*d-u*p*m;break;case"XZY":this._x=u*h*d-c*p*m,this._y=c*p*d-u*h*m,this._z=c*h*m+u*p*d,this._w=c*h*d+u*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>d){let p=2*Math.sqrt(1+n-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-n-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Oe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=r*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Oe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},dc=new D,Wu=new wn,Ue=class i{constructor(e,t,n,r,s,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],m=n[8],y=r[0],f=r[3],g=r[6],v=r[1],_=r[4],x=r[7],S=r[2],M=r[5],w=r[8];return s[0]=a*y+o*v+l*S,s[3]=a*f+o*_+l*M,s[6]=a*g+o*x+l*w,s[1]=c*y+h*v+d*S,s[4]=c*f+h*_+d*M,s[7]=c*g+h*x+d*w,s[2]=u*y+p*v+m*S,s[5]=u*f+p*_+m*M,s[8]=u*g+p*x+m*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,p=c*s-a*l,m=t*d+n*u+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(r*c-h*n)*y,e[2]=(o*n-r*a)*y,e[3]=u*y,e[4]=(h*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=p*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pc.makeScale(e,t)),this}rotate(e){return this.premultiply(pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},pc=new Ue;function kh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ns(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vp(){let i=Ns("canvas");return i.style.display="block",i}var ju={};function Br(i){i in ju||(ju[i]=!0,console.warn(i))}function yp(i,e,t){return new Promise(function(n,r){setTimeout(function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}},t)})}var Xu=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sm(){let i={enabled:!0,workingColorSpace:ni,spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a&&(this.spaces[s].transfer===nt&&(r.r=ti(r.r),r.g=ti(r.g),r.b=ti(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(r.r=Nr(r.r),r.g=Nr(r.g),r.b=Nr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Ds:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Br("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Br("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ni]:{primaries:e,whitePoint:n,transfer:Ds,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}var et=Sm();function ti(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Nr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var _r,wo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_r===void 0&&(_r=Ns("canvas")),_r.width=e.width,_r.height=e.height;let r=_r.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=_r}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ns("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=255*ti(s[a]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ti(t[n]/255)):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},wm=0,kr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(fc(r[a].image)):s.push(fc(r[a]))}else s=fc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function fc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tm=0,mc=new D,jt=class i extends ri{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=ei(),this.name="",this.source=new kr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n:console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==th)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fr:e.x=e.x-Math.floor(e.x);break;case Or:e.x=e.x<0?0:1;break;case xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Fr:e.y=e.y-Math.floor(e.y);break;case Or:e.y=e.y<0?0:1;break;case xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jt.DEFAULT_IMAGE=null,jt.DEFAULT_MAPPING=th,jt.DEFAULT_ANISOTROPY=1;var lt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],m=l[9],y=l[2],f=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+f)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,x=(p+1)/2,S=(g+1)/2,M=(h+u)/4,w=(d+y)/4,A=(m+f)/4;return _>x&&_>S?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=M/n,s=w/n):x>S?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=M/r,s=A/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=w/s,r=A/s),this.set(n,r,s,t),this}let v=Math.sqrt((f-m)*(f-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(f-m)/v,this.y=(d-y)/v,this.z=(u-h)/v,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Oe(this.x,e.x,t.x),this.y=Oe(this.y,e.y,t.y),this.z=Oe(this.z,e.z,t.z),this.w=Oe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Oe(this.x,e,t),this.y=Oe(this.y,e,t),this.z=Oe(this.z,e,t),this.w=Oe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Oe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},To=class extends ri{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new jt(r);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new kr(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fn=class extends To{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Fs=class extends jt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eo=class extends jt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var un=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(s,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ka.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ka.copy(n.boundingBox)),ka.applyMatrix4(e.matrixWorld),this.union(ka)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_s),za.subVectors(this.max,_s),xr.subVectors(e.a,_s),Mr.subVectors(e.b,_s),br.subVectors(e.c,_s),_i.subVectors(Mr,xr),xi.subVectors(br,Mr),Wi.subVectors(xr,br);let t=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Wi.z,Wi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Wi.z,0,-Wi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Wi.y,Wi.x,0];return!!gc(t,xr,Mr,br,za)&&(t=[1,0,0,0,1,0,0,0,1],!!gc(t,xr,Mr,br,za)&&(Ga.crossVectors(_i,xi),t=[Ga.x,Ga.y,Ga.z],gc(t,xr,Mr,br,za)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Mn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Yn=[new D,new D,new D,new D,new D,new D,new D,new D],Mn=new D,ka=new un,xr=new D,Mr=new D,br=new D,_i=new D,xi=new D,Wi=new D,_s=new D,za=new D,Ga=new D,ji=new D;function gc(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ji.fromArray(i,s);let o=r.x*Math.abs(ji.x)+r.y*Math.abs(ji.y)+r.z*Math.abs(ji.z),l=e.dot(ji),c=t.dot(ji),h=n.dot(ji);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Em=new un,xs=new D,vc=new D,dn=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Em.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xs.subVectors(e,this.center);let t=xs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(xs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xs.copy(e.center).add(vc)),this.expandByPoint(xs.copy(e.center).sub(vc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Zn=new D,yc=new D,Ha=new D,Mi=new D,_c=new D,Va=new D,xc=new D,Zi=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){yc.copy(e).add(t).multiplyScalar(.5),Ha.copy(t).sub(e).normalize(),Mi.copy(this.origin).sub(yc);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ha),o=Mi.dot(this.direction),l=-Mi.dot(Ha),c=Mi.lengthSq(),h=Math.abs(1-a*a),d,u,p,m;if(h>0)if(d=a*l-o,u=a*o-l,m=s*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(yc).addScaledVector(Ha,u),p}intersectSphere(e,t){Zn.subVectors(e.center,this.origin);let n=Zn.dot(this.direction),r=Zn.dot(Zn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r?null:((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,n,r,s){_c.subVectors(t,e),Va.subVectors(n,e),xc.crossVectors(_c,Va);let a,o=this.direction.dot(xc);if(o>0){if(r)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}Mi.subVectors(this.origin,e);let l=a*this.direction.dot(Va.crossVectors(Mi,Va));if(l<0)return null;let c=a*this.direction.dot(_c.cross(Mi));if(c<0||l+c>o)return null;let h=-a*Mi.dot(xc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fe=class i{constructor(e,t,n,r,s,a,o,l,c,h,d,u,p,m,y,f){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,u,p,m,y,f)}set(e,t,n,r,s,a,o,l,c,h,d,u,p,m,y,f){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=p,g[7]=m,g[11]=y,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Sr.setFromMatrixColumn(e,0).length(),s=1/Sr.setFromMatrixColumn(e,1).length(),a=1/Sr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=a*h,p=a*d,m=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+m*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=m+p*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,p=l*d,m=c*h,y=c*d;t[0]=u+y*o,t[4]=m*o-p,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,p=l*d,m=c*h,y=c*d;t[0]=u-y*o,t[4]=-a*d,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,p=a*d,m=o*h,y=o*d;t[0]=l*h,t[4]=m*c-p,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=p*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,p=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=y-u*d,t[8]=m*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*d+m,t[10]=u-y*d}else if(e.order==="XZY"){let u=a*l,p=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=a*h,t[9]=p*d-m,t[2]=m*d-p,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Am,e,Rm)}lookAt(e,t,n){let r=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),bi.crossVectors(n,$t),bi.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),bi.crossVectors(n,$t)),bi.normalize(),Wa.crossVectors($t,bi),r[0]=bi.x,r[4]=Wa.x,r[8]=$t.x,r[1]=bi.y,r[5]=Wa.y,r[9]=$t.y,r[2]=bi.z,r[6]=Wa.z,r[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],m=n[2],y=n[6],f=n[10],g=n[14],v=n[3],_=n[7],x=n[11],S=n[15],M=r[0],w=r[4],A=r[8],T=r[12],C=r[1],P=r[5],U=r[9],O=r[13],N=r[2],H=r[6],V=r[10],K=r[14],Y=r[3],re=r[7],ce=r[11],ue=r[15];return s[0]=a*M+o*C+l*N+c*Y,s[4]=a*w+o*P+l*H+c*re,s[8]=a*A+o*U+l*V+c*ce,s[12]=a*T+o*O+l*K+c*ue,s[1]=h*M+d*C+u*N+p*Y,s[5]=h*w+d*P+u*H+p*re,s[9]=h*A+d*U+u*V+p*ce,s[13]=h*T+d*O+u*K+p*ue,s[2]=m*M+y*C+f*N+g*Y,s[6]=m*w+y*P+f*H+g*re,s[10]=m*A+y*U+f*V+g*ce,s[14]=m*T+y*O+f*K+g*ue,s[3]=v*M+_*C+x*N+S*Y,s[7]=v*w+_*P+x*H+S*re,s[11]=v*A+_*U+x*V+S*ce,s[15]=v*T+_*O+x*K+S*ue,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14];return e[3]*(+s*l*d-r*c*d-s*o*u+n*c*u+r*o*p-n*l*p)+e[7]*(+t*l*p-t*c*u+s*a*u-r*a*p+r*c*h-s*l*h)+e[11]*(+t*c*d-t*o*p-s*a*d+n*a*p+s*o*h-n*c*h)+e[15]*(-r*o*h-t*l*d+t*o*u+r*a*d-n*a*u+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],m=e[12],y=e[13],f=e[14],g=e[15],v=d*f*c-y*u*c+y*l*p-o*f*p-d*l*g+o*u*g,_=m*u*c-h*f*c-m*l*p+a*f*p+h*l*g-a*u*g,x=h*y*c-m*d*c+m*o*p-a*y*p-h*o*g+a*d*g,S=m*d*l-h*y*l-m*o*u+a*y*u+h*o*f-a*d*f,M=t*v+n*_+r*x+s*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/M;return e[0]=v*w,e[1]=(y*u*s-d*f*s-y*r*p+n*f*p+d*r*g-n*u*g)*w,e[2]=(o*f*s-y*l*s+y*r*c-n*f*c-o*r*g+n*l*g)*w,e[3]=(d*l*s-o*u*s-d*r*c+n*u*c+o*r*p-n*l*p)*w,e[4]=_*w,e[5]=(h*f*s-m*u*s+m*r*p-t*f*p-h*r*g+t*u*g)*w,e[6]=(m*l*s-a*f*s-m*r*c+t*f*c+a*r*g-t*l*g)*w,e[7]=(a*u*s-h*l*s+h*r*c-t*u*c-a*r*p+t*l*p)*w,e[8]=x*w,e[9]=(m*d*s-h*y*s-m*n*p+t*y*p+h*n*g-t*d*g)*w,e[10]=(a*y*s-m*o*s+m*n*c-t*y*c-a*n*g+t*o*g)*w,e[11]=(h*o*s-a*d*s-h*n*c+t*d*c+a*n*p-t*o*p)*w,e[12]=S*w,e[13]=(h*y*r-m*d*r+m*n*u-t*y*u-h*n*f+t*d*f)*w,e[14]=(m*o*r-a*y*r-m*n*l+t*y*l+a*n*f-t*o*f)*w,e[15]=(a*d*r-h*o*r+h*n*l-t*d*l-a*n*u+t*o*u)*w,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,p=s*h,m=s*d,y=a*h,f=a*d,g=o*d,v=l*c,_=l*h,x=l*d,S=n.x,M=n.y,w=n.z;return r[0]=(1-(y+g))*S,r[1]=(p+x)*S,r[2]=(m-_)*S,r[3]=0,r[4]=(p-x)*M,r[5]=(1-(u+g))*M,r[6]=(f+v)*M,r[7]=0,r[8]=(m+_)*w,r[9]=(f-v)*w,r[10]=(1-(u+y))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Sr.set(r[0],r[1],r[2]).length(),a=Sr.set(r[4],r[5],r[6]).length(),o=Sr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],bn.copy(this);let l=1/s,c=1/a,h=1/o;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=c,bn.elements[5]*=c,bn.elements[6]*=c,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,t.setFromRotationMatrix(bn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r),m,y;if(l)m=s/(a-s),y=a*s/(a-s);else if(o===ii)m=-(a+s)/(a-s),y=-2*a*s/(a-s);else{if(o!==Us)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);m=-a/(a-s),y=-a*s/(a-s)}return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=2e3,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r),m,y;if(l)m=1/(a-s),y=a/(a-s);else if(o===ii)m=-2/(a-s),y=-(a+s)/(a-s);else{if(o!==Us)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);m=-1/(a-s),y=-s/(a-s)}return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Sr=new D,bn=new Fe,Am=new D(0,0,0),Rm=new D(1,1,1),bi=new D,Wa=new D,$t=new D,Yu=new Fe,Zu=new wn,nn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zu.setFromEuler(this),this.setFromQuaternion(Zu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};nn.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Cm=0,Ku=new D,wr=new wn,Kn=new Fe,ja=new D,Ms=new D,Im=new D,Pm=new wn,Ju=new D(1,0,0),$u=new D(0,1,0),Qu=new D(0,0,1),ed={type:"added"},Lm={type:"removed"},Tr={type:"childadded",child:null},Mc={type:"childremoved",child:null},Mt=class i extends ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new nn,n=new wn,r=new D(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ue}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return wr.setFromAxisAngle(e,t),this.quaternion.multiply(wr),this}rotateOnWorldAxis(e,t){return wr.setFromAxisAngle(e,t),this.quaternion.premultiply(wr),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis($u,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis($u,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ja.copy(e):ja.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ms,ja,this.up):Kn.lookAt(ja,Ms,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),wr.setFromRotationMatrix(Kn),this.quaternion.premultiply(wr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lm),Mc.child=e,this.dispatchEvent(Mc),Mc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),Tr.child=e,this.dispatchEvent(Tr),Tr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,Im),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,Pm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Mt.DEFAULT_UP=new D(0,1,0),Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Sn=new D,Jn=new D,bc=new D,$n=new D,Er=new D,Ar=new D,td=new D,Sc=new D,wc=new D,Tc=new D,Ec=new lt,Ac=new lt,Rc=new lt,Dn=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Sn.subVectors(e,t),r.cross(Sn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Sn.subVectors(r,t),Jn.subVectors(n,t),bc.subVectors(e,t);let a=Sn.dot(Sn),o=Sn.dot(Jn),l=Sn.dot(bc),c=Jn.dot(Jn),h=Jn.dot(bc),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,p=(c*l-o*h)*u,m=(a*h-o*l)*u;return s.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,$n)!==null&&$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ec.setScalar(0),Ac.setScalar(0),Rc.setScalar(0),Ec.fromBufferAttribute(e,t),Ac.fromBufferAttribute(e,n),Rc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ec,s.x),a.addScaledVector(Ac,s.y),a.addScaledVector(Rc,s.z),a}static isFrontFacing(e,t,n,r){return Sn.subVectors(n,t),Jn.subVectors(e,t),Sn.cross(Jn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),.5*Sn.cross(Jn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;Er.subVectors(r,n),Ar.subVectors(s,n),Sc.subVectors(e,n);let l=Er.dot(Sc),c=Ar.dot(Sc);if(l<=0&&c<=0)return t.copy(n);wc.subVectors(e,r);let h=Er.dot(wc),d=Ar.dot(wc);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Er,a);Tc.subVectors(e,s);let p=Er.dot(Tc),m=Ar.dot(Tc);if(m>=0&&p<=m)return t.copy(s);let y=p*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(Ar,o);let f=h*m-p*d;if(f<=0&&d-h>=0&&p-m>=0)return td.subVectors(s,r),o=(d-h)/(d-h+(p-m)),t.copy(r).addScaledVector(td,o);let g=1/(f+y+u);return a=y*g,o=u*g,t.copy(n).addScaledVector(Er,a).addScaledVector(Ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},_p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function Cc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=et.workingColorSpace){if(e=bm(e,1),t=Oe(t,0,1),n=Oe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Cc(a,s,e+1/3),this.g=Cc(a,s,e),this.b=Cc(a,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=_p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return et.workingToColorSpace(Gt.copy(this),e),65536*Math.round(Oe(255*Gt.r,0,255))+256*Math.round(Oe(255*Gt.g,0,255))+Math.round(Oe(255*Gt.b,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Gt.copy(this),t);let n=Gt.r,r=Gt.g,s=Gt.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=yt){et.workingToColorSpace(Gt.copy(this),e);let t=Gt.r,n=Gt.g,r=Gt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Xa);let n=uc(Si.h,Xa.h,t),r=uc(Si.s,Xa.s,t),s=uc(Si.l,Xa.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gt=new fe;fe.NAMES=_p;var Dm=0,rn=class extends ri{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ct=class extends rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Qn=Um();function Um(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function Nm(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=Oe(i,-65504,65504),Qn.floatView[0]=i;let e=Qn.uint32View[0],t=e>>23&511;return Qn.baseTable[t]+((8388607&e)>>Qn.shiftTable[t])}function Fm(i){let e=i>>10;return Qn.uint32View[0]=Qn.mantissaTable[Qn.offsetTable[e]+(1023&i)]+Qn.exponentTable[e],Qn.floatView[0]}var Bs=class{static toHalfFloat(e){return Nm(e)}static fromHalfFloat(e){return Fm(e)}},wt=new D,qa=new ie,Om=0,_t=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Om++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bo,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qa.fromBufferAttribute(this,t),qa.applyMatrix3(e),this.setXY(t,qa.x,qa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bo&&(e.usage=this.usage),e}};var ks=class extends _t{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var zs=class extends _t{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ve=class extends _t{constructor(e,t,n){super(new Float32Array(e),t,n)}},Bm=0,hn=new Fe,Ic=new Mt,Rr=new D,Qt=new un,bs=new un,Ct=new D,Be=class i extends ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bm++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kh(e)?zs:ks)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ue().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Ic.lookAt(e),Ic.updateMatrix(),this.applyMatrix4(Ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ve(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new D,1/0);if(e){let n=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];bs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(Qt.min,bs.min),Qt.expandByPoint(Ct),Ct.addVectors(Qt.max,bs.max),Qt.expandByPoint(Ct)):(Qt.expandByPoint(bs.min),Qt.expandByPoint(bs.max))}Qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ct.fromBufferAttribute(o,c),l&&(Rr.fromBufferAttribute(e,c),Ct.add(Rr)),r=Math.max(r,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _t(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new D,l[A]=new D;let c=new D,h=new D,d=new D,u=new ie,p=new ie,m=new ie,y=new D,f=new D;function g(A,T,C){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,C),u.fromBufferAttribute(s,A),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,C),h.sub(c),d.sub(c),p.sub(u),m.sub(u);let P=1/(p.x*m.y-m.x*p.y);isFinite(P)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(P),f.copy(d).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(P),o[A].add(y),o[T].add(y),o[C].add(y),l[A].add(f),l[T].add(f),l[C].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let A=0,T=v.length;A<T;++A){let C=v[A],P=C.start;for(let U=P,O=P+C.count;U<O;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let _=new D,x=new D,S=new D,M=new D;function w(A){S.fromBufferAttribute(r,A),M.copy(S);let T=o[A];_.copy(T),_.sub(S.multiplyScalar(S.dot(T))).normalize(),x.crossVectors(M,T);let C=x.dot(l[A])<0?-1:1;a.setXYZW(A,_.x,_.y,_.z,C)}for(let A=0,T=v.length;A<T;++A){let C=v[A],P=C.start;for(let U=P,O=P+C.count;U<O;U+=3)w(e.getX(U+0)),w(e.getX(U+1)),w(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _t(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);let r=new D,s=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(e)for(let u=0,p=e.count;u<p;u+=3){let m=e.getX(u+0),y=e.getX(u+1),f=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,f),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),p=0,m=0;for(let y=0,f=l.length;y<f;y++){p=o.isInterleavedBufferAttribute?l[y]*o.data.stride+o.offset:l[y]*h;for(let g=0;g<h;g++)u[m++]=c[p++]}return new _t(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=e(c[h],n);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nd=new Fe,Xi=new Zi,Ya=new dn,id=new D,Za=new D,Ka=new D,Ja=new D,Pc=new D,$a=new D,rd=new D,Qa=new D,Ie=class extends Mt{constructor(e=new Be,t=new ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){$a.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(Pc.fromBufferAttribute(d,e),a?$a.addScaledVector(Pc,h):$a.addScaledVector(Pc.sub(t),h))}t.add($a)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ya.copy(n.boundingSphere),Ya.applyMatrix4(s),Xi.copy(e.ray).recast(e.near),Ya.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Ya,id)===null||Xi.origin.distanceToSquared(id)>(e.far-e.near)**2))return;nd.copy(s).invert(),Xi.copy(e.ray).applyMatrix4(nd),n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Xi)}}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let f=u[m],g=a[f.materialIndex];for(let v=Math.max(f.start,p.start),_=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));v<_;v+=3)r=eo(this,g,e,n,c,h,d,o.getX(v),o.getX(v+1),o.getX(v+2)),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=f.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);m<y;m+=3)r=eo(this,a,e,n,c,h,d,o.getX(m),o.getX(m+1),o.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let f=u[m],g=a[f.materialIndex];for(let v=Math.max(f.start,p.start),_=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));v<_;v+=3)r=eo(this,g,e,n,c,h,d,v,v+1,v+2),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=f.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);m<y;m+=3)r=eo(this,a,e,n,c,h,d,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}};function eo(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Za),i.getVertexPosition(l,Ka),i.getVertexPosition(c,Ja);let h=(function(d,u,p,m,y,f,g,v){let _;if(_=u.side===1?m.intersectTriangle(g,f,y,!0,v):m.intersectTriangle(y,f,g,u.side===0,v),_===null)return null;Qa.copy(v),Qa.applyMatrix4(d.matrixWorld);let x=p.ray.origin.distanceTo(Qa);return x<p.near||x>p.far?null:{distance:x,point:Qa.clone(),object:d}})(i,e,t,n,Za,Ka,Ja,rd);if(h){let d=new D;Dn.getBarycoord(rd,Za,Ka,Ja,d),r&&(h.uv=Dn.getInterpolatedAttribute(r,o,l,c,d,new ie)),s&&(h.uv1=Dn.getInterpolatedAttribute(s,o,l,c,d,new ie)),a&&(h.normal=Dn.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new D,materialIndex:0};Dn.getNormal(Za,Ka,Ja,u.normal),h.face=u,h.barycoord=d}return h}var Ke=class i extends Be{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,p=0;function m(y,f,g,v,_,x,S,M,w,A,T){let C=x/w,P=S/A,U=x/2,O=S/2,N=M/2,H=w+1,V=A+1,K=0,Y=0,re=new D;for(let ce=0;ce<V;ce++){let ue=ce*P-O;for(let ge=0;ge<H;ge++){let Q=ge*C-U;re[y]=Q*v,re[f]=ue*_,re[g]=N,c.push(re.x,re.y,re.z),re[y]=0,re[f]=0,re[g]=M>0?1:-1,h.push(re.x,re.y,re.z),d.push(ge/w),d.push(1-ce/A),K+=1}}for(let ce=0;ce<A;ce++)for(let ue=0;ue<w;ue++){let ge=u+ue+H*ce,Q=u+ue+H*(ce+1),ae=u+(ue+1)+H*(ce+1),te=u+(ue+1)+H*ce;l.push(ge,Q,te),l.push(Q,ae,te),Y+=6}o.addGroup(p,Y,T),p+=Y,u+=K}m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ar(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ht(i){let e={};for(let t=0;t<i.length;t++){let n=ar(i[t]);for(let r in n)e[r]=n[r]}return e}function zh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}var Tl={clone:ar,merge:Ht},Pt=class extends rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ar(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},zr=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},wi=new D,sd=new ie,ad=new ie,It=class extends zr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*So*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*_o*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*So*Math.atan(Math.tan(.5*_o*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,sd,ad),t.subVectors(ad,sd)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*_o*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Cr=-90,Ao=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new It(Cr,1,e,t);r.layers=this.layers,this.add(r);let s=new It(Cr,1,e,t);s.layers=this.layers,this.add(s);let a=new It(Cr,1,e,t);a.layers=this.layers,this.add(a);let o=new It(Cr,1,e,t);o.layers=this.layers,this.add(o);let l=new It(Cr,1,e,t);l.layers=this.layers,this.add(l);let c=new It(Cr,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===ii)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==Us)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Gs=class extends jt{constructor(e=[],t=301,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ro=class extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Gs(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ke(5,5,5),s=new Pt({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new Ie(r,s),o=t.minFilter;return t.minFilter===ir&&(t.minFilter=tn),new Ao(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}},xt=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},km={type:"move"},Gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let f=t.getJointPose(y,n),g=this._getHandJoint(c,y);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&u>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(km)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new xt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Hs=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new fe(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var si=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Co=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=bo,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Wt=new D,Vs=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),n=it(n,this.array),r=it(r,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new _t(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Hr=class extends rn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ir,Ss=new D,Pr=new D,Lr=new D,Dr=new ie,ws=new ie,xp=new Fe,to=new D,Ts=new D,no=new D,od=new ie,Lc=new ie,ld=new ie,Ws=class extends Mt{constructor(e=new Hr){if(super(),this.isSprite=!0,this.type="Sprite",Ir===void 0){Ir=new Be;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Co(t,5);Ir.setIndex([0,1,2,0,2,3]),Ir.setAttribute("position",new Vs(n,3,0,!1)),Ir.setAttribute("uv",new Vs(n,2,3,!1))}this.geometry=Ir,this.material=e,this.center=new ie(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pr.setFromMatrixScale(this.matrixWorld),xp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Lr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pr.multiplyScalar(-Lr.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;io(to.set(-.5,-.5,0),Lr,a,Pr,r,s),io(Ts.set(.5,-.5,0),Lr,a,Pr,r,s),io(no.set(.5,.5,0),Lr,a,Pr,r,s),od.set(0,0),Lc.set(1,0),ld.set(1,1);let o=e.ray.intersectTriangle(to,Ts,no,!1,Ss);if(o===null&&(io(Ts.set(-.5,.5,0),Lr,a,Pr,r,s),Lc.set(0,1),o=e.ray.intersectTriangle(to,no,Ts,!1,Ss),o===null))return;let l=e.ray.origin.distanceTo(Ss);l<e.near||l>e.far||t.push({distance:l,point:Ss.clone(),uv:Dn.getInterpolation(Ss,to,Ts,no,od,Lc,ld,new ie),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function io(i,e,t,n,r,s){Dr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(ws.x=s*Dr.x-r*Dr.y,ws.y=r*Dr.x+s*Dr.y):ws.copy(Dr),i.copy(e),i.x+=ws.x,i.y+=ws.y,i.applyMatrix4(xp)}var $1=new D,Q1=new D;var ev=new D,tv=new lt,nv=new lt,iv=new D,rv=new Fe,sv=new D,av=new dn,ov=new Fe,lv=new Zi;var Vr=class extends jt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=1003,h=1003,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},cv=new Fe,hv=new Fe;var js=class extends _t{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ur=new Fe,cd=new Fe,ro=[],hd=new un,zm=new Fe,Es=new Ie,As=new dn,Xs=class extends Ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new js(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,zm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new un),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ur),hd.copy(e.boundingBox).applyMatrix4(Ur),this.boundingBox.union(hd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ur),As.copy(e.boundingSphere).applyMatrix4(Ur),this.boundingSphere.union(As)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=r[s+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),e.ray.intersectsSphere(As)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ur),cd.multiplyMatrices(n,Ur),Es.matrixWorld=cd,Es.raycast(e,ro);for(let a=0,o=ro.length;a<o;a++){let l=ro[a];l.instanceId=s,l.object=this,t.push(l)}ro.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new js(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vr(new Float32Array(r*this.count),r,this.count,_l,Tn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Dc=new D,Gm=new D,Hm=new Ue,Pn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Dc.subVectors(n,t).cross(Gm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Dc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Hm.getNormalMatrix(e),r=this.coplanarPoint(Dc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qi=new dn,Vm=new ie(.5,.5),so=new D,Ai=class{constructor(e=new Pn,t=new Pn,n=new Pn,r=new Pn,s=new Pn,a=new Pn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],p=s[7],m=s[8],y=s[9],f=s[10],g=s[11],v=s[12],_=s[13],x=s[14],S=s[15];if(r[0].setComponents(c-a,p-h,g-m,S-v).normalize(),r[1].setComponents(c+a,p+h,g+m,S+v).normalize(),r[2].setComponents(c+o,p+d,g+y,S+_).normalize(),r[3].setComponents(c-o,p-d,g-y,S-_).normalize(),n)r[4].setComponents(l,u,f,x).normalize(),r[5].setComponents(c-l,p-u,g-f,S-x).normalize();else if(r[4].setComponents(c-l,p-u,g-f,S-x).normalize(),t===ii)r[5].setComponents(c+l,p+u,g+f,S+x).normalize();else{if(t!==Us)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);r[5].setComponents(l,u,f,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(e){qi.center.set(0,0,0);let t=Vm.distanceTo(e.center);return qi.radius=.7071067811865476+t,qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(so.x=r.normal.x>0?e.max.x:e.min.x,so.y=r.normal.y>0?e.max.y:e.min.y,so.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(so)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Cn=new Fe,In=new Ai,Io=class i{constructor(){this.coordinateSystem=ii}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(Cn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),In.setFromProjectionMatrix(Cn,r.coordinateSystem,r.reversedDepth),In.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(Cn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),In.setFromProjectionMatrix(Cn,r.coordinateSystem,r.reversedDepth),In.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(Cn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),In.setFromProjectionMatrix(Cn,r.coordinateSystem,r.reversedDepth),In.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(Cn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),In.setFromProjectionMatrix(Cn,r.coordinateSystem,r.reversedDepth),In.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let r=t.cameras[n];if(Cn.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),In.setFromProjectionMatrix(Cn,r.coordinateSystem,r.reversedDepth),In.containsPoint(e))return!0}return!1}clone(){return new i}};var Wc=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},uv=new Fe,dv=new fe(1,1,1),pv=new Ai,fv=new Io,mv=new un,gv=new dn,vv=new D,yv=new D,_v=new D,xv=new Wc,Mv=new Ie;var Wr=class extends rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Po=new D,Lo=new D,ud=new Fe,Rs=new Zi,ao=new dn,Uc=new D,dd=new D,Do=class extends Mt{constructor(e=new Be,t=new Wr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Po.fromBufferAttribute(t,r-1),Lo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Po.distanceTo(Lo);e.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(r),ao.radius+=s,e.ray.intersectsSphere(ao)===!1)return;ud.copy(r).invert(),Rs.copy(e.ray).applyMatrix4(ud);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let m=u,y=p-1;m<y;m+=c){let f=h.getX(m),g=h.getX(m+1),v=oo(this,e,Rs,l,f,g,m);v&&t.push(v)}if(this.isLineLoop){let m=h.getX(p-1),y=h.getX(u),f=oo(this,e,Rs,l,m,y,p-1);f&&t.push(f)}}else{let u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let m=u,y=p-1;m<y;m+=c){let f=oo(this,e,Rs,l,m,m+1,m);f&&t.push(f)}if(this.isLineLoop){let m=oo(this,e,Rs,l,p-1,u,p-1);m&&t.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function oo(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(Po.fromBufferAttribute(o,r),Lo.fromBufferAttribute(o,s),t.distanceSqToSegment(Po,Lo,Uc,dd)>n)return;Uc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Uc);return l<e.near||l>e.far?void 0:{distance:l,point:dd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var pd=new D,fd=new D,qs=class extends Do{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)pd.fromBufferAttribute(t,r),fd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+pd.distanceTo(fd);e.setAttribute("lineDistance",new ve(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Uo=class extends rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},md=new Fe,jc=new Zi,lo=new dn,co=new D,Ys=class extends Mt{constructor(e=new Be,t=new Uo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(r),lo.radius+=s,e.ray.intersectsSphere(lo)===!1)return;md.copy(r).invert(),jc.copy(e.ray).applyMatrix4(md);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let d=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);d<u;d++){let p=c.getX(d);co.fromBufferAttribute(h,p),gd(co,p,l,r,e,t,this)}else for(let d=Math.max(0,a.start),u=Math.min(h.count,a.start+a.count);d<u;d++)co.fromBufferAttribute(h,d),gd(co,d,l,r,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=n.length;r<s;r++){let a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function gd(i,e,t,n,r,s,a){let o=jc.distanceSqToPoint(i);if(o<t){let l=new D;jc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var pn=class extends jt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Zs=class extends jt{constructor(e,t,n=1014,r,s,a,o=1003,l=1003,c,h=1026,d=1){if(h!==fa&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:d},r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ks=class extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},No=class i extends Be{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,p=2*d+u,m=2*n+s,y=r+1,f=new D,g=new D;for(let v=0;v<=m;v++){let _=0,x=0,S=0,M=0;if(v<=n){let T=v/n,C=T*Math.PI/2;x=-h-e*Math.cos(C),S=e*Math.sin(C),M=-e*Math.cos(C),_=T*d}else if(v<=n+s){let T=(v-n)/s;x=T*t-h,S=e,M=0,_=d+T*u}else{let T=(v-n-s)/n,C=T*Math.PI/2;x=h+e*Math.sin(C),S=e*Math.cos(C),M=e*Math.sin(C),_=d+u+T*d}let w=Math.max(0,Math.min(1,_/p)),A=0;v===0?A=.5/r:v===m&&(A=-.5/r);for(let T=0;T<=r;T++){let C=T/r,P=C*Math.PI*2,U=Math.sin(P),O=Math.cos(P);g.x=-S*O,g.y=x,g.z=S*U,o.push(g.x,g.y,g.z),f.set(-S*O,M,S*U),f.normalize(),l.push(f.x,f.y,f.z),c.push(C+A,w)}if(v>0){let T=(v-1)*y;for(let C=0;C<r;C++){let P=T+C,U=T+C+1,O=v*y+C,N=v*y+C+1;a.push(P,U,O),a.push(U,N,O)}}}this.setIndex(a),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(l,3)),this.setAttribute("uv",new ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},jr=class i extends Be{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new D,h=new ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let p=n+d/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ve(a,3)),this.setAttribute("normal",new ve(o,3)),this.setAttribute("uv",new ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},fn=class i extends Be{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],p=[],m=0,y=[],f=n/2,g=0;function v(_){let x=m,S=new ie,M=new D,w=0,A=_===!0?e:t,T=_===!0?1:-1;for(let P=1;P<=r;P++)d.push(0,f*T,0),u.push(0,T,0),p.push(.5,.5),m++;let C=m;for(let P=0;P<=r;P++){let U=P/r*l+o,O=Math.cos(U),N=Math.sin(U);M.x=A*N,M.y=f*T,M.z=A*O,d.push(M.x,M.y,M.z),u.push(0,T,0),S.x=.5*O+.5,S.y=.5*N*T+.5,p.push(S.x,S.y),m++}for(let P=0;P<r;P++){let U=x+P,O=C+P;_===!0?h.push(O,O+1,U):h.push(O+1,O,U),w+=3}c.addGroup(g,w,_===!0?1:2),g+=w}(function(){let _=new D,x=new D,S=0,M=(t-e)/n;for(let w=0;w<=s;w++){let A=[],T=w/s,C=T*(t-e)+e;for(let P=0;P<=r;P++){let U=P/r,O=U*l+o,N=Math.sin(O),H=Math.cos(O);x.x=C*N,x.y=-T*n+f,x.z=C*H,d.push(x.x,x.y,x.z),_.set(N,M,H).normalize(),u.push(_.x,_.y,_.z),p.push(U,1-T),A.push(m++)}y.push(A)}for(let w=0;w<r;w++)for(let A=0;A<s;A++){let T=y[A][w],C=y[A+1][w],P=y[A+1][w+1],U=y[A][w+1];(e>0||A!==0)&&(h.push(T,C,U),S+=3),(t>0||A!==s-1)&&(h.push(C,P,U),S+=3)}c.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ve(d,3)),this.setAttribute("normal",new ve(u,3)),this.setAttribute("uv",new ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ki=class i extends fn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ri=class i extends Be{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];function o(p,m,y,f){let g=f+1,v=[];for(let _=0;_<=g;_++){v[_]=[];let x=p.clone().lerp(y,_/g),S=m.clone().lerp(y,_/g),M=g-_;for(let w=0;w<=M;w++)v[_][w]=w===0&&_===g?x:x.clone().lerp(S,w/M)}for(let _=0;_<g;_++)for(let x=0;x<2*(g-_)-1;x++){let S=Math.floor(x/2);x%2==0?(l(v[_][S+1]),l(v[_+1][S]),l(v[_][S])):(l(v[_][S+1]),l(v[_+1][S+1]),l(v[_+1][S]))}}function l(p){s.push(p.x,p.y,p.z)}function c(p,m){let y=3*p;m.x=e[y+0],m.y=e[y+1],m.z=e[y+2]}function h(p,m,y,f){f<0&&p.x===1&&(a[m]=p.x-1),y.x===0&&y.z===0&&(a[m]=f/2/Math.PI+.5)}function d(p){return Math.atan2(p.z,-p.x)}function u(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let m=new D,y=new D,f=new D;for(let g=0;g<t.length;g+=3)c(t[g+0],m),c(t[g+1],y),c(t[g+2],f),o(m,y,f,p)})(r),(function(p){let m=new D;for(let y=0;y<s.length;y+=3)m.x=s[y+0],m.y=s[y+1],m.z=s[y+2],m.normalize().multiplyScalar(p),s[y+0]=m.x,s[y+1]=m.y,s[y+2]=m.z})(n),(function(){let p=new D;for(let m=0;m<s.length;m+=3){p.x=s[m+0],p.y=s[m+1],p.z=s[m+2];let y=d(p)/2/Math.PI+.5,f=u(p)/Math.PI+.5;a.push(y,1-f)}(function(){let m=new D,y=new D,f=new D,g=new D,v=new ie,_=new ie,x=new ie;for(let S=0,M=0;S<s.length;S+=9,M+=6){m.set(s[S+0],s[S+1],s[S+2]),y.set(s[S+3],s[S+4],s[S+5]),f.set(s[S+6],s[S+7],s[S+8]),v.set(a[M+0],a[M+1]),_.set(a[M+2],a[M+3]),x.set(a[M+4],a[M+5]),g.copy(m).add(y).add(f).divideScalar(3);let w=d(g);h(v,M+0,m,w),h(_,M+2,y,w),h(x,M+4,f,w)}})(),(function(){for(let m=0;m<a.length;m+=6){let y=a[m+0],f=a[m+2],g=a[m+4],v=Math.max(y,f,g),_=Math.min(y,f,g);v>.9&&_<.1&&(y<.2&&(a[m+0]+=1),f<.2&&(a[m+2]+=1),g<.2&&(a[m+4]+=1))}})()})(),this.setAttribute("position",new ve(s,3)),this.setAttribute("normal",new ve(s.slice(),3)),this.setAttribute("uv",new ve(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},Xr=class i extends Ri{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ho=new D,uo=new D,Nc=new D,po=new Dn,Fo=class extends Be{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(_o*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},p=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:y,b:f,c:g}=po;if(y.fromBufferAttribute(o,c[0]),f.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),po.getNormal(Nc),d[0]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,d[1]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,d[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[0]!==d[1]&&d[1]!==d[2]&&d[2]!==d[0])for(let v=0;v<3;v++){let _=(v+1)%3,x=d[v],S=d[_],M=po[h[v]],w=po[h[_]],A=`${x}_${S}`,T=`${S}_${x}`;T in u&&u[T]?(Nc.dot(u[T].normal)<=s&&(p.push(M.x,M.y,M.z),p.push(w.x,w.y,w.z)),u[T]=null):A in u||(u[A]={index0:c[v],index1:c[_],normal:Nc.clone()})}}for(let m in u)if(u[m]){let{index0:y,index1:f}=u[m];ho.fromBufferAttribute(o,y),uo.fromBufferAttribute(o,f),p.push(ho.x,ho.y,ho.z),p.push(uo.x,uo.y,uo.z)}this.setAttribute("position",new ve(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-a,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===a)return r/(s-1);let h=n[r];return(r+(a-h)/(n[r+1]-h))/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ie:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,r=[],s=[],a=[],o=new D,l=new Fe;for(let p=0;p<=e;p++){let m=p/e;r[p]=this.getTangentAt(m,new D)}s[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Oe(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,m))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Oe(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),a[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},qr=class extends sn{constructor(e=0,t=0,n=1,r=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){let n=t,r=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(s=a?0:r),this.aClockwise!==!0||a||(s===r?s=-r:s-=r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*d+this.aX,c=u*d+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Oo=class extends qr{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Gh(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,r(a,o,u,p)},calc:function(s){let a=s*s;return i+e*s+t*a+n*(a*s)}}}var fo=new D,Fc=new Gh,Oc=new Gh,Bc=new Gh,Yr=class extends sn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new D){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=r[(c-1)%s]:(fo.subVectors(r[0],r[1]).add(r[0]),o=fo);let d=r[c%s],u=r[(c+1)%s];if(this.closed||c+2<s?l=r[(c+2)%s]:(fo.subVectors(r[s-1],r[s-2]).add(r[s-1]),l=fo),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,m=Math.pow(o.distanceToSquared(d),p),y=Math.pow(d.distanceToSquared(u),p),f=Math.pow(u.distanceToSquared(l),p);y<1e-4&&(y=1),m<1e-4&&(m=y),f<1e-4&&(f=y),Fc.initNonuniformCatmullRom(o.x,d.x,u.x,l.x,m,y,f),Oc.initNonuniformCatmullRom(o.y,d.y,u.y,l.y,m,y,f),Bc.initNonuniformCatmullRom(o.z,d.z,u.z,l.z,m,y,f)}else this.curveType==="catmullrom"&&(Fc.initCatmullRom(o.x,d.x,u.x,l.x,this.tension),Oc.initCatmullRom(o.y,d.y,u.y,l.y,this.tension),Bc.initCatmullRom(o.z,d.z,u.z,l.z,this.tension));return n.set(Fc.calc(h),Oc.calc(h),Bc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function vd(i,e,t,n,r){let s=.5*(n-e),a=.5*(r-t),o=i*i;return(2*t-2*n+s+a)*(i*o)+(-3*t+3*n-2*s-a)*o+s*i+t}function Is(i,e,t,n){return(function(r,s){let a=1-r;return a*a*s})(i,e)+(function(r,s){return 2*(1-r)*r*s})(i,t)+(function(r,s){return r*r*s})(i,n)}function Ps(i,e,t,n,r){return(function(s,a){let o=1-s;return o*o*o*a})(i,e)+(function(s,a){let o=1-s;return 3*o*o*s*a})(i,t)+(function(s,a){return 3*(1-s)*s*s*a})(i,n)+(function(s,a){return s*s*s*a})(i,r)}var Js=class extends sn{constructor(e=new ie,t=new ie,n=new ie,r=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ie){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ps(e,r.x,s.x,a.x,o.x),Ps(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bo=class extends sn{constructor(e=new D,t=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Ps(e,r.x,s.x,a.x,o.x),Ps(e,r.y,s.y,a.y,o.y),Ps(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$s=class extends sn{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ko=class extends sn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qs=class extends sn{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Is(e,r.x,s.x,a.x),Is(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ea=class extends sn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Is(e,r.x,s.x,a.x),Is(e,r.y,s.y,a.y),Is(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ta=class extends sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(vd(o,l.x,c.x,h.x,d.x),vd(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ie().fromArray(r))}return this}},zo=Object.freeze({__proto__:null,ArcCurve:Oo,CatmullRomCurve3:Yr,CubicBezierCurve:Js,CubicBezierCurve3:Bo,EllipseCurve:qr,LineCurve:$s,LineCurve3:ko,QuadraticBezierCurve:Qs,QuadraticBezierCurve3:ea,SplineCurve:ta}),Go=class extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new zo[r.type]().fromJSON(r))}return this}},na=class extends Go{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new $s(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Qs(this.currentPoint.clone(),new ie(e,t),new ie(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){let o=new Js(this.currentPoint.clone(),new ie(e,t),new ie(n,r),new ie(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ta(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){let c=new qr(e,t,n,r,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ia=class extends na{constructor(e){super(e),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new na().fromJSON(r))}return this}};function Wm(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=yd(i,0,r,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=(function(h,d,u,p){let m=[];for(let y=0,f=d.length;y<f;y++){let g=yd(h,d[y]*p,y<f-1?d[y+1]*p:h.length,p,!1);g===g.next&&(g.steiner=!0),m.push($m(g))}m.sort(Zm);for(let y=0;y<m.length;y++)u=Km(m[y],u);return u})(i,e,s,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,d=-1/0;for(let u=t;u<r;u+=t){let p=i[u],m=i[u+1];p<o&&(o=p),m<l&&(l=m),p>h&&(h=p),m>d&&(d=m)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return ra(s,a,t,o,l,c,0),a}function yd(i,e,t,n,r){let s;if(r===(function(a,o,l,c){let h=0;for(let d=o,u=l-c;d<l;d+=c)h+=(a[u]-a[d])*(a[d+1]+a[u+1]),u=d;return h})(i,e,t,n)>0)for(let a=e;a<t;a+=n)s=_d(a/n|0,i[a],i[a+1],s);else for(let a=t-n;a>=e;a-=n)s=_d(a/n|0,i[a],i[a+1],s);return s&&Zr(s,s.next)&&(aa(s),s=s.next),s}function Ji(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!Zr(n,n.next)&&mt(n.prev,n,n.next)!==0)n=n.next;else{if(aa(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ra(i,e,t,n,r,s,a){if(!i)return;!a&&s&&(function(l,c,h,d){let u=l;do u.z===0&&(u.z=Xc(u.x,u.y,c,h,d)),u.prevZ=u.prev,u.nextZ=u.next,u=u.next;while(u!==l);u.prevZ.nextZ=null,u.prevZ=null,(function(p){let m,y=1;do{let f,g=p;p=null;let v=null;for(m=0;g;){m++;let _=g,x=0;for(let M=0;M<y&&(x++,_=_.nextZ,_);M++);let S=y;for(;x>0||S>0&&_;)x!==0&&(S===0||!_||g.z<=_.z)?(f=g,g=g.nextZ,x--):(f=_,_=_.nextZ,S--),v?v.nextZ=f:p=f,f.prevZ=v,v=f;g=_}v.nextZ=null,y*=2}while(m>1)})(u)})(i,n,r,s);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?Xm(i,n,r,s):jm(i))e.push(l.i,i.i,c.i),aa(i),i=c.next,o=c.next;else if((i=c)===o){a?a===1?ra(i=qm(Ji(i),e),e,t,n,r,s,2):a===2&&Ym(i,e,t,n,r,s):ra(Ji(i),e,t,n,r,s,1);break}}}function jm(i){let e=i.prev,t=i,n=i.next;if(mt(e,t,n)>=0)return!1;let r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(r,s,a),d=Math.min(o,l,c),u=Math.max(r,s,a),p=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=p&&Cs(r,o,s,l,a,c,m.x,m.y)&&mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Xm(i,e,t,n){let r=i.prev,s=i,a=i.next;if(mt(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,d=s.y,u=a.y,p=Math.min(o,l,c),m=Math.min(h,d,u),y=Math.max(o,l,c),f=Math.max(h,d,u),g=Xc(p,m,e,t,n),v=Xc(y,f,e,t,n),_=i.prevZ,x=i.nextZ;for(;_&&_.z>=g&&x&&x.z<=v;){if(_.x>=p&&_.x<=y&&_.y>=m&&_.y<=f&&_!==r&&_!==a&&Cs(o,h,l,d,c,u,_.x,_.y)&&mt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=p&&x.x<=y&&x.y>=m&&x.y<=f&&x!==r&&x!==a&&Cs(o,h,l,d,c,u,x.x,x.y)&&mt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=p&&_.x<=y&&_.y>=m&&_.y<=f&&_!==r&&_!==a&&Cs(o,h,l,d,c,u,_.x,_.y)&&mt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=p&&x.x<=y&&x.y>=m&&x.y<=f&&x!==r&&x!==a&&Cs(o,h,l,d,c,u,x.x,x.y)&&mt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function qm(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Zr(n,r)&&bp(n,t,t.next,r)&&sa(n,r)&&sa(r,n)&&(e.push(n.i,t.i,r.i),aa(t),aa(t.next),t=i=r),t=t.next}while(t!==i);return Ji(t)}function Ym(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qm(a,o)){let l=Sp(a,o);return a=Ji(a,a.next),l=Ji(l,l.next),ra(a,e,t,n,r,s,0),void ra(l,e,t,n,r,s,0)}o=o.next}a=a.next}while(a!==i)}function Zm(i,e){let t=i.x-e.x;return t===0&&(t=i.y-e.y,t===0)&&(t=(i.next.y-i.y)/(i.next.x-i.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function Km(i,e){let t=(function(r,s){let a=s,o=r.x,l=r.y,c,h=-1/0;if(Zr(r,a))return a;do{if(Zr(r,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let y=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(y<=o&&y>h&&(h=y,c=a.x<a.next.x?a:a.next,y===o))return c}a=a.next}while(a!==s);if(!c)return null;let d=c,u=c.x,p=c.y,m=1/0;a=c;do{if(o>=a.x&&a.x>=u&&o!==a.x&&Mp(l<p?o:h,l,u,p,l<p?h:o,l,a.x,a.y)){let y=Math.abs(l-a.y)/(o-a.x);sa(a,r)&&(y<m||y===m&&(a.x>c.x||a.x===c.x&&Jm(c,a)))&&(c=a,m=y)}a=a.next}while(a!==d);return c})(i,e);if(!t)return e;let n=Sp(t,i);return Ji(n,n.next),Ji(t,t.next)}function Jm(i,e){return mt(i.prev,i,e.prev)<0&&mt(e.next,i,i.next)<0}function Xc(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function $m(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Mp(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function Cs(i,e,t,n,r,s,a,o){return!(i===a&&e===o)&&Mp(i,e,t,n,r,s,a,o)}function Qm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!(function(t,n){let r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==n.i&&r.next.i!==n.i&&bp(r,r.next,t,n))return!0;r=r.next}while(r!==t);return!1})(i,e)&&(sa(i,e)&&sa(e,i)&&(function(t,n){let r=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&a<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==t);return s})(i,e)&&(mt(i.prev,i,e.prev)||mt(i,e.prev,e))||Zr(i,e)&&mt(i.prev,i,i.next)>0&&mt(e.prev,e,e.next)>0)}function mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Zr(i,e){return i.x===e.x&&i.y===e.y}function bp(i,e,t,n){let r=go(mt(i,e,t)),s=go(mt(i,e,n)),a=go(mt(t,n,i)),o=go(mt(t,n,e));return r!==s&&a!==o||!(r!==0||!mo(i,t,e))||!(s!==0||!mo(i,n,e))||!(a!==0||!mo(t,i,n))||!(o!==0||!mo(t,e,n))}function mo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function go(i){return i>0?1:i<0?-1:0}function sa(i,e){return mt(i.prev,i,i.next)<0?mt(i,e,i.next)>=0&&mt(i,i.prev,e)>=0:mt(i,e,i.prev)<0||mt(i,i.next,e)<0}function Sp(i,e){let t=qc(i.i,i.x,i.y),n=qc(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function _d(i,e,t,n){let r=qc(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function aa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function qc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var Yc=class{static triangulate(e,t,n=2){return Wm(e,t,n)}},Un=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];xd(e),Md(n,e);let a=e.length;t.forEach(xd);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Md(n,t[l]);let o=Yc.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};function xd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Md(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ho=class i extends Be{constructor(e=new ia([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:eg,_,x,S,M,w,A=!1;g&&(_=g.getSpacedPoints(h),A=!0,u=!1,x=g.computeFrenetFrames(h,!1),S=new D,M=new D,w=new D),u||(f=0,p=0,m=0,y=0);let T=o.extractPoints(c),C=T.shape,P=T.holes;if(!Un.isClockWise(C)){C=C.reverse();for(let B=0,b=P.length;B<b;B++){let L=P[B];Un.isClockWise(L)&&(P[B]=L.reverse())}}function U(B){let b=10000000000000001e-36,L=B[0];for(let k=1;k<=B.length;k++){let F=k%B.length,Z=B[F],W=Z.x-L.x,j=Z.y-L.y,ne=W*W+j*j,de=Math.max(Math.abs(Z.x),Math.abs(Z.y),Math.abs(L.x),Math.abs(L.y));ne<=b*de*de?(B.splice(F,1),k--):L=Z}}U(C),P.forEach(U);let O=P.length,N=C;for(let B=0;B<O;B++){let b=P[B];C=C.concat(b)}function H(B,b,L){return b||console.error("THREE.ExtrudeGeometry: vec does not exist"),B.clone().addScaledVector(b,L)}let V=C.length;function K(B,b,L){let k,F,Z,W=B.x-b.x,j=B.y-b.y,ne=L.x-B.x,de=L.y-B.y,ee=W*W+j*j,me=W*de-j*ne;if(Math.abs(me)>Number.EPSILON){let be=Math.sqrt(ee),Te=Math.sqrt(ne*ne+de*de),ze=b.x-j/be,je=b.y+W/be,Xe=((L.x-de/Te-ze)*de-(L.y+ne/Te-je)*ne)/(W*de-j*ne);k=ze+W*Xe-B.x,F=je+j*Xe-B.y;let pe=k*k+F*F;if(pe<=2)return new ie(k,F);Z=Math.sqrt(pe/2)}else{let be=!1;W>Number.EPSILON?ne>Number.EPSILON&&(be=!0):W<-Number.EPSILON?ne<-Number.EPSILON&&(be=!0):Math.sign(j)===Math.sign(de)&&(be=!0),be?(k=-j,F=W,Z=Math.sqrt(ee)):(k=W,F=j,Z=Math.sqrt(ee/2))}return new ie(k/Z,F/Z)}let Y=[];for(let B=0,b=N.length,L=b-1,k=B+1;B<b;B++,L++,k++)L===b&&(L=0),k===b&&(k=0),Y[B]=K(N[B],N[L],N[k]);let re=[],ce,ue,ge=Y.concat();for(let B=0,b=O;B<b;B++){let L=P[B];ce=[];for(let k=0,F=L.length,Z=F-1,W=k+1;k<F;k++,Z++,W++)Z===F&&(Z=0),W===F&&(W=0),ce[k]=K(L[k],L[Z],L[W]);re.push(ce),ge=ge.concat(ce)}if(f===0)ue=Un.triangulateShape(N,P);else{let B=[],b=[];for(let L=0;L<f;L++){let k=L/f,F=p*Math.cos(k*Math.PI/2),Z=m*Math.sin(k*Math.PI/2)+y;for(let W=0,j=N.length;W<j;W++){let ne=H(N[W],Y[W],Z);xe(ne.x,ne.y,-F),k===0&&B.push(ne)}for(let W=0,j=O;W<j;W++){let ne=P[W];ce=re[W];let de=[];for(let ee=0,me=ne.length;ee<me;ee++){let be=H(ne[ee],ce[ee],Z);xe(be.x,be.y,-F),k===0&&de.push(be)}k===0&&b.push(de)}}ue=Un.triangulateShape(B,b)}let Q=ue.length,ae=m+y;for(let B=0;B<V;B++){let b=u?H(C[B],ge[B],ae):C[B];A?(M.copy(x.normals[0]).multiplyScalar(b.x),S.copy(x.binormals[0]).multiplyScalar(b.y),w.copy(_[0]).add(M).add(S),xe(w.x,w.y,w.z)):xe(b.x,b.y,0)}for(let B=1;B<=h;B++)for(let b=0;b<V;b++){let L=u?H(C[b],ge[b],ae):C[b];A?(M.copy(x.normals[B]).multiplyScalar(L.x),S.copy(x.binormals[B]).multiplyScalar(L.y),w.copy(_[B]).add(M).add(S),xe(w.x,w.y,w.z)):xe(L.x,L.y,d/h*B)}for(let B=f-1;B>=0;B--){let b=B/f,L=p*Math.cos(b*Math.PI/2),k=m*Math.sin(b*Math.PI/2)+y;for(let F=0,Z=N.length;F<Z;F++){let W=H(N[F],Y[F],k);xe(W.x,W.y,d+L)}for(let F=0,Z=P.length;F<Z;F++){let W=P[F];ce=re[F];for(let j=0,ne=W.length;j<ne;j++){let de=H(W[j],ce[j],k);A?xe(de.x,de.y+_[h-1].y,_[h-1].x+L):xe(de.x,de.y,d+L)}}}function te(B,b){let L=B.length;for(;--L>=0;){let k=L,F=L-1;F<0&&(F=B.length-1);for(let Z=0,W=h+2*f;Z<W;Z++){let j=V*Z,ne=V*(Z+1);R(b+k+j,b+F+j,b+F+ne,b+k+ne)}}}function xe(B,b,L){l.push(B),l.push(b),l.push(L)}function Re(B,b,L){E(B),E(b),E(L);let k=r.length/3,F=v.generateTopUV(n,r,k-3,k-2,k-1);G(F[0]),G(F[1]),G(F[2])}function R(B,b,L,k){E(B),E(b),E(k),E(b),E(L),E(k);let F=r.length/3,Z=v.generateSideWallUV(n,r,F-6,F-3,F-2,F-1);G(Z[0]),G(Z[1]),G(Z[3]),G(Z[1]),G(Z[2]),G(Z[3])}function E(B){r.push(l[3*B+0]),r.push(l[3*B+1]),r.push(l[3*B+2])}function G(B){s.push(B.x),s.push(B.y)}(function(){let B=r.length/3;if(u){let b=0,L=V*b;for(let k=0;k<Q;k++){let F=ue[k];Re(F[2]+L,F[1]+L,F[0]+L)}b=h+2*f,L=V*b;for(let k=0;k<Q;k++){let F=ue[k];Re(F[0]+L,F[1]+L,F[2]+L)}}else{for(let b=0;b<Q;b++){let L=ue[b];Re(L[2],L[1],L[0])}for(let b=0;b<Q;b++){let L=ue[b];Re(L[0]+V*h,L[1]+V*h,L[2]+V*h)}}n.addGroup(B,r.length/3-B,0)})(),(function(){let B=r.length/3,b=0;te(N,b),b+=N.length;for(let L=0,k=P.length;L<k;L++){let F=P[L];te(F,b),b+=F.length}n.addGroup(B,r.length/3-B,1)})()}this.setAttribute("position",new ve(r,3)),this.setAttribute("uv",new ve(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,r){if(r.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];r.shapes.push(o.uuid)}else r.shapes.push(t.uuid);return r.options=Object.assign({},n),n.extrudePath!==void 0&&(r.options.extrudePath=n.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new zo[r.type]().fromJSON(r)),new i(n,e.options)}},eg={generateTopUV:function(i,e,t,n,r){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new ie(s,a),new ie(o,l),new ie(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],d=e[3*n+2],u=e[3*r],p=e[3*r+1],m=e[3*r+2],y=e[3*s],f=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ie(a,1-l),new ie(c,1-d),new ie(u,1-m),new ie(y,1-g)]:[new ie(o,1-l),new ie(h,1-d),new ie(p,1-m),new ie(f,1-g)]}},Vo=class i extends Ri{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Kr=class i extends Be{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Oe(r,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,d=new D,u=new ie,p=new D,m=new D,y=new D,f=0,g=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,p.x=1*g,p.y=-f,p.z=0*g,y.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(y.x,y.y,y.z);break;default:f=e[v+1].x-e[v].x,g=e[v+1].y-e[v].y,p.x=1*g,p.y=-f,p.z=0*g,m.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),l.push(p.x,p.y,p.z),y.copy(m)}for(let v=0;v<=t;v++){let _=n+v*h*r,x=Math.sin(_),S=Math.cos(_);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*x,d.y=e[M].y,d.z=e[M].x*S,a.push(d.x,d.y,d.z),u.x=v/t,u.y=M/(e.length-1),o.push(u.x,u.y);let w=l[3*M+0]*x,A=l[3*M+1],T=l[3*M+0]*S;c.push(w,A,T)}}for(let v=0;v<t;v++)for(let _=0;_<e.length-1;_++){let x=_+v*e.length,S=x,M=x+e.length,w=x+e.length+1,A=x+1;s.push(S,M,A),s.push(w,A,M)}this.setIndex(s),this.setAttribute("position",new ve(a,3)),this.setAttribute("uv",new ve(o,2)),this.setAttribute("normal",new ve(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Wo=class i extends Ri{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ut=class i extends Be{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,p=[],m=[],y=[],f=[];for(let g=0;g<h;g++){let v=g*u-a;for(let _=0;_<c;_++){let x=_*d-s;m.push(x,-v,0),y.push(0,0,1),f.push(_/o),f.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let _=v+c*g,x=v+c*(g+1),S=v+1+c*(g+1),M=v+1+c*g;p.push(_,x,M),p.push(x,S,M)}this.setIndex(p),this.setAttribute("position",new ve(m,3)),this.setAttribute("normal",new ve(y,3)),this.setAttribute("uv",new ve(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Jr=class i extends Be{constructor(e=.5,t=1,n=32,r=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/(r=Math.max(1,r)),p=new D,m=new ie;for(let y=0;y<=r;y++){for(let f=0;f<=n;f++){let g=s+f/n*a;p.x=d*Math.cos(g),p.y=d*Math.sin(g),l.push(p.x,p.y,p.z),c.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let y=0;y<r;y++){let f=y*(n+1);for(let g=0;g<n;g++){let v=g+f,_=v,x=v+n+1,S=v+n+2,M=v+1;o.push(_,x,M),o.push(x,S,M)}}this.setIndex(o),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(c,3)),this.setAttribute("uv",new ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},jo=class i extends Be{constructor(e=new ia([new ie(0,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let d=r.length/3,u=h.extractPoints(t),p=u.shape,m=u.holes;Un.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,g=m.length;f<g;f++){let v=m[f];Un.isClockWise(v)===!0&&(m[f]=v.reverse())}let y=Un.triangulateShape(p,m);for(let f=0,g=m.length;f<g;f++){let v=m[f];p=p.concat(v)}for(let f=0,g=p.length;f<g;f++){let v=p[f];r.push(v.x,v.y,0),s.push(0,0,1),a.push(v.x,v.y)}for(let f=0,g=y.length;f<g;f++){let v=y[f],_=v[0]+d,x=v[1]+d,S=v[2]+d;n.push(_,x,S),l+=3}}this.setIndex(n),this.setAttribute("position",new ve(r,3)),this.setAttribute("normal",new ve(s,3)),this.setAttribute("uv",new ve(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let r=0,s=t.length;r<s;r++){let a=t[r];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];n.push(a)}return new i(n,e.curveSegments)}},ai=class i extends Be{constructor(e=1,t=32,n=16,r=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new D,u=new D,p=[],m=[],y=[],f=[];for(let g=0;g<=n;g++){let v=[],_=g/n,x=0;g===0&&a===0?x=.5/t:g===n&&l===Math.PI&&(x=-.5/t);for(let S=0;S<=t;S++){let M=S/t;d.x=-e*Math.cos(r+M*s)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(r+M*s)*Math.sin(a+_*o),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),f.push(M+x,1-_),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let _=h[g][v+1],x=h[g][v],S=h[g+1][v],M=h[g+1][v+1];(g!==0||a>0)&&p.push(_,x,M),(g!==n-1||l<Math.PI)&&p.push(x,S,M)}this.setIndex(p),this.setAttribute("position",new ve(m,3)),this.setAttribute("normal",new ve(y,3)),this.setAttribute("uv",new ve(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Xo=class i extends Ri{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},$i=class i extends Be{constructor(e=1,t=.4,n=12,r=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let a=[],o=[],l=[],c=[],h=new D,d=new D,u=new D;for(let p=0;p<=n;p++)for(let m=0;m<=r;m++){let y=m/r*s,f=p/n*Math.PI*2;d.x=(e+t*Math.cos(f))*Math.cos(y),d.y=(e+t*Math.cos(f))*Math.sin(y),d.z=t*Math.sin(f),o.push(d.x,d.y,d.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(m/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=r;m++){let y=(r+1)*p+m-1,f=(r+1)*(p-1)+m-1,g=(r+1)*(p-1)+m,v=(r+1)*p+m;a.push(y,f,v),a.push(f,g,v)}this.setIndex(a),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(l,3)),this.setAttribute("uv",new ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},qo=class i extends Be{constructor(e=1,t=.4,n=64,r=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:s,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],d=new D,u=new D,p=new D,m=new D,y=new D,f=new D,g=new D;for(let _=0;_<=n;++_){let x=_/n*s*Math.PI*2;v(x,s,a,e,p),v(x+.01,s,a,e,m),f.subVectors(m,p),g.addVectors(m,p),y.crossVectors(f,g),g.crossVectors(y,f),y.normalize(),g.normalize();for(let S=0;S<=r;++S){let M=S/r*Math.PI*2,w=-t*Math.cos(M),A=t*Math.sin(M);d.x=p.x+(w*g.x+A*y.x),d.y=p.y+(w*g.y+A*y.y),d.z=p.z+(w*g.z+A*y.z),l.push(d.x,d.y,d.z),u.subVectors(d,p).normalize(),c.push(u.x,u.y,u.z),h.push(_/n),h.push(S/r)}}for(let _=1;_<=n;_++)for(let x=1;x<=r;x++){let S=(r+1)*(_-1)+(x-1),M=(r+1)*_+(x-1),w=(r+1)*_+x,A=(r+1)*(_-1)+x;o.push(S,M,A),o.push(M,w,A)}function v(_,x,S,M,w){let A=Math.cos(_),T=Math.sin(_),C=S/x*_,P=Math.cos(C);w.x=M*(2+P)*.5*A,w.y=M*(2+P)*T*.5,w.z=M*Math.sin(C)*.5}this.setIndex(o),this.setAttribute("position",new ve(l,3)),this.setAttribute("normal",new ve(c,3)),this.setAttribute("uv",new ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},$r=class i extends Be{constructor(e=new ea(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new D,l=new D,c=new ie,h=new D,d=[],u=[],p=[],m=[];function y(f){h=e.getPointAt(f/t,h);let g=a.normals[f],v=a.binormals[f];for(let _=0;_<=r;_++){let x=_/r*Math.PI*2,S=Math.sin(x),M=-Math.cos(x);l.x=M*g.x+S*v.x,l.y=M*g.y+S*v.y,l.z=M*g.z+S*v.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}(function(){for(let f=0;f<t;f++)y(f);y(s===!1?t:0),(function(){for(let f=0;f<=t;f++)for(let g=0;g<=r;g++)c.x=f/t,c.y=g/r,p.push(c.x,c.y)})(),(function(){for(let f=1;f<=t;f++)for(let g=1;g<=r;g++){let v=(r+1)*(f-1)+(g-1),_=(r+1)*f+(g-1),x=(r+1)*f+g,S=(r+1)*(f-1)+g;m.push(v,_,S),m.push(_,x,S)}})()})(),this.setIndex(m),this.setAttribute("position",new ve(d,3)),this.setAttribute("normal",new ve(u,3)),this.setAttribute("uv",new ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new zo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Yo=class extends Be{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new D,s=new D;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start;for(let p=u,m=u+d.count;p<m;p+=3)for(let y=0;y<3;y++){let f=o.getX(p+y),g=o.getX(p+(y+1)%3);r.fromBufferAttribute(a,f),s.fromBufferAttribute(a,g),bd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,d=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,d),bd(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function bd(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var bv=Object.freeze({__proto__:null,BoxGeometry:Ke,CapsuleGeometry:No,CircleGeometry:jr,ConeGeometry:Ki,CylinderGeometry:fn,DodecahedronGeometry:Xr,EdgesGeometry:Fo,ExtrudeGeometry:Ho,IcosahedronGeometry:Vo,LatheGeometry:Kr,OctahedronGeometry:Wo,PlaneGeometry:Ut,PolyhedronGeometry:Ri,RingGeometry:Jr,ShapeGeometry:jo,SphereGeometry:ai,TetrahedronGeometry:Xo,TorusGeometry:$i,TorusKnotGeometry:qo,TubeGeometry:$r,WireframeGeometry:Yo});var Ci=class extends rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Qr=class extends Ci{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Oe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},oa=class extends rn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new fe(16777215),this.specular=new fe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var mn=class extends rn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zo=class extends rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ko=class extends rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function vo(i,e){return i&&i.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i):i}function tg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Qi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Jo=class extends Qi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gc,endingEnd:Gc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hc:s=e,o=2*t-n;break;case Vc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Hc:a=e,l=2*n-t;break;case Vc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,m=(n-t)/(r-t),y=m*m,f=y*m,g=-u*f+2*u*y-u*m,v=(1+u)*f+(-1.5-2*u)*y+(-.5+u)*m+1,_=(-1-p)*f+(1.5+p)*y+.5*m,x=p*f-p*y;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+v*a[c+S]+_*a[l+S]+x*a[d+S];return s}},$o=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},Qo=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},en=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=vo(t,this.TimeBufferType),this.values=vo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:vo(e.times,Array),values:vo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ls:t=this.InterpolantFactoryMethodDiscrete;break;case Mo:t=this.InterpolantFactoryMethodLinear;break;case yo:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ls;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return yo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&tg(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===yo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,d=h-n,u=h+n;for(let p=0;p!==n;++p){let m=t[h+p];if(m!==t[d+p]||m!==t[u+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let u=0;u!==n;++u)t[d+u]=t[h+u]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};en.prototype.ValueTypeName="",en.prototype.TimeBufferType=Float32Array,en.prototype.ValueBufferType=Float32Array,en.prototype.DefaultInterpolation=Mo;var Ti=class extends en{constructor(e,t,n){super(e,t,n)}};Ti.prototype.ValueTypeName="bool",Ti.prototype.ValueBufferType=Array,Ti.prototype.DefaultInterpolation=Ls,Ti.prototype.InterpolantFactoryMethodLinear=void 0,Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var el=class extends en{constructor(e,t,n,r){super(e,t,n,r)}};el.prototype.ValueTypeName="color";var tl=class extends en{constructor(e,t,n,r){super(e,t,n,r)}};tl.prototype.ValueTypeName="number";var nl=class extends Qi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)wn.slerpFlat(s,0,a,c-o,a,c,l);return s}},la=class extends en{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new nl(this.times,this.values,this.getValueSize(),e)}};la.prototype.ValueTypeName="quaternion",la.prototype.InterpolantFactoryMethodSmooth=void 0;var Ei=class extends en{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="string",Ei.prototype.ValueBufferType=Array,Ei.prototype.DefaultInterpolation=Ls,Ei.prototype.InterpolantFactoryMethodLinear=void 0,Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var il=class extends en{constructor(e,t,n,r){super(e,t,n,r)}};il.prototype.ValueTypeName="vector";var rl=class{constructor(e,t,n){let r=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){l++,a===!1&&r.onStart!==void 0&&r.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let p=c[d],m=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},wp=new rl,sl=class{constructor(e){this.manager=e!==void 0?e:wp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};sl.DEFAULT_MATERIAL_NAME="__DEFAULT";var ca=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},er=class extends ca{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},kc=new Fe,Sd=new D,wd=new D,Zc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.mapType=kn,this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ai,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sd),wd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wd),t.updateMatrixWorld(),kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Sv=new Fe,wv=new D,Tv=new D;var ha=class extends zr{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Kc=class extends Zc{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oi=class extends ca{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Kc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ev=new Fe,Av=new Fe,Rv=new Fe;var al=class extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Cv=new D,Iv=new wn,Pv=new D,Lv=new D,Dv=new D;var Uv=new D,Nv=new wn,Fv=new D,Ov=new D;var Hh="\\[\\]\\.:\\/",ng=new RegExp("["+Hh+"]","g"),zc="[^"+Hh+"]",ig="[^"+Hh.replace("\\.","")+"]",rg=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",zc)+/(WCOD+)?/.source.replace("WCOD",ig)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zc)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zc)+"$"),sg=["material","materials","bones","map"],ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ng,"")}static parseTrackName(e){let t=rg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);sg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=class{constructor(i,e,t){let n=t||ot.parseTrackName(e);this._targetGroup=i,this._bindings=i.subscribe_(e,n)}getValue(i,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(i,e)}setValue(i,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=t.length;n!==r;++n)t[n].setValue(i,e)}bind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].bind()}unbind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].unbind()}},ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray],ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bv=new Float32Array(1);var kv=new Fe;var zv=new ie;var Gv=new D,Hv=new D,Vv=new D,Wv=new D,jv=new D,Xv=new D,qv=new D;var Yv=new D;var Zv=new D,Kv=new Fe,Jv=new Fe;var $v=new D,Qv=new fe,ey=new fe;var ty=new D,ny=new D,iy=new D;var ry=new D,sy=new zr;var ay=new un;var oy=new D;function Vh(i,e,t,n){let r=(function(s){switch(s){case kn:case nh:return{byteLength:1,components:1};case ss:case ih:case Pi:return{byteLength:2,components:1};case vl:case yl:return{byteLength:2,components:4};case rr:case gl:case Tn:return{byteLength:4,components:1};case rh:case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)})(n);switch(t){case 1021:return i*e;case _l:case xl:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case an:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yp(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function og(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=i.createBuffer(),d;if(i.bindBuffer(a,h),i.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)d=i.HALF_FLOAT;else if(o instanceof Uint16Array)d=s.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)d=i.SHORT;else if(o instanceof Uint32Array)d=i.UNSIGNED_INT;else if(o instanceof Int32Array)d=i.INT;else if(o instanceof Int8Array)d=i.BYTE;else if(o instanceof Uint8Array)d=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);d=i.UNSIGNED_BYTE}return{buffer:h,type:d,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(i.bindBuffer(o,s),c.length===0)i.bufferSubData(o,0,l);else{c.sort((d,u)=>d.start-u.start);let h=0;for(let d=1;d<c.length;d++){let u=c[h],p=c[d];p.start<=u.start+u.count+1?u.count=Math.max(u.count,p.start+p.count-u.start):(++h,c[h]=p)}c.length=h+1;for(let d=0,u=c.length;d<u;d++){let p=c[d];i.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var ke={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},he={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},zn={basic:{uniforms:Ht([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Ht([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new fe(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Ht([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Ht([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Ht([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new fe(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Ht([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Ht([he.points,he.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Ht([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Ht([he.common,he.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Ht([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Ht([he.sprite,he.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Ht([he.common,he.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Ht([he.lights,he.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};zn.physical={uniforms:Ht([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var El={r:0,b:0,g:0},or=new nn,lg=new Fe;function cg(i,e,t,n,r,s,a){let o=new fe(0),l,c,h=s===!0?0:1,d=null,u=0,p=null;function m(f){let g=f.isScene===!0?f.background:null;return g&&g.isTexture&&(g=(f.backgroundBlurriness>0?t:e).get(g)),g}function y(f,g){f.getRGB(El,zh(i)),n.buffers.color.setClear(El.r,El.g,El.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),h=g,y(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(f){h=f,y(o,h)},render:function(f){let g=!1,v=m(f);v===null?y(o,h):v&&v.isColor&&(y(v,1),g=!0);let _=i.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(f,g){let v=m(g);v&&(v.isCubeTexture||v.mapping===da)?(c===void 0&&(c=new Ie(new Ke(1,1,1),new Pt({name:"BackgroundCubeMaterial",uniforms:ar(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,x,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),or.copy(g.backgroundRotation),or.x*=-1,or.y*=-1,or.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lg.makeRotationFromEuler(or)),c.material.toneMapped=et.getTransfer(v.colorSpace)!==nt,d===v&&u===v.version&&p===i.toneMapping||(c.material.needsUpdate=!0,d=v,u=v.version,p=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ie(new Ut(2,2),new Pt({name:"BackgroundMaterial",uniforms:ar(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=et.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),d===v&&u===v.version&&p===i.toneMapping||(l.material.needsUpdate=!0,d=v,u=v.version,p=i.toneMapping),l.layers.enableAll(),f.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}}}function hg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let v=[],_=[],x=[];for(let S=0;S<t;S++)v[S]=0,_[S]=0,x[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:_,attributeDivisors:x,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let v=0,_=g.length;v<_;v++)g[v]=0}function d(g){u(g,0)}function u(g,v){let _=s.newAttributes,x=s.enabledAttributes,S=s.attributeDivisors;_[g]=1,x[g]===0&&(i.enableVertexAttribArray(g),x[g]=1),S[g]!==v&&(i.vertexAttribDivisor(g,v),S[g]=v)}function p(){let g=s.newAttributes,v=s.enabledAttributes;for(let _=0,x=v.length;_<x;_++)v[_]!==g[_]&&(i.disableVertexAttribArray(_),v[_]=0)}function m(g,v,_,x,S,M,w){w===!0?i.vertexAttribIPointer(g,v,_,S,M):i.vertexAttribPointer(g,v,_,x,S,M)}function y(){f(),a=!0,s!==r&&(s=r,o(s.object))}function f(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,v,_,x,S){let M=!1,w=(function(A,T,C){let P=C.wireframe===!0,U=n[A.id];U===void 0&&(U={},n[A.id]=U);let O=U[T.id];O===void 0&&(O={},U[T.id]=O);let N=O[P];return N===void 0&&(N=c(i.createVertexArray()),O[P]=N),N})(x,_,v);s!==w&&(s=w,o(s.object)),M=(function(A,T,C,P){let U=s.attributes,O=T.attributes,N=0,H=C.getAttributes();for(let V in H)if(H[V].location>=0){let K=U[V],Y=O[V];if(Y===void 0&&(V==="instanceMatrix"&&A.instanceMatrix&&(Y=A.instanceMatrix),V==="instanceColor"&&A.instanceColor&&(Y=A.instanceColor)),K===void 0||K.attribute!==Y||Y&&K.data!==Y.data)return!0;N++}return s.attributesNum!==N||s.index!==P})(g,x,_,S),M&&(function(A,T,C,P){let U={},O=T.attributes,N=0,H=C.getAttributes();for(let V in H)if(H[V].location>=0){let K=O[V];K===void 0&&(V==="instanceMatrix"&&A.instanceMatrix&&(K=A.instanceMatrix),V==="instanceColor"&&A.instanceColor&&(K=A.instanceColor));let Y={};Y.attribute=K,K&&K.data&&(Y.data=K.data),U[V]=Y,N++}s.attributes=U,s.attributesNum=N,s.index=P})(g,x,_,S),S!==null&&e.update(S,i.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,(function(A,T,C,P){h();let U=P.attributes,O=C.getAttributes(),N=T.defaultAttributeValues;for(let H in O){let V=O[H];if(V.location>=0){let K=U[H];if(K===void 0&&(H==="instanceMatrix"&&A.instanceMatrix&&(K=A.instanceMatrix),H==="instanceColor"&&A.instanceColor&&(K=A.instanceColor)),K!==void 0){let Y=K.normalized,re=K.itemSize,ce=e.get(K);if(ce===void 0)continue;let ue=ce.buffer,ge=ce.type,Q=ce.bytesPerElement,ae=ge===i.INT||ge===i.UNSIGNED_INT||K.gpuType===gl;if(K.isInterleavedBufferAttribute){let te=K.data,xe=te.stride,Re=K.offset;if(te.isInstancedInterleavedBuffer){for(let R=0;R<V.locationSize;R++)u(V.location+R,te.meshPerAttribute);A.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let R=0;R<V.locationSize;R++)d(V.location+R);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let R=0;R<V.locationSize;R++)m(V.location+R,re/V.locationSize,ge,Y,xe*Q,(Re+re/V.locationSize*R)*Q,ae)}else{if(K.isInstancedBufferAttribute){for(let te=0;te<V.locationSize;te++)u(V.location+te,K.meshPerAttribute);A.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let te=0;te<V.locationSize;te++)d(V.location+te);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let te=0;te<V.locationSize;te++)m(V.location+te,re/V.locationSize,ge,Y,re*Q,re/V.locationSize*te*Q,ae)}}else if(N!==void 0){let Y=N[H];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(V.location,Y);break;case 3:i.vertexAttrib3fv(V.location,Y);break;case 4:i.vertexAttrib4fv(V.location,Y);break;default:i.vertexAttrib1fv(V.location,Y)}}}}p()})(g,v,_,x),S!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:y,resetDefaultState:f,dispose:function(){y();for(let g in n){let v=n[g];for(let _ in v){let x=v[_];for(let S in x)l(x[S].object),delete x[S];delete v[_]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let v=n[g.id];for(let _ in v){let x=v[_];for(let S in x)l(x[S].object),delete x[S];delete v[_]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let v in n){let _=n[v];if(_[g.id]===void 0)continue;let x=_[g.id];for(let S in x)l(x[S].object),delete x[S];delete _[g.id]}},initAttributes:h,enableAttribute:d,disableUnusedAttributes:p}}function ug(i,e,t){let n;function r(s,a,o){o!==0&&(i.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){i.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=r,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)r(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let d=0;d<o;d++)h+=a[d]*l[d];t.update(h,n,1)}}}function dg(i,e,t,n){let r;function s(u){if(u==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";u="mediump"}return u==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let u=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(u){return u===an||n.convert(u)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(u){let p=u===Pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(u!==kn&&n.convert(u)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&u!==Tn&&!p)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:h,maxVertexTextures:d,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:d>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function pg(i){let e=this,t=null,n=0,r=!1,s=!1,a=new Pn,o=new Ue,l={value:null,needsUpdate:!1};function c(h,d,u,p){let m=h!==null?h.length:0,y=null;if(m!==0){if(y=l.value,p!==!0||y===null){let f=u+4*m,g=d.matrixWorldInverse;o.getNormalMatrix(g),(y===null||y.length<f)&&(y=new Float32Array(f));for(let v=0,_=u;v!==m;++v,_+=4)a.copy(h[v]).applyMatrix4(g,o),a.normal.toArray(y,_),y[_+3]=a.constant}l.value=y,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,y}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let u=h.length!==0||d||n!==0||r;return r=d,n=h.length,u},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=c(h,d,0)},this.setState=function(h,d,u){let p=h.clippingPlanes,m=h.clipIntersection,y=h.clipShadows,f=i.get(h);if(!r||p===null||p.length===0||s&&!y)s?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=s?0:n,v=4*g,_=f.clippingState||null;l.value=_,_=c(p,d,v,u);for(let x=0;x!==v;++x)_[x]=t[x];f.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=g}}}function fg(i){let e=new WeakMap;function t(r,s){return s===rs?r.mapping=is:s===fl&&(r.mapping=nr),r}function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping;if(s===rs||s===fl){if(e.has(r))return t(e.get(r).texture,r.mapping);{let a=r.image;if(a&&a.height>0){let o=new Ro(a.height);return o.fromEquirectangularTexture(i,r),e.set(r,o),r.addEventListener("dispose",n),t(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}var Tp=[.125,.215,.35,.446,.526,.582],ga=20,Wh=new ha,Ep=new fe,jh=null,Xh=0,qh=0,Yh=!1,cr=(1+Math.sqrt(5))/2,os=1/cr,Ap=[new D(-cr,os,0),new D(cr,os,0),new D(-os,0,cr),new D(os,0,cr),new D(0,cr,-os),new D(0,cr,os),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],mg=new D,cs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=mg}=s;jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),Yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ip(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jh,Xh,qh),this._renderer.xr.enabled=Yh,e.scissorTest=!1,Al(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),Yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Pi,format:an,colorSpace:ni,depthBuffer:!1},r=Rp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rp(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(a){let o=[],l=[],c=[],h=a,d=a-4+1+Tp.length;for(let u=0;u<d;u++){let p=Math.pow(2,h);l.push(p);let m=1/p;u>a-4?m=Tp[u-a+4-1]:u===0&&(m=0),c.push(m);let y=1/(p-2),f=-y,g=1+y,v=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,x=6,S=3,M=2,w=1,A=new Float32Array(S*x*_),T=new Float32Array(M*x*_),C=new Float32Array(w*x*_);for(let U=0;U<_;U++){let O=U%3*2/3-1,N=U>2?0:-1,H=[O,N,0,O+2/3,N,0,O+2/3,N+1,0,O,N,0,O+2/3,N+1,0,O,N+1,0];A.set(H,S*x*U),T.set(v,M*x*U);let V=[U,U,U,U,U,U];C.set(V,w*x*U)}let P=new Be;P.setAttribute("position",new _t(A,S)),P.setAttribute("uv",new _t(T,M)),P.setAttribute("faceIndex",new _t(C,w)),o.push(P),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(s)),this._blurMaterial=(function(a,o,l){let c=new Float32Array(ga),h=new D(0,1,0);return new Pt({name:"SphericalGaussianBlur",defines:{n:ga,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})})(s,e,t)}return r}_compileMaterial(e){let t=new Ie(this._lodPlanes[0],e);this._renderer.compile(t,Wh)}_sceneToCubeUV(e,t,n,r,s){let a=new It(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,h=c.autoClear,d=c.toneMapping;c.getClearColor(Ep),c.toneMapping=li,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null));let u=new ct({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),p=new Ie(new Ke,u),m=!1,y=e.background;y?y.isColor&&(u.color.copy(y),e.background=null,m=!0):(u.color.copy(Ep),m=!0);for(let f=0;f<6;f++){let g=f%3;g===0?(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[f],s.y,s.z)):g===1?(a.up.set(0,0,o[f]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[f],s.z)):(a.up.set(0,o[f],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[f]));let v=this._cubeSize;Al(r,g*v,f>2?v:0,v,v),c.setRenderTarget(r),m&&c.render(p,a),c.render(e,a)}p.geometry.dispose(),p.material.dispose(),c.toneMapping=d,c.autoClear=h,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===is||e.mapping===nr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ip()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cp());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ie(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;Al(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Wh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ap[(r-s-1)%Ap.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Ie(this._lodPlanes[r],c),d=c.uniforms,u=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*u):2*Math.PI/39,m=s/p,y=isFinite(s)?1+Math.floor(3*m):ga;y>ga&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let f=[],g=0;for(let x=0;x<ga;++x){let S=x/m,M=Math.exp(-S*S/2);f.push(M),x===0?g+=M:x<y&&(g+=2*M)}for(let x=0;x<f.length;x++)f[x]=f[x]/g;d.envMap.value=e.texture,d.samples.value=y,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:v}=this;d.dTheta.value=p,d.mipInt.value=v-n;let _=this._sizeLods[r];Al(t,3*_*(r>v-4?r-v+4:0),4*(this._cubeSize-_),3*_,2*_),l.setRenderTarget(t),l.render(h,Wh)}};function Rp(i,e,t){let n=new Fn(i,e,t);return n.texture.mapping=da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Al(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Cp(){return new Pt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ip(){return new Pt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function ru(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gg(i){let e=new WeakMap,t=null;function n(r){let s=r.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(r){if(r&&r.isTexture){let s=r.mapping,a=s===rs||s===fl,o=s===is||s===nr;if(a||o){let l=e.get(r),c=l!==void 0?l.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new cs(i)),l=a?t.fromEquirectangular(r,l):t.fromCubemap(r,l),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),l.texture;if(l!==void 0)return l.texture;{let h=r.image;return a&&h&&h.height>0||o&&h&&(function(d){let u=0,p=6;for(let m=0;m<p;m++)d[m]!==void 0&&u++;return u===p})(h)?(t===null&&(t=new cs(i)),l=a?t.fromEquirectangular(r):t.fromCubemap(r),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),r.addEventListener("dispose",n),l.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function vg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Br("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function yg(i,e,t,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let d in c.attributes)e.remove(c.attributes[d]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,d=l.attributes.position,u=0;if(h!==null){let y=h.array;u=h.version;for(let f=0,g=y.length;f<g;f+=3){let v=y[f+0],_=y[f+1],x=y[f+2];c.push(v,_,_,x,x,v)}}else{if(d===void 0)return;{let y=d.array;u=d.version;for(let f=0,g=y.length/3-1;f<g;f+=3){let v=f+0,_=f+1,x=f+2;c.push(v,_,_,x,x,v)}}}let p=new(kh(c)?zs:ks)(c,1);p.version=u;let m=s.get(l);m&&e.remove(m),s.set(l,p)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function _g(i,e,t){let n,r,s;function a(o,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){r=o.type,s=o.bytesPerElement},this.render=function(o,l){i.drawElements(n,l,r,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,o,0,c);let h=0;for(let d=0;d<c;d++)h+=l[d];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let u=0;u<o.length;u++)a(o[u]/s,l[u],h[u]);else{d.multiDrawElementsInstancedWEBGL(n,l,0,r,o,0,h,0,c);let u=0;for(let p=0;p<c;p++)u+=l[p]*h[p];t.update(u,n,1)}}}function xg(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function Mg(i,e,t){let n=new WeakMap,r=new lt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,d=n.get(a);if(d===void 0||d.count!==h){let A=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let u=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],v=0;u===!0&&(v=1),p===!0&&(v=2),m===!0&&(v=3);let _=a.attributes.position.count*v,x=1;_>e.maxTextureSize&&(x=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let S=new Float32Array(_*x*4*h),M=new Fs(S,_,x,h);M.type=Tn,M.needsUpdate=!0;let w=4*v;for(let T=0;T<h;T++){let C=y[T],P=f[T],U=g[T],O=_*x*4*T;for(let N=0;N<C.count;N++){let H=N*w;u===!0&&(r.fromBufferAttribute(C,N),S[O+H+0]=r.x,S[O+H+1]=r.y,S[O+H+2]=r.z,S[O+H+3]=0),p===!0&&(r.fromBufferAttribute(P,N),S[O+H+4]=r.x,S[O+H+5]=r.y,S[O+H+6]=r.z,S[O+H+7]=0),m===!0&&(r.fromBufferAttribute(U,N),S[O+H+8]=r.x,S[O+H+9]=r.y,S[O+H+10]=r.z,S[O+H+11]=U.itemSize===4?r.w:1)}}d={count:h,texture:M,size:new ie(_,x)},n.set(a,d),a.addEventListener("dispose",A)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let u=0;for(let m=0;m<l.length;m++)u+=l[m];let p=a.morphTargetsRelative?1:1-u;o.getUniforms().setValue(i,"morphTargetBaseInfluence",p),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}}}function bg(i,e,t,n){let r=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(r.get(c)!==o&&(e.update(c),r.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),r.get(a)!==o&&(t.update(a.instanceMatrix,i.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,i.ARRAY_BUFFER),r.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;r.get(h)!==o&&(h.update(),r.set(h,o))}return c},dispose:function(){r=new WeakMap}}}var Zp=new jt,Pp=new Zs(1,1),Kp=new Fs,Jp=new Eo,$p=new Gs,Lp=[],Dp=[],Up=new Float32Array(16),Np=new Float32Array(9),Fp=new Float32Array(4);function us(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=Lp[r];if(s===void 0&&(s=new Float32Array(r),Lp[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Cl(i,e){let t=Dp[e];t===void 0&&(t=new Int32Array(e),Dp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Sg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function wg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Tg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Eg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function Ag(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Fp.set(n),i.uniformMatrix2fv(this.addr,!1,Fp),At(t,n)}}function Rg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Np.set(n),i.uniformMatrix3fv(this.addr,!1,Np),At(t,n)}}function Cg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Up.set(n),i.uniformMatrix4fv(this.addr,!1,Up),At(t,n)}}function Ig(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Pg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Lg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Dg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function Ug(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ng(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function Fg(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function Og(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Bg(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),s;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Pp.compareFunction=Fh,s=Pp):s=Zp,t.setTexture2D(e||s,r)}function kg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Jp,r)}function zg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||$p,r)}function Gg(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Kp,r)}function Hg(i,e){i.uniform1fv(this.addr,e)}function Vg(i,e){let t=us(e,this.size,2);i.uniform2fv(this.addr,t)}function Wg(i,e){let t=us(e,this.size,3);i.uniform3fv(this.addr,t)}function jg(i,e){let t=us(e,this.size,4);i.uniform4fv(this.addr,t)}function Xg(i,e){let t=us(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function qg(i,e){let t=us(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Yg(i,e){let t=us(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zg(i,e){i.uniform1iv(this.addr,e)}function Kg(i,e){i.uniform2iv(this.addr,e)}function Jg(i,e){i.uniform3iv(this.addr,e)}function $g(i,e){i.uniform4iv(this.addr,e)}function Qg(i,e){i.uniform1uiv(this.addr,e)}function e0(i,e){i.uniform2uiv(this.addr,e)}function t0(i,e){i.uniform3uiv(this.addr,e)}function n0(i,e){i.uniform4uiv(this.addr,e)}function i0(i,e,t){let n=this.cache,r=e.length,s=Cl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Zp,s[a])}function r0(i,e,t){let n=this.cache,r=e.length,s=Cl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Jp,s[a])}function s0(i,e,t){let n=this.cache,r=e.length,s=Cl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||$p,s[a])}function a0(i,e,t){let n=this.cache,r=e.length,s=Cl(t,r);Et(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Kp,s[a])}var Kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Sg;case 35664:return wg;case 35665:return Tg;case 35666:return Eg;case 35674:return Ag;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Ig;case 35667:case 35671:return Pg;case 35668:case 35672:return Lg;case 35669:case 35673:return Dg;case 5125:return Ug;case 36294:return Ng;case 36295:return Fg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Gg}})(t.type)}},Jh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return Hg;case 35664:return Vg;case 35665:return Wg;case 35666:return jg;case 35674:return Xg;case 35675:return qg;case 35676:return Yg;case 5124:case 35670:return Zg;case 35667:case 35671:return Kg;case 35668:case 35672:return Jg;case 35669:case 35673:return $g;case 5125:return Qg;case 36294:return e0;case 36295:return t0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return s0;case 36289:case 36303:case 36311:case 36292:return a0}})(t.type)}},$h=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},Zh=/(\w+)(\])?(\[|\.)?/g;function Op(i,e){i.seq.push(e),i.map[e.id]=e}function o0(i,e,t){let n=i.name,r=n.length;for(Zh.lastIndex=0;;){let s=Zh.exec(n),a=Zh.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){Op(t,c===void 0?new Kh(o,i,e):new Jh(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new $h(o),Op(t,h)),t=h}}}var ls=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r);o0(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function Bp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var l0=0,kp=new Ue;function zp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+(function(o,l){let c=o.split(`
`),h=[],d=Math.max(l-6,0),u=Math.min(l+6,c.length);for(let p=d;p<u;p++){let m=p+1;h.push(`${m===l?">":" "} ${m}: ${c[p]}`)}return h.join(`
`)})(i.getShaderSource(e),a)}return r}function c0(i,e){let t=(function(n){et._getMatrix(kp,et.workingColorSpace,n);let r=`mat3( ${kp.elements.map(s=>s.toFixed(4))} )`;switch(et.getTransfer(n)){case Ds:return[r,"LinearTransferOETF"];case nt:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}})(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function h0(i,e){let t;switch(e){case Jd:t="Linear";break;case $d:t="Reinhard";break;case Qd:t="Cineon";break;case ns:t="ACESFilmic";break;case tp:t="AgX";break;case np:t="Neutral";break;case ep:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Rl=new D;function u0(){return et.getLuminanceCoefficients(Rl),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Rl.x.toFixed(4)}, ${Rl.y.toFixed(4)}, ${Rl.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function va(i){return i!==""}function Gp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var d0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qh(i){return i.replace(d0,f0)}var p0=new Map;function f0(i,e){let t=ke[e];if(t===void 0){let n=p0.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return Qh(t)}var m0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vp(i){return i.replace(m0,g0)}function g0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Wp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function v0(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=(function(P){let U="SHADOWMAP_TYPE_BASIC";return P.shadowMapType===$c?U="SHADOWMAP_TYPE_PCF":P.shadowMapType===Ad?U="SHADOWMAP_TYPE_PCF_SOFT":P.shadowMapType===On&&(U="SHADOWMAP_TYPE_VSM"),U})(t),c=(function(P){let U="ENVMAP_TYPE_CUBE";if(P.envMap)switch(P.envMapMode){case is:case nr:U="ENVMAP_TYPE_CUBE";break;case da:U="ENVMAP_TYPE_CUBE_UV"}return U})(t),h=(function(P){let U="ENVMAP_MODE_REFLECTION";return P.envMap&&P.envMapMode===nr&&(U="ENVMAP_MODE_REFRACTION"),U})(t),d=(function(P){let U="ENVMAP_BLENDING_NONE";if(P.envMap)switch(P.combine){case Yd:U="ENVMAP_BLENDING_MULTIPLY";break;case Zd:U="ENVMAP_BLENDING_MIX";break;case Kd:U="ENVMAP_BLENDING_ADD"}return U})(t),u=(function(P){let U=P.envMapCubeUVHeight;if(U===null)return null;let O=Math.log2(U)-2,N=1/U;return{texelWidth:1/(3*Math.max(Math.pow(2,O),112)),texelHeight:N,maxMip:O}})(t),p=(function(P){return[P.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",P.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(va).join(`
`)})(t),m=(function(P){let U=[];for(let O in P){let N=P[O];N!==!1&&U.push("#define "+O+" "+N)}return U.join(`
`)})(s),y=r.createProgram(),f,g,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(va).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(va).join(`
`),g.length>0&&(g+=`
`)):(f=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(va).join(`
`),g=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?ke.tonemapping_pars_fragment:"",t.toneMapping!==li?h0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,c0("linearToOutputTexel",t.outputColorSpace),u0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(va).join(`
`)),a=Qh(a),a=Gp(a,t),a=Hp(a,t),o=Qh(o),o=Gp(o,t),o=Hp(o,t),a=Vp(a),o=Vp(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=v+f+a,x=v+g+o,S=Bp(r,r.VERTEX_SHADER,_),M=Bp(r,r.FRAGMENT_SHADER,x);function w(P){if(i.debug.checkShaderErrors){let U=r.getProgramInfoLog(y)||"",O=r.getShaderInfoLog(S)||"",N=r.getShaderInfoLog(M)||"",H=U.trim(),V=O.trim(),K=N.trim(),Y=!0,re=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,S,M);else{let ce=zp(r,S,"vertex"),ue=zp(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+ce+`
`+ue)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):V!==""&&K!==""||(re=!1);re&&(P.diagnostics={runnable:Y,programLog:H,vertexShader:{log:V,prefix:f},fragmentShader:{log:K,prefix:g}})}r.deleteShader(S),r.deleteShader(M),A=new ls(r,y),T=(function(U,O){let N={},H=U.getProgramParameter(O,U.ACTIVE_ATTRIBUTES);for(let V=0;V<H;V++){let K=U.getActiveAttrib(O,V),Y=K.name,re=1;K.type===U.FLOAT_MAT2&&(re=2),K.type===U.FLOAT_MAT3&&(re=3),K.type===U.FLOAT_MAT4&&(re=4),N[Y]={type:K.type,location:U.getAttribLocation(O,Y),locationSize:re}}return N})(r,y)}let A,T;r.attachShader(y,S),r.attachShader(y,M),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y),this.getUniforms=function(){return A===void 0&&w(this),A},this.getAttributes=function(){return T===void 0&&w(this),T};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(y,37297)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=l0++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=M,this}var y0=0,eu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tu(e),t.set(e,n)),n}},tu=class{constructor(e){this.id=y0++,this.code=e,this.usedTimes=0}};function _0(i,e,t,n,r,s,a){let o=new Os,l=new eu,c=new Set,h=[],d=r.logarithmicDepthBuffer,u=r.vertexTextures,p=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,g,v,_,x){let S=_.fog,M=x.geometry,w=f.isMeshStandardMaterial?_.environment:null,A=(f.isMeshStandardMaterial?t:e).get(f.envMap||w),T=A&&A.mapping===da?A.image.height:null,C=m[f.type];f.precision!==null&&(p=r.getMaxPrecision(f.precision),p!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",p,"instead."));let P=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,U=P!==void 0?P.length:0,O,N,H,V,K=0;if(M.morphAttributes.position!==void 0&&(K=1),M.morphAttributes.normal!==void 0&&(K=2),M.morphAttributes.color!==void 0&&(K=3),C){let kt=zn[C];O=kt.vertexShader,N=kt.fragmentShader}else O=f.vertexShader,N=f.fragmentShader,l.update(f),H=l.getVertexShaderID(f),V=l.getFragmentShaderID(f);let Y=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),ce=x.isInstancedMesh===!0,ue=x.isBatchedMesh===!0,ge=!!f.map,Q=!!f.matcap,ae=!!A,te=!!f.aoMap,xe=!!f.lightMap,Re=!!f.bumpMap,R=!!f.normalMap,E=!!f.displacementMap,G=!!f.emissiveMap,B=!!f.metalnessMap,b=!!f.roughnessMap,L=f.anisotropy>0,k=f.clearcoat>0,F=f.dispersion>0,Z=f.iridescence>0,W=f.sheen>0,j=f.transmission>0,ne=L&&!!f.anisotropyMap,de=k&&!!f.clearcoatMap,ee=k&&!!f.clearcoatNormalMap,me=k&&!!f.clearcoatRoughnessMap,be=Z&&!!f.iridescenceMap,Te=Z&&!!f.iridescenceThicknessMap,ze=W&&!!f.sheenColorMap,je=W&&!!f.sheenRoughnessMap,Xe=!!f.specularMap,pe=!!f.specularColorMap,Ce=!!f.specularIntensityMap,We=j&&!!f.transmissionMap,Bt=j&&!!f.thicknessMap,Se=!!f.gradientMap,tt=!!f.alphaMap,qe=f.alphaTest>0,vn=!!f.alphaHash,Xn=!!f.extensions,z=li;f.toneMapped&&(Y!==null&&Y.isXRRenderTarget!==!0||(z=i.toneMapping));let Rt={shaderID:C,shaderType:f.type,shaderName:f.name,vertexShader:O,fragmentShader:N,defines:f.defines,customVertexShaderID:H,customFragmentShaderID:V,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:p,batching:ue,batchingColor:ue&&x._colorsTexture!==null,instancing:ce,instancingColor:ce&&x.instanceColor!==null,instancingMorph:ce&&x.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ni,alphaToCoverage:!!f.alphaToCoverage,map:ge,matcap:Q,envMap:ae,envMapMode:ae&&A.mapping,envMapCubeUVHeight:T,aoMap:te,lightMap:xe,bumpMap:Re,normalMap:R,displacementMap:u&&E,emissiveMap:G,normalMapObjectSpace:R&&f.normalMapType===cp,normalMapTangentSpace:R&&f.normalMapType===lp,metalnessMap:B,roughnessMap:b,anisotropy:L,anisotropyMap:ne,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:ee,clearcoatRoughnessMap:me,dispersion:F,iridescence:Z,iridescenceMap:be,iridescenceThicknessMap:Te,sheen:W,sheenColorMap:ze,sheenRoughnessMap:je,specularMap:Xe,specularColorMap:pe,specularIntensityMap:Ce,transmission:j,transmissionMap:We,thicknessMap:Bt,gradientMap:Se,opaque:f.transparent===!1&&f.blending===tr&&f.alphaToCoverage===!1,alphaMap:tt,alphaTest:qe,alphaHash:vn,combine:f.combine,mapUv:ge&&y(f.map.channel),aoMapUv:te&&y(f.aoMap.channel),lightMapUv:xe&&y(f.lightMap.channel),bumpMapUv:Re&&y(f.bumpMap.channel),normalMapUv:R&&y(f.normalMap.channel),displacementMapUv:E&&y(f.displacementMap.channel),emissiveMapUv:G&&y(f.emissiveMap.channel),metalnessMapUv:B&&y(f.metalnessMap.channel),roughnessMapUv:b&&y(f.roughnessMap.channel),anisotropyMapUv:ne&&y(f.anisotropyMap.channel),clearcoatMapUv:de&&y(f.clearcoatMap.channel),clearcoatNormalMapUv:ee&&y(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&y(f.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&y(f.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&y(f.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&y(f.sheenColorMap.channel),sheenRoughnessMapUv:je&&y(f.sheenRoughnessMap.channel),specularMapUv:Xe&&y(f.specularMap.channel),specularColorMapUv:pe&&y(f.specularColorMap.channel),specularIntensityMapUv:Ce&&y(f.specularIntensityMap.channel),transmissionMapUv:We&&y(f.transmissionMap.channel),thicknessMapUv:Bt&&y(f.thicknessMap.channel),alphaMapUv:tt&&y(f.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(R||L),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:x.isPoints===!0&&!!M.attributes.uv&&(ge||tt),fog:!!S,useFog:f.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:f.flatShading===!0&&f.wireframe===!1,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:x.isSkinnedMesh===!0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:K,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&v.length>0,shadowMapType:i.shadowMap.type,toneMapping:z,decodeVideoTexture:ge&&f.map.isVideoTexture===!0&&et.getTransfer(f.map.colorSpace)===nt,decodeVideoTextureEmissive:G&&f.emissiveMap.isVideoTexture===!0&&et.getTransfer(f.emissiveMap.colorSpace)===nt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===Nt,flipSided:f.side===Xt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Xn&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xn&&f.extensions.multiDraw===!0||ue)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt},getProgramCacheKey:function(f){let g=[];if(f.shaderID?g.push(f.shaderID):(g.push(f.customVertexShaderID),g.push(f.customFragmentShaderID)),f.defines!==void 0)for(let v in f.defines)g.push(v),g.push(f.defines[v]);return f.isRawShaderMaterial===!1&&((function(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)})(g,f),(function(v,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),v.push(o.mask)})(g,f),g.push(i.outputColorSpace)),g.push(f.customProgramCacheKey),g.join()},getUniforms:function(f){let g=m[f.type],v;if(g){let _=zn[g];v=Tl.clone(_.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,g){let v;for(let _=0,x=h.length;_<x;_++){let S=h[_];if(S.cacheKey===g){v=S,++v.usedTimes;break}}return v===void 0&&(v=new v0(i,g,f,s),h.push(v)),v},releaseProgram:function(f){if(--f.usedTimes===0){let g=h.indexOf(f);h[g]=h[h.length-1],h.pop(),f.destroy()}},releaseShaderCache:function(f){l.remove(f)},programs:h,dispose:function(){l.dispose()}}}function x0(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function M0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function jp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xp(){let i=[],e=0,t=[],n=[],r=[];function s(a,o,l,c,h,d){let u=i[e];return u===void 0?(u={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:d},i[e]=u):(u.id=a.id,u.object=a,u.geometry=o,u.material=l,u.groupOrder=c,u.renderOrder=a.renderOrder,u.z=h,u.group=d),e++,u}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(a,o,l,c,h,d){let u=s(a,o,l,c,h,d);l.transmission>0?n.push(u):l.transparent===!0?r.push(u):t.push(u)},unshift:function(a,o,l,c,h,d){let u=s(a,o,l,c,h,d);l.transmission>0?n.unshift(u):l.transparent===!0?r.unshift(u):t.unshift(u)},finish:function(){for(let a=e,o=i.length;a<o;a++){let l=i[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||M0),n.length>1&&n.sort(o||jp),r.length>1&&r.sort(o||jp)}}}function b0(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new Xp,i.set(e,[r])):t>=n.length?(r=new Xp,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function S0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new fe};break;case"SpotLight":t={position:new D,direction:new D,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new D,halfWidth:new D,halfHeight:new D}}return i[e.id]=t,t}}}var w0=0;function T0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function E0(i){let e=new S0,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new D);let r=new D,s=new Fe,a=new Fe;return{setup:function(o){let l=0,c=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,u=0,p=0,m=0,y=0,f=0,g=0,v=0,_=0,x=0,S=0;o.sort(T0);for(let w=0,A=o.length;w<A;w++){let T=o[w],C=T.color,P=T.intensity,U=T.distance,O=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)l+=C.r*P,c+=C.g*P,h+=C.b*P;else if(T.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(T.sh.coefficients[N],P);S++}else if(T.isDirectionalLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let H=T.shadow,V=t.get(T);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.directionalShadow[d]=V,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=T.shadow.matrix,f++}n.directional[d]=N,d++}else if(T.isSpotLight){let N=e.get(T);N.position.setFromMatrixPosition(T.matrixWorld),N.color.copy(C).multiplyScalar(P),N.distance=U,N.coneCos=Math.cos(T.angle),N.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),N.decay=T.decay,n.spot[p]=N;let H=T.shadow;if(T.map&&(n.spotLightMap[_]=T.map,_++,H.updateMatrices(T),T.castShadow&&x++),n.spotLightMatrix[p]=H.matrix,T.castShadow){let V=t.get(T);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,n.spotShadow[p]=V,n.spotShadowMap[p]=O,v++}p++}else if(T.isRectAreaLight){let N=e.get(T);N.color.copy(C).multiplyScalar(P),N.halfWidth.set(.5*T.width,0,0),N.halfHeight.set(0,.5*T.height,0),n.rectArea[m]=N,m++}else if(T.isPointLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),N.distance=T.distance,N.decay=T.decay,T.castShadow){let H=T.shadow,V=t.get(T);V.shadowIntensity=H.intensity,V.shadowBias=H.bias,V.shadowNormalBias=H.normalBias,V.shadowRadius=H.radius,V.shadowMapSize=H.mapSize,V.shadowCameraNear=H.camera.near,V.shadowCameraFar=H.camera.far,n.pointShadow[u]=V,n.pointShadowMap[u]=O,n.pointShadowMatrix[u]=T.shadow.matrix,g++}n.point[u]=N,u++}else if(T.isHemisphereLight){let N=e.get(T);N.skyColor.copy(T.color).multiplyScalar(P),N.groundColor.copy(T.groundColor).multiplyScalar(P),n.hemi[y]=N,y++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let M=n.hash;M.directionalLength===d&&M.pointLength===u&&M.spotLength===p&&M.rectAreaLength===m&&M.hemiLength===y&&M.numDirectionalShadows===f&&M.numPointShadows===g&&M.numSpotShadows===v&&M.numSpotMaps===_&&M.numLightProbes===S||(n.directional.length=d,n.spot.length=p,n.rectArea.length=m,n.point.length=u,n.hemi.length=y,n.directionalShadow.length=f,n.directionalShadowMap.length=f,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=f,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=v+_-x,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=S,M.directionalLength=d,M.pointLength=u,M.spotLength=p,M.rectAreaLength=m,M.hemiLength=y,M.numDirectionalShadows=f,M.numPointShadows=g,M.numSpotShadows=v,M.numSpotMaps=_,M.numLightProbes=S,n.version=w0++)},setupView:function(o,l){let c=0,h=0,d=0,u=0,p=0,m=l.matrixWorldInverse;for(let y=0,f=o.length;y<f;y++){let g=o[y];if(g.isDirectionalLight){let v=n.directional[c];v.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),c++}else if(g.isSpotLight){let v=n.spot[d];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(g.isRectAreaLight){let v=n.rectArea[u];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(g.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(.5*g.width,0,0),v.halfHeight.set(0,.5*g.height,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),u++}else if(g.isPointLight){let v=n.point[h];v.position.setFromMatrixPosition(g.matrixWorld),v.position.applyMatrix4(m),h++}else if(g.isHemisphereLight){let v=n.hemi[p];v.direction.setFromMatrixPosition(g.matrixWorld),v.direction.transformDirection(m),p++}}},state:n}}function qp(i){let e=new E0(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){r.camera=s,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function A0(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),s;return r===void 0?(s=new qp(i),e.set(t,[s])):n>=r.length?(s=new qp(i),r.push(s)):s=r[n],s},dispose:function(){e=new WeakMap}}}function R0(i,e,t){let n=new Ai,r=new ie,s=new ie,a=new lt,o=new Zo({depthPacking:op}),l=new Ko,c={},h=t.maxTextureSize,d={[es]:Xt,[Xt]:es,[Nt]:Nt},u=new Pt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let m=new Be;m.setAttribute("position",new _t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ie(m,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$c;let g=this.type;function v(M,w){let A=e.update(y);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Fn(r.x,r.y)),u.uniforms.shadow_pass.value=M.map.texture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(w,null,A,u,y,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(w,null,A,p,y,null)}function _(M,w,A,T){let C=null,P=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)C=P;else if(C=A.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let U=C.uuid,O=w.uuid,N=c[U];N===void 0&&(N={},c[U]=N);let H=N[O];H===void 0&&(H=C.clone(),N[O]=H,w.addEventListener("dispose",S)),C=H}return C.visible=w.visible,C.wireframe=w.wireframe,C.side=T===On?w.shadowSide!==null?w.shadowSide:w.side:w.shadowSide!==null?w.shadowSide:d[w.side],C.alphaMap=w.alphaMap,C.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,C.map=w.map,C.clipShadows=w.clipShadows,C.clippingPlanes=w.clippingPlanes,C.clipIntersection=w.clipIntersection,C.displacementMap=w.displacementMap,C.displacementScale=w.displacementScale,C.displacementBias=w.displacementBias,C.wireframeLinewidth=w.wireframeLinewidth,C.linewidth=w.linewidth,A.isPointLight===!0&&C.isMeshDistanceMaterial===!0&&(i.properties.get(C).light=A),C}function x(M,w,A,T,C){if(M.visible===!1)return;if(M.layers.test(w.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===On)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);let U=e.update(M),O=M.material;if(Array.isArray(O)){let N=U.groups;for(let H=0,V=N.length;H<V;H++){let K=N[H],Y=O[K.materialIndex];if(Y&&Y.visible){let re=_(M,Y,T,C);M.onBeforeShadow(i,M,w,A,U,re,K),i.renderBufferDirect(A,null,U,re,M,K),M.onAfterShadow(i,M,w,A,U,re,K)}}}else if(O.visible){let N=_(M,O,T,C);M.onBeforeShadow(i,M,w,A,U,N,null),i.renderBufferDirect(A,null,U,N,M,null),M.onAfterShadow(i,M,w,A,U,N,null)}}let P=M.children;for(let U=0,O=P.length;U<O;U++)x(P[U],w,A,T,C)}function S(M){M.target.removeEventListener("dispose",S);for(let w in c){let A=c[w],T=M.target.uuid;T in A&&(A[T].dispose(),delete A[T])}}this.render=function(M,w,A){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||M.length===0)return;let T=i.getRenderTarget(),C=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ii),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let O=g!==On&&this.type===On,N=g===On&&this.type!==On;for(let H=0,V=M.length;H<V;H++){let K=M[H],Y=K.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);let re=Y.getFrameExtents();if(r.multiply(re),s.copy(Y.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/re.x),r.x=s.x*re.x,Y.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/re.y),r.y=s.y*re.y,Y.mapSize.y=s.y)),Y.map===null||O===!0||N===!0){let ue=this.type!==On?{minFilter:Nn,magFilter:Nn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Fn(r.x,r.y,ue),Y.map.texture.name=K.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();let ce=Y.getViewportCount();for(let ue=0;ue<ce;ue++){let ge=Y.getViewport(ue);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),U.viewport(a),Y.updateMatrices(K,ue),n=Y.getFrustum(),x(w,A,Y.camera,K,this.type)}Y.isPointLightShadow!==!0&&this.type===On&&v(Y,A),Y.needsUpdate=!1}g=this.type,f.needsUpdate=!1,i.setRenderTarget(T,C,P)}}var C0={[ol]:ll,[cl]:dl,[hl]:pl,[ua]:ul,[ll]:ol,[dl]:cl,[pl]:hl,[ul]:ua};function I0(i,e){let t=new function(){let b=!1,L=new lt,k=null,F=new lt(0,0,0,0);return{setMask:function(Z){k===Z||b||(i.colorMask(Z,Z,Z,Z),k=Z)},setLocked:function(Z){b=Z},setClear:function(Z,W,j,ne,de){de===!0&&(Z*=ne,W*=ne,j*=ne),L.set(Z,W,j,ne),F.equals(L)===!1&&(i.clearColor(Z,W,j,ne),F.copy(L))},reset:function(){b=!1,k=null,F.set(-1,0,0,0)}}},n=new function(){let b=!1,L=!1,k=null,F=null,Z=null;return{setReversed:function(W){if(L!==W){let j=e.get("EXT_clip_control");W?j.clipControlEXT(j.LOWER_LEFT_EXT,j.ZERO_TO_ONE_EXT):j.clipControlEXT(j.LOWER_LEFT_EXT,j.NEGATIVE_ONE_TO_ONE_EXT),L=W;let ne=Z;Z=null,this.setClear(ne)}},getReversed:function(){return L},setTest:function(W){W?ae(i.DEPTH_TEST):te(i.DEPTH_TEST)},setMask:function(W){k===W||b||(i.depthMask(W),k=W)},setFunc:function(W){if(L&&(W=C0[W]),F!==W){switch(W){case ol:i.depthFunc(i.NEVER);break;case ll:i.depthFunc(i.ALWAYS);break;case cl:i.depthFunc(i.LESS);break;case ua:i.depthFunc(i.LEQUAL);break;case hl:i.depthFunc(i.EQUAL);break;case ul:i.depthFunc(i.GEQUAL);break;case dl:i.depthFunc(i.GREATER);break;case pl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}F=W}},setLocked:function(W){b=W},setClear:function(W){Z!==W&&(L&&(W=1-W),i.clearDepth(W),Z=W)},reset:function(){b=!1,k=null,F=null,Z=null,L=!1}}},r=new function(){let b=!1,L=null,k=null,F=null,Z=null,W=null,j=null,ne=null,de=null;return{setTest:function(ee){b||(ee?ae(i.STENCIL_TEST):te(i.STENCIL_TEST))},setMask:function(ee){L===ee||b||(i.stencilMask(ee),L=ee)},setFunc:function(ee,me,be){k===ee&&F===me&&Z===be||(i.stencilFunc(ee,me,be),k=ee,F=me,Z=be)},setOp:function(ee,me,be){W===ee&&j===me&&ne===be||(i.stencilOp(ee,me,be),W=ee,j=me,ne=be)},setLocked:function(ee){b=ee},setClear:function(ee){de!==ee&&(i.clearStencil(ee),de=ee)},reset:function(){b=!1,L=null,k=null,F=null,Z=null,W=null,j=null,ne=null,de=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],d=null,u=!1,p=null,m=null,y=null,f=null,g=null,v=null,_=null,x=new fe(0,0,0),S=0,M=!1,w=null,A=null,T=null,C=null,P=null,U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),O=!1,N=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(H)[1]),O=N>=1):H.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),O=N>=2);let V=null,K={},Y=i.getParameter(i.SCISSOR_BOX),re=i.getParameter(i.VIEWPORT),ce=new lt().fromArray(Y),ue=new lt().fromArray(re);function ge(b,L,k,F){let Z=new Uint8Array(4),W=i.createTexture();i.bindTexture(b,W),i.texParameteri(b,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(b,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let j=0;j<k;j++)b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY?i.texImage3D(L,0,i.RGBA,1,1,F,0,i.RGBA,i.UNSIGNED_BYTE,Z):i.texImage2D(L+j,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Z);return W}let Q={};function ae(b){o[b]!==!0&&(i.enable(b),o[b]=!0)}function te(b){o[b]!==!1&&(i.disable(b),o[b]=!1)}Q[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ae(i.DEPTH_TEST),n.setFunc(ua),E(!1),G(Jc),ae(i.CULL_FACE),R(Ii);let xe={[ts]:i.FUNC_ADD,[Cd]:i.FUNC_SUBTRACT,[Id]:i.FUNC_REVERSE_SUBTRACT};xe[Pd]=i.MIN,xe[Ld]=i.MAX;let Re={[Dd]:i.ZERO,[Ud]:i.ONE,[Nd]:i.SRC_COLOR,[Od]:i.SRC_ALPHA,[Vd]:i.SRC_ALPHA_SATURATE,[Gd]:i.DST_COLOR,[kd]:i.DST_ALPHA,[Fd]:i.ONE_MINUS_SRC_COLOR,[Bd]:i.ONE_MINUS_SRC_ALPHA,[Hd]:i.ONE_MINUS_DST_COLOR,[zd]:i.ONE_MINUS_DST_ALPHA,[Wd]:i.CONSTANT_COLOR,[jd]:i.ONE_MINUS_CONSTANT_COLOR,[Xd]:i.CONSTANT_ALPHA,[qd]:i.ONE_MINUS_CONSTANT_ALPHA};function R(b,L,k,F,Z,W,j,ne,de,ee){if(b!==Ii){if(u===!1&&(ae(i.BLEND),u=!0),b===Rd)Z=Z||L,W=W||k,j=j||F,L===m&&Z===g||(i.blendEquationSeparate(xe[L],xe[Z]),m=L,g=Z),k===y&&F===f&&W===v&&j===_||(i.blendFuncSeparate(Re[k],Re[F],Re[W],Re[j]),y=k,f=F,v=W,_=j),ne.equals(x)!==!1&&de===S||(i.blendColor(ne.r,ne.g,ne.b,de),x.copy(ne),S=de),p=b,M=!1;else if(b!==p||ee!==M){if(m===ts&&g===ts||(i.blendEquation(i.FUNC_ADD),m=ts,g=ts),ee)switch(b){case tr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bn:i.blendFunc(i.ONE,i.ONE);break;case Qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case eh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case tr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}y=null,f=null,v=null,_=null,x.set(0,0,0),S=0,p=b,M=ee}}else u===!0&&(te(i.BLEND),u=!1)}function E(b){w!==b&&(b?i.frontFace(i.CW):i.frontFace(i.CCW),w=b)}function G(b){b!==Td?(ae(i.CULL_FACE),b!==A&&(b===Jc?i.cullFace(i.BACK):b===Ed?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):te(i.CULL_FACE),A=b}function B(b,L,k){b?(ae(i.POLYGON_OFFSET_FILL),C===L&&P===k||(i.polygonOffset(L,k),C=L,P=k)):te(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ae,disable:te,bindFramebuffer:function(b,L){return l[b]!==L&&(i.bindFramebuffer(b,L),l[b]=L,b===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=L),b===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=L),!0)},drawBuffers:function(b,L){let k=h,F=!1;if(b){k=c.get(L),k===void 0&&(k=[],c.set(L,k));let Z=b.textures;if(k.length!==Z.length||k[0]!==i.COLOR_ATTACHMENT0){for(let W=0,j=Z.length;W<j;W++)k[W]=i.COLOR_ATTACHMENT0+W;k.length=Z.length,F=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,F=!0);F&&i.drawBuffers(k)},useProgram:function(b){return d!==b&&(i.useProgram(b),d=b,!0)},setBlending:R,setMaterial:function(b,L){b.side===Nt?te(i.CULL_FACE):ae(i.CULL_FACE);let k=b.side===Xt;L&&(k=!k),E(k),b.blending===tr&&b.transparent===!1?R(Ii):R(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),n.setFunc(b.depthFunc),n.setTest(b.depthTest),n.setMask(b.depthWrite),t.setMask(b.colorWrite);let F=b.stencilWrite;r.setTest(F),F&&(r.setMask(b.stencilWriteMask),r.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),r.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),B(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):te(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:E,setCullFace:G,setLineWidth:function(b){b!==T&&(O&&i.lineWidth(b),T=b)},setPolygonOffset:B,setScissorTest:function(b){b?ae(i.SCISSOR_TEST):te(i.SCISSOR_TEST)},activeTexture:function(b){b===void 0&&(b=i.TEXTURE0+U-1),V!==b&&(i.activeTexture(b),V=b)},bindTexture:function(b,L,k){k===void 0&&(k=V===null?i.TEXTURE0+U-1:V);let F=K[k];F===void 0&&(F={type:void 0,texture:void 0},K[k]=F),F.type===b&&F.texture===L||(V!==k&&(i.activeTexture(k),V=k),i.bindTexture(b,L||Q[b]),F.type=b,F.texture=L)},unbindTexture:function(){let b=K[V];b!==void 0&&b.type!==void 0&&(i.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexImage3D:function(){try{i.compressedTexImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{i.texImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage3D:function(){try{i.texImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},updateUBOMapping:function(b,L){let k=a.get(L);k===void 0&&(k=new WeakMap,a.set(L,k));let F=k.get(b);F===void 0&&(F=i.getUniformBlockIndex(L,b.name),k.set(b,F))},uniformBlockBinding:function(b,L){let k=a.get(L).get(b);s.get(L)!==k&&(i.uniformBlockBinding(L,k,b.__bindingPointIndex),s.set(L,k))},texStorage2D:function(){try{i.texStorage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texStorage3D:function(){try{i.texStorage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage2D:function(){try{i.texSubImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage3D:function(){try{i.texSubImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D(...arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){ce.equals(b)===!1&&(i.scissor(b.x,b.y,b.z,b.w),ce.copy(b))},viewport:function(b){ue.equals(b)===!1&&(i.viewport(b.x,b.y,b.z,b.w),ue.copy(b))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},V=null,K={},l={},c=new WeakMap,h=[],d=null,u=!1,p=null,m=null,y=null,f=null,g=null,v=null,_=null,x=new fe(0,0,0),S=0,M=!1,w=null,A=null,T=null,C=null,P=null,ce.set(0,0,i.canvas.width,i.canvas.height),ue.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function P0(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,d,u=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,E){return p?new OffscreenCanvas(R,E):Ns("canvas")}function y(R,E,G){let B=1,b=Re(R);if((b.width>G||b.height>G)&&(B=G/Math.max(b.width,b.height)),B<1){if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let L=Math.floor(B*b.width),k=Math.floor(B*b.height);d===void 0&&(d=m(L,k));let F=E?m(L,k):d;return F.width=L,F.height=k,F.getContext("2d").drawImage(R,0,0,L,k),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+L+"x"+k+")."),F}return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),R}return R}function f(R){return R.generateMipmaps}function g(R){i.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(R,E,G,B,b=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let L=E;if(E===i.RED&&(G===i.FLOAT&&(L=i.R32F),G===i.HALF_FLOAT&&(L=i.R16F),G===i.UNSIGNED_BYTE&&(L=i.R8)),E===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(L=i.R8UI),G===i.UNSIGNED_SHORT&&(L=i.R16UI),G===i.UNSIGNED_INT&&(L=i.R32UI),G===i.BYTE&&(L=i.R8I),G===i.SHORT&&(L=i.R16I),G===i.INT&&(L=i.R32I)),E===i.RG&&(G===i.FLOAT&&(L=i.RG32F),G===i.HALF_FLOAT&&(L=i.RG16F),G===i.UNSIGNED_BYTE&&(L=i.RG8)),E===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(L=i.RG8UI),G===i.UNSIGNED_SHORT&&(L=i.RG16UI),G===i.UNSIGNED_INT&&(L=i.RG32UI),G===i.BYTE&&(L=i.RG8I),G===i.SHORT&&(L=i.RG16I),G===i.INT&&(L=i.RG32I)),E===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(L=i.RGB8UI),G===i.UNSIGNED_SHORT&&(L=i.RGB16UI),G===i.UNSIGNED_INT&&(L=i.RGB32UI),G===i.BYTE&&(L=i.RGB8I),G===i.SHORT&&(L=i.RGB16I),G===i.INT&&(L=i.RGB32I)),E===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(L=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(L=i.RGBA16UI),G===i.UNSIGNED_INT&&(L=i.RGBA32UI),G===i.BYTE&&(L=i.RGBA8I),G===i.SHORT&&(L=i.RGBA16I),G===i.INT&&(L=i.RGBA32I)),E===i.RGB&&(G===i.UNSIGNED_INT_5_9_9_9_REV&&(L=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(L=i.R11F_G11F_B10F)),E===i.RGBA){let k=b?Ds:et.getTransfer(B);G===i.FLOAT&&(L=i.RGBA32F),G===i.HALF_FLOAT&&(L=i.RGBA16F),G===i.UNSIGNED_BYTE&&(L=k===nt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(L=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(L=i.RGB5_A1)}return L!==i.R16F&&L!==i.R32F&&L!==i.RG16F&&L!==i.RG32F&&L!==i.RGBA16F&&L!==i.RGBA32F||e.get("EXT_color_buffer_float"),L}function x(R,E){let G;return R?E===null||E===rr||E===as?G=i.DEPTH24_STENCIL8:E===Tn?G=i.DEPTH32F_STENCIL8:E===ss&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===rr||E===as?G=i.DEPTH_COMPONENT24:E===Tn?G=i.DEPTH_COMPONENT32F:E===ss&&(G=i.DEPTH_COMPONENT16),G}function S(R,E){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==Nn&&R.minFilter!==tn?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function M(R){let E=R.target;E.removeEventListener("dispose",M),(function(G){let B=n.get(G);if(B.__webglInit===void 0)return;let b=G.source,L=u.get(b);if(L){let k=L[B.__cacheKey];k.usedTimes--,k.usedTimes===0&&A(G),Object.keys(L).length===0&&u.delete(b)}n.remove(G)})(E),E.isVideoTexture&&h.delete(E)}function w(R){let E=R.target;E.removeEventListener("dispose",w),(function(G){let B=n.get(G);if(G.depthTexture&&(G.depthTexture.dispose(),n.remove(G.depthTexture)),G.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(B.__webglFramebuffer[L]))for(let k=0;k<B.__webglFramebuffer[L].length;k++)i.deleteFramebuffer(B.__webglFramebuffer[L][k]);else i.deleteFramebuffer(B.__webglFramebuffer[L]);B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer[L])}else{if(Array.isArray(B.__webglFramebuffer))for(let L=0;L<B.__webglFramebuffer.length;L++)i.deleteFramebuffer(B.__webglFramebuffer[L]);else i.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&i.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let L=0;L<B.__webglColorRenderbuffer.length;L++)B.__webglColorRenderbuffer[L]&&i.deleteRenderbuffer(B.__webglColorRenderbuffer[L]);B.__webglDepthRenderbuffer&&i.deleteRenderbuffer(B.__webglDepthRenderbuffer)}let b=G.textures;for(let L=0,k=b.length;L<k;L++){let F=n.get(b[L]);F.__webglTexture&&(i.deleteTexture(F.__webglTexture),a.memory.textures--),n.remove(b[L])}n.remove(G)})(E)}function A(R){let E=n.get(R);i.deleteTexture(E.__webglTexture);let G=R.source;delete u.get(G)[E.__cacheKey],a.memory.textures--}let T=0;function C(R,E){let G=n.get(R);if(R.isVideoTexture&&(function(B){let b=a.render.frame;h.get(B)!==b&&(h.set(B,b),B.update())})(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){let B=R.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(B.complete!==!1)return void K(G,R,E);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+E)}let P={[Fr]:i.REPEAT,[Or]:i.CLAMP_TO_EDGE,[xo]:i.MIRRORED_REPEAT},U={[Nn]:i.NEAREST,[ip]:i.NEAREST_MIPMAP_NEAREST,[pa]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[ml]:i.LINEAR_MIPMAP_NEAREST,[ir]:i.LINEAR_MIPMAP_LINEAR},O={[hp]:i.NEVER,[gp]:i.ALWAYS,[up]:i.LESS,[Fh]:i.LEQUAL,[dp]:i.EQUAL,[mp]:i.GEQUAL,[pp]:i.GREATER,[fp]:i.NOTEQUAL};function N(R,E){if(E.type!==Tn||e.has("OES_texture_float_linear")!==!1||E.magFilter!==tn&&E.magFilter!==ml&&E.magFilter!==pa&&E.magFilter!==ir&&E.minFilter!==tn&&E.minFilter!==ml&&E.minFilter!==pa&&E.minFilter!==ir||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,P[E.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,P[E.wrapT]),R!==i.TEXTURE_3D&&R!==i.TEXTURE_2D_ARRAY||i.texParameteri(R,i.TEXTURE_WRAP_R,P[E.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,U[E.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,U[E.minFilter]),E.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,O[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Nn||E.minFilter!==pa&&E.minFilter!==ir||E.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function H(R,E){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",M));let B=E.source,b=u.get(B);b===void 0&&(b={},u.set(B,b));let L=(function(k){let F=[];return F.push(k.wrapS),F.push(k.wrapT),F.push(k.wrapR||0),F.push(k.magFilter),F.push(k.minFilter),F.push(k.anisotropy),F.push(k.internalFormat),F.push(k.format),F.push(k.type),F.push(k.generateMipmaps),F.push(k.premultiplyAlpha),F.push(k.flipY),F.push(k.unpackAlignment),F.push(k.colorSpace),F.join()})(E);if(L!==R.__cacheKey){b[L]===void 0&&(b[L]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),b[L].usedTimes++;let k=b[R.__cacheKey];k!==void 0&&(b[R.__cacheKey].usedTimes--,k.usedTimes===0&&A(E)),R.__cacheKey=L,R.__webglTexture=b[L].texture}return G}function V(R,E,G){return Math.floor(Math.floor(R/G)/E)}function K(R,E,G){let B=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(B=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(B=i.TEXTURE_3D);let b=H(R,E),L=E.source;t.bindTexture(B,R.__webglTexture,i.TEXTURE0+G);let k=n.get(L);if(L.version!==k.__version||b===!0){t.activeTexture(i.TEXTURE0+G);let F=et.getPrimaries(et.workingColorSpace),Z=E.colorSpace===sr?null:et.getPrimaries(E.colorSpace),W=E.colorSpace===sr||F===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);let j=y(E.image,!1,r.maxTextureSize);j=xe(E,j);let ne=s.convert(E.format,E.colorSpace),de=s.convert(E.type),ee,me=_(E.internalFormat,ne,de,E.colorSpace,E.isVideoTexture);N(B,E);let be=E.mipmaps,Te=E.isVideoTexture!==!0,ze=k.__version===void 0||b===!0,je=L.dataReady,Xe=S(E,j);if(E.isDepthTexture)me=x(E.format===ma,E.type),ze&&(Te?t.texStorage2D(i.TEXTURE_2D,1,me,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,me,j.width,j.height,0,ne,de,null));else if(E.isDataTexture)if(be.length>0){Te&&ze&&t.texStorage2D(i.TEXTURE_2D,Xe,me,be[0].width,be[0].height);for(let pe=0,Ce=be.length;pe<Ce;pe++)ee=be[pe],Te?je&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,ee.width,ee.height,ne,de,ee.data):t.texImage2D(i.TEXTURE_2D,pe,me,ee.width,ee.height,0,ne,de,ee.data);E.generateMipmaps=!1}else Te?(ze&&t.texStorage2D(i.TEXTURE_2D,Xe,me,j.width,j.height),je&&(function(pe,Ce,We,Bt){let Se=pe.updateRanges;if(Se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ce.width,Ce.height,We,Bt,Ce.data);else{Se.sort((z,Rt)=>z.start-Rt.start);let tt=0;for(let z=1;z<Se.length;z++){let Rt=Se[tt],kt=Se[z],pt=Rt.start+Rt.count,ki=V(kt.start,Ce.width,4),zi=V(Rt.start,Ce.width,4);kt.start<=pt+1&&ki===zi&&V(kt.start+kt.count-1,Ce.width,4)===ki?Rt.count=Math.max(Rt.count,kt.start+kt.count-Rt.start):(++tt,Se[tt]=kt)}Se.length=tt+1;let qe=i.getParameter(i.UNPACK_ROW_LENGTH),vn=i.getParameter(i.UNPACK_SKIP_PIXELS),Xn=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,Ce.width);for(let z=0,Rt=Se.length;z<Rt;z++){let kt=Se[z],pt=Math.floor(kt.start/4),ki=Math.ceil(kt.count/4),zi=pt%Ce.width,vs=Math.floor(pt/Ce.width),Na=ki;i.pixelStorei(i.UNPACK_SKIP_PIXELS,zi),i.pixelStorei(i.UNPACK_SKIP_ROWS,vs),t.texSubImage2D(i.TEXTURE_2D,0,zi,vs,Na,1,We,Bt,Ce.data)}pe.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,qe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vn),i.pixelStorei(i.UNPACK_SKIP_ROWS,Xn)}})(E,j,ne,de)):t.texImage2D(i.TEXTURE_2D,0,me,j.width,j.height,0,ne,de,j.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Te&&ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Xe,me,be[0].width,be[0].height,j.depth);for(let pe=0,Ce=be.length;pe<Ce;pe++)if(ee=be[pe],E.format!==an)if(ne!==null)if(Te){if(je)if(E.layerUpdates.size>0){let We=Vh(ee.width,ee.height,E.format,E.type);for(let Bt of E.layerUpdates){let Se=ee.data.subarray(Bt*We/ee.data.BYTES_PER_ELEMENT,(Bt+1)*We/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,Bt,ee.width,ee.height,1,ne,Se)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,ee.width,ee.height,j.depth,ne,ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,pe,me,ee.width,ee.height,j.depth,0,ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Te?je&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,pe,0,0,0,ee.width,ee.height,j.depth,ne,de,ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,pe,me,ee.width,ee.height,j.depth,0,ne,de,ee.data)}else{Te&&ze&&t.texStorage2D(i.TEXTURE_2D,Xe,me,be[0].width,be[0].height);for(let pe=0,Ce=be.length;pe<Ce;pe++)ee=be[pe],E.format!==an?ne!==null?Te?je&&t.compressedTexSubImage2D(i.TEXTURE_2D,pe,0,0,ee.width,ee.height,ne,ee.data):t.compressedTexImage2D(i.TEXTURE_2D,pe,me,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?je&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,ee.width,ee.height,ne,de,ee.data):t.texImage2D(i.TEXTURE_2D,pe,me,ee.width,ee.height,0,ne,de,ee.data)}else if(E.isDataArrayTexture)if(Te){if(ze&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Xe,me,j.width,j.height,j.depth),je)if(E.layerUpdates.size>0){let pe=Vh(j.width,j.height,E.format,E.type);for(let Ce of E.layerUpdates){let We=j.data.subarray(Ce*pe/j.data.BYTES_PER_ELEMENT,(Ce+1)*pe/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ce,j.width,j.height,1,ne,de,We)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ne,de,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,j.width,j.height,j.depth,0,ne,de,j.data);else if(E.isData3DTexture)Te?(ze&&t.texStorage3D(i.TEXTURE_3D,Xe,me,j.width,j.height,j.depth),je&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ne,de,j.data)):t.texImage3D(i.TEXTURE_3D,0,me,j.width,j.height,j.depth,0,ne,de,j.data);else if(E.isFramebufferTexture){if(ze)if(Te)t.texStorage2D(i.TEXTURE_2D,Xe,me,j.width,j.height);else{let pe=j.width,Ce=j.height;for(let We=0;We<Xe;We++)t.texImage2D(i.TEXTURE_2D,We,me,pe,Ce,0,ne,de,null),pe>>=1,Ce>>=1}}else if(be.length>0){if(Te&&ze){let pe=Re(be[0]);t.texStorage2D(i.TEXTURE_2D,Xe,me,pe.width,pe.height)}for(let pe=0,Ce=be.length;pe<Ce;pe++)ee=be[pe],Te?je&&t.texSubImage2D(i.TEXTURE_2D,pe,0,0,ne,de,ee):t.texImage2D(i.TEXTURE_2D,pe,me,ne,de,ee);E.generateMipmaps=!1}else if(Te){if(ze){let pe=Re(j);t.texStorage2D(i.TEXTURE_2D,Xe,me,pe.width,pe.height)}je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne,de,j)}else t.texImage2D(i.TEXTURE_2D,0,me,ne,de,j);f(E)&&g(B),k.__version=L.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function Y(R,E,G,B,b,L){let k=s.convert(G.format,G.colorSpace),F=s.convert(G.type),Z=_(G.internalFormat,k,F,G.colorSpace),W=n.get(E),j=n.get(G);if(j.__renderTarget=E,!W.__hasExternalTextures){let ne=Math.max(1,E.width>>L),de=Math.max(1,E.height>>L);b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY?t.texImage3D(b,L,Z,ne,de,E.depth,0,k,F,null):t.texImage2D(b,L,Z,ne,de,0,k,F,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,B,b,j.__webglTexture,0,ae(E)):(b===i.TEXTURE_2D||b>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&b<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,B,b,j.__webglTexture,L),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(R,E,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),E.depthBuffer){let B=E.depthTexture,b=B&&B.isDepthTexture?B.type:null,L=x(E.stencilBuffer,b),k=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,F=ae(E);te(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,F,L,E.width,E.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,F,L,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,L,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,k,i.RENDERBUFFER,R)}else{let B=E.textures;for(let b=0;b<B.length;b++){let L=B[b],k=s.convert(L.format,L.colorSpace),F=s.convert(L.type),Z=_(L.internalFormat,k,F,L.colorSpace),W=ae(E);G&&te(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,W,Z,E.width,E.height):te(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W,Z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Z,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!E.depthTexture||!E.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let G=n.get(E.depthTexture);G.__renderTarget=E,G.__webglTexture&&E.depthTexture.image.width===E.width&&E.depthTexture.image.height===E.height||(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),C(E.depthTexture,0);let B=G.__webglTexture,b=ae(E);if(E.depthTexture.format===fa)te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0);else{if(E.depthTexture.format!==ma)throw new Error("Unknown depthTexture format");te(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0)}}function ue(R){let E=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){let B=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),B){let b=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,B.removeEventListener("dispose",b)};B.addEventListener("dispose",b),E.__depthDisposeCallback=b}E.__boundDepthTexture=B}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");let B=R.texture.mipmaps;B&&B.length>0?ce(E.__webglFramebuffer[0],R):ce(E.__webglFramebuffer,R)}else if(G){E.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[B]),E.__webglDepthbuffer[B]===void 0)E.__webglDepthbuffer[B]=i.createRenderbuffer(),re(E.__webglDepthbuffer[B],R,!1);else{let b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=E.__webglDepthbuffer[B];i.bindRenderbuffer(i.RENDERBUFFER,L),i.framebufferRenderbuffer(i.FRAMEBUFFER,b,i.RENDERBUFFER,L)}}else{let B=R.texture.mipmaps;if(B&&B.length>0?t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),re(E.__webglDepthbuffer,R,!1);else{let b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,L),i.framebufferRenderbuffer(i.FRAMEBUFFER,b,i.RENDERBUFFER,L)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}let ge=[],Q=[];function ae(R){return Math.min(r.maxSamples,R.samples)}function te(R){let E=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function xe(R,E){let G=R.colorSpace,B=R.format,b=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==ni&&G!==sr&&(et.getTransfer(G)===nt?B===an&&b===kn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Re(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=function(){let R=T;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),T+=1,R},this.resetTextureUnits=function(){T=0},this.setTexture2D=C,this.setTexture2DArray=function(R,E){let G=n.get(R);R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version?K(G,R,E):t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+E)},this.setTexture3D=function(R,E){let G=n.get(R);R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version?K(G,R,E):t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+E)},this.setTextureCube=function(R,E){let G=n.get(R);R.version>0&&G.__version!==R.version?(function(B,b,L){if(b.image.length!==6)return;let k=H(B,b),F=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+L);let Z=n.get(F);if(F.version!==Z.__version||k===!0){t.activeTexture(i.TEXTURE0+L);let W=et.getPrimaries(et.workingColorSpace),j=b.colorSpace===sr?null:et.getPrimaries(b.colorSpace),ne=b.colorSpace===sr||W===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let de=b.isCompressedTexture||b.image[0].isCompressedTexture,ee=b.image[0]&&b.image[0].isDataTexture,me=[];for(let Se=0;Se<6;Se++)me[Se]=de||ee?ee?b.image[Se].image:b.image[Se]:y(b.image[Se],!0,r.maxCubemapSize),me[Se]=xe(b,me[Se]);let be=me[0],Te=s.convert(b.format,b.colorSpace),ze=s.convert(b.type),je=_(b.internalFormat,Te,ze,b.colorSpace),Xe=b.isVideoTexture!==!0,pe=Z.__version===void 0||k===!0,Ce=F.dataReady,We,Bt=S(b,be);if(N(i.TEXTURE_CUBE_MAP,b),de){Xe&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Bt,je,be.width,be.height);for(let Se=0;Se<6;Se++){We=me[Se].mipmaps;for(let tt=0;tt<We.length;tt++){let qe=We[tt];b.format!==an?Te!==null?Xe?Ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,0,0,qe.width,qe.height,Te,qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,je,qe.width,qe.height,0,qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,0,0,qe.width,qe.height,Te,ze,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt,je,qe.width,qe.height,0,Te,ze,qe.data)}}}else{if(We=b.mipmaps,Xe&&pe){We.length>0&&Bt++;let Se=Re(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Bt,je,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(ee){Xe?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,me[Se].width,me[Se].height,Te,ze,me[Se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,je,me[Se].width,me[Se].height,0,Te,ze,me[Se].data);for(let tt=0;tt<We.length;tt++){let qe=We[tt].image[Se].image;Xe?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,0,0,qe.width,qe.height,Te,ze,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,je,qe.width,qe.height,0,Te,ze,qe.data)}}else{Xe?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Te,ze,me[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,je,Te,ze,me[Se]);for(let tt=0;tt<We.length;tt++){let qe=We[tt];Xe?Ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,0,0,Te,ze,qe.image[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,tt+1,je,Te,ze,qe.image[Se])}}}f(b)&&g(i.TEXTURE_CUBE_MAP),Z.__version=F.version,b.onUpdate&&b.onUpdate(b)}B.__version=b.version})(G,R,E):t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+E)},this.rebindTextures=function(R,E,G){let B=n.get(R);E!==void 0&&Y(B.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ue(R)},this.setupRenderTarget=function(R){let E=R.texture,G=n.get(R),B=n.get(E);R.addEventListener("dispose",w);let b=R.textures,L=R.isWebGLCubeRenderTarget===!0,k=b.length>1;if(k||(B.__webglTexture===void 0&&(B.__webglTexture=i.createTexture()),B.__version=E.version,a.memory.textures++),L){G.__webglFramebuffer=[];for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[F]=[];for(let Z=0;Z<E.mipmaps.length;Z++)G.__webglFramebuffer[F][Z]=i.createFramebuffer()}else G.__webglFramebuffer[F]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let F=0;F<E.mipmaps.length;F++)G.__webglFramebuffer[F]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(k)for(let F=0,Z=b.length;F<Z;F++){let W=n.get(b[F]);W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&te(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let F=0;F<b.length;F++){let Z=b[F];G.__webglColorRenderbuffer[F]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[F]);let W=s.convert(Z.format,Z.colorSpace),j=s.convert(Z.type),ne=_(Z.internalFormat,W,j,Z.colorSpace,R.isXRRenderTarget===!0),de=ae(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ne,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.RENDERBUFFER,G.__webglColorRenderbuffer[F])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),re(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(L){t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture),N(i.TEXTURE_CUBE_MAP,E);for(let F=0;F<6;F++)if(E.mipmaps&&E.mipmaps.length>0)for(let Z=0;Z<E.mipmaps.length;Z++)Y(G.__webglFramebuffer[F][Z],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+F,Z);else Y(G.__webglFramebuffer[F],R,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+F,0);f(E)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(k){for(let F=0,Z=b.length;F<Z;F++){let W=b[F],j=n.get(W),ne=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ne=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,j.__webglTexture),N(ne,W),Y(G.__webglFramebuffer,R,W,i.COLOR_ATTACHMENT0+F,ne,0),f(W)&&g(ne)}t.unbindTexture()}else{let F=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(F=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(F,B.__webglTexture),N(F,E),E.mipmaps&&E.mipmaps.length>0)for(let Z=0;Z<E.mipmaps.length;Z++)Y(G.__webglFramebuffer[Z],R,E,i.COLOR_ATTACHMENT0,F,Z);else Y(G.__webglFramebuffer,R,E,i.COLOR_ATTACHMENT0,F,0);f(E)&&g(F),t.unbindTexture()}R.depthBuffer&&ue(R)},this.updateRenderTargetMipmap=function(R){let E=R.textures;for(let G=0,B=E.length;G<B;G++){let b=E[G];if(f(b)){let L=v(R),k=n.get(b).__webglTexture;t.bindTexture(L,k),g(L),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(R){if(R.samples>0){if(te(R)===!1){let E=R.textures,G=R.width,B=R.height,b=i.COLOR_BUFFER_BIT,L=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=n.get(R),F=E.length>1;if(F)for(let W=0;W<E.length;W++)t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,k.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,k.__webglMultisampledFramebuffer);let Z=R.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,k.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,k.__webglFramebuffer);for(let W=0;W<E.length;W++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(b|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(b|=i.STENCIL_BUFFER_BIT)),F){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,k.__webglColorRenderbuffer[W]);let j=n.get(E[W]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,j,0)}i.blitFramebuffer(0,0,G,B,0,0,G,B,b,i.NEAREST),l===!0&&(ge.length=0,Q.length=0,ge.push(i.COLOR_ATTACHMENT0+W),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ge.push(L),Q.push(L),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Q)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),F)for(let W=0;W<E.length;W++){t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,k.__webglColorRenderbuffer[W]);let j=n.get(E[W]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,k.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.TEXTURE_2D,j,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,k.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let E=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}},this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=te}function L0(i,e){return{convert:function(t,n=sr){let r,s=et.getTransfer(n);if(t===kn)return i.UNSIGNED_BYTE;if(t===vl)return i.UNSIGNED_SHORT_4_4_4_4;if(t===yl)return i.UNSIGNED_SHORT_5_5_5_1;if(t===rh)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===sh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(t===nh)return i.BYTE;if(t===ih)return i.SHORT;if(t===ss)return i.UNSIGNED_SHORT;if(t===gl)return i.INT;if(t===rr)return i.UNSIGNED_INT;if(t===Tn)return i.FLOAT;if(t===Pi)return i.HALF_FLOAT;if(t===rp)return i.ALPHA;if(t===sp)return i.RGB;if(t===an)return i.RGBA;if(t===fa)return i.DEPTH_COMPONENT;if(t===ma)return i.DEPTH_STENCIL;if(t===_l)return i.RED;if(t===xl)return i.RED_INTEGER;if(t===ap)return i.RG;if(t===ah)return i.RG_INTEGER;if(t===oh)return i.RGBA_INTEGER;if(t===Ml||t===bl||t===Sl||t===wl)if(s===nt){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Ml)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===bl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Sl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===wl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Ml)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===bl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Sl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===wl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===lh||t===ch||t===hh||t===uh){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===lh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===ch)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===hh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===uh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===dh||t===ph||t===fh){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===dh||t===ph)return s===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===fh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===mh||t===gh||t===vh||t===yh||t===_h||t===xh||t===Mh||t===bh||t===Sh||t===wh||t===Th||t===Eh||t===Ah||t===Rh){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===mh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===gh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===vh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===yh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===_h)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===xh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Mh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===bh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Sh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===wh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Th)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Eh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Ah)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Rh)return s===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ch||t===Ih||t===Ph){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ch)return s===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Ih)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Ph)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Lh||t===Dh||t===Uh||t===Nh){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Lh)return r.COMPRESSED_RED_RGTC1_EXT;if(t===Dh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Uh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Nh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===as?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var nu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ks(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Pt({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new Ut(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},iu=class extends ri{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,m=null,y=typeof XRWebGLBinding<"u",f=new nu,g={},v=t.getContextAttributes(),_=null,x=null,S=[],M=[],w=new ie,A=null,T=new It;T.viewport=new lt;let C=new It;C.viewport=new lt;let P=[T,C],U=new al,O=null,N=null;function H(Q){let ae=M.indexOf(Q.inputSource);if(ae===-1)return;let te=S[ae];te!==void 0&&(te.update(Q.inputSource,Q.frame,c||a),te.dispatchEvent({type:Q.type,data:Q.inputSource}))}function V(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",K);for(let Q=0;Q<S.length;Q++){let ae=M[Q];ae!==null&&(M[Q]=null,S[Q].disconnect(ae))}O=null,N=null,f.reset();for(let Q in g)delete g[Q];e.setRenderTarget(_),p=null,u=null,d=null,r=null,x=null,ge.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}function K(Q){for(let ae=0;ae<Q.removed.length;ae++){let te=Q.removed[ae],xe=M.indexOf(te);xe>=0&&(M[xe]=null,S[xe].disconnect(te))}for(let ae=0;ae<Q.added.length;ae++){let te=Q.added[ae],xe=M.indexOf(te);if(xe===-1){for(let R=0;R<S.length;R++){if(R>=M.length){M.push(te),xe=R;break}if(M[R]===null){M[R]=te,xe=R;break}}if(xe===-1)break}let Re=S[xe];Re&&Re.connect(te)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ae=S[Q];return ae===void 0&&(ae=new Gr,S[Q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Q){let ae=S[Q];return ae===void 0&&(ae=new Gr,S[Q]=ae),ae.getGripSpace()},this.getHand=function(Q){let ae=S[Q];return ae===void 0&&(ae=new Gr,S[Q]=ae),ae.getHandSpace()},this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",V),r.addEventListener("inputsourceschange",K),v.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(w),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,te=null,xe=null;v.depth&&(xe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=v.stencil?ma:fa,te=v.stencil?as:rr);let Re={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Re),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new Fn(u.textureWidth,u.textureHeight,{format:an,type:kn,depthTexture:new Zs(u.textureWidth,u.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let ae={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Fn(p.framebufferWidth,p.framebufferHeight,{format:an,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ge.setContext(r),ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};let Y=new D,re=new D;function ce(Q,ae){ae===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ae.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let ae=Q.near,te=Q.far;f.texture!==null&&(f.depthNear>0&&(ae=f.depthNear),f.depthFar>0&&(te=f.depthFar)),U.near=C.near=T.near=ae,U.far=C.far=T.far=te,O===U.near&&N===U.far||(r.updateRenderState({depthNear:U.near,depthFar:U.far}),O=U.near,N=U.far),U.layers.mask=6|Q.layers.mask,T.layers.mask=3&U.layers.mask,C.layers.mask=5&U.layers.mask;let xe=Q.parent,Re=U.cameras;ce(U,xe);for(let R=0;R<Re.length;R++)ce(Re[R],xe);Re.length===2?(function(R,E,G){Y.setFromMatrixPosition(E.matrixWorld),re.setFromMatrixPosition(G.matrixWorld);let B=Y.distanceTo(re),b=E.projectionMatrix.elements,L=G.projectionMatrix.elements,k=b[14]/(b[10]-1),F=b[14]/(b[10]+1),Z=(b[9]+1)/b[5],W=(b[9]-1)/b[5],j=(b[8]-1)/b[0],ne=(L[8]+1)/L[0],de=k*j,ee=k*ne,me=B/(-j+ne),be=me*-j;if(E.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(be),R.translateZ(me),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),b[10]===-1)R.projectionMatrix.copy(E.projectionMatrix),R.projectionMatrixInverse.copy(E.projectionMatrixInverse);else{let Te=k+me,ze=F+me,je=de-be,Xe=ee+(B-be),pe=Z*F/ze*Te,Ce=W*F/ze*Te;R.projectionMatrix.makePerspective(je,Xe,pe,Ce,Te,ze),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}})(U,T,C):U.projectionMatrix.copy(T.projectionMatrix),(function(R,E,G){G===null?R.matrix.copy(E.matrixWorld):(R.matrix.copy(G.matrixWorld),R.matrix.invert(),R.matrix.multiply(E.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(E.projectionMatrix),R.projectionMatrixInverse.copy(E.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=2*So*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)})(Q,U,xe)},this.getCamera=function(){return U},this.getFoveation=function(){if(u!==null||p!==null)return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(U)},this.getCameraTexture=function(Q){return g[Q]};let ue=null,ge=new Yp;ge.setAnimationLoop(function(Q,ae){if(h=ae.getViewerPose(c||a),m=ae,h!==null){let te=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let xe=!1;te.length!==U.cameras.length&&(U.cameras.length=0,xe=!0);for(let R=0;R<te.length;R++){let E=te[R],G=null;if(p!==null)G=p.getViewport(E);else{let b=d.getViewSubImage(u,E);G=b.viewport,R===0&&(e.setRenderTargetTextures(x,b.colorTexture,b.depthStencilTexture),e.setRenderTarget(x))}let B=P[R];B===void 0&&(B=new It,B.layers.enable(R),B.viewport=new lt,P[R]=B),B.matrix.fromArray(E.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(E.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(G.x,G.y,G.width,G.height),R===0&&(U.matrix.copy(B.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),xe===!0&&U.cameras.push(B)}let Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let R=d.getDepthInformation(te[0]);R&&R.isValid&&R.texture&&f.init(R,r.renderState)}if(Re&&Re.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let R=0;R<te.length;R++){let E=te[R].camera;if(E){let G=g[E];G||(G=new Ks,g[E]=G);let B=d.getCameraImage(E);G.sourceTexture=B}}}}for(let te=0;te<S.length;te++){let xe=M[te],Re=S[te];xe!==null&&Re!==void 0&&Re.update(xe,ae,c||a)}ue&&ue(Q,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}),this.setAnimationLoop=function(Q){ue=Q},this.dispose=function(){}}},lr=new nn,D0=new Fe;function U0(i,e){function t(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,t(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,t(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,t(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Xt&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,t(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Xt&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,t(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,t(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,lr.copy(l),lr.x*=-1,lr.y*=-1,lr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(lr.y*=-1,lr.z*=-1),r.envMapRotation.value.setFromMatrix4(D0.makeRotationFromEuler(lr)),r.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,zh(i)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(r,s):s.isMeshToonMaterial?(n(r,s),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,s)):s.isMeshPhongMaterial?(n(r,s),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,s)):s.isMeshStandardMaterial?(n(r,s),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,s),s.isMeshPhysicalMaterial&&(function(c,h,d){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Xt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=d.texture,c.transmissionSamplerSize.value.set(d.width,d.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),(function(c,h){let d=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(d.matrixWorld),c.nearDistance.value=d.shadow.camera.near,c.farDistance.value=d.shadow.camera.far})(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,s),s.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,s)):s.isPointsMaterial?(function(c,h,d,u){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*d,c.scale.value=.5*u,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s,a,o):s.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function N0(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(d,u,p,m){let y=d.value,f=u+"_"+p;if(m[f]===void 0)return m[f]=typeof y=="number"||typeof y=="boolean"?y:y.clone(),!0;{let g=m[f];if(typeof y=="number"||typeof y=="boolean"){if(g!==y)return m[f]=y,!0}else if(g.equals(y)===!1)return g.copy(y),!0}return!1}function c(d){let u={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(u.boundary=4,u.storage=4):d.isVector2?(u.boundary=8,u.storage=8):d.isVector3||d.isColor?(u.boundary=16,u.storage=12):d.isVector4?(u.boundary=16,u.storage=16):d.isMatrix3?(u.boundary=48,u.storage=48):d.isMatrix4?(u.boundary=64,u.storage=64):d.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",d),u}function h(d){let u=d.target;u.removeEventListener("dispose",h);let p=a.indexOf(u.__bindingPointIndex);a.splice(p,1),i.deleteBuffer(r[u.id]),delete r[u.id],delete s[u.id]}return{bind:function(d,u){let p=u.program;n.uniformBlockBinding(d,p)},update:function(d,u){let p=r[d.id];p===void 0&&((function(f){let g=f.uniforms,v=0,_=16;for(let S=0,M=g.length;S<M;S++){let w=Array.isArray(g[S])?g[S]:[g[S]];for(let A=0,T=w.length;A<T;A++){let C=w[A],P=Array.isArray(C.value)?C.value:[C.value];for(let U=0,O=P.length;U<O;U++){let N=c(P[U]),H=v%_,V=H%N.boundary,K=H+V;v+=V,K!==0&&_-K<N.storage&&(v+=_-K),C.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=v,v+=N.storage}}}let x=v%_;x>0&&(v+=_-x),f.__size=v,f.__cache={}})(d),p=(function(f){let g=(function(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();f.__bindingPointIndex=g;let v=i.createBuffer(),_=f.__size,x=f.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,_,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,v),v})(d),r[d.id]=p,d.addEventListener("dispose",h));let m=u.program;n.updateUBOMapping(d,m);let y=e.render.frame;s[d.id]!==y&&((function(f){let g=r[f.id],v=f.uniforms,_=f.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let x=0,S=v.length;x<S;x++){let M=Array.isArray(v[x])?v[x]:[v[x]];for(let w=0,A=M.length;w<A;w++){let T=M[w];if(l(T,x,w,_)===!0){let C=T.__offset,P=Array.isArray(T.value)?T.value:[T.value],U=0;for(let O=0;O<P.length;O++){let N=P[O],H=c(N);typeof N=="number"||typeof N=="boolean"?(T.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,C+U,T.__data)):N.isMatrix3?(T.__data[0]=N.elements[0],T.__data[1]=N.elements[1],T.__data[2]=N.elements[2],T.__data[3]=0,T.__data[4]=N.elements[3],T.__data[5]=N.elements[4],T.__data[6]=N.elements[5],T.__data[7]=0,T.__data[8]=N.elements[6],T.__data[9]=N.elements[7],T.__data[10]=N.elements[8],T.__data[11]=0):(N.toArray(T.__data,U),U+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)})(d),s[d.id]=y)},dispose:function(){for(let d in r)i.deleteBuffer(r[d]);a=[],r={},s={}}}}var hs=class{constructor(e={}){let{canvas:t=vp(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let m=new Uint32Array(4),y=new Int32Array(4),f=null,g=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,S=!1;this._outputColorSpace=yt;let M=0,w=0,A=null,T=-1,C=null,P=new lt,U=new lt,O=null,N=new fe(0),H=0,V=t.width,K=t.height,Y=1,re=null,ce=null,ue=new lt(0,0,V,K),ge=new lt(0,0,V,K),Q=!1,ae=new Ai,te=!1,xe=!1,Re=new Fe,R=new D,E=new lt,G={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},B=!1;function b(){return A===null?Y:1}let L,k,F,Z,W,j,ne,de,ee,me,be,Te,ze,je,Xe,pe,Ce,We,Bt,Se,tt,qe,vn,Xn,z=n;function Rt(I,X){return t.getContext(I,X)}try{let I={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ki,!1),t.addEventListener("webglcontextrestored",zi,!1),t.addEventListener("webglcontextcreationerror",vs,!1),z===null){let X="webgl2";if(z=Rt(X,I),z===null)throw Rt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}function kt(){L=new vg(z),L.init(),qe=new L0(z,L),k=new dg(z,L,e,qe),F=new I0(z,L),k.reversedDepthBuffer&&u&&F.buffers.depth.setReversed(!0),Z=new xg(z),W=new x0,j=new P0(z,L,F,W,k,qe,Z),ne=new fg(x),de=new gg(x),ee=new og(z),vn=new hg(z,ee),me=new yg(z,ee,Z,vn),be=new bg(z,me,ee,Z),Bt=new Mg(z,k,j),pe=new pg(W),Te=new _0(x,ne,de,L,k,vn,pe),ze=new U0(x,W),je=new b0,Xe=new A0(L),We=new cg(x,ne,de,F,be,p,l),Ce=new R0(x,be,k),Xn=new N0(z,Z,k,F),Se=new ug(z,L,Z),tt=new _g(z,L,Z),Z.programs=Te.programs,x.capabilities=k,x.extensions=L,x.properties=W,x.renderLists=je,x.shadowMap=Ce,x.state=F,x.info=Z}kt();let pt=new iu(x,z);function ki(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function zi(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let I=Z.autoReset,X=Ce.enabled,J=Ce.autoUpdate,$=Ce.needsUpdate,q=Ce.type;kt(),Z.autoReset=I,Ce.enabled=X,Ce.autoUpdate=J,Ce.needsUpdate=$,Ce.type=q}function vs(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Na(I){let X=I.target;X.removeEventListener("dispose",Na),(function(J){(function($){let q=W.get($).programs;q!==void 0&&(q.forEach(function(oe){Te.releaseProgram(oe)}),$.isShaderMaterial&&Te.releaseShaderCache($))})(J),W.remove(J)})(X)}function ic(I,X,J){I.transparent===!0&&I.side===Nt&&I.forceSinglePass===!1?(I.side=Xt,I.needsUpdate=!0,Oa(I,X,J),I.side=es,I.needsUpdate=!0,Oa(I,X,J),I.side=Nt):Oa(I,X,J)}this.xr=pt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let I=L.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=L.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(I){I!==void 0&&(Y=I,this.setSize(V,K,!1))},this.getSize=function(I){return I.set(V,K)},this.setSize=function(I,X,J=!0){pt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(V=I,K=X,t.width=Math.floor(I*Y),t.height=Math.floor(X*Y),J===!0&&(t.style.width=I+"px",t.style.height=X+"px"),this.setViewport(0,0,I,X))},this.getDrawingBufferSize=function(I){return I.set(V*Y,K*Y).floor()},this.setDrawingBufferSize=function(I,X,J){V=I,K=X,Y=J,t.width=Math.floor(I*J),t.height=Math.floor(X*J),this.setViewport(0,0,I,X)},this.getCurrentViewport=function(I){return I.copy(P)},this.getViewport=function(I){return I.copy(ue)},this.setViewport=function(I,X,J,$){I.isVector4?ue.set(I.x,I.y,I.z,I.w):ue.set(I,X,J,$),F.viewport(P.copy(ue).multiplyScalar(Y).round())},this.getScissor=function(I){return I.copy(ge)},this.setScissor=function(I,X,J,$){I.isVector4?ge.set(I.x,I.y,I.z,I.w):ge.set(I,X,J,$),F.scissor(U.copy(ge).multiplyScalar(Y).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(I){F.setScissorTest(Q=I)},this.setOpaqueSort=function(I){re=I},this.setTransparentSort=function(I){ce=I},this.getClearColor=function(I){return I.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(I=!0,X=!0,J=!0){let $=0;if(I){let q=!1;if(A!==null){let oe=A.texture.format;q=oe===oh||oe===ah||oe===xl}if(q){let oe=A.texture.type,ye=oe===kn||oe===rr||oe===ss||oe===as||oe===vl||oe===yl,Me=We.getClearColor(),we=We.getClearAlpha(),Pe=Me.r,De=Me.g,Le=Me.b;ye?(m[0]=Pe,m[1]=De,m[2]=Le,m[3]=we,z.clearBufferuiv(z.COLOR,0,m)):(y[0]=Pe,y[1]=De,y[2]=Le,y[3]=we,z.clearBufferiv(z.COLOR,0,y))}else $|=z.COLOR_BUFFER_BIT}X&&($|=z.DEPTH_BUFFER_BIT),J&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ki,!1),t.removeEventListener("webglcontextrestored",zi,!1),t.removeEventListener("webglcontextcreationerror",vs,!1),We.dispose(),je.dispose(),Xe.dispose(),W.dispose(),ne.dispose(),de.dispose(),be.dispose(),vn.dispose(),Xn.dispose(),Te.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",Pu),pt.removeEventListener("sessionend",Lu),Gi.stop()},this.renderBufferDirect=function(I,X,J,$,q,oe){X===null&&(X=G);let ye=q.isMesh&&q.matrixWorld.determinant()<0,Me=(function(Ye,ft,Dt,He,Ne){ft.isScene!==!0&&(ft=G),j.resetTextureUnits();let yn=ft.fog,ac=He.isMeshStandardMaterial?ft.environment:null,Ba=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ni,vi=(He.isMeshStandardMaterial?de:ne).get(He.envMap||ac),An=He.vertexColors===!0&&!!Dt.attributes.color&&Dt.attributes.color.itemSize===4,vr=!!Dt.attributes.tangent&&(!!He.normalMap||He.anisotropy>0),qn=!!Dt.morphAttributes.position,oc=!!Dt.morphAttributes.normal,yr=!!Dt.morphAttributes.color,Bu=li;He.toneMapped&&(A!==null&&A.isXRRenderTarget!==!0||(Bu=x.toneMapping));let ku=Dt.morphAttributes.position||Dt.morphAttributes.normal||Dt.morphAttributes.color,vm=ku!==void 0?ku.length:0,Ze=W.get(He),ym=g.state.lights;if(te===!0&&(xe===!0||Ye!==C)){let cn=Ye===C&&He.id===T;pe.setState(He,Ye,cn)}let _n=!1;He.version===Ze.__version?Ze.needsLights&&Ze.lightsStateVersion!==ym.state.version||Ze.outputColorSpace!==Ba||Ne.isBatchedMesh&&Ze.batching===!1?_n=!0:Ne.isBatchedMesh||Ze.batching!==!0?Ne.isBatchedMesh&&Ze.batchingColor===!0&&Ne.colorTexture===null||Ne.isBatchedMesh&&Ze.batchingColor===!1&&Ne.colorTexture!==null||Ne.isInstancedMesh&&Ze.instancing===!1?_n=!0:Ne.isInstancedMesh||Ze.instancing!==!0?Ne.isSkinnedMesh&&Ze.skinning===!1?_n=!0:Ne.isSkinnedMesh||Ze.skinning!==!0?Ne.isInstancedMesh&&Ze.instancingColor===!0&&Ne.instanceColor===null||Ne.isInstancedMesh&&Ze.instancingColor===!1&&Ne.instanceColor!==null||Ne.isInstancedMesh&&Ze.instancingMorph===!0&&Ne.morphTexture===null||Ne.isInstancedMesh&&Ze.instancingMorph===!1&&Ne.morphTexture!==null||Ze.envMap!==vi||He.fog===!0&&Ze.fog!==yn?_n=!0:Ze.numClippingPlanes===void 0||Ze.numClippingPlanes===pe.numPlanes&&Ze.numIntersection===pe.numIntersection?(Ze.vertexAlphas!==An||Ze.vertexTangents!==vr||Ze.morphTargets!==qn||Ze.morphNormals!==oc||Ze.morphColors!==yr||Ze.toneMapping!==Bu||Ze.morphTargetsCount!==vm)&&(_n=!0):_n=!0:_n=!0:_n=!0:_n=!0:(_n=!0,Ze.__version=He.version);let Hi=Ze.currentProgram;_n===!0&&(Hi=Oa(He,ft,Ne));let zu=!1,ys=!1,lc=!1,St=Hi.getUniforms(),yi=Ze.uniforms;if(F.useProgram(Hi.program)&&(zu=!0,ys=!0,lc=!0),He.id!==T&&(T=He.id,ys=!0),zu||C!==Ye){F.buffers.depth.getReversed()&&Ye.reversedDepth!==!0&&(Ye._reversedDepth=!0,Ye.updateProjectionMatrix()),St.setValue(z,"projectionMatrix",Ye.projectionMatrix),St.setValue(z,"viewMatrix",Ye.matrixWorldInverse);let cn=St.map.cameraPosition;cn!==void 0&&cn.setValue(z,R.setFromMatrixPosition(Ye.matrixWorld)),k.logarithmicDepthBuffer&&St.setValue(z,"logDepthBufFC",2/(Math.log(Ye.far+1)/Math.LN2)),(He.isMeshPhongMaterial||He.isMeshToonMaterial||He.isMeshLambertMaterial||He.isMeshBasicMaterial||He.isMeshStandardMaterial||He.isShaderMaterial)&&St.setValue(z,"isOrthographic",Ye.isOrthographicCamera===!0),C!==Ye&&(C=Ye,ys=!0,lc=!0)}if(Ne.isSkinnedMesh){St.setOptional(z,Ne,"bindMatrix"),St.setOptional(z,Ne,"bindMatrixInverse");let cn=Ne.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),St.setValue(z,"boneTexture",cn.boneTexture,j))}Ne.isBatchedMesh&&(St.setOptional(z,Ne,"batchingTexture"),St.setValue(z,"batchingTexture",Ne._matricesTexture,j),St.setOptional(z,Ne,"batchingIdTexture"),St.setValue(z,"batchingIdTexture",Ne._indirectTexture,j),St.setOptional(z,Ne,"batchingColorTexture"),Ne._colorsTexture!==null&&St.setValue(z,"batchingColorTexture",Ne._colorsTexture,j));let cc=Dt.morphAttributes;cc.position===void 0&&cc.normal===void 0&&cc.color===void 0||Bt.update(Ne,Dt,Hi),(ys||Ze.receiveShadow!==Ne.receiveShadow)&&(Ze.receiveShadow=Ne.receiveShadow,St.setValue(z,"receiveShadow",Ne.receiveShadow)),He.isMeshGouraudMaterial&&He.envMap!==null&&(yi.envMap.value=vi,yi.flipEnvMap.value=vi.isCubeTexture&&vi.isRenderTargetTexture===!1?-1:1),He.isMeshStandardMaterial&&He.envMap===null&&ft.environment!==null&&(yi.envMapIntensity.value=ft.environmentIntensity),ys&&(St.setValue(z,"toneMappingExposure",x.toneMappingExposure),Ze.needsLights&&(xn=lc,(Rn=yi).ambientLightColor.needsUpdate=xn,Rn.lightProbe.needsUpdate=xn,Rn.directionalLights.needsUpdate=xn,Rn.directionalLightShadows.needsUpdate=xn,Rn.pointLights.needsUpdate=xn,Rn.pointLightShadows.needsUpdate=xn,Rn.spotLights.needsUpdate=xn,Rn.spotLightShadows.needsUpdate=xn,Rn.rectAreaLights.needsUpdate=xn,Rn.hemisphereLights.needsUpdate=xn),yn&&He.fog===!0&&ze.refreshFogUniforms(yi,yn),ze.refreshMaterialUniforms(yi,He,Y,K,g.state.transmissionRenderTarget[Ye.id]),ls.upload(z,Fu(Ze),yi,j));var Rn,xn;if(He.isShaderMaterial&&He.uniformsNeedUpdate===!0&&(ls.upload(z,Fu(Ze),yi,j),He.uniformsNeedUpdate=!1),He.isSpriteMaterial&&St.setValue(z,"center",Ne.center),St.setValue(z,"modelViewMatrix",Ne.modelViewMatrix),St.setValue(z,"normalMatrix",Ne.normalMatrix),St.setValue(z,"modelMatrix",Ne.matrixWorld),He.isShaderMaterial||He.isRawShaderMaterial){let cn=He.uniformsGroups;for(let hc=0,_m=cn.length;hc<_m;hc++){let Gu=cn[hc];Xn.update(Gu,Hi),Xn.bind(Gu,Hi)}}return Hi})(I,X,J,$,q);F.setMaterial($,ye);let we=J.index,Pe=1;if($.wireframe===!0){if(we=me.getWireframeAttribute(J),we===void 0)return;Pe=2}let De=J.drawRange,Le=J.attributes.position,Ge=De.start*Pe,ut=(De.start+De.count)*Pe;oe!==null&&(Ge=Math.max(Ge,oe.start*Pe),ut=Math.min(ut,(oe.start+oe.count)*Pe)),we!==null?(Ge=Math.max(Ge,0),ut=Math.min(ut,we.count)):Le!=null&&(Ge=Math.max(Ge,0),ut=Math.min(ut,Le.count));let vt=ut-Ge;if(vt<0||vt===1/0)return;let bt;vn.setup(q,$,Me,J,we);let dt=Se;if(we!==null&&(bt=ee.get(we),dt=tt,dt.setIndex(bt)),q.isMesh)$.wireframe===!0?(F.setLineWidth($.wireframeLinewidth*b()),dt.setMode(z.LINES)):dt.setMode(z.TRIANGLES);else if(q.isLine){let Ye=$.linewidth;Ye===void 0&&(Ye=1),F.setLineWidth(Ye*b()),q.isLineSegments?dt.setMode(z.LINES):q.isLineLoop?dt.setMode(z.LINE_LOOP):dt.setMode(z.LINE_STRIP)}else q.isPoints?dt.setMode(z.POINTS):q.isSprite&&dt.setMode(z.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Br("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(L.get("WEBGL_multi_draw"))dt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Ye=q._multiDrawStarts,ft=q._multiDrawCounts,Dt=q._multiDrawCount,He=we?ee.get(we).bytesPerElement:1,Ne=W.get($).currentProgram.getUniforms();for(let yn=0;yn<Dt;yn++)Ne.setValue(z,"_gl_DrawID",yn),dt.render(Ye[yn]/He,ft[yn])}else if(q.isInstancedMesh)dt.renderInstances(Ge,vt,q.count);else if(J.isInstancedBufferGeometry){let Ye=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ft=Math.min(J.instanceCount,Ye);dt.renderInstances(Ge,vt,ft)}else dt.render(Ge,vt)},this.compile=function(I,X,J=null){J===null&&(J=I),g=Xe.get(J),g.init(X),_.push(g),J.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(g.pushLight(q),q.castShadow&&g.pushShadow(q))}),I!==J&&I.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(g.pushLight(q),q.castShadow&&g.pushShadow(q))}),g.setupLights();let $=new Set;return I.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let oe=q.material;if(oe)if(Array.isArray(oe))for(let ye=0;ye<oe.length;ye++){let Me=oe[ye];ic(Me,J,q),$.add(Me)}else ic(oe,J,q),$.add(oe)}),g=_.pop(),$},this.compileAsync=function(I,X,J=null){let $=this.compile(I,X,J);return new Promise(q=>{function oe(){$.forEach(function(ye){W.get(ye).currentProgram.isReady()&&$.delete(ye)}),$.size!==0?setTimeout(oe,10):q(I)}L.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let rc=null;function Pu(){Gi.stop()}function Lu(){Gi.start()}let Gi=new Yp;function sc(I,X,J,$){if(I.visible===!1)return;if(I.layers.test(X.layers)){if(I.isGroup)J=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(X);else if(I.isLight)g.pushLight(I),I.castShadow&&g.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||ae.intersectsSprite(I)){$&&E.setFromMatrixPosition(I.matrixWorld).applyMatrix4(Re);let oe=be.update(I),ye=I.material;ye.visible&&f.push(I,oe,ye,J,E.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||ae.intersectsObject(I))){let oe=be.update(I),ye=I.material;if($&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),E.copy(I.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),E.copy(oe.boundingSphere.center)),E.applyMatrix4(I.matrixWorld).applyMatrix4(Re)),Array.isArray(ye)){let Me=oe.groups;for(let we=0,Pe=Me.length;we<Pe;we++){let De=Me[we],Le=ye[De.materialIndex];Le&&Le.visible&&f.push(I,oe,Le,J,E.z,De)}}else ye.visible&&f.push(I,oe,ye,J,E.z,null)}}let q=I.children;for(let oe=0,ye=q.length;oe<ye;oe++)sc(q[oe],X,J,$)}function Du(I,X,J,$){let q=I.opaque,oe=I.transmissive,ye=I.transparent;g.setupLightsView(J),te===!0&&pe.setGlobalState(x.clippingPlanes,J),$&&F.viewport(P.copy($)),q.length>0&&Fa(q,X,J),oe.length>0&&Fa(oe,X,J),ye.length>0&&Fa(ye,X,J),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Uu(I,X,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[$.id]===void 0&&(g.state.transmissionRenderTarget[$.id]=new Fn(1,1,{generateMipmaps:!0,type:L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float")?Pi:kn,minFilter:ir,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));let q=g.state.transmissionRenderTarget[$.id],oe=$.viewport||P;q.setSize(oe.z*x.transmissionResolutionScale,oe.w*x.transmissionResolutionScale);let ye=x.getRenderTarget(),Me=x.getActiveCubeFace(),we=x.getActiveMipmapLevel();x.setRenderTarget(q),x.getClearColor(N),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear(),B&&We.render(J);let Pe=x.toneMapping;x.toneMapping=li;let De=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),g.setupLightsView($),te===!0&&pe.setGlobalState(x.clippingPlanes,$),Fa(I,J,$),j.updateMultisampleRenderTarget(q),j.updateRenderTargetMipmap(q),L.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let Ge=0,ut=X.length;Ge<ut;Ge++){let vt=X[Ge],bt=vt.object,dt=vt.geometry,Ye=vt.material,ft=vt.group;if(Ye.side===Nt&&bt.layers.test($.layers)){let Dt=Ye.side;Ye.side=Xt,Ye.needsUpdate=!0,Nu(bt,J,$,dt,Ye,ft),Ye.side=Dt,Ye.needsUpdate=!0,Le=!0}}Le===!0&&(j.updateMultisampleRenderTarget(q),j.updateRenderTargetMipmap(q))}x.setRenderTarget(ye,Me,we),x.setClearColor(N,H),De!==void 0&&($.viewport=De),x.toneMapping=Pe}function Fa(I,X,J){let $=X.isScene===!0?X.overrideMaterial:null;for(let q=0,oe=I.length;q<oe;q++){let ye=I[q],Me=ye.object,we=ye.geometry,Pe=ye.group,De=ye.material;De.allowOverride===!0&&$!==null&&(De=$),Me.layers.test(J.layers)&&Nu(Me,X,J,we,De,Pe)}}function Nu(I,X,J,$,q,oe){I.onBeforeRender(x,X,J,$,q,oe),I.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),q.onBeforeRender(x,X,J,$,I,oe),q.transparent===!0&&q.side===Nt&&q.forceSinglePass===!1?(q.side=Xt,q.needsUpdate=!0,x.renderBufferDirect(J,X,$,q,I,oe),q.side=es,q.needsUpdate=!0,x.renderBufferDirect(J,X,$,q,I,oe),q.side=Nt):x.renderBufferDirect(J,X,$,q,I,oe),I.onAfterRender(x,X,J,$,q,oe)}function Oa(I,X,J){X.isScene!==!0&&(X=G);let $=W.get(I),q=g.state.lights,oe=g.state.shadowsArray,ye=q.state.version,Me=Te.getParameters(I,q.state,oe,X,J),we=Te.getProgramCacheKey(Me),Pe=$.programs;$.environment=I.isMeshStandardMaterial?X.environment:null,$.fog=X.fog,$.envMap=(I.isMeshStandardMaterial?de:ne).get(I.envMap||$.environment),$.envMapRotation=$.environment!==null&&I.envMap===null?X.environmentRotation:I.envMapRotation,Pe===void 0&&(I.addEventListener("dispose",Na),Pe=new Map,$.programs=Pe);let De=Pe.get(we);if(De!==void 0){if($.currentProgram===De&&$.lightsStateVersion===ye)return Ou(I,Me),De}else Me.uniforms=Te.getUniforms(I),I.onBeforeCompile(Me,x),De=Te.acquireProgram(Me,we),Pe.set(we,De),$.uniforms=Me.uniforms;let Le=$.uniforms;return(I.isShaderMaterial||I.isRawShaderMaterial)&&I.clipping!==!0||(Le.clippingPlanes=pe.uniform),Ou(I,Me),$.needsLights=(function(Ge){return Ge.isMeshLambertMaterial||Ge.isMeshToonMaterial||Ge.isMeshPhongMaterial||Ge.isMeshStandardMaterial||Ge.isShadowMaterial||Ge.isShaderMaterial&&Ge.lights===!0})(I),$.lightsStateVersion=ye,$.needsLights&&(Le.ambientLightColor.value=q.state.ambient,Le.lightProbe.value=q.state.probe,Le.directionalLights.value=q.state.directional,Le.directionalLightShadows.value=q.state.directionalShadow,Le.spotLights.value=q.state.spot,Le.spotLightShadows.value=q.state.spotShadow,Le.rectAreaLights.value=q.state.rectArea,Le.ltc_1.value=q.state.rectAreaLTC1,Le.ltc_2.value=q.state.rectAreaLTC2,Le.pointLights.value=q.state.point,Le.pointLightShadows.value=q.state.pointShadow,Le.hemisphereLights.value=q.state.hemi,Le.directionalShadowMap.value=q.state.directionalShadowMap,Le.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Le.spotShadowMap.value=q.state.spotShadowMap,Le.spotLightMatrix.value=q.state.spotLightMatrix,Le.spotLightMap.value=q.state.spotLightMap,Le.pointShadowMap.value=q.state.pointShadowMap,Le.pointShadowMatrix.value=q.state.pointShadowMatrix),$.currentProgram=De,$.uniformsList=null,De}function Fu(I){if(I.uniformsList===null){let X=I.currentProgram.getUniforms();I.uniformsList=ls.seqWithValue(X.seq,I.uniforms)}return I.uniformsList}function Ou(I,X){let J=W.get(I);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.batchingColor=X.batchingColor,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.instancingMorph=X.instancingMorph,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}Gi.setAnimationLoop(function(I){rc&&rc(I)}),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(I){rc=I,pt.setAnimationLoop(I),I===null?Gi.stop():Gi.start()},pt.addEventListener("sessionstart",Pu),pt.addEventListener("sessionend",Lu),this.render=function(I,X){if(X!==void 0&&X.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(S===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(X),X=pt.getCamera()),I.isScene===!0&&I.onBeforeRender(x,I,X,A),g=Xe.get(I,_.length),g.init(X),_.push(g),Re.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),ae.setFromProjectionMatrix(Re,ii,X.reversedDepth),xe=this.localClippingEnabled,te=pe.init(this.clippingPlanes,xe),f=je.get(I,v.length),f.init(),v.push(f),pt.enabled===!0&&pt.isPresenting===!0){let oe=x.xr.getDepthSensingMesh();oe!==null&&sc(oe,X,-1/0,x.sortObjects)}sc(I,X,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(re,ce),B=pt.enabled===!1||pt.isPresenting===!1||pt.hasDepthSensing()===!1,B&&We.addToRenderList(f,I),this.info.render.frame++,te===!0&&pe.beginShadows();let J=g.state.shadowsArray;Ce.render(J,I,X),te===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=f.opaque,q=f.transmissive;if(g.setupLights(),X.isArrayCamera){let oe=X.cameras;if(q.length>0)for(let ye=0,Me=oe.length;ye<Me;ye++)Uu($,q,I,oe[ye]);B&&We.render(I);for(let ye=0,Me=oe.length;ye<Me;ye++){let we=oe[ye];Du(f,I,we,we.viewport)}}else q.length>0&&Uu($,q,I,X),B&&We.render(I),Du(f,I,X);A!==null&&w===0&&(j.updateMultisampleRenderTarget(A),j.updateRenderTargetMipmap(A)),I.isScene===!0&&I.onAfterRender(x,I,X),vn.resetDefaultState(),T=-1,C=null,_.pop(),_.length>0?(g=_[_.length-1],te===!0&&pe.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,v.pop(),f=v.length>0?v[v.length-1]:null},this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(I,X,J){let $=W.get(I);$.__autoAllocateDepthBuffer=I.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),W.get(I.texture).__webglTexture=X,W.get(I.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(I,X){let J=W.get(I);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0};let fm=z.createFramebuffer();this.setRenderTarget=function(I,X=0,J=0){A=I,M=X,w=J;let $=!0,q=null,oe=!1,ye=!1;if(I){let Me=W.get(I);if(Me.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(z.FRAMEBUFFER,null),$=!1;else if(Me.__webglFramebuffer===void 0)j.setupRenderTarget(I);else if(Me.__hasExternalTextures)j.rebindTextures(I,W.get(I.texture).__webglTexture,W.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){let De=I.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&W.has(De)&&(I.width!==De.image.width||I.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(I)}}let we=I.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ye=!0);let Pe=W.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(q=Array.isArray(Pe[X])?Pe[X][J]:Pe[X],oe=!0):q=I.samples>0&&j.useMultisampledRTT(I)===!1?W.get(I).__webglMultisampledFramebuffer:Array.isArray(Pe)?Pe[J]:Pe,P.copy(I.viewport),U.copy(I.scissor),O=I.scissorTest}else P.copy(ue).multiplyScalar(Y).floor(),U.copy(ge).multiplyScalar(Y).floor(),O=Q;if(J!==0&&(q=fm),F.bindFramebuffer(z.FRAMEBUFFER,q)&&$&&F.drawBuffers(I,q),F.viewport(P),F.scissor(U),F.setScissorTest(O),oe){let Me=W.get(I.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+X,Me.__webglTexture,J)}else if(ye){let Me=X;for(let we=0;we<I.textures.length;we++){let Pe=W.get(I.textures[we]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+we,Pe.__webglTexture,J,Me)}}else if(I!==null&&J!==0){let Me=W.get(I.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Me.__webglTexture,J)}T=-1},this.readRenderTargetPixels=function(I,X,J,$,q,oe,ye,Me=0){if(!I||!I.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=W.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ye!==void 0&&(we=we[ye]),we){F.bindFramebuffer(z.FRAMEBUFFER,we);try{let Pe=I.textures[Me],De=Pe.format,Le=Pe.type;if(!k.textureFormatReadable(De))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Le))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");X>=0&&X<=I.width-$&&J>=0&&J<=I.height-q&&(I.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Me),z.readPixels(X,J,$,q,qe.convert(De),qe.convert(Le),oe))}finally{let Pe=A!==null?W.get(A).__webglFramebuffer:null;F.bindFramebuffer(z.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(I,X,J,$,q,oe,ye,Me=0){if(!I||!I.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=W.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ye!==void 0&&(we=we[ye]),we){if(X>=0&&X<=I.width-$&&J>=0&&J<=I.height-q){F.bindFramebuffer(z.FRAMEBUFFER,we);let Pe=I.textures[Me],De=Pe.format,Le=Pe.type;if(!k.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!k.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ge=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ge),z.bufferData(z.PIXEL_PACK_BUFFER,oe.byteLength,z.STREAM_READ),I.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Me),z.readPixels(X,J,$,q,qe.convert(De),qe.convert(Le),0);let ut=A!==null?W.get(A).__webglFramebuffer:null;F.bindFramebuffer(z.FRAMEBUFFER,ut);let vt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await yp(z,vt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ge),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,oe),z.deleteBuffer(Ge),z.deleteSync(vt),oe}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,X=null,J=0){let $=Math.pow(2,-J),q=Math.floor(I.image.width*$),oe=Math.floor(I.image.height*$),ye=X!==null?X.x:0,Me=X!==null?X.y:0;j.setTexture2D(I,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,ye,Me,q,oe),F.unbindTexture()};let mm=z.createFramebuffer(),gm=z.createFramebuffer();this.copyTextureToTexture=function(I,X,J=null,$=null,q=0,oe=null){let ye,Me,we,Pe,De,Le,Ge,ut,vt;oe===null&&(q!==0?(Br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=q,q=0):oe=0);let bt=I.isCompressedTexture?I.mipmaps[oe]:I.image;if(J!==null)ye=J.max.x-J.min.x,Me=J.max.y-J.min.y,we=J.isBox3?J.max.z-J.min.z:1,Pe=J.min.x,De=J.min.y,Le=J.isBox3?J.min.z:0;else{let An=Math.pow(2,-q);ye=Math.floor(bt.width*An),Me=Math.floor(bt.height*An),we=I.isDataArrayTexture?bt.depth:I.isData3DTexture?Math.floor(bt.depth*An):1,Pe=0,De=0,Le=0}$!==null?(Ge=$.x,ut=$.y,vt=$.z):(Ge=0,ut=0,vt=0);let dt=qe.convert(X.format),Ye=qe.convert(X.type),ft;X.isData3DTexture?(j.setTexture3D(X,0),ft=z.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(j.setTexture2DArray(X,0),ft=z.TEXTURE_2D_ARRAY):(j.setTexture2D(X,0),ft=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,X.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,X.unpackAlignment);let Dt=z.getParameter(z.UNPACK_ROW_LENGTH),He=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Ne=z.getParameter(z.UNPACK_SKIP_PIXELS),yn=z.getParameter(z.UNPACK_SKIP_ROWS),ac=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,bt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,bt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Pe),z.pixelStorei(z.UNPACK_SKIP_ROWS,De),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Le);let Ba=I.isDataArrayTexture||I.isData3DTexture,vi=X.isDataArrayTexture||X.isData3DTexture;if(I.isDepthTexture){let An=W.get(I),vr=W.get(X),qn=W.get(An.__renderTarget),oc=W.get(vr.__renderTarget);F.bindFramebuffer(z.READ_FRAMEBUFFER,qn.__webglFramebuffer),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,oc.__webglFramebuffer);for(let yr=0;yr<we;yr++)Ba&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(I).__webglTexture,q,Le+yr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(X).__webglTexture,oe,vt+yr)),z.blitFramebuffer(Pe,De,ye,Me,Ge,ut,ye,Me,z.DEPTH_BUFFER_BIT,z.NEAREST);F.bindFramebuffer(z.READ_FRAMEBUFFER,null),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(q!==0||I.isRenderTargetTexture||W.has(I)){let An=W.get(I),vr=W.get(X);F.bindFramebuffer(z.READ_FRAMEBUFFER,mm),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,gm);for(let qn=0;qn<we;qn++)Ba?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,An.__webglTexture,q,Le+qn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,An.__webglTexture,q),vi?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,vr.__webglTexture,oe,vt+qn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,vr.__webglTexture,oe),q!==0?z.blitFramebuffer(Pe,De,ye,Me,Ge,ut,ye,Me,z.COLOR_BUFFER_BIT,z.NEAREST):vi?z.copyTexSubImage3D(ft,oe,Ge,ut,vt+qn,Pe,De,ye,Me):z.copyTexSubImage2D(ft,oe,Ge,ut,Pe,De,ye,Me);F.bindFramebuffer(z.READ_FRAMEBUFFER,null),F.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else vi?I.isDataTexture||I.isData3DTexture?z.texSubImage3D(ft,oe,Ge,ut,vt,ye,Me,we,dt,Ye,bt.data):X.isCompressedArrayTexture?z.compressedTexSubImage3D(ft,oe,Ge,ut,vt,ye,Me,we,dt,bt.data):z.texSubImage3D(ft,oe,Ge,ut,vt,ye,Me,we,dt,Ye,bt):I.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,oe,Ge,ut,ye,Me,dt,Ye,bt.data):I.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,oe,Ge,ut,bt.width,bt.height,dt,bt.data):z.texSubImage2D(z.TEXTURE_2D,oe,Ge,ut,ye,Me,dt,Ye,bt);z.pixelStorei(z.UNPACK_ROW_LENGTH,Dt),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,He),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ne),z.pixelStorei(z.UNPACK_SKIP_ROWS,yn),z.pixelStorei(z.UNPACK_SKIP_IMAGES,ac),oe===0&&X.generateMipmaps&&z.generateMipmap(ft),F.unbindTexture()},this.initRenderTarget=function(I){W.get(I).__webglFramebuffer===void 0&&j.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?j.setTextureCube(I,0):I.isData3DTexture?j.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?j.setTexture2DArray(I,0):j.setTexture2D(I,0),F.unbindTexture()},this.resetState=function(){M=0,w=0,A=null,F.reset(),vn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}};var Qp=[[-1,.84,.67],[-.94,.97,.72],[-.72,1,.75],[-.45,.99,.75],[0,.98,.75],[.35,.98,.75],[.58,1,.74],[.82,.98,.71],[.98,.9,.64],[1,.86,.6]],su=[[-1,.87,.62],[-.95,1,.68],[-.67,1,.73],[-.4,.97,.75],[0,.93,.74],[.4,.97,.7],[.63,1,.67],[.84,.93,.59],[.98,.81,.51],[1,.77,.49]],ef=[[-1,.78,.63],[-.94,.88,.68],[-.65,1,.73],[-.4,.95,.76],[0,.9,.78],[.28,.92,.75],[.55,1,.73],[.76,.96,.7],[.97,.84,.64],[1,.78,.59]],tf=[[-1,.91,.68],[-.95,.97,.74],[-.72,1,.8],[-.43,.98,.83],[0,.97,.82],[.38,.98,.81],[.66,1,.8],[.89,.97,.78],[1,.92,.73]],F0=[[-1,.77,.63],[-.9,.92,.67],[-.66,1,.77],[-.4,.99,.82],[0,.94,.81],[.38,.92,.77],[.62,.98,.74],[.86,.93,.68],[1,.72,.56]],O0={hatch:[[-1,.78,.69],[-.79,.97,.77],[-.46,1,.82],[0,.97,.8],[.46,.98,.75],[.76,.93,.7],[1,.8,.64]],wagon:[[-1,.91,.76],[-.8,1,.81],[-.45,.97,.85],[0,.96,.86],[.49,1,.85],[.76,.97,.79],[1,.91,.74]],notch:[[-1,.91,.66],[-.75,1,.76],[-.41,.95,.81],[0,.89,.81],[.46,.94,.77],[.74,1,.74],[1,.86,.63]],rally:[[-1,.81,.66],[-.75,.93,.76],[-.52,1.05,.82],[-.16,.94,.78],[.25,.92,.76],[.58,1.05,.76],[.87,.88,.7],[1,.83,.65]],coupe:[[-1,.77,.6],[-.77,.97,.7],[-.47,1,.78],[.03,.97,.76],[.48,.94,.7],[.74,.98,.66],[1,.83,.5]],roadster:[[-1,.71,.51],[-.76,1,.64],[-.54,1,.7],[-.16,.89,.67],[.3,.88,.69],[.67,1,.74],[.86,.9,.69],[1,.68,.53]],aero:[[-1,.84,.6],[-.8,.98,.67],[-.55,1.03,.72],[-.18,.93,.73],[.29,.88,.68],[.6,.97,.65],[.85,.85,.51],[1,.68,.45]],silhouette:[[-1,.89,.6],[-.85,1,.69],[-.48,1.05,.74],[0,.93,.73],[.45,1.03,.72],[.7,1.04,.67],[.92,.84,.58],[1,.81,.51]],muscle:[[-1,.89,.71],[-.8,1,.75],[-.46,1.03,.72],[0,.94,.72],[.41,.94,.79],[.72,1,.82],[1,.91,.68]],landau:[[-1,.94,.7],[-.8,1,.75],[-.45,.98,.77],[0,.94,.79],[.48,.96,.85],[.8,.99,.85],[1,.95,.74]],bubble:[[-1,.63,.56],[-.8,.78,.67],[-.51,1,.77],[0,.96,.79],[.38,.93,.77],[.71,1,.75],[.91,.82,.64],[1,.64,.56]]},B0={jp:"\u65E5\u672C",de:"\u30C9\u30A4\u30C4",it:"\u30A4\u30BF\u30EA\u30A2",gb:"\u30A4\u30AE\u30EA\u30B9",fr:"\u30D5\u30E9\u30F3\u30B9",se:"\u30B9\u30A6\u30A7\u30FC\u30C7\u30F3",cz:"\u30C1\u30A7\u30B3\u30B9\u30ED\u30D0\u30AD\u30A2",us:"\u30A2\u30E1\u30EA\u30AB"};function Ee(i,e,t,n,r){let[s,a,o,l,c,h]=e,[d,u,p,m,y,f,g,v]=t,[_,x,S,M,w,A,T,C,P,U={}]=n;return{id:s,name:a,code:o,country:B0[i],year:l,drive:c,layout:c,engineType:h.replace("+",""),turbo:h.endsWith("+"),power:d,mass:u,accel:p,topSpeed:m,grip:y,handling:f,drift:g,gears:v,paint:_,accent:x,description:r,dimensions:M,profile:O0[S],cab:w,axle:A,wheel:T,front:C,rear:P,exhaust:1,...U}}var k0=[Ee("jp",["suzume","\u96C0 360","SZ-36",1962,"RR","inline4"],[41,530,4.7,122,.9,1.19,1.07,4],["#b9cbc8","#526063","bubble",[3,1.3,1.35],[-.92,-.58,.46,.71,.85,.73],[-.63,.53],[.223,.122,12],"bug-eye","vertical",{chrome:!0}],"\u5F8C\u308D\u306B\u30A8\u30F3\u30B8\u30F3\u3092\u7A4D\u3093\u3060\u4E38\u3044\u8EFD\u91CF\u8ECA\u3002\u4F4E\u901F\u304B\u3089\u5411\u304D\u304C\u5909\u308F\u308A\u3001\u7D30\u3044\u5CE0\u306E\u30B3\u30FC\u30CA\u30FC\u3092\u5C0F\u3055\u304F\u56DE\u308C\u308B\u3002"),Ee("jp",["akatsuki","\u6681 20","AK-20",1967,"FR","inline6"],[151,1110,6.8,197,.98,1.06,1.15,5],["#e1d7b1","#4c382a","roadster",[4.21,1.6,1.18],[-.8,-.52,-.2,.26,.71,.56],[-.62,.57],[.27,.157,10],"oval","round-two",{chrome:!0,exhaust:2}],"\u7D30\u3044\u30D4\u30E9\u30FC\u3068\u9577\u3044\u30DC\u30F3\u30CD\u30C3\u30C8\u3092\u6301\u3064GT\u3002\u5C0F\u5F84\u30BF\u30A4\u30E4\u3068\u7D20\u76F4\u306A\u52A0\u901F\u3067\u3001\u4E01\u5BE7\u306A\u8377\u91CD\u79FB\u52D5\u304C\u6C7A\u307E\u308B\u3002"),Ee("jp",["toki","\u6731\u9DFA R2","TK-R2",1969,"FR","rotary"],[132,925,6.9,193,.96,1.09,1.18,4],["#e8e3d2","#262828","aero",[4.13,1.59,1.13],[-.96,-.68,-.18,.34,.7,.59],[-.57,.57],[.255,.148,6],"slit","round-two",{chrome:!0}],"\u9577\u3044\u30D5\u30A1\u30B9\u30C8\u30D0\u30C3\u30AF\u3068\u8584\u3044\u30CE\u30FC\u30BA\u304C\u7279\u5FB4\u306E\u30ED\u30FC\u30BF\u30EA\u30FC\u8ECA\u3002\u56DE\u8EE2\u3092\u4FDD\u3063\u3066\u30B3\u30FC\u30CA\u30FC\u3092\u3064\u306A\u3050\u3068\u901F\u3044\u3002"),Ee("jp",["hayate","\u75BE\u98A8 GT-S","HY-GT",1971,"FR","inline6"],[169,1170,7.1,211,.95,1.01,1.22,5],["#c6c2b2","#2a3034","notch",[4.38,1.69,1.36],[-.75,-.43,.03,.45,.79,.65],[-.59,.58],[.282,.177,8],"quad-round","round-four",{chrome:!0,lower:"trim"}],"\u5F35\u308A\u51FA\u3057\u305F\u30EA\u30A2\u30D5\u30A7\u30F3\u30C0\u30FC\u3068\u4E38\u5F62\u56DB\u706F\u3002\u4F4E\u3081\u306E\u30AE\u30A2\u3067\u51FA\u53E3\u3092\u72D9\u3046\u5F80\u5E74\u306E\u30C4\u30FC\u30EA\u30F3\u30B0\u30AF\u30FC\u30DA\u3002"),Ee("jp",["hanabishi","\u82B1\u83F1 16","HB-16",1973,"FR","inline4"],[116,875,6.7,184,.96,1.17,1.17,5],["#ba6b39","#31251c","notch",[3.94,1.56,1.32],[-.72,-.46,.08,.47,.78,.6],[-.6,.57],[.262,.157,4],"mesh-round","matrix",{chrome:!0}],"\u7D30\u8EAB\u306E\u30DC\u30C7\u30A3\u306B\u8EFD\u5FEB\u306A4\u6C17\u7B52\u3092\u7D44\u307F\u5408\u308F\u305B\u305F\u5C0F\u578B\u30AF\u30FC\u30DA\u3002\u30D6\u30EC\u30FC\u30AD\u3092\u6B8B\u3059\u3068\u524D\u8F2A\u304C\u5165\u308A\u3084\u3059\u3044\u3002"),Ee("jp",["atsuki","\u539A\u6728 RS","AT-RS",1976,"FR","inline4"],[137,980,7.2,191,1,1.12,1.21,5],["#d78c3c","#342d2b","rally",[4.1,1.64,1.36],[-.75,-.57,.13,.47,.8,.64],[-.59,.57],[.271,.17,5],"quad-round","segments",{lower:"trim",stripes:!0,spoiler:"duck"}],"\u5C0F\u3055\u306A\u30C0\u30C3\u30AF\u30C6\u30FC\u30EB\u3068\u5F35\u308A\u51FA\u3057\u305F\u30D5\u30A7\u30F3\u30C0\u30FC\u3067\u56FA\u3081\u305F\u5CE0\u4ED5\u69D8\u3002\u5DE6\u53F3\u306E\u5207\u308A\u8FD4\u3057\u306B\u5F37\u3044\u3002"),Ee("jp",["kasumi","\u971E 21","KS-21",1978,"FR","rotary"],[145,1020,7,196,.98,1.08,1.23,5],["#667c52","#25332a","coupe",[4.26,1.65,1.21],[-.89,-.57,-.06,.49,.78,.6],[-.58,.57],[.276,.166,4],"popup","segments",{lower:"trim"}],"\u9577\u3044\u30C9\u30A2\u3068\u30EA\u30C8\u30E9\u30AF\u30BF\u30D6\u30EB\u30E9\u30A4\u30C8\u306E\u521D\u671F\u30ED\u30FC\u30BF\u30EA\u30FC\u3002\u72ED\u3044\u8DEF\u9762\u3067\u3082\u30B9\u30ED\u30C3\u30C8\u30EB\u3067\u30EA\u30A2\u3092\u8ABF\u6574\u3057\u3084\u3059\u3044\u3002"),Ee("jp",["komet","\u7B92\u661F 28","KM-28",1981,"FR","inline6+"],[184,1205,7.5,215,.99,1.04,1.25,5],["#c4a86c","#382e2c","notch",[4.47,1.71,1.29],[-.86,-.45,-.14,.3,.75,.56],[-.6,.53],[.285,.181,6],"quad-round","band",{chrome:!0,spoiler:"duck",exhaust:2}],"\u9577\u3044\u30CE\u30FC\u30BA\u3092\u6301\u3064\u904E\u7D66\u5F0F\u30B0\u30E9\u30F3\u30C9\u30C4\u30A2\u30E9\u30FC\u3002\u9AD8\u901F\u306E\u66F2\u7DDA\u3067\u306F\u8235\u3092\u5C0F\u3055\u304F\u5F53\u3066\u308B\u3068\u4F38\u3073\u3092\u751F\u304B\u305B\u308B\u3002"),Ee("jp",["karasu","\u70CF\u4E38 20T","KR-20",1984,"FR","inline4+"],[191,1115,7.9,221,.99,1.09,1.25,5],["#343e52","#13191f","notch",[4.4,1.7,1.28],[-.73,-.49,.05,.46,.76,.59],[-.59,.61],[.289,.182,7],"rect","matrix",{spoiler:"blade",lower:"panda"}],"\u30D5\u30E9\u30C3\u30C8\u306A\u30CE\u30C3\u30C1\u30D0\u30C3\u30AF\u306B\u30BF\u30FC\u30DC\u3092\u642D\u8F09\u3002\u92ED\u3044\u4E2D\u9593\u52A0\u901F\u3092\u4F7F\u3044\u3001\u51FA\u53E3\u3067\u4E00\u6C17\u306B\u901F\u5EA6\u3092\u53D6\u308A\u623B\u3059\u3002"),Ee("jp",["kumo","\u96F2\u96C0 T","KU-12",1986,"FF","inline4+"],[122,790,7,180,1.03,1.26,.86,5],["#ffe0a0","#3e3634","hatch",[3.58,1.5,1.37],[-.97,-.83,.31,.62,.84,.67],[-.6,.61],[.246,.151,8],"rect","upright",{lower:"panda",spoiler:"blade"}],"\u77ED\u3044\u8ECA\u4F53\u3068\u8EFD\u3044\u9F3B\u5148\u306E\u30DB\u30C3\u30C8\u30CF\u30C3\u30C1\u3002\u96E8\u306E\u65E5\u3067\u3082\u30B9\u30ED\u30C3\u30C8\u30EB\u3092\u623B\u3059\u3060\u3051\u3067\u9032\u8DEF\u3092\u4FEE\u6B63\u3057\u3084\u3059\u3044\u3002"),Ee("jp",["sazanami","\u6F23 32","SN-32",1987,"FR","inline6+"],[238,1490,7.8,236,1.02,.98,1.16,5],["#62516d","#26222f","landau",[4.72,1.82,1.36],[-.93,-.6,.05,.44,.8,.63],[-.57,.52],[.304,.21,9],"popup-round","band",{spoiler:"duck",exhaust:2}],"\u76F4\u52176\u6C17\u7B52\u30BF\u30FC\u30DC\u3092\u7A4D\u3080\u9577\u8DDD\u96E2GT\u3002\u8ECA\u91CD\u3092\u611F\u3058\u308B\u5206\u3001\u9577\u3044\u4E0B\u308A\u3067\u306E\u5B89\u5B9A\u611F\u304C\u3042\u308B\u3002"),Ee("jp",["yukitsuba","\u96EA\u693F 4","YT-44",1989,"4WD","inline4+"],[214,1150,8.2,218,1.13,1.17,.88,5],["#d5dee7","#393450","rally",[3.89,1.66,1.39],[-.91,-.73,.24,.54,.77,.64],[-.59,.64],[.284,.189,5],"rally-round","upright",{spoiler:"bridge",lower:"trim"}],"\u88DC\u52A9\u706F\u3068\u5927\u304D\u306A\u30EA\u30A2\u30A6\u30A4\u30F3\u30B0\u3092\u5099\u3048\u305F\u56DB\u8F2A\u99C6\u52D5\u30E9\u30EA\u30FC\u8ECA\u3002\u6ED1\u308A\u3084\u3059\u3044\u8DEF\u9762\u3067\u3082\u51FA\u53E3\u3067\u3057\u3063\u304B\u308A\u8E74\u308B\u3002"),Ee("jp",["tsukikage","\u6708\u5F71 16","TG-16",1990,"FR","inline4"],[124,920,6.9,189,1.02,1.22,1.06,5],["#b9473e","#2b2025","roadster",[3.97,1.67,1.15],[-.63,-.4,.09,.47,.75,.69],[-.57,.57],[.267,.171,7],"popup","round-two",{roof:"open"}],"\u4F4E\u3044\u30B7\u30FC\u30C8\u3068\u77ED\u3044\u30C6\u30FC\u30EB\u306E\u30AA\u30FC\u30D7\u30F3FR\u3002\u63E1\u308A\u8FBC\u307E\u305A\u306B\u8235\u3092\u623B\u3059\u3068\u3001\u8EFD\u3044\u5F8C\u8F2A\u304C\u81EA\u7136\u306B\u8FFD\u5F93\u3059\u308B\u3002"),Ee("jp",["nagisa","\u6E1A LX","NG-LX",1991,"MR","inline6"],[278,1315,8.8,257,1.12,1.15,.93,5],["#9d3034","#25272c","aero",[4.43,1.82,1.15],[-.76,-.48,.19,.56,.76,.65],[-.6,.59],[.3,.224,7],"slit","band",{inlet:!0,spoiler:"bridge",exhaust:2}],"\u8584\u3044\u30AD\u30E3\u30D3\u30F3\u3068\u30EF\u30A4\u30C9\u306A\u5074\u9762\u5438\u6C17\u53E3\u3092\u6301\u3064\u30DF\u30C3\u30C9\u30B7\u30C3\u30D7\u3002\u9AD8\u901F\u306E\u5207\u308A\u8FD4\u3057\u3067\u59FF\u52E2\u304C\u843D\u3061\u7740\u304D\u3084\u3059\u3044\u3002"),Ee("jp",["kanata","\u5F7C\u65B9 VZ","KT-VZ",1993,"FR","inline6+"],[299,1485,8.9,265,1.04,1.01,1.24,6],["#41576e","#263340","coupe",[4.52,1.85,1.28],[-.92,-.56,-.01,.38,.8,.65],[-.61,.55],[.315,.225,5],"projector","round-four",{spoiler:"pedestal",exhaust:2}],"\u6E67\u304D\u4E0A\u304C\u308B\u3088\u3046\u306A\u52A0\u901F\u304C\u6301\u3061\u5473\u306E\u30C4\u30A4\u30F3\u30BF\u30FC\u30DC\u3002\u5927\u578B\u30A6\u30A4\u30F3\u30B0\u3068\u9577\u3044\u30DB\u30A4\u30FC\u30EB\u30D9\u30FC\u30B9\u3067\u9AD8\u901F\u57DF\u306B\u5F37\u3044\u3002"),Ee("jp",["murasame","\u6751\u96E8 WR","MS-WR",1995,"4WD","boxer4+"],[263,1220,8.9,236,1.2,1.1,.83,5],["#36508d","#262b45","rally",[4.32,1.71,1.43],[-.74,-.46,.31,.53,.8,.67],[-.6,.6],[.305,.206,6],"rally-round","matrix",{doors:4,spoiler:"pedestal",lower:"trim"}],"\u6C34\u5E73\u5BFE\u5411\u30BF\u30FC\u30DC\u306E\u4F4E\u91CD\u5FC3\u30BB\u30C0\u30F3\u3002\u7E01\u77F3\u306E\u51FA\u5165\u308A\u3084\u96E8\u306E\u7ACB\u3061\u4E0A\u304C\u308A\u3067\u3082\u99C6\u52D5\u529B\u3092\u639B\u3051\u3084\u3059\u3044\u3002"),Ee("jp",["yamabuki","\u5C71\u5439 EV","YB-EV",1997,"4WD","inline4+"],[285,1270,9,241,1.18,1.13,.85,5],["#e5cc44","#33303a","rally",[4.37,1.77,1.4],[-.71,-.39,.25,.52,.78,.65],[-.6,.62],[.311,.211,7],"projector","hockey",{doors:4,spoiler:"pedestal",inlet:!0}],"\u77ED\u3044\u30AE\u30A2\u6BD4\u3067\u7ACB\u3061\u4E0A\u304C\u308A\u3092\u72D9\u3046\u56DB\u8F2A\u99C6\u52D5\u3002\u6025\u52FE\u914D\u3067\u3082\u52A0\u901F\u304C\u9014\u5207\u308C\u306B\u304F\u3044\u3002"),Ee("jp",["satsuki","\u7690\u6708 4T","ST-4T",1998,"4WD","boxer4+"],[251,1430,8.2,231,1.15,1,.91,5],["#7c8c79","#313b33","wagon",[4.67,1.75,1.52],[-.98,-.85,.2,.53,.82,.72],[-.61,.62],[.306,.205,10],"projector","upright",{doors:4,spoiler:"blade",exhaust:2}],"\u9577\u3044\u30EB\u30FC\u30D5\u306E\u56DB\u8F2A\u99C6\u52D5\u30EF\u30B4\u30F3\u3002\u6ED1\u308A\u3084\u3059\u3044\u9577\u3044\u30AB\u30FC\u30D6\u3067\u5F8C\u8F2A\u306E\u52D5\u304D\u3092\u8AAD\u307F\u3084\u3059\u3044\u3002"),Ee("jp",["tachibana","\u6A58 S2","TB-S2",1999,"FR","inline4"],[242,1230,8.3,241,1.1,1.14,1.12,6],["#a75f23","#302519","roadster",[4.17,1.75,1.17],[-.65,-.42,-.15,.37,.76,.67],[-.57,.59],[.295,.198,5],"slit","hockey",{roof:"open",exhaust:2}],"\u9AD8\u56DE\u8EE2\u578B\u306E\u81EA\u7136\u5438\u6C17\u30AA\u30FC\u30D7\u30F3\u30022\u901F\u304B\u30893\u901F\u3078\u3064\u306A\u304E\u306A\u304C\u3089\u3001\u524D\u5F8C\u306E\u8377\u91CD\u3092\u7D30\u304B\u304F\u5909\u3048\u3089\u308C\u308B\u3002"),Ee("jp",["oboro","\u6727 LZ","OB-LZ",1999,"FR","inline4+"],[248,1190,8.5,246,1.03,1.14,1.28,6],["#cabec4","#33313b","coupe",[4.43,1.73,1.27],[-.87,-.55,-.04,.42,.8,.64],[-.59,.59],[.287,.196,6],"slit","hockey",{spoiler:"blade",inlet:!0}],"\u7D30\u304F\u4F38\u3073\u308B\u30D8\u30C3\u30C9\u30E9\u30A4\u30C8\u3068\u89D2\u306E\u3042\u308B\u30EA\u30A2\u3092\u6301\u3064\u30BF\u30FC\u30DCFR\u3002\u30A2\u30AF\u30BB\u30EB\u3092\u5C11\u3057\u629C\u304F\u3068\u30B9\u30E9\u30A4\u30C9\u3092\u6574\u3048\u3084\u3059\u3044\u3002"),Ee("de",["pfalzer","\u30D7\u30D5\u30A1\u30EB\u30C4 16","PF-16",1964,"RR","boxer4"],[93,925,5.8,163,.93,1.02,1.05,4],["#cec0a5","#49453d","bubble",[4,1.58,1.33],[-.94,-.48,.17,.47,.77,.6],[-.61,.59],[.261,.151,12],"bug-eye","round-two",{chrome:!0,rearGrille:!0}],"\u4E38\u5C4B\u6839\u3068\u7D5E\u308A\u8FBC\u3093\u3060\u30C6\u30FC\u30EB\u306E\u7A7A\u51B7\u8ECA\u3002\u91CD\u3044\u30EA\u30A2\u3092\u4E0A\u624B\u306B\u4F7F\u3046\u3068\u72ED\u3044\u4E0A\u308A\u3067\u3088\u304F\u66F2\u304C\u308B\u3002"),Ee("de",["rhein","\u30E9\u30A4\u30F3 02","RH-02",1973,"FR","inline4+"],[172,1090,7.4,214,1.01,1.12,1.16,4],["#d9dad5","#222b2b","notch",[4.2,1.64,1.38],[-.71,-.48,.29,.53,.77,.66],[-.62,.57],[.276,.173,8],"mesh-round","round-two",{chrome:!0,lower:"trim",spoiler:"duck"}],"\u89D2\u578B\u306E\u5C0F\u578B\u30BB\u30C0\u30F3\u306B\u5927\u304D\u306A\u30DB\u30A4\u30FC\u30EB\u30A2\u30FC\u30C1\u3002\u666E\u6BB5\u306F\u7A4F\u3084\u304B\u3060\u304C\u3001\u904E\u7D66\u304C\u4E0A\u304C\u308B\u3068\u4F38\u3073\u304C\u5897\u3059\u3002"),Ee("de",["berg","\u30D9\u30EB\u30AF Q4","BE-Q4",1984,"4WD","inline6+"],[268,1300,8.6,232,1.18,1.01,.89,5],["#efe4c9","#40362e","silhouette",[4.22,1.82,1.35],[-.97,-.71,.12,.52,.73,.58],[-.56,.62],[.311,.214,10],"quad-round","band",{spoiler:"bridge",stripes:!0,lower:"trim"}],"\u77ED\u3044\u30C6\u30FC\u30EB\u3068\u89D2\u5F35\u3063\u305F\u30D5\u30A7\u30F3\u30C0\u30FC\u306E\u56DB\u8F2A\u99C6\u52D5\u3002\u6FE1\u308C\u305F\u5CE0\u3067\u3082\u6DF1\u304F\u8E0F\u3093\u3067\u99C6\u52D5\u3092\u4F7F\u3048\u308B\u3002"),Ee("de",["falken","\u30D5\u30A1\u30EB\u30B1\u30F3 30","FK-30",1988,"FR","inline4"],[210,1210,8,237,1.08,1.13,1.16,5],["#ded9cf","#313137","notch",[4.33,1.68,1.36],[-.76,-.48,.18,.53,.81,.66],[-.59,.63],[.291,.203,12],"quad-round","segments",{spoiler:"bridge",exhaust:2}],"\u524D\u5F8C\u306E\u7A7A\u529B\u30D1\u30FC\u30C4\u3092\u6301\u3064\u30C4\u30FC\u30EA\u30F3\u30B0\u30AB\u30FC\u3002\u6BD4\u8F03\u7684\u306B\u8E0F\u529B\u3092\u6B8B\u3057\u305F\u533A\u9593\u3067\u3082\u9032\u884C\u65B9\u5411\u3092\u5408\u308F\u305B\u3084\u3059\u3044\u3002"),Ee("de",["silber","\u30B8\u30EB\u30D0\u30FC 16V","SL-16",1990,"FR","inline4"],[228,1325,8,245,1.06,1.05,1.07,5],["#a9a8aa","#343234","landau",[4.46,1.74,1.41],[-.73,-.44,.29,.49,.81,.67],[-.6,.6],[.298,.207,15],"rect","matrix",{doors:4,spoiler:"pedestal",lower:"panda"}],"\u76F4\u7DDA\u7684\u306A4\u30C9\u30A2\u306B\u7FFC\u65AD\u9762\u306E\u30A6\u30A4\u30F3\u30B0\u3002\u4F4E\u3081\u306E\u56DE\u8EE2\u3067\u3082\u30A2\u30AF\u30BB\u30EB\u306B\u7A4F\u3084\u304B\u306B\u53CD\u5FDC\u3059\u308B\u3002"),Ee("de",["fluss","\u30D5\u30EB\u30B9 16","FL-16",1989,"FF","inline4"],[142,990,7.2,202,1.09,1.18,.86,5],["#528f89","#2b393b","hatch",[3.95,1.65,1.44],[-.98,-.82,.27,.62,.86,.72],[-.57,.63],[.287,.178,8],"quad-round","matrix",{lower:"trim",spoiler:"blade"}],"\u5207\u308A\u7ACB\u3063\u305F\u30EA\u30A2\u30684\u706F\u306E\u30CF\u30C3\u30C1\u30D0\u30C3\u30AF\u3002\u30A2\u30AF\u30BB\u30EB\u3092\u7DE9\u3081\u308C\u3070\u524D\u8F2A\u304C\u72D9\u3044\u306B\u623B\u308B\u7D20\u76F4\u306A\u8ECA\u3002"),Ee("de",["inn","\u30A4\u30F3 RR","IN-RR",1996,"RR","flat6"],[288,1360,8.5,273,1.12,1.1,1.07,6],["#7486a1","#2b3044","bubble",[4.26,1.8,1.29],[-.94,-.46,.21,.61,.76,.57],[-.65,.59],[.308,.226,5],"bug-eye","band",{spoiler:"duck",rearGrille:!0,exhaust:2}],"\u7A7A\u51B7\u30D5\u30E9\u30C3\u30C86\u306E\u30E9\u30A6\u30F3\u30C9\u30DC\u30C7\u30A3\u3002\u9AD8\u901F\u3092\u4FDD\u3063\u305F\u307E\u307E\u9577\u304F\u65CB\u56DE\u3059\u308B\u3068\u5F8C\u8F2A\u8377\u91CD\u3092\u4F7F\u3048\u308B\u3002"),Ee("it",["monte","\u30E2\u30F3\u30C6 16","MT-16",1968,"FR","inline4"],[129,984,6.7,193,.98,1.1,1.17,5],["#9f382a","#3a3029","notch",[4.07,1.57,1.27],[-.82,-.52,.03,.45,.81,.63],[-.62,.59],[.264,.153,7],"quad-round","round-two",{chrome:!0,lower:"trim"}],"\u7D30\u3044\u30E1\u30C3\u30AD\u30E2\u30FC\u30EB\u3068\u4E8C\u6BB5\u30CE\u30FC\u30BA\u306E\u5C0F\u578BGT\u3002\u9AD8\u56DE\u8EE2\u3067\u3064\u306A\u3050\u307B\u3069\u8EFD\u3044\u30DC\u30C7\u30A3\u304C\u751F\u304D\u308B\u3002"),Ee("it",["corsa","\u30B3\u30EB\u30B5 18","CS-18",1970,"FR","inline4"],[148,1010,7,198,1,1.11,1.19,5],["#a68a49","#362829","roadster",[4.15,1.64,1.12],[-.69,-.46,-.19,.33,.71,.58],[-.61,.55],[.274,.163,12],"vintage","vertical",{roof:"open",chrome:!0}],"\u9F3B\u5148\u306E\u4E38\u706F\u3068\u30E1\u30C3\u30AD\u30D0\u30F3\u30D1\u30FC\u3092\u5099\u3048\u308B\u30AA\u30FC\u30D7\u30F3GT\u3002\u30D6\u30EC\u30FC\u30AD\u3068\u8235\u306E\u52D5\u304D\u304C\u7A4F\u3084\u304B\u306B\u4F1D\u308F\u308B\u3002"),Ee("it",["lupo","\u30EB\u30FC\u30DD HF","LU-HF",1976,"MR","inline6"],[196,958,8.1,231,1.06,1.23,1.14,5],["#4d8d6b","#303a31","aero",[3.83,1.78,1.1],[-.51,-.34,.18,.72,.8,.65],[-.62,.58],[.282,.224,5],"rally-round","round-two",{spoiler:"duck",stripes:!0,inlet:!0,exhaust:2}],"\u6975\u7AEF\u306B\u77ED\u3044\u8ECA\u4F53\u3068\u5E83\u3044\u30D5\u30ED\u30F3\u30C8\u30AC\u30E9\u30B9\u304C\u7279\u5FB4\u3002\u30BF\u30A4\u30C8\u30B3\u30FC\u30CA\u30FC\u3067\u8EFD\u3044\u65CB\u56DE\u3068\u7ACB\u3061\u4E0A\u304C\u308A\u3092\u4E21\u7ACB\u3059\u308B\u3002"),Ee("it",["varco","\u30F4\u30A1\u30EB\u30B3 4S","VA-4S",1986,"4WD","inline4+"],[244,1170,8.5,228,1.17,1.1,.94,5],["#dedbd1","#5a3430","rally",[3.93,1.78,1.4],[-.98,-.76,.18,.54,.81,.65],[-.61,.6],[.294,.204,9],"quad-round","vertical",{spoiler:"bridge",stripes:!0,lower:"panda",inlet:!0}],"\u5927\u304D\u306A\u5438\u6C17\u53E3\u3092\u6301\u3064\u56DB\u8F2A\u99C6\u52D5\u306E\u7AF6\u6280\u7528\u30CF\u30C3\u30C1\u3002\u96E8\u3068\u6025\u52FE\u914D\u3067\u4F7F\u3044\u3084\u3059\u3044\u592A\u3044\u30C8\u30EB\u30AF\u3092\u6301\u3064\u3002"),Ee("it",["duomo","\u30C7\u30E5\u30AA\u30E2 TT","DU-TT",1989,"MR","v8+"],[438,1260,9.9,304,1.11,1.02,1.02,5],["#b33b31","#372527","silhouette",[4.45,1.98,1.12],[-.75,-.49,.1,.6,.78,.61],[-.58,.63],[.324,.253,5],"popup-round","round-four",{spoiler:"tower",inlet:!0,exhaust:2}],"\u9AD8\u304F\u7ACB\u3061\u4E0A\u304C\u308B\u30EA\u30A2\u30A6\u30A4\u30F3\u30B0\u306E\u30C4\u30A4\u30F3\u30BF\u30FC\u30DC\u3002\u76F4\u7DDA\u306E\u4F38\u3073\u304C\u826F\u304F\u3001\u65E9\u3081\u306E\u30D6\u30EC\u30FC\u30AD\u30F3\u30B0\u3067\u6301\u3061\u5473\u304C\u51FA\u308B\u3002"),Ee("it",["ponte","\u30DD\u30F3\u30C6 V8","PT-V8",1997,"MR","v8"],[342,1375,9,275,1.12,1.14,.95,6],["#d2ab3a","#322b2c","aero",[4.26,1.88,1.15],[-.85,-.52,.18,.63,.75,.61],[-.63,.58],[.309,.229,5],"slit","round-four",{inlet:!0,spoiler:"duck",exhaust:2}],"\u3048\u3050\u308C\u305F\u5074\u9762\u3068\u4F4E\u3044\u30D5\u30ED\u30F3\u30C8\u306EV8\u30AF\u30FC\u30DA\u3002\u64CD\u8235\u306B\u5BFE\u3059\u308B\u53CD\u5FDC\u304C\u901F\u304F\u3001\u4E2D\u901F\u30B3\u30FC\u30CA\u30FC\u3092\u3064\u306A\u3052\u3084\u3059\u3044\u3002"),Ee("gb",["glen","\u30B0\u30EC\u30F3 13","GL-13",1965,"FF","inline4"],[81,670,6,153,.99,1.22,.91,4],["#457a57","#2c4334","bubble",[3.16,1.39,1.39],[-.97,-.85,.37,.74,.88,.73],[-.67,.62],[.24,.137,8],"mesh-round","upright",{chrome:!0}],"\u8ECA\u8F2A\u3092\u56DB\u9685\u306B\u7F6E\u3044\u305F\u5C0F\u578BFF\u3002\u66F2\u304C\u308B\u533A\u9593\u3067\u8ECA\u4F53\u306E\u8EFD\u3055\u3092\u751F\u304B\u3057\u3001\u6E1B\u901F\u3092\u6291\u3048\u3066\u8D70\u308B\u3002"),Ee("gb",["wyvern","\u30EF\u30A4\u30D0\u30FC\u30F3 26","WY-26",1971,"FR","inline6"],[198,1260,7.8,224,.98,1.01,1.18,4],["#54434c","#26242a","roadster",[4.56,1.68,1.21],[-.92,-.59,-.29,.14,.72,.56],[-.61,.53],[.29,.177,16],"oval","round-two",{chrome:!0,exhaust:2}],"\u30DC\u30F3\u30CD\u30C3\u30C8\u306E\u9577\u3044\u82F1\u56FDGT\u3002\u9032\u5165\u3067\u8377\u91CD\u3092\u524D\u306B\u304B\u3051\u3001\u51FA\u53E3\u3067\u76F4\u52176\u6C17\u7B52\u306E\u7C98\u308A\u3092\u751F\u304B\u3059\u3002"),Ee("gb",["foxley","\u30D5\u30A9\u30C3\u30AF\u30B9\u30EA\u30FC S4","FX-S4",1974,"FR","inline4"],[146,725,8,211,1.04,1.3,1.1,4],["#d9952a","#49382a","roadster",[3.65,1.56,1.08],[-.69,-.48,-.15,.35,.72,.6],[-.58,.61],[.258,.157,5],"vintage","vertical",{roof:"open",stripes:!0,chrome:!0}],"\u8584\u3044\u5C4B\u6839\u306A\u3057\u30DC\u30C7\u30A3\u306B\u8EFD\u91CF\u30B7\u30E3\u30B7\u30FC\u3002\u5165\u529B\u3092\u5C0F\u3055\u304F\u523B\u3080\u3068\u9023\u7D9A\u30B3\u30FC\u30CA\u30FC\u306E\u51FA\u53E3\u304C\u305D\u308D\u3046\u3002"),Ee("gb",["sherwood","\u30B7\u30E3\u30FC\u30A6\u30C3\u30C9 TM","SW-TM",1987,"MR","inline4+"],[218,1090,8.3,237,1.08,1.19,1.01,5],["#cdc8d1","#333445","aero",[4.15,1.8,1.13],[-.76,-.44,.05,.6,.72,.63],[-.6,.64],[.298,.212,6],"popup","band",{inlet:!0,spoiler:"bridge"}],"\u76F4\u7DDA\u3092\u591A\u7528\u3057\u305F\u8EFD\u91CF\u30DF\u30C3\u30C9\u30B7\u30C3\u30D7\u3002\u4E2D\u901F\u3067\u306E\u8235\u306E\u623B\u308A\u304C\u8EFD\u304F\u3001\u9AD8\u4F4E\u5DEE\u306E\u3042\u308B\u533A\u9593\u3092\u72D9\u3048\u308B\u3002"),Ee("gb",["hale","\u30D8\u30A4\u30EB V8","HA-V8",1996,"FR","v8"],[306,1125,9.2,265,1.03,1.11,1.26,5],["#69418c","#28213b","coupe",[4.03,1.77,1.21],[-.82,-.51,-.18,.24,.77,.64],[-.59,.59],[.294,.221,7],"bug-eye","round-four",{roof:"open",inlet:!0,exhaust:2}],"\u77ED\u3044\u8ECA\u4F53\u306B\u5927\u6392\u6C17\u91CFV8\u3092\u8A70\u3081\u305F\u30AA\u30FC\u30D7\u30F3FR\u3002\u51FA\u53E3\u3067\u306F\u5F8C\u8F2A\u3092\u6ED1\u3089\u305B\u305A\u306B\u8E0F\u91CF\u3092\u8ABF\u6574\u3057\u305F\u3044\u3002"),Ee("fr",["miroir","\u30DF\u30ED\u30EF\u30FC\u30EB 13","MR-13",1972,"RR","inline4"],[144,720,7.4,206,.99,1.2,1.16,5],["#366cad","#243551","bubble",[3.86,1.55,1.13],[-.95,-.58,-.08,.52,.71,.56],[-.63,.62],[.257,.167,7],"rally-round","round-two",{chrome:!0,rearGrille:!0,lower:"trim"}],"\u77ED\u3044\u30CE\u30FC\u30BA\u306B4\u706F\u3092\u4E26\u3079\u305F\u30EA\u30A2\u30A8\u30F3\u30B8\u30F3\u8ECA\u3002\u5C0F\u67C4\u306A\u8ECA\u4F53\u3067\u30D8\u30A2\u30D4\u30F3\u306E\u5185\u5074\u3092\u72D9\u3044\u3084\u3059\u3044\u3002"),Ee("fr",["seine","\u30BB\u30FC\u30CC GT","SE-GT",1985,"FF","inline4+"],[128,795,6.9,201,1.09,1.24,.85,5],["#aa4137","#3d2826","hatch",[3.55,1.58,1.36],[-.97,-.82,.33,.58,.86,.69],[-.64,.61],[.259,.163,6],"rect","upright",{spoiler:"blade",lower:"panda"}],"\u8ECA\u5E45\u3092\u5E83\u3052\u305F\u8EFD\u91CF\u30DB\u30C3\u30C8\u30CF\u30C3\u30C1\u3002\u5742\u306E\u624B\u524D\u3067\u5C0F\u3055\u304F\u8377\u91CD\u3092\u524D\u3078\u5BC4\u305B\u308B\u3068\u7D20\u76F4\u306B\u66F2\u304C\u308B\u3002"),Ee("fr",["roux","\u30EB\u30FC GT6","RX-6",1994,"FF","inline4"],[172,1050,7.8,221,1.13,1.2,.85,6],["#b6a56b","#3d352d","hatch",[4.03,1.71,1.38],[-.93,-.74,.28,.56,.86,.69],[-.61,.6],[.288,.186,6],"slit","hockey",{lower:"trim"}],"\u7D30\u3044\u30E9\u30A4\u30C8\u30686\u901F\u30AE\u30A2\u306E\u81EA\u7136\u5438\u6C17\u30CF\u30C3\u30C1\u3002\u5165\u529B\u306B\u5BFE\u3059\u308B\u9045\u308C\u304C\u5C0F\u3055\u304F\u3001\u72ED\u3044\u9023\u7D9A\u30B3\u30FC\u30CA\u30FC\u5411\u304D\u3002"),Ee("se",["norden","\u30CE\u30EB\u30C7\u30F3 T","ND-24",1985,"FR","inline4+"],[179,1340,7.2,210,1.01,.99,1.19,5],["#687e76","#2e3834","wagon",[4.74,1.73,1.53],[-.99,-.9,.24,.52,.86,.75],[-.59,.63],[.286,.185,10],"rect","vertical",{doors:4,lower:"panda"}],"\u89D2\u5F35\u3063\u305F\u5317\u6B27\u30EF\u30B4\u30F3\u306B\u30BF\u30FC\u30DC\u3092\u642D\u8F09\u3002\u9577\u3044\u30DB\u30A4\u30FC\u30EB\u30D9\u30FC\u30B9\u306E\u5B89\u5B9A\u611F\u3068FR\u306E\u65CB\u56DE\u3092\u4F75\u305B\u6301\u3064\u3002"),Ee("cz",["morava","\u30E2\u30E9\u30F4\u30A1 R","MV-12",1977,"RR","inline4"],[114,825,6.7,182,.98,1.13,1.18,5],["#d3994b","#412f24","notch",[3.97,1.59,1.35],[-.72,-.52,.22,.6,.77,.66],[-.6,.61],[.264,.171,5],"rally-round","segments",{stripes:!0,chrome:!0,rearGrille:!0}],"\u30EA\u30A2\u30A8\u30F3\u30B8\u30F3\u306E\u5C0F\u578B\u7AF6\u6280\u30AF\u30FC\u30DA\u3002\u4E00\u77AC\u30D6\u30EC\u30FC\u30AD\u3092\u6B8B\u3057\u3066\u9F3B\u3092\u5165\u308C\u308B\u3068\u3001\u8EFD\u3044\u8ECA\u4F53\u304C\u5411\u304D\u3092\u5909\u3048\u308B\u3002"),Ee("us",["mesa","\u30E1\u30B5 60","ME-60",1960,"FR","v8"],[265,1610,7.5,214,.87,.9,1.17,3],["#569fb0","#354453","landau",[5,1.92,1.42],[-.69,-.44,-.03,.38,.8,.65],[-.57,.53],[.322,.181,16],"quad-round","round-two",{chrome:!0,exhaust:2}],"\u5E45\u306E\u5E83\u3044\u30AF\u30ED\u30FC\u30E0\u30B0\u30EA\u30EB\u3068\u9577\u3044\u30C7\u30C3\u30AD\u3002\u7DE9\u3044\u30B3\u30FC\u30CA\u30FC\u3092\u5927\u304D\u306A\u534A\u5F84\u3067\u629C\u3051\u308B\u3068\u30C8\u30EB\u30AF\u304C\u751F\u304D\u308B\u3002"),Ee("us",["devil","\u30C7\u30D3\u30EB\u30BA 63","DV-63",1963,"FR","v8"],[310,1340,8.4,238,.97,1.01,1.19,4],["#d1d3d4","#2d3338","coupe",[4.45,1.78,1.18],[-.99,-.48,-.19,.21,.78,.59],[-.6,.54],[.295,.195,10],"popup","round-four",{chrome:!0,exhaust:2}],"\u77ED\u3044\u30AD\u30E3\u30D3\u30F3\u3068\u9577\u3044\u30D5\u30ED\u30F3\u30C8\u306EV8\u30B9\u30DD\u30FC\u30C4\u3002\u4E0B\u308A\u3067\u306F\u5927\u304D\u3044\u30AE\u30A2\u3092\u4F7F\u3046\u3068\u59FF\u52E2\u304C\u307E\u3068\u307E\u308A\u3084\u3059\u3044\u3002"),Ee("us",["bay","\u30D9\u30A4 289","BY-289",1965,"FR","v8"],[281,970,8.8,237,.96,1.1,1.27,4],["#4267a2","#282f39","roadster",[3.93,1.74,1.13],[-.72,-.42,-.18,.34,.78,.67],[-.6,.62],[.301,.211,6],"vintage","round-two",{roof:"open",chrome:!0,stripes:!0,exhaust:2}],"\u30B3\u30F3\u30D1\u30AF\u30C8\u306A\u30AA\u30FC\u30D7\u30F3\u30DC\u30C7\u30A3\u306BV8\u3092\u642D\u8F09\u3002\u77ED\u3044\u30AE\u30A2\u3068\u592A\u3044\u30C8\u30EB\u30AF\u3067\u30B9\u30E9\u30A4\u30C9\u3092\u9577\u304F\u3064\u306A\u3052\u308B\u3002"),Ee("us",["raptor","\u30E9\u30D7\u30BF\u30FC 69","RP-69",1969,"FR","v8"],[378,1650,8.8,249,.92,.9,1.27,4],["#ba672d","#322629","muscle",[5.21,1.97,1.36],[-.89,-.51,-.07,.3,.8,.62],[-.57,.57],[.332,.221,5],"slit","triple",{chrome:!0,spoiler:"tower",stripes:!0,exhaust:2}],"\u5927\u304D\u306A\u7FFC\u3092\u6301\u3064\u9AD8\u901F\u30AA\u30FC\u30D0\u30EB\u5411\u3051\u30AF\u30FC\u30DA\u3002\u5CE0\u3067\u306F\u30D6\u30EC\u30FC\u30AD\u3092\u65E9\u3081\u306B\u5F53\u3066\u3066\u9577\u3044\u8ECA\u4F53\u3092\u6271\u3046\u3002"),Ee("us",["firecrest","\u30D5\u30A1\u30A4\u30A2\u30AF\u30EC\u30B9\u30C8","FC-70",1970,"FR","v8"],[354,1550,8.7,247,.94,.94,1.3,4],["#d7a824","#372b22","muscle",[4.78,1.92,1.27],[-.95,-.59,-.1,.35,.82,.65],[-.61,.52],[.319,.225,5],"split-oval","matrix",{lower:"trim",spoiler:"duck",exhaust:2}],"\u4E8C\u5206\u5272\u306E\u30B0\u30EA\u30EB\u3068\u4F4E\u3044\u30EB\u30FC\u30D5\u3092\u6301\u3064\u30DE\u30C3\u30B9\u30EB\u30AB\u30FC\u3002\u6A2A\u5411\u304D\u306B\u306A\u3063\u305F\u3068\u3053\u308D\u304B\u3089\u56DE\u8EE2\u3092\u5408\u308F\u305B\u3084\u3059\u3044\u3002"),Ee("us",["horizon","\u30DB\u30E9\u30A4\u30BA\u30F3 76","HZ-76",1976,"FR","v8"],[236,1730,7.3,205,.9,.89,1.17,3],["#ab6c53","#462d32","landau",[5.1,1.94,1.44],[-.67,-.45,-.01,.3,.84,.71],[-.58,.51],[.307,.195,18],"quad-round","band",{chrome:!0,exhaust:2}],"\u5E73\u3089\u306A\u5C4B\u6839\u3068\u9577\u3044\u30C8\u30E9\u30F3\u30AF\u306E\u30E9\u30B0\u30B8\u30E5\u30A2\u30EA\u30FC\u30AF\u30FC\u30DA\u3002\u30A2\u30AF\u30BB\u30EB\u304C\u7A4F\u3084\u304B\u3067\u3001\u4E00\u5B9A\u901F\u5EA6\u3092\u4FDD\u3061\u3084\u3059\u3044\u3002"),Ee("us",["eclipse","\u30A8\u30AF\u30EA\u30D7\u30B9 Z","EC-Z",1984,"FR","v8"],[246,1410,8,233,1.03,.98,1.19,5],["#191f26","#38383b","silhouette",[4.8,1.84,1.23],[-.96,-.6,-.06,.39,.81,.64],[-.6,.57],[.31,.212,10],"popup","matrix",{spoiler:"bridge",inlet:!0,exhaust:2}],"\u30D6\u30E9\u30C3\u30AF\u30CE\u30FC\u30BA\u3068\u9577\u304F\u5BDD\u305F\u30EA\u30A2\u30AC\u30E9\u30B9\u304C\u7279\u5FB4\u3002\u9577\u3044\u30AB\u30FC\u30D6\u3067\u5C0F\u3055\u306A\u8235\u89D2\u3092\u4FDD\u3064\u3068\u4F38\u3073\u308B\u3002"),Ee("us",["sierra","\u30B7\u30A8\u30E9 TC","SI-TC",1988,"FR","inline6+"],[259,1540,8.4,241,1,.94,1.2,4],["#323740","#20252b","notch",[4.97,1.84,1.38],[-.7,-.53,-.03,.39,.84,.7],[-.58,.53],[.307,.217,5],"quad-round","matrix",{lower:"panda",inlet:!0,exhaust:2}],"\u9ED2\u3044\u89D2\u578B\u306E\u30BF\u30FC\u30DC\u30AF\u30FC\u30DA\u3002\u91CD\u3044\u8ECA\u4F53\u3092\u30C8\u30EB\u30AF\u3067\u524D\u306B\u51FA\u3057\u3001\u77ED\u3044\u76F4\u7DDA\u3067\u5DEE\u3092\u8A70\u3081\u308B\u3002"),Ee("us",["arrow","\u30A2\u30ED\u30FC ZR","AR-ZR",1990,"FR","v8"],[380,1490,9.3,278,1.09,1.04,1.19,6],["#af3639","#3a262c","silhouette",[4.53,1.9,1.19],[-.96,-.52,-.2,.29,.79,.62],[-.63,.61],[.326,.244,6],"popup-round","round-four",{lower:"panda",exhaust:2}],"\u5E83\u3044\u30EA\u30A2\u30BF\u30A4\u30E4\u3068\u8584\u3044\u30A6\u30A7\u30C3\u30B8\u30CE\u30FC\u30BA\u306EV8\u3002\u30AE\u30A2\u3092\u4E0A\u3052\u3066\u52A0\u901F\u3092\u843D\u3061\u7740\u304B\u305B\u308B\u3068\u9032\u8DEF\u304C\u6574\u3046\u3002"),Ee("us",["canyon","\u30AD\u30E3\u30CB\u30AA\u30F3 G","CY-G",1997,"FR","v8"],[421,1515,9.7,290,1.1,1.01,1.22,6],["#395c85","#292536","muscle",[4.5,1.94,1.2],[-.93,-.57,-.17,.26,.79,.65],[-.61,.62],[.332,.252,5],"slit","hockey",{stripes:!0,spoiler:"duck",inlet:!0,exhaust:2}],"\u5927\u6392\u6C17\u91CF\u3068\u9577\u3044\u30DC\u30F3\u30CD\u30C3\u30C8\u3092\u6301\u3064\u30EF\u30A4\u30C9\u30AF\u30FC\u30DA\u3002\u65E9\u3081\u306B\u6E1B\u901F\u3057\u3001\u7ACB\u3061\u4E0A\u304C\u308A\u3067\u52A0\u901F\u3092\u89E3\u653E\u3059\u308B\u3002")],Hn=Object.freeze([{id:"hachi",name:"\u767D\u9DF9 86",code:"HT-86",country:"\u65E5\u672C",year:1985,drive:"FR",layout:"FR",engineType:"inline4",turbo:!1,power:143,mass:930,accel:7,topSpeed:195,grip:.98,handling:1.16,drift:1.23,gears:5,paint:"#e3e5df",accent:"#191c21",description:"\u8EFD\u91CF\u306A\uFF13\u30C9\u30A2\u3002\u8377\u91CD\u79FB\u52D5\u306B\u7D20\u76F4\u306B\u53CD\u5FDC\u3057\u3001\u30BF\u30A4\u30C8\u306A\u9023\u7D9A\u30B3\u30FC\u30CA\u30FC\u3067\u5411\u304D\u3092\u5909\u3048\u3084\u3059\u3044\u3002",dimensions:[4.18,1.67,1.31],profile:Qp,cab:[-.9,-.6,.15,.44,.69,.58],axle:[-.59,.57],wheel:[.276,.177,8],front:"popup",rear:"segments",lower:"panda",exhaust:1},{id:"kagero",name:"\u967D\u708E R7",code:"KG-R7",country:"\u65E5\u672C",year:1992,drive:"FR",layout:"FR",engineType:"rotary",turbo:!0,power:255,mass:1270,accel:8.4,topSpeed:250,grip:1.03,handling:1.12,drift:1.14,gears:5,paint:"#d99b25",accent:"#20212a",description:"\u4F4E\u3044\u30CE\u30FC\u30BA\u3068\u8EFD\u5FEB\u306A\u5FDC\u7B54\u304C\u6301\u3061\u5473\u306E\u30ED\u30FC\u30BF\u30EA\u30FC\u30AF\u30FC\u30DA\u3002\u4E2D\u9AD8\u901F\u30B3\u30FC\u30CA\u30FC\u3067\u30EA\u30BA\u30E0\u3092\u3064\u304B\u307F\u3084\u3059\u3044\u3002",dimensions:[4.3,1.78,1.17],profile:su,cab:[-.79,-.52,.04,.5,.78,.62],axle:[-.58,.57],wheel:[.296,.205,5],front:"popup-round",rear:"band",spoiler:"bridge",exhaust:2},{id:"raimei",name:"\u96F7\u9CF4 G32",code:"RM-G32",country:"\u65E5\u672C",year:1991,drive:"4WD",layout:"4WD",engineType:"inline6",turbo:!0,power:282,mass:1420,accel:8.9,topSpeed:255,grip:1.18,handling:1.06,drift:.84,gears:5,paint:"#495d7e",accent:"#1d232e",description:"\u56DB\u8F2A\u99C6\u52D5\u306E\u30C4\u30A4\u30F3\u30BF\u30FC\u30DC\u3002\u96E8\u306B\u5F37\u304F\u3001\u7ACB\u3061\u4E0A\u304C\u308A\u3067\u65E9\u3081\u306B\u30A2\u30AF\u30BB\u30EB\u3092\u8E0F\u3081\u308B\u3002",dimensions:[4.54,1.8,1.3],profile:tf,cab:[-.77,-.46,.13,.53,.77,.64],axle:[-.58,.61],wheel:[.307,.221,6],front:"projector",rear:"round-four",spoiler:"pedestal",exhaust:2},{id:"nagare",name:"\u6D41\u661F 24",code:"NG-24",country:"\u65E5\u672C",year:1972,drive:"FR",layout:"FR",engineType:"inline6",turbo:!1,power:158,mass:1050,accel:7.3,topSpeed:206,grip:.95,handling:1.05,drift:1.24,gears:5,paint:"#7b3331",accent:"#301c22",description:"\u9577\u3044\u30DC\u30F3\u30CD\u30C3\u30C8\u3092\u6301\u3064\u521D\u671F\u306E\u30B9\u30DD\u30FC\u30C4\u30AF\u30FC\u30DA\u3002\u30B9\u30ED\u30C3\u30C8\u30EB\u3067\u5F8C\u8F2A\u3092\u6ED1\u3089\u305B\u3001\u65CB\u56DE\u306E\u5411\u304D\u3092\u8ABF\u6574\u3067\u304D\u308B\u3002",dimensions:[4.17,1.64,1.26],profile:ef,cab:[-.9,-.53,-.24,.2,.74,.58],axle:[-.6,.53],wheel:[.29,.179,4],front:"vintage",rear:"segments",chrome:!0,exhaust:1},{id:"azusa",name:"\u6893 M1",code:"AZ-M1",country:"\u65E5\u672C",year:1989,drive:"MR",layout:"MR",engineType:"inline4",turbo:!0,power:172,mass:1040,accel:7.7,topSpeed:224,grip:1.07,handling:1.18,drift:.99,gears:5,paint:"#b12e45",accent:"#241e29",description:"\u77ED\u3044\u8ECA\u4F53\u306E\u30DF\u30C3\u30C9\u30B7\u30C3\u30D7\u3002\u5207\u308A\u8FD4\u3057\u304C\u92ED\u304F\u3001\u5C0F\u3055\u306A\u30D8\u30A2\u30D4\u30F3\u3092\u5F97\u610F\u3068\u3059\u308B\u3002",dimensions:[3.95,1.67,1.22],profile:su,cab:[-.6,-.42,.18,.55,.74,.6],axle:[-.61,.56],wheel:[.287,.185,5],front:"popup",rear:"segments",spoiler:"blade",exhaust:1,inlet:!0},{id:"alpen",name:"\u30A2\u30EB\u30DA\u30F3 93",code:"AP-93",country:"\u30C9\u30A4\u30C4",year:1974,drive:"RR",layout:"RR",engineType:"flat6",turbo:!1,power:212,mass:1080,accel:8.1,topSpeed:231,grip:1.03,handling:1.11,drift:1.1,gears:5,paint:"#91aeb1",accent:"#213039",description:"\u30EA\u30A2\u306B\u6C34\u5E73\u5BFE\u5411\u30A8\u30F3\u30B8\u30F3\u3092\u8F09\u305B\u305F\u7A7A\u51B7\u30AF\u30FC\u30DA\u3002\u30D6\u30EC\u30FC\u30AD\u3092\u6B8B\u3057\u3066\u5411\u304D\u3092\u5909\u3048\u3001\u7ACB\u3061\u4E0A\u304C\u308A\u3067\u5F8C\u8F2A\u306E\u8377\u91CD\u3092\u751F\u304B\u305B\u308B\u3002",dimensions:[4.22,1.72,1.31],profile:F0,cab:[-.94,-.4,.15,.57,.77,.59],axle:[-.63,.6],wheel:[.3,.205,5],front:"bug-eye",rear:"band",spoiler:"duck",chrome:!0,exhaust:2},{id:"torino",name:"\u30C8\u30EA\u30CE V8",code:"TR-V8",country:"\u30A4\u30BF\u30EA\u30A2",year:1987,drive:"MR",layout:"MR",engineType:"v8",turbo:!1,power:325,mass:1310,accel:9.1,topSpeed:270,grip:1.1,handling:1.04,drift:.96,gears:5,paint:"#e04f38",accent:"#26212a",description:"\u5E45\u5E83\u3044\u5F8C\u8F2A\u3068\u9AD8\u56DE\u8EE2\u306EV8\u3002\u9577\u3044\u76F4\u7DDA\u3067\u4F38\u3073\u308B\u3076\u3093\u3001\u304D\u3064\u3044\u30B3\u30FC\u30CA\u30FC\u3067\u306F\u65E9\u3081\u306E\u6E1B\u901F\u304C\u8981\u308B\u3002",dimensions:[4.4,1.91,1.1],profile:su,cab:[-.67,-.36,.07,.51,.73,.62],axle:[-.55,.59],wheel:[.306,.236,5],front:"popup-round",rear:"round-four",spoiler:"blade",exhaust:2,inlet:!0},{id:"sabre",name:"\u30BB\u30A4\u30D0\u30FC 68",code:"SB-68",country:"\u30A2\u30E1\u30EA\u30AB",year:1968,drive:"FR",layout:"FR",engineType:"v8",turbo:!1,power:309,mass:1540,accel:8.4,topSpeed:243,grip:.91,handling:.88,drift:1.29,gears:4,paint:"#365473",accent:"#201f26",description:"\u5927\u6392\u6C17\u91CFV8\u3092\u7A4D\u3093\u3060\u30D5\u30A1\u30B9\u30C8\u30D0\u30C3\u30AF\u3002\u4F4E\u901F\u304B\u3089\u529B\u5F37\u304F\u52A0\u901F\u3057\u3001\u592A\u3044\u30C8\u30EB\u30AF\u3067\u30C9\u30EA\u30D5\u30C8\u3092\u7DAD\u6301\u3057\u3084\u3059\u3044\u3002",dimensions:[4.76,1.86,1.35],profile:tf,cab:[-.9,-.46,-.11,.28,.79,.64],axle:[-.57,.54],wheel:[.317,.216,5],front:"mesh-round",rear:"triple",chrome:!0,stripes:!0,exhaust:2},{id:"thorn",name:"\u30BD\u30FC\u30F3 L7",code:"TH-L7",country:"\u30A4\u30AE\u30EA\u30B9",year:1967,drive:"FR",layout:"FR",engineType:"inline6",turbo:!1,power:184,mass:1180,accel:7.8,topSpeed:217,grip:.97,handling:1.08,drift:1.1,gears:4,paint:"#1c594d",accent:"#263c37",description:"\u30ED\u30F3\u30B0\u30CE\u30FC\u30BA\u306E\u82F1\u56FD\u88FDGT\u3002\u6ED1\u3089\u304B\u306A\u30D1\u30EF\u30FC\u3068\u7A4F\u3084\u304B\u306A\u6319\u52D5\u3067\u3001\u9577\u3044\u4E0B\u308A\u3067\u3082\u901F\u5EA6\u3092\u7BA1\u7406\u3057\u3084\u3059\u3044\u3002",dimensions:[4.5,1.67,1.21],profile:ef,cab:[-.92,-.59,-.25,.13,.7,.53],axle:[-.58,.57],wheel:[.296,.169,10],front:"oval",rear:"vertical",chrome:!0,exhaust:2},{id:"leopard",name:"\u30EC\u30AA\u30D1\u30FC\u30EB GT",code:"LP-GT",country:"\u30D5\u30E9\u30F3\u30B9",year:1988,drive:"FF",layout:"FF",engineType:"inline4",turbo:!1,power:147,mass:890,accel:7.5,topSpeed:203,grip:1.05,handling:1.21,drift:.89,gears:5,paint:"#c5c3b7",accent:"#202530",description:"\u77ED\u3044\u30DB\u30A4\u30FC\u30EB\u30D9\u30FC\u30B9\u306E\u30DB\u30C3\u30C8\u30CF\u30C3\u30C1\u3002\u8EFD\u5FEB\u306B\u66F2\u304C\u308A\u3001\u524D\u8F2A\u99C6\u52D5\u306A\u3089\u3067\u306F\u306E\u6271\u3044\u3084\u3059\u3055\u3092\u6301\u3064\u3002",dimensions:[3.78,1.61,1.36],profile:Qp,cab:[-.94,-.77,.25,.63,.81,.63],axle:[-.58,.62],wheel:[.275,.179,8],front:"rect",rear:"upright",lower:"trim",spoiler:"blade",exhaust:1},...k0]);function ur(i){return Hn.find(e=>e.id===i)||Hn[0]}var af=new Ke(1,1,1),nf={low:{sides:14,height:8,body:27,arch:10,cross:1,wheel:20,ring:5,roof:5},medium:{sides:28,height:16,body:64,arch:19,cross:2,wheel:40,ring:8,roof:10},high:{sides:56,height:32,body:144,arch:35,cross:4,wheel:72,ring:14,roof:20}},au=new Map,lu=new Set([af]);function of(i){if(!au.has(i)){let e=new ai(1,i.sides,i.height),t=new fn(1,1,1,i.sides);lu.add(e).add(t),au.set(i,{sphere:e,cylinder:t})}return au.get(i)}function Tt(i,e={}){return new Ci({color:i,roughness:.56,metalness:.2,...e})}var le={trim:Tt("#191d25",{roughness:.64,metalness:.13}),tire:Tt("#191b20",{roughness:.93,metalness:0}),tread:Tt("#111317",{roughness:.96,metalness:0}),sidewall:Tt("#26272c",{roughness:.76,metalness:0}),rotor:Tt("#4c505b",{roughness:.64,metalness:.65}),alloy:Tt("#b5b9bd",{roughness:.33,metalness:.64}),chrome:Tt("#d6dde4",{roughness:.25,metalness:.72}),seal:Tt("#11151c",{roughness:.52,metalness:.09}),rubber:Tt("#343133",{roughness:.83,metalness:0}),amber:Tt("#de8727",{roughness:.31,emissive:"#db510b",emissiveIntensity:.24}),ruby:Tt("#66082c",{roughness:.35,emissive:"#6b061d",emissiveIntensity:.3}),glass:new Qr({color:"#1e303f",roughness:.21,metalness:.38,clearcoat:.85,clearcoatRoughness:.07,emissive:"#142738",emissiveIntensity:.28}),glassEdge:Tt("#57758a",{roughness:.32,metalness:.43,emissive:"#385064",emissiveIntensity:.28}),darkRear:Tt("#19191f",{roughness:.49,metalness:.38}),plate:Tt("#c7ccd1",{roughness:.44,metalness:.09}),stripe:Tt("#e1e1d4",{roughness:.4,metalness:.12}),caliper:Tt("#ad282e",{roughness:.44,metalness:.33}),reflector:Tt("#e5bc82",{roughness:.34,metalness:.31,emissive:"#d88a25",emissiveIntensity:.3})};function ya(i,e,t,n,r,s,a,o,l,c=0,h=0,d=0){let u=new Ie(e,t);return u.position.set(n,r,s),u.scale.set(a,o,l),u.rotation.set(c,h,d),i.add(u),u}function _e(i,e,t,n,r,s,a,o,l=0,c=0,h=0){return ya(i,af,e,t,n,r,s,a,o,l,c,h)}function Li(i,e,t,n,r,s,a,o){return ya(i,of(i.userData.detail).sphere,e,t,n,r,s,a,o)}function at(i,e,t,n,r,s,a,o="x"){return ya(i,of(i.userData.detail).cylinder,e,t,n,r,s,a,s,o==="z"?Math.PI/2:0,0,o==="x"?Math.PI/2:0)}function Gn(i,e,t,n=.01){let{cross:r}=i.userData.detail,s=new Yr(t.map(o=>new D(...o))),a=new Ie(new $r(s,Math.max(4,t.length*(r+1)),n,4+r*2),e);return i.add(a),a}function hr(i,e,t){let n=new Float32Array(t.flat()),r=new Be;r.setAttribute("position",new _t(n,3)),r.setIndex([0,1,2,0,2,3,0,2,1,0,3,2]);let s=r.toNonIndexed();r.dispose(),s.computeVertexNormals();let a=new Ie(s,e);return i.add(a),a}var _a=(i,e,t)=>i+(e-i)*t,$e=(i,e,t)=>i.map((n,r)=>_a(n,e[r],t));function on(i,e){let t=i.findIndex(s=>s[0]>=e);if(t<=0)return i[t<0?i.length-1:0].slice(1);let n=i[t-1],r=i[t];return[_a(n[1],r[1],(e-n[0])/(r[0]-n[0])),_a(n[2],r[2],(e-n[0])/(r[0]-n[0]))]}function z0(i,e,t,n){let r=i.userData.detail,[s,a]=e.dimensions,[o]=e.wheel,l=s/2,c=a/2,h=e.profile.map(g=>g[0]);for(let g=0;g<=r.body;g++)h.push(-1+2*g/r.body);for(let g of e.axle){let v=o+.039;for(let _=0;_<=r.arch;_++)h.push(g+Math.cos(_*Math.PI/r.arch)*v/l)}let d=[...new Set(h.map(g=>Math.round(g*1e5)/1e5))].sort((g,v)=>g-v),u=[],p=[],m=[],y=18*r.cross;for(let g of d){let[v,_]=on(e.profile,g),x=c*v,S=Math.min(...e.axle.map(O=>Math.abs(O-g)*l)),M=o+.037,w=.201,A=S<M?Math.sqrt(M**2-S**2):0,T=A+(o-w)*(1-Math.exp(-A*45)),C=Math.min(_-.08,w+T),P=(O,N=0)=>Math.max(C+N,O),U=[[0,_+.018],[-.42,_+.013],[-.77,_],[-.94,_-.032],[-1,P(_-.11,.023)],[-1.005,P(_-.2,.017)],[-.98,P(_-.29,.008)],[-.9,C],[-.6,w-.027],[0,w-.042],[.6,w-.027],[.9,C],[.98,P(_-.29,.008)],[1.005,P(_-.2,.017)],[1,P(_-.11,.023)],[.94,_-.032],[.77,_],[.42,_+.013]];for(let O=0;O<U.length;O++){let N=U[O],H=U[(O+1)%U.length],V=U[(O+U.length-1)%U.length],K=U[(O+2)%U.length];for(let Y=0;Y<r.cross;Y++){let re=Y/r.cross,ce=re*(1-re)*.17,ue=ge=>_a(N[ge],H[ge],re)+ce*((N[ge]-V[ge])*(1-re)+(H[ge]-K[ge])*re);u.push(ue(0)*x,ue(1),g*l)}}}for(let g=0;g<d.length-1;g++)for(let v=0;v<y;v++){let _=g*y+v,x=g*y+(v+1)%y;(e.lower&&v>=5*r.cross&&v<13*r.cross?m:p).push(_,x,_+y,x,x+y,_+y)}for(let g=1;g<y-1;g++){let v=(d.length-1)*y;p.push(0,g+1,g,v,v+g,v+g+1)}let f=new Be;f.setAttribute("position",new ve(u,3)),f.setIndex(p.concat(m)),f.addGroup(0,p.length,0),m.length&&f.addGroup(p.length,m.length,1),f.computeVertexNormals(),i.add(new Ie(f,m.length?[t,n]:t))}function rf(i,e,t,n,r,s,a){let o=i.userData.detail.roof,l=[],c=[];for(let d=0;d<=o;d++){let u=d/o,p=$e(t,s,u),m=$e(n,r,u);for(let y=0;y<=o;y++){let f=y/o,[g,,v]=$e(p,m,f),_=_a(p[1],m[1],f*f)+(1-f*f)*Math.sin(u*Math.PI)*.019;if(l.push(g,_,v),y<o&&d<o){let x=d*(o+1)+y,S=x+o+1;a<0?c.push(x,x+1,S,x+1,S+1,S):c.push(x,S,x+1,x+1,S,S+1)}}}let h=new Be;h.setAttribute("position",new ve(l,3)),h.setIndex(c),h.computeVertexNormals(),i.add(new Ie(h,e))}function G0(i,e,t,n){let[r,s,a]=e.dimensions,[o,l,c,h,d,u]=e.cab,p=N=>N*r/2,m=s/2,y=N=>on(e.profile,N)[1]+.012,f=y(h),g=y(o),v=(N,H,V)=>[[-V,H,p(N)],[V,H,p(N)]],[_,x]=v(c,a-.045,m*(u-.035)),[S,M]=v(l,a-.071,m*(u-.018)),[w,A]=v(h,f,m*(d-.055)),[T,C]=v(o,g,m*(d-.025)),P=[0,a-.01,p(l)-.018],U=[0,a,p(c)+.013],O=(N,H,V,K,Y)=>{hr(i,n,[N,H,V,K]);let re=E=>[E[0],E[1]+.006,E[2]+Y],ce=$e(N,K,.07),ue=$e(H,V,.07),ge=$e(H,V,.94),Q=$e(N,K,.94),ae=re($e(ce,ue,.037)),te=re($e(ue,ce,.037)),xe=re($e(Q,ge,.028)),Re=re($e(ge,Q,.028));hr(i,le.glass,[ae,te,Re,xe]);let R=[$e(xe,ae,.025),$e(Re,te,.025),$e(Re,te,.067),$e(xe,ae,.067)];hr(i,le.glassEdge,R.map(([E,G,B])=>[E,G+.0018,B+Y*.45]))};if(O(w,A,x,_,.006),e.roof==="open"){Gn(i,n,[_,U,x],.013);let N=p((l+c)/2-.12),H=y((l+c)/2-.12);_e(i,le.seal,0,H+.017,N+.16,m*1.35,.049,.51);for(let V of[-1,1]){let K=V*m*.32,Y=p(h)-.145,re=V*(m*d+.12);_e(i,le.trim,K,H+.085,N,m*.47,.15,.26,.22),_e(i,le.trim,K,H+.18,N-.115,m*.34,.09,.12,.22),Gn(i,n,[[V*m*.48,H+.012,N-.26],[V*m*.46,H+.16,N-.26],[K,H+.21,N-.26],[V*m*.16,H+.16,N-.26],[V*m*.13,H+.009,N-.26]],.016),_e(i,le.trim,re-V*.046,f+.05,Y,.145,.036,.05),Li(i,t,re,f+.084,Y+.011,.094,.045,.052)}return}rf(i,t,P,S,_,U,-1),rf(i,t,P,M,x,U,1),O(C,T,S,M,-.006);for(let N of[-1,1]){let H=N<0?T:C,V=N<0?w:A,K=N<0?_:x,Y=N<0?S:M,re=e.doors===4?.43:.5,ce=$e(H,V,re-.028),ue=$e(Y,K,re+.086);hr(i,t,[H,V,K,Y]);let ge=$e(V,H,.066),Q=$e(K,Y,.047),ae=$e(H,V,.113),te=$e(Y,K,.065),xe=G=>[G[0]+N*.008,G[1],G[2]],Re=(G,B,b,L)=>{let k=xe($e(G,L,.091)),F=xe($e(B,b,.091)),Z=xe($e(G,L,.946)),W=xe($e(B,b,.946));hr(i,le.glass,[k,F,W,Z]);let j=[$e(Z,k,.024),$e(W,F,.024),$e(W,F,.061),$e(Z,k,.061)];hr(i,le.glassEdge,j.map(([ne,de,ee])=>[ne+N*.003,de,ee]))};Re(ae,$e(ce,H,.045),$e(ue,Y,.052),te),Re($e(ce,V,.052),ge,Q,$e(ue,K,.055)),Gn(i,n,[Y,$e(Y,K,.5),K],.011);let R=p(h)-.16,E=N*(m*d+.13);_e(i,le.trim,E-N*.062,f+.055,R,.16,.039,.053,0,N*.15),Li(i,t,E,f+.093,R+.014,.106,.053,.06),_e(i,le.glassEdge,E,f+.092,R-.043,.135,.055,.009,0,N*.14)}}function H0(i,e,t,n,r){let[s,a]=i.dimensions,[o,l,c]=i.wheel,h=new xt,d=new xt;d.userData.detail=r,h.position.set(e*(a/2-l*.41),o,i.axle[t?1:0]*s/2),h.add(d),h.userData.roll=d;let u=[[o*.73,-l*.41],[o*.84,-l*.52],[o*.945,-l*.49],[o*.99,-l*.37],[o,-l*.25],[o,l*.25],[o*.99,l*.37],[o*.945,l*.49],[o*.84,l*.52],[o*.73,l*.41]].map(([g,v])=>new ie(g,v)),p=new Kr(u,r.wheel);p.rotateZ(-Math.PI/2),p.rotateX(Math.PI/r.wheel),d.add(new Ie(p,le.tire));let m=e*l/2,y=[[.946,le.sidewall],[.749,le.sidewall],[.709,le.alloy]];for(let[g,v]of y){let _=new $i(o*g,.006,r.ring,r.wheel);ya(d,_,v,m,0,0,1,1,1,0,Math.PI/2)}if(r.cross>1){for(let v of[-.17,.17]){let _=new $i(o*.995,.0025,r.ring,r.wheel);ya(d,_,le.tread,l*v,0,0,1,1,1,0,Math.PI/2)}let g=r.wheel/2;for(let v=0;v<g;v++){let _=v*Math.PI*2/g;_e(d,le.tread,-l*.21,Math.sin(_)*o*.996,Math.cos(_)*o*.996,l*.36,.008,.003,-_,0,.19),_e(d,le.tread,l*.21,Math.sin(_+.043)*o*.996,Math.cos(_+.043)*o*.996,l*.36,.008,.003,-_-.043,0,-.19)}}at(d,le.rotor,m-e*.028,0,0,o*.58,.018),at(d,le.seal,m-e*.038,0,0,o*.69,.016),at(d,le.alloy,m+e*.012,0,0,o*.215,.032),at(d,n,m+e*.029,0,0,o*.092,.025);for(let g=0;g<c;g++){let v=g*Math.PI*2/c,_=o*.438;_e(d,le.alloy,m+e*.005,Math.sin(v)*_,Math.cos(v)*_,.021,o*(c>=8?.12:.19),o*.53,-v),r.cross>1&&_e(d,le.chrome,m+e*.017,Math.sin(v)*_,Math.cos(v)*_,.004,o*(c>=8?.035:.057),o*.44,-v)}if(r.cross>1)for(let g=0;g<5;g++){let v=g*Math.PI*2/5;at(d,le.chrome,m+e*.025,Math.sin(v)*o*.157,Math.cos(v)*o*.157,.012,.018)}let f=new xt;return _e(f,le.caliper,m-e*.006,o*.15,o*.5,.025,o*.26,o*.17,-.34),h.add(f),ou(d),h}function sf(i,e,t,n,r,s){let a=r?1:-1;_e(i,le.seal,e,t,n,.253,.097,.018),_e(i,le.plate,e,t,n+.013*a,.222,.078,.013);for(let o of[-.067,-.036,.02,.051,.074])_e(i,s,e+o,t,n+.022*a,.012,.041,.006),_e(i,s,e+o+.005,t+.016,n+.022*a,.017,.008,.006)}function V0(i,e,t,n,r,s){let[a,o]=e.dimensions,l=o/2,c=a/2,[,h]=on(e.profile,1),[,d]=on(e.profile,-1),u=e.chrome?le.chrome:n,p=new xt;p.userData.detail=i.userData.detail,i.add(p);let m=on(e.profile,.86)[1],y=[],f=[],g=e.lower==="panda"?n:t;for(let M of[-1,1]){_e(i,g,M*l*.53,.26,c+.018,l*.8,.109,.076,0,-M*.088),_e(i,u,M*l*.64,.322,-c-.018,l*.61,.077,.071,0,M*.094);let w=M*l*.68;switch(e.front){case"vintage":case"bug-eye":case"oval":{let P=c-.15,U=h+.047+(e.front==="bug-eye"?.045:0);Li(i,t,w,U,P,.143,.13,e.front==="oval"?.284:.259);let O=e.front==="bug-eye"?.106:.089,N=P+.217;at(i,le.chrome,w,U+.013,N,O+.013,.028,"z"),y.push(at(p,r,w,U+.013,N+.019,O,.018,"z")),Li(i,le.chrome,w-.023,U+.036,N+.032,.018,.025,.008);break}case"popup":case"popup-round":{let P=c-.19,U=m+.005,O=e.front==="popup"?l*.47:l*.43;if(_e(i,le.seal,w,U-.047,P,O+.036,.109,.325,.06),_e(i,t,w,U+.025,P-.022,O,.049,.284,.045),_e(i,le.darkRear,w,U-.01,P+.146,O+.017,.107,.033),e.front==="popup-round")for(let N of[-.065,.065])y.push(at(p,r,w+N,U-.014,P+.17,.039,.022,"z"));else y.push(_e(p,r,w,U-.012,P+.17,O-.038,.064,.022));_e(i,le.amber,w,h-.111,c+.015,O*.76,.036,.029);break}case"mesh-round":{let P=M*l*.68,U=h-.087;at(i,le.chrome,P,U,c+.033,.117,.052,"z"),at(i,le.seal,P,U,c+.061,.102,.017,"z"),y.push(at(p,r,P,U,c+.073,.087,.02,"z"));break}case"quad-round":case"rally-round":{let P=e.front==="rally-round";for(let[U,O]of[[.55,.07],[.76,.082]]){let N=M*l*U,H=h-(P?.015:.072),V=c+(P?.068:.047);at(i,e.chrome?le.chrome:n,N,H,V,O+.012,.063,"z"),at(i,le.seal,N,H,V+.03,O+.003,.013,"z"),y.push(at(p,r,N,H,V+.037,O,.014,"z"))}if(P){let U=M*l*.26;at(i,le.seal,U,h-.119,c+.075,.073,.105,"z"),y.push(at(p,r,U,h-.119,c+.133,.06,.019,"z"))}break}case"slit":case"split-oval":{let P=e.front==="slit";_e(i,le.seal,w,h-.06,c+.027,l*.62,.102,.049,0,-M*.095,M*.044),y.push(_e(p,r,w-M*.016,h-.05,c+.056,l*.52,P?.04:.057,.019,0,-M*.095,M*.044)),_e(i,le.amber,M*l*.91,h-.054,c+.036,.047,.045,.031,0,-M*.17);break}default:{let P=l*(e.front==="projector"?.48:.57);_e(i,le.seal,w,h-.082,c+.022,P+.027,.146,.052),e.front==="projector"?(y.push(at(p,r,w+M*.074,h-.081,c+.052,.051,.025,"z")),y.push(_e(p,r,w-M*.062,h-.082,c+.053,.105,.058,.024))):y.push(_e(p,r,w,h-.074,c+.056,P-.04,.087,.028)),_e(i,le.amber,w+M*(P/2-.008),h-.092,c+.054,.048,.088,.022)}}let A=-c-.035,T=d-.104,C=M*l*.6;if(e.rear==="round-two")at(i,e.chrome?le.chrome:n,C,T,A-.01,.081+.024,.04,"z"),at(i,le.seal,C,T,A-.035,.081+.009,.017,"z"),f.push(at(p,s,C,T,A-.048,.081,.021,"z")),at(i,le.ruby,C,T,A-.063,.081*.42,.007,"z");else if(e.rear==="matrix"||e.rear==="hockey"){let P=e.rear==="hockey",U=l*.72;_e(i,le.darkRear,C,T,A,U+.028,P?.136:.189,.042,0,M*.09);for(let O=0;O<(P?3:4);O++){let N=C+M*((O-1.5)*U*.225),H=P?.05+O*.014:.085;f.push(_e(p,s,N,T+.019,A-.028,U*.195,H,.023,0,M*.09,M*(P?.06:0))),_e(i,O===3?le.amber:le.ruby,N,T-.047,A-.035,U*.19,.025,.02,0,M*.05)}}else if(e.rear==="round-four"){_e(i,le.darkRear,C,T,A,l*.65,.227,.039);for(let P of[-.107,.107]){let U=P*M>0?.095:.073;at(i,le.seal,C+P,T,A-.027,U+.006,.023,"z"),f.push(at(p,s,C+P,T,A-.044,U,.022,"z")),at(i,le.ruby,C+P,T,A-.059,U*.49,.008,"z")}}else if(e.rear==="triple"){_e(i,le.chrome,C,T,A,.375,.238,.037),_e(i,le.seal,C,T,A-.022,.345,.208,.02);for(let P of[-.102,0,.102])f.push(_e(p,s,C+P,T,A-.037,.071,.179,.022,0,0,M*.08))}else if(e.rear==="vertical"||e.rear==="upright"){let P=M*l*.8;_e(i,le.trim,P,T-.023,A,.171,.265,.038,0,M*.15),f.push(_e(p,s,P,T+.021,A-.027,.126,.112,.02,0,M*.15)),_e(i,le.amber,P,T-.046,A-.027,.126,.045,.022,0,M*.15),_e(i,le.ruby,P,T-.092,A-.029,.126,.04,.022,0,M*.15)}else{let P=l*(e.rear==="band"?.75:.61);_e(i,le.seal,C,T,A,P+.045,.157,.039),f.push(_e(p,s,C,T+.026,A-.024,P,.074,.021)),_e(i,le.ruby,C,T-.037,A-.026,P,.037,.02),_e(i,le.amber,C+M*(P*.36),T-.028,A-.039,P*.22,.041,.014),_e(i,le.seal,C,T+.029,A-.04,P,.011,.01)}}let v=["vintage","bug-eye","oval","mesh-round","quad-round"].includes(e.front),_=l*(v?1.05:.98),x=h-(v?.105:.19),S=c+.025;if(e.front==="split-oval")for(let M of[-1,1])Li(i,u,M*_*.27,x,S,_*.245,.075,.036),Li(i,le.seal,M*_*.27,x,S+.025,_*.215,.061,.029);else e.front==="oval"?(Li(i,le.chrome,0,x,S,_*.55,.109,.042),Li(i,le.seal,0,x,S+.026,_*.5,.092,.032)):(_e(i,u,0,x,S,_+.038,v?.181:.114,.062),_e(i,le.seal,0,x,S+.037,_,v?.143:.087,.021));for(let M=-2;M<=2;M++){let w=e.front==="split-oval"?[-.27,.27]:[0];for(let A of w)_e(i,e.chrome?le.rubber:le.trim,A*_,x+M*.014,S+.05,_*(1-Math.abs(M)*.035)/(w.length===2?2.32:1),.006,.012)}if(e.front==="mesh-round")for(let M=-5;M<=5;M++)_e(i,le.rubber,M*.068,x,S+.055,.006,.133,.012);_e(i,u,0,.251,c+.03,l*1.5,.048,.086),e.chrome&&_e(i,le.chrome,0,.312,c+.059,l*1.52,.032,.068),e.rear==="band"&&_e(i,le.ruby,0,d-.081,-c-.065,l*.65,.038,.018),sf(i,0,Math.max(.296,h-.255),c+.081,!0,le.trim),sf(i,0,d-.168,-c-.05,!1,le.trim);for(let M of e.exhaust===1?[-.56]:[-.59,.59]){let w=l*M;at(i,le.chrome,w,.244,-c-.06,.057,.122,"z"),at(i,le.seal,w,.244,-c-.124,.042,.017,"z")}return{lampGeometry:p,headlights:y,tailLights:f}}function W0(i,e,t,n){let[r,s]=e.dimensions,[a,,,o]=e.cab,l=s/2,c=r/2;for(let u of[-1,1]){let p=w=>{let[A,T]=on(e.profile,w);return[u*(A*l+.004),T-.106,w*c]},m=Math.max(a+.17,-.6),y=Math.min(o+.04,.52),f=e.chrome?le.chrome:le.seal;Gn(i,f,[-.95,-.72,-.51,-.26,0,.26,.54,.74,.92].map(p),e.chrome?.009:.008);let g=p(m),v=p(y);Gn(i,le.seal,[g,[g[0]*.992,g[1]-.075,g[2]+.019],[g[0]*.977,.32,g[2]+.099]],.007),Gn(i,le.seal,[v,[v[0]*.995,v[1]-.097,v[2]-.017],[v[0]*.97,.319,v[2]-.05]],.006);let _=e.doors===4?[m+.08,(m+y)*.5]:[m+.11];for(let w of _){let[A,T,C]=p(w);_e(i,e.chrome?le.chrome:le.seal,A,T+.048,C,.019,.027,.117)}if(e.doors===4){let w=p((m+y)*.5+.18);Gn(i,le.seal,[w,[w[0]*.995,w[1]-.105,w[2]-.015],[w[0]*.98,.325,w[2]-.035]],.006)}let[x,S,M]=p(.76);if(_e(i,le.amber,x-u*.003,S-.023,M,.021,.035,.103),e.lower==="trim"&&_e(i,le.ruby,u*l*.992,.394,.012,.026,.021,1.08),e.inlet){let[w,A,T]=p(-.43);_e(i,n,w-u*.002,A-.084,T,.016,.095,.254,u*.145);for(let C=0;C<4;C++)_e(i,le.trim,w+u*.009,A-.113+C*.02,T,.013,.006,.235,u*.15)}for(let[w,A]of[[.47,.94],[-.91,-.68]])e.stripes&&w>0||Gn(i,n,[w,(w+A)/2,A].map(T=>[l*.4*u,on(e.profile,T)[1]+.014,T*c]),w<0?.003:.005);if(e.stripes){let w=[.47,.67,.87,1].map(A=>[on(e.profile,A)[1]+.02,c*A]);for(let A=0;A<w.length-1;A++){let[T,C]=w[A],[P,U]=w[A+1];hr(i,le.stripe,[[u*.077,T,C],[u*.193,T,C],[u*.193,P,U],[u*.077,P,U]])}}}if(e.spoiler){let[,u]=on(e.profile,-.93),p=-c*.94,m={bridge:.205,pedestal:.245,duck:.078,tower:.58}[e.spoiler]??.106;if(e.spoiler!=="duck")for(let y of[-1,1]){let f=e.spoiler==="tower"?.76:.56;_e(i,e.spoiler==="blade"?n:t,y*l*f,u+m*.46,p+.011,.055,m,.113,-.21)}if(_e(i,e.spoiler==="blade"?n:t,0,u+m,p-.025,s*(e.spoiler==="tower"?.89:.8),.046,.24,-.13),e.spoiler==="pedestal")for(let y of[-1,1])_e(i,n,y*l*.79,u+m,p-.03,.03,.095,.244,-.13)}if(e.id==="alpen"||e.rearGrille){let u=-c*.76;for(let p=0;p<5;p++)_e(i,le.trim,0,on(e.profile,(u-p*.042)/c)[1]+.022,u-p*.042,s*.48,.013,.014)}if(i.userData.detail.cross===1)return;for(let u of[-1,1]){for(let f of[e.axle[0],e.axle[1]]){let g=f*c,v=e.wheel[0]+.036,_=[];for(let x=0;x<=10;x++){let S=.03+(Math.PI-.06)*x/10,M=g+v*Math.cos(S),[w]=on(e.profile,M/c),A=v*Math.sin(S);_.push([u*w*l*(.917+.067*Math.sin(S)),.206+A+(e.wheel[0]-.201)*(1-Math.exp(-A*45)),M])}Gn(i,e.chrome?le.chrome:n,_,.006)}let p=e.cab[3]*c,[m,y]=on(e.profile,p/c);_e(i,le.reflector,u*l*m,.25+y*.25,-c*.81,.013,.026,.069,0,u*.04)}let h=o*c,d=on(e.profile,o)[1];for(let u of[-1,1]){let p=u*l*.25;Gn(i,le.seal,[[p,d+.025,h+.01],[p+l*.12,d+.076,h-.05],[p+l*.32,d+.101,h-.07]],.007)}}function ou(i,e=new Set){let t=new Map;for(let r of i.children.slice()){if(!r.isMesh||Array.isArray(r.material)||e.has(r))continue;let s=r.geometry,a=s.index?s.toNonIndexed():s.clone();r.updateMatrix(),a.applyMatrix4(r.matrix);let o=t.get(r.material)||{positions:[],normals:[]};o.positions.push(a.attributes.position.array),o.normals.push(a.attributes.normal.array),t.set(r.material,o),a.dispose(),lu.has(s)||s.dispose(),i.remove(r)}let n=r=>{let s=new Float32Array(r.reduce((o,l)=>o+l.length,0)),a=0;for(let o of r)s.set(o,a),a+=o.length;return s};for(let[r,s]of t){let a=new Be;a.setAttribute("position",new _t(n(s.positions),3)),a.setAttribute("normal",new _t(n(s.normals),3)),i.add(new Ie(a,r))}}function j0(i,e){let[t]=e.dimensions,n=t/2,r=.5,s=27,a=new Be,o=[-.66,r,n,.66,r,n,3.8,.023,s,-3.8,.023,s];a.setAttribute("position",new ve(o,3)),a.setAttribute("uv",new ve([0,0,1,0,1,1,0,1],2)),a.setIndex([0,1,2,0,2,3]);let l=new Pt({transparent:!0,depthWrite:!1,side:Nt,blending:Bn,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"varying vec2 vUv; void main(){float feather=smoothstep(0.0,0.27,vUv.x)*(1.0-smoothstep(0.73,1.0,vUv.x)); float fade=smoothstep(0.0,0.12,vUv.y)*(1.0-smoothstep(0.16,1.0,vUv.y)); gl_FragColor=vec4(0.85,0.92,1.0,feather*fade*0.13);}"}),c=new Ie(a,l);c.renderOrder=2,c.userData.headlightBeam=!0,i.add(c)}function lf(i){let n=new Uint16Array(131072),r=[{azimuth:-.64,elevation:.99,width:1.18,height:.22,rgb:[3.43,3.26,2.88]},{azimuth:1.84,elevation:.57,width:.34,height:.51,rgb:[1.31,1.79,2.63]},{azimuth:-2.57,elevation:.36,width:.45,height:.2,rgb:[2.37,1.79,1.15]}],s=2*Math.PI,a=Bs.toHalfFloat,o=h=>Math.max(0,Math.min(1,(1-h)*5));for(let h=0;h<128;h++){let d=(h/128-.5)*Math.PI,u=.12+.16*Math.max(0,Math.sin(d));for(let p=0;p<256;p++){let m=(p/256-.5)*s,y=u*.88,f=u*.93,g=u;for(let _ of r){let x=m-_.azimuth,S=Math.abs(Math.atan2(Math.sin(x),Math.cos(x))),M=o(S/_.width)*o(Math.abs(d-_.elevation)/_.height);y+=_.rgb[0]*M,f+=_.rgb[1]*M,g+=_.rgb[2]*M}let v=(h*256+p)*4;n[v]=a(y),n[v+1]=a(f),n[v+2]=a(g),n[v+3]=a(1)}}let l=new Vr(n,256,128,an,Pi);l.mapping=rs,l.colorSpace=ni,l.magFilter=tn,l.minFilter=tn,l.needsUpdate=!0;let c=new cs(i);try{return c.fromEquirectangular(l)}finally{l.dispose(),c.dispose()}}function Di(i,e={}){let t=typeof i=="object"&&i?.id?i:ur(i),n=nf[e.quality]||nf[e.opponent?"low":"medium"],r=new xt;r.name=t.code;let s=new xt;s.userData.detail=n,r.add(s);let a=new Qr({color:e.color||t.paint,metalness:e.showroom?.54:.39,roughness:.24,envMapIntensity:e.showroom?1.1:.87,clearcoat:.78,clearcoatRoughness:.11}),o=Tt(t.accent,{roughness:.47,metalness:.33}),l=Tt("#f1e5bf",{roughness:.28,metalness:.09,emissive:"#fff0bb",emissiveIntensity:e.lights===!1?.14:1.2}),c=Tt("#ce203b",{roughness:.34,metalness:.17,emissive:"#ff133a",emissiveIntensity:.48});z0(s,t,a,o),G0(s,t,a,t.chrome?le.chrome:le.seal),W0(s,t,a,o);let{lampGeometry:h}=V0(s,t,a,o,l,c);ou(s),ou(h);let d=[],u=[];for(let m of[!1,!0])for(let y of[-1,1]){let f=H0(t,y,m,a,n);r.add(f),m&&u.push(f),d.push(f)}e.beam&&e.lights!==!1&&j0(r,t);let p=h.children;return r.userData={data:t,wheels:d,frontWheels:u,tailLights:p.filter(m=>m.material===c),headlights:p.filter(m=>m.material===l),animate({steering:m=0,speed:y=0,dt:f=0,brake:g=!1}={}){for(let _ of u)_.rotation.y=m;let v=y*f/t.wheel[0];for(let _ of d)_.userData.roll.rotation.x=(_.userData.roll.rotation.x+v)%(Math.PI*2);c.emissiveIntensity=g?1.9:.53}},r}function ds(i){let e=new Set(Object.values(le)),t=new Set,n=new Set;i.traverse(r=>{if(r.isMesh){lu.has(r.geometry)||n.add(r.geometry);for(let s of Array.isArray(r.material)?r.material:[r.material])e.has(s)||t.add(s)}});for(let r of n)r.dispose();for(let r of t)r.dispose()}var cf=new Map,Dl=new Map,hf=Math.PI*2,Pl=new D,Ll=new D,uf=new Ue;function pf(i,e,t,n){return i.set(e,t),i.size>n&&i.delete(i.keys().next().value),t}function X0(i){let e=Dl.get(i);return e?(Dl.delete(i),Dl.set(i,e),e):null}function q0(i,e){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(i,e);let t=document.createElement("canvas");return t.width=i,t.height=e,t}function df(i){let e=i.clone().convertLinearToSRGB();return[e.r*255,e.g*255,e.b*255]}function Y0(i,e,t){let n=typeof i=="object"&&i?.id?i:ur(i),r=t==="race"?"low":"medium",s=n.id+":"+(e??n.paint)+":"+r,a=cf.get(s);if(a)return a;let o=Di(n,{color:e,quality:r,showroom:t!=="race"}),l=new Set(o.userData.tailLights.map(h=>h.material));o.updateMatrixWorld(!0);let c=[];return o.traverse(h=>{if(!h.isMesh)return;uf.getNormalMatrix(h.matrixWorld);let d=h.geometry,u=d.attributes.position,p=d.attributes.normal,m=new Float32Array(u.count*6);for(let _=0;_<u.count;_++){Pl.fromBufferAttribute(u,_).applyMatrix4(h.matrixWorld),Ll.fromBufferAttribute(p,_).applyNormalMatrix(uf);let x=_*6;m[x++]=Pl.x,m[x++]=Pl.y,m[x++]=Pl.z,m[x++]=Ll.x,m[x++]=Ll.y,m[x]=Ll.z}let y=d.index?.array,f=Array.isArray(h.material)?h.material:[h.material],g=f.length===1?[{start:0,count:y?.length??u.count,materialIndex:0}]:d.groups,v=f.map(_=>({rgb:df(_.color),metal:_.metalness,roughness:_.roughness,glow:_.emissiveIntensity,glowColor:df(_.emissive),tail:l.has(_)}));c.push({vertices:m,indexes:y,ranges:g,paints:v,projected:new Float32Array(u.count*5)})}),ds(o),pf(cf,s,{key:s,batches:c,dimensions:n.dimensions},11)}function Z0(i,e,t,n,r,s,a){let{vertices:o,projected:l}=i,c=Math.sin(r),h=Math.cos(r),d=Math.sin(a),u=Math.cos(a),p=c*u,m=d,y=h*u,f=-c*d,g=-h*d,v=s==="race"?10:8.6,_=-.3+p,x=.77+m,S=.56+y,M=Math.hypot(_,x,S),w=_/M,A=x/M,T=S/M;for(let C=0,P=0;C<o.length;C+=6,P+=5){let U=o[C],O=o[C+1],N=o[C+2],H=o[C+3],V=o[C+4],K=o[C+5],Y=v-(p*U+m*O+y*N),re=n*v/Y;l[P]=e+(h*U-c*N)*re,l[P+1]=t-(f*U+u*O+g*N)*re,l[P+2]=1/Y,l[P+3]=.5+Math.max(0,-.29*H+.78*V+.56*K)*.62+Math.max(0,.75*H+.27*V-.48*K)*.21;let ce=Math.max(0,w*H+A*V+T*K);ce*=ce,ce*=ce,l[P+4]=ce*ce}}function K0(i,e,t,n,r,s,a){let{projected:o,indexes:l,ranges:c,paints:h}=i,d=a==="race";for(let u of c){let p=h[u.materialIndex],[m,y,f]=p.rgb,g=p.tail?s?.92:.19:Math.min(p.glow,.86)*.72,[v,_,x]=p.glowColor.map(w=>w*g),S=18+p.metal*112*(1.1-p.roughness),M=d?.88:1;for(let w=u.start,A=w+u.count;w<A;w+=3){let T=(l?l[w]:w)*5,C=(l?l[w+1]:w+1)*5,P=(l?l[w+2]:w+2)*5,U=o[T],O=o[T+1],N=o[C],H=o[C+1],V=o[P],K=o[P+1],Y=N-U,re=H-O,ce=V-U,ue=K-O,ge=Y*ue-re*ce;if(ge>=-.025)continue;let Q=Math.max(0,Math.floor(Math.min(U,N,V))),ae=Math.min(n-1,Math.ceil(Math.max(U,N,V))),te=Math.max(0,Math.floor(Math.min(O,H,K))),xe=Math.min(r-1,Math.ceil(Math.max(O,H,K)));if(Q>ae||te>xe)continue;let Re=ue/ge,R=-re/ge,E=o[T+2],G=o[C+2]-E,B=o[P+2]-E,b=o[T+3],L=o[C+3]-b,k=o[P+3]-b,F=o[T+4],Z=o[C+4]-F,W=o[P+4]-F,j=Q+.5-U;for(let ne=te;ne<=xe;ne++){let de=ne+.5-O,ee=(j*ue-de*ce)/ge,me=(Y*de-re*j)/ge,be=Q+ne*n;for(let Te=Q;Te<=ae;Te++,be++,ee+=Re,me+=R){if(ee<0||me<0||ee+me>1)continue;let ze=E+ee*G+me*B;if(ze<=t[be])continue;t[be]=ze;let je=(b+ee*L+me*k)*M,Xe=(F+ee*Z+me*W)*S,pe=be*4;e[pe]=m*je+Xe*.92+v,e[pe+1]=y*je+Xe+_,e[pe+2]=f*je+Xe*1.11+x+(d?6:1),e[pe+3]=255}}}}}function J0(i,e,t,n,r){let s=t==="race",[a,o,l]=i.dimensions,c=s?65:116,h=a*Math.abs(Math.sin(e))+o*Math.abs(Math.cos(e)),d=Math.ceil((h*1.13+.61)*c),u=Math.ceil((l*1.26+Math.sin(r)*a+.62)*c),p=q0(d,u),m=p.getContext("2d"),y=m.createImageData(d,u),f=new Float32Array(d*u),g=d/2,v=u-(.28+Math.sin(r)*a*.6)*c;for(let _ of i.batches)Z0(_,g,v,c,e,t,r),K0(_,y.data,f,d,u,n,t);return m.putImageData(y,0,0),{canvas:p,xOrigin:g,yOrigin:v,nativeWidth:o*c}}function Ul(i,e,{x:t,y:n,width:r,angle:s=0,view:a="garage",color:o,brake:l=!1,elevation:c=a==="race"?.21:.29}){if(!(r>0)||!Number.isFinite(t)||!Number.isFinite(n))return;let h=Y0(e,o,a),d=a==="race"?56:90,u=(Math.round(s/hf*d)%d+d)%d,p=[h.key,a,u,l?1:0,c].join("|"),m=X0(p)||pf(Dl,p,J0(h,u*hf/d,a,l,c),56),y=r/m.nativeWidth;i.drawImage(m.canvas,t-m.xOrigin*y,n-m.yOrigin*y,m.canvas.width*y,m.canvas.height*y)}var $0=[Object.freeze({id:"haruna",name:"\u699B\u5DBA\u5CE0",subtitle:"HARUNA NIGHT PASS",description:"\u6749\u6797\u3092\u629C\u3051\u3001\u6708\u660E\u304B\u308A\u306E\u4E0B\u3067\u9023\u7D9A\u30D8\u30A2\u30D4\u30F3\u3092\u4E0B\u308B\u3002",length:3200,lengthKm:"3.2",width:9.4,dark:!0,wet:!1,grip:1,tier:"\u6A19\u6E96",weather:"\u6708\u591C",surface:"\u30C9\u30E9\u30A4",terrainGroup:"\u5CE0",biome:"cedar"}),Object.freeze({id:"kirisawa",name:"\u9727\u6CA2\u5CE0",subtitle:"KIRISAWA RAIN RUN",description:"\u96E8\u306B\u6FE1\u308C\u305F\u8DEF\u9762\u3068\u9727\u306E\u8C37\u3002\u5411\u304D\u304C\u5909\u308F\u308B\u305F\u3073\u306B\u30B0\u30EA\u30C3\u30D7\u304C\u554F\u308F\u308C\u308B\u3002",length:3800,lengthKm:"3.8",width:10.1,dark:!0,wet:!0,grip:.84,tier:"\u4E0A\u7D1A",weather:"\u591C\u96E8",surface:"\u30A6\u30A7\u30C3\u30C8",terrainGroup:"\u6E13\u8C37",biome:"cedar",tunnels:[[618,702],[1914,1982]]}),Object.freeze({id:"shiramine",name:"\u767D\u5CF0\u5CE0",subtitle:"SHIRAMINE DAWN ROAD",description:"\u96EA\u3092\u307E\u3068\u3063\u305F\u5C3E\u6839\u306B\u671D\u65E5\u304C\u5DEE\u3059\u3002\u30D6\u30E9\u30A4\u30F3\u30C9\u30AB\u30FC\u30D6\u3068\u9AD8\u901F\u533A\u9593\u3092\u3064\u306A\u3050\u3002",length:4200,lengthKm:"4.2",width:11.3,dark:!1,wet:!1,grip:.89,tier:"\u4E0A\u7D1A",weather:"\u96EA\u666F\u8272\u30FB\u591C\u660E\u3051",surface:"\u51B7\u3048\u305F\u8217\u88C5\u8DEF",terrainGroup:"\u96EA\u5C71",biome:"snow",snow:!0,bridge:[2692,2830]})],gf={haruna:[[0,.02],[.037,.03],[.074,.69],[.112,1.2],[.151,-.96],[.188,-1.27],[.227,.68],[.264,.2],[.32,-.55],[.356,-1.07],[.39,.96],[.428,1.23],[.474,-.53],[.51,-.05],[.55,-.74],[.587,-1.22],[.629,.8],[.676,.92],[.722,-.89],[.766,-.1],[.81,.77],[.851,1.21],[.887,-.94],[.933,-.59],[.97,.03],[1,.04]],kirisawa:[[0,-.18],[.037,-.08],[.076,-.75],[.11,-1.11],[.145,.91],[.193,.77],[.227,-.14],[.262,-.63],[.296,.88],[.338,1.18],[.367,-1.2],[.414,-.98],[.451,.8],[.493,.12],[.534,.41],[.569,1.14],[.607,-.96],[.648,-1.3],[.689,.72],[.724,.57],[.757,-.59],[.796,-.87],[.833,.36],[.858,.97],[.89,-1.17],[.93,-.68],[.967,-.02],[1,-.04]],shiramine:[[0,.11],[.06,.09],[.103,.74],[.149,1.08],[.195,-.83],[.235,-1.2],[.282,.37],[.324,.62],[.364,-.24],[.405,-.63],[.451,-1.21],[.494,.92],[.544,1.09],[.595,-.86],[.647,-.36],[.686,-.12],[.733,.76],[.772,1.14],[.813,-.94],[.862,-1.15],[.907,.61],[.957,.37],[1,.22]]},vf={haruna:{seed:33,skyTop:"#060e24",skyHorizon:"#4e688c",fog:"#344558",density:.00245,glow:"#c5ddff",sun:[-.6,.26,-.74],stars:1,ambient:"#9cbce4",earth:"#35403c",foliage:"#284332",mountain:"#273b49",rock:"#5c5d63",road:"#707780",shoulder:"#555b5b",slope:-.067,snow:!1},kirisawa:{seed:69,skyTop:"#0a1b2a",skyHorizon:"#657e88",fog:"#4b6470",density:.0048,glow:"#99b2d1",sun:[.5,.12,-.86],stars:0,ambient:"#a1bbce",earth:"#334442",foliage:"#1a423b",mountain:"#2f4246",rock:"#515d59",road:"#565e68",shoulder:"#525b56",slope:-.045,snow:!1},shiramine:{seed:87,skyTop:"#233d69",skyHorizon:"#cf9d92",fog:"#a5a6b7",density:.0017,glow:"#ffd6a0",sun:[-.52,.12,-.8],stars:0,ambient:"#d9e9ff",earth:"#b2bac3",foliage:"#29434a",mountain:"#8292a4",rock:"#697681",road:"#7b7d83",shoulder:"#a3b3bd",slope:-.054,snow:!0}},Q0=[{id:"akatsuki",name:"\u6681\u7D05\u5CE0",subtitle:"AKATSUKI SHRINE ROAD",length:2720,width:9.6,grip:1.01,weather:"\u671D\u713C\u3051",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u5CE0",biome:"autumn",description:"\u671D\u713C\u3051\u306E\u9CE5\u5C45\u304B\u3089\u7D05\u8449\u306E\u3064\u3065\u3089\u6298\u308A\u3078\u3002\u5E8F\u76E4\u306E\u7DE9\u3044\u767B\u308A\u304B\u3089\u4E00\u6C17\u306B\u99C6\u3051\u4E0B\u308B\u3002",palette:["#402f58","#efa679","#b56762","#ffe0a0","#ccc2ce","#775441","#85412d","#6d5660","#866358","#726563","#65584e"],slope:-.033,gradeWaves:[.065,.028],sun:[-.49,.14,-.86],landmarks:[["shrine",.2,-1],["shrine",.71,1]],turns:[0,.12,.75,1.03,-.62,-1.15,.19,.65,.41,-.56,-.18,.9,-.96,-1.2,.16,.76,.38,.06]},{id:"takamine",name:"\u9DF9\u5DBA\u30B9\u30AB\u30A4\u30E9\u30A4\u30F3",subtitle:"TAKAMINE SKYLINE",length:5200,width:12.4,grip:1.05,weather:"\u5FEB\u6674",surface:"\u30C9\u30E9\u30A4",tier:"\u521D\u7D1A",terrainGroup:"\u9AD8\u539F",biome:"alpine",description:"\u7A7A\u306E\u8FD1\u3044\u7A1C\u7DDA\u3092\u8D70\u308B\u9AD8\u901F\u30B3\u30FC\u30B9\u3002\u9577\u3044\u767B\u5742\u3068\u958B\u3051\u305F\u76F4\u7DDA\u306E\u5148\u306B\u3001\u8907\u5408\u30B3\u30FC\u30CA\u30FC\u304C\u5F85\u3064\u3002",palette:["#225995","#88bed8","#8caabd","#fff0cc","#cee4ff","#617855","#3d6948","#81959f","#747d79","#777c81","#777e66"],slope:.029,gradeWaves:[.073,.02],sun:[.51,.63,-.57],landmarks:[["chalet",.53,-1],["obelisk",.82,1]],turns:[0,.02,.12,.48,.64,.4,.18,-.62,-.72,-.36,-.22,-.04,.49,.84,.63,.13,-.46,-.66,-.61,-.18,.24,.15,.05]},{id:"aobane",name:"\u9752\u7FBD\u306E\u68EE\u516C\u9053",subtitle:"AOBANE FOREST ROAD",length:3e3,width:9.2,grip:1.02,weather:"\u6625\u6674\u308C",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u68EE\u6797",biome:"broadleaf",description:"\u82BD\u5439\u3044\u305F\u5E83\u8449\u6A39\u3068\u77F3\u57A3\u306E\u9593\u3092\u7E2B\u3046\u4E2D\u901F\u30B3\u30FC\u30B9\u3002\u6797\u3092\u629C\u3051\u308B\u305F\u3073\u306B\u8ECA\u7DDA\u306E\u30EA\u30BA\u30E0\u304C\u5909\u308F\u308B\u3002",palette:["#477eab","#b0cfb0","#94ac8c","#fff2bd","#d7e6ca","#677d47","#668b40","#68877d","#807d58","#697478","#7c825e"],slope:-.029,gradeWaves:[.044,.039],sun:[.65,.49,-.55],landmarks:[["wall",.34,-1],["chalet",.74,1]],turns:[.04,.1,-.48,-.65,.23,1.07,.53,-.25,-.88,-.47,.25,.81,.45,-.65,-.89,-.25,.29,.75,.11,-.15,-.01]},{id:"kurogane",name:"\u9ED2\u9244\u5CE1\u8C37\u7DDA",subtitle:"KUROGANE RAIL GORGE",length:4640,width:9.4,grip:.95,weather:"\u66C7\u5929",surface:"\u77F3\u7C89\u306E\u8217\u88C5",tier:"\u4E0A\u7D1A",terrainGroup:"\u6E13\u8C37",biome:"rock",description:"\u7070\u8272\u306E\u82B1\u5D17\u5CA9\u3068\u65E7\u9244\u9053\u306E\u6A4B\u811A\u3002\u77ED\u3044\u5751\u9053\u3092\u629C\u3051\u305F\u5F8C\u3001\u8C37\u5E95\u3078\u5411\u304B\u3046\u72ED\u3044\u5207\u308A\u8FD4\u3057\u304C\u7D9A\u304F\u3002",palette:["#253845","#85949a","#738993","#d3cdd1","#abbaaf","#4f5a55","#36524b","#566c75","#768185","#656e73","#657071"],dark:!1,clouded:!0,slope:-.058,gradeWaves:[.04,.017],sun:[-.41,.28,-.79],tunnels:[[.26,.296],[.708,.734]],bridge:[.5,.537],landmarks:[["rail",.4,-1],["rail",.63,1]],turns:[0,-.06,-.75,-1.14,.36,.6,.19,-.72,-.84,.15,.2,.16,.82,1.18,-.66,-1.18,.19,.48,-.31,.02,-.11]},{id:"shiosaki",name:"\u6F6E\u5D0E\u5CAC\u30E9\u30A4\u30F3",subtitle:"SHIOSAKI SUNSET CAPE",length:4120,width:11,grip:1.03,weather:"\u5915\u713C\u3051",surface:"\u30C9\u30E9\u30A4",tier:"\u521D\u7D1A",terrainGroup:"\u6D77\u5CB8",biome:"coast",description:"\u831C\u8272\u306E\u6D77\u3092\u898B\u4E0B\u308D\u3059\u65AD\u5D16\u306E\u9053\u3002\u706F\u53F0\u306E\u3042\u308B\u5CAC\u3092\u56DE\u308B\u9577\u3044\u30B3\u30FC\u30CA\u30FC\u304C\u540D\u7269\u3002",palette:["#663c66","#f0a275","#bb7886","#ffd697","#d6bdcb","#85734f","#526647","#7b7180","#a68773","#807275","#846c63"],slope:-.019,gradeWaves:[.033,.024],sun:[.51,.085,-.86],landmarks:[["lighthouse",.45,1],["wall",.76,-1]],turns:[.12,.15,.37,.66,.92,.98,.63,.32,-.16,-.41,-.85,-.9,-.48,-.18,.19,.68,.85,.26,-.25,-.17,.08]},{id:"mikazuki",name:"\u4E09\u65E5\u6708\u6D77\u5CB8\u9053\u8DEF",subtitle:"MIKAZUKI COAST ROAD",length:3512,width:10.2,grip:1,weather:"\u6D77\u9727\u306E\u6708\u591C",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u6D77\u5CB8",biome:"coast",description:"\u6708\u306E\u5149\u3092\u6620\u3059\u6D77\u5CB8\u7DDA\u3002\u5CA9\u3092\u3088\u3051\u308B\u77ED\u3044\u66F2\u304C\u308A\u89D2\u3068\u3001\u5CAC\u306E\u5148\u307E\u3067\u7D9A\u304F\u30B9\u30C8\u30EC\u30FC\u30C8\u3002",palette:["#101932","#607f9e","#49677b","#d2e4ff","#a6c0e2","#475b59","#34494d","#465975","#5d6e72","#656d79","#5a6c6a"],dark:!0,slope:.004,gradeWaves:[.048,.018],sun:[-.55,.32,-.77],landmarks:[["lighthouse",.63,1],["wall",.86,-1]],turns:[0,.08,-.49,-.84,-1.09,.73,.95,.48,.24,.07,-.06,-.13,.6,.82,.43,-.73,-1.01,.12,.38,.15,.1]},{id:"wakaba",name:"\u82E5\u8449\u6749\u6797\u5CE0",subtitle:"WAKABA CEDAR PASS",length:3720,width:9,grip:.86,weather:"\u96E8",surface:"\u30A6\u30A7\u30C3\u30C8",tier:"\u4E0A\u7D1A",terrainGroup:"\u68EE\u6797",biome:"cedar",description:"\u96E8\u7C92\u304C\u5149\u308B\u6749\u6797\u3092\u4E0B\u308B\u3002\u6FE1\u308C\u305F\u77F3\u6A4B\u304B\u3089\u59CB\u307E\u308B\u4E8C\u6BB5\u30B3\u30FC\u30CA\u30FC\u3067\u306F\u65E9\u3081\u306E\u6E1B\u901F\u304C\u5FC5\u8981\u3002",palette:["#203e44","#7faca0","#688671","#d1d9b4","#aad7c6","#4b6251","#255541","#526e6a","#5d6b61","#53616c","#58695d"],wet:!0,slope:-.065,gradeWaves:[.036,.016],bridge:[.39,.422],landmarks:[["shrine",.67,-1],["wall",.21,1]],turns:[.07,.13,.71,.89,-.58,-.88,-.21,.34,.69,1.13,-.82,-1.01,-.81,.62,.55,-.44,-.19,1.1,.57,-.24,-.03]},{id:"amatsuyu",name:"\u96E8\u9732\u5BBF\u5834\u8857\u9053",subtitle:"AMATSUYU POST TOWN",length:2400,width:9.6,grip:.9,weather:"\u591C\u96E8",surface:"\u6FE1\u308C\u305F\u8857\u9053",tier:"\u6A19\u6E96",terrainGroup:"\u5E02\u8857\u5730",biome:"village",description:"\u884C\u706F\u304C\u6FE1\u308C\u305F\u8DEF\u9762\u3092\u7167\u3089\u3059\u65E7\u5BBF\u5834\u3002\u77ED\u3044\u8DEF\u5730\u3068\u5E45\u306E\u5E83\u3044\u5927\u901A\u308A\u306E\u901F\u5EA6\u5DEE\u3092\u653B\u7565\u3059\u308B\u3002",palette:["#1c2033","#846658","#5c5860","#ffca7e","#bfb2bc","#514d4e","#35594e","#534955","#665d61","#515a65","#685f5f"],dark:!0,wet:!0,slope:-.01,gradeWaves:[.013,.008],landmarks:[["village",.23,-1],["village",.45,1],["village",.7,-1],["shrine",.82,1]],turns:[0,.03,.06,.62,.69,.66,-.54,-.59,-.26,-.26,-.27,.52,.63,.67,.68,-.28,-.63,-.19,.04,.06]},{id:"yuzuriha",name:"\u696A\u3082\u307F\u3058\u53C2\u9053",subtitle:"YUZURIHA AUTUMN ROAD",length:4e3,width:10,grip:.95,weather:"\u79CB\u6674\u308C",surface:"\u843D\u3061\u8449\u306E\u8217\u88C5",tier:"\u4E0A\u7D1A",terrainGroup:"\u68EE\u6797",biome:"autumn",description:"\u6A59\u8272\u306E\u7D05\u8449\u306B\u56F2\u307E\u308C\u305F\u53C2\u9053\u3002\u9053\u306E\u52FE\u914D\u306E\u5207\u66FF\u3068\u3001\u5DE6\u53F3\u306B\u9023\u7D9A\u3059\u308B\u30AB\u30FC\u30D6\u3067\u30EA\u30BA\u30E0\u3092\u53D6\u308B\u3002",palette:["#496f8e","#d9bc88","#aa936f","#ffda88","#e1dbb6","#947044","#b66a31","#897d7e","#9f8662","#727375","#8f7752"],slope:-.036,gradeWaves:[.074,.03],landmarks:[["shrine",.43,-1],["wall",.7,1]],sun:[-.46,.39,-.79],turns:[0,-.04,-.44,-.97,.46,1.13,.69,-.44,-1.16,-.68,.78,1.16,.36,-.57,-.98,-.36,.82,1.12,-.34,-.8,-.29,.01]},{id:"hayasaka",name:"\u65E9\u5742\u306E\u7267\u8349\u5730",subtitle:"HAYASAKA MEADOW RUN",length:5800,width:13,grip:1.07,weather:"\u5348\u5F8C\u306E\u6674\u5929",surface:"\u30C9\u30E9\u30A4",tier:"\u521D\u7D1A",terrainGroup:"\u9AD8\u539F",biome:"meadow",description:"\u53CE\u7A6B\u671F\u306E\u8349\u539F\u3068\u6728\u9020\u306E\u7D0D\u5C4B\u3092\u629C\u3051\u308B\u30ED\u30F3\u30B0\u30B3\u30FC\u30B9\u3002\u5E83\u3044\u9053\u5E45\u3068\u9577\u3044\u76F4\u7DDA\u3067\u9AD8\u901F\u8D70\u884C\u3092\u697D\u3057\u3081\u308B\u3002",palette:["#326fab","#e0c999","#aaac86","#ffe7a2","#d9ddc1","#8c8048","#607747","#7d9291","#978d5e","#837f78","#877650"],slope:-.008,gradeWaves:[.024,.017],landmarks:[["chalet",.18,1],["chalet",.55,-1],["village",.8,1]],sun:[.62,.41,-.66],turns:[0,.04,.06,.14,.47,.75,.61,.23,.1,.07,-.12,-.41,-.58,-.73,-.7,-.53,-.42,-.12,.38,.72,.24,.07]},{id:"minakami",name:"\u6C34\u4E0A\u8CAF\u6C34\u6E56\u9053\u8DEF",subtitle:"MINAKAMI RESERVOIR",length:4900,width:10.4,grip:.97,weather:"\u8584\u66AE",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u6E13\u8C37",biome:"reservoir",description:"\u6E56\u9762\u3092\u6A2A\u65AD\u3059\u308B\u6731\u8272\u306E\u9577\u5927\u6A4B\u3002\u6C34\u8FBA\u306E\u7DE9\u3044\u30B3\u30FC\u30CA\u30FC\u304B\u3089\u5C71\u5074\u306E\u5207\u308A\u8FD4\u3057\u3078\u3064\u306A\u304C\u308B\u3002",palette:["#3c5d86","#b599a6","#7993a1","#f2c5ac","#b6cbd5","#50695f","#306058","#586f87","#777f80","#737780","#657b70"],slope:-.023,gradeWaves:[.039,.026],bridge:[.43,.52],bridgeColor:"#a85b42",landmarks:[["wall",.7,-1],["obelisk",.31,1]],sun:[-.36,.1,-.93],turns:[.08,.11,.59,.69,.24,-.6,-.79,-.29,-.17,-.16,-.16,-.1,.43,.8,.83,-.66,-1.04,.21,.72,.6,-.36,-.59,-.11,.03]},{id:"kumogakure",name:"\u96F2\u96A0\u306E\u77F3\u5854\u5CE0",subtitle:"KUMOGAKURE CLOUD PASS",length:4560,width:9.5,grip:.94,weather:"\u6FC3\u9727\u30FB\u671D",surface:"\u6E7F\u3063\u305F\u8217\u88C5",tier:"\u4E0A\u7D1A",terrainGroup:"\u5CE0",biome:"alpine",description:"\u96F2\u6D77\u306B\u6D6E\u304B\u3076\u77F3\u5854\u3092\u76EE\u6307\u3059\u9577\u3044\u767B\u308A\u3002\u8996\u754C\u304C\u958B\u3051\u308B\u7A1C\u7DDA\u307E\u3067\u306F\u66F2\u7DDA\u306E\u5148\u3092\u8AAD\u307F\u3065\u3089\u3044\u3002",palette:["#596b88","#cfbaca","#a8a6b3","#ffdebf","#d5ced9","#64706b","#546665","#7b8293","#92968a","#676f76","#767e75"],clouded:!0,foggy:!0,slope:.041,gradeWaves:[.082,.019],landmarks:[["obelisk",.36,-1],["chalet",.64,1]],sun:[.22,.17,-.96],turns:[.02,.09,-.53,-1.05,.49,.95,-.3,-1.04,-.92,.34,.87,1.17,-.46,-1.15,-.56,.66,1.16,.77,-.36,-.9,.42,.73,.05]},{id:"yukishiro",name:"\u96EA\u4EE3\u5CE0",subtitle:"YUKISHIRO WHITE RUN",length:4500,width:11.4,grip:.86,weather:"\u96EA\u6674\u308C",surface:"\u51CD\u7D50\u6C17\u5473\u306E\u8217\u88C5",tier:"\u4E0A\u7D1A",terrainGroup:"\u96EA\u5C71",biome:"snow",description:"\u7C89\u96EA\u306E\u767D\u3055\u304C\u9752\u7A7A\u306B\u6620\u3048\u308B\u767B\u308A\u5742\u3002\u5C71\u8358\u306E\u5148\u306B\u306F\u9AD8\u901F\u306E\u66F2\u304C\u308A\u89D2\u3068\u65E5\u9670\u306E\u51CD\u7D50\u8DEF\u9762\u3002",palette:["#316894","#a5c9da","#94afc4","#fff0d4","#d5eaff","#adbfcb","#365760","#7f9fb3","#81949f","#697a89","#a6b9c9"],snow:!0,slope:.027,gradeWaves:[.067,.018],landmarks:[["chalet",.25,-1],["chalet",.71,1]],sun:[.36,.46,-.8],turns:[0,.05,.32,.77,1.02,-.47,-.88,-.54,.12,.38,.51,-.22,-.71,-1.09,-.41,.61,1.12,.97,.16,.12,-.35,.02,.11]},{id:"fuyunagi",name:"\u51AC\u51EA\u591C\u96EA\u8857\u9053",subtitle:"FUYUNAGI WINTER NIGHT",length:3640,width:9.8,grip:.87,weather:"\u591C\u96EA",surface:"\u51B7\u3048\u305F\u8217\u88C5\u8DEF",tier:"\u4E0A\u7D1A",terrainGroup:"\u96EA\u5C71",biome:"snow",description:"\u6DF1\u3044\u9752\u306E\u591C\u306B\u96EA\u304C\u821E\u3046\u3002\u6728\u306E\u6A4B\u3092\u904E\u304E\u308B\u3068\u6797\u306E\u4E2D\u3078\u5165\u308A\u3001\u304D\u3064\u3044\u5207\u308A\u8FD4\u3057\u304C\u5F85\u3064\u3002",palette:["#101a35","#687b96","#526581","#d5def7","#a7bddf","#8599b3","#344f63","#50687f","#65788b","#5a626f","#8d9eae"],dark:!0,snow:!0,slope:-.052,gradeWaves:[.034,.022],bridge:[.6,.649],bridgeColor:"#7e6759",landmarks:[["chalet",.3,-1],["wall",.76,1]],sun:[-.57,.28,-.77],turns:[.05,.05,-.83,-1.05,.14,.79,.42,-.48,-1.07,-.39,.69,.93,.15,.11,.09,-.68,-1.14,.76,1.13,-.55,-.2,.01]},{id:"kogarashi",name:"\u6728\u67AF\u3089\u3057\u9053",subtitle:"KOGARASHI SNOW RIDGE",length:6200,width:11.8,grip:.91,weather:"\u96EA\u96F2",surface:"\u51B7\u3048\u305F\u8217\u88C5\u8DEF",tier:"\u4E0A\u7D1A",terrainGroup:"\u96EA\u5C71",biome:"snow",description:"\u96EA\u96F2\u3068\u7A1C\u7DDA\u306E\u9593\u3092\u8D70\u308B\u9577\u8DDD\u96E2\u9AD8\u539F\u8DEF\u3002\u96EA\u3088\u3051\u306E\u8986\u3044\u3092\u629C\u3051\u305F\u5148\u3067\u9AD8\u901F\u533A\u9593\u306B\u5165\u308B\u3002",palette:["#4f5575","#bcb5c9","#9a9cb2","#f6d6b2","#c8d6e7","#aeb8c1","#435665","#8799ae","#8795a2","#77808c","#b1b9bf"],snow:!0,clouded:!0,slope:-.046,gradeWaves:[.055,.02],tunnels:[[.3,.334],[.65,.692]],landmarks:[["chalet",.39,1],["chalet",.73,-1]],sun:[.34,.26,-.9],turns:[0,-.04,-.26,-.8,-.87,-.4,.18,.47,.53,.55,.26,-.16,-.66,-.96,.19,.8,.68,.03,-.18,-.16,-.09,.17,.78,.89,-.29,-.71,-.33,.06]},{id:"suzukae",name:"\u6DBC\u66FF\u7AF9\u6797\u5CE0",subtitle:"SUZUKAE BAMBOO PASS",length:2800,width:8.8,grip:1,weather:"\u521D\u590F\u306E\u6674\u5929",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u68EE\u6797",biome:"bamboo",description:"\u7AF9\u6797\u306E\u6728\u6F0F\u308C\u65E5\u3068\u77F3\u6BB5\u306E\u9593\u3092\u8D70\u308B\u3002\u8DEF\u80A9\u306E\u72ED\u3044\u30B3\u30FC\u30CA\u30FC\u3092\u4E01\u5BE7\u306B\u3064\u306A\u3044\u3067\u30BF\u30A4\u30E0\u3092\u524A\u308B\u3002",palette:["#387b9b","#b4ca98","#809e80","#fff3b0","#bbdfbd","#596d46","#45763c","#618271","#67785f","#6e7974","#647a56"],slope:-.017,gradeWaves:[.06,.025],landmarks:[["shrine",.48,-1],["wall",.72,1]],sun:[.63,.54,-.55],turns:[.03,.07,.45,.91,-.48,-1.03,.12,.48,.11,-.35,-.61,.72,.95,.1,-.87,-1.05,.44,.79,.09,-.01]},{id:"tamahira",name:"\u7389\u5E73\u77F3\u57A3\u5CE1",subtitle:"TAMAHIRA STONE GORGE",length:4080,width:9.2,grip:.96,weather:"\u8D64\u3044\u8584\u66AE",surface:"\u30C9\u30E9\u30A4",tier:"\u4E0A\u7D1A",terrainGroup:"\u6E13\u8C37",biome:"rock",description:"\u5915\u66AE\u308C\u306B\u8D64\u304F\u67D3\u307E\u308B\u5CA9\u58C1\u3068\u53E4\u3044\u77F3\u7A4D\u307F\u3002\u5CA9\u306E\u5F35\u308A\u51FA\u3057\u3092\u56DE\u308B\u92ED\u3044\u30AB\u30FC\u30D6\u304C\u9023\u7D9A\u3059\u308B\u3002",palette:["#543d61","#d99e8b","#9d7584","#ffc29b","#dec2ce","#77625f","#615b57","#79637c","#987573","#716d77","#786b62"],slope:-.073,gradeWaves:[.043,.029],bridge:[.48,.505],landmarks:[["wall",.29,-1],["wall",.64,1],["obelisk",.78,-1]],sun:[-.56,.13,-.78],turns:[.03,.05,-.45,-1.08,.55,.98,.21,-.71,-1.02,-.42,.45,.94,1.12,.52,-.66,-1.18,-.9,.34,1.08,.37,-.46,-.83,.07]},{id:"tsukishima",name:"\u6708\u5CF6\u65E7\u6E2F\u30EB\u30FC\u30C8",subtitle:"TSUKISHIMA OLD PORT",length:3216,width:10.5,grip:1.04,weather:"\u6E2F\u306E\u591C\u666F",surface:"\u30C9\u30E9\u30A4",tier:"\u6A19\u6E96",terrainGroup:"\u5E02\u8857\u5730",biome:"port",description:"\u53E4\u3044\u5009\u5EAB\u3068\u71C8\u7C60\u306E\u9593\u3092\u901A\u308B\u6E2F\u753A\u30EB\u30FC\u30C8\u3002\u5CB8\u58C1\u6CBF\u3044\u306E\u9577\u3044\u30AB\u30FC\u30D6\u304B\u3089\u8857\u533A\u306E\u5207\u308A\u8FD4\u3057\u3078\u3002",palette:["#171f3a","#7e8294","#5c657d","#ffe6ab","#bac9df","#535754","#365552","#526076","#766c67","#686e79","#6e685f"],dark:!0,slope:-.008,gradeWaves:[.019,.014],landmarks:[["village",.2,-1],["lighthouse",.41,1],["village",.57,-1],["village",.8,1]],sun:[.53,.28,-.78],turns:[0,.06,.1,.57,.86,.97,.76,.45,.06,-.18,-.28,-.57,-.74,-.34,.31,.64,.5,.28,-.4,-.65,-.27,-.03]}],e1=["skyTop","skyHorizon","fog","glow","ambient","earth","foliage","mountain","rock","road","shoulder"],ui=Object.freeze([...$0,...Q0.map((i,e)=>{let{palette:t,turns:n,slope:r,gradeWaves:s,sun:a,landmarks:o,clouded:l,bridge:c,tunnels:h,...d}=i,u=121+e*41,p=n.length-1;gf[d.id]=n.map((y,f)=>{let g=f/p;return[g+.007*Math.sin(f*(1.19+e*.056))*Math.sin(g*Math.PI),y]}),vf[d.id]={...Object.fromEntries(e1.map((y,f)=>[y,t[f]])),seed:u,slope:r,gradeWaves:s,sun:a??[.5,.35,-.75],density:d.foggy?.0067:d.wet?.0042:l?.0031:d.dark?.0023:.0015,stars:d.dark&&!d.wet?1:0,clouds:l?.89:d.wet?.82:.53,snow:!!d.snow,biome:d.biome,horizontal:["port","village","reservoir","coast","meadow"].includes(d.biome)?.38:1,forestDensity:{coast:.26,port:.17,rock:.34,meadow:.32,reservoir:.46,village:.43,alpine:.61}[d.biome]??1};let m=y=>y.map(f=>Math.round(d.length*f/4)*4);return Object.freeze({dark:!1,wet:!1,...d,lengthKm:(d.length/1e3).toFixed(1),bridge:c&&m(c),tunnels:h?.map(m),landmarks:o?.map(([y,f,g])=>[y,Math.round(f*d.length),g])})})]),qt=4,pr=80,yf=140;function xa(i,e,t=0){return!!(i&&e>=i[0]-t&&e<=i[1]+t)}function Ui(i,e,t=0){return i.tunnels?.some(n=>xa(n,e,t))??!1}var Ft=(i,e,t)=>Math.min(t,Math.max(e,i)),Lt=(i,e,t)=>i+(e-i)*t,ln=i=>i*i*(3-2*i);function Ma(i){let e=i;return()=>(e=Math.imul(e,1664525)+1013904223|0,(e>>>0)/4294967296)}function fr(i,e,t){let n=Math.imul(i+t,374761393)+Math.imul(e,668265263);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967295}function hi(i,e,t){let n=Math.floor(i),r=Math.floor(e),s=ln(i-n),a=ln(e-r);return Lt(Lt(fr(n,r,t),fr(n+1,r,t),s),Lt(fr(n,r+1,t),fr(n+1,r+1,t),s),a)}function cu(i,e){let[t,n]=e.gradeWaves??[.055,.018];return e.slope+t*Math.sin(i/108+e.seed)*Math.sin(i/260)+n*Math.sin(i/44)*ln(Ft(i/100,0,1))}function dr(i,e){let t=Ft(i/e.length,0,1),n=gf[e.id],r=1;for(;n[r][0]<t;)r++;let s=n[r-1],a=n[r];return Lt(s[1],a[1],ln((t-s[0])/(a[0]-s[0])))}function uu(i){let e=ui.find(c=>c.id===i)??ui[0],t=vf[e.id],n=[],r=-pr*Math.sin(dr(0,e)),s=-pr*cu(0,t),a=pr*Math.cos(dr(0,e));for(let c=-pr;c<=e.length+yf;c+=qt){let h=dr(c,e);n.push({x:r,y:s,z:a,heading:h,grade:cu(c,t),curve:(dr(c+2,e)-dr(c-2,e))/4,d:c}),r+=qt*Math.sin(dr(c+qt/2,e)),s+=qt*cu(c+qt/2,t),a-=qt*Math.cos(dr(c+qt/2,e))}function o(c,h={}){let d=Ft((c+pr)/qt,0,n.length-1),u=n[Math.floor(d)],p=n[Math.ceil(d)],m=d%1;return h.x=Lt(u.x,p.x,m),h.y=Lt(u.y,p.y,m),h.z=Lt(u.z,p.z,m),h.heading=Lt(u.heading,p.heading,m),h.grade=Lt(u.grade,p.grade,m),h.curve=Lt(u.curve,p.curve,m),h}function l(c,h){let d=0,u=n.length-1;for(;d<u;){let y=d+u>>1;n[y].z>h?d=y+1:u=y}let p=n[d],m=1/0;for(let y=Math.max(0,d-68);y<Math.min(n.length,d+69);y++){let f=n[y],g=f.x-c,v=f.z-h,_=g*g+v*v;_<m&&(p=f,m=_)}return{point:p,distance:Math.sqrt(m)}}return{track:e,scheme:t,length:e.length,width:e.width,sample:o,nearest:l,entries:n}}function Ve(i,e,t=0){return[i.x+Math.cos(i.heading)*e,i.y+t,i.z+Math.sin(i.heading)*e]}function t1(i,e){if(typeof document>"u")return null;let t=document.createElement("canvas"),n=e?512:256;t.width=t.height=n;let r=t.getContext("2d");if(!r)return null;let s=r.createImageData(n,n),a=Ma(148);for(let l=0;l<n;l++)for(let c=0;c<n;c++){let h=4*(l*n+c),d=c/n,u=l/n,p=hi(d*126,u*154,28),m=hi(d*7,u*7,31)*20+hi(d*19,u*20,103)*16,y=Math.exp(-Math.pow((d-.273)/.049,2))+Math.exp(-Math.pow((d-.725)/.049,2)),f=Math.pow(Math.abs(d-.5)*2,12),g=122+a()*17+m+p*30+(a()>.972?35:0)-36*y-f*36;s.data[h]=g,s.data[h+1]=g+2,s.data[h+2]=g+(i?10:4),s.data[h+3]=255}r.putImageData(s,0,0);let o=new pn(t);return o.wrapS=o.wrapT=Fr,o.colorSpace=yt,o.anisotropy=8,o}function ci(i,e,t,n,r,s={}){let{segment:a=qt,start:o=-pr,end:l=i.length+yf}=s,c=[],h=[],d=[],u=Math.ceil((l-o)/a),p={};for(let y=0;y<=u;y++){let f=Lt(o,l,y/u);if(i.sample(f,p),c.push(...Ve(p,e,n),...Ve(p,t,n)),d.push(0,f/14,1,f/14),y<u&&(!s.filter||s.filter(f))){let g=y*2;h.push(g,g+1,g+2,g+1,g+3,g+2)}}let m=new Be;return m.setAttribute("position",new ve(c,3)),m.setAttribute("uv",new ve(d,2)),m.setIndex(h),m.computeVertexNormals(),new Ie(m,r)}function n1(i,e,t,n){let r=new oa({color:t.road,map:t1(e.track.wet,n),shininess:e.track.wet?76:8,specular:e.track.wet?"#8ba9c6":"#383736"}),s=new mn({color:t.shoulder}),a=new mn({color:"#ced4cc",emissive:"#242a2d"}),o=new mn({color:"#e5aa46",emissive:"#4e3216"});r.bumpMap=r.map,r.bumpScale=e.track.wet?.032:.044;let l=new ct({color:e.track.wet?"#8596ab":"#131821",transparent:!0,opacity:e.track.wet?.19:.15,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),c=e.width*.5,h={segment:n?2:qt};i.add(ci(e,-c-2.1,c+2.1,-.06,s,h)),i.add(ci(e,-c,c,0,r,h)),i.add(ci(e,-c+.22,-c+.32,.019,a)),i.add(ci(e,c-.32,c-.22,.019,a));let d={filter:p=>(p+pr)%12<4};i.add(ci(e,-.19,-.07,.022,o,d)),i.add(ci(e,.07,.19,.022,o,d)),i.add(ci(e,-2.65,-2.37,.025,l)),i.add(ci(e,2.37,2.65,.025,l)),e.track.wet&&i1(i,e);let u=new ct({color:"#dddcd6"});for(let p of[0,e.length]){let m=e.sample(p),y=new Ut(e.width-.7,.52),f=new Ie(y,u);f.position.set(...Ve(m,0,.047)),f.rotation.order="YXZ",f.rotation.y=-m.heading,f.rotation.x=-Math.PI/2+Math.atan(m.grade),i.add(f)}}function i1(i,e){let t=new Pt({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,vertexShader:`
      varying vec2 roadUV;
      varying vec3 viewPosition;
      void main() {
        roadUV = uv;
        viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * vec4(viewPosition, 1.0);
      }
    `,fragmentShader:`
      varying vec2 roadUV;
      varying vec3 viewPosition;
      void main() {
        float edge = abs(roadUV.x - .5) * 2.0;
        float flecks = sin(roadUV.y * 13.0 + sin(roadUV.x * 35.0)) * sin(roadUV.y * 5.2 + roadUV.x * 56.0);
        float runoff = sin(roadUV.y * 2.1 + roadUV.x * 13.0) * .11 + sin(roadUV.y * 6.2) * .08;
        float wet = smoothstep(.66, .86, edge + runoff + flecks * .055) * (1.0 - smoothstep(.961, 1.0, edge));
        float sheen = .17 + .27 * smoothstep(4.0, 31.0, length(viewPosition));
        float fogFalloff = 1.0 - smoothstep(35.0, 140.0, length(viewPosition));
        vec3 reflectedSky = mix(vec3(.11, .19, .24), vec3(.27, .40, .50), flecks * .24 + .48);
        gl_FragColor = vec4(reflectedSky, wet * sheen * fogFalloff);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),n=ci(e,-e.width*.5,e.width*.5,.013,t);n.renderOrder=1,i.add(n)}function hu(i,e){if(!e.bridge)return 0;let[t,n]=e.bridge;return ln(Ft((i-(t-40))/60,0,1))*ln(Ft((n+44-i)/60,0,1))}function _f(i,e,t,n){let{point:r,distance:s}=i.nearest(t,n),a=Math.sign((t-r.x)*Math.cos(r.heading)+(n-r.z)*Math.sin(r.heading)),o=["coast","port"].includes(e.biome),l=o||Math.sin(r.d/455+e.seed)>-.65?-1:1,c=a===l?Math.min(s*.52,125):-Math.min(s*.36,54),h=ln(Ft((s-i.width*.5-5)/28,0,1)),d=hi(t/98,n/112,e.seed),u=(d-.46)*51+(hi(t/22,n/18,71)-.5)*12,p=Math.pow(hi(t/310,n/290,50+e.seed),2)*460,m=ln(Ft((s-65)/420,0,1)),y=68*hu(r.d,i.track)*(1-ln(Ft((s-40)/135,0,1))),f=o&&a>0?37*ln(Ft((s-10)/44,0,1)):0,g=e.horizontal??1;return{h:r.y-.6+c*h*(o?1:g)+u*h*g+p*m*(o&&a>0?.1:g)-y-f,distance:s,side:a,direction:l,shade:d}}function r1(i,e,t,n){let s=Math.min(...e.entries.map(w=>w.x))-650,a=Math.max(...e.entries.map(w=>w.x))+650,o=e.entries[0].z+650,l=e.entries.at(-1).z-650,c=n?8:15,h=Math.ceil((a-s)/c),d=Math.ceil((o-l)/c),u=[],p=[],m=new fe(t.earth),y=new fe(t.mountain),f=new fe(t.rock),g=new fe;for(let w=0;w<=d;w++){let A=Lt(o,l,w/d);for(let T=0;T<=h;T++){let C=Lt(s,a,T/h),P=_f(e,t,C,A),U=e.width*.5+c*1.7;u.push(C,P.h-3.2*(1-ln(Ft((P.distance-U)/(c*1.2),0,1))),A),g.copy(m).lerp(y,ln(Ft((P.distance-90)/400,0,1))*.82),P.side===P.direction&&g.lerp(f,Ft(P.shade*.85-.24,0,1));let O=hi(C/22,A/22,63)*.45+hi(C/8,A/14,72)*.12;t.snow&&g.lerp(f,Ft((P.shade-.52)*1.45,0,.45)),g.multiplyScalar(.72+O),p.push(g.r,g.g,g.b)}}let v=(h+1)*3,_=new Float32Array(u.length);for(let w=0;w<=d;w++)for(let A=0;A<=h;A++){let T=w*v+A*3,C=w*v+Math.max(0,A-1)*3,P=w*v+Math.min(h,A+1)*3,U=Math.max(0,w-1)*v+A*3,O=Math.min(d,w+1)*v+A*3,N=-(u[P+1]-u[C+1])/(u[P]-u[C]),H=-(u[O+1]-u[U+1])/(u[O+2]-u[U+2]),V=1/Math.hypot(N,1,H);_.set([N*V,V,H*V],T)}let x=new mn({vertexColors:!0}),S=Math.floor(165/c),M=Math.floor(230/c);for(let w=0;w<d;w+=S)for(let A=0;A<h;A+=M){let T=Math.min(S,d-w),C=Math.min(M,h-A),P=[],U=[],O=[],N=[];for(let K=0;K<=T;K++)for(let Y=0;Y<=C;Y++){let re=(w+K)*v+(A+Y)*3;if(P.push(u[re],u[re+1],u[re+2]),U.push(p[re],p[re+1],p[re+2]),O.push(_[re],_[re+1],_[re+2]),K<T&&Y<C){let ce=K*(C+1)+Y;N.push(ce,ce+1,ce+C+1,ce+1,ce+C+2,ce+C+1)}}let H=new Be;H.setAttribute("position",new ve(P,3)),H.setAttribute("color",new ve(U,3)),H.setAttribute("normal",new ve(O,3)),H.setIndex(N),H.computeBoundingSphere();let V=new Ie(H,x);V.userData.zSector=H.boundingSphere.center.z,i.userData.sectors.push(V),i.add(V)}return(w,A)=>{let T=Ft((w-s)/(a-s)*h,0,h-.001),C=Ft((o-A)/(o-l)*d,0,d-.001),P=Math.floor(T),U=Math.floor(C),O=T-P,N=C-U,H=(U*(h+1)+P)*3+1,V=H+(h+1)*3;return O+N<1?(1-O-N)*u[H]+O*u[H+3]+N*u[V]:(1-N)*u[H+3]+(1-O)*u[V]+(O+N-1)*u[V+3]}}function s1(i,e,t,n){let r=[],s=[],a=[],o=new fe(t.shoulder),l=new fe(t.earth),c=new fe(t.rock),h=new fe,d=[0,.8,2.7,6,11,19],u=d.length;for(let m of[-1,1]){let y=r.length/3;e.entries.forEach((f,g)=>{d.forEach((v,_)=>{let x=Ve(f,m*(e.width*.5+2.08+v)),S=n(x[0],x[2])-.22;if(x[1]=Lt(f.y-.067,S,ln(Ft(v/16,0,1))),_>1&&_<d.length-1&&(x[1]+=(fr(g,_+m*41,t.seed)-.5)*.4),r.push(...x),h.copy(o).lerp(l,Ft(v/16,0,1)),h.lerp(c,Math.max(0,fr(g,_,65)-.64)),a.push(h.r,h.g,h.b),g+1<e.entries.length&&_+1<u){if(xa(e.track.bridge,f.d+qt/2,qt/2))return;let M=y+g*u+_;m===1?s.push(M,M+1,M+u,M+1,M+u+1,M+u):s.push(M,M+u,M+1,M+1,M+u,M+u+1)}})})}let p=new Be;p.setAttribute("position",new ve(r,3)),p.setAttribute("color",new ve(a,3)),p.setIndex(s),p.computeVertexNormals(),i.add(new Ie(p,new mn({vertexColors:!0})))}function rt(i,e="#000000"){return new mn({color:i,emissive:e})}function Qe(i,e,t,n,r=!1){if(!n.length){e.dispose();return}let s=new Map,a=new Mt;for(let o of n){let l=r?Math.floor(o.at[2]/210):0;s.has(l)||s.set(l,[]),s.get(l).push(o)}for(let[o,l]of s){let c=new Xs(e,t,l.length);l.forEach(({at:h,angle:d=0,size:u=[1,1,1],tint:p,tilt:m=0},y)=>{a.position.set(...h),a.rotation.set(m,d,0,"YXZ"),a.scale.set(...u),a.updateMatrix(),c.setMatrixAt(y,a.matrix),p&&c.setColorAt(y,p)}),c.instanceMatrix.needsUpdate=!0,c.computeBoundingSphere(),r&&(c.userData.zSector=o*210+105,i.userData.sectors.push(c)),i.add(c)}}function ff(i=!1){let e=[],t=[],n=[],r=Ma(157),s=16;for(let o=0;o<5;o++){let l=.18+o*.141,c=.53*(1-o*.168),h=Math.min(1,l+.29-o*.009),d=e.length/3;for(let u=0;u<s;u++){let p=u*Math.PI*2/s+o*.69,m=(u%2?.62:1.02)*(.87+r()*.27),y=(u%2?.055:-.014)+r()*.04,f=l+y+(i?.05:0),g=i?.81:1;for(let[x,S,M]of[[c*m*g,f,.54+r()*.15],[c*.69*m*g,Lt(f,h,.49)+(i?.035:0),.73+r()*.18],[c*.14*g,h+(i?.025:0),.97+r()*.12]])e.push(Math.cos(p)*x,S,Math.sin(p)*x),n.push(M,M,M);let v=d+u*3,_=d+(u+1)%s*3;t.push(v,v+1,_,_,v+1,_+1,v+1,v+2,_+1,_+1,v+2,_+2)}}let a=new Be;return a.setAttribute("position",new ve(e,3)),a.setAttribute("color",new ve(n,3)),a.setIndex(t),a.computeVertexNormals(),a}function a1(i,e,t,n,r){let s=Ma(t.seed),a=[],o=[],l=[],c=[],h=[],d=[],u=[],p=[],m=[],y=["autumn","broadleaf"].includes(t.biome),f=new fe,g=new fe(t.foliage),v=new fe(t.rock),_=r?8:14;for(let x=-46;x<e.length+100;x+=_){let S=e.sample(x);for(let M of[-1,1])if(!(hu(x,e.track)>.12)&&!Ui(e.track,x,16)&&!(s()>(t.forestDensity??1)*(t.snow?.65:.88))&&!e.track.landmarks?.some(([w,A,T])=>T===M&&Math.abs(A-x)<(w==="village"?74:22))){for(let w=0;w<(r?4:2);w++){let A=Ve(S,M*(e.width*.5+6+w*15+s()*15));if(_f(e,t,A[0],A[2]).distance<e.width*.5+7)continue;let C=6+s()*13,P=C*(.24+s()*.13),U=s()*Math.PI*2,O=n(A[0],A[2])-.48,N=f.copy(g).multiplyScalar(.72+s()*.65).clone();if(t.biome==="autumn"&&N.lerp(new fe(["#af3827","#de7835","#bda247","#622b26"][Math.floor(s()*4)]),.58),t.biome==="bamboo")for(let V=0;V<(r?5:3);V++){let K=C*(.63+s()*.38);m.push({at:[A[0]+(s()-.5)*3,O+K*.47,A[2]+(s()-.5)*3],size:[.25,K,.25],tilt:(s()-.5)*.12,tint:N})}if(y||t.biome==="bamboo"){let V=t.biome==="bamboo"?2:r?4:2;for(let K=0;K<V;K++)p.push({at:[A[0]+(s()-.5)*P,O+C*(.64+s()*.25),A[2]+(s()-.5)*P],size:[P*.79,C*(t.biome==="bamboo"?.11:.26),P*.76],angle:U,tint:N});y&&o.push({at:[A[0],O+C*.24,A[2]],size:[.7,C*.68,.7],angle:U});continue}let H=t.snow&&s()>.24;if(r&&w<2){let V={at:[A[0],O,A[2]],size:[P,C,P],angle:U,tint:N};h.push(V),H&&d.push({...V,tint:new fe("#d9e6ee").multiplyScalar(.65+s()*.35)})}else a.push({at:[A[0],O+C*.51,A[2]],size:[P,C*.64,P],angle:U,tint:N}),a.push({at:[A[0],O+C*.75,A[2]],size:[P*.75,C*.63,P*.75],angle:U+.7,tint:N}),H&&c.push({at:[A[0],O+C*.9,A[2]],size:[P*.42,C*.39,P*.42],angle:U+.7});o.push({at:[A[0],O+C*.19,A[2]],size:[.5,C*.52,.5],angle:U})}if(s()<.29){let w=Ve(S,M*(e.width*.5+3.7+s()*5));w[1]=n(w[0],w[2]),l.push({at:w,size:[1+s()*2,1+s()*2,1+s()*3],angle:s()*7,tint:f.copy(v).multiplyScalar(.78+s()*.5).clone()})}if(r&&s()<.12&&hu(x,e.track)<.12){let w=Ve(S,M*(e.width*.5+18+s()*28));e.nearest(w[0],w[2]).distance>e.width*.5+14&&(w[1]=n(w[0],w[2]),u.push({at:w,size:[3+s()*6,2+s()*6,3+s()*9],angle:s()*7,tint:f.copy(v).multiplyScalar(.72+s()*.48).clone()}))}}}if(h.length){let x=new mn({color:"#fff",vertexColors:!0,side:Nt});Qe(i,ff(),x,h,!0),d.length&&Qe(i,ff(!0),x,d,!0)}p.length&&Qe(i,new ai(1,r?9:6,r?6:4),rt("#ffffff"),p,!0),m.length&&Qe(i,new fn(.42,.5,1,r?9:5),rt("#b0a774"),m,!0),Qe(i,new Ki(.48,1,r?10:6),rt("#ffffff"),a,!0),Qe(i,new fn(.21,.32,1,r?9:5),rt("#504742"),o,!0),Qe(i,mf(r?2:0,75),rt("#ffffff"),l,!0),u.length&&Qe(i,mf(3,37),rt("#ffffff"),u,!0),c.length&&Qe(i,new Ki(.48,1,r?10:6),rt("#c1cbd0"),c,!0)}function mf(i,e){let t=new Xr(.85,i),n=t.getAttribute("position");for(let r=0;r<n.count;r++){let s=n.getX(r),a=n.getY(r),o=n.getZ(r),c=.75+hi(s*3+a*2,o*4+a*3,e)*.51;n.setXYZ(r,s*c,Math.max(a*c,-.51),o*c)}return t.computeVertexNormals(),t}function o1(){if(typeof document>"u")return null;let i=document.createElement("canvas");i.width=128,i.height=64;let e=i.getContext("2d");if(!e)return null;e.fillStyle="#f2d176",e.fillRect(0,0,128,64),e.strokeStyle="#392b20",e.lineWidth=5,e.strokeRect(2.5,2.5,123,59),e.lineWidth=10;for(let n of[18,51,84])e.beginPath(),e.moveTo(n,16),e.lineTo(n+16,32),e.lineTo(n,48),e.stroke();let t=new pn(i);return t.colorSpace=yt,t.anisotropy=4,t}function xf(){if(typeof document>"u")return null;let i=document.createElement("canvas");i.width=i.height=64;let e=i.getContext("2d");if(!e)return null;let t=e.createRadialGradient(32,32,0,32,32,31);t.addColorStop(0,"rgba(255,245,204,0.94)"),t.addColorStop(.18,"rgba(250,213,137,0.55)"),t.addColorStop(.47,"rgba(251,183,99,0.22)"),t.addColorStop(1,"rgba(231,151,70,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);let n=new pn(i);return n.colorSpace=yt,n}function l1(i,e,t){let n=rt(t.snow?"#abbcc8":"#778386"),r=rt("#5f6870"),s=new ct({color:"#f3c580"}),a=new ct({color:"#d4e9f5"}),o=new ct({color:"#ffe1ad"}),l=xf(),c=new ct({transparent:!0,depthWrite:!1,blending:Bn,opacity:e.track.wet?.74:.44,map:l,polygonOffset:!0,polygonOffsetFactor:-2}),h=new ct({map:o1(),color:"#ffffff",side:Nt}),d=[],u=[],p=[],m=[],y=[],f=[],g=[],v=[],_=[],x=[],S=[],M=e.width*.5+.75;for(let T=-66;T<e.length+120;T+=4){let C=e.sample(T),P=e.sample(T-2),U=e.sample(T+2);for(let O of[-1,1]){let N=Ve(C,O*M,.65);if(T<24||e.length-T<27||O===1||Math.abs(C.curve)>.009||xa(e.track.bridge,T+qt/2,qt/2)){let V=Ve(P,O*M),K=Ve(U,O*M),Y=Math.hypot(K[0]-V[0],K[2]-V[2])+.14,re=Math.atan2(K[0]-V[0],-(K[2]-V[2]));d.push({at:N,angle:-re,size:[.23,.25,Y],tilt:Math.atan2(K[1]-V[1],Y)}),(T+66)%8===0&&(u.push({at:Ve(C,O*M,.3),size:[.14,1.12,.14]}),(O>0?p:m).push({at:Ve(C,O*M-O*.19,.83),angle:-C.heading,size:[.16,.17,.14]}))}if(Math.abs(C.curve)>.023&&O===-Math.sign(C.curve)&&(T+66)%20===0){let V=-C.heading+(C.curve<0?.1:-.1);(C.curve<0?x:_).push({at:Ve(C,O*(M+.62),1.86),angle:V,size:[1.45,.62,1]}),S.push({at:Ve(C,O*(M+.62),.62),size:[.1,1.7,.1]})}}if((T+66)%(e.track.wet?64:92)===28&&!Ui(e.track,T,5)){let O=Math.floor(T/70)%2<1?-1:1,N=O*(M+.82);y.push({at:Ve(C,N,2.36),size:[.16,5.52,.16]}),f.push({at:Ve(C,N-O*.84,5.07),angle:-C.heading,size:[1.8,.085,.08]}),g.push({at:Ve(C,N-O*1.62,5),angle:-C.heading,size:[.58,.15,.28]}),(t.stars||e.track.wet)&&v.push({at:Ve(C,O*1.22,.054),angle:-C.heading,size:[7.5,1,14],tilt:C.grade})}}if(Qe(i,new Ke,n,d),Qe(i,new Ke,r,u),Qe(i,new Ke,s,p),Qe(i,new Ke,a,m),Qe(i,new Ke,r,y),Qe(i,new Ke,r,f),Qe(i,new Ke,o,g),v.length){let T=new Ut(1,1);T.rotateX(-Math.PI/2),Qe(i,T,c,v)}else c.dispose(),l?.dispose();Qe(i,new Ut,h,_);let w=new Ut,A=w.attributes.uv;for(let T=0;T<A.count;T++)A.setX(T,1-A.getX(T));Qe(i,w,h,x),Qe(i,new Ke,r,S)}function c1(i,e,t){let n=rt("#7a827d"),r=rt("#5a625f"),s=rt("#3e5552"),a=new ct({color:"#ffdfae"}),o=[],l=[],c=[],h=[],d=[],u=[],p=[],m=[],y=e.width*.5+1;for(let[f,g]of e.track.tunnels){let v=[],_=[],x=[],S=new fe("#535e5b"),M=new fe,w=t?26:14,A=Math.ceil((g-f)/(t?1.5:3));for(let C=0;C<=A;C++){let P=Lt(f,g,C/A),U=e.sample(P);for(let O=0;O<=w;O++){let N=Math.PI*O/w;if(v.push(...Ve(U,Math.cos(N)*(y+.27),4.45+Math.sin(N)*3.8)),M.copy(S).multiplyScalar(.86+fr(C,O,35)*.35),x.push(M.r,M.g,M.b),C<A&&O<w){let H=C*(w+1)+O;_.push(H,H+1,H+w+1,H+1,H+w+2,H+w+1)}}}let T=new Be;T.setAttribute("position",new ve(v,3)),T.setAttribute("color",new ve(x,3)),T.setIndex(_),T.computeVertexNormals(),i.add(new Ie(T,new mn({side:Nt,vertexColors:!0})));for(let C=f+1.7;C<g;C+=3.4){let P=e.sample(C),U=-P.heading;for(let O of[-1,1])o.push({at:Ve(P,O*(y+.3),1.65),angle:U,size:[.46,5.82,3.63]}),l.push({at:Ve(P,O*(y-.48),.16),angle:U,size:[.46,.42,3.63]}),d.push({at:Ve(P,O*(y+.063),1.67),angle:U,size:[.06,.23,3.58]}),Math.round((C-f-1.7)/3.4)%3===0&&(h.push({at:Ve(P,O*(y-.48),5.02),angle:U,size:[.27,.26,1.37]}),m.push({at:Ve(P,O*(y-3.35),.092),angle:U,size:[5.2,1,12],tilt:P.grade})),t&&p.push({at:Ve(P,O*(y+.058),2.07),angle:U,size:[.052,4.81,.063]})}for(let C of[f,g]){let P=e.sample(C),U=-P.heading;for(let O of[-1,1])c.push({at:Ve(P,O*(y+1.05),1.43),angle:U,size:[1.4,7.4,1.7]});c.push({at:Ve(P,0,8.46),angle:U,size:[y*2+3,.92,1.68]});for(let O=0;O<(t?23:13);O++){let N=Math.PI*O/((t?23:13)-1);u.push({at:Ve(P,Math.cos(N)*(y+.17),4.44+Math.sin(N)*3.72),angle:U,size:[.43,.46,1.79]})}}}if(Qe(i,new Ke,n,o),Qe(i,new Ke,r,l),Qe(i,new Ke,r,c),Qe(i,new Ke,s,d),Qe(i,new Ke,a,h),Qe(i,new Ke,r,u),p.length&&Qe(i,new Ke,s,p),m.length){let f=new Ut(1,1);f.rotateX(-Math.PI/2),Qe(i,f,new ct({color:"#eaa970",map:xf(),transparent:!0,depthWrite:!1,blending:Bn,opacity:.72}),m)}}function h1(i,e,t,n){let[r,s]=e.track.bridge,a=[],o=[],l=[],c=[],h=[],d=[];for(let p=r+2;p<=s;p+=qt){let m=e.sample(p);if(o.push({at:Ve(m,0,-.82),angle:-m.heading,size:[e.width+4.26,1.61,4.06],tilt:m.grade}),(p-r-2)%24===0){for(let y of[-1,1]){let f=Ve(m,y*(e.width*.3),-.95),g=t(f[0],f[2])-2,v=f[1]-g;f[1]-=v*.5,a.push({at:f,angle:-m.heading,size:[1.7,v,2.1]}),h.push({at:Ve(m,y*(e.width*.3),-1.91),angle:-m.heading,size:[2.7,1.5,4.4]})}l.push({at:Ve(m,0,-4.15),angle:-m.heading,size:[e.width*.7,.88,1.3]})}if(n||(p-r-2)%8===0)for(let y of[-1,1])c.push({at:Ve(m,y*(e.width/2+1.92),-.43),angle:-m.heading,size:[.46,.16,n?4.1:8.1],tilt:m.grade}),(p-r-2)%20===0&&d.push({at:Ve(m,y*(e.width/2+1.39),.58),angle:-m.heading,size:[.2,.18,.48]})}let u=rt(e.track.bridgeColor??"#788a94");if(Qe(i,new Ke,u,a),Qe(i,new Ke,u,o),Qe(i,new Ke,rt("#536575"),l),Qe(i,new Ke,rt("#a4aab6"),h),Qe(i,new Ke,rt("#b5c0c9"),c),Qe(i,new Ke,new ct({color:"#ffe3ac"}),d),e.track.biome==="reservoir"){let p=new xt,m=new Ke,y=rt(e.track.bridgeColor),f=(r+s)/2,g=Math.min(184,s-r),v=n?32:18;for(let _ of[-1,1]){let x=null;for(let S=0;S<=v;++S){let M=S/v,w=e.sample(f-g*.5+g*M),A=2+18*Math.sin(M*Math.PI),T=new D(...Ve(w,_*(e.width*.5+1.61),A));if(x){let C=new Ie(m,y),P=T.clone().sub(x);C.position.copy(T).lerp(x,.5),C.quaternion.setFromUnitVectors(new D(0,1,0),P.clone().normalize()),C.scale.set(.62,P.length()+.22,.6),p.add(C)}if(S%(n?3:2)===0){let C=new Ie(m,y);C.position.set(T.x,T.y-A*.5,T.z),C.scale.set(.14,A+.12,.14),p.add(C)}x=T}}p.userData.zSector=e.sample(f).z,i.userData.sectors.push(p),i.add(p)}}function Mf(i,e,t,n=2098,r=-1){let s=e.sample(n),a=e.width*.5+10.5,o=Ve(s,r*a),l=t(o[0],o[2]),c=new xt;c.position.set(o[0],l-.2,o[2]),c.rotation.y=-r*Math.PI/2-s.heading,i.add(c);let h=new Ke;function d(f,g,v,_,x,S,M,w=0){let A=new Ie(h,f);A.position.set(g,v,_),A.scale.set(x,S,M),A.rotation.z=w,c.add(A)}let u=rt("#762f2a"),p=rt("#6c7375"),m=rt("#282c32"),y=new ct({color:"#f8bd7f"});d(p,0,.42,0,8.2,1.4,6.5);for(let f of[-1,1])d(u,f*2.57,2.86,0,.41,4.7,.52,f*.022),d(m,f*2.57,.84,0,.63,.72,.7),d(p,f*3.46,1.24,1.7,.37,1.28,.36),d(y,f*3.46,2.04,1.7,.27,.37,.27),d(m,f*3.46,2.33,1.7,.56,.2,.56),d(m,f*2.15,5.35,0,4.46,.25,.82,f*.045);d(u,0,3.94,0,7.35,.39,.41),d(u,0,5.03,0,8.17,.48,.46),d(u,0,4.56,0,.54,1.31,.48)}function u1(i,e,t,n){let r=rt("#644533"),s=rt("#847e69"),a=rt("#373e42"),o=rt(e.scheme.snow?"#cdd5d9":"#46403d"),l=rt(e.scheme.rock),c=new ct({color:"#ffd49b"}),h=rt("#8b493d"),d=new Ke,u=new fn(.84,1,1,n?18:10),p=new fn(0,1,1,4,1);p.rotateY(Math.PI/4);function m(f,g,v,_,x,S,M,w,A=d){let T=new Ie(A,g);return T.position.set(v,_,x),T.scale.set(S,M,w),f.add(T),T}function y(f,g,v,_,x){m(f,l,0,.26,0,g+.6,.68,_+.5),m(f,x?h:s,0,v*.5+.35,0,g,v,_),m(f,o,0,v+.9,0,g*.89,1.4,_*.88,p),m(f,a,0,v+.36,0,g+.8,.18,_+.8);for(let S of[-g*.38,0,g*.38])m(f,r,S,v*.55,_*.51,.19,v,.19),m(f,r,S,v*.55,-_*.51,.19,v,.19);for(let S of[-1,1]){m(f,r,S*g*.505,v*.52,0,.21,v,.18);for(let M of[-_*.25,_*.25])m(f,a,S*g*.509,v*.6,M,.11,.96,1.05),m(f,c,S*g*.521,v*.6,M,.1,.64,.76)}}for(let[f,g,v]of e.track.landmarks){if(f==="shrine"){Mf(i,e,t,g,v);continue}let _=f==="village"?[-37,-21,-5,12,28,44]:f==="wall"?[-16,-8,0,8,16]:[0];for(let[x,S]of _.entries()){let M=e.sample(g+S),w=f==="wall"?4.8:f==="lighthouse"?16:10.5,A=Ve(M,v*(e.width/2+w)),T=new xt;if(T.position.set(A[0],Math.min(M.y+1,t(A[0],A[2]))-.32,A[2]),T.rotation.y=-M.heading,T.userData.zSector=A[2],i.userData.sectors.push(T),i.add(T),f==="village"||f==="chalet"){let C=e.track.biome==="port";y(T,(C?10.4:6.8)+x%3*.82,3.5+x%2*1.6,C?13:8.2,C),m(T,r,-v*4.6,1.6,0,.15,3.2,.17),m(T,c,-v*4.6,3.35,0,.36,.46,.36)}else if(f==="lighthouse")m(T,a,0,1.05,0,4.3,2.1,4.3,u),m(T,rt("#ded7c6"),0,8.9,0,2.63,16,2.63,u),m(T,h,0,10.9,0,2.52,3,2.52,u),m(T,a,0,16.65,0,3.34,.44,3.34,u),m(T,c,0,17.55,0,1.83,1.6,1.83,u),m(T,h,0,18.62,0,2.72,.58,2.72,u);else if(f==="obelisk")m(T,l,0,.5,0,4.9,1.5,4.6),m(T,l,0,3.3,0,3.3,4.4,3,u),m(T,a,0,6.12,0,2.57,1.3,2.65,p),m(T,c,-v*1.35,4.33,0,.1,.51,.64);else if(f==="wall"){m(T,l,0,.3,0,1.32,2.05,7.98),m(T,a,-v*.045,1.45,0,1.52,.28,8.22);for(let C=-3;C<=3;C++)m(T,s,-v*.66,.5,C,.11,.065,.9)}else if(f==="rail"){for(let C of[-13,-3,7,17])m(T,l,0,3,C,2.3,7.8,2);m(T,h,0,7.21,2,3.55,.85,36.6);for(let C=-3;C<=3;C++)m(T,a,.95,7.89,2+C*5,.29,1.49,6.6).rotation.x=C%2?.29:-.29}}}}function d1(i,e){let t=e.track.biome==="reservoir",n=e.track.biome==="port",r=t?e.track.bridge[0]-94:-30,s=t?e.track.bridge[1]+93:e.length+85,a=[],o=[],l=[],c=Math.ceil((s-r)/18),h=Array.from({length:c+1},(m,y)=>e.sample(Lt(r,s,y/c)).y),d=t?Math.min(...h)-23:Math.min(...h)-(n?2:9);for(let m=0;m<=c;m++){let y=Lt(r,s,m/c),f=e.sample(y),g=t?-255:e.width*.5+(n?5:16);for(let[v,_]of[g,t?255:590].entries()){let x=Ve(f,_);x[1]=d,a.push(...x),l.push(v,y/370)}if(m<c){let v=m*2;o.push(v,v+1,v+2,v+1,v+3,v+2)}}let u=new Be;u.setAttribute("position",new ve(a,3)),u.setAttribute("uv",new ve(l,2)),u.setIndex(o);let p=new Ie(u,new Pt({side:Nt,fog:!0,uniforms:{...Tl.clone(he.fog),water:{value:new fe(t?"#356678":e.track.dark?"#243b5f":"#385f76")},reflection:{value:new fe(e.scheme.glow)}},vertexShader:`
      varying vec2 flow;
      #include <fog_pars_vertex>
      void main() {
        flow = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,fragmentShader:`
      uniform vec3 water;
      uniform vec3 reflection;
      varying vec2 flow;
      #include <fog_pars_fragment>
      void main() {
        float waves = sin(flow.y * 115. + flow.x * 18.) * .5 + sin(flow.y * 52. - flow.x * 58.) * .31 + sin(flow.y * 170. - flow.x * 68.) * .19;
        float light = .14 * smoothstep(.08,.50,waves) + .25 * smoothstep(.52,.83,waves);
        gl_FragColor = vec4(mix(water, reflection, light), 1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }
    `}));i.add(p)}function p1(i,e){if(typeof document>"u")return null;let t=document.createElement("canvas");t.width=768,t.height=128;let n=t.getContext("2d");if(!n)return null;n.fillStyle="#0e1720",n.fillRect(0,0,t.width,t.height);let r=e?"#d5e9db":"#f68856";n.fillStyle=r,n.fillRect(0,0,t.width,5),n.fillRect(0,t.height-5,t.width,5);for(let a=6;a<t.width;a+=t.width-118)for(let o=0;o<7;o++)for(let l=0;l<8;l++)n.fillStyle=(o+l)%2===0?r:"#26343f",n.fillRect(a+16*o,8+14*l,16,14);n.font="bold 59px sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillStyle=r,n.fillText(e?"FINISH":"\u5C3E\u6587\u5B57 Z",t.width*.5,54),n.font="bold 19px sans-serif",n.fillStyle="#dddddd",n.fillText(i,t.width*.5,100);let s=new pn(t);return s.colorSpace=yt,s.anisotropy=8,s}function f1(i,e){let t=rt("#52616f"),n=new Ke;for(let r of[10,e.length+1]){let s=e.sample(r),a=new xt;a.position.set(s.x,s.y,s.z),a.rotation.y=-s.heading,i.add(a);let o=e.width+2.7;for(let d of[-1,1]){let u=new Ie(n,t);u.position.set(d*o*.5,2.54,0),u.scale.set(.46,7.8,.59),a.add(u);let p=new Ie(n,t);p.position.set(d*o*.5,.28,0),p.scale.set(1.05,1.5,1.05),a.add(p)}let l=new Ie(n,t);l.position.y=6.41,l.scale.set(o+.32,1.13,.7),a.add(l);let c=new Ie(new Ut(o-.18,1.28),new ct({map:p1(e.track.subtitle,r>e.length)}));c.position.set(0,6.38,.371),a.add(c);let h=new ct({color:r>e.length?"#dbede3":"#feac61"});for(let d of[-o*.4,-o*.2,0,o*.2,o*.4]){let u=new Ie(n,h);u.position.set(d,5.7,.18),u.scale.set(.46,.1,.28),a.add(u)}}}function m1(i,e,t,n){let r=new Ie(new ai(1700,n?48:28,n?24:14),new Pt({side:Xt,depthWrite:!1,uniforms:{zenith:{value:new fe(t.skyTop)},horizon:{value:new fe(t.skyHorizon)},glow:{value:new fe(t.glow)},sun:{value:new D(...t.sun).normalize()},stars:{value:t.stars},disc:{value:e.track.wet||e.track.foggy?0:1},dawn:{value:e.track.dark?0:t.sun[1]<.3?1:.67},storm:{value:e.track.wet?1:t.clouds>.8?.78:0},detail:{value:n?1:0},time:{value:0}},vertexShader:`
        varying vec3 direction;
        void main() {
          direction = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 direction;
        uniform vec3 zenith;
        uniform vec3 horizon;
        uniform vec3 glow;
        uniform vec3 sun;
        uniform float stars;
        uniform float disc;
        uniform float dawn;
        uniform float storm;
        uniform float detail;
        uniform float time;
        float rand(vec2 v) { return fract(sin(dot(v, vec2(12.9898,78.233))) * 43758.5453); }
        float billow(vec2 p) {
          vec2 cell = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(rand(cell), rand(cell + vec2(1.0, 0.0)), f.x),
            mix(rand(cell + vec2(0.0, 1.0)), rand(cell + 1.0), f.x), f.y);
        }
        void main() {
          vec3 d = normalize(direction);
          vec3 color = mix(horizon, zenith, pow(smoothstep(-.14, .72, d.y), .52));
          float light = max(dot(d, sun), 0.0);
          float lowSky = exp(-abs(d.y - .028) * 9.3);
          color += glow * (lowSky * (.10 + dawn * .16) + pow(light, 8.0) * .24 * dawn);
          color += glow * (pow(light, 40.0) * (.05 + dawn * .1) + pow(light, 650.0) * .22) * disc;
          if (disc > .5 && light > .9995) {
            vec3 across = normalize(vec3(-sun.z, .0, sun.x));
            vec3 up = normalize(cross(sun, across));
            vec2 orbit = vec2(dot(d, across), dot(d, up));
            float radius = mix(.017, .022, dawn);
            float orb = 1.0 - smoothstep(radius * .93, radius, length(orbit));
            float moonTexture = .7 + .3 * billow(orbit * 258.0) - .13 * smoothstep(.47, .7, billow(orbit * 108.0 + 4.7));
            color = mix(color, glow * mix(moonTexture * 1.54, 2.25, dawn), orb);
          }
          if (stars > .5 && d.y > .06) {
            vec2 uv = vec2(atan(d.z, d.x) * 85.0, d.y * 185.0);
            vec2 cell = floor(uv);
            vec2 center = vec2(rand(cell + 19.0), rand(cell - 5.0)) * .7 + .15;
            float star = (1.0 - smoothstep(.02, .1, length(fract(uv) - center))) * smoothstep(.95, 1.0, rand(cell));
            color += star * .62 * smoothstep(.06, .44, d.y);
          }
          float cloudDeck = smoothstep(.19 - storm * .09, .26 + storm * .1, d.y) * (1.0 - smoothstep(.59, .98, d.y));
          cloudDeck = max(cloudDeck, smoothstep(-.14, .03, d.y) * (1.0 - smoothstep(.10, .29, d.y)) * .86);
          if (cloudDeck > .015) {
            vec2 clouds = d.xz * (4.2 / max(.1, d.y + .32)) + vec2(time * .004, time * -.0015);
            float cloudsText = billow(clouds) * .57 + billow(clouds * 2.2 + 5.3) * .27;
            if (detail > .5) cloudsText += billow(clouds * 4.7 - 7.0) * .114 + billow(clouds * 10.1) * .041;
            float cloudsAlpha = smoothstep(.43 - storm * .12, .70 - storm * .13, cloudsText) * cloudDeck;
            vec3 cloudShade = mix(zenith * .67 + horizon * .28, horizon * .82 + glow * .08, cloudDeck);
            cloudShade += glow * pow(light, 11.0) * (.12 + dawn * .35) * (.4 + cloudsText);
            color = mix(color, cloudShade, cloudsAlpha * mix(.63, .91, storm));
          }
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `}));if(r.frustumCulled=!1,r.renderOrder=-100,i.add(r),!e.track.wet){let p=t.snow?g1(i,t,n):null;return(m,y,f)=>{f&&(r.position.copy(f.position),r.material.uniforms.time.value+=m,p?.(m,f,!Ui(e.track,y)))}}let s=n?720:280,a=new Float32Array(s*6),o=Ma(t.seed+5),l=Array.from({length:s},()=>[o()*130-65,o()*36,o()*150-100]),c=new Be,h=new _t(a,3).setUsage(Oh);c.setAttribute("position",h);let d=new qs(c,new Wr({color:"#aec8de",transparent:!0,opacity:.28,depthWrite:!1,fog:!0}));d.frustumCulled=!1,d.renderOrder=12,i.add(d);let u=0;return(p,m,y)=>{if(y&&(u=(u+p)%1032,r.position.copy(y.position),r.material.uniforms.time.value+=p,d.position.copy(y.position),d.visible=!Ui(e.track,m),!!d.visible)){for(let f=0;f<s;f++){let g=l[f],v=g[0],_=((g[1]-u*28)%36+36)%36-13,x=g[2],S=f*6;a[S]=v,a[S+1]=_,a[S+2]=x,a[S+3]=v+.16,a[S+4]=_+.95,a[S+5]=x+.24}h.needsUpdate=!0}}}function g1(i,e,t){let n=t?390:135,r=Ma(e.seed+43),s=new Float32Array(n*3);for(let l=0;l<s.length;l+=3)s[l]=r()*100-50,s[l+1]=r()*27-12,s[l+2]=r()*104-88;let a=new Be;a.setAttribute("position",new _t(s,3));let o=new Ys(a,new Pt({transparent:!0,depthWrite:!1,uniforms:{time:{value:0}},vertexShader:`
      uniform float time;
      varying float clarity;
      void main() {
        vec3 p = position;
        p.x += sin(time * .75 + p.z * .17) * 2.2;
        p.y = mod(p.y + 12.0 - time * (1.2 + fract(p.x) * .63), 27.0) - 12.0;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * view;
        gl_PointSize = clamp(49.0 / max(1.0, -view.z), 1.0, 5.65);
        clarity = 1.0 - smoothstep(22.0, 80.0, -view.z);
      }
    `,fragmentShader:`
      varying float clarity;
      void main() {
        float shape = 1.0 - smoothstep(.12, .5, length(gl_PointCoord - .5));
        gl_FragColor = vec4(.91, .94, 1.0, shape * clarity * .71);
        #include <colorspace_fragment>
      }
    `}));return o.frustumCulled=!1,o.renderOrder=12,i.add(o),(l,c,h)=>{o.visible=h,o.material.uniforms.time.value+=l,o.position.copy(c.position)}}function v1(i,e,t){i.add(new er(t.ambient,t.snow?"#5d6077":"#566b67",e.track.dark?1.53:1.86));let n=new oi(t.glow,e.track.dark?1.29:2.6);n.position.set(...t.sun),i.add(n);let r=new oi(t.snow?"#d6e8ff":"#a9d2ff",t.snow?.65:.47);r.position.set(.8,.8,.4),i.add(r)}function bf(i,e="high"){let t=uu(i),{scheme:n}=t,r=new si;r.background=new fe(n.skyHorizon),r.userData.sectors=[],r.fog=new Hs(n.fog,n.density);let s=e==="high"||e==="ultra";v1(r,t,n);let a=r1(r,t,n,s);n1(r,t,n,s),s1(r,t,n,a),a1(r,t,n,a,s),l1(r,t,n),t.track.tunnels?.length&&c1(r,t,s),t.track.bridge&&h1(r,t,a,s),t.track.id==="haruna"&&Mf(r,t,a),t.track.landmarks&&u1(r,t,a,s),["coast","port","reservoir"].includes(n.biome)&&d1(r,t),f1(r,t);let o=m1(r,t,n,s),l=2.7/n.density+130;function c(d,u,p){if(o(d,u,p),!!p)for(let m of r.userData.sectors)m.visible=Math.abs(p.position.z-m.userData.zSector)<l}function h(){let d=new Set;function u(p){!p||d.has(p)||(d.add(p),p.dispose())}r.traverse(p=>{p.isInstancedMesh&&u(p),u(p.geometry);for(let m of[].concat(p.material??[]))u(m.map),u(m)}),r.clear(),r.userData.sectors.length=0}return{...t,scene:r,update:c,dispose:h}}var y1={haruna:{sky:["#091022","#273b58","#8393aa"],fog:"#57687d",mountain:["#465a72","#314659","#202f3b"],hill:["#233738","#1c2d30"],ground:["#2e3a38","#263531"],pines:["#213b39","#162b2c","#314947"],road:["#555c65","#505760"],roadLine:"#c5c5b2",shoulder:"#6d756f",guard:"#9d9ea1",glow:"#fff3d3",light:"#e0e6fa",shade:"rgba(13,15,28,.46)"},kirisawa:{sky:["#111c24","#2e4454","#839aa6"],fog:"#647985",mountain:["#586f7a","#3c505c","#2a3e49"],hill:["#35484c","#293e42"],ground:["#354449","#2a3b43"],pines:["#1c383b","#162f35","#33535b"],road:["#4d5c68","#4a5660"],roadLine:"#d5d7cc",shoulder:"#667778",guard:"#acb8bb",glow:"#d9ecfa",light:"#d1e8f5",shade:"rgba(14,26,33,.42)"},shiramine:{sky:["#2e5582","#8b9db6","#fad8ad"],fog:"#b6b6b9",mountain:["#8192a9","#637b93","#435a71"],hill:["#9ba9b8","#b3becb"],ground:["#b2becd","#c2cbd4"],pines:["#2c4657","#253d51","#718899"],road:["#59636f","#555d69"],roadLine:"#f0e4cc",shoulder:"#a6b3c5",guard:"#cacfd0",glow:"#fff1c5",light:"#ffedcf",shade:"rgba(41,52,77,.26)"}},ps=(i,e,t)=>Math.max(e,Math.min(i,t)),ba=i=>i-Math.floor(i),st=i=>ba(Math.sin(i*127.1+1.31)*43758.5453123),Ni=(i,e,t)=>i+(e-i)*t;function Fl(i){return[Number.parseInt(i.slice(1,3),16),Number.parseInt(i.slice(3,5),16),Number.parseInt(i.slice(5,7),16)]}function Nl(i,e,t){return"#"+Fl(i).map((n,r)=>Math.round(Ni(n,Fl(e)[r],t)).toString(16).padStart(2,"0")).join("")}function _1(i){let{skyTop:e,skyHorizon:t,fog:n,mountain:r,earth:s,foliage:a,rock:o,road:l,shoulder:c,glow:h}=i,d=(p,m)=>Nl(p,"#151e31",m),u=(p,m)=>Nl(p,t,m);return{sky:[e,Nl(e,t,.59),t],fog:n,mountain:[u(r,.25),r,d(r,.28)],hill:[d(s,.23),Nl(s,o,.26)],ground:[s,u(s,.22)],pines:[a,d(a,.3),u(a,.29)],road:[l,d(l,.12)],roadLine:"#dad4bd",shoulder:c,guard:"#a8a9a1",glow:h,light:u(h,.22),shade:"rgba(25,35,40,.37)",water:u("#284661",.22)}}function x1(i,e){let t=Fl(i);return Array.from({length:21},(n,r)=>"rgb("+t.map((s,a)=>Math.round(Ni(s,e[a],r/22))).join(",")+")")}function M1(i){let e=Fl(i.fog),t=new Map;for(let n of Object.values(i).flat())n.startsWith("#")&&t.set(n,x1(n,e));return t}function b1(i,e,t,n){let r=document.createElement("canvas");r.width=110,r.height=190;let s=r.getContext("2d");s.fillStyle=i.pines[1],s.fillRect(52,38,6,149);let a=s.createLinearGradient(10,0,103,0);if(a.addColorStop(0,i.pines[0]),a.addColorStop(.36,i.pines[2]),a.addColorStop(.6,i.pines[0]),a.addColorStop(1,i.pines[1]),s.fillStyle=a,["broadleaf","autumn","bamboo"].includes(n)){for(let o=0;o<17;o++){let l=n==="bamboo"?107:126,c=55+(st(o+5+e)-.5)*61,h=23+st(o+7+e)*l;s.beginPath(),s.ellipse(c,h,13+st(o)*15,n==="bamboo"?7:14+st(o+10)*9,0,0,2*Math.PI),s.fill()}return r}for(let o=0;o<6;o++){let l=4+o*21,c=11+o*7.4;s.beginPath(),s.moveTo(55,l);for(let h=1;h<=4;h++)s.lineTo(55+c*h*.25,l+h*11),s.lineTo(57+c*h*.22,l+h*11-2);s.lineTo(57+c,l+48),s.lineTo(55,l+54+o%2*5),s.lineTo(53-c,l+49);for(let h=4;h>=1;h--)s.lineTo(53-c*h*.25,l+h*10+2),s.lineTo(55-c*h*.24,l+h*10+e);s.closePath(),s.fill(),t&&o>0&&(s.fillStyle="rgba(220,231,242,.33)",s.beginPath(),s.moveTo(55,l+4),s.lineTo(60+c*.65,l+33),s.lineTo(57,l+26),s.lineTo(52-c*.62,l+35),s.closePath(),s.fill(),s.fillStyle=a)}return r}var Ol=class{constructor(e){if(this.canvas=e,this.context=e.getContext("2d",{alpha:!1}),!this.context)throw Error("\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u3067\u306F\u30B2\u30FC\u30E0\u753B\u9762\u3092\u63CF\u753B\u3067\u304D\u307E\u305B\u3093\u3002");this.mode="software",this.width=1,this.height=1,this.pixelRatio=1,this.now=0}setPixelRatio(e){this.pixelRatio=Math.min(e,1)}setWorld(e){this.route=e,this.gridDrawn=null,this.palette=y1[e.track.id]??_1(e.scheme),this.colors=M1(this.palette),this.trees=[4,0].map(n=>b1(this.palette,n,e.track.snow,e.track.biome)),this.sections=[];let t=-40;for(let n=t;n<=e.length+124;n+=4){let r=e.sample(n);r.d=n,r.dx=Math.cos(r.heading),r.dz=Math.sin(r.heading),this.sections.push(r)}}setSize(e,t){this.width=e,this.height=t,this.canvas.width=Math.ceil(e*this.pixelRatio),this.canvas.height=Math.ceil(t*this.pixelRatio)}view(e,t,n){let r=e-this.eye.x,s=t-this.eye.y,a=n-this.eye.z;return[r*this.matrix[0]+s*this.matrix[1]+a*this.matrix[2],r*this.matrix[4]+s*this.matrix[5]+a*this.matrix[6],-(r*this.matrix[8]+s*this.matrix[9]+a*this.matrix[10])]}point(e,t,n){return this.view(e.x+e.dx*t,e.y+n,e.z+e.dz*t)}project([e,t,n]){let r=this.focal/n;return[this.width/2+e*r,this.height/2-t*r,r]}quad(e,t,n,r,s){if(e[2]<.56&&t[2]<.56&&n[2]<.56&&r[2]<.56)return;let o=this.context,l=this.focal,c=this.width*.5,h=this.height*.5;if(o.beginPath(),e[2]>=.56&&t[2]>=.56&&n[2]>=.56&&r[2]>=.56){let d=c+e[0]*l/e[2],u=h-e[1]*l/e[2],p=c+t[0]*l/t[2],m=h-t[1]*l/t[2],y=c+n[0]*l/n[2],f=h-n[1]*l/n[2],g=c+r[0]*l/r[2],v=h-r[1]*l/r[2];if(Math.max(d,p,y,g)<0||Math.min(d,p,y,g)>this.width||Math.max(u,m,f,v)<0||Math.min(u,m,f,v)>this.height)return;o.moveTo(d,u),o.lineTo(p,m),o.lineTo(y,f),o.lineTo(g,v)}else{let d=[e,t,n,r],u=!1,p=(m,y,f)=>{let g=c+m*l/f,v=h-y*l/f;u?o.lineTo(g,v):o.moveTo(g,v),u=!0};for(let m=0;m<4;m++){let y=d[(m+3)%4],f=d[m];if(y[2]>=.56!=f[2]>=.56){let g=(.56-y[2])/(f[2]-y[2]);p(Ni(y[0],f[0],g),Ni(y[1],f[1],g),.56)}f[2]>=.56&&p(f[0],f[1],f[2])}}o.closePath(),o.fillStyle=s,o.fill()}strip(e,t,n,r,s,a=0){this.quad(this.point(e,n,a),this.point(e,r,a),this.point(t,r,a),this.point(t,n,a),s)}tint(e,t){let n=this.route.track.foggy?216:this.route.track.wet?320:610;return this.colors.get(e)[Math.floor(ps(t/n,0,1)*20)]}backdrop(e){let t=this.context,n=this.width,r=this.height,s=this.palette,a=Math.asin(ps(this.matrix[9],-1,1)),o=Math.atan2(this.matrix[8],this.matrix[10]),l=Math.max(r*.16,Math.min(r*.85,r/2-Math.tan(a)*this.focal)),c=t.createLinearGradient(0,0,0,l+r*.32);if(c.addColorStop(0,s.sky[0]),c.addColorStop(Math.min(.84,l/(l+r*.32)*.52),s.sky[1]),c.addColorStop(1,s.sky[2]),t.fillStyle=c,t.fillRect(0,0,n,r),!this.route.track.wet&&!this.route.track.foggy){let u=!this.route.track.dark,p=((n*(u?.73:.24)+o*n*.33)%(n*1.8)+n*1.8)%(n*1.8)-n*.22,m=l-r*(this.route.scheme.sun[1]>.36?.37:u?.075:.22),y=t.createRadialGradient(p,m,0,p,m,r*(u?.22:.11));if(y.addColorStop(0,s.glow),y.addColorStop(.15,u?"rgba(254,210,163,.68)":"rgba(173,203,243,.42)"),y.addColorStop(1,"rgba(160,185,234,0)"),t.fillStyle=y,t.fillRect(0,0,n,Math.max(0,l+r*.14)),t.fillStyle=s.glow,t.beginPath(),t.arc(p,m,Math.max(3,r*.018),0,Math.PI*2),t.fill(),!u){let f=Math.max(3,r*.018);t.fillStyle="rgba(129,150,186,.33)";for(let g=0;g<8;g++){let v=st(g*4.75)*Math.PI*2,_=f*st(g+5.1)*.72;t.beginPath(),t.arc(p+Math.cos(v)*_,m+Math.sin(v)*_,f*(.061+st(g*8.61)*.1),0,Math.PI*2),t.fill()}t.fillStyle="#d8e7ff";for(let g=0;g<65;g++){t.globalAlpha=st(g+33)*.48;let v=((st(g+5)+o*-.13)%1+1)%1*n;t.fillRect(v,st(g+11)*l*.96,1.2,1.1)}t.globalAlpha=1}}let h=this.route.track.wet,d=!this.route.track.dark;for(let u=0;u<(h||this.route.scheme.clouds>.8?5:3);u++){let p=Ni(r*.095,r*.031,u/5),m=l*(.19+u*.161),y=t.createLinearGradient(0,m-p,0,m+p);y.addColorStop(0,"rgba(34,49,63,0)"),y.addColorStop(.56,h?"rgba(38,58,75,.51)":"rgba(60,72,99,.38)"),y.addColorStop(.82,d?"rgba(243,177,145,.27)":"rgba(118,144,170,.22)"),y.addColorStop(1,"rgba(118,144,170,0)"),t.fillStyle=y,t.beginPath(),t.moveTo(-1,m+p);for(let f=0;f<=20;f++){let g=f*.37+u*1.7+o*.53+e*3e-5,v=Math.sin(g)*.31+Math.sin(g*2.7+u)*.11;t.lineTo(f/20*n,m+p*(v-.75))}for(let f=20;f>=0;f--){let g=f*.38+u*1.58+o*.54+e*4e-5,v=Math.sin(g)*.21+Math.sin(g*3.2)*.13;t.lineTo(f/20*n,m+p*(v+.71))}t.closePath(),t.fill()}if(["coast","port","reservoir"].includes(this.route.track.biome)){t.fillStyle=s.water,t.fillRect(0,l+r*.021,n,r),t.fillStyle="rgba(225,224,210,.12)";for(let u=0;u<38;u++){let p=l+r*(.028+st(u+31)*.18);t.fillRect(st(u+9)*n,p,n*.07*st(u+17),.8)}}for(let u=0;u<3;u++){let p=t.createLinearGradient(0,l-r*(.13+u*.06),0,l+r*.16);p.addColorStop(0,s.mountain[u]),p.addColorStop(.88,s.hill[u===2?1:0]),t.fillStyle=p,t.beginPath(),t.moveTo(-1,r);for(let m=0;m<=85;m++){let y=m/85,f=y*n/r+o*(u*.18+.36)+e/(3400+u*1e3),g=Math.sin(f*(4.5+u)+1.4+u*2)*.43+Math.sin(f*(9.7+u*2)-.7)*.19+Math.sin(f*(17+u*4)+1.2)*.12+Math.sin(f*44.4)*.038+Math.sin(f*93.4)*.009,v=["coast","port","reservoir"].includes(this.route.track.biome),_=v?1-Math.max(0,y-.4)*1.45:1;if(t.lineTo(y*n,l-r*(.02+u*.014+g*(.13+u*.12))*_),v&&y>.82)break}t.lineTo(["coast","port","reservoir"].includes(this.route.track.biome)?n*.83:n+1,r),t.closePath(),t.fill()}}tunnelSlice(e,t,n,r,s){let a=this.palette,o=r+1.2,l=s%3===0,c=this.tint(a.hill[l?0:1],n);for(let h of[-1,1]){let d=o*h;if(this.quad(this.point(e,d,-.1),this.point(e,d,4.31),this.point(t,d,4.31),this.point(t,d,-.1),c),this.quad(this.point(e,d-h*.02,1.65),this.point(e,d-h*.02,1.78),this.point(t,d-h*.02,1.78),this.point(t,d-h*.02,1.65),"rgba(187,192,168,.39)"),l&&n<125){let u=h*(o-.52);this.quad(this.point(e,u,4.23),this.point(e,u,4.35),this.point(t,u,4.35),this.point(t,u,4.23),"rgba(255,210,154,.84)")}}l&&n<112&&this.strip(e,t,-r,r,"rgba(237,187,130,.089)",.08);for(let h=0;h<7;h++){let d=h/7*Math.PI,u=(h+1)/7*Math.PI,p=Math.cos(d)*o,m=4.25+Math.sin(d)*3.6,y=Math.cos(u)*o,f=4.25+Math.sin(u)*3.6;this.quad(this.point(e,p,m),this.point(e,y,f),this.point(t,y,f),this.point(t,p,m),this.tint(a.mountain[h%3],n))}}tree(e,t,n){let r=this.context,s=e.d*(t>0?.351:.127);if(st(s)>.88*(this.route.scheme.forestDensity??1))return;let a=this.route.width,o=t*(a*.5+1.8+st(s+3.62)*9.6),l=this.point(e,o,st(s+4.8)*2.6-.9);if(l[2]<1)return;let[c,h,d]=this.project(l),u=(5.3+st(s+9.14)*10)*d,p=u*(.43+st(s+4.91)*.18);if(c+p<0||c-p>this.width||h<0||h-u>this.height)return;r.globalAlpha=1-Math.min(.79,n/(this.route.track.wet?310:450));let m=this.trees[Math.floor(st(s+11)*2)];r.drawImage(m,c-p/2,h-u,p,u),r.globalAlpha=1}roadway(e,t){let n=this.palette,r=this.route.width/2,s=this.route.track.wet?264:416,a=Math.max(0,Math.floor((e+40-22)/4)),o=Math.min(this.sections.length-1,Math.ceil((e+40+s)/4)),l=o;for(let c=o-1;c>=a;c--){if(c>a+45&&c%3!==0)continue;let h=this.sections[c],d=this.sections[l];l=c;let u=Math.max(0,h.d-e),p=Math.floor(c/3)%2,m=Ui(this.route.track,h.d),y=xa(this.route.track.bridge,h.d),f=["coast","port"].includes(this.route.track.biome);for(let g of[-1,1]){let v=g*(r+.19),_=g*(r+.95),x=g*(r+16),S=g*(r+105),M=3.6+Math.sin(h.d*.021+g*2.2)*6.2+Math.sin(h.d*.007+g*5)*6,w=3.6+Math.sin(d.d*.021+g*2.2)*6.2+Math.sin(d.d*.007+g*5)*6;!y&&(!f||g<0)&&this.quad(this.point(h,x,M*.2),this.point(h,S,M*2.5),this.point(d,S,w*2.5),this.point(d,x,w*.2),this.tint(n.hill[g===1?0:1],u)),!y&&(!f||g<0)&&this.quad(this.point(h,_,-.04),this.point(h,x,M*.2),this.point(d,x,w*.2),this.point(d,_,-.04),this.tint(n.ground[c%19===0?1:0],u)),this.strip(h,d,v,_,this.tint(n.shoulder,u))}this.strip(h,d,-r-.2,r+.2,this.tint(n.road[p],u));for(let g of[-1,1]){this.strip(h,d,g*(r-.21),g*(r-.27),this.tint(n.roadLine,u),.028);let v=g*(r+.58);if(this.quad(this.point(h,v,.62),this.point(h,v,.83),this.point(d,v,.83),this.point(d,v,.62),this.tint(n.guard,u)),this.quad(this.point(h,v,.6),this.point(h,v,.65),this.point(d,v,.65),this.point(d,v,.6),this.tint(n.road[0],u)),c%2===0&&u<210){let _={...h,x:Ni(h.x,d.x,.037),y:Ni(h.y,d.y,.037),z:Ni(h.z,d.z,.037)};this.quad(this.point(h,v,-.16),this.point(h,v,.69),this.point(_,v,.69),this.point(_,v,-.16),this.tint(n.road[0],u))}!m&&!y&&(!f||g<0)&&c%3===0&&u<290&&this.tree(h,g,u)}if(c%3!==2&&this.strip(h,d,-.061,.061,this.tint(n.roadLine,u),.034),this.route.track.wet&&u<200&&c%5!==3){let g=(st(c*12.2)-.5)*r*1.55;this.strip(h,d,g,g+.8,"rgba(157,184,207,.075)",.04)}if(m&&this.tunnelSlice(h,d,u,r,c),y&&c%5===0)for(let g of[-1,1]){let v=g*(r+.96);this.quad(this.point(h,v,.53),this.point(h,v,.66),this.point(d,v,.66),this.point(d,v,.53),"#d9b37d")}if(this.route.track.dark&&t!=="wide"&&u<49){let g=ps(u/12,.1,2.5),v=.15*Math.max(0,1-u/49);this.strip(h,d,ps(-g,-r,r),ps(g,-r,r),"rgba(233,232,161,"+v+")",.05)}if(Math.abs(h.d)<2.1||Math.abs(h.d-this.route.length)<2.1)for(let g=0;g<8;g++)this.strip(h,d,-r+g*r/4,-r+(g+1)*r/4,g%2===0?"rgba(230,235,237,.71)":"rgba(26,28,32,.73)",.055)}}landmarks(e){let t=this.route.track.landmarks;if(!t)return;let n=(s,a,o,l,c,h)=>this.quad(this.point(s,a-l*.5,o),this.point(s,a+l*.5,o),this.point(s,a+l*.5,o+c),this.point(s,a-l*.5,o+c),h),r=this.palette;for(let[s,a,o]of t){if(Math.abs(a-e)>190)continue;let l=s==="village"?[35,18,0,-17,-34]:s==="wall"?[12,6,0,-6,-12]:[0];for(let c of l){let h=this.route.sample(a+c);h.dx=Math.cos(h.heading),h.dz=Math.sin(h.heading);let d=o*(this.route.width/2+(s==="wall"?4.4:10.2)),u=Math.max(0,a+c-e),p=this.tint(r.mountain[2],u),m=this.tint(r.ground[1],u),y=this.tint(r.light,u);if(s==="shrine"){let f="#882e2e";n(h,d-2,0,.33,4.8,f),n(h,d+2,0,.33,4.8,f),n(h,d,3.72,5.2,.29,f),n(h,d,4.69,6,.47,f),n(h,d,5.06,6.1,.18,p)}else if(s==="village"||s==="chalet")n(h,d,-.07,6.6,3.6,"#85776b"),n(h,d,3.43,7.25,.41,p),n(h,d,3.82,5.4,.31,p),n(h,d,4.11,3.3,.3,p),n(h,d-1.7,1.08,.86,.83,y),n(h,d+1.7,1.08,.86,.83,y);else if(s==="lighthouse")n(h,d,-.04,3.2,1.13,p),n(h,d,1.04,2.1,11.7,"#d4c8b6"),n(h,d,7.53,2.14,1.63,"#9d4741"),n(h,d,12.74,2.42,1.25,y),n(h,d,13.97,2.8,.64,p);else{let f=s==="rail"?9.2:s==="wall"?4.1:2.8,g=s==="rail"?7.6:s==="wall"?1.8:5.75;n(h,d,0,f,g,m),n(h,d,g,f*1.08,.45,p)}}}}gantry(e){let t=this.context,n=this.route.width*.61;for(let r of[11,this.route.length+1]){if(Math.abs(r-e)>180)continue;let s=this.route.sample(r);s.dx=Math.cos(s.heading),s.dz=Math.sin(s.heading),this.quad(this.point(s,-n-.19,0),this.point(s,-n+.19,0),this.point(s,-n+.19,5.5),this.point(s,-n-.19,5.5),"#4d5158"),this.quad(this.point(s,n-.19,0),this.point(s,n+.19,0),this.point(s,n+.19,5.5),this.point(s,n-.19,5.5),"#4d5158"),this.quad(this.point(s,-n,5.3),this.point(s,n,5.3),this.point(s,n,6.45),this.point(s,-n,6.45),"#222931"),this.quad(this.point(s,-n,5.3),this.point(s,n,5.3),this.point(s,n,5.38),this.point(s,-n,5.38),"#ea8037");let a=this.point(s,0,5.88);if(a[2]<3)continue;let[o,l,c]=this.project(a);t.font="800 "+ps(c*.49,4,48)+"px system-ui,sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillStyle="#f6e6d7",t.fillText(r<14?"O M O J I Z":"F I N I S H",o,l)}}car(e,t,n,r,s){let a=this.context;if(!e||!t||!r&&n==="bonnet")return;let o=this.view(e.position.x,e.position.y,e.position.z);if(o[2]<.65)return;let[l,c,h]=this.project(o),d=this.height>this.width,u=Math.min(d?this.width*.3:this.width*.19,h*(t.stats.dimensions?.[1]??1.75)*.93),p=c>this.height*.82&&(!r||n!=="bonnet")?this.height*.82:c;if(l+u<0||l-u>this.width||p<0||p-u>this.height)return;let y=Math.atan2(this.eye.x-e.position.x,this.eye.z-e.position.z)-e.rotation.y;a.fillStyle="rgba(5,9,14,.47)",a.beginPath(),a.ellipse(l,p+u*.01,Math.max(.2,u*.58),Math.max(.15,u*.105),t.heading*-.15,0,Math.PI*2),a.fill(),Ul(a,t.stats,{x:l,y:p,width:u,angle:y,view:"race",brake:t.brake>.1,color:s})}foreground(e,t){let n=this.context,r=this.width,s=this.height,a=e.player;if(this.now+=t,this.route.track.wet&&!Ui(this.route.track,e.player.distance)){n.strokeStyle="rgba(196,219,237,.27)",n.lineWidth=.9,n.beginPath();let l=r<700?100:160,c=.29+a.steering*.22;for(let h=0;h<l;h++){let d=h*11.4,u=ba(st(d+1.6)+this.now*(.67+.53*st(d))),p=ba(st(d+9.3)-u*c*.61)*r,m=u*(s+43)-22,y=5+u*17*st(d+3.2);n.moveTo(p,m),n.lineTo(p-y*c,m+y)}n.stroke()}if(this.route.track.snow&&!Ui(this.route.track,e.player.distance)){n.fillStyle="rgba(231,243,255,.52)";let l=r<700?44:72;for(let c=0;c<l;c++){let h=c*16.87,d=ba(st(h+1.3)+this.now*(.053+st(h)*.079)),u=ba(st(h+6.8)+d*.13+a.steering*.008)*r,p=d*(s+12)-6,m=.72+st(h+.22)*1.59;n.fillRect(u,p,m,m)}}for(let l of e.effects.items){if(l.life<=0)continue;let c=l.sprite.position,h=this.view(c.x,c.y,c.z);if(h[2]<.7)continue;let[d,u,p]=this.project(h);if(l.spark)n.strokeStyle="rgba(255,178,76,"+l.life/l.duration+")",n.lineWidth=Math.max(1,p/25),n.beginPath(),n.moveTo(d,u),n.lineTo(d+(d-r*.5)*.026,u-6),n.stroke();else{let m=Math.max(.1,p*l.sprite.scale.x*.47),y=n.createRadialGradient(d,u,0,d,u,m);y.addColorStop(0,"rgba(180,191,197,"+l.sprite.material.opacity+")"),y.addColorStop(1,"rgba(180,191,197,0)"),n.fillStyle=y,n.fillRect(d-m,u-m,m*2,m*2)}}let o=n.createRadialGradient(r*.5,s*.47,Math.min(r,s)*.29,r*.5,s*.47,Math.hypot(r*.5,s*.53));o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,this.palette.shade),n.fillStyle=o,n.fillRect(0,0,r,s)}renderGame(e){let t=this.context,{camera:n,player:r,rival:s,playerCar:a,rivalCar:o}=e;n.updateMatrixWorld(),this.matrix=n.matrixWorld.elements,this.eye=n.position;let l=Math.min(this.height,this.width*1.15);this.focal=l*.5/Math.tan(n.fov*Math.PI/360),t.setTransform(this.pixelRatio,0,0,this.pixelRatio,0,0);let c=["chase","bonnet","wide"][e.cameraMode],h=r.speed===0&&(s?.speed??0)===0&&e.status==="countdown"&&!this.route.track.wet&&!e.multiplayer,d=c+":"+this.width+":"+this.height;if(h&&this.gridDrawn===d)return;this.gridDrawn=h?d:null,this.backdrop(r.distance),this.roadway(r.distance,c),this.landmarks(e.player.distance),this.gantry(r.distance);let u=[{mesh:a,vehicle:r,isRival:!1}];s&&u.push({mesh:o,vehicle:s,isRival:!0,color:"#7f122a"});for(let{car:p,vehicle:m}of e.opponents.values())u.push({mesh:p,vehicle:m,isRival:!0});for(let p of u){let{x:m,y,z:f}=p.mesh.position;p.depth=this.view(m,y,f)[2]}u.sort((p,m)=>m.depth-p.depth);for(let{mesh:p,vehicle:m,isRival:y,color:f}of u)this.car(p,m,c,y,f);this.foreground(e,e.renderStep||0)}dispose(){this.sections=[],this.trees=[]}};var Sf="omojiz.gamepad.v1",Sa=(i,e,t=0)=>({kind:"axis",index:i,direction:e,rest:t}),Ot=i=>({kind:"button",index:i}),zl=[["left","\u5DE6\u30B9\u30C6\u30A2"],["right","\u53F3\u30B9\u30C6\u30A2"],["accelerate","\u30A2\u30AF\u30BB\u30EB"],["brake","\u30D6\u30EC\u30FC\u30AD"],["handbrake","\u30CF\u30F3\u30C9\u30D6\u30EC\u30FC\u30AD"],["camera","\u30AB\u30E1\u30E9\u5207\u66FF"],["pause","\u30DD\u30FC\u30BA / \u518D\u958B"],["reset","\u8ECA\u4F53\u3092\u7ACB\u3066\u76F4\u3059"]],wf={left:[Sa(0,-1),Ot(14)],right:[Sa(0,1),Ot(15)],accelerate:[Ot(7)],brake:[Ot(6)],handbrake:[Ot(0)],camera:[Ot(3)],pause:[Ot(9)],reset:[Ot(2)]},Tf={left:[Sa(0,-1),Ot(14)],right:[Sa(0,1),Ot(15)],accelerate:[Ot(0)],brake:[Ot(1)],handbrake:[Ot(2)],camera:[Ot(3)],pause:[Ot(9)],reset:[Ot(4)]},S1=new Map([[0,"\u4E0B\u30D5\u30A7\u30A4\u30B9\u30DC\u30BF\u30F3"],[2,"\u5DE6\u30D5\u30A7\u30A4\u30B9\u30DC\u30BF\u30F3"],[3,"\u4E0A\u30D5\u30A7\u30A4\u30B9\u30DC\u30BF\u30F3"],[6,"\u5DE6\u30C8\u30EA\u30AC\u30FC"],[7,"\u53F3\u30C8\u30EA\u30AC\u30FC"],[9,"\u30E1\u30CB\u30E5\u30FC"],[14,"\u5341\u5B57\u30AD\u30FC\u5DE6"],[15,"\u5341\u5B57\u30AD\u30FC\u53F3"]]),w1=Object.freeze(Object.fromEntries(zl.map(([i])=>[i,0]))),T1=i=>i&&Number.isInteger(i.index)&&i.index>=0&&i.index<128&&(i.kind==="button"||i.kind==="axis"&&[1,-1].includes(i.direction)&&Number.isFinite(i.rest)&&Math.abs(i.rest)<=1);function E1(){try{let i=JSON.parse(globalThis.localStorage?.getItem(Sf)||"{}");return{preferred:typeof i.preferred=="string"?i.preferred:"",mappings:new Map(Object.entries(i.mappings??{}).map(([e,t])=>[e,Object.fromEntries(zl.flatMap(([n])=>T1(t?.[n])?[[n,t[n]]]:[]))]))}}catch{return{preferred:"",mappings:new Map}}}var Vn=E1(),Ef=null;function du(){try{globalThis.localStorage?.setItem(Sf,JSON.stringify({preferred:Vn.preferred,mappings:Object.fromEntries(Vn.mappings)}))}catch{}}function Bl(){try{return Array.from(globalThis.navigator?.getGamepads?.()??[]).filter(i=>i?.connected)}catch{return[]}}var kl=i=>i.find(e=>e.id===Vn.preferred&&e.index===Ef)??i.find(e=>e.id===Vn.preferred)??i[0];function pu(i,e){let t=i.buttons[e];return Number.isFinite(t?.value)?t.value:+!!t?.pressed}function A1(i,e){if(e.kind==="button"){let a=pu(i,e.index);return a>.025?Math.min(a,1):0}let t=i.axes[e.index];if(!Number.isFinite(t))return 0;let n=1-e.rest*e.direction,r=(t-e.rest)*e.direction/Math.max(.12,n),s=Math.abs(e.rest)>.75?.05:.17;return Math.min(1,Math.max(0,(r-s)/(1-s)))}function Af(){let i=kl(Bl());if(!i)return w1;let e=i.mapping==="standard"?wf:Tf,t=Vn.mappings.get(i.id);return Object.fromEntries(zl.map(([n])=>{let r=t?.[n]?[t[n]]:e[n];return[n,Math.max(...r.map(s=>A1(i,s)))]}))}function R1(i,e){return e.kind==="axis"?e.index===0&&e.rest===0?e.direction<0?"\u5DE6\u30B9\u30C6\u30A3\u30C3\u30AF\u5DE6":"\u5DE6\u30B9\u30C6\u30A3\u30C3\u30AF\u53F3":`\u8EF8 ${e.index+1} ${e.direction<0?"\u2212":"\uFF0B"}`:i.mapping==="standard"&&S1.get(e.index)||`\u30DC\u30BF\u30F3 ${e.index+1}`}function C1(i,e){for(let r=0;r<i.buttons.length;r++){let s=pu(i,r);if(s<.25&&(e.buttons[r]=!0),e.buttons[r]&&s>.58)return Ot(r)}let t,n=.48;for(let r=0;r<i.axes.length;r++){let s=e.axes[r],o=i.axes[r]-s;!Number.isFinite(o)||Math.abs(o)<=n||(t=Sa(r,Math.sign(o),Math.round(s*100)/100),n=Math.abs(o))}return t}function Rf(i){if(!i)return;i.classList.add("gamepad-settings"),i.innerHTML=`
    <h3>\u30B2\u30FC\u30E0\u30D1\u30C3\u30C9</h3>
    <p data-pad-status aria-live="polite"></p>
    <select data-pad-select aria-label="\u64CD\u4F5C\u3059\u308B\u30B3\u30F3\u30C8\u30ED\u30FC\u30E9\u30FC" hidden></select>
    <div data-pad-layout hidden>
      <p>\u64CD\u4F5C\u540D\u3092\u9078\u3073\u3001\u5272\u308A\u5F53\u3066\u305F\u3044\u30DC\u30BF\u30F3\u3092\u62BC\u3059\u304B\u30B9\u30C6\u30A3\u30C3\u30AF\u3092\u5012\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>
      <div class="gamepad-bindings"></div>
      <button type="button" class="gamepad-defaults">\u521D\u671F\u914D\u7F6E\u306B\u623B\u3059</button>
    </div>`;let e=i.querySelector("[data-pad-status]"),t=i.querySelector("[data-pad-select]"),n=i.querySelector("[data-pad-layout]"),r=i.querySelector(".gamepad-bindings"),s=i.querySelector(".gamepad-defaults"),a=new Map(zl.map(([f,g])=>{let v=document.createElement("button");v.type="button",v.dataset.bind=f,v.setAttribute("aria-pressed","false");let _=document.createElement("span");_.textContent=g;let x=document.createElement("small");return v.append(_,x),r.append(v),[f,{row:v,assignment:x}]})),o=i.closest("dialog"),l=null,c=[],h="",d=null,u="";function p(f){let g=typeof globalThis.navigator?.getGamepads=="function",v=f?u||(f.mapping==="standard"?"\u6A19\u6E96\u30B3\u30F3\u30C8\u30ED\u30FC\u30E9\u30FC\u63A5\u7D9A\u4E2D":"\u6C4E\u7528\u30B3\u30F3\u30C8\u30ED\u30FC\u30E9\u30FC\u63A5\u7D9A\u4E2D"):g?"\u30B3\u30F3\u30C8\u30ED\u30FC\u30E9\u30FC\u3092\u63A5\u7D9A\u3057\u3001\u3044\u305A\u308C\u304B\u306E\u30DC\u30BF\u30F3\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002":"\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u3067\u306F\u30B2\u30FC\u30E0\u30D1\u30C3\u30C9\u3092\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002";if(e.textContent!==v&&(e.textContent=v),t.hidden=!f,n.hidden=!f,!f)return;t.value=String(f.index);let _=f.mapping==="standard"?wf:Tf,x=Vn.mappings.get(f.id);for(let[S,{row:M,assignment:w}]of a){let A=l?.key===S;M.setAttribute("aria-pressed",String(A));let T=x?.[S]?[x[S]]:_[S];w.textContent=A?"\u5165\u529B\u5F85\u3061\u2026":T.map(C=>R1(f,C)).join(" / ")}}function m(f){if(d=null,o&&!o.open)return;c=Bl();let g=JSON.stringify(c.map(_=>[_.index,_.id])),v=kl(c);if(g!==h&&(h=g,t.replaceChildren(...c.map(_=>{let x=document.createElement("option");return x.value=String(_.index),x.textContent=_.id||"\u30B2\u30FC\u30E0\u30D1\u30C3\u30C9",x})),(l?.index!==v?.index||l?.id!==v?.id)&&(l=null),u="",p(v)),v&&l){let _=C1(v,l);_?(Vn.mappings.set(v.id,{...Vn.mappings.get(v.id),[l.key]:_}),du(),u=`${a.get(l.key).row.firstChild.textContent}\u3092\u5909\u66F4\u3057\u307E\u3057\u305F\u3002`,l=null,p(v)):f>l.until&&(l=null,u="\u5165\u529B\u5F85\u3061\u3092\u7D42\u4E86\u3057\u307E\u3057\u305F\u3002",p(v))}d=requestAnimationFrame(m)}t.addEventListener("change",()=>{let f=c.find(g=>String(g.index)===t.value);f&&(Vn.preferred=f.id,Ef=f.index,du(),u="",l=null,p(f))}),r.addEventListener("click",f=>{let g=f.target.closest("[data-bind]")?.dataset.bind,v=kl(Bl());!v||!g||(l=l?.key===g?null:{key:g,id:v.id,index:v.index,until:performance.now()+12e3,buttons:Array.from(v.buttons,(_,x)=>pu(v,x)<.25),axes:Array.from(v.axes)},u=l?"\u30DC\u30BF\u30F3\u3092\u62BC\u3059\u304B\u3001\u30B9\u30C6\u30A3\u30C3\u30AF\u3092\u5272\u308A\u5F53\u3066\u308B\u65B9\u5411\u306B\u5012\u3057\u3066\u304F\u3060\u3055\u3044\u3002":"",p(v))}),s.addEventListener("click",()=>{let f=kl(Bl());f&&(l=null,Vn.mappings.delete(f.id),du(),u="\u521D\u671F\u914D\u7F6E\u306B\u623B\u3057\u307E\u3057\u305F\u3002",p(f))});let y=()=>{!o||o.open?d===null&&(d=requestAnimationFrame(m)):(d!==null&&cancelAnimationFrame(d),d=null,l=null,u="",h="")};o&&new MutationObserver(y).observe(o,{attributeFilter:["open"]}),p(null),y()}var Uf="omojiz.raceRecords.v1",fu=1/90,Gl=["chase","bonnet","wide"],Cf={ArrowUp:"accelerate",KeyW:"accelerate",ArrowDown:"brake",KeyS:"brake",ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",Space:"handbrake"},If={easy:{pace:.82,launch:.82,lane:.5},normal:{pace:.97,launch:.92,lane:.43},hard:{pace:1.14,launch:1.05,lane:.31}},Hl=["distance","offset","speed","heading","roll","brake","slip"],ht=(i,e,t)=>Math.max(e,Math.min(i,t)),Yt=(i,e,t)=>i+(e-i)*t,Wn=(i,e)=>1-Math.exp(-i*e),wa=i=>Math.atan2(Math.sin(i),Math.cos(i));function Vl(){try{let i=JSON.parse(globalThis.localStorage?.getItem(Uf)||"{}");return!i||typeof i!="object"||Array.isArray(i)?{}:Object.fromEntries(Object.entries(i).filter(([,e])=>e&&Number.isFinite(e.time)&&e.time>0&&Number.isFinite(e.score)))}catch{return{}}}function I1({mode:i="duel",car:e,track:t,difficulty:n="normal"}){return[i,t?.id??t,e?.id??e,i==="duel"?n:"any"].join(":")}function mu(i,e=0,t=0){return{stats:i,distance:e,offset:t,speed:0,heading:0,angularSpeed:0,slipAngle:0,steering:0,rpm:920,gear:0,throttle:0,brake:0,slip:0,impact:0,roll:0,finishTime:null,driftScore:0,driftChain:0,chainTime:0}}function Pf(i,e){return{distance:-4.8*Math.floor(i/2),offset:(i%2?-1:1)*e*.175}}function Nf(i,e,t){let n=Math.abs(i.speed);return(.23+.76*(1-Math.exp(-n/10)))/(1+n/55)*(i.stats.handling||1)*(e?.91:1)*(t?1.27:1)}function Lf(i,e,t,n,r={}){let{stats:s}=i,a=(s.topSpeed||190)/3.6,o=(s.grip||1)*(t.track.grip||1),l=Math.max(1.2,t.width*.5-(s.dimensions?.[1]??1.7)*.5+.23),c=Math.abs(i.offset)>l-.38,h=t.sample(i.distance,r),d=s.accel||7,u=ht(e.throttle||0,0,1),p=ht(e.brake||0,0,1),m=ht(e.handbrake||0,0,1),y=ht(Math.abs(i.speed)/a,0,1.2),f=e.reverse!==!1&&p>.1&&u<.1&&i.speed<.64,g=i.speed*(.034+y**2*.017)*(c?4.85:1),v=d*(1-Math.min(.98,.67*y**2.25))*u,_=(f?0:p*13*o*(s.brakeForce??1))+m*3.9,x=i.speed;i.speed+=(v-g-_*Math.sign(i.speed)-(f?p*4.3:0)-(h.grade||0)*5.8*Math.min(1,Math.abs(i.speed)/5))*n,i.speed*x<0&&!f&&u<.1&&(i.speed=0),i.speed=ht(i.speed,-8.6,a);let S=ht(e.steering||0,-1,1);i.steering=Yt(i.steering,S,Wn(m?10:8.5,n));let M=ht(Math.abs(i.speed)/18,0,1),w=m>.1&&Math.abs(i.speed)>7,A=ht((Math.abs(i.speed)-17)/34,0,1)*Math.abs(i.steering)*(1.26-.47*o),T=s.drive==="FR"||s.drive==="RR"?1.13:.9,C=M*i.steering*T*(s.drift||1)*(.57*m+.22*A+(t.track.wet?.05:0));i.slipAngle=Yt(i.slipAngle,C,Wn(w?5.6:7.1*o,n));let P=i.offset,U=i.heading-i.slipAngle;i.offset+=Math.sin(U)*i.speed*n;let O=Math.max(.56,1-(h.curve||0)*(i.offset+P)/2),N=Math.cos(U)*i.speed/O;i.distance=ht(i.distance+N*n,-30,t.length+105);let H=t.sample(i.distance,{}),V=wa(H.heading-h.heading),K=i.steering*Math.sign(i.speed)*Nf(i,t.track.wet,w),Y=ht(Math.abs(i.speed)/2.2,0,1);if(i.angularSpeed=Yt(i.angularSpeed,Y*K,Wn(w?5.1:10,n)),i.heading=wa(i.heading+i.angularSpeed*n-V),i.impact=Math.max(0,i.impact-n*4.1),Math.abs(i.offset)>l){let ae=Math.sign(i.offset),te=Math.abs(Math.sin(U)*i.speed);i.offset=ae*l,ae*Math.sin(i.heading)*Math.sign(i.speed)>0&&(i.heading=-ae*Math.sign(i.speed)*Math.min(.37,.08+te*.019),i.angularSpeed*=-.26,i.slipAngle*=.32,i.speed*=.7+.23*(1-ht(te/26,0,1)),i.impact=Math.max(i.impact,ht(te/13,.16,1)))}let re=s.gears||5,ce=[0,.25,.43,.6,.76,.9].slice(0,re);ce.push(1);let ue=ce.slice(1,re).reduce((ae,te)=>ae+(y>te?1:0),1),ge=ht((y-ce[ue-1])/(ce[ue]-ce[ue-1]),0,1);i.gear=i.speed<-.4?-1:i.speed>.6||u>.02?ue:0;let Q=i.gear===-1?1200+Math.abs(i.speed)*560:i.gear===0?920:ue===1?950+6550*Math.pow(ge,.65)+260*u:4200+3300*ge+260*u;return i.rpm=Yt(i.rpm,Q,Wn(12,n)),i.throttle=f?p:u,i.brake=Math.max(f?0:p,m),i.roll=Yt(i.roll,-i.steering*Math.min(.065,Math.abs(i.speed)*.003),Wn(7,n)),i.slip=ht(Math.abs(i.slipAngle)*2.45+(c&&Math.abs(i.speed)>10?.29:0),0,1),i.slip>.31&&i.speed>10&&!c?(i.chainTime+=n,i.driftChain+=i.speed*i.slip*(1+Math.min(2,i.chainTime/2.5))*n*8):i.driftChain>0&&(i.impact<.15&&(i.driftScore+=i.driftChain),i.driftChain=0,i.chainTime=0),i}function Df(i,e,t,n=1,r=1,s={}){let a=Math.max(0,i.speed),l=e.sample(i.distance,s).curve||0,c=6.65*(e.track.grip||1)*(i.stats.grip||1)*n**2,h=(i.stats.topSpeed||190)*Math.min(1,.84*n)/3.6,d=9+a*1.6;for(let g=0;g<=d;g+=6){let v=Math.abs(e.sample(i.distance+g,s).curve||0),_=Math.sqrt(c/Math.max(.001,v)),x=Math.sqrt(_**2+2*7.5*g);h=Math.min(h,x)}let u=ht(Math.atan2(t-i.offset,4.2+a*.49),-.42,.42),p=l*a/Math.max(.58,1-l*i.offset),m=p+2.45*wa(u+i.slipAngle*.6-i.heading)-.28*(i.angularSpeed-p),y=ht(m/Nf(i,e.track.wet,!1),-1,1),f=a-h;return{steering:y,brake:ht((f+.1)*.32,0,1),throttle:ht((h-a)*.21,0,r),handbrake:0,reverse:!1}}function P1(i,e,t,n,r){return t==="practice"?null:t==="duel"?r?"gold":"bronze":t==="drift"?n>=e.length*1.5?"gold":n>=e.length*.64?"silver":"bronze":i<=e.length/25?"gold":i<=e.length/19?"silver":"bronze"}function L1(i){let e=[];for(let l=0;l<=150;l++){let{x:c,z:h}=i.sample(i.length*l/150);e.push([c,h])}let t=Math.min(...e.map(([l])=>l)),n=Math.min(...e.map(([,l])=>l)),r=Math.max(...e.map(([l])=>l))-t,s=Math.max(...e.map(([,l])=>l))-n,a=Math.max(r,s,1),o=(l,c)=>[.08+.84*(l-t+(a-r)/2)/a,.08+.84*(c-n+(a-s)/2)/a];return{points:e.map(([l,c])=>o(l,c)),convert:o}}function Ff(i,e){let t=document.createElement("canvas");t.width=t.height=i;let n=t.getContext("2d");return n?(e(n,i),new pn(t)):null}function gu(){let i=Ff(64,(r,s)=>{let a=r.createRadialGradient(s/2,s/2,s*.08,s/2,s/2,s/2);a.addColorStop(0,"rgba(0,0,0,.9)"),a.addColorStop(.42,"rgba(0,0,0,.66)"),a.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=a,r.fillRect(0,0,s,s)}),e=new Ut(3.15,6);e.rotateX(-Math.PI/2);let t=new ct({map:i,transparent:!0,opacity:.6,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),n=new Ie(e,t);return n.renderOrder=2,n}var vu=class{constructor(e,t,n){this.wet=n,this.pointer=0,this.wait=0,this.count=t==="low"?34:70,this.items=Array.from({length:this.count},()=>({life:0,velocity:new D}));let r=Ff(64,(s,a)=>{let o=s.createRadialGradient(a/2,a/2,0,a/2,a/2,a/2);o.addColorStop(0,"rgba(255,255,255,.95)"),o.addColorStop(.3,"rgba(255,255,255,.57)"),o.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=o,s.fillRect(0,0,a,a)});this.map=r,this.spriteGroup=new xt;for(let s of this.items)s.sprite=new Ws(new Hr({map:r,color:16777215,transparent:!0,depthWrite:!1})),s.sprite.visible=!1,this.spriteGroup.add(s.sprite);e.add(this.spriteGroup)}emit(e,t,n,r){let s=this.items[this.pointer++%this.count];s.spark=r,s.duration=r?.19+Math.random()*.23:this.wet?.4:.76,s.life=s.duration;let a=r?Math.sign(n.offset||1):this.pointer%2?1:-1;s.sprite.position.copy(e),s.sprite.position.x+=a*Math.cos(t)*.85-Math.sin(t)*1.52,s.sprite.position.z+=a*Math.sin(t)*.85+Math.cos(t)*1.52,s.sprite.position.y+=r?.42:.15,s.velocity.set(-Math.sin(t)*(r?7:2.7)+(Math.random()-.5)*2,r?1+Math.random()*3:.58+Math.random()*.73,Math.cos(t)*(r?7:2.7)+(Math.random()-.5)*2),s.sprite.material.color.set(r?16754494:this.wet?10207194:12765389),s.sprite.material.blending=r?Bn:tr,s.sprite.visible=!0}update(e,t,n,r){this.wait-=e;let s=r.impact>.13&&Math.abs(r.speed)>5,a=this.wet&&Math.abs(r.speed)>11;this.wait<=0&&(s||a||r.slip>.23&&Math.abs(r.speed)>9)&&(this.emit(t,n,r,s),s&&this.emit(t,n,r,!0),this.wait=s?.016:a?.035:.027);for(let o of this.items){if(o.life<=0)continue;if(o.life-=e,o.life<=0){o.sprite.visible=!1;continue}let l=o.life/o.duration;o.velocity.y-=e*(o.spark?10.2:.12),o.sprite.position.addScaledVector(o.velocity,e),o.sprite.scale.setScalar(o.spark?.12+l*.15:.18+(1-l)*1.36),o.sprite.material.opacity=l*(o.spark?1:this.wet?.23:.44)}}dispose(){this.spriteGroup.removeFromParent();for(let e of this.items)e.sprite.material.dispose();this.map?.dispose()}};function D1(i){let e=new Set;i.traverse(t=>{t.geometry&&e.add(t.geometry);for(let n of Array.isArray(t.material)?t.material:[t.material])if(n){e.add(n);for(let r of Object.values(n))r?.isTexture&&e.add(r)}}),e.forEach(t=>t.dispose()),i.removeFromParent()}var Wl=class{constructor({canvas:e,onHud:t=()=>{},onFinish:n=()=>{},onPause:r=()=>{},onMultiplayerPause:s=()=>{},onAudio:a=()=>{},onError:o=()=>{}}){this.canvas=e,this.onHud=t,this.onFinish=n,this.onPause=r,this.onMultiplayerPause=s,this.onAudio=a,this.onError=o,this.heldKeys=new Set,this.heldActions=new Set,this.opponents=new Map,this.status="idle",this.onPadFrame=this.onPadFrame.bind(this),this.cameraTarget=new D,this.cameraAim=new D,this.cameraPosition=new D,this.playerPoint={},this.rivalPoint={},this.trackPoint={},this.lookPoint={},this.driverPoint={},this.cameraMode=0,this.frame=this.frame.bind(this),this.onKeyDown=l=>this.key(l,!0),this.onKeyUp=l=>this.key(l,!1),this.onBlur=()=>{this.clearInputs(),this.pause()},this.onVisibility=()=>{document.hidden&&this.onBlur()},this.onContextLost=l=>{if(l.preventDefault(),this.preferSoftware=!0,!(!this.world||this.status==="idle"))try{this.useSoftware(),this.renderer.setWorld(this.world),this.render()}catch(c){this.pause(),this.onError(c)}},window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),document.addEventListener("visibilitychange",this.onVisibility),this.canvas.addEventListener("webglcontextlost",this.onContextLost)}useSoftware(){this.renderer?.dispose(),this.softwareCanvas??=this.canvas.cloneNode(),this.softwareCanvas.removeAttribute("id"),this.softwareCanvas.style.cssText="width:100%;height:100%;position:absolute;inset:0",this.canvas.after(this.softwareCanvas),this.canvas.hidden=!0,this.renderer=new Ol(this.softwareCanvas),this.rendererMode="software",this.renderer.setPixelRatio(this.pixelRatio),this.size=[]}initRenderer(e){let t=e==="low"?1:e==="high"?1.8:1.35;if(this.pixelRatio=Math.min(window.devicePixelRatio||1,t),!this.renderer)try{if(this.preferSoftware)throw Error("WebGL disabled");let n=this.canvas.getContext("webgl2",{alpha:!1,antialias:e!=="low",depth:!0,powerPreference:"high-performance"});if(!n)throw Error("WebGL unavailable");this.renderer=new hs({canvas:this.canvas,context:n}),this.renderer.outputColorSpace=yt,this.renderer.toneMapping=ns,this.renderer.toneMappingExposure=1.24,this.rendererMode="webgl"}catch{this.useSoftware()}this.renderer.setPixelRatio(this.pixelRatio),this.size=[],this.camera=new It(64,1,.13,2450)}start({car:e,track:t,mode:n="duel",difficulty:r="normal",quality:s="auto",assist:a=!1,multiplayer:o=null}={}){this.exit();let l=typeof e=="object"?e:ur(e);if(!l)return this.onError(new Error("\u8ECA\u4E21\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002")),!1;let c=t?.id??t,h=o?n==="ranked"?"ranked":"online":["duel","time","drift","practice"].includes(n)?n:"duel",d=s==="auto"?window.matchMedia?.("(pointer: coarse)")?.matches||(navigator.hardwareConcurrency||8)<=4?"low":"high":s;try{this.initRenderer(s==="auto"&&d!=="low"?"auto":d),this.rendererMode==="software"?(this.world={...uu(c),scene:new si},this.renderer.setWorld(this.world)):this.world=bf(c,d);let u=this.rendererMode==="software"?"low":d;if(this.playerCar=Di(l,{beam:this.world.track.dark,quality:u}),this.playerShadow=gu(),this.world.scene.add(this.playerCar,this.playerShadow),h==="duel"){let y=l.id==="hachi"?"nagare":"hachi",f=ur(y),g=f&&f.id===y?f:l,v={...g,topSpeed:Yt(g.topSpeed,l.topSpeed,.72),accel:Yt(g.accel,l.accel,.76)};this.rival=mu(v,1.6,-this.world.width*.175),this.rivalCar=Di(g,{color:8327722,opponent:!0,beam:this.world.track.dark,quality:u==="high"?"medium":"low"}),this.rivalShadow=gu(),this.world.scene.add(this.rivalCar,this.rivalShadow)}this.multiplayer=o;let p=o?.players.find(y=>y.id===o.selfId),m=o?Pf(p?.slot??0,this.world.width):{distance:0,offset:this.rival?this.world.width*.175:0};if(this.player=mu(l,m.distance,m.offset),p){for(let y of Hl)Number.isFinite(p[y])&&(this.player[y]=p[y]);this.player.finishTime=Number.isFinite(p.finishTime)?p.finishTime:null}return o&&this.updateMultiplayer(o.players),this.effects=new vu(this.world.scene,d,this.world.track.wet),this.mapProjection=L1(this.world),this.elapsed=o?Math.max(0,(Date.now()-o.startAt)/1e3):0,this.startClock=o?(o.startAt-Date.now())/1e3:3.15,this.accumulated=0,this.hudClock=0,this.lastFrame=null,this.mode=h,this.difficulty=If[r]?r:"normal",this.recordKey=I1({mode:this.mode,car:l,track:this.world.track,difficulty:this.difficulty}),this.previousRecord=o?null:Vl()[this.recordKey]??null,this.selected={car:l,track:this.world.track.id,mode:this.mode,difficulty:this.difficulty,quality:s,assist:a},this.setAssist(a),this.usedAssist=this.assist,this.finished=null,this.status=this.player.finishTime!==null?"finished":this.startClock>0?"countdown":"running",this.updateTransforms(0,!0),this.render(),this.sendHud(),this.status!=="finished"&&(this.animationId=requestAnimationFrame(this.frame)),!0}catch(u){return this.exit(),this.onError(u),!1}}key(e,t){if(this.status==="idle"||this.status==="finished"||e.altKey||e.ctrlKey||e.metaKey||e.target?.closest?.("input, select, textarea, [contenteditable]")&&t)return;if(Cf[e.code]){if(e.code==="Space"&&e.target?.closest?.("button")&&this.status==="paused")return;e.preventDefault(),t&&this.status!=="paused"&&!this.gamepadSuspended?this.heldKeys.add(e.code):this.heldKeys.delete(e.code)}else t&&!e.repeat&&(e.code==="Escape"&&(e.preventDefault(),e.stopPropagation(),this.togglePause()),e.code==="KeyC"&&this.cycleCamera(),e.code==="KeyR"&&this.resetCar())}setInput(e,t){t&&!this.gamepadSuspended&&(this.status==="countdown"||this.status==="running")?this.heldActions.add(e):this.heldActions.delete(e)}clearInputs(){this.heldKeys.clear(),this.heldActions.clear(),this.gamepadControls=null}setAssist(e){this.assist=this.mode!=="ranked"&&!!e,this.assist&&(this.status==="running"||this.status==="countdown")&&(this.usedAssist=!0),this.selected&&(this.selected.assist=this.assist)}input(){let e=new Set(this.heldActions);for(let l of this.heldKeys)e.add(Cf[l]);let t=this.gamepadControls,n=Math.max(Number(e.has("accelerate")),t?.accelerate??0),r=Math.max(Number(e.has("brake")),t?.brake??0),a=Number(e.has("right"))-Number(e.has("left"))||(t?.right??0)-(t?.left??0),o=Math.max(Number(e.has("handbrake")),t?.handbrake??0);if(this.assist&&n&&!r&&!o){let l=Df(this.player,this.world,0,.94,1,this.driverPoint);return{...l,steering:a||l.steering}}return{throttle:n,brake:r,steering:a,handbrake:o}}setGamepadSuspended(e){this.gamepadSuspended=!!e,this.gamepadSuspended&&this.clearInputs()}pollGamepad(){let e=Af(),t=this.padButtons??e;if(this.padButtons=e,document.hidden){this.gamepadControls=null;return}e.pause>.5&&t.pause<=.5&&this.togglePause(),!(this.status==="paused"||this.gamepadSuspended)&&(this.gamepadControls=e,e.camera>.5&&t.camera<=.5&&this.cycleCamera(),e.reset>.5&&t.reset<=.5&&this.resetCar())}onPadFrame(){this.padFrame=null,this.status==="paused"&&(this.pollGamepad(),this.status==="paused"&&(this.padFrame=requestAnimationFrame(this.onPadFrame)))}togglePause(){this.multiplayer?this.onMultiplayerPause():this.status==="paused"?this.resume():this.pause()}cycleCamera(){return this.cameraMode=(this.cameraMode+1)%Gl.length,this.world?(this.updateTransforms(0,!0),this.render(),this.sendHud(),Gl[this.cameraMode]):Gl[this.cameraMode]}resetCar(){this.multiplayer||this.status!=="running"||(this.player.offset=0,this.player.heading=0,this.player.speed=4.25,this.player.angularSpeed=0,this.player.steering=0,this.player.roll=0,this.player.slipAngle=0,this.player.slip=0,this.player.driftChain=0,this.player.chainTime=0,this.elapsed+=2,this.updateTransforms(0,!0),this.sendHud())}pause(){this.multiplayer||this.status!=="countdown"&&this.status!=="running"||(this.resumeStatus=this.status,this.status="paused",this.clearInputs(),cancelAnimationFrame(this.animationId),this.animationId=null,this.lastFrame=null,this.sendHud(),this.onPause(!0),this.padFrame=requestAnimationFrame(this.onPadFrame))}resume(){this.status==="paused"&&(this.padFrame!=null&&cancelAnimationFrame(this.padFrame),this.padFrame=null,this.status=this.resumeStatus||"running",this.lastFrame=null,this.onPause(!1),this.animationId=requestAnimationFrame(this.frame))}restart(){return this.selected&&!this.multiplayer?this.start({...this.selected}):!1}exit(){if(this.animationId!=null&&cancelAnimationFrame(this.animationId),this.animationId=null,this.padFrame!=null&&cancelAnimationFrame(this.padFrame),this.padFrame=null,this.clearInputs(),this.padButtons=null,this.gamepadSuspended=!1,this.status="idle",this.world){this.effects?.dispose();for(let e of[this.playerCar,this.rivalCar,...Array.from(this.opponents.values(),t=>t.car)])e&&(e.removeFromParent(),ds(e));for(let e of[this.playerShadow,this.rivalShadow,...Array.from(this.opponents.values(),t=>t.shadow)])e&&D1(e);this.world.dispose?.(),this.renderer?.renderLists?.dispose()}this.world=null,this.multiplayer=null,this.opponents.clear(),this.rival=null,this.player=null,this.rivalCar=this.playerCar=this.rivalShadow=this.playerShadow=this.effects=null}updateMultiplayer(e){if(!this.multiplayer||!this.world)return;let t=performance.now();for(let n of e){if(n.id===this.multiplayer.selfId)continue;let{distance:r,offset:s}=Pf(n.slot,this.world.width),a=this.opponents.get(n.id);if(!a){let o=ur(n.car),l=/^#[a-f\d]{6}$/i.test(n.color)?n.color:o.paint,c={...o,paint:l},h=mu(c,r,s),d=Di(c,{opponent:!0,beam:!1,quality:"low"}),u=gu();a={vehicle:h,car:d,shadow:u,point:{},target:{}},this.opponents.set(n.id,a),this.world.scene.add(d,u);for(let p of Hl)Number.isFinite(n[p])&&(h[p]=n[p])}for(let o of Hl)a.target[o]=Number.isFinite(n[o])?n[o]:a.vehicle[o];a.connected=n.connected!==!1,a.vehicle.finishTime=Number.isFinite(n.finishTime)?n.finishTime:null,a.receivedAt=t}}getMultiplayerState(){return!this.multiplayer||!this.player?null:{...Object.fromEntries(Hl.map(e=>[e,this.player[e]])),distance:Math.min(this.world.length,this.player.distance),finishTime:this.player.finishTime}}destroy(){this.exit(),this.renderer?.dispose(),this.renderer=null,this.softwareCanvas?.remove(),this.softwareCanvas=null,this.canvas.hidden=!1,window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.removeEventListener("webglcontextlost",this.onContextLost)}step(e){if(this.status==="countdown"){this.startClock=this.multiplayer?(this.multiplayer.startAt-Date.now())/1e3:this.startClock-e;let n=this.input().throttle;this.player.rpm=Yt(this.player.rpm,920+n*3e3,Wn(8,e)),this.player.throttle=n,this.startClock<=0&&(this.status="running");return}if(this.status!=="running")return;this.elapsed=this.multiplayer?Math.max(0,(Date.now()-this.multiplayer.startAt)/1e3):this.elapsed+e;let t=this.player.distance;if(Lf(this.player,this.input(),this.world,e,this.trackPoint),this.rival){let n=this.rival.distance,r=If[this.difficulty],s=this.world.width*.28,a=Math.sin(this.rival.distance*.017)*s*(1-r.lane)*.6,o=-s*r.lane+a;if(Lf(this.rival,Df(this.rival,this.world,o,r.pace,r.launch,this.driverPoint),this.world,e,this.trackPoint),this.rival.finishTime===null&&this.rival.distance>=this.world.length){let l=(this.world.length-n)/Math.max(1e-4,this.rival.distance-n);this.rival.finishTime=this.elapsed-e+e*ht(l,0,1)}this.collideCars()}if(this.player.distance>=this.world.length){let n=(this.world.length-t)/Math.max(1e-4,this.player.distance-t);this.player.finishTime=this.elapsed-e+e*ht(n,0,1),this.finish()}}collideCars(){let e=this.rival,t=this.player,n=t.distance-e.distance,r=t.offset-e.offset;if(Math.abs(n)>=3.75||Math.abs(r)>=1.52)return;let s=Math.sign(r)||1,a=1.53-Math.abs(r);t.offset=ht(t.offset+a*.61*s,-this.world.width*.5,this.world.width*.5),e.offset=ht(e.offset-a*.39*s,-this.world.width*.5,this.world.width*.5);let o=Math.min(1,.25+Math.abs(t.speed-e.speed)*.06),l=ht((t.speed-e.speed)*.48,-10,10),c=t.stats.mass||1100,h=e.stats.mass||1100;t.speed=Math.max(0,t.speed-l*h/(c+h)-.5),e.speed=Math.max(0,e.speed+l*c/(c+h)-.5),t.impact=Math.max(t.impact,o),t.heading+=s*.075,e.heading-=s*.075}finish(){this.status="finished",this.clearInputs();let e=this.player,t=this.rival?this.rival.finishTime===null||e.finishTime<=this.rival.finishTime:null,n=Math.floor(e.driftScore+(e.impact<.15?e.driftChain:0));e.driftScore=n,e.driftChain=0;let r=e.finishTime,s=this.previousRecord,a=!s||r<s.time,o=a;s&&this.mode==="drift"&&(o=n>s.score||n===s.score&&a),s&&this.mode==="duel"&&!!t!=!!s.won&&(o=t);let l=!this.multiplayer&&!!o&&this.mode!=="practice"&&!this.usedAssist;if(l)try{let c=Vl();c[this.recordKey]={time:r,score:n,won:t,updatedAt:Date.now()},globalThis.localStorage?.setItem(Uf,JSON.stringify(c))}catch{}this.finished={...this.snapshot(),time:r,won:t,newRecord:l,rivalTime:this.rival?.finishTime??null,medal:this.multiplayer?null:P1(r,this.world,this.mode,n,t)}}updateCar(e,t,n,r,s){this.world.sample(n.distance,s);let{x:a,y:o,z:l,heading:c,grade:h=0}=s,d=c+n.heading;return e.rotation.order="YXZ",e.rotation.set(-Math.atan(h),Math.PI-d,n.roll),e.position.set(a+Math.cos(c)*n.offset,o+.025,l+Math.sin(c)*n.offset),t.position.copy(e.position),t.position.y+=.012,t.rotation.copy(e.rotation),t.rotation.z=0,e.userData.animate?.({steering:-n.steering*.53,speed:n.speed,dt:r,brake:n.brake,throttle:n.throttle}),d}updateTransforms(e,t=!1){let n=this.updateCar(this.playerCar,this.playerShadow,this.player,e,this.playerPoint);this.rival&&this.updateCar(this.rivalCar,this.rivalShadow,this.rival,e,this.rivalPoint);for(let d of this.opponents.values()){let{vehicle:u,target:p}=d,m=Math.min(.5,(performance.now()-d.receivedAt)/1e3),y=d.connected&&u.finishTime===null,f=t?1:Wn(8,e),g=p.distance+(y?p.speed*Math.cos(p.heading)*m:0);u.distance=Yt(u.distance,ht(g,-30,this.world.length),f),u.heading=wa(u.heading+wa(p.heading-u.heading)*f);for(let v of["offset","roll","brake","slip"])u[v]=Yt(u[v],p[v],f);u.speed=Yt(u.speed,y?p.speed:0,f),this.updateCar(d.car,d.shadow,u,e,d.point)}let r=this.cameraMode===1;for(let d of this.playerCar.children)d.visible=!r||d.userData.headlightBeam===!0;this.playerShadow.visible=!r;let s=this.playerCar.position,a=Math.abs(this.player.speed),o=this.playerPoint.heading+this.player.heading*(this.cameraMode===1?.84:.61),l=Math.sin(o),c=-Math.cos(o);if(this.cameraMode===1)this.cameraPosition.set(s.x+l*1.13,s.y+1.09,s.z+c*1.13),this.cameraTarget.set(s.x+l*30,s.y+1+this.playerPoint.grade*18,s.z+c*30);else{let d=this.cameraMode===2,u=this.rendererMode==="software",p=(d?10.3:u?7.4:6.3)+a*.044,m=(d?5.1:u?2.75:3.02)+a*.014;this.cameraPosition.set(s.x-l*p,s.y+m,s.z-c*p),this.world.sample(this.player.distance+20+a*.3,this.lookPoint),this.cameraTarget.set(Yt(s.x+l*14,this.lookPoint.x,.37),Yt(s.y+.76,this.lookPoint.y+.67,.24),Yt(s.z+c*14,this.lookPoint.z,.37))}!t&&this.player.impact>.16&&(this.cameraPosition.x+=Math.sin(this.elapsed*85)*.16*this.player.impact,this.cameraPosition.y+=Math.cos(this.elapsed*68)*.1*this.player.impact),this.camera.position.lerp(this.cameraPosition,t?1:Wn(this.cameraMode===1?17:7.7,e)),this.cameraAim.lerp(this.cameraTarget,t?1:Wn(9.1,e)),this.camera.lookAt(this.cameraAim);let h=(this.cameraMode===1?68:61)+Math.min(13,a*.24);this.camera.fov=Yt(this.camera.fov,h,t?1:Wn(4,e)),this.camera.updateProjectionMatrix(),this.rendererMode==="webgl"&&this.world.update?.(e,this.player.distance,this.camera),this.effects.update(e,s,n,this.player)}render(){let e=this.rendererMode==="software"?this.softwareCanvas:this.canvas,t=Math.max(1,e.clientWidth),n=Math.max(1,e.clientHeight);(t!==this.size[0]||n!==this.size[1])&&(this.renderer.setSize(t,n,!1),this.size=[t,n],this.camera.aspect=t/n,this.camera.updateProjectionMatrix()),this.rendererMode==="software"?this.renderer.renderGame(this):this.renderer.render(this.world.scene,this.camera)}snapshot(e=!0){let t=this.player,n=this.rival,r=this.status==="countdown"?Math.min(3,Math.max(1,Math.ceil(this.startClock))):this.status==="running"&&this.elapsed<=.74?0:null,s=t.finishTime??this.elapsed,a=this.previousRecord?.time??null,o=this.player.distance/this.world.length,l=ht(o,0,1),c=u=>t.finishTime!==null?u.finishTime!==null&&u.finishTime<t.finishTime:u.finishTime!==null||u.distance>t.distance,h=n&&c(n)?2:1;for(let u of this.opponents.values())c(u.vehicle)&&h++;let d=e?{points:this.mapProjection.points,player:this.mapProjection.convert(this.playerCar.position.x,this.playerCar.position.z),rival:n?this.mapProjection.convert(this.rivalCar.position.x,this.rivalCar.position.z):null,opponents:Array.from(this.opponents.values(),u=>this.mapProjection.convert(u.car.position.x,u.car.position.z))}:void 0;return{speed:Math.round(Math.abs(t.speed)*3.6),rpm:Math.round(t.rpm),gear:t.gear,throttle:t.throttle,slip:t.slip,collision:t.impact,wet:Number(this.world.track.wet),countdown:r,car:t.stats,track:this.world.track,mode:this.mode,status:this.status,time:s,position:h,totalPlayers:1+ +!!n+this.opponents.size,progress:l,driftScore:Math.floor(t.driftScore),driftChain:Math.floor(t.driftChain),best:a,previousBest:a,delta:a===null?null:s-a*l,difficulty:this.difficulty,camera:Gl[this.cameraMode],rivalGap:n?t.distance-n.distance:null,playerDistance:t.distance,rivalDistance:n?.distance??null,map:d,assist:this.assist,driftBest:this.previousRecord?.score??null}}sendHud(){this.onHud(this.snapshot())}frame(e){if(this.animationId=null,this.status!=="running"&&this.status!=="countdown")return;let t=this.lastFrame===null?0:Math.min(.25,Math.max(0,(e-this.lastFrame)/1e3));this.lastFrame=e,this.accumulated+=t;try{if(this.pollGamepad(),this.status==="paused"||this.status==="idle")return;for(;this.accumulated>=fu&&(this.status==="running"||this.status==="countdown");)this.step(fu),this.accumulated-=fu;this.updateTransforms(t),this.renderStep=t,this.render(),this.onAudio(this.snapshot(!1)),this.hudClock-=t,(this.hudClock<=0||this.finished)&&(this.hudClock=1/28,this.sendHud()),this.finished?this.onFinish({...this.finished,map:this.snapshot().map}):(this.status==="running"||this.status==="countdown")&&(this.animationId=requestAnimationFrame(this.frame))}catch(n){this.exit(),this.onError(n)}}};var U1=new URL("./audio/",import.meta.url),pi=Object.freeze([{id:"redline-signal",title:"Redline Signal",bpm:158,duration:73,file:"redline-signal.mp3"},{id:"neon-summit",title:"Neon Summit",bpm:152,duration:76,file:"neon-summit.mp3"},{id:"rain-on-glass",title:"Rain on Glass",bpm:148,duration:78,file:"rain-on-glass.mp3"},{id:"turbo-shrine",title:"Turbo Shrine",bpm:164,duration:70,file:"turbo-shrine.mp3"},{id:"frost-apex",title:"Frost Apex",bpm:155,duration:74,file:"frost-apex.mp3"},{id:"last-shift-dawn",title:"Last Shift at Dawn",bpm:160,duration:72,file:"last-shift-dawn.mp3"}].map(Object.freeze)),di={inline4:{cylinders:4,rasp:.66,depth:.39,lowpass:2130,harmonics:[0,1,.81,.5,.34,.34,.2,.12,.06,.063]},boxer4:{cylinders:4,rasp:.73,depth:.64,lowpass:1760,harmonics:[0,.92,.74,.22,.42,.14,.2,.05,.11]},inline6:{cylinders:6,rasp:.57,depth:.52,lowpass:1910,harmonics:[0,1,.66,.49,.22,.22,.14,.1,.05,.033]},flat6:{cylinders:6,rasp:.67,depth:.54,lowpass:2310,harmonics:[0,.9,.65,.53,.27,.3,.15,.1,.11,.055]},v8:{cylinders:8,rasp:.64,depth:.84,lowpass:1720,harmonics:[0,.88,.8,.33,.24,.23,.19,.1,.065,.056]},rotary:{cylinders:4,rasp:.49,depth:.25,lowpass:2610,harmonics:[0,.9,.38,.53,.44,.16,.12,.18,.086]}},En=(i,e=0,t=1)=>Math.min(t,Math.max(e,i)),fs=i=>pi.find(e=>e.id===i),jn=(i,e=0)=>Number.isFinite(i)?i:e;function N1(i){if(Object.hasOwn(di,i?.engineType))return di[i.engineType];let e=[i?.engine,i?.engineLayout,i?.name,i?.model,i?.description,i?.id].join(" ").toLowerCase();return/rotary|ロータリー|13b|12a/.test(e)?di.rotary:/boxer.?4|flat.?4|水平対向.?4|ej20/.test(e)?di.boxer4:/boxer.?6|flat.?6|水平対向|911|964/.test(e)?di.flat6:/v.?8|ビュイック|マスタング|シボレー|charger|mustang|corvette/.test(e)?di.v8:/inline.?6|straight.?6|直.?6|2jz|rb26|s30|supra/.test(e)?di.inline6:di.inline4}function Of(i){let e=typeof i=="string"?i:i?.id,n={haruna:["redline-signal","turbo-shrine"],kirisawa:["rain-on-glass","neon-summit"],shiramine:["frost-apex","last-shift-dawn"]}[e]||pi.map(r=>r.id);return fs(n[Math.floor(Math.random()*n.length)])}function F1(i,e){let t=i.createBuffer(2,Math.ceil(i.sampleRate*e),i.sampleRate),n=23868917;for(let r=0;r<t.numberOfChannels;r+=1){let s=t.getChannelData(r);for(let a=0;a<s.length;a+=1)n^=n<<13,n^=n>>>17,n^=n<<5,s[a]=(n>>>0)/2147483648-1}return t}var jl=class{constructor({musicVolume:e=.65,sfxVolume:t=.85,music:n,sfx:r,track:s="auto"}={}){this.musicVolume=En(jn(n,e)),this.sfxVolume=En(jn(r,t)),this.trackChoice=fs(s)?s:"auto",this.context=null,this.media=typeof Audio=="function"?new Audio:null,this.media&&(this.media.preload="none",this.media.loop=!0,this.media.volume=this.musicVolume),this.status="idle",this.track=null,this.lastCourse=null,this.lastCountdown=null,this.lastGear=0,this.lastImpact=-1/0,this.lastTelemetryTime=-1/0,this.profile=di.inline4,this.delayFinish=null}async unlock(){let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return!1;try{return this.context||(this.context=new e,this.buildGraph()),this.context.state!=="running"&&await this.context.resume(),this.context.state==="running"}catch{return!1}}setVolumes({music:e=this.musicVolume,sfx:t=this.sfxVolume}={}){this.musicVolume=En(jn(e,this.musicVolume)),this.sfxVolume=En(jn(t,this.sfxVolume)),this.applyMusicVolume(),this.master&&this.smooth(this.master.gain,this.sfxVolume,.035)}applyMusicVolume(){if(!this.media)return;let e=this.musicVolume*(this.status==="finished"?.37:1);this.musicOutput?this.smooth(this.musicOutput.gain,e,.045):this.media.volume=e}setTrack(e){if(this.trackChoice=fs(e)?e:"auto",this.status!=="race"&&this.status!=="paused")return;let t=fs(this.trackChoice)||Of(this.lastCourse);this.playTrack(t,!0,this.status==="race")}currentTrack(){return this.track}playTrack(e,t=!1,n=!0){if(!this.media||!e)return;let r=new URL(e.file,U1).href;this.media.src!==r?this.media.src=r:t&&this.media.readyState>0&&(this.media.currentTime=0),this.applyMusicVolume(),this.track=e,n&&this.media.play().catch(()=>{})}sample(e){let t=fs(e);return t?this.status==="sample"&&this.track?.id===e&&!this.media?.paused?(this.stop(),!1):this.status==="race"||this.status==="paused"?!1:(clearTimeout(this.delayFinish),this.status="sample",this.unlock(),this.playTrack(t,!0),!!this.media):!1}start({track:e,car:t}={}){clearTimeout(this.delayFinish),this.status="race",this.lastCourse=e,this.lastCountdown=null,this.lastGear=0,this.lastImpact=-1/0,this.lastTelemetryTime=-1/0,this.profile=N1(t),this.unlock().then(n=>{n&&this.status==="race"&&this.setEngineVoice()}),this.playTrack(fs(this.trackChoice)||Of(e),!0)}pause(){this.status==="race"&&(this.status="paused",this.media?.pause(),this.quiet())}resume(){this.status==="paused"&&(this.status="race",this.unlock(),this.track&&this.playTrack(this.track))}finish(){this.status!=="race"&&this.status!=="paused"||(this.status="finished",this.quiet(),this.applyMusicVolume(),this.context?.state==="running"&&[587.33,739.99,880,1174.66].forEach((e,t)=>{this.tone(e,t===3?.39:.18,.137,t*.092,"triangle"),this.tone(e*2,.16,.022,t*.092+.009,"sine")}),clearTimeout(this.delayFinish),this.delayFinish=setTimeout(()=>{this.status==="finished"&&this.media?.pause()},9500))}stop(){clearTimeout(this.delayFinish),this.status="idle",this.media?.pause(),this.quiet(),this.track=null}buildGraph(){let e=this.context,t=e.createDynamicsCompressor();if(t.threshold.value=-9,t.knee.value=8,t.ratio.value=6,t.attack.value=.005,t.release.value=.12,t.connect(e.destination),this.master=e.createGain(),this.master.gain.value=this.sfxVolume,this.master.connect(t),this.gates=[],this.noise=F1(e,1.71),this.body=this.oscBranch("triangle","lowpass",800,1.08),this.exhaust=this.oscBranch("triangle","lowpass",420,.9),this.engineTexture=this.noiseBranch("bandpass",730,.73),this.intake=this.oscBranch("sine","bandpass",1860,.87),this.wind=this.noiseBranch("lowpass",900,.67),this.rolling=this.noiseBranch("bandpass",170,1.12),this.tread=this.noiseBranch("bandpass",890,2.2),this.squeal=this.oscBranch("triangle","bandpass",1460,1.32),this.rain=this.noiseBranch("highpass",6200,.75),this.setEngineVoice(),this.media)try{let n=e.createMediaElementSource(this.media);this.musicOutput=e.createGain(),this.musicOutput.gain.value=this.musicVolume,n.connect(this.musicOutput),this.musicOutput.connect(t),this.media.volume=1}catch{this.musicOutput=null}}oscillator(e){let t=this.context.createOscillator();return t.type=e,t.frequency.value=100,t}branch(e,t,n){let r=this.context.createBiquadFilter();r.type=e,r.frequency.value=t,r.Q.value=n;let s=this.context.createGain();return s.gain.value=0,r.connect(s),s.connect(this.master),this.gates.push(s.gain),{filter:r,gain:s.gain}}oscBranch(e,t,n,r){let s=this.branch(t,n,r);return s.source=this.oscillator(e),s.source.connect(s.filter),s.source.start(),s}noiseBranch(e,t,n){let r=this.branch(e,t,n);return r.source=this.context.createBufferSource(),r.source.buffer=this.noise,r.source.loop=!0,r.source.connect(r.filter),r.source.start(0,this.gates.length*.113),r}setEngineVoice(){if(!this.body)return;let e=this.profile.harmonics,t=Float32Array.from(e,(r,s)=>r*(s%2===0?.9:1)),n=Float32Array.from(e,(r,s)=>s<2?0:r*Math.sin(s*.68)*.56);this.body.source.setPeriodicWave(this.context.createPeriodicWave(n,t))}smooth(e,t,n=.038){e.setTargetAtTime(t,this.context.currentTime,n)}quiet(){!this.context||!this.gates||this.gates.forEach(e=>this.smooth(e,0,.045))}tone(e,t,n,r=0,s="sine",a=e){if(!this.master)return;let o=this.oscillator(s),l=this.context.createGain(),c=this.context.currentTime+r;o.frequency.setValueAtTime(e,c),o.frequency.exponentialRampToValueAtTime(Math.max(20,a),c+t),l.gain.setValueAtTime(1e-4,c),l.gain.exponentialRampToValueAtTime(Math.max(n,1e-4),c+.009),l.gain.exponentialRampToValueAtTime(1e-4,c+t),o.connect(l),l.connect(this.master),o.start(c),o.stop(c+t+.015)}noiseShot(e,t,n,r,s,a=0){if(!this.master)return;let o=this.context.createBufferSource();o.buffer=this.noise;let l=this.context.createBiquadFilter();l.type=e,l.frequency.value=t,l.Q.value=n;let c=this.context.createGain(),h=this.context.currentTime+a;c.gain.setValueAtTime(1e-4,h),c.gain.exponentialRampToValueAtTime(Math.max(r,1e-4),h+.008),c.gain.exponentialRampToValueAtTime(1e-4,h+s),o.connect(l),l.connect(c),c.connect(this.master),o.start(h,Math.random()*.87,s+.012)}update(e={}){if(this.status!=="race"||this.context?.state!=="running"||!this.body)return;let{speed:t=0,rpm:n=900,gear:r=0,throttle:s=0,slip:a=0,collision:o=0,wet:l=0,countdown:c=null,car:h}=e,d=En(jn(t)/205,0,1.4),u=En(jn(n,900),680,11500),p=En((u-720)/7900),m=En(jn(s)),y=En(Math.abs(jn(a))),f=En(jn(l,Number(l)||0)),g=this.context.currentTime,v=p>=.97&&m>=.92?.85+.15*Math.sin(g*108):1,_=r!==this.lastGear&&r>0&&this.lastGear>0,x=this.profile,S=u*x.cylinders/120,M=h?.turbo??/turbo|ターボ/i.test([h?.engine,h?.description].join(" "));if((g-this.lastTelemetryTime>=.025||_)&&(this.lastTelemetryTime=g,this.smooth(this.body.source.frequency,S,_?.022:.067),this.smooth(this.body.filter.frequency,360+p*x.lowpass+m*860,.082),this.smooth(this.body.gain,(.048+m*.118+p*.045)*v),this.smooth(this.exhaust.source.frequency,S*.498+Math.sin(g*11.5)*1.32,.055),this.smooth(this.exhaust.filter.frequency,146+p*570+m*156,.08),this.smooth(this.exhaust.gain,(.032+m*.093+d*.018)*x.depth),this.smooth(this.engineTexture.filter.frequency,420+p*1650+m*540),this.smooth(this.engineTexture.gain,(.016+m*.124+p*.062)*x.rasp),this.smooth(this.intake.source.frequency,560+p*1660),this.smooth(this.intake.filter.frequency,690+p*1710),this.smooth(this.intake.gain,M?m*p*p*.052:0),this.smooth(this.wind.filter.frequency,530+d*2600),this.smooth(this.wind.gain,d*d*.071),this.smooth(this.rolling.filter.frequency,94+d*210),this.smooth(this.rolling.gain,d*.088+d*f*.026),this.smooth(this.tread.filter.frequency,670+d*1230+y*520),this.smooth(this.tread.gain,d*y*(.122+f*.079)),this.smooth(this.squeal.source.frequency,690+d*533+y*185+Math.sin(g*69)*31,.035),this.smooth(this.squeal.filter.frequency,980+d*750),this.smooth(this.squeal.gain,d*y*y*.099*(1-f*.57)),this.smooth(this.rain.gain,f*(.039+d*.088))),_&&d>.075&&(this.noiseShot("bandpass",r>this.lastGear?1970:710,1.3,.19,.124),M&&r>this.lastGear&&u>3300?(this.noiseShot("highpass",2800,.88,.089+m*.065,.24,.031),this.tone(2010,.137,.051,.015,"sine",1180)):u>4400&&this.tone(141+p*52,.131,.078,.026,"triangle",79)),this.lastGear=r,o>.12&&g-this.lastImpact>.26){this.lastImpact=g;let w=En(jn(o));this.noiseShot("lowpass",480+1050*w,1.01,.23+w*.32,.19+w*.1),this.noiseShot("bandpass",2030,1.6,w*.28,.28,.022),this.tone(107,.2,.17+.12*w,0,"triangle",37)}typeof c=="number"&&c>=0&&c<=3&&c!==this.lastCountdown&&(c===0?(this.tone(880,.28,.18,0,"triangle"),this.tone(1318.51,.33,.075,.04,"sine")):this.tone(523.25,.12,.157,0,"triangle")),this.lastCountdown=c}};var ql="omojiz.economy.v1";var O1=new Intl.NumberFormat("ja-JP"),Bf=new Intl.NumberFormat("ja-JP",{maximumFractionDigits:2}),Gf=/^[a-z][a-z0-9-]{0,31}$/,Hf=/^[a-zA-Z0-9:_-]{1,96}$/,Ta=[{name:"\u30B9\u30C8\u30EA\u30FC\u30C8",required:0,price:0},{name:"\u30AF\u30E9\u30D6\u30B9\u30DD\u30FC\u30C4",required:16,price:3500},{name:"\u5CE0\u30B9\u30DA\u30C3\u30AF",required:36,price:12500},{name:"\u30D5\u30EB\u30C1\u30E5\u30FC\u30F3",required:57,price:38500}],Aa=[{id:"engine",name:"\u30A8\u30F3\u30B8\u30F3",effect:"\u51FA\u529B\u30FB\u52A0\u901F\u30FB\u6700\u9AD8\u901F",price:600},{id:"transmission",name:"\u30C8\u30E9\u30F3\u30B9\u30DF\u30C3\u30B7\u30E7\u30F3",effect:"\u52A0\u901F\u30FB\u4F38\u3073",price:470},{id:"tires",name:"\u30BF\u30A4\u30E4",effect:"\u65CB\u56DE\u30FB\u6ED1\u308A\u59CB\u3081\u306E\u30B0\u30EA\u30C3\u30D7",price:400},{id:"suspension",name:"\u30B5\u30B9\u30DA\u30F3\u30B7\u30E7\u30F3",effect:"\u30B9\u30C6\u30A2\u30EA\u30F3\u30B0\u306E\u5FDC\u7B54",price:430},{id:"brakes",name:"\u30D6\u30EC\u30FC\u30AD",effect:"\u30D6\u30EC\u30FC\u30AD\u30F3\u30B0\u306E\u5236\u52D5\u529B",price:410}],kf={duel:690,time:630,drift:630,practice:460,online:840,ranked:970},zf={gold:210,silver:115,bronze:45},Vf=(i,e,t)=>Math.min(t,Math.max(e,i)),Xl=(i,e)=>Number.isFinite(i)?Vf(Math.floor(i),0,e):0,bu=i=>(i+1)*5,yu=i=>1.65**i,Wf=(i,e)=>Math.round(i.price*1.35**(e%5)*1.82**Math.floor(e/5)/10)*10,B1=()=>({stage:0,levels:Object.fromEntries(Aa.map(i=>[i.id,0]))}),gt={balance:0,cars:Object.create(null),receipts:[]},_u=!1;function Su(){if(_u)return gt;try{let i=globalThis.localStorage?.getItem(ql);if(!i)return gt;let e=JSON.parse(i);if(!e||typeof e!="object")return gt;let t=Object.create(null);for(let[r,s]of Object.entries(e.cars??{})){if(!Gf.test(r)||!s||typeof s!="object")continue;let a=Xl(s.stage,Ta.length-1);t[r]={stage:a,levels:Object.fromEntries(Aa.map(o=>[o.id,Xl(s.levels?.[o.id],bu(a))]))}}let n=Array.isArray(e.receipts)?e.receipts.filter(r=>typeof r=="string"&&Hf.test(r)).slice(-320):[];gt={balance:Xl(e.balance,999999999),cars:t,receipts:n}}catch{}return gt}function xu(){if(!_u)try{globalThis.localStorage&&globalThis.localStorage.setItem(ql,JSON.stringify(gt))}catch{_u=!0}}function jf(i){let e=()=>(Su(),i());try{if(globalThis.navigator?.locks?.request){let t=!1;return navigator.locks.request(ql,()=>(t=!0,e())).catch(n=>{if(t)throw n;return e()})}}catch{}return Promise.resolve(e())}function wu(i){return gt.cars[i]??B1()}function Mu(){return Object.values(gt.cars).reduce((i,e)=>Math.max(i,e.stage),0)}function Ea(i){return`${O1.format(i)} Z`}function Yl(i){Su();let{engine:e,transmission:t,tires:n,suspension:r,brakes:s}=wu(i.id).levels;return e||t||n||r||s?{...i,topSpeed:Math.min(350,Math.round(i.topSpeed*(1+.006*e+.009*t))),power:Math.round(i.power*(1+.032*e)),accel:i.accel*(1+.017*e+.011*t),grip:i.grip*(1+.017*n+.007*r),handling:i.handling*(1+.022*r),brakeForce:1+.031*s}:i}function Xf({id:i,mode:e,time:t,won:n,medal:r,score:s,position:a,total:o,trackLength:l}){return typeof i!="string"||!Hf.test(i)||!Object.hasOwn(kf,e)||!Number.isFinite(t)||t<=0?Promise.resolve(0):jf(()=>{if(gt.receipts.includes(i))return 0;let c=Number.isFinite(l)?Vf(l/3200,1,1.35):1,h=Number.isInteger(o)&&o>1&&Number.isInteger(a)&&a>0&&a<=o?Math.round(300*(o-a)/(o-1)):0,d=n===!0&&e==="duel"?150:0,u=e==="drift"?Xl(s/23,250):0,p=Object.hasOwn(zf,r)?zf[r]:0,m=Math.round((kf[e]*c+h+d+u+p)*yu(Mu())),y=Math.min(m,999999999-gt.balance);return gt.balance+=y,gt.receipts.push(i),gt.receipts=gt.receipts.slice(-320),xu(),y})}function k1(i,e,t){return jf(()=>{if(typeof i!="string"||!Gf.test(i))return"";let n=wu(i);if(e==="stage"){let o=Ta[n.stage+1],l=Object.values(n.levels).reduce((c,h)=>c+h,0);return!o||n.stage!==t||l<o.required||gt.balance<o.price?"":(gt.balance-=o.price,n.stage+=1,gt.cars[i]=n,xu(),`${o.name}\u3092\u89E3\u653E\u3057\u307E\u3057\u305F\u3002`)}let r=Aa.find(o=>o.id===e);if(!r)return"";let s=n.levels[r.id],a=Wf(r,s);return s!==t||s>=bu(n.stage)||gt.balance<a?"":(gt.balance-=a,n.levels[r.id]+=1,gt.cars[i]=n,xu(),`${r.name}\u3092\u30EC\u30D9\u30EB${s+1}\u306B\u5F37\u5316\u3057\u307E\u3057\u305F\u3002`)})}function qf(i,{onChange:e=()=>{}}={}){if(!i)return{render(){},refresh(){}};i.innerHTML=`
    <section class="tuning-panel" aria-labelledby="tuning-heading">
      <div class="tuning-head">
        <div><h3 id="tuning-heading">\u30C1\u30E5\u30FC\u30CB\u30F3\u30B0</h3><p data-tuning-car></p></div>
        <div class="tuning-balance"><span>\u6240\u6301\u91D1</span><strong data-tuning-balance></strong></div>
      </div>
      <div class="tuning-stage">
        <div><p>\u8ECA\u4E21\u30B9\u30C6\u30FC\u30B8 <strong data-tuning-stage></strong></p><p data-tuning-stage-info></p></div>
        <button type="button" data-upgrade="stage"></button>
      </div>
      <ul class="tuning-parts">${Aa.map(l=>`
        <li>
          <div><strong>${l.name}</strong><p>${l.effect}</p></div>
          <div class="tuning-meter"><span data-level="${l.id}"></span>
            <progress value="0" max="5" aria-label="${l.name}\u306E\u5F37\u5316\u30EC\u30D9\u30EB"></progress></div>
          <button type="button" data-upgrade="${l.id}"></button>
        </li>`).join("")}
      </ul>
      <p class="tuning-note">\u5168\u30E2\u30FC\u30C9\u306E\u5B8C\u8D70\u3067Z\u3092\u7372\u5F97\u3067\u304D\u307E\u3059\u3002\u8ECA\u4E21\u30B9\u30C6\u30FC\u30B8\u306E\u6700\u9AD8\u5230\u9054\u6BB5\u968E\u306B\u5FDC\u3058\u3066\u5168\u30EC\u30FC\u30B9\u306E\u5831\u916C\u304C\u5897\u3048\u307E\u3059\u3002</p>
      <p data-tuning-status class="tuning-status" role="status"></p>
    </section>`;let t=l=>i.querySelector(`[data-tuning-${l}]`),n=i.querySelector('[data-upgrade="stage"]'),r=Aa.map(l=>{let c=i.querySelector(`[data-upgrade="${l.id}"]`),h=c.closest("li");return{part:l,button:c,label:h.querySelector("[data-level]"),bar:h.querySelector("progress")}}),s,a=!1;function o(){if(!s)return;Su();let l=wu(s.id),c=bu(l.stage),h=Ta[l.stage+1],d=Object.values(l.levels).reduce((u,p)=>u+p,0);t("car").textContent=s.name,t("balance").textContent=Ea(gt.balance),t("stage").textContent=`${l.stage+1} / ${Ta.length} \xB7 ${Ta[l.stage].name}`,t("stage-info").textContent=h?`\u5831\u916C \xD7${Bf.format(yu(Mu()))} \xB7 \u6B21\u306E\u89E3\u653E\u306B\u5FC5\u8981\u306A\u5F37\u5316\u5408\u8A08 ${d}/${h.required}`:`\u5831\u916C \xD7${Bf.format(yu(Mu()))} \xB7 \u5168\u30B9\u30C6\u30FC\u30B8\u89E3\u653E\u6E08\u307F`,n.dataset.expected=l.stage,n.textContent=h?`${h.name}\u3092\u89E3\u653E ${Ea(h.price)}`:"\u89E3\u653E\u6E08\u307F",n.disabled=a||!h||d<h.required||gt.balance<h.price;for(let{part:u,button:p,label:m,bar:y}of r){let f=l.levels[u.id],g=Wf(u,f);m.textContent=`Lv. ${f} / ${c}`,y.max=c,y.value=f,p.dataset.expected=f,p.textContent=f<c?`\u5F37\u5316 ${Ea(g)}`:f===20?"\u6700\u5927\u5F37\u5316":"\u73FE\u30B9\u30C6\u30FC\u30B8\u4E0A\u9650",p.setAttribute("aria-label",`${u.name} ${p.textContent}`),p.disabled=a||f>=c||gt.balance<g}}return i.addEventListener("click",async l=>{let c=l.target.closest("button[data-upgrade]");if(!s||!c||c.disabled||a)return;let h=document.activeElement===c,d=s.id,{upgrade:u,expected:p}=c.dataset;a=!0,o();let m="";try{m=await k1(d,u,Number(p)),m&&e()}catch{m||(m="\u5F37\u5316\u51E6\u7406\u3092\u5B8C\u4E86\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002")}finally{a=!1,o(),s.id===d&&(t("status").textContent=m||"\u73FE\u5728\u306E\u6B8B\u9AD8\u3068\u5F37\u5316\u72B6\u6CC1\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002"),h&&!c.disabled&&document.activeElement===document.body&&c.focus()}}),globalThis.addEventListener?.("storage",l=>{l.key===ql&&(e(),o())}),{render(l){l&&(s?.id!==l.id&&(t("status").textContent=""),s=l,o())},refresh:o}}function Yf(){return null}var se=i=>document.getElementById(i),Zl={duel:{label:"\u5CE0\u30D0\u30C8\u30EB",mark:"VS",description:"CPU\u30E9\u30A4\u30D0\u30EB\u3068\u306E1\u5BFE1"},time:{label:"\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF",mark:"\u25F7",description:"\u6700\u901F\u30BF\u30A4\u30E0\u306B\u6311\u6226"},drift:{label:"\u30C9\u30EA\u30D5\u30C8",mark:"\u219D",description:"\u30C9\u30EA\u30D5\u30C8\u306E\u5F97\u70B9\u3092\u7AF6\u3046"},practice:{label:"\u7DF4\u7FD2\u8D70\u884C",mark:"\u25CE",description:"\u597D\u304D\u306A\u8ECA\u3067\u30B3\u30FC\u30B9\u3092\u8A66\u8D70"}},tm={easy:"\u521D\u7D1A",normal:"\u4E2D\u7D1A",hard:"\u4E0A\u7D1A"},z1={track:ui[0].id,car:Hn[0].id,mode:"duel",difficulty:"normal",quality:"auto",assist:!1,song:"auto",music:65,sfx:85,paints:{}},Zf="omoji-z.settings.v1",Ia=new Intl.NumberFormat("ja-JP"),Kf=i=>Math.round(i*100),Da={read(){try{return JSON.parse(localStorage.getItem(Zf))||{}}catch{return{}}},write(){try{localStorage.setItem(Zf,JSON.stringify(Ae))}catch{}}},mr=Da.read(),Ae={...z1},G1={track:ui.map(i=>i.id),car:Hn.map(i=>i.id),mode:Object.keys(Zl),difficulty:Object.keys(tm),quality:["auto","low","medium","high"],song:["auto",...pi.map(i=>i.id)]};for(let[i,e]of Object.entries(G1))e.includes(mr[i])&&(Ae[i]=mr[i]);for(let i of["music","sfx"])Number.isFinite(mr[i])&&(Ae[i]=Math.round(Math.min(100,Math.max(0,mr[i]))));Ae.assist=mr.assist===!0;Ae.paints=Object.fromEntries(Hn.filter(i=>/^#[0-9a-f]{6}$/i.test(mr.paints?.[i.id]??"")).map(i=>[i.id,mr.paints[i.id]]));var $l=i=>ui.find(e=>e.id===i),gi=i=>Hn.find(e=>e.id===i),fi=i=>Ae.paints[i.id]||i.paint,gn=new jl({music:Ae.music/100,sfx:Ae.sfx/100,track:Ae.song}),Zt=se("race"),nm=se("map"),Jf=nm.getContext("2d"),Ca=Object.fromEntries(["race-track-name","race-time","race-best","race-speed","race-gear","race-position","race-context","race-rpm","race-progress","countdown"].map(i=>[i,se(i)])),Jt,gs=null,im=null,Eu=!1,Au,Oi,Je=null,rm=qf(se("garage-tuning"),{onChange:()=>ec(!1)});Rf(se("gamepad-settings"));var mi=Yf({selected(){let i=gi(Ae.car);return{car:i.id,carName:i.name,track:Ae.track,color:fi(i)}},trackName:i=>$l(i)?.name??i,onInteract:()=>gn.unlock(),onRace:Z1,onSync:K1,telemetry:()=>Jt?.getMultiplayerState(),onFinish:J1,onLeave:tc});function Kl(i){if(!Number.isFinite(i))return"\u2014";let e=Math.max(0,Math.round(i*1e3)),t=n=>String(n).padStart(2,"0");return t(Math.floor(e/6e4))+":"+t(Math.floor(e/1e3)%60)+"."+String(e%1e3).padStart(3,"0")}function Ra(i,e,t){i.querySelectorAll("["+e+"]").forEach(n=>{n.setAttribute("aria-pressed",String(n.getAttribute(e)===t))})}function $f({kind:i,items:e,groupOf:t,searchFields:n,unit:r,selected:s}){let a=se(i+"-list"),o=se(i+"-search"),l=se(i+"-filter"),c=se(i+"-current"),h=se(i+"-matches"),d=_=>String(_??"").normalize("NFKC").toLowerCase(),u=new Map(Array.from(a.querySelectorAll("[data-"+i+"]"),_=>[_.dataset[i],_])),p=e.map(_=>({item:_,card:u.get(_.id),group:t(_),searchText:n(_).map(d).join(" ")})),m=Array.from(new Set(p.map(_=>_.group).filter(Boolean))).sort((_,x)=>_.localeCompare(x,"ja"));for(let _ of m)l.add(new Option(_,_));let y=document.createElement("p");y.className="catalog-empty",y.textContent="\u8A72\u5F53\u3059\u308B\u9805\u76EE\u304C\u3042\u308A\u307E\u305B\u3093\u3002",y.hidden=!0,a.append(y);function f(){let _=d(o.value).trim().split(/\s+/).filter(Boolean),x=0;for(let{group:S,searchText:M,card:w}of p)w.hidden=!!(l.value&&l.value!==S)||!_.every(A=>M.includes(A)),w.hidden||x++;h.textContent=(x===e.length?x:x+" / "+e.length)+r,y.hidden=x>0,a.scrollTop=0}function g(){let x="\u9078\u629E\u4E2D \xB7 "+p.find(({item:S})=>S.id===s()).item.name;c.textContent!==x&&(c.textContent=x)}o.addEventListener("input",f),l.addEventListener("change",f),c.addEventListener("click",()=>{let _=u.get(s());_.hidden&&(o.value="",l.value="",f()),_.focus({preventScroll:!0}),_.scrollIntoView({block:"nearest",inline:"nearest"})}),f(),g();let v=u.get(s());return a.scrollTop=Math.max(0,v.getBoundingClientRect().top-a.getBoundingClientRect().top-5),g}var sm=[];function H1(){se("track-count").textContent=String(ui.length).padStart(2,"0"),se("car-count").textContent=String(Hn.length).padStart(2,"0"),se("music-count").textContent=String(pi.length).padStart(2,"0"),se("track-list").innerHTML=ui.map(e=>`
    <button type="button" class="track-card" data-track="${e.id}" aria-pressed="false"
      style="--track-image:url('./assets/${e.id}.webp')" title="${e.description}">
      <span class="track-badge">${e.weather}</span><span>
      <strong class="track-name">${e.name}</strong><span class="track-detail">${e.lengthKm} KM \xB7 ${e.surface}</span></span>
    </button>`).join(""),se("mode-list").innerHTML=Object.entries(Zl).map(([e,t])=>`
    <button type="button" class="mode-card" data-mode="${e}" aria-pressed="false" title="${t.description}">
    <span class="mode-icon" aria-hidden="true">${t.mark}</span>${t.label}</button>`).join(""),se("car-list").innerHTML=Hn.map(e=>`
    <button type="button" class="car-choice" data-car="${e.id}" aria-pressed="false" style="--paint:${fi(e)}">
      <i aria-hidden="true"></i><span><strong>${e.name}</strong><small>${e.year} \xB7 ${e.drive} \xB7 ${e.code}</small></span>
    </button>`).join("");let i=e=>e.terrainGroup||e.surface;sm=[$f({kind:"track",items:ui,groupOf:i,searchFields:e=>[e.name,e.id,e.subtitle,e.weather,e.surface,e.tier,i(e)],unit:"\u30B3\u30FC\u30B9",selected:()=>Ae.track}),$f({kind:"car",items:Hn,groupOf:e=>e.country,searchFields:e=>[e.name,e.code,e.id,e.country,e.year,e.drive],unit:"\u53F0",selected:()=>Ae.car})],se("song-list").innerHTML=pi.map(e=>`
    <div class="song"><button type="button" class="song-preview" data-preview="${e.id}" aria-label="${e.title} \u3092\u8A66\u8074" aria-pressed="false">\u25B6</button>
    <button type="button" class="song-select" data-song="${e.id}" aria-pressed="false">${e.title}</button>
    <span class="song-bpm">${e.bpm} BPM</span></div>`).join("");for(let e of pi)se("song-picker").add(new Option(e.title,e.id));Ql(),am()}function Ql(){Ra(se("track-list"),"data-track",Ae.track),Ra(se("mode-list"),"data-mode",Ae.mode),Ra(se("car-list"),"data-car",Ae.car),sm.forEach(i=>i()),Ra(se("song-list"),"data-song",Ae.song),Ra(se("song-list"),"data-preview",gs);for(let i of se("song-list").querySelectorAll("[data-preview]"))i.textContent=i.dataset.preview===gs?"\u25A0":"\u25B6";se("difficulty-field").hidden=Ae.mode!=="duel",se("difficulty").value=Ae.difficulty,se("quality").value=Ae.quality,se("song-picker").value=Ae.song,se("assist").checked=Ae.assist;for(let i of["music","sfx"])se("volume-"+i).value=Ae[i],se("volume-"+i+"-value").value=Ae[i]+"%"}function ec(i=!0){let e=gi(Ae.car),t=Yl(e),n=Math.round(t.grip*75),r=Math.round(t.drift*74);se("paint").value=fi(e),se("paint").style.setProperty("--selected-paint",fi(e));let s=[["\u6700\u9AD8\u901F\u5EA6",t.topSpeed,350,t.topSpeed+" km/h"],["\u6700\u5927\u51FA\u529B",t.power,Math.max(350,t.power),t.power+" ps"],["\u30B0\u30EA\u30C3\u30D7",n,Math.max(100,n),n],["\u30C9\u30EA\u30D5\u30C8",r,Math.max(100,r),r]];se("car-info").innerHTML=`
    <p class="kicker">${e.code}</p><h3>${e.name}</h3>
    <p class="car-meta">${e.country} \xB7 ${e.year} \xB7 ${e.drive} \xB7 ${e.gears} SPEED</p>
    <p class="car-desc">${e.description}</p><dl class="car-stats">${s.map(([a,o,l,c])=>`
        <div><dt>${a}</dt><dt><meter value="${o}" min="0" max="${l}" aria-label="${a}"></meter></dt><dd>${c}</dd></div>`).join("")}</dl>`,i&&om(e),rm.render(e)}function am(){let i=Object.entries(Vl()).sort(([,e],[,t])=>(t.updatedAt||0)-(e.updatedAt||0)).map(([e,t])=>{let[n,r,s,a]=e.split(":"),o=$l(r),l=gi(s);if(!o||!l||!Object.hasOwn(Zl,n))return"";let c=n==="duel"?" \xB7 "+(tm[a]??"\u4E2D\u7D1A")+" \xB7 "+(t.won?"\u52DD\u5229":"\u5B8C\u8D70"):"",h=n==="drift"?Ia.format(t.score)+" PTS":Kl(t.time);return`<div class="record"><div>${o.name} \xB7 ${Zl[n].label}
        <small>${l.name}${c}</small></div><b>${h}</b></div>`}).filter(Boolean).slice(0,10);se("record-list").innerHTML=i.length?i.join(""):"<p>\u5B8C\u8D70\u3059\u308B\u3068\u3053\u306E\u7AEF\u672B\u306B\u30D9\u30B9\u30C8\u8A18\u9332\u304C\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002</p>"}var Bi,ms,Vt,Pa=.53,Jl=!1,La,Tu=!1,Kt=se("car-canvas"),V1=new D(0,.52,0);function W1(){try{let i=Kt.getContext("webgl2",{alpha:!0,antialias:!0,powerPreference:"low-power"});if(!i){Vt=Kt.getContext("2d"),Vt?new ResizeObserver(gr).observe(Kt):se("garage-error").hidden=!1;return}let e=new hs({canvas:Kt,context:i,alpha:!0,antialias:!0,powerPreference:"low-power"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,1.55)),e.outputColorSpace=yt,e.toneMapping=ns,e.toneMappingExposure=1.34;let t=new si,n;try{n=lf(e),t.environment=n.texture}catch{}t.add(new er("#e8f1ff","#5c6268",2.25));let r=new oi("#fff1d8",3.2);r.position.set(3.7,6,4.5);let s=new oi("#91c4ff",2.5);s.position.set(-5,2.2,-4.5),t.add(r,s);let a=new Ie(new jr(3.15,48),new Ci({color:"#282e27",roughness:.93,metalness:.08}));a.rotation.x=-Math.PI/2,a.position.y=-.025,t.add(a);let o=new Ie(new Jr(2.99,3.012,48),new ct({color:"#afbb65",transparent:!0,opacity:.36}));o.rotation.x=-Math.PI/2,o.position.y=-.02,t.add(o);let l=document.createElement("canvas");l.width=l.height=64;let c=l.getContext("2d"),h=c.createRadialGradient(32,32,4,32,32,32);h.addColorStop(0,"rgba(0,0,0,.85)"),h.addColorStop(1,"rgba(0,0,0,0)"),c.fillStyle=h,c.fillRect(0,0,64,64);let d=new Ie(new Ut(3.4,6.5),new ct({map:new pn(l),transparent:!0,opacity:.7,depthWrite:!1}));d.rotation.x=-Math.PI/2,d.position.y=-.012,t.add(d),Bi={renderer:e,scene:t,environment:n,camera:new It(34,1,.1,65)},new ResizeObserver(gr).observe(Kt)}catch{se("garage-error").hidden=!1}}function om(i){if(!Bi){gr();return}ms&&(ms.removeFromParent(),ds(ms));let e=matchMedia("(pointer: coarse)").matches?"medium":"high";ms=Di(i,{color:fi(i),lights:!1,quality:e,showroom:!0}),Bi.scene.add(ms),gr()}function gr(){!Bi&&!Vt||!Jl||Zt.open||Tu||(Tu=!0,requestAnimationFrame(()=>{if(Tu=!1,!Jl||Zt.open)return;let i=Kt.clientWidth||1,e=Kt.clientHeight||1;if(Vt){let a=Math.min(window.devicePixelRatio||1,1.5);Kt.width=Math.round(i*a),Kt.height=Math.round(e*a),Vt.setTransform(a,0,0,a,0,0);let o=gi(Ae.car),l=Math.min(i*.29,e*.57),c=e*.67,h=Vt.createRadialGradient(i/2,c,5,i/2,c,l*1.56);h.addColorStop(0,"#0b100ccb"),h.addColorStop(1,"#0b100c00"),Vt.save(),Vt.translate(i/2,c),Vt.scale(1,.29),Vt.translate(-i/2,-c),Vt.fillStyle=h,Vt.fillRect(0,c-l*1.6,i,l*3.2),Vt.restore(),Ul(Vt,o,{x:i/2,y:c,width:l,angle:Pa,view:"garage",color:fi(o)});return}let{renderer:t,scene:n,camera:r}=Bi,s=i/e<1.5?7.7:7.05;r.position.set(Math.sin(Pa)*s,2.55,Math.cos(Pa)*s),r.aspect=i/e,r.lookAt(V1),r.updateProjectionMatrix(),t.setSize(i,e,!1),t.render(n,r)}))}new IntersectionObserver(([i],e)=>{Jl=i.isIntersecting,Jl&&(!Bi&&!Vt&&se("garage-error").hidden&&W1(),Bi&&!ms&&om(gi(Ae.car)),gr(),!Bi&&!Vt&&e.disconnect())},{rootMargin:"170px"}).observe(Kt);Kt.addEventListener("pointerdown",i=>{La={id:i.pointerId,x:i.clientX,angle:Pa},Kt.setPointerCapture(i.pointerId)});Kt.addEventListener("pointermove",i=>{La?.id===i.pointerId&&(Pa=La.angle+(i.clientX-La.x)*.012,gr())});for(let i of["pointerup","pointercancel","lostpointercapture"])Kt.addEventListener(i,()=>{La=null});function lm(i){i?Ae.paints[Ae.car]=i:delete Ae.paints[Ae.car],Da.write();let e=gi(Ae.car);se("car-list").querySelector('[data-car="'+e.id+'"]').style.setProperty("--paint",fi(e)),ec()}function j1(i){if(!i||!Jf)return;let e=Jf,{width:t,height:n}=nm,r=([s,a],o,l)=>{e.fillStyle=o,e.beginPath(),e.arc(8+s*(t-16),7+a*(n-14),l,0,Math.PI*2),e.fill()};e.clearRect(0,0,t,n),e.beginPath();for(let[s,[a,o]]of i.points.entries())e[s?"lineTo":"moveTo"](8+a*(t-16),7+o*(n-14));e.strokeStyle="#bfc3b2",e.lineWidth=3,e.lineJoin="round",e.lineCap="round",e.stroke(),i.rival&&r(i.rival,"#ff694e",4.4);for(let s of i.opponents??[])r(s,"#ff694e",3.9);r(i.player,"#e7f84e",5.1)}function Fi(i,e){let t=Ca[i],n=String(e);t.textContent!==n&&(t.textContent=n)}function X1(i){Fi("race-track-name",i.track.name),Fi("race-time",Kl(i.time));let e=i.mode==="drift"?Number.isFinite(i.driftBest)?"BEST "+Ia.format(i.driftBest)+" PTS":"":Number.isFinite(i.best)?"BEST "+Kl(i.best):"";Fi("race-best",e),Fi("race-speed",i.speed),Fi("race-gear",i.gear<0?"R":i.gear||"N"),Fi("race-position",Je?i.position+" / "+i.totalPlayers:i.mode==="duel"?i.position+" / 2":i.mode==="drift"?Ia.format(i.driftScore):Kf(i.progress)+"%");let t=[];i.mode==="duel"&&t.push(i.rivalGap>=0?"+"+Math.round(i.rivalGap)+" m":Math.round(i.rivalGap)+" m"),i.mode==="drift"&&t.push("PTS",...i.driftChain>0?["+"+Ia.format(i.driftChain)+" CHAIN"]:[]),i.assist&&t.push("\u30A2\u30B7\u30B9\u30C8"),Je?.failures>=2&&t.push("\u518D\u63A5\u7D9A\u4E2D"),Fi("race-context",t.join(" \xB7 ")),Ca["race-progress"].style.transform="scaleX("+i.progress+")",Ca["race-progress"].parentElement.setAttribute("aria-valuenow",Kf(i.progress)),Ca["race-rpm"].style.transform="scaleX("+Math.min(1,i.rpm/8e3)+")";let n=Ca.countdown;n.hidden=i.countdown==null,n.hidden||Fi("countdown",i.countdown===0?"GO":i.countdown),se("race-tip").hidden=i.status!=="countdown",j1(i.map)}function Ua(i){Zt.querySelectorAll(".race-top, .touch-controls").forEach(e=>{e.inert=i})}async function cm(i){let e=Oi?.id;Ua(!0),gn.finish(),se("result-kicker").textContent=i.newRecord?"NEW RECORD":"FINISH",se("result-title").textContent=i.error?"\u63A5\u7D9A\u3092\u7D42\u4E86":i.dnf?"\u672A\u5B8C\u8D70":i.won?"\u52DD\u5229":"\u5B8C\u8D70";let t=[["\u30BF\u30A4\u30E0",Kl(i.time)]];i.total&&i.position?t.push(["\u9806\u4F4D",i.position+" / "+i.total]):i.mode==="duel"&&t.push(["\u9806\u4F4D",i.position+" / 2"]),i.mode==="drift"&&t.push(["\u30C9\u30EA\u30D5\u30C8",Ia.format(i.driftScore)+" PTS"]),i.medal&&t.push(["\u8A55\u4FA1",String(i.medal).toUpperCase()]),Number.isFinite(i.rating)&&t.push(["\u30EC\u30FC\u30C8",i.rating+(i.ratingDelta?" ("+(i.ratingDelta>0?"+":"")+i.ratingDelta+")":"")]),i.bot&&t.push(["\u5BFE\u6226\u76F8\u624B","CPU"]),i.mode!=="practice"&&Oi?.assist&&t.push(["\u904B\u8EE2\u30A2\u30B7\u30B9\u30C8","ON"]);let n=se("result-details");n.replaceChildren(...t.map(([s,a])=>Qf(s,a)));let r=Qf("\u7372\u5F97Z","\u96C6\u8A08\u4E2D");if(Number.isFinite(i.time)&&n.append(r),se("result-note").textContent=i.error||"",se("result-note").hidden=!i.error,se("retry-race").textContent=Je?"\u30AA\u30F3\u30E9\u30A4\u30F3\u3078\u623B\u308B":"\u3082\u3046\u4E00\u5EA6\u8D70\u308B",se("result-layer").hidden=!1,se("retry-race").focus({preventScroll:!0}),am(),!!Number.isFinite(i.time))try{let s=await Xf({id:e,mode:i.mode,time:i.time,won:i.won,medal:i.medal,score:i.driftScore,position:i.position,total:i.total,trackLength:Oi?.track.length});Oi?.id===e&&(r.lastElementChild.textContent=s?"+"+Ea(s):"\u53D7\u53D6\u6E08\u307F"),rm.refresh()}catch{r.lastElementChild.textContent="\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F"}}function Qf(i,e){let t=document.createElement("div"),n=document.createElement("dt"),r=document.createElement("dd");return n.textContent=i,r.textContent=e,t.append(n,r),t}function q1(i){se("pause-layer").hidden=!i,Ua(i),i?(gn.pause(),nc(),se("resume-race").focus({preventScroll:!0})):(gn.resume(),se("pause").focus({preventScroll:!0}))}function hm(i){if(console.error(i),!Zt.open)return;Je&&mi.quit(),tc(!1);let e=/webgl|context/i.test(String(i?.message));se("error-text").textContent=e?"WebGL 2 \u3092\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u30D6\u30E9\u30A6\u30B6\u306E\u30CF\u30FC\u30C9\u30A6\u30A7\u30A2\u30A2\u30AF\u30BB\u30E9\u30EC\u30FC\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3057\u3066\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002":"3D\u30EC\u30FC\u30B9\u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3059\u308B\u304B\u3001\u8A2D\u5B9A\u3067\u63CF\u753B\u54C1\u8CEA\u3092\u300C\u4F4E\u300D\u306B\u3057\u3066\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",se("error").open||se("error").showModal()}function em(){return Jt??=new Wl({canvas:se("race-canvas"),onHud:X1,onFinish:i=>Je?dm():cm(i),onPause:q1,onAudio:i=>gn.update(i),onError:hm,onMultiplayerPause:Iu}),Jt}function Ru(){if(Eu||Je)return;let i=gi(Ae.car);um({id:Y1(),car:{...Yl(i),paint:fi(i)},track:$l(Ae.track),mode:Ae.mode,difficulty:Ae.difficulty,quality:Ae.quality,assist:Ae.assist})}function Y1(){return globalThis.crypto?.randomUUID?.()??"race-"+Date.now()+"-"+Math.random().toString(36).slice(2)}function um(i){Eu=!0,Oi=i,Zt.open||(Au=document.activeElement,document.body.classList.add("racing"),Zt.showModal()),se("pause-layer").hidden=!0,se("result-layer").hidden=!0,se("online-race-layer")&&(se("online-race-layer").hidden=!0),se("reset-car").hidden=!!Je,se("pause").setAttribute("aria-label",Je?"\u9000\u51FA\u30E1\u30CB\u30E5\u30FC":"\u4E00\u6642\u505C\u6B62"),se("pause").title=Je?"\u9000\u51FA\u30E1\u30CB\u30E5\u30FC":"\u4E00\u6642\u505C\u6B62 Esc",se("pause").textContent=Je?"EXIT":"\u2161",Ua(!1),nc(),gs=null,Ql(),gn.start(Oi);try{em().start(Oi)&&(Zt.dataset.renderer=em().rendererMode||"webgl",se("pause").focus({preventScroll:!0}))}catch(e){hm(e)}finally{Eu=!1}}function Z1(i){let e=i.players.find(a=>a.id===i.yourId),t=$l(i.track),n=gi(e?.car);if(!t||!n){mi.quit();return}let r=i.mode==="ranked"?"ranked":"online";Je={mode:r,failures:0,finished:!1,exitOpen:!1};let s=Date.now()+i.startAt-i.serverNow;um({id:i.raceId||"online-"+i.code+"-"+i.startAt,car:{...r==="ranked"?n:Yl(n),paint:e.color||n.paint},track:t,mode:r,difficulty:"normal",quality:Ae.quality,assist:r==="online"&&Ae.assist,multiplayer:{selfId:e.id,startAt:s,players:i.players}}),e.finishTime!=null&&Zt.open&&dm()}function K1(i,e){!Je||!Zt.open||(Je.failures=e,e===0&&Jt?.updateMultiplayer(i.players),(Je.finished||Je.exitOpen)&&Cu())}function dm(){Je&&(Je.finished=!0,Je.exitOpen=!1,mi.markFinish(),Ua(!0),gn.finish(),Cu(),se("online-race-quit").focus({preventScroll:!0}))}function Cu(){let{finished:i,exitOpen:e,mode:t,failures:n}=Je;se("online-race-layer").hidden=!(i||e),se("online-race-continue").hidden=i,se("online-race-kicker").textContent=t==="ranked"?"RANK MATCH":"ONLINE",se("online-race-title").textContent=i?"\u30EA\u30B6\u30EB\u30C8\u96C6\u8A08\u4E2D":"\u5BFE\u6226\u3092\u9000\u51FA\u3057\u307E\u3059\u304B\uFF1F",se("online-race-status").textContent=n>=2?"\u901A\u4FE1\u3092\u518D\u8A66\u884C\u3057\u3066\u3044\u307E\u3059\u3002":i?"\u307B\u304B\u306E\u53C2\u52A0\u8005\u306E\u30B4\u30FC\u30EB\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u3002":"\u9000\u51FA\u3059\u308B\u3068\u4ECA\u56DE\u306E\u30EC\u30FC\u30B9\u306F\u9014\u4E2D\u68C4\u6A29\u306B\u306A\u308A\u307E\u3059\u3002"}function Iu(){!Je||Je.finished||!se("result-layer").hidden||(Je.exitOpen=!Je.exitOpen,Jt?.clearInputs(),Jt?.setGamepadSuspended?.(Je.exitOpen),nc(),Ua(Je.exitOpen),Cu(),se(Je.exitOpen?"online-race-continue":"pause").focus({preventScroll:!0}))}function J1(i,e){if(!Je||!Zt.open)return;let t=i?.players.find(n=>n.id===i.yourId);Jt?.exit(),se("online-race-layer")&&(se("online-race-layer").hidden=!0),cm({mode:Je.mode,time:t?.finishTime,position:t?.place,total:i?.players.length,won:t?.place===1&&t.finishTime!=null,dnf:t?.finishTime==null,bot:i?.bot,rating:Je.mode==="ranked"?t?.rating:null,ratingDelta:i?.ratingDelta,error:e})}function tc(i=!0){Jt?.exit(),gn.stop(),Zt.open&&Zt.close(),document.body.classList.remove("racing"),Oi=null,Je=null,nc(),se("song-status").textContent="\u518D\u751F\u30DC\u30BF\u30F3\u3067\u8A66\u8074\u3001\u66F2\u540D\u3067\u30EC\u30FC\u30B9BGM\u3092\u6307\u5B9A\u3067\u304D\u307E\u3059\u3002",gr(),i&&Au instanceof HTMLElement&&Au.focus({preventScroll:!0})}function nc(){Zt.querySelectorAll("[data-action].active").forEach(i=>i.classList.remove("active"))}document.addEventListener("click",i=>{let e=i.target.closest("button");if(!e)return;let{open:t,track:n,mode:r,car:s,song:a,preview:o}=e.dataset;t&&se(t).showModal(),e.hasAttribute("data-close")&&e.closest("[data-overlay]").close(),e.hasAttribute("data-start")&&(im=e,Ru()),e.hasAttribute("data-exit")&&(Je?mi.quit():tc()),e.dataset.online&&mi.open(e.dataset.online),n&&(Ae.track=n),r&&(Ae.mode=r),s&&(Ae.car=s,ec()),a&&(Ae.song=a,gn.setTrack(a),se("song-status").textContent="\u30EC\u30FC\u30B9BGM\u306B\u300C"+pi.find(l=>l.id===a).title+"\u300D\u3092\u8A2D\u5B9A\u3057\u307E\u3057\u305F\u3002"),o&&(gs=gn.sample(o)?o:null,se("song-status").textContent=gs?"\u8A66\u8074\u4E2D \xB7 "+pi.find(l=>l.id===gs).title:"\u8A66\u8074\u3092\u505C\u6B62\u3057\u307E\u3057\u305F\u3002"),(n||r||s||a||o)&&(Ql(),Da.write())});for(let[i,e]of[["difficulty","difficulty"],["quality","quality"],["song-picker","song"],["assist","assist"]])se(i).addEventListener("change",t=>{Ae[e]=e==="assist"?t.target.checked:t.target.value,e==="song"&&gn.setTrack(Ae.song),Ql(),Da.write()});for(let i of["music","sfx"])se("volume-"+i).addEventListener("input",e=>{Ae[i]=Number(e.target.value),se("volume-"+i+"-value").value=Ae[i]+"%",gn.setVolumes({music:Ae.music/100,sfx:Ae.sfx/100}),Da.write()});se("paint").addEventListener("change",i=>{let e=i.target.value.trim();if(!/^#[0-9a-f]{6}$/i.test(e)){se("paint-status").textContent="# \u30686\u6841\u306E\u8272\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",i.target.value=fi(gi(Ae.car));return}se("paint-status").textContent="",lm(e.toLowerCase())});se("reset-paint").addEventListener("click",()=>{se("paint-status").textContent="",lm(null)});se("camera").addEventListener("click",()=>Jt?.cycleCamera());se("reset-car").addEventListener("click",()=>Jt?.resetCar());se("pause").addEventListener("click",()=>Je?Iu():Jt?.pause());se("resume-race").addEventListener("click",()=>Jt?.resume());se("restart-race").addEventListener("click",Ru);se("retry-race").addEventListener("click",()=>{if(!Je){Ru();return}let i=Je.mode==="ranked"?"rank":"room";mi.quit(),mi.open(i)});se("online-race-continue")?.addEventListener("click",Iu);se("online-race-quit")?.addEventListener("click",()=>mi.quit());window.addEventListener("keydown",i=>{i.code!=="Escape"||!Zt.open||se("result-layer").hidden||(i.preventDefault(),Je?mi.quit():tc())});se("error").addEventListener("close",()=>im?.focus({preventScroll:!0}));for(let i of Zt.querySelectorAll("[data-action]")){let e=i.dataset.action;i.addEventListener("pointerdown",n=>{n.preventDefault(),i.setPointerCapture(n.pointerId),i.classList.add("active"),Jt?.setInput(e,!0)});let t=()=>{i.classList.remove("active"),Jt?.setInput(e,!1)};for(let n of["pointerup","pointercancel","lostpointercapture"])i.addEventListener(n,t)}function pm(){let i=Array.from(document.querySelectorAll(".site-header nav a")),e=i.find(t=>t.hash===location.hash)||i[0];for(let t of i)t===e?t.setAttribute("aria-current","location"):t.removeAttribute("aria-current")}window.addEventListener("hashchange",pm);pm();H1();ec();
