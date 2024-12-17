import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AvatarService, LanguageService } from '@app/services';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { Store } from '@ngrx/store';
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
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    TranslateModule,

    BrnMenuTriggerDirective,

    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    HlmSkeletonComponent
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent implements OnInit {
  label!: string;
  currentUser$!: Observable<User | null>;

  languages: any = [
    {
      code: "en",
      name: "english",
      image: "assets/flags/en-US.png",
    },
    {
      code: "pt",
      name: "português",
      image: "assets/flags/pt-BR.png",
    },
    {
      code: "es",
      name: "español",
      image: "assets/flags/es-ES.png",
    },
  ]

  currentLanguage: any = {
    code: "es",
    image: "assets/flags/es-ES.png",
  };

  constructor(
    private _router: Router,
    private _store: Store<AppState>,
    private _authService: AuthService,
    private _avatarService: AvatarService,
    private _languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this._store.select(selectUser);
  }

  getFallback(name: any): string {
    return this._avatarService.getFallback(name);
  }

  getBackgroundColor(name: any): string {
    return this._avatarService.getBackgroundColorByName(name);
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }

  onChangeLanguage(ctx: any, code: string, image: string) {
    this.currentLanguage = {...this.currentLanguage, code, image}

    this._languageService.changeLanguage(code);

    ctx.close();
  }
}
