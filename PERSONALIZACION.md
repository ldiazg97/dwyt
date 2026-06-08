# 🎨 PERSONALIZACIÓN DE LA APLICACIÓN

## Cambiar Iconos

### Estructura de carpetas
```
dwyt/
├── assets/
│   └── icons/
│       ├── icon.png          ← Icono principal (256x256)
│       ├── icon.ico          ← Icono ejecutable Windows
│       └── icon-16x16.png    ← Favicon de la ventana
└── ...
```

### Pasos para cambiar iconos

#### OPCIÓN 1: Usar Convertidor Online (⭐ Más rápido)

1. Crea una imagen PNG de 256x256 (usa Paint, Photoshop, Canva, etc.)
2. Ve a: https://convertio.co/png-ico/
3. Sube tu PNG
4. Descarga como `.ico`
5. Copia los archivos en `assets/icons/`:
   - `icon.png` → Tu imagen original
   - `icon.ico` → Descargado de convertio
   - `icon-16x16.png` → Redimensiona a 16x16 con Paint o Photoshop

#### OPCIÓN 2: Con Script Node.js

```bash
npm install sharp
node generate-icons.js
```

#### OPCIÓN 3: Descargar iconos ya hechos

- Flaticon: https://www.flaticon.com (busca "download" o "youtube")
- Icons8: https://icons8.com
- IconFinder: https://www.iconfinder.com

Descarga una imagen PNG 256x256 y guarda como `icon.png`

---

## Cambiar Nombre y Descripción

Edita `package.json`:

```json
{
  "name": "mi-descargador",
  "description": "Mi Descargador de YouTube",
  "author": "Tu Nombre",
  "build": {
    "productName": "Mi App",
    "appId": "com.miempresa.miapp"
  }
}
```

---

## Cambiar Colores de la Interfaz

Edita `index.html` en la sección `<style>`:

### Cambiar color principal

Busca esta línea y cámbiala:

```css
button {
  background: #0078d4;  /* ← Azul por defecto */
}

button:hover {
  background: #106ebe;  /* ← Azul oscuro al pasar mouse */
}
```

**Colores sugeridos:**
- Azul: `#0078d4`, Hover: `#106ebe`
- Rojo: `#dc3545`, Hover: `#c82333`
- Verde: `#28a745`, Hover: `#218838`
- Púrpura: `#6f42c1`, Hover: `#5a32a3`
- Naranja: `#fd7e14`, Hover: `#e0680f`

### Cambiar fondo

```css
body {
  background: #1e1e1e;  /* ← Gris oscuro */
}
```

---

## Cambiar Título y Descripción

Edita `index.html`:

```html
<title>down - YouTube Downloader</title>
```

Y en el HTML:

```html
<h1>📥 Tu Nombre de App</h1>
```

---

## Cambiar Iconos de Botones

En `renderer.js`, busca donde dice:

```javascript
addLog('✓ Aplicación iniciada. Pega una URL de YouTube arriba.');
addLog('Puedes descargar video completo o solo audio (MP3).');
mainWindow.webContents.send('download-log', '📁 Ubicación: ' + downloadDir);
```

Cambia los emojis:
- `📥` → Descarga
- `📹` → Video
- `🎵` → Audio
- `⚙️` → Configuración
- `✓` → Éxito
- `❌` → Error

---

## Cambiar Carpeta de Descargas

Edita `main.js`:

Busca esta línea:
```javascript
downloadDir = path.join(app.getPath('downloads'), 'YouTube Downloads');
```

Cámbialo a:
```javascript
downloadDir = path.join(app.getPath('downloads'), 'Mis Descargas');
```

---

## Cambiar Botones de Descarga

En `index.html`:

```html
<!-- Cambiar el texto de los botones -->
<button id="downloadBtn">Descargar Video</button>
<button id="audioBtn" class="audio-only">Descargar Audio MP3</button>

<!-- Cambiar a tu preferencia, por ejemplo: -->
<button id="downloadBtn">Obtener Vídeo</button>
<button id="audioBtn" class="audio-only">Obtener MP3</button>
```

---

## Cambiar Fuente (Font)

En `index.html` en la sección `<style>`:

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  /* ← Cambiar aquí */
}
```

**Otras opciones:**
- `'Arial', sans-serif`
- `'Verdana', sans-serif`
- `'Georgia', serif`
- `'Comic Sans MS', cursive`

---

## Cambiar Tamaño de Ventana

Edita `main.js`:

```javascript
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,    /* ← Ancho */
    height: 900,   /* ← Alto */
    ...
  });
};
```

---

## Cambiar Nombre del Ejecutable

En `package.json`:

```json
"build": {
  "productName": "down",  /* ← El nombre del .exe */
}
```

Si cambias a `"productName": "YouTube-DL"`, se generará `YouTube-DL.exe`

---

## Resumen Rápido de Cambios Visuales

1. **Iconos**: Copia en `assets/icons/`
2. **Colores**: Edita `<style>` en `index.html`
3. **Nombre**: Edita `package.json` → `productName`
4. **Descripción**: Edita `package.json` → `description`
5. **Título ventana**: Edita `<title>` en `index.html`
6. **Botones**: Edita en `index.html` y `renderer.js`

---

## Después de cambios

Para ver cambios en desarrollo:
```bash
npm start
```

Para generar nuevo `down.exe`:
```bash
npm run build:win
```

---

**💡 Tip**: Haz cambios pequeños, prueba con `npm start`, luego genera el `.exe`

