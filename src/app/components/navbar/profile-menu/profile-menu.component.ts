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

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent implements OnInit {
  fallBack!: string;
  currentUser$!: Observable<User | null>;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this._authService.currentUser$;
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
