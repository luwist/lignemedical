import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./register.component').then((m) => m.RegisterComponent),
    children: [
      {
        path: 'patient',
        title: 'Crear una cuenta de paciente',
        loadComponent: () =>
          import('./patient/patient.component').then((m) => m.PatientComponent),
      },
      {
        path: 'specialist',
        title: 'Crear una cuenta de especialista',
        loadComponent: () =>
          import('./specialist/specialist.component').then(
            (m) => m.SpecialistComponent
          ),
      },
    ],
  },
];
