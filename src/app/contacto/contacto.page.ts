import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { location, locationOutline, callOutline, mailOutline, trash, add, refresh } from 'ionicons/icons';
import { DatabaseService, Consulta } from '../services/database.service';

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
export class ContactoPage implements OnInit, OnDestroy {
  latitud: number | null = null;
  longitud: number | null = null;
  mapaUrl: SafeResourceUrl | null = null;
  estadoGPS: string = 'Listo para obtener ubicación';
  
  // Datos desde la base de datos
  ultimasConsultas: Consulta[] = [];
  proximasConsultas: Consulta[] = [];
  isLoading = true;
  dbStatus = 'Cargando...';

  private sanitizer = inject(DomSanitizer);
  public databaseService = inject(DatabaseService);

  constructor() {
    addIcons({location, trash, locationOutline, callOutline, mailOutline, add, refresh});
  }

  async ngOnInit() {
    console.log('🔄 Inicializando página Contacto...');
    await this.cargarDatos();
  }

  ngOnDestroy() {
    // Limpiar recursos si es necesario
  }

  async cargarDatos() {
    try {
      this.isLoading = true;
      this.dbStatus = 'Cargando datos...';

      // Esperar un momento para que la BD se inicialice
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.databaseService.isDatabaseReady()) {
        this.dbStatus = '✅ Base de datos SQLite activa';
        console.log('📊 Cargando datos desde SQLite...');
      } else {
        this.dbStatus = '⚠️ Usando datos en memoria (modo web)';
        console.log('📄 Cargando datos desde memoria...');
      }

      // Cargar consultas pasadas
      const consultasPasadas = await this.databaseService.obtenerConsultas('pasada');
      this.ultimasConsultas = consultasPasadas;

      // Cargar consultas próximas
      const consultasProximas = await this.databaseService.obtenerConsultas('proxima');
      this.proximasConsultas = consultasProximas;

      console.log('✅ Datos cargados:', {
        pasadas: this.ultimasConsultas.length,
        proximas: this.proximasConsultas.length
      });

    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      this.dbStatus = '❌ Error en base de datos';
    } finally {
      this.isLoading = false;
    }
  }

  // Métodos para cambiar estado con persistencia
  async confirmarCita(consulta: Consulta) {
    if (consulta.id) {
      const success = await this.databaseService.actualizarEstadoConsulta(consulta.id, 'confirmada');
      if (success) {
        consulta.estado = 'confirmada';
        console.log('✅ Cita confirmada en BD');
      } else {
        console.log('⚠️ Error confirmando en BD, actualizado localmente');
        consulta.estado = 'confirmada';
      }
    } else {
      consulta.estado = 'confirmada';
    }
  }

  async cancelarCita(consulta: Consulta) {
    if (consulta.id) {
      const success = await this.databaseService.actualizarEstadoConsulta(consulta.id, 'cancelada');
      if (success) {
        consulta.estado = 'cancelada';
        console.log('✅ Cita cancelada en BD');
      } else {
        console.log('⚠️ Error cancelando en BD, actualizado localmente');
        consulta.estado = 'cancelada';
      }
    } else {
      consulta.estado = 'cancelada';
    }
  }

  // Método para recargar datos
  async recargarDatos() {
    console.log('🔄 Recargando datos...');
    await this.cargarDatos();
  }

  // Método para agregar nueva consulta (ejemplo)
  async agregarConsultaEjemplo() {
    const nuevaConsulta: Omit<Consulta, 'id'> = {
      nombre: 'Dr. Ejemplo',
      especialidad: 'Medicina General',
      fecha: '2025-08-01',
      hora: '10:00',
      estado: 'pendiente',
      tipo: 'proxima'
    };

    const id = await this.databaseService.agregarConsulta(nuevaConsulta);
    if (id) {
      console.log('✅ Nueva consulta agregada con ID:', id);
      await this.cargarDatos(); // Recargar datos
    }
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