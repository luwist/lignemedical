import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { User } from '@app/models';
import { FirestoreORM } from '@app/utils';
import { debounceTime, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private _firestoreORM: FirestoreORM<User>, private _firestore: Firestore) {}

  async getRoleById(id: string): Promise<string | null> {
    const user = await this._firestoreORM.collection('users').limit(2).first();

    // const user = await this._firestoreORM
    //   .collection('users')
    //   .where('emailVerified', '==', true)
    //   .where('age', '==', 57)
    //   .get();

    console.log(user);

    if (user) return user.role;

    return null;
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
    const collRef = collection(this._firestore, 'users');

    const q = query(collRef, where('id', '==', id));
    
    const querySnapshot = await getDocs(q);

    let result: User | null = null;

    querySnapshot.forEach((doc) => {
      result = doc.data() as User;
    });

    return result;

    // return await this._firestoreORM
    //   .collection('users')
    //   .where('id', '==', id)
    //   .first();
  }
}
