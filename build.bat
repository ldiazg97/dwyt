@echo off
REM Build Script for YouTube Downloader

echo ========================================
echo   Generando down.exe
echo ========================================
echo.

REM Verificar que existan los ejecutables
if not exist "bin\yt-dlp.exe" (
    echo ERROR: yt-dlp.exe no encontrado en bin/
    pause
    exit /b 1
)

echo [OK] yt-dlp.exe detectado

REM Construir con electron-builder
echo.
echo Compilando aplicación...
call npm run build:win

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ¡down.exe generado correctamente!
    echo ========================================
    echo.
    echo Ubicación: dist\down.exe
    echo.
    echo Puedes copiar este archivo a cualquier ubicación
    echo o distribuirlo sin restricciones.
    echo.
) else (
    echo.
    echo ERROR durante la compilación.
    echo.
)

pause
