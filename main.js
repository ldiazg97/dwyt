/**
 * Main process de Electron para la aplicación de descarga.
 * - Inicia la ventana principal
 * - Ejecuta yt-dlp para descargar video/audio
 * - Maneja proxy HTTP con autenticación
 * - Permite cancelar descargas en curso
 */
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

/**
 * Termina un proceso hijo y su árbol de procesos en Windows o UNIX.
 * Esto asegura que la descarga se detenga completamente.
 */
const killProcessTree = (proc) => {
  if (!proc || !proc.pid) {
    return;
  }

  try {
    if (process.platform === 'win32') {
      const killer = spawn('taskkill', ['/PID', proc.pid.toString(), '/T', '/F']);
      killer.on('error', (err) => {
        console.error('Error al ejecutar taskkill:', err);
      });
    } else {
      process.kill(-proc.pid, 'SIGTERM');
      process.kill(proc.pid, 'SIGTERM');
    }
  } catch (error) {
    console.error('Error matando proceso:', error);
  }
}


let mainWindow;
let downloadDir;
let currentProcess = null; // Guardar el proceso actual para poder detenerlo

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools(); // Para debugging
};

app.whenReady().then(() => {
  createWindow();

  // Crear carpeta de descargas si no existe
  downloadDir = path.join(app.getPath('downloads'), 'YouTube Downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Rutas de ejecutables
const getBinPath = (fileName) => {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app.asar.unpacked', 'bin', fileName);
  }
  return path.join(__dirname, 'bin', fileName);
};

const ytdlpPath = getBinPath('yt-dlp.exe');
const ffmpegPath = getBinPath('ffmpeg.exe');
const proxyConfigPath = path.join(app.getPath('userData'), 'proxy-config.json');

const saveProxyConfig = (config) => {
  // Guardar configuración de proxy de forma persistente
  fs.writeFileSync(proxyConfigPath, JSON.stringify(config, null, 2), 'utf8');
  return config;
};

const loadProxyConfig = () => {
  try {
    if (fs.existsSync(proxyConfigPath)) {
      const raw = fs.readFileSync(proxyConfigPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error cargando configuración de proxy:', error);
  }
  return null;
};

const buildProxyArg = (proxy) => {
  // Construye el argumento --proxy para yt-dlp
  // Solo se soporta proxy HTTP en esta versión.
  if (!proxy || !proxy.proxyAddress) return null;
  let address = proxy.proxyAddress.trim();
  if (!address) return null;

  if (address.includes('://')) {
    try {
      const parsed = new URL(address);
      address = parsed.host;
    } catch (_) {
      // Seguir usando la dirección tal cual si no es una URL válida
    }
  }

  if (!address.includes(':')) {
    address = `${address}:8080`;
  }

  const username = proxy.username?.trim();
  const password = proxy.password || '';
  const auth = username ? `${encodeURIComponent(username)}${password ? `:${encodeURIComponent(password)}` : ''}@` : '';
  const protocol = 'http://';

  return `${protocol}${auth}${address}`;
};

// Manejador IPC para descargar video
ipcMain.handle('download-video', async (event, { url, audioOnly }) => {
  return new Promise((resolve, reject) => {
    try {
      // Verificar que yt-dlp existe
      if (!fs.existsSync(ytdlpPath)) {
        const msg = `ERROR: yt-dlp.exe no encontrado en ${ytdlpPath}`;
        console.error(msg);
        mainWindow.webContents.send('download-log', msg);
        reject(new Error(msg));
        return;
      }

      let args = [
        url,
        '-o',
        path.join(downloadDir, '%(title)s.%(ext)s'),
        '--progress',
      ];

      if (audioOnly) {
        // Descargar solo audio y convertir a MP3
        args.push('-f', 'bestaudio');
        args.push('-x', '--audio-format', 'mp3', '--audio-quality', '192');
        mainWindow.webContents.send('download-log', 'Descargando audio en MP3...');
      } else {
        // Descargar video completo
        args.push('-f', 'best');
        mainWindow.webContents.send('download-log', 'Descargando video...');
      }

      // Usar ffmpeg si está disponible para mejor conversión
      if (fs.existsSync(ffmpegPath) && audioOnly) {
        args.push('--ffmpeg-location', ffmpegPath);
        mainWindow.webContents.send('download-log', 'Usando FFmpeg para conversión...');
      }

      const proxyConfig = loadProxyConfig();
      if (proxyConfig && proxyConfig.proxyAddress) {
        const proxyArg = buildProxyArg(proxyConfig);
        if (proxyArg) {
          args.push('--proxy', proxyArg);
          mainWindow.webContents.send('download-log', `Usando proxy: ${proxyArg}`);
        }
      }

      mainWindow.webContents.send('download-log', `URL: ${url}`);
      mainWindow.webContents.send('download-log', `Guardar en: ${downloadDir}`);
      mainWindow.webContents.send('download-log', '---');

      const ytdlp = spawn(ytdlpPath, args);
      currentProcess = ytdlp; // Guardar referencia del proceso

      let lastOutput = '';

      ytdlp.stdout.on('data', (data) => {
        const output = data.toString();
        mainWindow.webContents.send('download-log', output.trim());
        lastOutput = output;
      });

      ytdlp.stderr.on('data', (data) => {
        const error = data.toString();
        mainWindow.webContents.send('download-log', error.trim());
      });

      ytdlp.on('close', (code) => {
        currentProcess = null; // Limpiar referencia
        if (code === 0) {
          mainWindow.webContents.send('download-log', '---');
          mainWindow.webContents.send(
            'download-log',
            '✓ Descarga completada exitosamente!'
          );
          mainWindow.webContents.send(
            'download-log',
            `📁 Ubicación: ${downloadDir}`
          );
          resolve();
        } else if (code === 143 || code === -15) {
          // Código de terminación normal (SIGTERM)
          mainWindow.webContents.send('download-log', '---');
          mainWindow.webContents.send('download-log', '⏹️ Descarga cancelada por el usuario');
          reject(new Error('Descarga cancelada'));
        } else {
          mainWindow.webContents.send(
            'download-log',
            `✗ Error: El proceso terminó con código ${code}`
          );
          reject(new Error(`Proceso terminó con código ${code}`));
        }
      });

      ytdlp.on('error', (err) => {
        console.error('Error ejecutando yt-dlp:', err);
        currentProcess = null;
        mainWindow.webContents.send('download-log', `✗ Error: ${err.message}`);
        if (err.code === 'ENOENT') {
          mainWindow.webContents.send(
            'download-log',
            `yt-dlp.exe no encontrado en: ${ytdlpPath}`
          );
          mainWindow.webContents.send(
            'download-log',
            'Verifica que esté en la carpeta /bin/'
          );
        }
        reject(err);
      });
    } catch (error) {
      console.error('Error en try-catch:', error);
      currentProcess = null;
      mainWindow.webContents.send('download-log', `✗ Error catastrófico: ${error.message}`);
      mainWindow.webContents.send('download-log', `Stack: ${error.stack}`);
      reject(error);
    }
  });
});

// Manejador IPC para guardar configuración de proxy
ipcMain.handle('save-proxy', async (event, proxyConfig) => {
  if (!proxyConfig || !proxyConfig.proxyAddress) {
    throw new Error('Dirección de proxy inválida');
  }

  saveProxyConfig(proxyConfig);
  return { success: true };
});

// Manejador IPC para cargar configuración de proxy
ipcMain.handle('load-proxy', async () => {
  return loadProxyConfig();
});

// Manejador IPC para detener descarga
ipcMain.handle('stop-download', async (event) => {
  if (currentProcess) {
    console.log('Terminando proceso...');
    killProcessTree(currentProcess);
    currentProcess = null;
    return { success: true };
  }
  return { success: false, message: 'No hay descarga activa' };
});

// Verificar rutas al iniciar
app.on('ready', () => {
  console.log('=== Verificación de rutas ===');
  console.log(`yt-dlp: ${ytdlpPath}`);
  console.log(`  Existe: ${fs.existsSync(ytdlpPath) ? '✓ SÍ' : '✗ NO'}`);
  console.log(`ffmpeg: ${ffmpegPath}`);
  console.log(`  Existe: ${fs.existsSync(ffmpegPath) ? '✓ SÍ' : '✗ NO'}`);
  console.log(`Dir de descargas: ${downloadDir}`);
});