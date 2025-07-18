@echo off
REM Script para generar múltiples versiones de APK - MiAppSalud
REM Autor: Sebastián Trujillo
REM Compatible con Windows

echo.
echo ========================================
echo   GENERADOR DE MULTIPLES APKS
echo   MiAppSalud - Version 1.0.0
echo ========================================
echo.

REM Crear directorio para APKs
if not exist "apks-versions" mkdir apks-versions
echo 📁 Directorio apks-versions creado/verificado

REM Limpiar builds anteriores
echo 🧹 Limpiando builds anteriores...
if exist "android\app\build\outputs\apk" rmdir /s /q "android\app\build\outputs\apk"

REM PASO 1: Build Ionic
echo.
echo 🔧 PASO 1: Compilando proyecto Ionic...
call ionic build --prod
if %ERRORLEVEL% neq 0 (
    echo ❌ Error en el build de Ionic
    pause
    exit /b 1
)

REM PASO 2: Sincronizar Capacitor
echo.
echo 📱 PASO 2: Sincronizando con Capacitor...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo ❌ Error en sincronización de Capacitor
    pause
    exit /b 1
)

REM Cambiar al directorio Android
cd android

REM PASO 3: APK Debug
echo.
echo 🔨 PASO 3: Generando APK Debug...
call gradlew assembleDebug
if %ERRORLEVEL% equ 0 (
    if exist "app\build\outputs\apk\debug\app-debug.apk" (
        copy "app\build\outputs\apk\debug\app-debug.apk" "..\apks-versions\miappsalud-debug-v1.0.0.apk"
        echo ✅ APK Debug generado exitosamente
    )
) else (
    echo ❌ Error generando APK Debug
)

REM PASO 4: APK Release sin firmar
echo.
echo 📦 PASO 4: Generando APK Release sin firmar...
call gradlew assembleRelease
if %ERRORLEVEL% equ 0 (
    if exist "app\build\outputs\apk\release\app-release-unsigned.apk" (
        copy "app\build\outputs\apk\release\app-release-unsigned.apk" "..\apks-versions\miappsalud-release-unsigned-v1.0.0.apk"
        echo ✅ APK Release sin firmar generado exitosamente
    )
) else (
    echo ❌ Error generando APK Release
)

REM PASO 5: Android App Bundle
echo.
echo 📱 PASO 5: Generando Android App Bundle...
call gradlew bundleRelease
if %ERRORLEVEL% equ 0 (
    if exist "app\build\outputs\bundle\release\app-release.aab" (
        copy "app\build\outputs\bundle\release\app-release.aab" "..\apks-versions\miappsalud-bundle-v1.0.0.aab"
        echo ✅ Android App Bundle generado exitosamente
    )
) else (
    echo ❌ Error generando Android App Bundle
)

REM PASO 6: APK Firmado (si existe keystore)
echo.
echo ✍️ PASO 6: Verificando keystore para firma...
if exist "..\miappsalud-release-key.keystore" (
    echo 🔑 Keystore encontrado. Firmando APK...
    jarsigner -verbose -keystore "..\miappsalud-release-key.keystore" -signedjar "..\apks-versions\miappsalud-release-signed-v1.0.0.apk" "app\build\outputs\apk\release\app-release-unsigned.apk" miappsalud-key -storepass 123456 -keypass 123456
    if %ERRORLEVEL% equ 0 (
        echo ✅ APK Release firmado generado exitosamente
    ) else (
        echo ❌ Error firmando APK
    )
) else (
    echo ⚠️ No se encontró keystore. Saltando firma.
    echo    Para crear: keytool -genkeypair -alias miappsalud-key -keyalg RSA -keysize 2048 -validity 10000 -keystore miappsalud-release-key.keystore
)

REM Volver al directorio principal
cd ..

REM RESUMEN
echo.
echo ========================================
echo   RESUMEN DE ARCHIVOS GENERADOS
echo ========================================
dir /b "apks-versions\*.*"

echo.
echo 📋 INSTRUCCIONES DE USO:
echo 1. APK Debug: Para desarrollo y testing
echo    adb install -r apks-versions\miappsalud-debug-v1.0.0.apk
echo.
echo 2. APK Release: Para producción
echo    adb install -r apks-versions\miappsalud-release-signed-v1.0.0.apk
echo.
echo 3. Bundle AAB: Para Google Play Store
echo    Subir miappsalud-bundle-v1.0.0.aab a Google Play Console
echo.
echo 🎉 PROCESO COMPLETADO
echo.
pause
