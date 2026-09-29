import { useEffect } from 'react';
export function useIdleTimeout(onIdle:()=>void, timeout=60_000) {
 useEffect(()=>{let last=Date.now();let timer:ReturnType<typeof setTimeout>;
 const check=()=>{clearTimeout(timer);const remaining=timeout-(Date.now()-last);if(remaining<=0){onIdle();last=Date.now();}timer=setTimeout(check,Math.max(100,remaining>0?remaining:timeout));};
 const reset=()=>{last=Date.now();check();};const visible=()=>{if(!document.hidden)check();};
 const events=['pointerdown','pointermove','keydown','wheel'] as const;
 events.forEach(e=>window.addEventListener(e,reset,{passive:true}));document.addEventListener('visibilitychange',visible);check();
 return ()=>{clearTimeout(timer);events.forEach(e=>window.removeEventListener(e,reset));document.removeEventListener('visibilitychange',visible);};
 },[onIdle,timeout]);
}
