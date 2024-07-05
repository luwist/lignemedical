import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/services';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  // specialties = [
  //   'Cardiólogo',
  //   'Pediatra',
  //   'Psicólogo',
  //   'Dermatólogo',
  //   'Neurólogo',
  // ];

  // doctors = [
  //   {
  //     id: 1,
  //     name: 'Jhoe Doe',
  //     specialty: 'Cardiólogo',
  //     imageSrc: 'https://randomuser.me/api/portraits/men/1.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     specialty: 'Pediatra',
  //     imageSrc: 'https://randomuser.me/api/portraits/women/2.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Carlos González',
  //     specialty: 'Dermatólogo',
  //     imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: 'Ana Martínez',
  //     specialty: 'Neurólogo',
  //     imageSrc: 'https://randomuser.me/api/portraits/women/4.jpg',
  //   },
  //   {
  //     id: 5,
  //     name: 'Roberto Fernández',
  //     specialty: 'Ginecólogo',
  //     imageSrc: 'https://randomuser.me/api/portraits/men/5.jpg',
  //   },
  // ];

  specialties: any = [];

  indexSelected!: number;

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit(): Promise<void> {
    this.specialties = await this._firestoreService.getAllDocument('specialties');
  }

  onSelect(index: number): void {
    this.indexSelected = index;
  }
}
