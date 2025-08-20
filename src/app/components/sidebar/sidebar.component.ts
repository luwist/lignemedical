import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgTooltipDirective } from '../ui/ng-tooltip/ng-tooltip.directive';
import { SvgIconComponent } from '../ui/svg-icon/svg-icon.component';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    HlmSkeletonComponent,
    SvgIconComponent,
    NgTooltipDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items: any = [];

  currentUser$!: Observable<User | null>;

  constructor(
    private _store: Store<AppState>,
    private translate: TranslateService,
    private _authService: AuthService,
    private _router: Router
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
                icon: 'category',
              },
              {
                label: this.translate.instant('menu.users'),
                path: '/users',
                icon: 'profile-2user',
              },
              {
                label: this.translate.instant('menu.appointments'),
                path: '/appointment',
                icon: 'document-text',
              },
              {
                label: this.translate.instant('menu.patients'),
                path: '/patients',
                icon: 'profile-2user',
              },
              {
                label: this.translate.instant('menu.bookAppointment'),
                path: '/booking',
                icon: 'calendar-edit',
              },
            ];
            break;
          case 'doctor':
            this.items = [
              {
                label: this.translate.instant('menu.appointments'),
                path: '/session',
                icon: 'document-text',
              },
              {
                label: this.translate.instant('menu.patients'),
                path: '/patients',
                icon: 'profile-2user',
              },
            ];
            break;
          case 'paciente':
            this.items = [
              {
                label: this.translate.instant('menu.appointments'),
                path: '/appointment',
                icon: 'document-text',
              },
              {
                label: this.translate.instant('menu.bookAppointment'),
                path: '/booking',
                icon: 'calendar-edit',
              },
            ];
            break;
        }
      }
    });
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
