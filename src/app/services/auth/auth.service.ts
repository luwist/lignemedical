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
import { DoctorRequest, LoginRequest } from '@app/requests';
import { FirestoreService } from '../firestore';
import { UploadService } from '../upload';
import { Role } from '@app/enums';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User>({
    fullName: null,
    profilePicture: null,
    age: null,
    dni: null,
    role: null,
    email: null,
  });

  get currentUser$(): Observable<any> {
    return this._currentUser.asObservable();
  }

  async updateProfile(uid: string): Promise<void> {
    const user: any = await this._firestore.getDocumentById('users', uid);

    if (user !== null) {
      this._currentUser.next({
        id: uid,
        fullName: `${user.firstName} ${user.lastName}`,
        profilePicture: user.photoURL,
        age: user.age,
        dni: user.dni,
        role: user.role,
        email: user.email,
      });
    }
  }

  constructor(
    private _auth: Auth,
    private _firestore: FirestoreService,
    private _uploadService: UploadService
  ) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    const user = await signInWithEmailAndPassword(
      this._auth,
      loginRequest.email,
      loginRequest.password
    );

    this.updateProfile(user.user.uid);
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

  async registerDoctor(registerRequest: any): Promise<void> {
    const { firstName, lastName, age, dni, specialist } =
      registerRequest.personalInformation;

    const { email, password } = registerRequest.contactInformation;

    const { profileImage } = registerRequest.profilePicture;

    const profileUrl = await this._uploadService.upload(profileImage);

    const user = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
    });

    await this._firestore.addDocumentWithCustomId('users', user.user.uid, {
      firstName: firstName,
      lastName: lastName,
      photoURL: profileUrl,
      age: Number(age),
      dni: Number(dni),
      specialist: specialist,
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

    const profileUrl = await this._uploadService.upload(profileImage);

    const user = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    updateProfile(user.user, {
      displayName: `${firstName} ${lastName}`,
    });

    await this._firestore.addDocumentWithCustomId('users', user.user.uid, {
      firstName: firstName,
      lastName: lastName,
      photoURL: profileUrl,
      age: Number(age),
      dni: Number(dni),
      healthInsurance: healthInsurance,
      role: Role.Patient,
      email: email,
    });

    await sendEmailVerification(user.user);
  }
}
