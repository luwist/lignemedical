import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { isEmailVerifiedGuard } from '@/app/guards';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
    canActivate: [AuthGuard, isEmailVerifiedGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
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
];
