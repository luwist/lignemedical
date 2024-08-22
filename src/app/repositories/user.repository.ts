import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { FirestoreService } from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private _firestoreService: FirestoreService) {}

  async getRoleById(id: string): Promise<string | null> {
    const user = await this._firestoreService.getDocumentById<User>(
      'users',
      id
    );

    if (user) return user.role;

    return null;
  }
}
