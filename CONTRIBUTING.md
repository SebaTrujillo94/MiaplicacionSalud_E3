# Guía de Contribución

¡Gracias por tu interés en contribuir a Mi Aplicación Salud! 🎉

## Cómo contribuir

### Reportar bugs

1. Verifica si el bug ya está reportado en [Issues](../../issues)
2. Si no existe, crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si es aplicable
   - Información del dispositivo/navegador

### Sugerir nuevas características

1. Abre un issue con la etiqueta "enhancement"
2. Describe la funcionalidad propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos de uso si es posible

### Proceso de desarrollo

1. **Fork** el repositorio
2. **Clone** tu fork localmente:
   ```bash
   git clone https://github.com/tu-usuario/mi-aplicacion-salud.git
   ```
3. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
4. **Desarrolla** tu feature
5. **Prueba** tus cambios:
   ```bash
   npm run test
   npm run lint
   ```
6. **Commit** siguiendo el formato:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad para X"
   ```
7. **Push** a tu fork:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
8. **Crea un Pull Request**

## Estándares de código

### Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato (no afectan funcionalidad)
- `refactor:` refactorización de código
- `test:` agregar o modificar tests
- `chore:` tareas de mantenimiento

### Código

- Usa TypeScript
- Sigue las reglas de ESLint configuradas
- Escribe tests para nuevas funcionalidades
- Documenta funciones complejas
- Usa nombres descriptivos para variables y funciones

### Pull Requests

- Título descriptivo
- Descripción clara de los cambios
- Referencias a issues relacionados
- Screenshots si hay cambios visuales
- Tests que pasen

## Configuración del entorno de desarrollo

1. Instala Node.js (versión 18+)
2. Instala Ionic CLI: `npm install -g @ionic/cli`
3. Clona el repositorio
4. Instala dependencias: `npm install`
5. Inicia el servidor: `ionic serve`

## ¿Necesitas ayuda?

- Revisa la [documentación](README.md)
- Abre un issue con la etiqueta "question"
- Contacta a los mantenedores

¡Esperamos tus contribuciones! 🚀
