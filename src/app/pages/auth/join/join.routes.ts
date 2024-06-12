import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./join.component').then((m) => m.JoinComponent),
    children: [
      {
        path: 'onboarding',
        title: 'Elige una cuenta',
        loadComponent: () =>
          import('./onboarding/onboarding.component').then(
            (m) => m.OnboardingComponent
          ),
      },
      {
        path: 'patient',
        title: 'Crear una cuenta',
        loadComponent: () =>
          import('./specialist/specialist.component').then(
            (m) => m.SpecialistComponent
          ),
      },
      {
        path: 'specialist',
        title: 'Crear una cuenta',
        loadComponent: () =>
          import('./specialist/specialist.component').then(
            (m) => m.SpecialistComponent
          ),
      },
    ],
  },
];
