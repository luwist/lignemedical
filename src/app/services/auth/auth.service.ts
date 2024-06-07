import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: Auth) {}

  async login(credential: any): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      credential.email,
      credential.password
    );
  }

  async register(user: any): Promise<void> {
    await createUserWithEmailAndPassword(this._auth, user.email, user.password);
  }
}
