import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    title: 'Iniciar sesion',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'onboarding',
    title: 'Elige tu cuenta',
    loadComponent: () =>
      import('./pages/onboarding/onboarding.component').then(
        (m) => m.OnboardingComponent
      ),
  },
  {
    path: 'join',
    loadChildren: () =>
      import('./pages/register/register.routes').then((m) => m.routes),
  },
];
