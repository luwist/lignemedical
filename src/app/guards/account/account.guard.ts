import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getUser } from '@app/store/auth/auth.actions';
import { selectIsUserLogged, selectUser } from '@app/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

export const accountGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(getUser());

  return store.pipe(
    select(selectUser),
    map((user) => {
      console.log(user);

      if (user) {
        console.log('Redireccionar al inicio');
        router.navigate(['/']);

        return false;
      }

      return true;
    })
  );
};
