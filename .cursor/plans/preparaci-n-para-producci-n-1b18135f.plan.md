<!-- 1b18135f-b629-487b-80c2-321ba2021e9c 1b9d8fd4-4f3e-43da-b949-2774ec2042bf -->
# Plan para Subir tu Primera Página Web a Internet

## ¿Qué es esto?

Este es un plan paso a paso para subir tu página de React a internet. Es simple, directo y pensado para alguien que está haciendo su primer proyecto. No necesitas saber backend ni cosas complicadas.

## Estado Actual de tu Proyecto

- ✅ Tu página funciona en tu computadora
- ✅ Tienes navegación, carrito y formulario
- ⚠️ El formulario solo simula el envío (no envía emails reales)
- ⚠️ Las imágenes de productos vienen de internet (Unsplash)
- ⚠️ El número de WhatsApp está escrito directo en el código
- ⚠️ El título de la página dice "my-project"

## Lo que vamos a hacer

1. Arreglar cosas básicas del proyecto (título, nombre, etc.)
2. Hacer que el formulario funcione de verdad (sin hacer backend)
3. Mover las imágenes a tu proyecto (para que no dependas de internet)
4. Subir tu página a internet gratis (Vercel o Netlify)
5. Verificar que todo funciona

---

## PASO 1: Ajustar los Datos Básicos del Proyecto

**¿Qué hacer?**

- Cambiar el nombre del proyecto en `package.json`
- Cambiar el título en `index.html` 
- Agregar una descripción básica en `index.html`
- Opcional: cambiar el favicon (el ícono del navegador)

**Archivos a modificar:**

- `package.json`: Cambiar `"name": "my-project"` por `"name": "pagina-marcelo"`
- `index.html`: Cambiar `<title>my-project</title>` por `<title>Marcelo Luchetta - Equipamiento Odontológico</title>`
- `index.html`: Agregar `<meta name="description" content="Tu proveedor de confianza en equipamiento odontológico profesional en Argentina">`

**Cómo verificar:**

- Ejecuta `npm run dev` y mira la pestaña del navegador, debe decir "Marcelo Luchetta" en lugar de "my-project"

---

## PASO 2: Hacer que el Formulario Envíe Emails de Verdad

**¿Qué hacer?**

Usar un servicio gratuito para enviar emails sin hacer backend. Opciones fáciles:

- **Formspree** (recomendado, muy simple)
- **FormSubmit** (sin crear cuenta)
- **EmailJS** (un poco más configuración)

**Cómo hacerlo (con Formspree como ejemplo):**

1. Ve a https://formspree.io y crea una cuenta gratis
2. Crea un nuevo formulario y copia la URL que te dan (algo como `https://formspree.io/f/xxxxx`)
3. En `src/pages/Contact.jsx`, reemplaza el `setTimeout` de prueba por un `fetch` real:
   ```javascript
   // En lugar de: await new Promise(resolve => setTimeout(resolve, 1000));
   const response = await fetch('https://formspree.io/f/TU_URL_AQUI', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```


**Archivos a modificar:**

- `src/pages/Contact.jsx`: Líneas 63-76 (donde está el TODO)

**Cómo verificar:**

- Envía un mensaje de prueba desde tu formulario
- Revisa tu email (o el panel de Formspree) para ver si llegó

---

## PASO 3: Guardar las Imágenes de Productos en tu Proyecto

**¿Por qué?**

Actualmente las imágenes vienen de Unsplash (internet). Si Unsplash cae o cambia las URLs, tus imágenes desaparecerán.

**¿Qué hacer?**

1. Descarga las 6 imágenes de productos (puedes usar las mismas URLs de Unsplash pero descárgalas)
2. Guárdalas en `src/assets/images/productos/`
3. Actualiza `src/data/products.js` para importar las imágenes locales en lugar de usar URLs

**Pasos detallados:**

1. Crea la carpeta: `src/assets/images/productos/`
2. Descarga las imágenes y renómbralas: `turbina.jpg`, `autoclave.jpg`, `lampara.jpg`, etc.
3. En `src/data/products.js`, cambia las URLs por imports:
   ```javascript
   import turbina from '../assets/images/productos/turbina.jpg';
   // ... más imports
   
   // Y en el array, usa:
   image: turbina
   ```


**Archivos a modificar:**

- `src/data/products.js`: Cambiar todas las URLs de Unsplash por imports locales

**Cómo verificar:**

- Recarga la página de productos y verifica que las imágenes se vean bien

---

## PASO 4: Opcional - Usar Variables de Entorno para Datos Sensibles

**¿Qué hacer?**

Si en el futuro necesitas cambiar el número de WhatsApp o la URL del formulario sin tocar código, usa variables de entorno.

**Cómo hacerlo:**

1. Crea un archivo `.env` en la raíz del proyecto:
   ```
   VITE_WHATSAPP=5491152498558
   VITE_CONTACT_URL=https://formspree.io/f/tu-url
   ```

2. Agrega `.env` al `.gitignore` (para que no se suba a GitHub)
3. En `src/pages/Cart.jsx`, cambia `const phone = '5491152498558'` por `const phone = import.meta.env.VITE_WHATSAPP`
4. En `src/pages/Contact.jsx`, usa la variable para la URL del formulario

**Archivos a modificar:**

- Crear `.env` (y agregarlo a `.gitignore`)
- `src/pages/Cart.jsx`: Línea 39
- `src/pages/Contact.jsx`: Usar variable en fetch

**Nota:** Este paso es opcional. Si no lo haces, tu página funcionará igual, solo que tendrás que editar código para cambiar esos valores.

---

## PASO 5: Crear una Página 404 Personalizada

**¿Qué hacer?**

Cuando alguien visite una URL que no existe (ej: `/pagina-inexistente`), muestra una página bonita en lugar del error del navegador.

**Cómo hacerlo:**

1. Crea `src/pages/NotFound.jsx` con un componente simple que diga "Página no encontrada" y un botón para volver al inicio
2. En `src/App.jsx`, agrega una ruta al final: `<Route path="*" element={<NotFound />} />`

**Archivos a crear/modificar:**

- Crear `src/pages/NotFound.jsx`
- Modificar `src/App.jsx`: Agregar import y ruta catch-all al final

**Cómo verificar:**

- Visita `http://localhost:5173/pagina-que-no-existe` y debe mostrarse tu página 404

---

## PASO 6: Preparar el Proyecto para Subir (Build)

**¿Qué hacer?**

Ejecutar el comando que genera la versión optimizada de tu proyecto para producción.

**Pasos:**

1. Abre la terminal en la carpeta de tu proyecto
2. Ejecuta: `npm run build`
3. Si todo sale bien, se creará una carpeta `dist` con tu página lista para subir

**Qué revisar:**

- No debe haber errores en la terminal
- Debe aparecer la carpeta `dist`
- Puedes probar localmente con: `npm run preview`

**Problemas comunes:**

- Si hay errores, léelos y corrígelos (generalmente son problemas de imports o rutas)

---

## PASO 7: Subir tu Página a Internet (Gratis)

### Opción A: Vercel (Recomendada - La más fácil)

**Pasos:**

1. Ve a https://vercel.com y crea una cuenta con GitHub (o email)
2. Instala Vercel CLI en tu computadora:
   ```bash
   npm install -g vercel
   ```

3. En la terminal, ve a tu carpeta del proyecto y ejecuta:
   ```bash
   vercel
   ```

4. Responde las preguntas (presiona Enter para los valores por defecto)
5. ¡Listo! Te dará una URL como `https://tu-proyecto.vercel.app`

**Ventajas:**

- Gratis
- Muy fácil
- Actualiza automáticamente cuando haces cambios (si conectas con GitHub)

### Opción B: Netlify (También muy fácil)

**Pasos:**

1. Ve a https://netlify.com y crea una cuenta
2. Arrastra la carpeta `dist` directamente a la página de Netlify
3. ¡Listo! Te dará una URL como `https://tu-proyecto.netlify.app`

**Ventajas:**

- Gratis
- Súper simple (solo arrastrar y soltar)
- También puedes conectar con GitHub para actualizaciones automáticas

### Opción C: GitHub Pages (Gratis, un poco más trabajo)

**Pasos:**

1. Crea un repositorio en GitHub
2. Sube tu código (pero no la carpeta `dist`)
3. Sigue la guía de GitHub Pages para proyectos Vite/React
4. Te dará una URL como `https://tu-usuario.github.io/tu-proyecto`

**Nota:** GitHub Pages requiere configurar el base path en `vite.config.js`

---

## PASO 8: Verificar que Todo Funciona en Producción

**Checklist de verificación:**

- [ ] La página carga correctamente
- [ ] Las imágenes se ven bien
- [ ] La navegación funciona (todos los links)
- [ ] El carrito funciona (agregar, quitar productos)
- [ ] El formulario de contacto funciona (envía emails reales)
- [ ] El botón de WhatsApp del carrito abre WhatsApp correctamente
- [ ] La página se ve bien en móvil (abre en tu celular)
- [ ] La página 404 funciona (visita una URL que no existe)

**Si algo no funciona:**

- Revisa la consola del navegador (F12) para ver errores
- Revisa los logs en Vercel/Netlify
- Verifica que las variables de entorno estén configuradas (si las usaste)

---

## TODOs (Tareas Pendientes)

1. **setup-proyecto**: Cambiar nombre en package.json, título en index.html y agregar meta description
2. **formulario-real**: Conectar Contact.jsx con Formspree o servicio similar para enviar emails reales
3. **imagenes-locales**: Descargar imágenes de productos y actualizar products.js con imports locales
4. **variables-entorno** (opcional): Crear .env con VITE_WHATSAPP y VITE_CONTACT_URL, y usarlas en Cart.jsx y Contact.jsx
5. **pagina-404**: Crear NotFound.jsx y agregar ruta catch-all en App.jsx
6. **build-produccion**: Ejecutar `npm run build` y verificar que no hay errores
7. **subir-hosting**: Subir a Vercel, Netlify o GitHub Pages siguiendo las instrucciones
8. **verificar-produccion**: Probar todos los features en la URL de producción

---

## Tips Finales

**Antes de subir:**

- Prueba TODO en tu computadora primero (`npm run dev`)
- Verifica que no tengas datos sensibles en el código (como contraseñas)
- Haz un backup de tu código (sube a GitHub o haz un ZIP)

**Después de subir:**

- Comparte tu URL con amigos para que la prueben
- Verifica que funcione en diferentes navegadores (Chrome, Firefox, Safari)
- Si haces cambios, vuelve a hacer build y subir (o conecta con GitHub para actualización automática)

**Si algo sale mal:**

- Lee los mensajes de error, suelen ser claros
- Busca en Google el error específico
- Revisa la documentación de Vercel/Netlify
- Puedes volver a hacer build y subir las veces que necesites

¡Mucha suerte con tu primer proyecto en producción! 🚀

### To-dos

- [x] Actualizar package.json (nombre, versión), index.html (metadata SEO completa, favicon), y vite.config.js (optimizaciones de build)
- [x] Crear .env.example, .env.local, .env.production y actualizar código para usar variables de entorno (API URL, WhatsApp number, etc.)
- [ ] Ajustar package.json, index.html y favicon
- [ ] Crear .env.example y leer vars en Cart/Contact
- [ ] Conectar Contact.jsx con servicio externo (Formspree, etc.)
- [ ] Mover imágenes a assets locales y actualizar products.js
- [ ] Agregar meta tags básicos y ruta 404 en App.jsx
- [ ] Ejecutar build, pruebas manuales y backup final