import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  Persistence,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { LoginRequest } from '@app/requests';
import { UserRepository } from '@app/repositories';
import { User } from '@app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: Auth, private _userRepository: UserRepository) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      loginRequest.email,
      loginRequest.password
    );
  }

  async register(request: any, role: string, persistence = true): Promise<void> {
    const { email, password } = request.contact;

    console.log("LLEGA? 0");

    // const type: Persistence = persistence
    //   ? browserSessionPersistence
    //   : inMemoryPersistence;

    console.log("LLEGA? 1");
    // console.log(persistence);
    // console.log(type);

    // await this._auth.setPersistence(type);

    console.log("LLEGA? 2");
    
    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    console.log("LLEGA? 3");

    console.log(userCredential);

    const user: User = { 
      ...request.personal,
      ...request.images,

      id: userCredential.user.uid,
      email: email,
      isEnable: false,
      age: Number(request.personal.age),
      dni: Number(request.personal.dni),
      role: role
    }

    updateProfile(userCredential.user, {
      displayName: `${user.firstName} ${user.lastName}`,
      photoURL: user.picture,
    });

    await this._userRepository.add(user);

    await sendEmailVerification(userCredential.user);
  }

  logout(): void {
    signOut(this._auth);
  }
}