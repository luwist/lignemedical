import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services';

export const isEmailVerifiedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.currentUser$.subscribe((user) => {
    if (!user?.emailVerified) {
      router.navigateByUrl('/verify-email');
    }
  });

  return true;
};
