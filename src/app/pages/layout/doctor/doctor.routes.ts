import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patients',
    title: 'Pacientes',
    loadComponent: () =>
      import('./patient/patient.component').then((m) => m.PatientComponent),
  },
];
