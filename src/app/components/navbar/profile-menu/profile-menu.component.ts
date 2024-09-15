import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrnMenuTriggerDirective,

    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuItemIconDirective,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent implements OnInit {
  label!: string;
  currentUser$!: Observable<User | null>;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;

    this.getLabel();
  }

  getLabel() {
    this.currentUser$.subscribe((user) => {
      if (user !== null && user.displayName !== null) {
        this.label = user.displayName
          .split(' ')
          .map((letter: string) => letter[0])
          .join('');
      } else {
        this.label = '';
      }
    });
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
