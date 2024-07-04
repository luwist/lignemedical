import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
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
      label: 'Turnos',
      path: '/appointment',
    },
    {
      label: 'Reservar turno',
      path: '/booking',
    },
  ];
}
