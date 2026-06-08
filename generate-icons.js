#!/usr/bin/env node

/**
 * Script para generar iconos para la aplicación
 * Ejecutar: node generate-icons.js
 * 
 * Requiere: sharp (npm install sharp)
 * 
 * Este script crea iconos en diferentes tamaños para Windows
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Generador de Iconos - YouTube Downloader');
console.log('============================================\n');

const iconDir = path.join(__dirname, 'assets', 'icons');

// Crear directorio si no existe
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
  console.log(`✓ Carpeta creada: ${iconDir}\n`);
}

// Instrucciones si no tiene sharp instalado
console.log('OPCIÓN 1: Generar iconos automáticamente (requiere sharp)');
console.log('──────────────────────────────────────────────────────\n');
console.log('Instala sharp:');
console.log('  npm install sharp\n');
console.log('Luego ejecuta este script de nuevo.\n\n');

console.log('OPCIÓN 2: Usar iconos por defecto (RECOMENDADO AHORA)');
console.log('───────────────────────────────────────────────────\n');

// Crear iconos simples en SVG y convertir a PNG
const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="32" fill="#0078d4"/>
  <text x="128" y="140" font-size="80" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
    📥
  </text>
  <text x="128" y="180" font-size="30" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
    down
  </text>
</svg>`;

console.log('Creando archivo de ícono SVG temporal...');

// Guardar como archivo SVG temporal
const svgPath = path.join(iconDir, 'icon.svg');
fs.writeFileSync(svgPath, svgIcon);
console.log(`✓ ${svgPath}\n`);

console.log('📋 ARCHIVOS NECESARIOS:');
console.log('────────────────────────\n');

console.log('Necesitas estos archivos en: assets/icons/\n');

const requiredFiles = [
  {
    name: 'icon.png',
    size: '256x256',
    desc: 'Icono principal (PNG)'
  },
  {
    name: 'icon.ico',
    size: '256x256',
    desc: 'Icono ejecutable Windows (ICO)'
  },
  {
    name: 'icon-16x16.png',
    size: '16x16',
    desc: 'Favicon pequeño (PNG)'
  }
];

requiredFiles.forEach((file, i) => {
  console.log(`${i + 1}. ${file.name}`);
  console.log(`   Tamaño: ${file.size}`);
  console.log(`   Descripción: ${file.desc}\n`);
});

console.log('\n🎨 CÓMO CREAR LOS ICONOS:');
console.log('──────────────────────────\n');

console.log('MÉTODO 1: Convertidor Online (Más rápido)');
console.log('─────────────────────────────────────────');
console.log('1. Crea una imagen PNG de 256x256 (puedes usar Photoshop, Paint, etc.)');
console.log('2. Sube a: https://convertio.co/png-ico/');
console.log('3. Descarga como .ico\n');

console.log('MÉTODO 2: Con ImageMagick (CLI)');
console.log('───────────────────────────────');
console.log('$ convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico\n');

console.log('MÉTODO 3: Con Sharp (Node.js)');
console.log('──────────────────────────────');
console.log('npm install sharp');
console.log('Luego: node generate-icons.js\n\n');

console.log('✅ DESPUÉS DE TENER LOS ICONOS:');
console.log('──────────────────────────────\n');

console.log('1. Copia icon.png en: assets/icons/icon.png');
console.log('2. Copia icon.ico en: assets/icons/icon.ico');
console.log('3. Copia icon-16x16.png en: assets/icons/icon-16x16.png\n');

console.log('Luego ejecuta:');
console.log('  npm run build:win\n\n');

console.log('📁 Estructura esperada:');
console.log('──────────────────────\n');

console.log('dwyt/');
console.log('├── assets/');
console.log('│   └── icons/');
console.log('│       ├── icon.png          (256x256)');
console.log('│       ├── icon.ico          (Windows)');
console.log('│       └── icon-16x16.png    (Favicon)');
console.log('├── package.json');
console.log('└── ...\n\n');

console.log('💡 PARA USAR ICONOS MIENTRAS TANTO:');
console.log('──────────────────────────────────\n');

console.log('Puedes descargar iconos de YouTube de sitios como:');
console.log('  • https://www.flaticon.com (busca "youtube")');
console.log('  • https://icons8.com (busca "download")');
console.log('  • https://www.iconfinder.com\n');

console.log('O crea uno simple online en:');
console.log('  • https://www.canva.com\n');

// Si tiene sharp, generar automáticamente
try {
  const sharp = require('sharp');
  console.log('\n✓ Sharp detectado. Generando iconos automáticamente...\n');

  // Crear PNG simple 256x256
  sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 0, g: 120, b: 212, alpha: 255 }
    }
  })
    .png()
    .toFile(path.join(iconDir, 'icon.png'))
    .then(() => {
      console.log('✓ icon.png generado');
      
      // Crear favicon 16x16
      return sharp(path.join(iconDir, 'icon.png'))
        .resize(16, 16)
        .png()
        .toFile(path.join(iconDir, 'icon-16x16.png'));
    })
    .then(() => {
      console.log('✓ icon-16x16.png generado');
      console.log('\n⚠️  Nota: Para el .ico necesitas una herramienta especial.');
      console.log('   Usa: https://convertio.co/png-ico/\n');
    })
    .catch(err => {
      console.error('Error generando iconos:', err.message);
    });
} catch (err) {
  // Sharp no está instalado, eso está bien
}
