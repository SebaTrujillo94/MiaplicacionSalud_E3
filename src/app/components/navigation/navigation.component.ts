import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { 
  IonButton, 
  IonIcon, 
  IonButtons, 
  IonItem, 
  IonLabel,
  IonList,
  IonPopover,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  personOutline, 
  helpCircleOutline, 
  callOutline,
  menuOutline,
  logOutOutline,
  chevronBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonButtons,
    IonItem,
    IonLabel,
    IonList,
    IonPopover,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class NavigationComponent {
  @Input() showBackButton: boolean = false;
  @Input() pageTitle: string = '';
  @Input() currentPage: string = '';

  isPopoverOpen = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      homeOutline,
      personOutline,
      helpCircleOutline,
      callOutline,
      menuOutline,
      logOutOutline,
      chevronBackOutline
    });
  }

  navigateTo(route: string) {
    this.isPopoverOpen = false;
    this.router.navigate([route]);
  }

  goBack() {
    window.history.back();
  }

  togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  async logout() {
    this.isPopoverOpen = false;
    
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            // Limpiar datos de sesión
            localStorage.removeItem('currentUser');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('isLoggedIn');
            
            // Navegar al login
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  getMenuItems() {
    const allItems = [
      { 
        label: 'Inicio', 
        route: '/home', 
        icon: 'home-outline',
        show: this.currentPage !== 'home'
      },
      { 
        label: 'Mi Perfil', 
        route: '/perfil', 
        icon: 'person-outline',
        show: this.currentPage !== 'perfil'
      },
      { 
        label: 'Contacto', 
        route: '/contacto', 
        icon: 'call-outline',
        show: this.currentPage !== 'contacto'
      },
      { 
        label: 'FAQ', 
        route: '/faq', 
        icon: 'help-circle-outline',
        show: this.currentPage !== 'faq'
      }
    ];

    return allItems.filter(item => item.show);
  }
}
