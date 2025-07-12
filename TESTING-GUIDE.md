# 📋 Guía de Testing - Mi Aplicación de Salud

## 🎯 Objetivos de Testing

Esta aplicación de salud implementa pruebas exhaustivas para garantizar:
- ✅ Funcionalidad correcta de todos los componentes
- ✅ Seguridad en el manejo de datos médicos
- ✅ Experiencia de usuario fluida
- ✅ Compatibilidad móvil completa

## 🧪 Tipos de Pruebas Implementadas

### 1. **Pruebas Unitarias** (Jasmine + Karma)
Prueban funciones y componentes individuales:

```bash
# Ejecutar todas las pruebas unitarias
npm run test

# Ejecutar con observación de cambios
npm run test:watch

# Ejecutar con reporte de cobertura
npm run test:coverage
```

**Archivos de pruebas unitarias:**
- `src/app/services/api.service.spec.ts` - Tests del servicio API
- `src/app/services/storage.service.spec.ts` - Tests del almacenamiento
- `src/app/home/home.page.spec.ts` - Tests de la página principal
- `src/app/login/login.page.spec.ts` - Tests del login

### 2. **Pruebas End-to-End** (Cypress)
Simulan el comportamiento real del usuario:

```bash
# Abrir interfaz de Cypress (recomendado para desarrollo)
npm run e2e

# Ejecutar pruebas E2E en modo headless
npm run e2e:run

# Ejecutar con servidor local automático
npm run e2e:ci
```

**Archivos de pruebas E2E:**
- `cypress/e2e/app-salud.cy.ts` - Flujos principales de la app

## 🏗️ Estructura de Testing

```
mi-aplicacion-salud/
├── cypress/
│   ├── e2e/
│   │   └── app-salud.cy.ts
│   ├── support/
│   │   ├── e2e.ts
│   │   └── commands.ts
│   └── cypress.config.ts
├── src/
│   └── app/
│       ├── services/
│       │   ├── api.service.spec.ts
│       │   └── storage.service.spec.ts
│       ├── home/
│       │   └── home.page.spec.ts
│       └── login/
│           └── login.page.spec.ts
└── karma.conf.js
```

## 🚀 Cómo Ejecutar las Pruebas

### Paso 1: Preparar el entorno
```bash
# Instalar dependencias
npm install

# Verificar que la app funciona
ionic serve
```

### Paso 2: Ejecutar pruebas unitarias
```bash
# Modo desarrollo (recomendado)
npm run test

# Para ver cobertura de código
npm run test:coverage
```

### Paso 3: Ejecutar pruebas E2E
```bash
# Terminal 1: Ejecutar la aplicación
ionic serve

# Terminal 2: Ejecutar Cypress
npm run e2e
```

## 📊 Casos de Prueba Implementados

### **Pruebas de Autenticación**
- ✅ Login exitoso de paciente
- ✅ Login con credenciales incorrectas
- ✅ Validación de formularios
- ✅ Persistencia de sesión
- ✅ Logout seguro

### **Pruebas de Funcionalidades Médicas**
- ✅ Agendar citas médicas
- ✅ Ver historial médico
- ✅ Gestión de notificaciones
- ✅ Actualización de perfil
- ✅ Búsqueda de doctores

### **Pruebas de Servicios**
- ✅ API calls exitosas
- ✅ Manejo de errores de conexión
- ✅ Almacenamiento local
- ✅ Sincronización offline
- ✅ Validación de datos

### **Pruebas de UI/UX**
- ✅ Navegación entre páginas
- ✅ Responsividad móvil
- ✅ Elementos interactivos
- ✅ Estados de loading
- ✅ Mensajes de error/éxito

## 🔧 Configuración Personalizada

### Cypress Commands Personalizados
```typescript
// Uso en pruebas E2E
cy.loginPaciente(); // Login automático de paciente
cy.loginDoctor(); // Login automático de doctor
cy.navegarA('citas'); // Navegación rápida
```

### Mocks y Stubs
Los servicios están mockeados para:
- Simular respuestas del servidor
- Probar casos de error
- Acelerar la ejecución
- Aislar componentes

## 📈 Métricas de Calidad

### Cobertura de Código Objetivo
- **Servicios**: 90%+
- **Componentes**: 85%+
- **Guards**: 95%+
- **Total**: 85%+

### Criterios de Éxito
- ✅ Todas las pruebas pasan
- ✅ Cobertura mínima alcanzada
- ✅ No hay warnings críticos
- ✅ Performance dentro de límites

## 🐛 Debugging y Solución de Problemas

### Problemas Comunes

**1. Cypress no encuentra elementos:**
```typescript
// Usar data-cy attributes
cy.get('[data-cy="login-button"]')
// En lugar de clases CSS que pueden cambiar
cy.get('.btn-primary')
```

**2. Tests unitarios fallan:**
```bash
# Limpiar caché
npm run test -- --clearCache

# Verificar imports y mocks
```

**3. Error de conectividad:**
```bash
# Verificar que la app esté corriendo
ionic serve

# Verificar configuración de baseUrl en cypress.config.ts
```

## 📱 Testing para APK

### Preparación para Build
```bash
# Ejecutar todas las pruebas antes del build
npm run test
npm run e2e:run

# Solo si todas pasan, proceder con:
npm run build:prod
npm run android:build
```

### Validación Pre-Release
- ✅ Todas las pruebas pasan
- ✅ Cobertura de código adecuada
- ✅ No hay vulnerabilidades críticas
- ✅ Performance optimizada

## 📝 Reporting

Los reportes se generan en:
- `coverage/` - Reportes de cobertura
- `cypress/screenshots/` - Screenshots de errores
- `cypress/videos/` - Videos de ejecución E2E

## 🎓 Mejores Prácticas

1. **Escribir pruebas antes del código** (TDD)
2. **Mantener pruebas simples y enfocadas**
3. **Usar nombres descriptivos**
4. **Limpiar datos después de cada prueba**
5. **Mockear dependencias externas**
6. **Probar casos edge y errores**

---

**Desarrollado para cumplir con los estándares de calidad en aplicaciones de salud móvil** 🏥📱
