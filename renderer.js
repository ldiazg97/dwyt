/**
 * Renderer script para la UI.
 * - Controla el formulario de descarga
 * - Muestra logs y estados
 * - Envía eventos IPC al proceso principal
 */
// Usar API de Electron expuesta por preload.js
const { invoke, on, send } = window.electronAPI;

const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const audioBtn = document.getElementById('audioBtn');
const stopBtn = document.getElementById('stopBtn');
const logsDiv = document.getElementById('logs');
const statusDiv = document.getElementById('status');

let isDownloading = false;

// Agregar log a la pantalla
function addLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = `[${timestamp}] ${message}`;
  logsDiv.textContent += logEntry + '\n';
  logsDiv.scrollTop = logsDiv.scrollHeight;
}

// Mostrar estado
function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status show ${type}`;
  setTimeout(() => {
    statusDiv.classList.remove('show');
  }, 5000);
}

// Limpiar logs
function clearLogs() {
  logsDiv.textContent = '';
}

// Descargar video completo
downloadBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (!url) {
    showStatus('Por favor ingresa una URL', 'error');
    return;
  }

  clearLogs();
  addLog('Iniciando descarga de video...');
  downloadBtn.disabled = true;
  audioBtn.disabled = true;
  stopBtn.style.display = 'block';
  isDownloading = true;

  invoke('download-video', { url, audioOnly: false }).then(() => {
    showStatus('¡Descarga completada!', 'success');
    downloadBtn.disabled = false;
    audioBtn.disabled = false;
    stopBtn.style.display = 'none';
    isDownloading = false;
  }).catch((error) => {
    console.error('Error en descarga de video:', error);
    if (error.message !== 'Descarga cancelada') {
      addLog(`❌ Error: ${error.message}`);
      showStatus('Error en la descarga', 'error');
    }
    downloadBtn.disabled = false;
    audioBtn.disabled = false;
    stopBtn.style.display = 'none';
    isDownloading = false;
  });
});

// Descargar solo audio
audioBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  if (!url) {
    showStatus('Por favor ingresa una URL', 'error');
    return;
  }

  clearLogs();
  addLog('Iniciando descarga de audio...');
  downloadBtn.disabled = true;
  audioBtn.disabled = true;
  stopBtn.style.display = 'block';
  isDownloading = true;

  invoke('download-video', { url, audioOnly: true }).then(() => {
    showStatus('¡Audio descargado como MP3!', 'success');
    downloadBtn.disabled = false;
    audioBtn.disabled = false;
    stopBtn.style.display = 'none';
    isDownloading = false;
  }).catch((error) => {
    console.error('Error en descarga de audio:', error);
    if (error.message !== 'Descarga cancelada') {
      addLog(`❌ Error: ${error.message}`);
      showStatus('Error en la descarga', 'error');
    }
    downloadBtn.disabled = false;
    audioBtn.disabled = false;
    stopBtn.style.display = 'none';
    isDownloading = false;
  });
});

// Agregar botón de configuración de proxy
const proxyBtn = document.getElementById('proxybtn');
const proxyConfigDiv = document.getElementById('proxyConfig');
const proxyAddressInput = document.getElementById('proxyAddress');
const proxyUserInput = document.getElementById('username');
const proxyPassInput = document.getElementById('password');
const saveProxyBtn = document.getElementById('saveProxyBtn');
const cancelProxyBtn = document.getElementById('cancelProxyBtn');

proxyBtn.addEventListener('click', () => {
  proxyConfigDiv.style.display = proxyConfigDiv.style.display === 'none' ? 'block' : 'none';
});

saveProxyBtn.addEventListener('click', () => {
  const proxyType = 'http';
  const proxyAddress = proxyAddressInput.value.trim();
  const username = proxyUserInput.value.trim();
  const password = proxyPassInput.value;

  if (!proxyAddress) {
    showStatus('Por favor ingresa la dirección del proxy', 'error');
    return;
  }

  invoke('save-proxy', { proxyType, proxyAddress, username, password })
    .then(() => {
      showStatus('Proxy guardado correctamente', 'success');
      addLog(`Proxy configurado: http://${proxyAddress}`);
      proxyConfigDiv.style.display = 'none';
    })
    .catch((error) => {
      console.error('Error guardando proxy:', error);
      showStatus('No se pudo guardar la configuración del proxy', 'error');
      addLog(`Error guardando proxy: ${error.message}`);
    });
});

cancelProxyBtn.addEventListener('click', () => {
  proxyConfigDiv.style.display = 'none';
});

// Cargar configuración de proxy guardada al iniciar
invoke('load-proxy')
  .then((proxyConfig) => {
    if (proxyConfig && proxyConfig.proxyAddress) {
      proxyAddressInput.value = proxyConfig.proxyAddress || '';
      proxyUserInput.value = proxyConfig.username || '';
      proxyPassInput.value = proxyConfig.password || '';
      addLog('Configuración de proxy cargada.');
    } else {
      addLog('No hay proxy configurado.');
    }
  })
  .catch((error) => {
    console.error('Error cargando proxy:', error);
    addLog('No se pudo cargar la configuración del proxy.');
});

// Escuchar logs desde el proceso principal
on('download-log', (message) => {
  addLog(message);
});

// Manejo de errores
window.addEventListener('error', (event) => {
  console.error('Error en ventana:', event.error);
  addLog(`Error del sistema: ${event.error?.message}`);
});

// Inicializar
console.log('Renderer listo');
addLog('✓ Aplicación iniciada. Pega una URL de YouTube arriba.');
addLog('Puedes descargar video completo o solo audio (MP3).');

// Botón de parada
stopBtn.addEventListener('click', () => {
  addLog('⏹️ Deteniendo descarga...');
  invoke('stop-download', {});
});

// Permitir descargar con Enter
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !isDownloading) {
    downloadBtn.click();
  }
});
