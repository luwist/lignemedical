import { Injectable } from '@angular/core';
import { FirestoreService } from '@app/services';

export interface Specialty {
  id: string;
  imageUrl: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpecialtyRepository {
  constructor(private _firestoreService: FirestoreService) {}

  async getSpecialtyList(): Promise<Specialty[]> {
    return this._firestoreService.getAllDocument<Specialty>('specialties');
  }

  async add(name: string): Promise<void> {
    await this._firestoreService.addDocument('specialties', {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/lignemedical.appspot.com/o/cardiologia.png?alt=media&token=66b12e20-468b-44ff-9ce1-5281ecdc9ec1',
      name: name
    });
  }
}
