import { Component, inject, OnInit } from '@angular/core';
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
  IonFooter,
  IonCheckbox
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
    IonFooter,
    IonCheckbox
  ]
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  recordarCredenciales: boolean = false;

  private router = inject(Router);

  ngOnInit() {
    this.cargarCredencialesGuardadas();
  }

  cargarCredencialesGuardadas() {
    const recordar = localStorage.getItem('recordar_credenciales');
    if (recordar === 'true') {
      this.usuario = localStorage.getItem('credenciales_usuario') || '';
      this.contrasena = localStorage.getItem('credenciales_contrasena') || '';
      this.recordarCredenciales = true;
    }
  }

  login() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const claveGuardada = localStorage.getItem('clave');
    
    if (this.usuario === usuarioGuardado && this.contrasena === claveGuardada) {
      // Guardar credenciales si el usuario lo desea
      if (this.recordarCredenciales) {
        localStorage.setItem('credenciales_usuario', this.usuario);
        localStorage.setItem('credenciales_contrasena', this.contrasena);
        localStorage.setItem('recordar_credenciales', 'true');
      } else {
        // Si no quiere recordar, borrar credenciales guardadas
        localStorage.removeItem('credenciales_usuario');
        localStorage.removeItem('credenciales_contrasena');
        localStorage.removeItem('recordar_credenciales');
      }
      
      // Establecer sesión activa
      localStorage.setItem('sesion_activa', 'true');
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