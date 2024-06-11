import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    title: 'Iniciar Sesion',
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
    path: 'join-specialist',
    title: 'Unete como un especialista',
    loadComponent: () =>
      import('./pages/join-specialist/join-specialist.component').then(
        (m) => m.JoinSpecialistComponent
      ),
  },
  {
    path: 'join-patient',
    title: 'Unete como un paciente',
    loadComponent: () =>
      import('./pages/join-patient/join-patient.component').then(
        (m) => m.JoinPatientComponent
      ),
  },
];
