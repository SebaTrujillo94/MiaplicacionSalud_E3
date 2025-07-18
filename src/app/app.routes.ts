import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then( m => m.ContactoPage)
  },
  {
  path: 'faq',
  loadComponent: () => import('./faq/faq.page').then(m => m.FAQPage)
  },
  {
    path: 'registrarse',
    loadComponent: () => import('./registrarse/registrarse.page').then( m => m.RegistrarsePage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'play-store-form',
    loadComponent: () => import('./play-store-form/play-store-form.page').then( m => m.PlayStoreFormPage)
  },
];
