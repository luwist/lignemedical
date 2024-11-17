import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from '@app/services';
import { Observable } from 'rxjs';
import { UserRepository } from '@app/repositories';
import { NotificationComponent } from './notification/notification.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NotificationComponent,
    ProfileMenuComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any = [];

  currentUser$!: Observable<User | null>;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentUser$ = this._store.select(selectUser);

    this.initMenu();
  }

  initMenu(): void {
    this.currentUser$.subscribe(async (user) => {
      const uid = user?.uid;

      if (uid !== undefined) {
        const role: any = 'administrador';

        switch (role) {
          case 'administrador':
            this.items = [
              {
                label: 'Dashboard',
                path: '/dashboard',
              },
              {
                label: 'Usuarios',
                path: '/users',
              },
              {
                label: 'Citas',
                path: '/appointment',
              },
              {
                label: 'Pacientes',
                path: '/patients',
              },
              {
                label: 'Reservar cita',
                path: '/booking',
              },
            ];
            break;
          case 'doctor':
            this.items = [
              {
                label: 'Citas',
                path: '/appointment',
              },
              {
                label: 'Pacientes',
                path: '/patients',
              },
            ];
            break;
          case 'paciente':
            this.items = [
              {
                label: 'Turnos',
                path: '/appointment',
              },
              {
                label: 'Reservar cita',
                path: '/booking',
              },
            ];
            break;
        }
      }
    });
  }
}
