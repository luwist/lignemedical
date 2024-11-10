import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getUser } from '@app/store/auth/auth.actions';
import { selectIsUserLogged } from '@app/store/auth/auth.selectors';
import { select, Store } from '@ngrx/store';
import { map, } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  store.dispatch(getUser());

  return store.pipe(
    select(selectIsUserLogged),
    map(isLogged => {      
      if (!isLogged) {        
        router.navigate(['/login']);

        return false;
      }
      
      return true;
    })
  );
};
