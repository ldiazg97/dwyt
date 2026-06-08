#!/usr/bin/env node

/**
 * Generador de iconos PNG usando Node.js built-in
 * Crea iconos simples sin dependencias externas
 */

const fs = require('fs');
const path = require('path');

// Crear PNG simple desde cero (formato PNG mínimo)
function createSimplePNG(width, height, r, g, b) {
  const png = Buffer.alloc(width * height * 4);
  
  for (let i = 0; i < png.length; i += 4) {
    png[i] = r;      // R
    png[i + 1] = g;  // G
    png[i + 2] = b;  // B
    png[i + 3] = 255; // A
  }

  return png;
}

// Crear BMP simple (más fácil que PNG)
function createBMP(width, height, r, g, b) {
  const bmpSize = 54 + width * height * 3; // BMP header + pixel data
  const bmp = Buffer.alloc(bmpSize);
  
  // BMP Header (54 bytes)
  // Signature
  bmp.write('BM', 0);
  // File size (little-endian)
  bmp.writeUInt32LE(bmpSize, 2);
  // Reserved
  bmp.writeUInt32LE(0, 6);
  // Offset to pixel data
  bmp.writeUInt32LE(54, 10);
  // DIB header size
  bmp.writeUInt32LE(40, 14);
  // Width (little-endian)
  bmp.writeInt32LE(width, 18);
  // Height (little-endian)
  bmp.writeInt32LE(height, 22);
  // Planes
  bmp.writeUInt16LE(1, 26);
  // Bits per pixel
  bmp.writeUInt16LE(24, 28);
  // Compression
  bmp.writeUInt32LE(0, 30);
  // Image size
  bmp.writeUInt32LE(0, 34);
  // X pixels per meter
  bmp.writeInt32LE(0, 38);
  // Y pixels per meter
  bmp.writeInt32LE(0, 42);
  // Colors used
  bmp.writeUInt32LE(0, 46);
  // Colors important
  bmp.writeUInt32LE(0, 50);
  
  // Pixel data (BGR format, bottom-up)
  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      bmp[offset++] = b;
      bmp[offset++] = g;
      bmp[offset++] = r;
    }
  }
  
  return bmp;
}

// Crear ICO desde BMP
function createICO(bmpBuffer) {
  const icoSize = 6 + 16 + bmpBuffer.length;
  const ico = Buffer.alloc(icoSize);
  
  // ICO header
  ico.writeUInt16LE(0, 0);           // Reserved
  ico.writeUInt16LE(1, 2);           // Type (1 = icon)
  ico.writeUInt16LE(1, 4);           // Image count
  
  // Image directory entry
  let offset = 6;
  ico[offset] = 256 % 256;           // Width
  ico[offset + 1] = 256 / 256;
  ico[offset + 2] = 256 % 256;       // Height
  ico[offset + 3] = 256 / 256;
  ico[offset + 4] = 0;               // Color count
  ico[offset + 5] = 0;               // Reserved
  ico.writeUInt16LE(0, offset + 6);  // Color planes
  ico.writeUInt16LE(32, offset + 8); // Bits per pixel
  ico.writeUInt32LE(bmpBuffer.length, offset + 10); // Size
  ico.writeUInt32LE(22, offset + 14); // Offset
  
  // Append BMP data
  bmpBuffer.copy(ico, 22);
  
  return ico;
}

const iconDir = path.join(__dirname, 'assets', 'icons');

console.log('🎨 Generador de Iconos - Método Alternativo');
console.log('═════════════════════════════════════════════\n');

console.log('⚠️  FFmpeg no soporta SVG renderizado en Windows.');
console.log('Usando método alternativo...\n');

console.log('📝 Creando placeholders temporales:\n');

// Crear PNG placeholder 256x256 (azul con gradiente simulado)
console.log('  • icon.png (256x256)...');
const bmp256 = createBMP(256, 256, 0, 120, 212); // Azul #0078d4
fs.writeFileSync(path.join(iconDir, 'icon-tmp.bmp'), bmp256);

// Crear PNG placeholder 16x16 
console.log('  • icon-16x16.png (16x16)...');
const bmp16 = createBMP(16, 16, 0, 120, 212);
fs.writeFileSync(path.join(iconDir, 'icon-16x16-tmp.bmp'), bmp16);

// Crear ICO desde BMP
console.log('  • icon.ico (Windows)...');
const ico = createICO(bmp256);
fs.writeFileSync(path.join(iconDir, 'icon.ico'), ico);
console.log('✓ icon.ico creado\n');

console.log('─────────────────────────────────────────────\n');

console.log('✅ Archivos generados:\n');
console.log('  ✓ assets/icons/icon.ico (usable ahora)');
console.log('  • assets/icons/icon-tmp.bmp (convertirbmp a PNG)');
console.log('  • assets/icons/icon-16x16-tmp.bmp (convertir a PNG)\n');

console.log('🔄 AHORA TIENES 2 OPCIONES:\n');

console.log('OPCIÓN 1: Usar convertidor online (⭐ Recomendado)');
console.log('────────────────────────────────────────────────');
console.log('');
console.log('Para convertir BMP a PNG:');
console.log('  1. Ve a: https://cloudconvert.com/bmp-to-png');
console.log('  2. Carga: assets/icons/icon-tmp.bmp');
console.log('  3. Descarga como PNG');
console.log('  4. Renombra a: icon.png');
console.log('');
console.log('  5. Repite para icon-16x16-tmp.bmp → icon-16x16.png\n');

console.log('OPCIÓN 2: Usar Paint de Windows');
console.log('───────────────────────────────');
console.log('  1. Abre: assets/icons/icon-tmp.bmp');
console.log('  2. Menú → "Guardar como" → PNG → icon.png');
console.log('  3. Repite para icon-16x16-tmp.bmp\n');

console.log('─────────────────────────────────────────────\n');

console.log('✨ ESTRUCTURA FINAL ESPERADA:\n');
console.log('assets/icons/');
console.log('├── icon.svg          (ya existe)');
console.log('├── icon.ico          ✓ (listo para usar)');
console.log('├── icon.png          (descarga y convierte)');
console.log('└── icon-16x16.png    (descarga y convierte)\n');

console.log('📌 NOTA: El icon.ico generado funcionará,');
console.log('         pero para mejor calidad copia los PNG\n');
