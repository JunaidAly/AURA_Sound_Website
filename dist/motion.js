// Motion's vanilla-JavaScript engine; the site remains usable if the CDN is unavailable.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('header');
const meter = document.createElement('div'); meter.className='scroll-meter'; meter.setAttribute('aria-hidden','true'); document.body.append(meter);
function progress(){header.classList.toggle('scrolled',scrollY>15);const length=document.documentElement.scrollHeight-innerHeight;meter.style.transform=`scaleX(${length>0?scrollY/length:0})`;}
addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);progress();
let animateMotion; const running=new Set();
function run(target,keyframes,options){if(reduced.matches||document.body.classList.contains('paused'))return;if(animateMotion){const control=animateMotion(target,keyframes,options);running.add(control);Promise.resolve(control).finally(()=>running.delete(control));}}
// Locally bundled Motion (Framer Motion's animation engine), no CDN dependency.
if(window.Motion){
const {animate,inView,stagger}=window.Motion; animateMotion=animate;
run('.hero-copy > *',{opacity:[0,1],y:[38,0],filter:['blur(8px)','blur(0px)']},{duration:.9,delay:stagger(.12),ease:[.22,1,.36,1]});
run('.speaker-wrap',{opacity:[0,1]},{duration:1.3,ease:[.22,1,.36,1]});
inView('.section-head, .philosophy-copy, .closing, .craft-heading, .questions',el=>{run(el,{opacity:[0,1],y:[55,0]},{duration:.9,ease:[.22,1,.36,1]});},{amount:.15});
inView('.products, .feature-grid, .craft-grid',el=>{run(Array.from(el.children),{opacity:[0,1],y:[55,0]},{duration:.85,delay:stagger(.14),ease:[.22,1,.36,1]});},{amount:.15});
inView('.mood-layout',el=>{run(el,{opacity:[0,1],y:[60,0],scale:[.97,1]},{duration:1,ease:[.22,1,.36,1]});},{amount:.2});
document.querySelectorAll('.button,.plus').forEach(el=>{el.addEventListener('pointerenter',()=>run(el,{scale:1.06},{type:'spring',stiffness:300,damping:18}));el.addEventListener('pointerleave',()=>{if(animateMotion)animateMotion(el,{scale:1},{duration:reduced.matches?0:.25});});});
const dialogObserver=new MutationObserver(entries=>entries.forEach(({target})=>{if(target.open)run(target,{opacity:[0,1],y:[25,0],scale:[.94,1]},{duration:.35,ease:[.22,1,.36,1]});}));
document.querySelectorAll('dialog').forEach(el=>dialogObserver.observe(el,{attributes:true,attributeFilter:['open']}));
}
const moods={morning:['THE MORNING RITUAL','First light. Fresh coffee. Your favourite record. A softer start to whatever comes next.'],focus:['A LITTLE ROOM TO THINK','Clear the desk. Find your flow. A thoughtful soundtrack for the things that deserve your attention.'],evening:['STAY A LITTLE LONGER','Lights down. One more record. Turn an ordinary evening into your favourite part of the day.']};
document.querySelectorAll('.mood-buttons button').forEach(button=>button.addEventListener('click',()=>{const mood=button.dataset.mood;document.querySelector('.mood-scene').dataset.mood=mood;document.querySelector('.scene-label').textContent=moods[mood][0];document.querySelector('#moodCopy').textContent=moods[mood][1];document.querySelectorAll('.mood-buttons button').forEach(b=>b.setAttribute('aria-pressed',b===button));run('.scene-speaker',{y:[-18,0],rotate:[-7,0]},{duration:.7,type:'spring'});run('#moodCopy',{opacity:[0,1],y:[10,0]},{duration:.4});}));
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
