import { Component, OnInit } from '@angular/core';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileMenuComponent, ChangeLanguageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  currentDate = new Date();

  items: any = [];

  currentUser$!: Observable<User | null>;

  constructor(
    private _store: Store<AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this._store.select(selectUser);

    this.initMenu();

    this.translate.onLangChange.subscribe(() => {
      this.initMenu();
    });
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
                label: this.translate.instant('menu.dashboard'),
                path: '/dashboard',
              },
              {
                label: this.translate.instant('menu.users'),
                path: '/users',
              },
              {
                label: this.translate.instant('menu.appointments'),
                path: '/appointment',
              },
              {
                label: this.translate.instant('menu.patients'),
                path: '/patients',
              },
              {
                label: this.translate.instant('menu.bookAppointment'),
                path: '/booking',
              },
            ];
            break;
          case 'doctor':
            this.items = [
              {
                label: this.translate.instant('menu.appointments'),
                path: '/session',
              },
              {
                label: this.translate.instant('menu.patients'),
                path: '/patients',
              },
            ];
            break;
          case 'paciente':
            this.items = [
              {
                label: this.translate.instant('menu.appointments'),
                path: '/appointment',
              },
              {
                label: this.translate.instant('menu.bookAppointment'),
                path: '/booking',
              },
            ];
            break;
        }
      }
    });
  }
}
