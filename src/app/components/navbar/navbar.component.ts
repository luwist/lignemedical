import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from '@app/services';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Usuarios',
      path: '/users',
    },
    {
      label: 'Pacientes',
      path: '/patients',
    },
    {
      label: 'Turnos',
      path: '/appointment',
    },
    {
      label: 'Reservar turno',
      path: '/booking',
    },
  ];

  currentUser$!: Observable<any>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;
  }
}
