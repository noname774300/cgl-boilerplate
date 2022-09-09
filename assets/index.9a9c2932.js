(function(){const k=document.createElement("link").relList;if(k&&k.supports&&k.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))f(u);new MutationObserver(u=>{for(const v of u)if(v.type==="childList")for(const ie of v.addedNodes)ie.tagName==="LINK"&&ie.rel==="modulepreload"&&f(ie)}).observe(document,{childList:!0,subtree:!0});function L(u){const v={};return u.integrity&&(v.integrity=u.integrity),u.referrerpolicy&&(v.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?v.credentials="include":u.crossorigin==="anonymous"?v.credentials="omit":v.credentials="same-origin",v}function f(u){if(u.ep)return;u.ep=!0;const v=L(u);fetch(u.href,v)}})();(function(){(function(n){function k(l,e=0,t=1){return Math.max(e,Math.min(l,t))}function L(l,e,t){const i=t-e,s=l-e;if(s>=0)return s%i+e;{let r=i+s%i+e;return r>=t&&(r-=i),r}}function f(l,e,t){return e<=l&&l<t}function u(l){return[...Array(l).keys()]}function v(l,e){return u(l).map(t=>e(t))}function ie(l,e){let t=[];for(let i=0,s=0;i<l.length;s++)e(l[i],s)?(t.push(l[i]),l.splice(i,1)):i++;return t}function Nl(l){return[...l].reduce((e,[t,i])=>(e[t]=i,e),{})}function _l(l){return Object.keys(l).map(e=>[e,l[e]])}function Tt(l,e){return String.fromCharCode(l.charCodeAt(0)+e)}function fe(l){return l.x!=null&&l.y!=null}class p{constructor(e,t){this.x=0,this.y=0,this.set(e,t)}set(e=0,t=0){return fe(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=t,this)}add(e,t){return fe(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=t,this)}sub(e,t){return fe(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=t,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,t,i,s){return this.x=k(this.x,e,t),this.y=k(this.y,i,s),this}wrap(e,t,i,s){return this.x=L(this.x,e,t),this.y=L(this.y,i,s),this}addWithAngle(e,t){return this.x+=Math.cos(e)*t,this.y+=Math.sin(e)*t,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const t=this.x;return this.x=t*Math.cos(e)-this.y*Math.sin(e),this.y=t*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,t){return fe(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(t-this.y,e-this.x)}distanceTo(e,t){let i,s;return fe(e)?(i=e.x-this.x,s=e.y-this.y):(i=e-this.x,s=t-this.y),Math.sqrt(i*i+s*s)}isInRect(e,t,i,s){return f(this.x,e,e+i)&&f(this.y,t,t+s)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const Hl=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],Ut="twrgybpclRGYBPCL";let he;const At=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function Jt(l){const[e,t,i]=sl(0,l);if(he=Nl(Hl.map((s,r)=>{if(r<1)return[s,{r:0,g:0,b:0,a:0}];if(r<9){const[c,g,y]=sl(r-1,l);return[s,{r:c,g,b:y,a:1}]}const[o,a,d]=sl(r-9+1,l);return[s,{r:Math.floor(l?o*.5:e-(e-o)*.5),g:Math.floor(l?a*.5:i-(i-a)*.5),b:Math.floor(l?d*.5:t-(t-d)*.5),a:1}]})),l){const s=he.blue;he.white={r:Math.floor(s.r*.15),g:Math.floor(s.g*.15),b:Math.floor(s.b*.15),a:1}}}function sl(l,e){e&&(l===0?l=7:l===7&&(l=0));const t=At[l];return[(t&16711680)>>16,(t&65280)>>8,t&255]}function ne(l,e=1){const t=he[l];return Math.floor(t.r*e)<<16|Math.floor(t.g*e)<<8|Math.floor(t.b*e)}function ge(l,e=1){const t=he[l],i=Math.floor(t.r*e),s=Math.floor(t.g*e),r=Math.floor(t.b*e);return t.a<1?`rgba(${i},${s},${r},${t.a})`:`rgb(${i},${s},${r})`}const Kt=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float width;
uniform float height;

float gridValue(vec2 uv, float res) {
  vec2 grid = fract(uv * res);
  return (step(res, grid.x) * step(res, grid.y));
}

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);  
  vec2 grid_uv = vTextureCoord.xy * vec2(width, height);
  float v = gridValue(grid_uv, 0.2);
  gl_FragColor.rgba = color * v;
}
`;function Nt(l,e){return new PIXI.Filter(void 0,Kt,{width:l,height:e})}const I=new p;let S,B,w,C=new p;const Wl=5;document.createElement("img");let b,pe,me=1,rl="black",P,ql,se=!1,m,Xl;function _t(l,e,t,i,s,r,o){I.set(l),m=o,rl=t;const a=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${e};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${e};
color: #888;
`,d=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,c=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=a,C.set(I),m.isUsingPixi){C.mul(Wl);const y=new PIXI.Application({width:C.x,height:C.y});if(S=y.view,w=new PIXI.Graphics,w.scale.x=w.scale.y=Wl,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,y.stage.addChild(w),w.filters=[],m.name==="crt"&&w.filters.push(Xl=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),m.name==="pixel"&&w.filters.push(Nt(C.x,C.y)),m.name==="pixel"||m.name==="shapeDark"){const M=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:m.name==="pixel"?1.5:1,brightness:m.name==="pixel"?1.5:1,blur:8});w.filters.push(M)}w.lineStyle(0),S.style.cssText=d}else S=document.createElement("canvas"),S.width=C.x,S.height=C.y,B=S.getContext("2d"),B.imageSmoothingEnabled=!1,S.style.cssText=d+c;document.body.appendChild(S);const g=()=>{const M=innerWidth/innerHeight,z=C.x/C.y,q=M<z,E=q?.95*innerWidth:.95*innerHeight*z,tl=q?.95*innerWidth/z:.95*innerHeight;S.style.width=`${E}px`,S.style.height=`${tl}px`};if(window.addEventListener("resize",g),g(),i){b=document.createElement("canvas");let y;s?(b.width=C.x,b.height=C.y,y=r):(C.x<=C.y*2?(b.width=C.y*2,b.height=C.y):(b.width=C.x,b.height=C.x/2),b.width>400&&(me=400/b.width,b.width=400,b.height*=me),y=Math.round(400/b.width)),pe=b.getContext("2d"),pe.fillStyle=e,gcc.setOptions({scale:y,capturingFps:60,isSmoothingEnabled:!1})}}function Fe(){if(m.isUsingPixi){w.clear(),w.beginFill(ne(rl,m.isDarkColor?.15:1)),w.drawRect(0,0,I.x,I.y),w.endFill(),w.beginFill(ne(P)),se=!0;return}B.fillStyle=ge(rl,m.isDarkColor?.15:1),B.fillRect(0,0,I.x,I.y),B.fillStyle=ge(P)}function T(l){if(l===P){m.isUsingPixi&&!se&&$e(ne(P));return}if(P=l,m.isUsingPixi){se&&w.endFill(),$e(ne(P));return}B.fillStyle=ge(l)}function $e(l){Le(),w.beginFill(l),se=!0}function Le(){se&&(w.endFill(),se=!1)}function Be(){ql=P}function Te(){T(ql)}function ye(l,e,t,i){if(m.isUsingPixi){m.name==="shape"||m.name==="shapeDark"?w.drawRoundedRect(l,e,t,i,2):w.drawRect(l,e,t,i);return}B.fillRect(l,e,t,i)}function Ht(l,e,t,i,s){const r=ne(P);$e(r),w.drawCircle(l,e,s*.5),w.drawCircle(t,i,s*.5),Le(),w.lineStyle(s,r),w.moveTo(l,e),w.lineTo(t,i),w.lineStyle(0)}function Wt(){Xl.time+=.2}function qt(){if(pe.fillRect(0,0,b.width,b.height),me===1)pe.drawImage(S,(b.width-S.width)/2,(b.height-S.height)/2);else{const l=S.width*me,e=S.height*me;pe.drawImage(S,(b.width-l)/2,(b.height-e)/2,l,e)}gcc.capture(b)}const Vl=[`
l
l
l

l
`,`
l l
l l



`,`
 l l
lllll
 l l
lllll
 l l
`,`
 lll
l l
 lll
  l l
 lll
`,`
l   l
l  l
  l
 l  l
l   l
`,`
 l
l l
 ll l
l  l
 ll l
`,`
l
l



`,`
 l
l
l
l
 l
`,`
l
 l
 l
 l
l
`,`
  l
l l l
 lll
l l l
  l
`,`
  l
  l
lllll
  l
  l
`,`



 l
l
`,`


lllll


`,`




l
`,`
    l
   l
  l
 l
l
`,`
 lll
l  ll
l l l
ll  l
 lll
`,`
 ll
l l
  l
  l
lllll
`,`
 lll
l   l
  ll
 l
lllll
`,`
 lll
l   l
  ll
l   l
 lll
`,`
  ll
 l l
l  l
lllll
   l
`,`
lllll
l
llll
    l
llll
`,`
 lll
l
llll
l   l
 lll
`,`
lllll
l   l
   l
  l
 l
`,`
 lll
l   l
 lll
l   l
 lll
`,`
 lll
l   l
 llll
    l
 lll
`,`

l

l

`,`

 l

 l
l
`,`
   ll
 ll
l
 ll
   ll
`,`

lllll

lllll

`,`
ll
  ll
    l
  ll
ll
`,`
 lll
l   l
  ll

  l
`,`
 lll
l   l
l lll
l
 lll
`,`
 lll
l   l
lllll
l   l
l   l
`,`
llll
l   l
llll
l   l
llll
`,`
 lll
l   l
l
l   l
 lll
`,`
llll
l   l
l   l
l   l
llll
`,`
lllll
l
llll
l
lllll
`,`
lllll
l
llll
l
l
`,`
 lll
l
l  ll
l   l
 lll
`,`
l   l
l   l
lllll
l   l
l   l
`,`
lllll
  l
  l
  l
lllll
`,`
  lll
   l
   l
l  l
 ll
`,`
l   l
l  l
lll
l  l
l   l
`,`
l
l
l
l
lllll
`,`
l   l
ll ll
l l l
l   l
l   l
`,`
l   l
ll  l
l l l
l  ll
l   l
`,`
 lll
l   l
l   l
l   l
 lll
`,`
llll
l   l
llll
l
l
`,`
 lll
l   l
l   l
l  ll
 llll
`,`
llll
l   l
llll
l   l
l   l
`,`
 llll
l
 lll
    l
llll
`,`
lllll
  l
  l
  l
  l
`,`
l   l
l   l
l   l
l   l
 lll
`,`
l   l
l   l
l   l
 l l
  l
`,`
l   l
l l l
l l l
l l l
 l l
`,`
l   l
 l l
  l
 l l
l   l
`,`
l   l
 l l
  l
  l
  l
`,`
lllll
   l
  l
 l
lllll
`,`
  ll
  l
  l
  l
  ll
`,`
l
 l
  l
   l
    l
`,`
 ll
  l
  l
  l
 ll
`,`
  l
 l l



`,`




lllll
`,`
 l
  l



`,`

 lll
l  l
l  l
 lll
`,`
l
l
lll
l  l
lll
`,`

 lll
l  
l
 lll
`,`
   l
   l
 lll
l  l
 lll
`,`

 ll
l ll
ll
 ll
`,`
  l
 l 
lll
 l
 l
`,`
 ll
l  l
 lll
   l
 ll
`,`
l
l
ll
l l
l l
`,`

l

l
l
`,`
 l

 l
 l
l
`,`
l
l
l l
ll
l l
`,`
ll
 l
 l
 l
lll
`,`

llll
l l l
l l l
l   l
`,`

lll
l  l
l  l
l  l
`,`

 ll
l  l
l  l
 ll
`,`

lll
l  l
lll
l
`,`

 lll
l  l
 lll
   l
`,`

l ll
ll
l
l
`,`

 lll
ll
  ll
lll
`,`

 l
lll
 l
  l
`,`

l  l
l  l
l  l
 lll
`,`

l  l
l  l
 ll
 ll
`,`

l   l
l l l
l l l
 l l
`,`

l  l
 ll
 ll
l  l
`,`

l  l
 ll
 l
l
`,`

llll
  l
 l
llll
`,`
 ll
 l
l
 l
 ll
`,`
l
l
l
l
l
`,`
ll
 l
  l
 l
ll
`,`

 l
l l l
   l

`];let re,Ue;function Xt(){re=[],Ue=[]}function Yl(){re=re.concat(Ue),Ue=[]}function Ql(l){let e={isColliding:{rect:{},text:{},char:{}}};return re.forEach(t=>{Vt(l,t)&&(e=Object.assign(Object.assign(Object.assign({},e),ol(t.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},e.isColliding.rect),t.collision.isColliding.rect),text:Object.assign(Object.assign({},e.isColliding.text),t.collision.isColliding.text),char:Object.assign(Object.assign({},e.isColliding.char),t.collision.isColliding.char)}}))}),e}function Vt(l,e){const t=e.pos.x-l.pos.x,i=e.pos.y-l.pos.y;return-e.size.x<t&&t<l.size.x&&-e.size.y<i&&i<l.size.y}function ol(l){if(l==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let t={};return _l(l).forEach(([i,s])=>{const r=e[i];s&&r!=null&&(t[r]=!0)}),t}function Zl(l,e,t,i){return et(!1,l,e,t,i)}function Yt(l,e,t,i){return et(!0,l,e,t,i)}function et(l,e,t,i,s){if(typeof t=="number"){if(typeof i=="number")return dl(e,t,i,Object.assign({isCharacter:l,isCheckingCollision:!0,color:P},s));throw"invalid params"}else return dl(e,t.x,t.y,Object.assign({isCharacter:l,isCheckingCollision:!0,color:P},i))}const we=6,be=1,h=we*be;let lt,al,cl,ul=!1,H,X,Ce,Ae;const ve={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function Qt(){H=document.createElement("canvas"),H.width=H.height=h,X=H.getContext("2d"),Ce=document.createElement("canvas"),Ae=Ce.getContext("2d"),lt=Vl.map((l,e)=>Object.assign(Object.assign({},hl(l)),{hitBox:Je(String.fromCharCode(33+e),!1)})),al=Vl.map((l,e)=>Object.assign(Object.assign({},hl(l)),{hitBox:Je(String.fromCharCode(33+e),!0)})),cl={}}function Zt(l,e){const t=e.charCodeAt(0)-33;l.forEach((i,s)=>{al[t+s]=Object.assign(Object.assign({},hl(i)),{hitBox:Je(String.fromCharCode(33+t+s),!0)})})}function ei(){ul=!0}function dl(l,e,t,i={}){const s=st(i);e-=h/2*s.scale.x,t-=h/2*s.scale.y;const r=Math.floor(e);let o=l,a=r,d=Math.floor(t),c={isColliding:{rect:{},text:{},char:{}}};for(let g=0;g<o.length;g++){const y=o[g];if(y===`
`){a=r,d+=h*s.scale.y;continue}const M=tt(y,a,d,s);s.isCheckingCollision&&(c={isColliding:{rect:Object.assign(Object.assign({},c.isColliding.rect),M.isColliding.rect),text:Object.assign(Object.assign({},c.isColliding.text),M.isColliding.text),char:Object.assign(Object.assign({},c.isColliding.char),M.isColliding.char)}}),a+=h*s.scale.x}return c}function tt(l,e,t,i){const s=l.charCodeAt(0);if(s<32||s>126)return{isColliding:{rect:{},text:{},char:{}}};const r=st(i);if(r.backgroundColor!=="transparent"&&(Be(),T(r.backgroundColor),ye(e,t,h*r.scale.x,h*r.scale.y),Te()),s<=32)return{isColliding:{rect:{},text:{},char:{}}};const o=s-33,a=r.isCharacter?al[o]:lt[o],d=L(r.rotation,0,4);if(r.color==="black"&&d===0&&r.mirror.x===1&&r.mirror.y===1&&(!m.isUsingPixi||r.scale.x===1&&r.scale.y===1))return fl(a,e,t,r.scale,r.isCheckingCollision,!0);const c=JSON.stringify({c:l,options:r}),g=cl[c];if(g!=null)return fl(g,e,t,r.scale,r.isCheckingCollision,r.color!=="transparent");let y=!1;m.isUsingPixi&&(r.scale.x!==1||r.scale.y!==1)&&(Ce.width=h*r.scale.x,Ce.height=h*r.scale.y,Ae.imageSmoothingEnabled=!1,Ae.scale(r.scale.x,r.scale.y),it(Ae,d,r,a),y=!0),X.clearRect(0,0,h,h),it(X,d,r,a);const M=Je(l,r.isCharacter);let z;if(ul||m.isUsingPixi){const q=document.createElement("img");if(q.src=H.toDataURL(),m.isUsingPixi){const E=document.createElement("img");E.src=(y?Ce:H).toDataURL(),z=PIXI.Texture.from(E)}ul&&(cl[c]={image:q,texture:z,hitBox:M})}return fl({image:H,texture:z,hitBox:M},e,t,r.scale,r.isCheckingCollision,r.color!=="transparent")}function it(l,e,t,i){e===0&&t.mirror.x===1&&t.mirror.y===1?l.drawImage(i.image,0,0):(l.save(),l.translate(h/2,h/2),l.rotate(Math.PI/2*e),(t.mirror.x===-1||t.mirror.y===-1)&&l.scale(t.mirror.x,t.mirror.y),l.drawImage(i.image,-h/2,-h/2),l.restore()),t.color!=="black"&&(l.globalCompositeOperation="source-in",l.fillStyle=ge(t.color==="transparent"?"black":t.color),l.fillRect(0,0,h,h),l.globalCompositeOperation="source-over")}function fl(l,e,t,i,s,r){if(r&&(i.x===1&&i.y===1?nt(l,e,t):nt(l,e,t,h*i.x,h*i.y)),!s)return;const o={pos:{x:e+l.hitBox.pos.x*i.x,y:t+l.hitBox.pos.y*i.y},size:{x:l.hitBox.size.x*i.x,y:l.hitBox.size.y*i.y},collision:l.hitBox.collision},a=Ql(o);return r&&re.push(o),a}function nt(l,e,t,i,s){if(m.isUsingPixi){Le(),w.beginTextureFill({texture:l.texture,matrix:new PIXI.Matrix().translate(e,t)}),w.drawRect(e,t,i==null?h:i,s==null?h:s),$e(ne(P));return}i==null?B.drawImage(l.image,e,t):B.drawImage(l.image,e,t,i,s)}function hl(l,e=!0){X.clearRect(0,0,h,h);let t=l.split(`
`);e&&(t=t.slice(1,t.length-1));let i=0;t.forEach(d=>{i=Math.max(d.length,i)});const s=Math.max(Math.ceil((we-i)/2),0),r=t.length,o=Math.max(Math.ceil((we-r)/2),0);t.forEach((d,c)=>{if(!(c+o>=we))for(let g=0;g<we-s;g++){const y=d.charAt(g);let M=Ut.indexOf(y);y!==""&&M>=1&&(X.fillStyle=ge(Hl[M]),X.fillRect((g+s)*be,(c+o)*be,be,be))}});const a=document.createElement("img");return a.src=H.toDataURL(),m.isUsingPixi?{image:a,texture:PIXI.Texture.from(a)}:{image:a}}function Je(l,e){const t={pos:new p(h,h),size:new p,collision:{isColliding:{char:{},text:{}}}};e?t.collision.isColliding.char[l]=!0:t.collision.isColliding.text[l]=!0;const i=X.getImageData(0,0,h,h).data;let s=0;for(let r=0;r<h;r++)for(let o=0;o<h;o++)i[s+3]>0&&(o<t.pos.x&&(t.pos.x=o),r<t.pos.y&&(t.pos.y=r)),s+=4;s=0;for(let r=0;r<h;r++)for(let o=0;o<h;o++)i[s+3]>0&&(o>t.pos.x+t.size.x-1&&(t.size.x=o-t.pos.x+1),r>t.pos.y+t.size.y-1&&(t.size.y=r-t.pos.y+1)),s+=4;return t}function st(l){let e=Object.assign(Object.assign({},ve),l);return l.scale!=null&&(e.scale=Object.assign(Object.assign({},ve.scale),l.scale)),l.mirror!=null&&(e.mirror=Object.assign(Object.assign({},ve.mirror),l.mirror)),e}let oe=!1,Ke=!1,gl=!1;const rt=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let pl;const li={onKeyDown:void 0};let ml,yl=!1,wl=!1,bl=!1,Cl={},vl={},Sl={};function ot(l){ml=Object.assign(Object.assign({},li),l),pl=Nl(rt.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{yl=wl=!0,Cl[e.code]=vl[e.code]=!0,ml.onKeyDown!=null&&ml.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{yl=!1,bl=!0,Cl[e.code]=!1,Sl[e.code]=!0})}function at(){Ke=!oe&&wl,gl=oe&&bl,wl=bl=!1,oe=yl,_l(pl).forEach(([l,e])=>{e.isJustPressed=!e.isPressed&&vl[l],e.isJustReleased=e.isPressed&&Sl[l],e.isPressed=!!Cl[l]}),vl={},Sl={}}function ct(){Ke=!1,oe=!0}var ti=Object.freeze({__proto__:null,get isPressed(){return oe},get isJustPressed(){return Ke},get isJustReleased(){return gl},codes:rt,get code(){return pl},init:ot,update:at,clearJustPressed:ct});class Ne{constructor(e=null){this.setSeed(e)}get(e=1,t){return t==null&&(t=e,e=0),this.next()/4294967295*(t-e)+e}getInt(e,t){t==null&&(t=e,e=0);const i=Math.floor(e),s=Math.floor(t);return s===i?i:this.next()%(s-i)+i}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,t=123456789,i=362436069,s=521288629,r=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=t>>>0,this.y=i>>>0,this.z=s>>>0;for(let o=0;o<r;o++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const Se=new p;let U=!1,ae=!1,xe=!1,ii={isDebugMode:!1,anchor:new p,padding:new p,onPointerDownOrUp:void 0},O,j,x;const Me=new Ne,V=new p,A=new p;let Pe=!1,ke=new p,xl=!1,Ml=!1,Pl=!1;function ut(l,e,t){x=Object.assign(Object.assign({},ii),t),O=l,j=new p(e.x+x.padding.x*2,e.y+x.padding.y*2),ke.set(O.offsetLeft+O.clientWidth*(.5-x.anchor.x),O.offsetTop+O.clientWidth*(.5-x.anchor.y)),x.isDebugMode&&V.set(O.offsetLeft+O.clientWidth*(.5-x.anchor.x),O.offsetTop+O.clientWidth*(.5-x.anchor.y)),document.addEventListener("mousedown",i=>{ht(i.pageX,i.pageY)}),document.addEventListener("touchstart",i=>{ht(i.touches[0].pageX,i.touches[0].pageY)}),document.addEventListener("mousemove",i=>{gt(i.pageX,i.pageY)}),document.addEventListener("touchmove",i=>{i.preventDefault(),gt(i.touches[0].pageX,i.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",i=>{pt()}),document.addEventListener("touchend",i=>{i.preventDefault(),i.target.click(),pt()},{passive:!1})}function dt(){ni(ke.x,ke.y,Se),x.isDebugMode&&!Se.isInRect(0,0,j.x,j.y)?(si(),Se.set(V),ae=!U&&Pe,xe=U&&!Pe,U=Pe):(ae=!U&&Ml,xe=U&&Pl,U=xl),Ml=Pl=!1}function ft(){ae=!1,U=!0}function ni(l,e,t){O!=null&&(t.x=Math.round(((l-O.offsetLeft)/O.clientWidth+x.anchor.x)*j.x-x.padding.x),t.y=Math.round(((e-O.offsetTop)/O.clientHeight+x.anchor.y)*j.y-x.padding.y))}function si(){A.length>0?(V.add(A),!f(V.x,-j.x*.1,j.x*1.1)&&V.x*A.x>0&&(A.x*=-1),!f(V.y,-j.y*.1,j.y*1.1)&&V.y*A.y>0&&(A.y*=-1),Me.get()<.05&&A.set(0)):Me.get()<.1&&(A.set(0),A.addWithAngle(Me.get(Math.PI*2),(j.x+j.y)*Me.get(.01,.03))),Me.get()<.05&&(Pe=!Pe)}function ht(l,e){ke.set(l,e),xl=Ml=!0,x.onPointerDownOrUp!=null&&x.onPointerDownOrUp()}function gt(l,e){ke.set(l,e)}function pt(l){xl=!1,Pl=!0,x.onPointerDownOrUp!=null&&x.onPointerDownOrUp()}var ri=Object.freeze({__proto__:null,pos:Se,get isPressed(){return U},get isJustPressed(){return ae},get isJustReleased(){return xe},init:ut,update:dt,clearJustPressed:ft});let J=new p,K=!1,D=!1,W=!1;function mt(l){ot({onKeyDown:l}),ut(S,I,{onPointerDownOrUp:l,anchor:new p(.5,.5)})}function yt(){at(),dt(),J=Se,K=oe||U,D=Ke||ae,W=gl||xe}function wt(){ct(),ft()}function Oe(l){J.set(l.pos),K=l.isPressed,D=l.isJustPressed,W=l.isJustReleased}var oi=Object.freeze({__proto__:null,get pos(){return J},get isPressed(){return K},get isJustPressed(){return D},get isJustReleased(){return W},init:mt,update:yt,clearJustPressed:wt,set:Oe});let bt,Ct;const vt=68,kl=1e3/vt;let Ge=0;const ai={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let R,St=10;function ci(l,e,t){bt=l,Ct=e,R=Object.assign(Object.assign({},ai),t),Jt(R.theme.isDarkColor),_t(R.viewSize,R.bodyBackground,R.viewBackground,R.isCapturing,R.isCapturingGameCanvasOnly,R.captureCanvasScale,R.theme),mt(R.isSoundEnabled?sss.startAudio:()=>{}),Qt(),bt(),xt()}function xt(){requestAnimationFrame(xt);const l=window.performance.now();l<Ge-vt/12||(Ge+=kl,(Ge<l||Ge>l+kl*2)&&(Ge=l+kl),R.isSoundEnabled&&sss.update(),yt(),Ct(),R.isCapturing&&qt(),St--,St===0&&ei())}class ui{constructor(e){this.size=new p,this.size.set(e),this.letterGrid=u(this.size.x).map(()=>u(this.size.y).map(()=>{})),this.colorGrid=u(this.size.x).map(()=>u(this.size.y).map(()=>{})),this.backgroundColorGrid=u(this.size.x).map(()=>u(this.size.y).map(()=>{})),this.rotationGrid=u(this.size.x).map(()=>u(this.size.y).map(()=>{})),this.characterGrid=u(this.size.x).map(()=>u(this.size.y).map(()=>{}))}print(e,t,i,s={}){const r=Object.assign(Object.assign({},ve),s);let o=Math.floor(t),a=Math.floor(i);const d=o;for(let c=0;c<e.length;c++){const g=e[c];if(g===`
`){o=d,a++;continue}if(o<0||o>=this.size.x||a<0||a>=this.size.y){o++;continue}this.letterGrid[o][a]=g,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter,o++}}getCharAt(e,t){if(e<0||e>=this.size.x||t<0||t>=this.size.y)return;const i=Math.floor(e),s=Math.floor(t),r=this.letterGrid[i][s],o=this.colorGrid[i][s],a=this.backgroundColorGrid[i][s],d=this.rotationGrid[i][s],c=this.characterGrid[i][s];return{char:r,options:{color:o,backgroundColor:a,rotation:d,isCharacter:c}}}setCharAt(e,t,i,s){if(e<0||e>=this.size.x||t<0||t>=this.size.y)return;const r=Object.assign(Object.assign({},ve),s),o=Math.floor(e),a=Math.floor(t);this.letterGrid[o][a]=i,this.colorGrid[o][a]=r.color,this.backgroundColorGrid[o][a]=r.backgroundColor,this.rotationGrid[o][a]=r.rotation,this.characterGrid[o][a]=r.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let t=0;t<this.size.y;t++){const i=this.letterGrid[e][t];if(i==null)continue;const s=this.colorGrid[e][t],r=this.backgroundColorGrid[e][t],o=this.rotationGrid[e][t],a=this.characterGrid[e][t];tt(i,e*h,t*h,{color:s,backgroundColor:r,rotation:o,isCharacter:a})}}clear(){for(let e=0;e<this.size.x;e++)for(let t=0;t<this.size.y;t++)this.letterGrid[e][t]=this.colorGrid[e][t]=this.backgroundColorGrid[e][t]=this.rotationGrid[e][t]=this.characterGrid[e][t]=void 0}scrollUp(){for(let t=0;t<this.size.x;t++)for(let i=1;i<this.size.y;i++)this.letterGrid[t][i-1]=this.letterGrid[t][i],this.colorGrid[t][i-1]=this.colorGrid[t][i],this.backgroundColorGrid[t][i-1]=this.backgroundColorGrid[t][i],this.rotationGrid[t][i-1]=this.rotationGrid[t][i],this.characterGrid[t][i-1]=this.characterGrid[t][i];const e=this.size.y-1;for(let t=0;t<this.size.x;t++)this.letterGrid[t][e]=this.colorGrid[t][e]=this.backgroundColorGrid[t][e]=this.rotationGrid[t][e]=this.characterGrid[t][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(t=>[].concat(t)),this.colorGrid=e.colorGrid.map(t=>[].concat(t)),this.backgroundColorGrid=e.backgroundColorGrid.map(t=>[].concat(t)),this.rotationGrid=e.rotationGrid.map(t=>[].concat(t)),this.characterGrid=e.symbolGrid.map(t=>[].concat(t))}}let _e;const He=new Ne;function Ol(){_e=[]}function Mt(l,e=16,t=1,i=0,s=Math.PI*2){if(e<1){if(He.get()>e)return;e=1}for(let r=0;r<e;r++){const o=i+He.get(s)-s/2,a={pos:new p(l),vel:new p(t*He.get(.5,1),0).rotate(o),color:P,ticks:k(He.get(10,20)*Math.sqrt(Math.abs(t)),10,60)};_e.push(a)}}function We(){Be(),_e=_e.filter(l=>(l.ticks--,l.ticks<0?!1:(l.pos.add(l.vel),l.vel.mul(.98),T(l.color),ye(Math.floor(l.pos.x),Math.floor(l.pos.y),1,1),!0))),Te()}function Gl(l,e,t,i){return Pt(!1,l,e,t,i)}function di(l,e,t,i){return Pt(!0,l,e,t,i)}function fi(l,e,t,i,s=.5,r=.5){typeof l!="number"&&(r=s,s=i,i=t,t=e,e=l.y,l=l.x);const o=new p(t).rotate(s),a=new p(l-o.x*r,e-o.y*r);return Rl(a,o,i)}function hi(l,e,t=3,i=3,s=3){const r=new p,o=new p;if(typeof l=="number")if(typeof e=="number")typeof t=="number"?(r.set(l,e),o.set(t,i)):(r.set(l,e),o.set(t),s=i);else throw"invalid params";else if(typeof e=="number")if(typeof t=="number")r.set(l),o.set(e,t),s=i;else throw"invalid params";else if(typeof t=="number")r.set(l),o.set(e),s=t;else throw"invalid params";return Rl(r,o.sub(r),s)}function gi(l,e,t,i,s,r){let o=new p;typeof l=="number"?o.set(l,e):(o.set(l),r=s,s=i,i=t,t=e),i==null&&(i=3),s==null&&(s=0),r==null&&(r=Math.PI*2);let a,d;if(s>r?(a=r,d=s-r):(a=s,d=r-s),d=k(d,0,Math.PI*2),d<.01)return;const c=k(Math.ceil(d*Math.sqrt(t*.25)),1,36),g=d/c;let y=a,M=new p(t).rotate(y).add(o),z=new p,q=new p,E={isColliding:{rect:{},text:{},char:{}}};for(let tl=0;tl<c;tl++){y+=g,z.set(t).rotate(y).add(o),q.set(z).sub(M);const il=Rl(M,q,i,!0);E=Object.assign(Object.assign(Object.assign({},E),ol(il.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},E.isColliding.rect),il.isColliding.rect),text:Object.assign(Object.assign({},E.isColliding.text),il.isColliding.text),char:Object.assign(Object.assign({},E.isColliding.char),il.isColliding.char)}}),M.set(z)}return Yl(),E}function Pt(l,e,t,i,s){if(typeof e=="number"){if(typeof t=="number")return typeof i=="number"?s==null?Y(l,e,t,i,i):Y(l,e,t,i,s):Y(l,e,t,i.x,i.y);throw"invalid params"}else if(typeof t=="number"){if(i==null)return Y(l,e.x,e.y,t,t);if(typeof i=="number")return Y(l,e.x,e.y,t,i);throw"invalid params"}else return Y(l,e.x,e.y,t.x,t.y)}function Rl(l,e,t,i=!1){let s=!0;(m.name==="shape"||m.name==="shapeDark")&&(P!=="transparent"&&Ht(l.x,l.y,l.x+e.x,l.y+e.y,t),s=!1);const r=Math.floor(k(t,3,10)),o=Math.abs(e.x),a=Math.abs(e.y),d=k(Math.ceil(o>a?o/r:a/r)+1,3,99);e.div(d-1);let c={isColliding:{rect:{},text:{},char:{}}};for(let g=0;g<d;g++){const y=Y(!0,l.x,l.y,t,t,!0,s);c=Object.assign(Object.assign(Object.assign({},c),ol(y.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},c.isColliding.rect),y.isColliding.rect),text:Object.assign(Object.assign({},c.isColliding.text),y.isColliding.text),char:Object.assign(Object.assign({},c.isColliding.char),y.isColliding.char)}}),l.add(e)}return i||Yl(),c}function Y(l,e,t,i,s,r=!1,o=!0){let a=o;(m.name==="shape"||m.name==="shapeDark")&&a&&P!=="transparent"&&(l?ye(e-i/2,t-s/2,i,s):ye(e,t,i,s),a=!1);let d=l?{x:Math.floor(e-i/2),y:Math.floor(t-s/2)}:{x:Math.floor(e),y:Math.floor(t)};const c={x:Math.trunc(i),y:Math.trunc(s)};if(c.x===0||c.y===0)return{isColliding:{rect:{},text:{},char:{}}};c.x<0&&(d.x+=c.x,c.x*=-1),c.y<0&&(d.y+=c.y,c.y*=-1);const g={pos:d,size:c,collision:{isColliding:{rect:{}}}};g.collision.isColliding.rect[P]=!0;const y=Ql(g);return P!=="transparent"&&((r?Ue:re).push(g),a&&ye(d.x,d.y,c.x,c.y)),y}function jl({pos:l,size:e,text:t,isToggle:i=!1,onClick:s=()=>{}}){return{pos:l,size:e,text:t,isToggle:i,onClick:s,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function zl(l){const e=new p(J).sub(l.pos);l.isHovered=e.isInRect(0,0,l.size.x,l.size.y),l.isHovered&&ae&&(l.isPressed=!0),l.isPressed&&!l.isHovered&&(l.isPressed=!1),l.isPressed&&xe&&(l.onClick(),l.isPressed=!1,l.isToggle&&(l.toggleGroup.length===0?l.isSelected=!l.isSelected:(l.toggleGroup.forEach(t=>{t.isSelected=!1}),l.isSelected=!0))),qe(l)}function qe(l){Be(),T(l.isPressed?"blue":"light_blue"),Gl(l.pos.x,l.pos.y,l.size.x,l.size.y),l.isToggle&&!l.isSelected&&(T("white"),Gl(l.pos.x+1,l.pos.y+1,l.size.x-2,l.size.y-2)),T(l.isHovered?"black":"blue"),Zl(l.text,l.pos.x+3,l.pos.y+3),Te()}let F,Re,Q,El;function pi(l){F={randomSeed:l,inputs:[]}}function mi(l){F.inputs.push(l)}function kt(){return F!=null}function yi(l){Re=0,l.setSeed(F.randomSeed)}function wi(){Re>=F.inputs.length||(Oe(F.inputs[Re]),Re++)}function bi(){Q=[]}function Ci(l,e,t){Q.push({randomState:t.getState(),gameState:cloneDeep(l),baseState:cloneDeep(e)})}function vi(l){const e=Q.pop(),t=e.randomState;return l.setSeed(t.w,t.x,t.y,t.z,0),El={pos:new p(J),isPressed:K,isJustPressed:D,isJustReleased:W},Oe(F.inputs.pop()),e}function Si(l){const e=Q[Q.length-1],t=e.randomState;return l.setSeed(t.w,t.x,t.y,t.z,0),El={pos:new p(J),isPressed:K,isJustPressed:D,isJustReleased:W},Oe(F.inputs[F.inputs.length-1]),e}function xi(){Oe(El)}function Mi(){return Q.length===0}function Pi(){const l=Re-1;if(!(l>=F.inputs.length))return Q[l]}const ki=Math.PI,Oi=Math.abs,Gi=Math.sin,Ri=Math.cos,ji=Math.atan2,zi=Math.sqrt,Ei=Math.pow,Ii=Math.floor,Di=Math.round,Fi=Math.ceil;n.ticks=0,n.difficulty=void 0,n.score=0,n.time=void 0,n.isReplaying=!1;function $i(l=1,e){return N.get(l,e)}function Li(l=2,e){return N.getInt(l,e)}function Bi(l=1,e){return N.get(l,e)*N.getPlusOrMinus()}function Il(l="GAME OVER"){ll=l,ce&&(n.time=void 0),Dt()}function Ti(l="COMPLETE"){ll=l,Dt()}function Ui(l,e,t){if(n.isReplaying||(n.score+=l,e==null))return;const i=`${l>=1?"+":""}${Math.floor(l)}`;let s=new p;typeof e=="number"?s.set(e,t):s.set(e),s.x-=i.length*h/2,s.y-=h/2,Ze.push({str:i,pos:s,vy:-2,ticks:30})}function Ot(l){T(l)}function Ai(l,e,t,i,s,r){let o=new p;typeof l=="number"?(o.set(l,e),Mt(o,t,i,s,r)):(o.set(l),Mt(o,e,t,i,s))}function Gt(l,e){return new p(l,e)}function Rt(l,e){!Ie&&!te&&le&&(e!=null&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(l,e):sss.play(Ni[l]))}let Dl;function Fl(){typeof sss.generateMml=="function"?Dl=sss.playMml(sss.generateMml()):sss.playBgm()}function $l(){Dl!=null&&sss.stopMml(Dl),sss.stopBgm()}function Ji(l){if(Ie){const e=Si(N),t=e.baseState;return n.score=t.score,n.ticks=t.ticks,cloneDeep(e.gameState)}else if(te){const e=vi(N),t=e.baseState;return n.score=t.score,n.ticks=t.ticks,e.gameState}else{if(n.isReplaying)return Pi().gameState;if(Z==="inGame"){const e={score:n.score,ticks:n.ticks};Ci(l,e,N)}}return l}function Ki(){te||(!n.isReplaying&&Qe?en():Il())}const Ni={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},jt={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},_i=new Ne,N=new Ne;let Z,Hi={title:Yi,inGame:Vi,gameOver:Qi,rewind:ln},G,Ll=0,Xe,Ve=!0,Ye=0,ee,je,zt,ce,ze,Qe,Ee,Bl,le,_,Ze,Ie=!1,te=!1,De,el,ll,Tl;function Wi(l){const e=window;e.update=l.update,e.title=l.title,e.description=l.description,e.characters=l.characters,e.options=l.options,Et()}function Et(){let l;typeof options<"u"&&options!=null?l=Object.assign(Object.assign({},jt),options):l=jt;const e={name:l.theme,isUsingPixi:!1,isDarkColor:!1};l.theme!=="simple"&&l.theme!=="dark"&&(e.isUsingPixi=!0),(l.theme==="pixel"||l.theme==="shapeDark"||l.theme==="crt"||l.theme==="dark")&&(e.isDarkColor=!0),ee={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:l.isSoundEnabled},Ye=l.seed,ee.isCapturing=l.isCapturing,ee.isCapturingGameCanvasOnly=l.isCapturingGameCanvasOnly,ee.captureCanvasScale=l.captureCanvasScale,ee.viewSize=l.viewSize,je=l.isPlayingBgm,zt=l.isShowingScore&&!l.isShowingTime,ce=l.isShowingTime,ze=l.isReplayEnabled,Qe=l.isRewindEnabled,Ee=l.isDrawingParticleFront,Bl=l.isDrawingScoreFront,le=l.isSoundEnabled,l.isMinifying&&sn(),ci(qi,Xi,ee)}function qi(){typeof description<"u"&&description!=null&&description.trim().length>0&&(Ve=!1,Ye+=Lt(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(Ve=!1,document.title=title,Ye+=Lt(title)),typeof characters<"u"&&characters!=null&&Zt(characters,"a"),le&&sss.init(Ye);const l=ee.viewSize;_={x:Math.floor(l.x/6),y:Math.floor(l.y/6)},G=new ui(_),T("black"),Ve?(Ul(),n.ticks=0):It()}function Xi(){n.df=n.difficulty=n.ticks/3600+1,n.tc=n.ticks;const l=n.score,e=n.time;n.sc=n.score;const t=n.sc;n.inp={p:J,ip:K,ijp:D,ijr:W},Xt(),Hi[Z](),m.isUsingPixi&&(Le(),m.name==="crt"&&Wt()),n.ticks++,n.isReplaying?(n.score=l,n.time=e):n.sc!==t&&(n.score=n.sc)}function Ul(){Z="inGame",n.ticks=-1,Ol();const l=Math.floor(n.score);l>Ll&&(Ll=l),ce&&n.time!=null&&(Xe==null||Xe>n.time)&&(Xe=n.time),n.score=0,n.time=0,Ze=[],je&&le&&Fl();const e=_i.getInt(999999999);N.setSeed(e),(ze||Qe)&&(pi(e),bi(),n.isReplaying=!1)}function Vi(){G.clear(),Fe(),Ee||We(),Bl||$t(),(ze||Qe)&&mi({pos:Gt(J),isPressed:K,isJustPressed:D,isJustReleased:W}),typeof update=="function"&&update(),Ee&&We(),Bl&&$t(),Al(),G.draw(),ce&&n.time!=null&&n.time++}function It(){Z="title",n.ticks=-1,Ol(),G.clear(),Fe(),kt()&&(yi(N),n.isReplaying=!0)}function Yi(){if(D){Ul();return}if(Fe(),ze&&kt()&&(wi(),n.inp={p:J,ip:K,ijp:D,ijr:W},Ee||We(),update(),Ee&&We()),n.ticks===0&&(Al(),typeof title<"u"&&title!=null&&G.print(title,Math.floor(_.x-title.length)/2,Math.ceil(_.y*.2))),(n.ticks===30||n.ticks==40)&&typeof description<"u"&&description!=null){let l=0;description.split(`
`).forEach(t=>{t.length>l&&(l=t.length)});const e=Math.floor((_.x-l)/2);description.split(`
`).forEach((t,i)=>{G.print(t,e,Math.floor(_.y/2)+i)})}G.draw()}function Dt(){Z="gameOver",n.isReplaying||wt(),n.ticks=-1,Zi(),je&&le&&$l()}function Qi(){(n.isReplaying||n.ticks>20)&&D?Ul():n.ticks===(ze?120:300)&&!Ve&&It()}function Zi(){n.isReplaying||(G.print(ll,Math.floor((_.x-ll.length)/2),Math.floor(_.y/2)),G.draw())}function en(){Z="rewind",Ie=!0,De=jl({pos:{x:I.x-39,y:11},size:{x:36,y:7},text:"Rewind"}),el=jl({pos:{x:I.x-39,y:I.y-19},size:{x:36,y:7},text:"GiveUp"}),je&&le&&$l(),m.isUsingPixi&&(qe(De),qe(el))}function ln(){G.clear(),Fe(),update(),Al(),xi(),te?(qe(De),(Mi()||!K)&&tn()):(zl(De),zl(el),De.isPressed&&(te=!0,Ie=!1)),el.isPressed?(Ie=te=!1,Il()):G.draw(),ce&&n.time!=null&&n.time++}function tn(){te=!1,Z="inGame",Ol(),je&&le&&Fl()}function Al(){if(zt){G.print(`${Math.floor(n.score)}`,0,0);const l=`HI ${Ll}`;G.print(l,_.x-l.length,0)}ce&&(Ft(n.time,0,0),Ft(Xe,9,0))}function Ft(l,e,t){if(l==null)return;let i=Math.floor(l*100/50);i>=10*60*100&&(i=10*60*100-1);const s=Jl(Math.floor(i/6e3),1)+"'"+Jl(Math.floor(i%6e3/100),2)+'"'+Jl(Math.floor(i%100),2);G.print(s,e,t)}function Jl(l,e){return("0000"+l).slice(-e)}function $t(){Be(),T("black"),Ze=Ze.filter(l=>(dl(l.str,l.pos.x,l.pos.y),l.pos.y+=l.vy,l.vy*=.9,l.ticks--,l.ticks>0)),Te()}function Lt(l){let e=0;for(let t=0;t<l.length;t++){const i=l.charCodeAt(t);e=(e<<5)-e+i,e|=0}return e}function nn(){let l=window.location.search.substring(1);if(l=l.replace(/[^A-Za-z0-9_-]/g,""),l.length===0)return;const e=document.createElement("script");Tl=`${l}/main.js`,e.setAttribute("src",Tl),document.head.appendChild(e)}function sn(){fetch(Tl).then(l=>l.text()).then(l=>{const e=Terser.minify(l+"update();",{toplevel:!0}).code,t="function(){",i=e.indexOf(t),s="options={",r=e.indexOf(s);let o=e;if(i>=0)o=e.substring(e.indexOf(t)+t.length,e.length-4);else if(r>=0){let a=1,d;for(let c=r+s.length;c<e.length;c++){const g=e.charAt(c);if(g==="{")a++;else if(g==="}"&&(a--,a===0)){d=c+2;break}}a===0&&(o=e.substring(d))}Bt.forEach(([a,d])=>{o=o.split(a).join(d)}),console.log(o),console.log(`${o.length} letters`)})}n.inp=void 0;function rn(...l){return Ot.apply(this,l)}function on(...l){return Rt.apply(this,l)}function an(...l){return v.apply(this,l)}function cn(...l){return ie.apply(this.args)}n.tc=void 0,n.df=void 0,n.sc=void 0;const un="transparent",dn="white",fn="red",hn="green",gn="yellow",pn="blue",mn="purple",yn="cyan",wn="black",bn="coin",Cn="laser",vn="explosion",Sn="powerUp",xn="hit",Mn="jump",Pn="select",kn="lucky";let Bt=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];n.PI=ki,n.abs=Oi,n.addGameScript=nn,n.addScore=Ui,n.addWithCharCode=Tt,n.arc=gi,n.atan2=ji,n.bar=fi,n.bl=pn,n.box=di,n.ceil=Fi,n.char=Yt,n.clamp=k,n.clr=rn,n.cn=bn,n.color=Ot,n.complete=Ti,n.cos=Ri,n.cy=yn,n.end=Il,n.ex=vn,n.floor=Ii,n.frameState=Ji,n.getButton=jl,n.gr=hn,n.ht=xn,n.init=Wi,n.input=oi,n.jm=Mn,n.keyboard=ti,n.lc=wn,n.line=hi,n.ls=Cn,n.minifyReplaces=Bt,n.onLoad=Et,n.particle=Ai,n.play=Rt,n.playBgm=Fl,n.ply=on,n.pointer=ri,n.pow=Ei,n.pr=mn,n.pw=Sn,n.range=u,n.rd=fn,n.rect=Gl,n.remove=ie,n.rewind=Ki,n.rmv=cn,n.rnd=$i,n.rndi=Li,n.rnds=Bi,n.round=Di,n.sin=Gi,n.sl=Pn,n.sqrt=zi,n.stopBgm=$l,n.text=Zl,n.times=v,n.tms=an,n.tr=un,n.uc=kn,n.updateButton=zl,n.vec=Gt,n.wh=dn,n.wrap=L,n.yl=gn,Object.defineProperty(n,"__esModule",{value:!0})})(window||{})})();const On="THUNDER",Gn=`
[Tap] Turn
`,Rn=[`
 l
lll
l l
`,`
llllll
ll l l
ll l l
llllll
 l  l
 l  l
  `,`
llllll
ll l l
ll l l
llllll
ll  ll
  `];let ue,de,Kl,$,nl;function jn(){var n,k,L;if(ticks||(ue=[],de=-1,Kl=[],$={x:40,vx:1},nl=1),ue.length===0){const f=vec(rnd(30,70),0);ue.push({from:f,to:vec(f),vel:vec(.5*difficulty,0).rotate(PI/2),ticks:ceil(30/difficulty),prevLine:void 0,isActive:!1})}color("light_blue"),rect(0,90,100,10),de--,remove(ue,f=>{if(f.isActive)return color("yellow"),line(f.from,f.to,4),de<0;if(f.ticks--,de>0)return f.ticks>0&&Kl.push({pos:vec(f.to),vel:vec(0,-f.to.y*.02)}),!0;if(f.ticks>0){if(f.to.add(f.vel),de<0&&(f.to.y>90||ue.length>160)){play("explosion");let u=f;color("yellow");for(let v=0;v<99&&(particle(u.to,30,2),u.isActive=!0,u=u.prevLine,u!=null);v++);de=ceil(20/sqrt(difficulty)),nl=1}}else if(f.ticks===0){play("hit"),color("black"),particle(f.to,9,1);for(let u=0;u<rndi(1,4);u++)ue.push({from:vec(f.to),to:vec(f.to),vel:vec(f.vel).normalize().rotate(rnds(.7)).mul(rnd(.3,1)*sqrt(difficulty)),ticks:ceil(rnd(20,40)/difficulty),prevLine:f,isActive:!1})}color("light_black"),line(f.from,f.to,2)}),(input.isJustPressed||$.x<0&&$.vx<0||$.x>99&&$.vx>0)&&(play("laser"),$.vx*=-1),$.x+=$.vx*sqrt(difficulty),color("black"),(L=(k=(n=char(addWithCharCode("b",floor(ticks/10)%2),$.x,87,{mirror:{x:$.vx>0?1:-1}}))==null?void 0:n.isColliding)==null?void 0:k.rect)!=null&&L.yellow&&(play("lucky"),end()),color("yellow"),remove(Kl,f=>{if(f.vel.y+=.1*difficulty,f.pos.add(f.vel),f.pos.y>89&&f.vel.y>0&&(f.vel.y*=-.5,f.vel.y>-.1))return!0;const u=char("a",f.pos).isColliding.char;if((u==null?void 0:u.b)||(u==null?void 0:u.c))return play("coin"),addScore(nl,f.pos),nl++,!0})}init({update:jn,title:On,description:Gn,characters:Rn,options:{theme:"dark",isPlayingBgm:!0,isReplayEnabled:!0,seed:3}});
