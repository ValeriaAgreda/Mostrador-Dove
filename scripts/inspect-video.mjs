import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
const data=readFileSync('C:/Users/Valeria/Downloads/WhatsApp Video 2026-09-29 at 11.43.25 AM.mp4').toString('base64');
mkdirSync('video-review',{recursive:true});
const browser=await chromium.launch({channel:'msedge'});
try{
const page=await browser.newPage({viewport:{width:1000,height:850}});
await page.setContent('<video controls style="max-width:100%;height:800px"></video>');
const info=await page.evaluate(async(data)=>{const v=document.querySelector('video');v.src='data:video/mp4;base64,'+data;await new Promise((resolve,reject)=>{v.onloadedmetadata=resolve;v.onerror=reject});return {duration:v.duration,width:v.videoWidth,height:v.videoHeight}},data);
console.log(info);
for(let i=0;i<5;i++){await page.evaluate(async(t)=>{const v=document.querySelector('video');v.currentTime=t;await new Promise(resolve=>v.onseeked=resolve)},Math.max(.1,info.duration*(i+.3)/5));await page.screenshot({path:`video-review/frame-${i}.png`});}
}finally{await browser.close()}
