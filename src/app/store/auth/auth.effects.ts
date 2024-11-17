import { Injectable } from "@angular/core";
import { Auth, authState, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, from, map, of, switchMap, take } from "rxjs";
import { authenticated, authError, credentialsLogin, getUser, notAuthenticated } from "./auth.actions";
import { User } from "./auth.state";
import { doc, Firestore, getDoc } from "@angular/fire/firestore";

@Injectable()
export class AuthEffects {
    constructor(
      private actions$: Actions,
      private _auth: Auth,
      private _firestore: Firestore
    ) {}

    getUser$ = createEffect(() => 
      this.actions$.pipe(
        ofType(getUser),
        exhaustMap(() =>
          authState(this._auth).pipe(
            take(1),
            switchMap(async (authData) => {
              if (authData) {
                const docRef = doc(this._firestore, 'users', authData.uid);
                const docSnap = await getDoc(docRef);
                const data: any = docSnap.data();

                const user: User = {
                  uid: authData.uid,
                  emailVerified: authData.emailVerified,
                  displayName: authData.displayName,
                  email: authData.email,
                  photoURL: authData.photoURL,
                  role: data.role
                }
  
                return authenticated({user: user})
              } else {
                return notAuthenticated();
              }
            })
          )
        )
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