import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { location, locationOutline, callOutline, mailOutline, trash } from 'ionicons/icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonButton,
    IonIcon,
  ]
})
export class ContactoPage {
  latitud: number | null = null;
  longitud: number | null = null;
  mapaUrl: SafeResourceUrl | null = null;
  estadoGPS: string = 'Listo para obtener ubicación';

  constructor() {
    addIcons({location,trash,locationOutline,callOutline,mailOutline});
  }

  ultimasConsultas = [
    { nombre: 'Dra. Ana Pérez', especialidad: 'Cardiología', fecha: '2024-05-20', hora: '10:00' },
    { nombre: 'Dr. Luis Gómez', especialidad: 'Dermatología', fecha: '2024-04-15', hora: '15:30' },
    { nombre: 'Dra. Marta Ruiz', especialidad: 'Pediatría', fecha: '2024-03-10', hora: '09:00' },
    { nombre: 'Dr. Juan Torres', especialidad: 'Neurología', fecha: '2024-02-28', hora: '12:00' },
    { nombre: 'Dra. Paula Díaz', especialidad: 'Ginecología', fecha: '2024-01-18', hora: '11:15' },
    { nombre: 'Dr. Carlos Méndez', especialidad: 'Oftalmología', fecha: '2023-12-05', hora: '16:45' }
  ];

  proximasConsultas = [
    { nombre: 'Dra. Laura Sánchez', especialidad: 'Endocrinología', fecha: '2025-06-10', hora: '08:30', estado: 'pendiente' },
    { nombre: 'Dr. Mario Vargas', especialidad: 'Traumatología', fecha: '2025-06-15', hora: '14:00', estado: 'pendiente' },
    { nombre: 'Dra. Silvia Romero', especialidad: 'Reumatología', fecha: '2025-06-20', hora: '10:45', estado: 'pendiente' },
    { nombre: 'Dr. Andrés López', especialidad: 'Psiquiatría', fecha: '2025-06-25', hora: '13:30', estado: 'pendiente' },
    { nombre: 'Dra. Patricia León', especialidad: 'Otorrinolaringología', fecha: '2025-07-01', hora: '09:15', estado: 'pendiente' },
    { nombre: 'Dr. Ernesto Gil', especialidad: 'Urología', fecha: '2025-07-05', hora: '15:00', estado: 'pendiente' }
  ];

  private sanitizer = inject(DomSanitizer);

  // Métodos para cambiar estado
  confirmarCita(consulta: any) {
    consulta.estado = 'confirmada';
  }
  cancelarCita(consulta: any) {
    consulta.estado = 'cancelada';
  }

  // Geolocalización y mapa seguro
  async obtenerUbicacion() {
    this.estadoGPS = 'Verificando permisos...';
    
    try {
      console.log('🔍 Iniciando proceso de geolocalización...');
      
      // Verificar permisos actuales
      console.log('📋 Verificando permisos actuales...');
      const permissions = await Geolocation.checkPermissions();
      console.log('📍 Estado actual de permisos:', permissions);
      
      if (permissions.location !== 'granted') {
        console.log('❌ Permisos no concedidos, solicitando...');
        this.estadoGPS = 'Solicitando permisos...';
        
        const requestResult = await Geolocation.requestPermissions();
        console.log('📋 Resultado de solicitud de permisos:', requestResult);
        
        if (requestResult.location !== 'granted') {
          this.estadoGPS = 'Permisos denegados';
          alert('❌ PERMISOS DENEGADOS\n\nPara usar el GPS:\n1. Ve a Configuración → Aplicaciones\n2. Busca "MiaplicacionSalud"\n3. Activa permisos de ubicación\n4. Vuelve a intentar');
          return;
        }
      }
      
      console.log('✅ Permisos concedidos, obteniendo ubicación...');
      this.estadoGPS = 'Obteniendo ubicación GPS...';
      
      // Configuración robusta para obtener ubicación
      const options = {
        enableHighAccuracy: true,  // Usar GPS de alta precisión
        timeout: 20000,           // 20 segundos timeout
        maximumAge: 0             // No usar caché, obtener ubicación fresca
      };
      
      console.log('🌍 Configuración GPS:', options);
      
      const position = await Geolocation.getCurrentPosition(options);
      
      this.latitud = Number(position.coords.latitude.toFixed(6));
      this.longitud = Number(position.coords.longitude.toFixed(6));
      
      console.log('� ¡Ubicación obtenida exitosamente!');
      console.log(`📍 Coordenadas: ${this.latitud}, ${this.longitud}`);
      console.log(`📏 Precisión: ${position.coords.accuracy} metros`);
      
      this.estadoGPS = `Ubicación obtenida (±${Math.round(position.coords.accuracy)}m)`;
      
      // Crear URL del mapa
      const url = `https://maps.google.com/maps?q=${this.latitud},${this.longitud}&z=16&output=embed`;
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      
      // Mostrar resultado exitoso
      alert(`✅ ¡UBICACIÓN OBTENIDA!\n\n📍 Coordenadas:\nLatitud: ${this.latitud}\nLongitud: ${this.longitud}\n\n📏 Precisión: ±${Math.round(position.coords.accuracy)} metros`);
      
    } catch (error: any) {
      console.error('❌ Error detallado al obtener ubicación:', error);
      
      let errorMessage = '❌ Error desconocido';
      let troubleshooting = '';
      
      if (error.message) {
        console.log('🔍 Mensaje de error:', error.message);
        
        if (error.message.includes('permission') || error.message.includes('denied')) {
          errorMessage = '🚫 Permisos de ubicación denegados';
          troubleshooting = '\n\n🔧 Solución:\n• Ve a Configuración del dispositivo\n• Busca la app MiaplicacionSalud\n• Activa permisos de ubicación';
          this.estadoGPS = 'Error: Permisos denegados';
          
        } else if (error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
          errorMessage = '⏱️ Tiempo de espera agotado';
          troubleshooting = '\n\n🔧 Solución:\n• Asegúrate de estar al aire libre\n• Verifica que el GPS esté activado\n• Reinicia la aplicación';
          this.estadoGPS = 'Error: Timeout GPS';
          
        } else if (error.message.includes('unavailable') || error.message.includes('UNAVAILABLE')) {
          errorMessage = '📡 Servicios de ubicación no disponibles';
          troubleshooting = '\n\n🔧 Solución:\n• Activa el GPS en Configuración\n• Verifica conectividad\n• Reinicia el dispositivo';
          this.estadoGPS = 'Error: GPS no disponible';
          
        } else if (error.message.includes('POSITION_UNAVAILABLE')) {
          errorMessage = '🛰️ No se puede determinar la posición';
          troubleshooting = '\n\n🔧 Solución:\n• Sal al exterior para mejor señal\n• Espera unos minutos\n• Reinicia GPS en configuración';
          this.estadoGPS = 'Error: Posición no disponible';
          
        } else {
          errorMessage = `🐛 Error técnico: ${error.message}`;
          this.estadoGPS = 'Error técnico';
        }
      }
      
      alert(`${errorMessage}${troubleshooting}\n\n🔍 Para más información, revisa la consola del desarrollador.`);
    }
  }

  // Método para limpiar datos
  limpiarUbicacion() {
    this.latitud = null;
    this.longitud = null;
    this.mapaUrl = null;
    this.estadoGPS = 'Ubicación limpiada';
    console.log('🧹 Datos de ubicación limpiados');
  }
}