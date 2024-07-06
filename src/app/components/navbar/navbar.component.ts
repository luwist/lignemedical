import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from '@app/services';
import { filter, Observable } from 'rxjs';
import { Role } from '@app/enums';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any = [];

  currentUser$!: Observable<any>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;

    this.checkPermission();
  }

  checkPermission(): void {
    this._authService.currentUser$.subscribe((data) => {
      switch (data.role) {
        case Role.Doctor:
          this.items = [
            {
              label: 'Turnos',
              path: '/appointment',
            },
            {
              label: 'Pacientes',
              path: '/patients',
            },
          ];
          break;
        case Role.Patient:
          this.items = [
            {
              label: 'Turnos',
              path: '/appointment',
            },
            {
              label: 'Reservar turno',
              path: '/booking',
            },
          ];
          break;
      }
    });
  }
}
