import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';
import { UserRepository } from '@app/repositories';
import { AuthService, FirestoreService } from '@app/services';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { exhaustMap, from, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    private _route: ActivatedRoute,
    private _firestore: FirestoreService,
    private _userRepository: UserRepository,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user$ = this._authService.currentUser$.pipe(
      take(1),
      exhaustMap(() => this._authService.currentUser$.pipe(
        take(1),
        switchMap(user => {
          if (user) {
            const result = this._userRepository.getUserById(user.uid);

            return from(result);
          }

          return of(null);
        })
      ))
    )
  }
}
