# Guía para Ejecutar Proyecto desde VS Code en Android Studio

## 🎯 Objetivo
Ejecutar y depurar la aplicación Ionic/Angular desde Visual Studio Code utilizando Android Studio como emulador.

## 📋 Requisitos Previos
- ✅ Visual Studio Code instalado
- ✅ Android Studio instalado
- ✅ APKs ya generados (debug y release)
- ✅ SDK de Android configurado

## 🚀 Métodos de Ejecución

### Método 1: Ejecutar en Emulador Android desde VS Code

#### Paso 1: Verificar Emuladores Disponibles
```bash
# Listar emuladores disponibles
npx cap run android --list

# O usando herramientas de Android
emulator -list-avds
```

#### Paso 2: Ejecutar en Emulador
```bash
# Ejecutar en emulador (automáticamente detecta el disponible)
npx cap run android

# O especificar un emulador específico
npx cap run android --target="nombre_del_emulador"
```

#### Paso 3: Ejecutar con Live Reload (Recomendado para desarrollo)
```bash
# Ejecutar con recarga automática
ionic cap run android --livereload --external

# O con URL específica
ionic cap run android --livereload --host=0.0.0.0 --port=8100
```

### Método 2: Abrir Proyecto en Android Studio

#### Paso 1: Abrir en Android Studio desde VS Code
```bash
# Abrir proyecto Android en Android Studio
npx cap open android
```

#### Paso 2: Configurar en Android Studio
1. Android Studio se abrirá automáticamente
2. Esperar a que Gradle sincronice el proyecto
3. Seleccionar dispositivo/emulador en la barra superior
4. Hacer clic en el botón "Run" (▶️) o presionar Shift+F10

### Método 3: Instalar APK Directamente

#### En Emulador
```bash
# Instalar APK debug en emulador
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Reinstalar (si ya existe)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

#### En Dispositivo Físico
```bash
# Habilitar "Depuración USB" en el dispositivo
# Conectar via USB y ejecutar:
adb devices  # Verificar que el dispositivo se detecte
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔧 Configuración de Tareas en VS Code

### Crear Tareas Automatizadas

Crear archivo `.vscode/tasks.json`:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Android: Run in Emulator",
            "type": "shell",
            "command": "npx",
            "args": ["cap", "run", "android"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"
            },
            "problemMatcher": []
        },
        {
            "label": "Android: Run with Live Reload",
            "type": "shell",
            "command": "ionic",
            "args": ["cap", "run", "android", "--livereload", "--external"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"
            },
            "problemMatcher": []
        },
        {
            "label": "Android: Open in Android Studio",
            "type": "shell",
            "command": "npx",
            "args": ["cap", "open", "android"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"
            },
            "problemMatcher": []
        },
        {
            "label": "Android: Build and Run",
            "dependsOrder": "sequence",
            "dependsOn": [
                "Build Production",
                "Android: Run in Emulator"
            ],
            "group": "build"
        },
        {
            "label": "Build Production",
            "type": "shell",
            "command": "ng",
            "args": ["build", "--configuration", "production"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "silent",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": ["$tsc"]
        }
    ]
}
```

## 🎮 Comandos Rápidos

### Para Desarrollo Diario
```bash
# 1. Construir y sincronizar
npm run build && npx cap sync android

# 2. Ejecutar en emulador con live reload
ionic cap run android --livereload

# 3. Solo abrir Android Studio
npx cap open android
```

### Para Testing
```bash
# Ejecutar tests e2e en Android
npm run e2e:android  # (si está configurado)

# O manualmente
npm run build && npx cap sync android && npx cap run android
```

## 🔍 Depuración

### Chrome DevTools
1. Ejecutar la app en emulador
2. Abrir Chrome y navegar a `chrome://inspect`
3. Seleccionar tu dispositivo/emulador
4. Hacer clic en "Inspect" para abrir DevTools

### Android Studio Debugger
1. Abrir proyecto con `npx cap open android`
2. Establecer breakpoints en código Java/Kotlin
3. Ejecutar en modo debug (🐛)

## 🚨 Solución de Problemas Comunes

### Error: No se encuentra emulador
```bash
# Verificar emuladores
emulator -list-avds

# Crear nuevo emulador desde Android Studio
# Tools > AVD Manager > Create Virtual Device
```

### Error: ADB no reconoce dispositivo
```bash
# Reiniciar ADB
adb kill-server
adb start-server
adb devices
```

### Error: Gradle build fails
```bash
# Limpiar proyecto
cd android
./gradlew clean
cd ..

# Reconstruir
npx cap sync android
```

## 🛠️ Corrección de Errores Comunes

### Error 1: ADB no reconocido
**Problema**: `'adb' no se reconoce como nombre de un cmdlet`
**Solución**:
```bash
# Agregar ADB al PATH temporalmente
$env:PATH = $env:PATH + ";C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\platform-tools"

# O agregar permanentemente al PATH del sistema
# Windows + R > sysdm.cpl > Variables de entorno > PATH > Agregar:
# C:\Users\[TU_USUARIO]\AppData\Local\Android\Sdk\platform-tools
```

### Error 2: ADB unresponsive / device still authorizing
**Problema**: `ADBs is unresponsive after 5000ms` o `device still authorizing`
**Solución**:
```bash
# 1. Reiniciar ADB
adb kill-server
adb start-server

# 2. Verificar dispositivos
adb devices

# 3. Si el emulador aparece como "unauthorized", aceptar en el emulador
# 4. Si sigue fallando, reiniciar el emulador
```

### Error 3: Emulador tardando mucho en iniciar
**Problema**: El deployment se queda en "Deploying app-debug.apk..."
**Solución**:
```bash
# 1. Verificar que el emulador esté completamente iniciado
adb devices

# 2. Esperar a que el emulador muestre el home screen
# 3. Si tarda mucho, usar un emulador más rápido o instalar manualmente:
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Error 4: SDK location not found
**Problema**: `SDK location not found. Define a valid SDK location`
**Solución**: Ya resuelto con `local.properties`, pero si reaparece:
```bash
# Verificar que el archivo android/local.properties contiene:
sdk.dir=C:\\Users\\[TU_USUARIO]\\AppData\\Local\\Android\\Sdk
```

## 🚀 Métodos Alternativos de Ejecución

### Método Rápido: Instalar APK Directamente
```bash
# 1. Construir la app
npm run build
npx cap sync android

# 2. Generar APK
cd android
.\gradlew assembleDebug
cd ..

# 3. Instalar manualmente
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Método con Live Reload (Recomendado)
```bash
# Ejecutar servidor local + app en emulador
ionic cap run android --livereload --external --host=0.0.0.0 --port=8100
```

### Método Android Studio
```bash
# Abrir en Android Studio y ejecutar desde ahí
npx cap open android
# Luego presionar el botón Run (▶️) en Android Studio
```