import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { LoginRequest } from '@app/requests';
import { FirestoreService } from '../firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = authState(this._auth);

  constructor(private _auth: Auth, private _firestore: FirestoreService) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      loginRequest.email,
      loginRequest.password
    );
  }

  async register(registerRequest: any): Promise<void> {
    const user = await createUserWithEmailAndPassword(
      this._auth,
      registerRequest.email,
      registerRequest.password
    );

    await sendEmailVerification(user.user);

    updateProfile(user.user, {
      displayName: registerRequest.name,
      photoURL: '',
    });
  }

  async logout(): Promise<void> {
    await signOut(this._auth);
  }
}
