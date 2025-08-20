import { Routes } from '@angular/router';
import { authGuard, isEmailVerifiedGuard } from './guards';
import { accountGuard } from './guards/account/account.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesion',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    // canActivate: [accountGuard],
  },
  {
    path: 'onboarding',
    title: 'Elige tu cuenta',
    loadComponent: () =>
      import('./pages/onboarding/onboarding.component').then(
        (m) => m.OnboardingComponent
      ),
    // canActivate: [accountGuard],
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
    canActivate: [isEmailVerifiedGuard],
  },
];
