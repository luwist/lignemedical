import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AuthService } from '@app/services';
import { from, Observable, of, switchMap } from 'rxjs';
import { Role } from '@app/enums';
import { User } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  items: any = [
    {
      label: 'Usuarios',
      path: '/users',
    },
    {
      label: 'Turnos',
      path: '/appointment',
    },
    {
      label: 'Pacientes',
      path: '/patients',
    },
  ];

  currentUser$!: Observable<User | null>;
  newCurrentUser$!: Observable<any>;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;
  }
}
