import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getUser } from '@app/store/auth/auth.actions';
import { selectIsUserLogged, selectUser } from '@app/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

export const isEmailVerifiedGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(getUser());

  return store.pipe(
    select(selectUser),
    map(user => {
      if (user !== null && !user?.emailVerified) {        
        router.navigateByUrl('/verify-email');

        return false;
      }
      
      return true;
    })
  );
};
