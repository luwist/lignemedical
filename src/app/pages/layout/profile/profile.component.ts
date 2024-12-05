import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';
import { UserRepository } from '@app/repositories';
import { AuthService, FirestoreService } from '@app/services';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { exhaustMap, from, Observable, of, switchMap, take } from 'rxjs';
import { SchedulesComponent } from './schedules/schedules.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    SchedulesComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
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
