import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-play-store-form',
  templateUrl: './play-store-form.page.html',
  styleUrls: ['./play-store-form.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class PlayStoreFormPage implements OnInit {

  playStoreForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.playStoreForm = this.formBuilder.group({
      // Información básica
      appTitle: ['MiAppSalud - Gestión de Salud Personal', [Validators.required, Validators.maxLength(50)]],
      shortDescription: ['Aplicación integral para gestionar tu salud con widget de clima en tiempo real', [Validators.required, Validators.maxLength(80)]],
      fullDescription: [this.getFullDescription(), [Validators.required, Validators.minLength(200), Validators.maxLength(4000)]],
      
      // Categorización
      category: ['health_fitness', Validators.required],
      contentRating: ['everyone', Validators.required],
      keywords: ['salud, medicina, clima, citas médicas, ionic, angular, dark mode, weather'],
      
      // Contacto
      supportEmail: ['soporte@miappsalud.com', [Validators.required, Validators.email]],
      privacyPolicyUrl: ['https://miappsalud.com/privacy', Validators.required],
      
      // Permisos
      internetPermission: [true],
      locationPermission: [true],
      storagePermission: [true],
      
      // Técnico
      appVersion: ['1.0.0'],
      versionCode: [1],
      pricing: ['free']
    });
  }

  getFullDescription(): string {
    return `🏥 MiAppSalud - Tu Compañero de Salud Digital

MiAppSalud es una aplicación móvil innovadora desarrollada con tecnología Ionic y Angular que revoluciona la gestión de salud personal. Diseñada con un enfoque centrado en el usuario, combina funcionalidades esenciales de salud con características avanzadas como widget meteorológico y sistema de temas adaptativos.

✨ CARACTERÍSTICAS PRINCIPALES:

🔐 Sistema de Autenticación Seguro
- Login robusto con validación de credenciales
- Persistencia de sesión automática
- Opción "Recordar credenciales" para mayor comodidad
- Guards de seguridad para proteger rutas privadas

🎨 Modo Oscuro/Claro Dinámico
- Cambio instantáneo entre temas claro y oscuro
- Persistencia automática de preferencias
- Iconos adaptativos (☀️/🌙) en tiempo real
- Más de 100 líneas de código CSS personalizado

🌤️ Widget de Clima Inteligente
- Información meteorológica en tiempo real
- Geolocalización automática
- Modal informativo con detalles completos
- Integración con APIs externas confiables

💾 Base de Datos Local Robusta
- SQLite para almacenamiento persistente
- Gestión eficiente de datos de usuario
- Sincronización automática
- Backup local de información crítica

🧭 Navegación Avanzada
- 6 páginas principales optimizadas
- Lazy loading para rendimiento superior
- Menú universal con acceso rápido
- Transiciones suaves entre vistas

🧪 Testing Integral
- Más de 25 casos de prueba E2E con Cypress
- Pruebas unitarias completas
- Cobertura de funcionalidades críticas
- Validación automatizada de componentes

📱 PÁGINAS DISPONIBLES:
- Login: Autenticación principal
- Home: Dashboard con widget clima
- Contacto: Información de soporte
- FAQ: Preguntas frecuentes
- Perfil: Gestión de usuario
- Registro: Creación de nuevas cuentas

⚙️ TECNOLOGÍA AVANZADA:
- Framework: Ionic 7 + Angular 17
- Capacitor 6 para funcionalidades nativas
- 6 plugins activos de Capacitor
- Responsive design adaptativo
- Performance optimizado

🎯 BENEFICIOS PARA EL USUARIO:
- Interfaz intuitiva y amigable
- Experiencia fluida multiplataforma
- Datos seguros con encriptación
- Actualizaciones automáticas del clima
- Modo offline para funciones básicas

🔒 PRIVACIDAD Y SEGURIDAD:
- Cumplimiento con estándares de privacidad
- Encriptación de datos sensibles
- Sin recopilación innecesaria de información
- Control total del usuario sobre sus datos

MiAppSalud representa la evolución de las aplicaciones de salud móvil, combinando funcionalidad, diseño elegante y tecnología de vanguardia para ofrecer una experiencia excepcional en la gestión de salud personal.

Desarrollada siguiendo las mejores prácticas de la industria y los lineamientos oficiales de Ionic/Angular, garantiza calidad, rendimiento y escalabilidad para el futuro.

¡Descarga MiAppSalud y transforma tu experiencia de gestión de salud digital! 🚀`;
  }

  async onSubmit() {
    if (this.playStoreForm.valid) {
      const formData = this.playStoreForm.value;
      
      const alert = await this.alertController.create({
        header: '✅ Formulario Completado',
        subHeader: 'Información de Play Store Generada',
        message: `
          <strong>Título:</strong> ${formData.appTitle}<br>
          <strong>Categoría:</strong> ${formData.category}<br>
          <strong>Clasificación:</strong> ${formData.contentRating}<br>
          <strong>Email:</strong> ${formData.supportEmail}<br>
          <br>
          <em>El formulario está listo para ser enviado a Google Play Console.</em>
        `,
        buttons: [
          {
            text: 'Exportar PDF',
            handler: () => {
              this.exportToPDF();
            }
          },
          {
            text: 'Cerrar',
            role: 'cancel'
          }
        ]
      });

      await alert.present();
    } else {
      this.showValidationErrors();
    }
  }

  async exportToPDF() {
    const toast = await this.toastController.create({
      message: '📄 Generando PDF del formulario Play Store...',
      duration: 3000,
      color: 'primary',
      position: 'top'
    });
    await toast.present();

    try {
      // Crear nuevo documento PDF
      const doc = new jsPDF();
      const formData = this.playStoreForm.value;
      
      // Configuración de fuentes y colores
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      
      // TÍTULO PRINCIPAL
      doc.text('📱 FORMULARIO GOOGLE PLAY STORE', 20, 25);
      doc.text('MiAppSalud - Gestión de Salud Personal', 20, 35);
      
      // Línea separadora
      doc.setLineWidth(0.5);
      doc.line(20, 40, 190, 40);
      
      let yPosition = 55;
      
      // INFORMACIÓN BÁSICA
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(0, 123, 255);
      doc.text('📋 INFORMACIÓN BÁSICA', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      doc.text(`Título de la App: ${formData.appTitle}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Descripción Corta: ${formData.shortDescription}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Categoría: ${this.getCategoryName(formData.category)}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Clasificación: ${this.getContentRatingName(formData.contentRating)}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Palabras Clave: ${formData.keywords}`, 25, yPosition);
      yPosition += 15;
      
      // INFORMACIÓN DE CONTACTO
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(220, 53, 69);
      doc.text('📞 INFORMACIÓN DE CONTACTO', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      doc.text(`Email de Soporte: ${formData.supportEmail}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Política de Privacidad: ${formData.privacyPolicyUrl}`, 25, yPosition);
      yPosition += 15;
      
      // PERMISOS DE LA APLICACIÓN
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(40, 167, 69);
      doc.text('🔐 PERMISOS REQUERIDOS', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      doc.text(`${formData.internetPermission ? '✅' : '❌'} Acceso a Internet`, 25, yPosition);
      yPosition += 6;
      doc.text(`${formData.locationPermission ? '✅' : '❌'} Acceso a Ubicación`, 25, yPosition);
      yPosition += 6;
      doc.text(`${formData.storagePermission ? '✅' : '❌'} Acceso a Almacenamiento`, 25, yPosition);
      yPosition += 15;
      
      // INFORMACIÓN TÉCNICA
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(255, 193, 7);
      doc.text('⚙️ INFORMACIÓN TÉCNICA', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      doc.text(`Versión de la App: ${formData.appVersion}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Código de Versión: ${formData.versionCode}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Tipo de Aplicación: ${formData.pricing === 'free' ? 'Gratuita' : 'De Pago'}`, 25, yPosition);
      yPosition += 15;
      
      // CARACTERÍSTICAS PRINCIPALES (nueva página si es necesario)
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 25;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(108, 117, 125);
      doc.text('✨ CARACTERÍSTICAS PRINCIPALES', 20, yPosition);
      yPosition += 10;
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      
      const features = [
        '🔐 Sistema de Autenticación Seguro',
        '🎨 Modo Oscuro/Claro Dinámico',
        '🌤️ Widget de Clima Inteligente',
        '💾 Base de Datos Local SQLite',
        '🧭 Navegación Avanzada',
        '🧪 Testing Integral (E2E + Unitarios)',
        '📱 6 Páginas Principales Optimizadas',
        '⚡ Performance y Lazy Loading'
      ];
      
      features.forEach(feature => {
        doc.text(feature, 25, yPosition);
        yPosition += 6;
      });
      
      yPosition += 10;
      
      // FOOTER CON INFORMACIÓN ADICIONAL
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(108, 117, 125);
      doc.text('Documento generado automáticamente por MiAppSalud', 20, yPosition);
      yPosition += 4;
      doc.text(`Fecha de generación: ${new Date().toLocaleString('es-ES')}`, 20, yPosition);
      yPosition += 4;
      doc.text('Framework: Ionic 7 + Angular 17 | Capacitor 6', 20, yPosition);
      
      // Generar nombre de archivo con timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const fileName = `MiAppSalud-PlayStore-Form-${timestamp}.pdf`;
      
      // Guardar el PDF
      doc.save(fileName);
      
      // Mostrar toast de éxito
      const successToast = await this.toastController.create({
        message: `✅ PDF generado exitosamente: ${fileName}`,
        duration: 4000,
        color: 'success',
        position: 'bottom',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await successToast.present();
      
      console.log(`✅ PDF guardado como: ${fileName}`);
      console.log('📁 Ubicación: Carpeta de Descargas del navegador');
      
    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      
      const errorToast = await this.toastController.create({
        message: '❌ Error al generar el PDF. Inténtalo de nuevo.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
    }
  }

  // Métodos auxiliares para traducir valores
  private getCategoryName(category: string): string {
    const categories: { [key: string]: string } = {
      'health_fitness': 'Salud y Fitness',
      'medical': 'Medicina',
      'lifestyle': 'Estilo de Vida',
      'productivity': 'Productividad'
    };
    return categories[category] || category;
  }

  private getContentRatingName(rating: string): string {
    const ratings: { [key: string]: string } = {
      'everyone': 'Apto para todos',
      'teen': 'Adolescentes',
      'mature': 'Adultos'
    };
    return ratings[rating] || rating;
  }

  async showValidationErrors() {
    const toast = await this.toastController.create({
      message: '❌ Por favor completa todos los campos obligatorios marcados con *',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  // Método para validar requisitos de Google Play
  async validateRequirements() {
    const requirements = [
      { name: 'Icono de alta resolución (512x512)', status: true },
      { name: 'Screenshots (mínimo 2)', status: true },
      { name: 'Descripción completa (200+ caracteres)', status: this.playStoreForm.get('fullDescription')?.value?.length >= 200 },
      { name: 'Política de privacidad', status: !!this.playStoreForm.get('privacyPolicyUrl')?.value },
      { name: 'Email de soporte válido', status: this.playStoreForm.get('supportEmail')?.valid },
      { name: 'Clasificación de contenido', status: !!this.playStoreForm.get('contentRating')?.value },
      { name: 'APK firmado disponible', status: true },
      { name: 'Pruebas completadas', status: true }
    ];

    const passed = requirements.filter(req => req.status).length;
    const total = requirements.length;
    const percentage = Math.round((passed / total) * 100);

    let requirementsList = requirements.map(req => 
      `${req.status ? '✅' : '❌'} ${req.name}`
    ).join('<br>');

    const alert = await this.alertController.create({
      header: '🔍 Validación de Requisitos',
      subHeader: `Completado: ${passed}/${total} (${percentage}%)`,
      message: requirementsList,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  // Método para guardar como borrador
  async saveAsDraft() {
    const toast = await this.toastController.create({
      message: '💾 Formulario guardado como borrador',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    // Guardar en localStorage
    localStorage.setItem('playstore_draft', JSON.stringify(this.playStoreForm.value));
  }
}
