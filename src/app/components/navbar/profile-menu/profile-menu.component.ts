import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    BrnMenuTriggerDirective,

    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuItemIconDirective,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent implements OnInit {
  fallBack!: string;
  user$ = this._authService.authState$.pipe(
    filter((state) => (state ? true : false))
  );

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.user$.subscribe((data) => {
      if (data !== null && data.displayName !== null) {
        this.fallBack =
          data.displayName.split(' ')[0][0] + data.displayName.split(' ')[1][0];
      } else {
        this.fallBack = 'LM';
      }
    });
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
