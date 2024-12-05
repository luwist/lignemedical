import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { User } from '@app/store/auth/auth.state';
import { Store } from '@ngrx/store';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(private _router: Router, private _authService: AuthService, private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.currentUser$ = this._store.select(selectUser);
  }

  async onLogout(): Promise<void> {
    this._authService.logout();

    await this._router.navigateByUrl('/login');
  }
}
