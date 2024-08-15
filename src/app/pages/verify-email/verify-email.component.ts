import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterLink, CommonModule, HlmButtonDirective],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  currentUser$: Observable<User | null>;

  constructor(private _router: Router, private _authService: AuthService) {
    this.currentUser$ = this._authService.currentUser$;
  }

  onLogout(): void {
    this._authService.logout();

    this._router.navigateByUrl('/login');
  }
}
