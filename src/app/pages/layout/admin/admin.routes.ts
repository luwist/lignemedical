import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadComponent: () =>
      import('./user/user.component').then((m) => m.UserComponent),
  },
];
