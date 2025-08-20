import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { User } from '@app/models';
import { FirestoreORM } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(
    private _firestoreOrm: FirestoreORM<User>,
    private _firestore: Firestore
  ) {}

  async add(user: User): Promise<void> {
    await this._firestoreOrm.collection('users').create(user);
  }

  async getUserListByRole(role: string): Promise<User[]> {
    const list: any[] = [];

    const collRef = collection(this._firestore, 'users');

    const q = query(collRef, where('role', '==', role));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;

      list.push(data);
    });

    return list;
  }

  async checkEmail(email: string) {
    return this._firestoreOrm
      .collection('users')
      .where('email', '==', email)
      .first();
  }

  async getUserById(id: string) {
    const docRef = doc(this._firestore, 'users', id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as User) : null;
  }
}
