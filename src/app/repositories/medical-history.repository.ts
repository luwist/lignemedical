import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MedicalHistoryRepository {
  constructor(private _firestore: Firestore) {}

  async add(history: any): Promise<void> {
    const collRef = collection(this._firestore, 'medical_history');
    const docRef = doc(collRef);

    await setDoc(docRef, {
      ...history,
      id: docRef.id
    });
  }
}