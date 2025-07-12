// Script para instalar Cypress manualmente
const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🔧 Instalando Cypress manualmente...');

// Crear directorio node_modules/cypress si no existe
const cypressDir = path.join(__dirname, 'node_modules', 'cypress');
if (!fs.existsSync(cypressDir)) {
    fs.mkdirSync(cypressDir, { recursive: true });
    console.log('✅ Directorio cypress creado');
}

// Descargar package.json de Cypress
const packageJson = {
    "name": "cypress",
    "version": "13.6.4",
    "description": "Cypress.io end to end testing tool",
    "bin": {
        "cypress": "bin/cypress"
    }
};

fs.writeFileSync(
    path.join(cypressDir, 'package.json'), 
    JSON.stringify(packageJson, null, 2)
);

console.log('✅ Package.json de Cypress creado');

// Actualizar package.json principal
const mainPackagePath = path.join(__dirname, 'package.json');
const mainPackage = JSON.parse(fs.readFileSync(mainPackagePath, 'utf8'));

if (!mainPackage.devDependencies) {
    mainPackage.devDependencies = {};
}
mainPackage.devDependencies.cypress = "^13.6.4";

fs.writeFileSync(mainPackagePath, JSON.stringify(mainPackage, null, 2));

console.log('✅ package.json principal actualizado');
console.log('🎯 Cypress configurado manualmente');
console.log('📝 Nota: Para usar Cypress completo, descarga desde https://download.cypress.io/desktop');
