# Script para generar múltiples versiones de APK - MiAppSalud
# Autor: Sebastián Trujillo
# Fecha: $(Get-Date -Format "yyyy-MM-dd")

Write-Host "🚀 GENERANDO MÚLTIPLES VERSIONES DE APK PARA MIAPPSALUD" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Yellow

# Crear directorio para APKs si no existe
$apkDir = "apks-versions"
if (!(Test-Path $apkDir)) {
    New-Item -ItemType Directory -Path $apkDir
    Write-Host "📁 Directorio $apkDir creado" -ForegroundColor Blue
}

# Limpiar builds anteriores
Write-Host "🧹 Limpiando builds anteriores..." -ForegroundColor Yellow
if (Test-Path "android\app\build\outputs\apk") {
    Remove-Item -Recurse -Force "android\app\build\outputs\apk"
}

# Variables de configuración
$appName = "miappsalud"
$version = "1.0.0"
$timestamp = Get-Date -Format "yyyyMMdd-HHmm"

Write-Host "📱 Información de la aplicación:" -ForegroundColor Cyan
Write-Host "   Nombre: $appName" -ForegroundColor White
Write-Host "   Versión: $version" -ForegroundColor White
Write-Host "   Timestamp: $timestamp" -ForegroundColor White
Write-Host ""

# PASO 1: Build del proyecto Ionic
Write-Host "🔧 PASO 1: Compilando proyecto Ionic..." -ForegroundColor Magenta
ionic build --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build de Ionic" -ForegroundColor Red
    exit 1
}

# PASO 2: Sincronizar con Capacitor
Write-Host "📱 PASO 2: Sincronizando con Capacitor Android..." -ForegroundColor Magenta
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en la sincronización de Capacitor" -ForegroundColor Red
    exit 1
}

# Cambiar al directorio Android
Push-Location android

try {
    # PASO 3: Generar APK Debug
    Write-Host "🔨 PASO 3: Generando APK Debug..." -ForegroundColor Magenta
    .\gradlew assembleDebug
    if ($LASTEXITCODE -eq 0) {
        $debugApk = "app\build\outputs\apk\debug\app-debug.apk"
        if (Test-Path $debugApk) {
            $targetDebug = "..\$apkDir\$appName-debug-v$version-$timestamp.apk"
            Copy-Item $debugApk $targetDebug
            $debugSize = [math]::Round((Get-Item $targetDebug).Length / 1MB, 2)
            Write-Host "✅ APK Debug generado: $targetDebug ($debugSize MB)" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ Error generando APK Debug" -ForegroundColor Red
    }

    # PASO 4: Generar APK Release sin firmar
    Write-Host "📦 PASO 4: Generando APK Release sin firmar..." -ForegroundColor Magenta
    .\gradlew assembleRelease
    if ($LASTEXITCODE -eq 0) {
        $releaseApk = "app\build\outputs\apk\release\app-release-unsigned.apk"
        if (Test-Path $releaseApk) {
            $targetRelease = "..\$apkDir\$appName-release-unsigned-v$version-$timestamp.apk"
            Copy-Item $releaseApk $targetRelease
            $releaseSize = [math]::Round((Get-Item $targetRelease).Length / 1MB, 2)
            Write-Host "✅ APK Release sin firmar generado: $targetRelease ($releaseSize MB)" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ Error generando APK Release" -ForegroundColor Red
    }

    # PASO 5: Generar Android App Bundle (.aab)
    Write-Host "📱 PASO 5: Generando Android App Bundle..." -ForegroundColor Magenta
    .\gradlew bundleRelease
    if ($LASTEXITCODE -eq 0) {
        $bundleAab = "app\build\outputs\bundle\release\app-release.aab"
        if (Test-Path $bundleAab) {
            $targetBundle = "..\$apkDir\$appName-bundle-v$version-$timestamp.aab"
            Copy-Item $bundleAab $targetBundle
            $bundleSize = [math]::Round((Get-Item $targetBundle).Length / 1MB, 2)
            Write-Host "✅ Android App Bundle generado: $targetBundle ($bundleSize MB)" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ Error generando Android App Bundle" -ForegroundColor Red
    }

    # PASO 6: Generar APK Release firmado (si existe keystore)
    $keystorePath = "..\miappsalud-release-key.keystore"
    if (Test-Path $keystorePath) {
        Write-Host "✍️ PASO 6: Generando APK Release firmado..." -ForegroundColor Magenta
        
        # Firmar APK
        $unsignedApk = "app\build\outputs\apk\release\app-release-unsigned.apk"
        $signedApk = "..\$apkDir\$appName-release-signed-v$version-$timestamp.apk"
        
        # Usar jarsigner para firmar
        jarsigner -verbose -keystore $keystorePath -signedjar $signedApk $unsignedApk miappsalud-key -storepass 123456 -keypass 123456
        
        if (Test-Path $signedApk) {
            # Optimizar con zipalign si está disponible
            $zipalignPath = "$env:ANDROID_HOME\build-tools\34.0.0\zipalign.exe"
            if (Test-Path $zipalignPath) {
                $alignedApk = "..\$apkDir\$appName-release-signed-aligned-v$version-$timestamp.apk"
                & $zipalignPath -v 4 $signedApk $alignedApk
                if (Test-Path $alignedApk) {
                    Remove-Item $signedApk
                    Rename-Item $alignedApk $signedApk
                }
            }
            
            $signedSize = [math]::Round((Get-Item $signedApk).Length / 1MB, 2)
            Write-Host "✅ APK Release firmado generado: $signedApk ($signedSize MB)" -ForegroundColor Green
        } else {
            Write-Host "❌ Error firmando APK Release" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️ No se encontró keystore. Saltando firma de APK." -ForegroundColor Yellow
        Write-Host "   Para crear keystore: keytool -genkeypair -alias miappsalud-key -keyalg RSA -keysize 2048 -validity 10000 -keystore miappsalud-release-key.keystore" -ForegroundColor Gray
    }

} finally {
    # Volver al directorio principal
    Pop-Location
}

# RESUMEN FINAL
Write-Host ""
Write-Host "📊 RESUMEN DE GENERACIÓN DE APKS" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Yellow

if (Test-Path $apkDir) {
    $apkFiles = Get-ChildItem $apkDir -File
    Write-Host "📁 Directorio: $apkDir" -ForegroundColor Cyan
    Write-Host "📱 Archivos generados: $($apkFiles.Count)" -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($file in $apkFiles) {
        $sizeInMB = [math]::Round($file.Length / 1MB, 2)
        $type = switch ($file.Extension) {
            ".apk" { 
                if ($file.Name -contains "debug") { "📱 APK Debug" }
                elseif ($file.Name -contains "unsigned") { "📦 APK Release sin firmar" }
                elseif ($file.Name -contains "signed") { "✍️ APK Release firmado" }
                else { "📱 APK" }
            }
            ".aab" { "📱 Android App Bundle" }
            default { "📄 Archivo" }
        }
        
        Write-Host "$type`: $($file.Name) ($sizeInMB MB)" -ForegroundColor White
    }
    
    $totalSize = [math]::Round(($apkFiles | Measure-Object Length -Sum).Sum / 1MB, 2)
    Write-Host ""
    Write-Host "💾 Tamaño total: $totalSize MB" -ForegroundColor Yellow
    
    # Instrucciones para instalación
    Write-Host ""
    Write-Host "📋 INSTRUCCIONES DE INSTALACIÓN:" -ForegroundColor Green
    Write-Host "1. APK Debug: Para desarrollo y testing" -ForegroundColor Gray
    Write-Host "   adb install -r $apkDir\*debug*.apk" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. APK Release: Para producción" -ForegroundColor Gray
    Write-Host "   adb install -r $apkDir\*signed*.apk" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Android App Bundle: Para Google Play Store" -ForegroundColor Gray
    Write-Host "   Subir archivo .aab a Google Play Console" -ForegroundColor Gray
    
} else {
    Write-Host "❌ No se pudo crear el directorio de APKs" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 PROCESO COMPLETADO" -ForegroundColor Green
Write-Host "⏰ Tiempo total: $((Get-Date) - $startTime)" -ForegroundColor Cyan
