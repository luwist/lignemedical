import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { LoginRequest } from '@app/requests';
import { FirestoreService } from '../firestore';
import { UploadService } from '../upload';
import { Role } from '@app/enums';
import { Firestore } from '@angular/fire/firestore';
import { emailVerified } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this._auth);

  constructor(
    private _auth: Auth,
    private _firestore: FirestoreService,
    private _firebase: Firestore,
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

  logout(): void {
    signOut(this._auth);
  }

  async registerDoctor(registerRequest: any): Promise<void> {
    const { firstName, lastName, age, dni, specialist } =
      registerRequest.personal;

    const { email, password } = registerRequest.contact;

    const { url } = registerRequest.profilePicture;

    const user = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: url,
    });

    await this._firestore.addDocumentWithCustomId('users', user.user.uid, {
      firstName: firstName,
      lastName: lastName,
      picture: url,
      age: Number(age),
      dni: Number(dni),
      specialists: specialist,
      role: Role.Doctor,
      email: email,
    });

    await sendEmailVerification(user.user);
  }

  async registerPatient(registerRequest: any): Promise<void> {
    const { firstName, lastName, age, dni, healthInsurance } =
      registerRequest.personalInformation;

    const { email, password } = registerRequest.contactInformation;

    const { profileImage } = registerRequest.profilePicture;

    const picture = await this._uploadService.upload(profileImage);

    const user = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
      photoURL: picture,
    });

    await this._firestore.addDocumentWithCustomId('users', user.user.uid, {
      firstName: firstName,
      lastName: lastName,
      picture: picture,
      age: Number(age),
      dni: Number(dni),
      healthInsurance: healthInsurance,
      role: Role.Patient,
      email: email,
    });

    await sendEmailVerification(user.user);
  }
}
