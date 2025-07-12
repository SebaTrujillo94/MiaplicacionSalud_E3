import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent,IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports:  [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,           
    IonCardHeader,     
    IonCardTitle,      
    IonCardContent,
    IonButton]
})
export class PerfilPage implements OnInit {
  usuario: string = '';
  horaIngreso: string | null = '';
  email: string | null = '';

  private router = inject(Router);

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario') || '';
    this.email = localStorage.getItem('email');
    this.horaIngreso = localStorage.getItem('horaIngreso');
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}