import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    // Cargar tema guardado o detectar preferencia del sistema
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      this.isDarkMode = savedTheme === 'true';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  toggleTheme(): boolean {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    return this.isDarkMode;
  }

  setTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    this.applyTheme();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode;
  }

  private applyTheme() {
    // Aplicar al elemento html (para Ionic)
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    // También al body por compatibilidad
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
