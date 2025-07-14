import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonFooter, IonButtons, IonToggle, IonLabel, ModalController } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { WeatherModalComponent } from '../components/weather-modal.component';

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
    IonButtons,
    IonToggle,
    IonLabel
  ]
})
export class HomePage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  usuarios: any[] = [];
  clima: any = null;
  isDark: boolean = false;
  weatherData: any = null;
  weatherLoading: boolean = false;

  private router = inject(Router);
  private api = inject(ApiService);
  private storage = inject(StorageService);
  private modalController = inject(ModalController);

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
    this.weatherLoading = true;
    
    // Intentar obtener clima de almacenamiento persistente primero
    const cachedClima = await this.storage.get('climaHoy');
    if (cachedClima) {
      this.clima = cachedClima;
      this.weatherData = cachedClima;
    }

    // Luego intentar actualizar desde API
    this.api.getWeather('Santiago').subscribe({
      next: async (data: any) => {
        if (data) {
          this.clima = data;
          this.weatherData = data;
          // Guardar en ambos storages para redundancia
          await this.storage.set('climaHoy', data);
          localStorage.setItem('climaHoy', JSON.stringify(data));
        }
        this.weatherLoading = false;
      },
      error: async (err: any) => {
        // Si no hay datos en cache y falla la API, usar localStorage como fallback
        if (!this.clima && (err.status === 404 || !navigator.onLine)) {
          const local = localStorage.getItem('climaHoy');
          if (local) {
            this.clima = JSON.parse(local);
            this.weatherData = this.clima;
            // Sincronizar con storage persistente
            await this.storage.set('climaHoy', this.clima);
          }
        }
        this.weatherLoading = false;
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
      // Solo limpiar la sesión activa, NO las credenciales guardadas
      localStorage.removeItem('sesion_activa');
      localStorage.removeItem('horaIngreso');
      await this.storage.remove('climaHoy');
      this.router.navigate(['/login']);
    }
  }

  // Método para obtener el icono del clima
  getWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      'c01d': 'sunny-outline',        // Cielo despejado día
      'c01n': 'moon-outline',         // Cielo despejado noche
      'c02d': 'partly-sunny-outline', // Parcialmente nublado día
      'c02n': 'cloudy-night-outline', // Parcialmente nublado noche
      'c03d': 'cloud-outline',        // Nubes dispersas
      'c03n': 'cloud-outline',
      'c04d': 'cloudy-outline',       // Nubes densas
      'c04n': 'cloudy-outline',
      'r01d': 'rainy-outline',        // Lluvia ligera
      'r01n': 'rainy-outline',
      'r02d': 'rainy-outline',        // Lluvia moderada
      'r02n': 'rainy-outline',
      'r03d': 'rainy-outline',        // Lluvia fuerte
      'r03n': 'rainy-outline',
      's01d': 'snow-outline',         // Nieve ligera
      's01n': 'snow-outline',
      't01d': 'thunderstorm-outline', // Tormenta
      't01n': 'thunderstorm-outline',
      'a01d': 'eye-off-outline',      // Niebla
      'a01n': 'eye-off-outline'
    };
    
    return iconMap[iconCode] || 'cloud-outline';
  }

  // Método para obtener la dirección del viento
  getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  // Método para refrescar los datos del clima
  async refreshWeather() {
    await this.storage.remove('climaHoy');
    localStorage.removeItem('climaHoy');
    this.weatherData = null;
    this.clima = null;
    await this.loadWeatherData();
  }

  // Método para formatear la fecha de actualización
  getLastUpdateTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Método para obtener la hora actual
  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Método para obtener el color del clima (si necesario)
  getWeatherColor(iconCode: string): string {
    // Retorna colores basados en el tipo de clima
    const colorMap: { [key: string]: string } = {
      'c01d': 'warning',        // Soleado - amarillo
      'c01n': 'medium',         // Noche despejada - gris
      'c02d': 'warning',        // Parcialmente nublado día
      'c02n': 'medium',         // Parcialmente nublado noche
      'c03d': 'medium',         // Nubes - gris
      'c03n': 'medium',
      'c04d': 'dark',          // Muy nublado - oscuro
      'c04n': 'dark',
      'r01d': 'primary',       // Lluvia - azul
      'r01n': 'primary',
      'r02d': 'primary',
      'r02n': 'primary',
      'r03d': 'primary',
      'r03n': 'primary',
      't01d': 'danger',        // Tormenta - rojo
      't01n': 'danger'
    };
    
    return colorMap[iconCode] || 'medium';
  }

  // Método para calcular tiempo desde última actualización
  getTimeSinceUpdate(): string {
    // Por simplicidad, retornamos un texto fijo
    // En una implementación real, calcularías la diferencia de tiempo
    return '5 min';
  }

  // Método para abrir el modal del clima
  async openWeatherModal() {
    const modal = await this.modalController.create({
      component: WeatherModalComponent,
      componentProps: {
        clima: this.clima,
        getWeatherIcon: this.getWeatherIcon.bind(this),
        getWeatherColor: this.getWeatherColor.bind(this),
        getCurrentTime: this.getCurrentTime.bind(this),
        getTimeSinceUpdate: this.getTimeSinceUpdate.bind(this),
        refreshWeather: this.refreshWeather.bind(this)
      }
    });
    return await modal.present();
  }
}