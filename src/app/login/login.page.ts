import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonFooter
  ]
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(private router: Router) {}

  login() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const claveGuardada = localStorage.getItem('clave');
    if (this.usuario === usuarioGuardado && this.contrasena === claveGuardada) {
      localStorage.setItem('horaIngreso', new Date().toLocaleString());
      this.router.navigate(['/home']);
    } else {
      alert('Usuario o contraseña incorrecta');
    }
  }

 irARegistrarse() {
  this.router.navigate(['/registrarse']);
}
}