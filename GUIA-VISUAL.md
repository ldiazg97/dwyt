# 🎯 GUÍA VISUAL DE CAMBIOS

## Cambios por Archivos

### 📄 index.html (Interfaz y Estilos)

```html
<!-- 1. Cambiar Título -->
<title>down - YouTube Downloader</title>
              ↓ cámbialo a
<title>Mi App - Mi Nombre</title>

<!-- 2. Cambiar Encabezado -->
<h1>📥 YouTube Downloader</h1>
         ↓ cámbialo a
<h1>🎬 Mi Aplicación</h1>

<!-- 3. Cambiar Botones -->
<button id="downloadBtn">Descargar Video</button>
                          ↓ cámbialo a
<button id="downloadBtn">📹 Obtener Video</button>

<!-- 4. Favicon -->
<link rel="icon" type="image/png" href="assets/icons/icon-16x16.png" />
                                          ↓ ya configurado
```

### 🎨 Colores en index.html `<style>`

```css
/* Azul estándar */
button {
  background: #0078d4;
}
button:hover {
  background: #106ebe;
}

/* Cambia a ROJO */
button {
  background: #dc3545;  ← Rojo
}
button:hover {
  background: #c82333;  ← Rojo oscuro
}

/* Cambia a VERDE */
button {
  background: #28a745;  ← Verde
}
button:hover {
  background: #218838;  ← Verde oscuro
}

/* Otros colores: */
#0078d4 → Azul (original)
#dc3545 → Rojo
#28a745 → Verde
#6f42c1 → Púrpura
#fd7e14 → Naranja
#17a2b8 → Cyan
```

---

### 📦 package.json (Nombre y Info)

```json
{
  "name": "dwyt",
           ↓ cámbialo a
  "name": "mi-app-youtube",

  "description": "YouTube Downloader - Portable Application",
                  ↓ cámbialo a
  "description": "Mi descargador personal de videos",

  "author": "lester",
             ↓ cámbialo a
  "author": "Tu Nombre",

  "build": {
    "productName": "down",
                   ↓ cámbialo a
    "productName": "YouTube-DL",    ← Así se llamará down.exe

    "appId": "com.ytdownloader.down",
              ↓ cámbialo a
    "appId": "com.miempresa.miapp"
  }
}
```

---

### 🎬 main.js (Sistema)

```javascript
/* Cambiar carpeta de descargas */
downloadDir = path.join(app.getPath('downloads'), 'YouTube Downloads');
                                                    ↓ cámbialo a
downloadDir = path.join(app.getPath('downloads'), 'Mis Videos');

/* Cambiar tamaño de ventana */
mainWindow = new BrowserWindow({
  width: 900,    ← Ancho actual (píxeles)
  height: 900,   ← Alto actual (píxeles)
  // Cambiar a:
  width: 1000,
  height: 1100,
});

/* Habilitar/Deshabilitar DevTools */
mainWindow.webContents.openDevTools(); // ← Esto abre la consola
// Para deshabilitarla, comenta la línea:
// mainWindow.webContents.openDevTools();
```

---

### 📝 renderer.js (Logs y Mensajes)

```javascript
/* Cambiar mensajes iniciales */
addLog('✓ Aplicación iniciada. Pega una URL de YouTube arriba.');
addLog('Puedes descargar video completo o solo audio (MP3).');

// Cámbialo a:
addLog('🎬 App lista. Pega URL arriba.');
addLog('Opciones: 🎥 Vídeo o 🎵 Audio');

/* Cambiar emojis */
'✓' → Éxito
'❌' → Error
'📁' → Carpeta
'⏳' → Descargando
'🎬' → Video
'🎵' → Audio
```

---

### 🖼️ assets/icons/ (Iconos)

```
assets/icons/
├── icon.png          → Imagen principal (256x256)
├── icon.ico          → Icono ejecutable
└── icon-16x16.png    → Favicon

Cómo generar:
1. Paint → Nuevo (256x256)
2. Dibuja/pega imagen
3. Guardar como PNG → icon.png
4. Repite para 16x16
```

---

## 🎨 Tabla de Colores Rápidos

| Color | Código | Hover | Uso |
|-------|--------|-------|-----|
| Azul | #0078d4 | #106ebe | Botones principales |
| Rojo | #dc3545 | #c82333 | Advertencias |
| Verde | #28a745 | #218838 | Éxito |
| Púrpura | #6f42c1 | #5a32a3 | Alternativo |
| Naranja | #fd7e14 | #e0680f | Descarga |
| Cyan | #17a2b8 | #138496 | Información |

---

## ✨ Cambios Más Populares

### 1️⃣ Todo a Rojo

**index.html:**
```css
#0078d4 → #dc3545
#106ebe → #c82333
```

### 2️⃣ Cambiar Nombre

**package.json:**
```json
"productName": "mi-app"
```

### 3️⃣ Cambiar Carpeta Descargas

**main.js:**
```javascript
downloadDir = path.join(app.getPath('downloads'), 'Mis Vídeos');
```

### 4️⃣ Ampliar Ventana

**main.js:**
```javascript
width: 1200,
height: 1000,
```

### 5️⃣ Cambiar Fuente

**index.html `<style>`:**
```css
font-family: Georgia, serif;  /* en lugar de Segoe UI */
```

---

## 📋 Checklist de Personalización

- [ ] Cambié el nombre en `package.json`
- [ ] Cambié los colores en `index.html`
- [ ] Cambié la carpeta de descargas en `main.js`
- [ ] Puse mis iconos en `assets/icons/`
- [ ] Probé con `npm start`
- [ ] Generé `down.exe` con `npm run build:win`

---

## 🔄 Ciclo de Desarrollo

```
1. EDITAR
   └─ Cambias código/estilos

2. PROBAR
   └─ npm start
   └─ Ctrl+Shift+R (limpiar caché)

3. VERIFICAR
   └─ ¿Se ve bien?
   └─ ¿Funcionan los botones?

4. GENERAR
   └─ npm run build:win
   └─ Esperas...

5. USAR
   └─ dist/down.exe ✓
```

---

## 🎯 Ejemplo Paso a Paso

### Quiero que sea todo verde y llamarse "VideoGrabber"

**Paso 1: Cambiar nombre**
```
Abre: package.json
Busca: "productName": "down"
Cámbialo a: "productName": "VideoGrabber"
Guarda
```

**Paso 2: Cambiar colores**
```
Abre: index.html
Busca: background: #0078d4;
Cámbialo a: background: #28a745;

Busca: background: #106ebe;
Cámbialo a: background: #218838;

Guarda
```

**Paso 3: Probar**
```
En terminal:
npm start

Verifica que se ve bien (verde)
```

**Paso 4: Generar**
```
En terminal:
npm run build:win

Espera a que termine...
Archivo generado: dist/VideoGrabber.exe ✓
```

---

## 📝 Notas Importantes

- **No cambies** `main.js`, `renderer.js` a menos que sepas código
- **Cambia:** Colores, nombres, emojis, tamaños
- **Siempre:** Prueba con `npm start` antes de generar
- **Limpia caché:** Ctrl+Shift+R en la ventana Electron
- **Debes tener:** yt-dlp.exe y ffmpeg.exe en `bin/`

---

## 🆘 Si Algo Falla

1. Cierra `npm start` (Ctrl+C)
2. Abre DevTools en el navegador (F12)
3. Mira la consola para errores
4. Busca el error en Google
5. O dime qué error ves

---

**¡Ahora estás listo para personalizar! 🎉**

