import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        title: 'Iniciar Sesion',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
];
