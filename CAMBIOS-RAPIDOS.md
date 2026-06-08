# 🎨 GUÍA DE PERSONALIZACIÓN - RESUMEN RÁPIDO

## ✅ Ya Completado

```
✓ Carpeta assets/icons/ creada
✓ icon.ico generado (funcional ahora)
✓ SVG templates creados
✓ package.json configurado para iconos
```

---

## 📋 Cambios Principales que Puedes Hacer

### 1. Cambiar Iconos (3 archivos necesarios)

**Ubicación:** `assets/icons/`

```
icon.png          → Imagen PNG 256x256 px
icon.ico          → ✓ Ya existe (generado)
icon-16x16.png    → Favicon pequeño 16x16 px
```

**Cómo conseguir iconos:**

**OPCIÓN A: Usar Paint de Windows** ⭐ Más fácil
1. Abre Paint (`Win+R` → `mspaint`)
2. Crea imagen azul/roja/cualquier color (256x256)
3. Escribe tu inicial o dibuja algo
4. Guarda como PNG en: `assets/icons/icon.png`
5. Haz lo mismo para 16x16 en: `assets/icons/icon-16x16.png`

**OPCIÓN B: Descargar online**
- Flaticon.com - busca "download" (PNG)
- Icons8.com - busca cualquier ícono
- Unsplash.com - imágenes gratis

Redimensiona a 256x256 y guarda en `assets/icons/icon.png`

---

### 2. Cambiar Colores de la Interfaz

**Archivo:** `index.html`

Busca la sección `<style>` y cambia estos:

```css
/* Color azul de botones principal */
button {
  background: #0078d4;  ← CAMBIA ESTE
}

button:hover {
  background: #106ebe;  ← Y ESTE (más oscuro)
}

/* Fondo gris oscuro */
body {
  background: #1e1e1e;  ← CAMBIA ESTE
}

/* Fondo del área de logs */
#logs {
  background: #0d1117;  ← CAMBIA ESTE
  color: #58a6ff;       ← Color del texto
}
```

**Colores predefinidos:**
- **Azul:** `#0078d4` (Hover: `#106ebe`)
- **Rojo:** `#dc3545` (Hover: `#c82333`)
- **Verde:** `#28a745` (Hover: `#218838`)
- **Púrpura:** `#6f42c1` (Hover: `#5a32a3`)
- **Naranja:** `#fd7e14` (Hover: `#e0680f`)
- **Gris:** `#495057` (Hover: `#3c4246`)

---

### 3. Cambiar Nombre de la App

**Archivo:** `package.json`

```json
{
  "name": "mi-descargador",           ← El nombre interno
  "description": "Mi Descargador",    ← Descripción
  "author": "Mi Nombre",               ← Tu nombre
  "build": {
    "productName": "down",             ← NOMBRE DEL EXE
    "appId": "com.miempresa.miapp"    ← ID único
  }
}
```

---

### 4. Cambiar Título de la Ventana

**Archivo:** `index.html`

Busca y cambia:

```html
<title>down - YouTube Downloader</title>

<!-- Y busca el h1: -->
<h1>📥 YouTube Downloader</h1>
```

---

### 5. Cambiar Botones de Descarga

**Archivo:** `index.html`

```html
<!-- Busca estos botones: -->
<button id="downloadBtn">Descargar Video</button>
<button id="audioBtn" class="audio-only">Descargar Audio MP3</button>

<!-- Cámbialo a lo que quieras, por ejemplo: -->
<button id="downloadBtn">📹 Obtener Vídeo</button>
<button id="audioBtn" class="audio-only">🎵 Obtener MP3</button>
```

---

### 6. Cambiar Emojis en los Logs

**Archivo:** `renderer.js`

Busca estas líneas y cámbialo:

```javascript
addLog('✓ Aplicación iniciada. Pega una URL de YouTube arriba.');
addLog('Puedes descargar video completo o solo audio (MP3).');
```

Cámbialo a:

```javascript
addLog('🎬 Aplicación lista. Pega la URL del video arriba.');
addLog('Elige: Video completo 🎥 o solo Audio 🎵');
```

---

### 7. Cambiar Carpeta de Descargas

**Archivo:** `main.js`

Busca esta línea:

```javascript
downloadDir = path.join(app.getPath('downloads'), 'YouTube Downloads');
```

Cámbialo a:

```javascript
downloadDir = path.join(app.getPath('downloads'), 'Mis Videos');
// o
downloadDir = path.join(app.getPath('documents'), 'Descargas YouTube');
```

---

### 8. Cambiar Fuente (Font)

**Archivo:** `index.html` - Sección `<style>`

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* Cámbialo a: */
  font-family: Arial, sans-serif;
  /* O: */
  font-family: 'Courier New', monospace;
  /* O: */
  font-family: Georgia, serif;
}
```

---

### 9. Cambiar Tamaño de la Ventana

**Archivo:** `main.js`

```javascript
mainWindow = new BrowserWindow({
  width: 900,    ← Ancho en píxeles
  height: 900,   ← Alto en píxeles
  ...
});
```

Ejemplos:
- Pequeña: `width: 600, height: 700`
- Grande: `width: 1200, height: 1000`

---

## 🔧 Flujo de Trabajo

1. **Edita los archivos** (HTML, CSS, JS)
2. **Prueba en desarrollo:** `npm start`
3. **Verifica cambios** (Ctrl+Shift+R para limpiar caché)
4. **Genera EXE:** `npm run build:win`

---

## 📦 Para Generar down.exe Nuevo

Una vez hagas tus cambios:

```powershell
npm run build:win
```

El archivo estará en: `dist/down.exe`

---

## 💡 Cambios Más Comunes

```js
// ANTES - Azul típico
background: #0078d4;

// CAMBIO RÁPIDO - Rojo
background: #dc3545;

// CAMBIO RÁPIDO - Verde
background: #28a745;

// CAMBIO RÁPIDO - Púrpura
background: #6f42c1;
```

---

## 📁 Archivos de Referencia

```
dwyt/
├── index.html        ← Interfaz + Colores
├── renderer.js       ← Lógica + Logs
├── main.js          ← Sistema + Carpeta descargas
├── package.json     ← Nombre + Descripción
└── assets/icons/
    ├── icon.svg     ← SVG template
    ├── icon.ico     ✓ (actual)
    ├── icon.png     (actualizar)
    └── icon-16x16.png (actualizar)
```

---

## ✨ Ejemplo Completo de Cambio

**Quiero que sea rojo en lugar de azul:**

1. Abre `index.html`
2. Busca `background: #0078d4;`
3. Cámbialo a `background: #dc3545;`
4. Busca `background: #106ebe;`
5. Cámbialo a `background: #c82333;`
6. Guarda
7. `npm start` para probar
8. `npm run build:win` para generar

¡Listo!

---

**¿Necesitas ayuda con algún cambio específico?** 

Dime qué quieres cambiar y te lo hago en 2 líneas. 😊
