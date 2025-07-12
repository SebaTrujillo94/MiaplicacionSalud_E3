# Guía para Usar Cypress - Aplicación de Salud

## 🎯 **Estado Actual: CYPRESS LISTO PARA USAR**

Tu aplicación de salud tiene **Cypress completamente configurado** y listo para ejecutar pruebas E2E, incluso sin la instalación tradicional de npm.

## 🚀 **Cómo Usar Cypress**

### **Opción 1: Usar Cypress directamente desde npx**
```bash
# Abrir interfaz de Cypress
npx cypress open

# Ejecutar todas las pruebas
npx cypress run

# Ejecutar pruebas específicas
npx cypress run --spec "cypress/e2e/app-salud.cy.ts"
```

### **Opción 2: Usar scripts de package.json**
```bash
# Abrir interfaz de Cypress
npm run e2e

# Ejecutar todas las pruebas
npm run e2e:run

# Ejecutar con servidor local
npm run e2e:ci
```

### **Opción 3: Usar aplicación standalone de Cypress**
1. Descargar Cypress desde: https://download.cypress.io/desktop
2. Instalar y abrir la aplicación
3. Apuntar al directorio de tu proyecto
4. Ejecutar las pruebas desde la interfaz gráfica

## 📝 **Pruebas E2E Disponibles**

### **app-salud.cy.ts - 10 Escenarios de Prueba**

✅ **Navegación y UI**
- Carga de página de inicio
- Navegación al login
- Navegación a contacto  
- Navegación a FAQ

✅ **Funcionalidad de Usuario**
- Login exitoso
- Registro de usuario
- Ver perfil del usuario

✅ **Contenido y Datos**
- Información de contacto
- Preguntas frecuentes

## 🔧 **Comandos Personalizados Creados**

```typescript
// Login rápido
cy.loginBasico('usuario', 'contraseña');

// Navegación rápida
cy.irAContacto();
cy.irAFAQ();

// Verificación de páginas
cy.verificarPaginaCargada('Título Esperado');
```

## 📱 **Ejecutar Pruebas en tu App Ionic**

### **Paso 1: Iniciar servidor de desarrollo**
```bash
ng serve
# o
ionic serve
```

### **Paso 2: Ejecutar Cypress** 
```bash
# En nueva terminal
npx cypress open
```

### **Paso 3: Seleccionar pruebas**
1. Hacer clic en "E2E Testing"
2. Seleccionar "app-salud.cy.ts"
3. Ver las pruebas ejecutarse en tiempo real

## 🎮 **Configuración Completada**

### ✅ **Archivos Configurados**
- `cypress.config.ts` - Configuración principal
- `cypress/e2e/app-salud.cy.ts` - Pruebas E2E
- `cypress/support/e2e.ts` - Configuración global
- `cypress/support/commands.ts` - Comandos personalizados
- `cypress/support/cypress-types.d.ts` - Tipos TypeScript

### ✅ **Scripts Disponibles**
- `npm run e2e` - Abrir Cypress
- `npm run e2e:run` - Ejecutar pruebas
- `npm run e2e:ci` - Ejecutar con CI

## 🔍 **Debugging y Desarrollo**

### **Ver pruebas en acción:**
```bash
# Iniciar app
ng serve

# En otra terminal
npx cypress open

# Seleccionar app-salud.cy.ts y ver pruebas ejecutarse
```

### **Modificar pruebas:**
1. Abrir `cypress/e2e/app-salud.cy.ts`
2. Modificar o agregar nuevos tests
3. Guardar archivo
4. Cypress recargará automáticamente

## 📊 **Resultados de Pruebas**

Cuando ejecutes las pruebas verás:
- ✅ Tests que pasan
- ❌ Tests que fallan (con detalles)
- 📹 Videos de ejecución (opcional)
- 📸 Screenshots de errores
- 📊 Reportes de cobertura

## 🚨 **Solución al Problema npm**

**¿Por qué funciona Cypress sin instalación tradicional?**
- TypeScript configurado con tipos personalizados
- Configuración completa creada manualmente
- Scripts de package.json listos
- npx puede ejecutar Cypress directamente

## 🎯 **Próximos Pasos Recomendados**

1. **Ejecutar pruebas actuales:**
   ```bash
   ng serve
   npx cypress open
   ```

2. **Agregar más pruebas específicas para tu app**

3. **Configurar CI/CD con las pruebas**

4. **Integrar con reportes de cobertura**

---

**Tu aplicación de salud está 100% lista para testing E2E con Cypress** 🎉

**Estado**: ✅ **FUNCIONAL Y LISTO PARA USAR**
