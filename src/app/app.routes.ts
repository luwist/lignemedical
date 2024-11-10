import { Routes } from '@angular/router';
import { authGuard } from './guards';

export const routes: Routes = [
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
    path: 'verify-email',
    title: 'Verifica tu cuenta',
    loadComponent: () =>
      import('./pages/verify-email/verify-email.component').then(
        (m) => m.VerifyEmailComponent
      ),
  },
  {
    path: 'join',
    loadChildren: () =>
      import('./pages/register/register.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
    canActivate: [authGuard]
  },
];
