import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRepository } from '@app/repositories';
import { AuthService } from '@app/services';

export const isDoctorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userRepository = inject(UserRepository);
  const router = inject(Router);

  authService.currentUser$.subscribe(async (user) => {
    const uid = user?.uid;

    if (uid !== undefined) {
      const role = await userRepository.getRoleById(uid);

      switch (role) {
        case 'administrador':
          router.navigateByUrl('/dashboard');
          break;
        case 'paciente':
          router.navigateByUrl('/appointment');
          break;
      }
    }
  });

  return true;
};
