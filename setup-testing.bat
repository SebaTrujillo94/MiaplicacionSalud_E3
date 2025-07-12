@echo off
echo 🚀 Configurando entorno de testing para Mi Aplicación de Salud...
echo.

REM Configurar registry de npm para usar HTTPS
echo ⚙️ Configurando npm registry...
npm config set registry https://registry.npmjs.org/

REM Limpiar caché de npm
echo 🧹 Limpiando caché de npm...
npm cache clean --force

REM Verificar versiones
echo 📋 Verificando versiones:
echo Node.js:
node --version
echo npm:
npm --version
echo Angular CLI:
ng version --skip-git

echo.
echo ✅ Configuración completada!
echo.
echo 📝 Próximos pasos:
echo 1. Ejecuta: npm install
echo 2. Luego: npm run test
echo 3. Para E2E: npm run e2e
echo.
pause
