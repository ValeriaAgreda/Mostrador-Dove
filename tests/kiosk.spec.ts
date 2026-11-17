import { test, expect } from '@playwright/test';
test('navegación, fichas, pestañas y regreso automático',async({page})=>{
 await page.clock.install();await page.goto('/');await page.getByRole('link',{name:'Descubre tu cuidado'}).click();
 for(const name of ['Crema corporal','Sérum corporal','Fragancia']){await page.getByRole('link').filter({has:page.getByRole('heading',{name,exact:true})}).click();await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();await page.getByRole('tab',{name:'Ingredientes'}).click();await expect(page.getByRole('tabpanel')).toContainText(/composición|ingredientes/i);await page.getByRole('link',{name:'← Productos',exact:true}).click();}
 await page.clock.fastForward(59_000);await expect(page).toHaveURL(/productos/);await page.mouse.click(600,200);await page.clock.fastForward(59_000);await expect(page).toHaveURL(/productos/);await page.clock.fastForward(1_100);await expect(page.getByRole('heading',{name:'Tu piel. Tu cuidado. Tu momento.'})).toBeVisible();
});
test('recarga y navegación completas sin conexión',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready});await expect(page.getByRole('status')).toContainText('Experiencia lista');await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.getByRole('link',{name:'Descubre tu cuidado'}).click();await page.getByRole('link').filter({has:page.getByRole('heading',{name:'Sérum corporal',exact:true})}).click();await page.reload();await expect(page.getByRole('heading',{name:'Sérum corporal',exact:true})).toBeVisible();await expect(page.getByRole('status')).toContainText('Disponible sin conexión');
});
test('diseño adaptable y rutas desconocidas',async({page})=>{
 for(const size of [{width:1280,height:800},{width:800,height:1280},{width:390,height:844}]){await page.setViewportSize(size);await page.goto('/');await expect(page.getByRole('link',{name:'Descubre tu cuidado'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.goto('/#/producto/desconocido');await expect(page.getByRole('heading',{name:'¿Qué necesita tu piel hoy?'})).toBeVisible();
});
