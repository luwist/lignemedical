import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'users',
        title: 'Usuarios',
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
      },
      {
        path: 'shift',
        title: 'Mis turnos',
        loadComponent: () =>
          import('./shift/shift.component').then((m) => m.ShiftComponent),
      },
      {
        path: 'booking',
        title: 'Reservar turno',
        loadComponent: () =>
          import('./booking/booking.component').then((m) => m.BookingComponent),
      },
      {
        path: 'appointment',
        title: 'Mis turnos',
        loadComponent: () =>
          import('./appointment/appointment.component').then(
            (m) => m.AppointmentComponent
          ),
      },
      {
        path: 'patients',
        title: 'Pacientes',
        loadComponent: () =>
          import('./patient/patient.component').then((m) => m.PatientComponent),
      },
      {
        path: 'profile',
        title: 'Mi Perfil',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
];
