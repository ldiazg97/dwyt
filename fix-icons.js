#!/usr/bin/env node

/**
 * Generador correcto de ICO 256x256
 * Sin dependencias externas
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, r, g, b) {
  // PNG signature
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk (image header)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 2;    // color type (RGB)
  ihdr[10] = 0;   // compression
  ihdr[11] = 0;   // filter
  ihdr[12] = 0;   // interlace

  const ihdrChunk = createChunk('IHDR', ihdr);
  
  // IDAT chunk (image data)
  const pixelData = [];
  for (let y = 0; y < height; y++) {
    pixelData.push(0); // filter type
    for (let x = 0; x < width; x++) {
      pixelData.push(r);
      pixelData.push(g);
      pixelData.push(b);
    }
  }
  
  const compressed = zlib.deflateSync(Buffer.from(pixelData));
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND chunk (end)
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, 'ascii');
  const chunkData = Buffer.concat([typeBuffer, data]);
  
  const crc32 = calculateCRC32(chunkData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32, 0);
  
  return Buffer.concat([length, chunkData, crcBuffer]);
}

function calculateCRC32(data) {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = crc ^ data[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createICOFromPNG(pngBuffer, size) {
  // ICO header
  const ico = Buffer.alloc(6 + 16 + pngBuffer.length + 8);
  
  ico.writeUInt16LE(0, 0);     // Reserved
  ico.writeUInt16LE(1, 2);     // Type (1 = icon)
  ico.writeUInt16LE(1, 4);     // Image count
  
  // Image directory entry
  ico[6] = size > 255 ? 0 : size;     // Width
  ico[7] = size > 255 ? 0 : size;     // Height
  ico[8] = 0;                          // Color count
  ico[9] = 0;                          // Reserved
  ico.writeUInt16LE(1, 10);            // Planes
  ico.writeUInt16LE(32, 12);           // Bits per pixel
  ico.writeUInt32LE(pngBuffer.length, 14); // Size of image data
  ico.writeUInt32LE(22, 18);           // Offset of image data
  
  // PNG data
  pngBuffer.copy(ico, 22);
  
  return ico.slice(0, 22 + pngBuffer.length);
}

console.log('🎨 Generador de ICO 256x256 Correcto');
console.log('════════════════════════════════════\n');

const iconDir = path.join(__dirname, 'assets', 'icons');

try {
  console.log('📝 Creando PNG 256x256...');
  const png256 = createPNG(256, 256, 0, 120, 212); // Azul #0078d4
  
  console.log('📝 Creando ICO desde PNG...');
  const ico = createICOFromPNG(png256, 256);
  
  console.log('💾 Guardando icon.ico...');
  fs.writeFileSync(path.join(iconDir, 'icon.ico'), ico);
  
  console.log('✓ Guardando icon.png...');
  fs.writeFileSync(path.join(iconDir, 'icon.png'), png256);
  
  console.log('📝 Creando PNG 16x16...');
  const png16 = createPNG(16, 16, 0, 120, 212);
  fs.writeFileSync(path.join(iconDir, 'icon-16x16.png'), png16);
  
  console.log('\n✅ COMPLETADO:\n');
  console.log('✓ assets/icons/icon.ico     (256x256)');
  console.log('✓ assets/icons/icon.png     (256x256)');
  console.log('✓ assets/icons/icon-16x16.png (16x16)\n');
  
  console.log('🎯 Ahora puedes:\n');
  console.log('  1. npm start         (probar)');
  console.log('  2. npm run build:win (generar down.exe)');
  
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
