# Mi Aplicación Salud 🏥

Una aplicación móvil desarrollada con Ionic y Angular para el manejo de información de salud.

## 📱 Características

- **Interfaz moderna**: Diseño intuitivo y responsivo
- **Multiplataforma**: Compatible con iOS y Android
- **Gestión de datos**: Almacenamiento local con Ionic Storage
- **Geolocalización**: Integración con servicios de ubicación
- **Experiencia nativa**: Utiliza Capacitor para funcionalidades nativas

## 🛠️ Tecnologías

- **Framework**: Angular 20
- **UI Framework**: Ionic 8
- **Capacitor**: 7.4.0
- **TypeScript**: 5.8
- **Storage**: Ionic Storage Angular

## 🚀 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Ionic CLI

### Pasos de instalación

1. Clona el repositorio:
```bash
git clone https://github.com/desarrollador-salud/mi-aplicacion-salud.git
cd mi-aplicacion-salud
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación en modo desarrollo:
```bash
ionic serve
```

## 📱 Construcción para móvil

### Android

```bash
ionic capacitor add android
ionic capacitor build android
ionic capacitor open android
```

### iOS

```bash
ionic capacitor add ios
ionic capacitor build ios
ionic capacitor open ios
```

## 🧪 Testing

Ejecuta las pruebas unitarias:
```bash
npm run test
```

## 📝 Scripts disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run test` - Ejecuta las pruebas unitarias
- `npm run lint` - Ejecuta el linter para verificar el código

## 🏗️ Estructura del proyecto

```
src/
├── app/                 # Módulos y componentes de la aplicación
├── assets/             # Recursos estáticos (imágenes, iconos, etc.)
├── environments/       # Configuración de entornos
└── theme/             # Estilos globales y variables de tema
```




## 🙏 Agradecimientos

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)
