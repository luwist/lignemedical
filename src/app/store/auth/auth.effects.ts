import { Injectable } from "@angular/core";
import { Auth, authState, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, from, map, of, switchMap, take } from "rxjs";
import { authenticated, authError, credentialsLogin, getUser, notAuthenticated } from "./auth.actions";
import { User } from "./auth.state";

@Injectable()
export class AuthEffects {
    constructor(
      private actions$: Actions,
      private _auth: Auth,
    ) {}

    getUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(getUser),
        exhaustMap(payload => authState(this._auth).pipe(
          take(1),
          switchMap(authData => {
            if (authData) {
              const user: User = {
                uid: authData.uid,
                emailVerified: authData.emailVerified,
                displayName: authData.displayName,
                email: authData.email,
                photoURL: authData.photoURL,
              }

              return of(authenticated({user: user}))
            } else {
              return of(notAuthenticated())
            }
          })
        ))
      )
    );

    loginWithCredentials$ = createEffect(() =>
      this.actions$.pipe(
        ofType(credentialsLogin),
        exhaustMap(credentials => {          
          return from(signInWithEmailAndPassword(this._auth, credentials.email, credentials.password)).pipe(
            map(p => {
              return getUser();
            }),
            catchError(error => of(authError({ error: error })))
          );
        })
    ));
}