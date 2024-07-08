import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore';

interface Specialty {
  id: string;
  imageUrl: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(private _firestoreService: FirestoreService) {}

  async getSpecialtyList(): Promise<Specialty[]> {
    return await this._firestoreService.getAllDocument<Specialty>(
      'specialties'
    );
  }
}
