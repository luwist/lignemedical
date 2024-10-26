import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from '@app/services';
import { from, Observable, of, switchMap } from 'rxjs';
import { Role } from '@app/enums';
import { User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { UserRepository } from '@app/repositories';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
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
  newCurrentUser$!: Observable<any>;

  constructor(
    private _authService: AuthService,
    private _userRepository: UserRepository
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;

    this.initMenu();
  }

  initMenu(): void {
    this.currentUser$.subscribe(async (user) => {
      const uid = user?.uid;

      if (uid !== undefined) {
        // const role = await this._userRepository.getRoleById(uid);
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
