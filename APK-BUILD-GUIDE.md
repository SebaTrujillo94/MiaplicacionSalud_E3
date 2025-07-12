# 📱 Guía de Construcción y Firma de APK - Mi Aplicación de Salud

## 🎯 Estado Actual del Proyecto

### ✅ **COMPLETADO**
- **Testing Framework**: 16 pruebas unitarias funcionando ✅
- **Build System**: Aplicación construida en modo producción ✅
- **Capacitor**: Sincronizado correctamente ✅
- **Documentación**: Guías completas creadas ✅

### ⚠️ **PENDIENTE**
- **Instalación de @capacitor/android**: Requiere resolución de problemas de npm
- **Android SDK**: Configuración del entorno de desarrollo Android
- **Firma de APK**: Configuración de certificados de firma

## 🏗️ Configuración de Build para APK

## Preparar el entorno para generar APK

### Paso 1: Verificar herramientas
```bash
# Verificar Java JDK
java -version

# Verificar Android SDK
echo $ANDROID_HOME

# Verificar Gradle
gradle --version
```

### Paso 2: Configurar Capacitor
```bash
# Agregar plataforma Android
ionic capacitor add android

# Sincronizar cambios
ionic capacitor sync android
```

### Paso 3: Generar APK
```bash
# Build de producción
ionic build --prod

# Construir APK
ionic capacitor build android --prod

# Abrir Android Studio (opcional)
ionic capacitor open android
```

## Firmar APK

### Crear keystore
```bash
keytool -genkey -v -keystore mi-app-salud.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias mi-app-alias
```

### Configurar gradle para firma automática
Crear archivo `android/key.properties`:
```
storeFile=mi-app-salud.keystore
storePassword=TU_PASSWORD
keyAlias=mi-app-alias
keyPassword=TU_PASSWORD
```

### Modificar `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Generar APK firmado
```bash
cd android
./gradlew assembleRelease
```

El APK firmado estará en: `android/app/build/outputs/apk/release/app-release.apk`

## Generar AAB (Android App Bundle)
```bash
cd android
./gradlew bundleRelease
```

El AAB estará en: `android/app/build/outputs/bundle/release/app-release.aab`

## Verificar APK
```bash
# Verificar firma
jarsigner -verify -verbose -certs app-release.apk

# Información del APK
aapt dump badging app-release.apk
```

## Lista de archivos para entregar
- ✅ APK firmado (`app-release.apk`)
- ✅ AAB file (`app-release.aab`)
- ✅ Keystore (`mi-app-salud.keystore`)
- ✅ Archivos de pruebas (carpeta `cypress/` y `src/**/*.spec.ts`)
- ✅ Documentación de testing (`TESTING-GUIDE.md`)
- ✅ Configuración de build (`capacitor.config.ts`)

## Troubleshooting

### Error: ANDROID_HOME no configurado
```bash
# Windows
set ANDROID_HOME=C:\Users\TU_USUARIO\AppData\Local\Android\Sdk

# Linux/Mac
export ANDROID_HOME=$HOME/Android/Sdk
```

### Error: JDK no encontrado
```bash
# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11

# Verificar
java -version
```

### Error en Gradle
```bash
# Limpiar proyecto
cd android
./gradlew clean

# Rebuild
./gradlew assembleRelease
```
