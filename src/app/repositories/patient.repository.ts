import { Injectable } from '@angular/core';
import { Patient, User } from '@app/models';
import { FirestoreService } from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class PatientRepository {
  constructor(private _firestoreService: FirestoreService) {}

  async getPatientList(): Promise<Patient[]> {
    return await this._firestoreService.getAllDocument<Patient>(`patients`);
  }

  async getUserList(): Promise<User[]> {
    return await this._firestoreService.getAllDocument<User>(`users`);
  }
}
