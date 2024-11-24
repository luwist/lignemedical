import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { User } from '@app/models';
import { FirestoreORM } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(
    private _firestoreORM: FirestoreORM<User>,
    private _firestore: Firestore
  ) {}

  async add(user: User): Promise<void> {
    const docRef = doc(this._firestore, 'users', user.id);

    await setDoc(docRef, user);
  }

  async getUserListByRole(role: string): Promise<User[]> {
    const users: User[] = [];

    const collRef = collection(this._firestore, 'users');

    const q = query(collRef, where('role', '==', role));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as User;

      users.push(data);
    });

    return users;
  }

  async checkEmail(email: string) {
    const collRef = collection(this._firestore, 'users');
    const q = query(collRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    let emailAvailable = true;

    querySnapshot.forEach((doc) => {
      const data = doc.data() as User;

      if (data.email === email) emailAvailable = false;
    });

    return emailAvailable;
  }

  async getUserById(id: string): Promise<User | null> {
    const docRef = doc(this._firestore, 'users', id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as User) : null;
  }
}
