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
  selector: 'app-change-language',
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

    HlmSkeletonComponent,
  ],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  languages: any = [
    {
      code: 'en',
      name: 'english',
      image: 'assets/flags/united-states.png',
    },
    {
      code: 'pt',
      name: 'português',
      image: 'assets/flags/portugal.png',
    },
    {
      code: 'es',
      name: 'español',
      image: 'assets/flags/spain.png',
    },
  ];

  currentLanguage: any = {
    code: 'es',
    image: 'assets/flags/spain.png',
  };

  constructor(private _languageService: LanguageService) {}

  onChangeLanguage(ctx: any, code: string, image: string) {
    this.currentLanguage = { ...this.currentLanguage, code, image };

    this._languageService.changeLanguage(code);

    ctx.close();
  }
}
