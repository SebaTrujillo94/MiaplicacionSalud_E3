import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Función para inicializar el tema
function initializeTheme() {
  // Verificar tema guardado
  const savedTheme = localStorage.getItem('darkMode');
  let isDark = false;
  
  if (savedTheme !== null) {
    isDark = savedTheme === 'true';
  } else {
    // Si no hay tema guardado, usar preferencia del sistema
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('darkMode', isDark.toString());
  }
  
  // Aplicar tema inmediatamente
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }
}

// Inicializar tema antes de cargar la aplicación
initializeTheme();

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});
