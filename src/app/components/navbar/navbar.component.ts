import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { Observable, } from 'rxjs';
import { NotificationComponent } from './notification/notification.component';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NotificationComponent,
    ProfileMenuComponent,

    HlmSkeletonComponent
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
    this.currentUser$.subscribe((user) => {
      const uid = user?.uid;

      if (uid !== undefined) {
        const role: any = user?.role;

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
                path: '/session',
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
                label: 'Citas',
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
