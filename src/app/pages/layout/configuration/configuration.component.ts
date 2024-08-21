import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '@app/services';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    CommonModule,

    HlmInputDirective,
    HlmLabelDirective,

    HlmSeparatorDirective,
    BrnSeparatorComponent,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  currentUser$!: Observable<User | null>;

  constructor(private _authService: AuthService) {
    this.currentUser$ = this._authService.currentUser$;
  }
}
