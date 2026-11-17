import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
try {
 const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
 await page.goto('http://127.0.0.1:5173');
 await page.screenshot({ path: 'preview.png' });
} finally { await browser.close(); }
