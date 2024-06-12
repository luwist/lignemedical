import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'join',
        loadChildren: () => import('./join/join.routes').then((m) => m.routes),
      },
      {
        path: 'login',
        title: 'Iniciar Sesion',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'verify-email',
        title: 'Verifica tu correo electronico',
        loadComponent: () =>
          import('./verify-email/verify-email.component').then(
            (m) => m.VerifyEmailComponent
          ),
      },
    ],
  },
];
