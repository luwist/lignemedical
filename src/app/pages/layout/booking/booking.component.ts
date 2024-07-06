import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/services';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class BookingComponent implements OnInit {
  specialties: any = [];
  doctors: any = [];
  dates: any = [];

  specialtySelected!: string;
  doctorSelected!: string;

  constructor(private _firestoreService: FirestoreService) {}

  async ngOnInit(): Promise<void> {
    this.specialties = await this._firestoreService.getAllDocument(
      'specialties'
    );
  }

  async onSpecialtySelected(name: string): Promise<void> {
    this.specialtySelected = name;

    this.doctors = await this._firestoreService.getDoctorBySpecialty(name);
  }

  async onDoctorSelected(id: string): Promise<void> {
    this.doctorSelected = id;

    const doctor = await this._firestoreService.getDocumentById('users', id);

    this.makeDates();
  }

  private makeDates(): void {
    this.dates.push(new Date());
  }
}
