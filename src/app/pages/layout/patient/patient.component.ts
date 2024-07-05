import { Component } from '@angular/core';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  patients = [
    {
      id: 1,
      name: 'Juan Perez',
      age: 30,
      dni: 12345678,
      email: 'juanperez@gmail.com',
    },
    {
      id: 2,
      name: 'Maria Gomez',
      age: 25,
      dni: 23456789,
      email: 'mariagomez@gmail.com',
    },
    {
      id: 3,
      name: 'Carlos Rodriguez',
      age: 40,
      dni: 34567890,
      email: 'carlosrodriguez@gmail.com',
    },
    {
      id: 4,
      name: 'Ana Martinez',
      age: 35,
      dni: 45678901,
      email: 'anamartinez@gmail.com',
    },
    {
      id: 5,
      name: 'Luis Fernandez',
      age: 28,
      dni: 56789012,
      email: 'luisfernandez@gmail.com',
    },
  ];

  getFallback(name: string) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  }
}
