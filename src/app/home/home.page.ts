import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonButtons } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,           
    IonCardHeader,     
    IonCardTitle,      
    IonCardContent,
    IonIcon,
    IonFooter,
    IonButtons
  ]
})
export class HomePage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  usuarios: any[] = [];
  clima: any = null;
  isDark: boolean = false;

  private router = inject(Router);
  private api = inject(ApiService);
  private storage = inject(StorageService);

  async ngOnInit(): Promise<void> {
    // Obtener usuario del almacenamiento persistente
    this.usuario = await this.storage.get('usuario') || localStorage.getItem('usuario') || '';
    
    // Verificar tema guardado
    const savedTheme = await this.storage.get('darkMode');
    if (savedTheme !== null) {
      this.isDark = savedTheme;
      document.body.classList.toggle('dark', this.isDark);
    }

    // Obtener y guardar el clima de hoy con persistencia
    await this.loadWeatherData();
  }

  async loadWeatherData() {
    // Intentar obtener clima de almacenamiento persistente primero
    const cachedClima = await this.storage.get('climaHoy');
    if (cachedClima) {
      this.clima = cachedClima;
    }

    // Luego intentar actualizar desde API
    this.api.getWeather('Santiago').subscribe({
      next: async (data: any) => {
        if (data) {
          this.clima = data;
          // Guardar en ambos storages para redundancia
          await this.storage.set('climaHoy', data);
          localStorage.setItem('climaHoy', JSON.stringify(data));
        }
      },
      error: async (err: any) => {
        // Si no hay datos en cache y falla la API, usar localStorage como fallback
        if (!this.clima && (err.status === 404 || !navigator.onLine)) {
          const local = localStorage.getItem('climaHoy');
          if (local) {
            this.clima = JSON.parse(local);
            // Sincronizar con storage persistente
            await this.storage.set('climaHoy', this.clima);
          }
        }
      }
    });
  }

  async toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    // Persistir preferencia de tema
    await this.storage.set('darkMode', this.isDark);
  }

  login() {
    if (this.usuario === 'admin' && this.contrasena === '1234') {
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  }

  irAContacto() {
    this.router.navigate(['/contacto']);
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  irAFaq() {
    this.router.navigate(['/faq']);
  }

  irAQuienesSomos() {
    this.router.navigate(['/faq']);
  }

  async cerrarSesion() {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      // Limpiar tanto localStorage como almacenamiento persistente
      localStorage.removeItem('usuario');
      localStorage.removeItem('horaIngreso');
      await this.storage.remove('usuario');
      await this.storage.remove('climaHoy');
      this.router.navigate(['/login']);
    }
  }
}