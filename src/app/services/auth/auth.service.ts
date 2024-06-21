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
import { UploadService } from '../upload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = authState(this._auth);

  constructor(
    private _auth: Auth,
    private _firestore: FirestoreService,
    private _uploadService: UploadService
  ) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    await signInWithEmailAndPassword(
      this._auth,
      loginRequest.email,
      loginRequest.password
    );
  }

  async register(registerRequest: any): Promise<void> {
    const { firstName, lastName } = registerRequest.personalInformation;

    const { email, password } = registerRequest.contactInformation;

    const { profileImage, dniImage } = registerRequest.profilePicture;

    const profileUrl = await this._uploadService.upload(profileImage);

    const user = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: profileUrl,
    });

    await sendEmailVerification(user.user);
  }

  async logout(): Promise<void> {
    await signOut(this._auth);
  }
}
