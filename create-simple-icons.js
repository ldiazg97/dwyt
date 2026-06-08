#!/usr/bin/env node

/**
 * Generador simple de iconos sin dependencias externas
 * Crea un PNG base64 que puedes visualizar
 */

const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, 'assets', 'icons');

// Crear SVG simple
const createSvgIcon = (size, text) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0078d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#005a9e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size / 8}" fill="url(#grad1)"/>
  <text x="${size / 2}" y="${Math.round(size * 0.6)}" font-size="${Math.round(size * 0.5)}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">${text}</text>
</svg>`;

console.log('🎨 Generador Simple de Iconos');
console.log('═══════════════════════════════\n');

// Crear SVG de 256x256
console.log('📝 Creando icon.svg (256x256)...');
fs.writeFileSync(
  path.join(iconDir, 'icon.svg'),
  createSvgIcon(256, '📥')
);
console.log('✓ icon.svg creado\n');

// Crear SVG pequeño de 16x16
console.log('📝 Creando icon-16x16.svg (16x16)...');
fs.writeFileSync(
  path.join(iconDir, 'icon-16x16.svg'),
  createSvgIcon(16, '↓')
);
console.log('✓ icon-16x16.svg creado\n');

console.log('─────────────────────────────────');
console.log('✅ Archivos SVG creados\n');

console.log('🔄 PRÓXIMO PASO:\n');

console.log('Para convertir SVG a PNG e ICO, usa:\n');

console.log('OPCIÓN 1 - Convertidor Online (Recomendado)');
console.log('─────────────────────────────────────────');
console.log('1. Ve a: https://cloudconvert.com/svg-to-png');
console.log('2. Carga: assets/icons/icon.svg');
console.log('3. Descarga como PNG (256x256)');
console.log('4. Guarda como: assets/icons/icon.png');
console.log('');
console.log('5. Ve a: https://convertio.co/png-ico/');
console.log('6. Carga: icon.png');
console.log('7. Descarga como ICO');
console.log('8. Guarda como: assets/icons/icon.ico');
console.log('');
console.log('9. Para icon-16x16.png, redimensiona icon.png a 16x16\n');

console.log('OPCIÓN 2 - FFmpeg (si lo tienes)');
console.log('──────────────────────────────');
console.log('ffmpeg -i assets/icons/icon.svg -s 256x256 assets/icons/icon.png');
console.log('ffmpeg -i assets/icons/icon.svg -s 16x16 assets/icons/icon-16x16.png\n');

console.log('OPCIÓN 3 - ImageMagick (si lo tienes)');
console.log('────────────────────────────────────');
console.log('convert assets/icons/icon.svg -resize 256x256 assets/icons/icon.png');
console.log('convert assets/icons/icon.svg -resize 16x16 assets/icons/icon-16x16.png\n');

console.log('─────────────────────────────────');
console.log('\n📁 Estructura esperada:\n');
console.log('assets/icons/');
console.log('├── icon.svg          ✓ (creado)');
console.log('├── icon.png          (descargar online)');
console.log('├── icon-16x16.png    (descargar online)');
console.log('└── icon.ico          (descargar online)\n');
