import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { LoginRequest } from '@app/requests';
import { FirestoreService } from '../firestore';
import { UploadService } from '../upload';
import { Firestore } from '@angular/fire/firestore';
import { UserRepository } from '@app/repositories';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this._auth);

  constructor(
    private _auth: Auth,
    private _firestore: FirestoreService,
    private _firebase: Firestore,
    private _uploadService: UploadService,
    private _userRepository: UserRepository
  ) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      loginRequest.email,
      loginRequest.password
    );
  }

  async register(request: any, role: string): Promise<void> {
    const { email, password } = request.contact;

    const userCredential = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

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