import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Función de debug para APK
function debugLog(message: string) {
  console.log(`[MiAppSalud Debug] ${message}`);
  // En producción, también mostrar en alert para debug
  if (window.location.protocol === 'capacitor:') {
    console.warn(`[Capacitor Debug] ${message}`);
  }
}

// Función para inicializar el tema
function initializeTheme() {
  debugLog('Inicializando tema...');
  
  // Verificar tema guardado
  const savedTheme = localStorage.getItem('darkMode');
  let isDark = false;
  
  if (savedTheme !== null) {
    isDark = savedTheme === 'true';
    debugLog(`Tema guardado encontrado: ${isDark ? 'oscuro' : 'claro'}`);
  } else {
    // Si no hay tema guardado, usar preferencia del sistema
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('darkMode', isDark.toString());
    debugLog(`Usando tema del sistema: ${isDark ? 'oscuro' : 'claro'}`);
  }
  
  // Aplicar tema inmediatamente
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
  
  debugLog('Tema aplicado correctamente');
}

// Inicializar tema antes de cargar la aplicación
debugLog('Iniciando MiAppSalud...');
initializeTheme();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
}).then(() => {
  debugLog('Bootstrap de Angular completado exitosamente');
}).catch(err => {
  debugLog('Error en bootstrap de Angular: ' + err.message);
  console.error(err);
});
