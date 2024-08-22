import { Routes } from '@angular/router';
import { isAdminGuard, isDoctorGuard } from '@app/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.routes),
        canActivate: [isAdminGuard],
      },
      {
        path: '',
        loadChildren: () =>
          import('./doctor/doctor.routes').then((m) => m.routes),
        canActivate: [isDoctorGuard],
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
        path: 'settings',
        title: 'Configuraciones',
        loadComponent: () =>
          import('./configuration/configuration.component').then(
            (m) => m.ConfigurationComponent
          ),
      },
      {
        path: ':uid',
        title: 'Mi Perfil',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
];
