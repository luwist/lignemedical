import { Injectable } from '@angular/core';
import { Role } from '@app/enums';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  public redirectByRole(role: string): string {
    let url!: string;

    switch (role) {
      case Role.Administrator:
        url = '/dashboard';
        break;
      case Role.Doctor:
      case 'doctora':
        url = '/session';
        break;
      case Role.Patient:
        url = '/appointment';
        break;
    }

    return url;
  }
}
