import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { FirestoreService } from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class PatientRepository {
  constructor(private _firestoreService: FirestoreService) {}

  async getPatientList(): Promise<User[]> {
    return await this._firestoreService.getAllDocument<User>(`users`);
  }
}
