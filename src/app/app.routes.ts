import { Routes } from '@angular/router';
import { AuthGuard } from './autentication/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    title: 'Login',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'Home',
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    title: 'Dashboard',
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent),
    title: 'Registrar',
  },

  {
    path: 'comparacao',
    loadComponent: () =>
      import('./pages/comparacao/comparacao').then((m) => m.ComparacaoComponent),
    title: 'Comparar Carros',
  },

  {
    path: 'visita',
    loadComponent: () =>
      import('./pages/visita/visita').then((m) => m.VisitaComponent),
    title: 'Visitar Loja',
    canActivate: [AuthGuard]
  },

];