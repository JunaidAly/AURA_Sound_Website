// Motion's vanilla-JavaScript engine; the site remains usable if the CDN is unavailable.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('header');
const meter = document.createElement('div'); meter.className='scroll-meter'; meter.setAttribute('aria-hidden','true'); document.body.append(meter);
function progress(){header.classList.toggle('scrolled',scrollY>15);const length=document.documentElement.scrollHeight-innerHeight;meter.style.transform=`scaleX(${length>0?scrollY/length:0})`;}
addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);progress();
let animateMotion; const running=new Set();
function run(target,keyframes,options){if(reduced.matches||document.body.classList.contains('paused'))return;if(animateMotion){const control=animateMotion(target,keyframes,options);running.add(control);Promise.resolve(control).finally(()=>running.delete(control));}}
import('https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm').then(({animate,inView})=>{animateMotion=animate;
if(!reduced.matches){run('.hero-copy > *',{opacity:[0,1],y:[18,0]},{duration:.7,delay:.1});
inView('.section-head, .product, .philosophy-copy, .feature-grid article, .closing',element=>{run(element,{opacity:[0,1],y:[28,0]},{duration:.7,ease:[.22,1,.36,1]});},{amount:.15});}
}).catch(()=>{/* Static content stays visible. */});
const fine=matchMedia('(hover: hover) and (pointer: fine)');
const halo=document.createElement('div');halo.className='cursor-halo';halo.setAttribute('aria-hidden','true');document.body.append(halo);
let x=0,y=0,cx=0,cy=0,frame=0,lastSpark=0;
function disabled(){return reduced.matches||!fine.matches||document.body.classList.contains('paused');}
function stop(){cancelAnimationFrame(frame);frame=0;halo.style.opacity=0;}
function follow(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;halo.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;if(Math.abs(x-cx)+Math.abs(y-cy)>.2)frame=requestAnimationFrame(follow);else frame=0;}
addEventListener('pointermove',e=>{if(disabled()||e.pointerType!=='mouse')return;x=e.clientX;y=e.clientY;if(!frame){if(halo.style.opacity!=='1'){cx=x;cy=y;}frame=requestAnimationFrame(follow);}halo.style.opacity=1;halo.classList.toggle('active',!!e.target.closest('a,button,summary'));
const now=performance.now();if(now-lastSpark>65){lastSpark=now;const s=document.createElement('i');s.className='cursor-spark';s.setAttribute('aria-hidden','true');s.style.left=x+'px';s.style.top=y+'px';document.body.append(s);const a=s.animate([{opacity:.65,transform:'translate(-50%,-50%) scale(1)'},{opacity:0,transform:'translate(-50%,-50%) scale(3)'}],{duration:500});a.onfinish=()=>s.remove();}}, {passive:true});
document.documentElement.addEventListener('pointerleave',stop);addEventListener('blur',stop);
function motionChanged(){if(disabled()){stop();running.forEach(a=>a.complete());running.clear();document.querySelectorAll('.cursor-spark').forEach(s=>s.remove());}}
reduced.addEventListener('change',motionChanged);fine.addEventListener('change',motionChanged);new MutationObserver(motionChanged).observe(document.body,{attributes:true,attributeFilter:['class']});
