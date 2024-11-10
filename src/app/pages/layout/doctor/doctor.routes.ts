import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patients',
    title: 'Pacientes',
    loadComponent: () =>
      import('./patient/patient.component').then((m) => m.PatientComponent),
  },
  // {
  //   path: 'appointment',
  //   title: 'Mis citas',
  //   loadComponent: () =>
  //     import('./appointment/appointment.component').then(
  //       (m) => m.AppointmentComponent
  //     ),
  // },
];
