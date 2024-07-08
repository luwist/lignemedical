import { Injectable } from '@angular/core';
import { FirestoreService } from '@app/services';

interface Specialty {
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
}
