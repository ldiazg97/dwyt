# YouTube Downloader - Aplicación Portable

Una aplicación portable de escritorio para descargar videos y audio de YouTube usando Electron, `yt-dlp` y `ffmpeg`.

## 🌐 Repositorio

- GitHub: https://github.com/ldiazg97/dwyt

## 🚀 Instalación local

1. Copia los ejecutables necesarios en `bin/`:

```bash
bin/yt-dlp.exe
bin/ffmpeg.exe  # opcional, pero recomendado para conversión de audio
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta la app en modo desarrollo:

```bash
npm start
```

4. Genera el paquete portátil para Windows:

```bash
npm run build:win
```

El instalador o ejecutable estará en `dist/`.

## 📋 Funcionalidades

- Descarga de video completo desde YouTube
- Descarga de audio en formato MP3
- Soporte de proxy HTTP con autenticación
- Barra de progreso para descargas en curso
- Logs en pantalla para seguimiento de progreso
- Botón para detener descargas en curso
- Conversión de audio con FFmpeg cuando está disponible

## 🛠️ Proxy HTTP

La aplicación permite configurar un proxy HTTP con usuario y contraseña.

- Abre la sección de proxy con el botón `🌐 Configurar un proxy`
- Ingresa la dirección del proxy en el formato `host:puerto`
- Ingresa usuario y contraseña si tu red requiere autenticación
- La configuración se guarda automáticamente
- Si ya no necesitas usar el proxy, puedes eliminarlo con el botón `🧹 Eliminar proxy` dentro de la configuración.
- El botón de eliminar proxy solo se muestra cuando hay una configuración guardada.

Si no hay proxy configurado, la app funciona en modo directo.

## 📁 Estructura del proyecto

- `main.js` — Proceso principal de Electron. Ejecuta `yt-dlp`, gestiona descargas y aplica proxy.
- `renderer.js` — Lógica de la interfaz de usuario y comunicación IPC.
- `preload.js` — Puente seguro entre el renderer y el proceso principal.
- `index.html` — UI HTML/CSS.
- `bin/` — Contiene los ejecutables `yt-dlp.exe` y `ffmpeg.exe`.

## 📦 Empaquetado

La app es portable y puede empacarse en un ejecutable para Windows.

- `npm run build:win` crea el paquete sin publicar.
- El ejecutable resultante puede llevarse a otra PC.

## ⚙️ Requisitos

- Windows 10/11 64-bit
- Node.js (solo para desarrollo)
- `yt-dlp.exe` en `bin/`
- `ffmpeg.exe` en `bin/` (recomendado)

## 🔧 Configuración del repositorio

- El campo `author` en `package.json` ya está configurado para `Lester Diaz <lesterd495@gmail.com>`.
- El repositorio apunta a `https://github.com/ldiazg97/dwyt.git`.

## ➕ Buenas prácticas Git

Añade el remoto cuando tengas el repo creado en GitHub:

```bash
git remote add origin https://github.com/ldiazg97/dwyt.git
```

Empuja los cambios con:

```bash
git push -u origin main
```

## 📝 Notas finales

- La configuración del proxy se almacena en el directorio de datos de la app.
- Si deseas distribuir la app, incluye `bin/yt-dlp.exe` y `bin/ffmpeg.exe`.
