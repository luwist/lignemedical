import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@app/models';
import { UserRepository } from '@app/repositories';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { from, Observable, of, switchMap, take } from 'rxjs';

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
  user$!: Observable<User | null>;

  constructor(
    private _userRepository: UserRepository,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this._store.select(selectUser).pipe(
      take(1),
      switchMap(user => {
        if (user) return from(this._userRepository.getUserById(user.uid));

        return of(null);
      })
    );
  }
}
