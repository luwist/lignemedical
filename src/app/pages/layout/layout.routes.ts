import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.routes)
      },
      {
        path: '',
        loadChildren: () =>
          import('./doctor/doctor.routes').then((m) => m.routes),
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
        path: 'session',
        title: 'Mis citas',
        loadComponent: () =>
          import('./session/session.component').then(
            (m) => m.SessionComponent
          ),
      },
      {
        path: 'settings',
        title: 'Configuraciones',
        loadComponent: () =>
          import('./configuration/configuration.component').then(
            (m) => m.ConfigurationComponent
          ),
      },
      {
        path: 'account',
        title: 'Mi Perfil',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: '**',
        title: '404 Pagina no encontrada',
        loadComponent: () =>
          import('./not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
];
