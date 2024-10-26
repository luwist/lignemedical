import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { FirestoreORM } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private _firestoreORM: FirestoreORM<User>) {}

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

  async getUserById(id: string): Promise<User | null> {
    return await this._firestoreORM
      .collection('users')
      .where('id', '==', id)
      .first();
  }
}
