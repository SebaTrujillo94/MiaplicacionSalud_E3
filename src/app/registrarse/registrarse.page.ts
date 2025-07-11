import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonNote } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; 

function rutValidator(control: AbstractControl): ValidationErrors | null {
  const rut = control.value;
  if (!rut) return null;
  const rutRegex = /^\d{7,8}-[0-9kK]$/;
  return rutRegex.test(rut) ? null : { rutInvalido: true };
}

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const clave = form.get('clave')?.value;
  const repetirClave = form.get('repetirClave')?.value;
  return clave === repetirClave ? null : { noCoincide: true };
}

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonNote,
    CommonModule,
  ]
})
export class RegistrarsePage {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, rutValidator]],
      clave: ['', [Validators.required, Validators.minLength(4)]],
      repetirClave: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  registrar() {
    if (this.registroForm.valid) {
      localStorage.setItem('usuario', this.registroForm.value.usuario);
      localStorage.setItem('clave', this.registroForm.value.clave);
      localStorage.setItem('email', this.registroForm.value.email);
      localStorage.setItem('rut', this.registroForm.value.rut);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }
}