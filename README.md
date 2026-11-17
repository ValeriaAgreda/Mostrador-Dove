# Dove · Kiosco interactivo

Primera versión de una PWA React + TypeScript + Vite, sin backend ni base de datos. Incluye bienvenida, catálogo, tres fichas con pestañas, retorno por inactividad a los 60 segundos y precaché local de todos los recursos de la versión. El diseño se adapta a horizontal y vertical; pantallas pequeñas permiten desplazamiento.

## Desarrollo

Se requiere Node.js para las herramientas de desarrollo y compilación, no en las tablets ni en el hosting estático.

```sh
npm install
npm run dev
```

## Compilar y verificar offline

```sh
npm run build
npm run preview
npx playwright install chromium
npm test
```

La PWA se genera únicamente al compilar. Visita la URL de preview, espera «Experiencia lista», recarga una vez y desconecta la red. La primera carga necesita conexión. No se utilizan fuentes, imágenes ni servicios remotos. El almacenamiento puede ser eliminado por el navegador o por el usuario: validar de nuevo tras borrar datos y no utilizar navegación privada.

## Contenido

- `src/data/products.ts`: catálogo, textos, beneficios y uso.
- `src/components/ProductArt.tsx`: envases conceptuales en CSS, reemplazables por imágenes locales aprobadas.
- `src/styles.css`: identidad visual y diseño adaptable.
- `src/hooks/useIdleTimeout.ts`: duración del retorno automático.
- `public/icons`: iconos de instalación de muestra.

Los nombres, envases y textos son demostrativos, no un catálogo oficial ni afirmaciones de eficacia. La marca tipográfica y el icono también son referencias: reemplazarlos por los archivos corporativos autorizados. No se incluyen videos porque no se entregaron recursos audiovisuales. La precaché actual incluye JS, CSS, HTML, SVG, PNG, WebP y WOFF2 hasta 5 MB por archivo; otros formatos y videos requieren configurar y probar su almacenamiento y reproducción offline.

## Publicación

En Vercel, Netlify o Cloudflare Pages: ejecutar `npm run build` y publicar `dist` con HTTPS. Se usa HashRouter, por lo que no hacen falta reglas de reescritura de rutas. Se incluyen cabeceras de actualización para Vercel y Netlify. No se ha publicado ni creado un repositorio remoto.

El service worker busca actualizaciones al arrancar, al recuperar conexión y cada hora. Una actualización descargada se activa cuando la aplicación vuelve a la bienvenida, sin recargar una ficha mientras se consulta. Mecanismo basado en [vite-plugin-pwa para React](https://vite-pwa-org.netlify.app/frameworks/react).

## Instalación en tablet

1. Publicar y abrir la URL HTTPS con conexión en el navegador de la tablet.
2. Esperar «Experiencia lista» e instalar con «Añadir a pantalla de inicio» / «Instalar aplicación».
3. Abrir desde el icono y recorrer todo el catálogo.
4. Desactivar Wi-Fi, cerrar y abrir la aplicación, y verificar todas las pantallas.
5. Configurar el dispositivo con la solución de administración/kiosco elegida, inicio automático y suspensión desactivada según las políticas del stand.

`display: fullscreen` solicita pantalla completa al instalar, pero no bloquea los botones del sistema. El bloqueo real y el encendido automático requieren configuración externa de Android/MDM. Se preserva el zoom de accesibilidad; los controles táctiles evitan el doble tap de zoom con `touch-action: manipulation`.

## Pendientes de producción

Confirmar modelo de tablet, versión de Android, orientación fija, número de dispositivos, identidad y contenido final, hosting/dominio y quién configura físicamente el stand. Probar en el dispositivo real: instalación, reinicio, 72 horas sin red, toques repetidos, cambio de orientación, inactividad, recuperación de conexión y actualización desde una versión anterior. Las pruebas automatizadas no reemplazan esa validación física.
