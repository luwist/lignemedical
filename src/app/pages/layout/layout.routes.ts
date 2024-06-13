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
    ],
  },
];
