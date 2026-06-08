@echo off
REM Setup Script for YouTube Downloader

echo ========================================
echo   YouTube Downloader - Setup
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no está instalado.
    echo Descarga Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detectado

REM Verificar yt-dlp.exe
if not exist "bin\yt-dlp.exe" (
    echo.
    echo ERROR: yt-dlp.exe no encontrado en bin/
    echo.
    echo Instrucciones:
    echo 1. Descarga yt-dlp.exe desde: https://github.com/yt-dlp/yt-dlp/releases
    echo 2. Copia yt-dlp.exe en la carpeta: bin/
    echo.
    pause
    exit /b 1
)

echo [OK] yt-dlp.exe detectado

REM Verificar ffmpeg.exe (opcional)
if not exist "bin\ffmpeg.exe" (
    echo [WARNING] ffmpeg.exe no encontrado en bin/
    echo           La app funcionará sin ffmpeg.
    echo           Para mejor conversión de audio, descarga:
    echo           https://ffmpeg.org/download.html
    echo.
)

REM Instalar dependencias npm
echo.
echo Instalando dependencias npm...
call npm install

echo.
echo ========================================
echo   Setup completado!
echo ========================================
echo.
echo Comandos disponibles:
echo   npm start          - Ejecutar la app en desarrollo
echo   npm run build:win  - Crear down.exe portable
echo.
pause
