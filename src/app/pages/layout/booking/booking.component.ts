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
  dateSelected!: number;

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

    await this.getSchedulesByDoctorId(id);

    this.makeDates();
  }

  async getSchedulesByDoctorId(id: string): Promise<void> {
    const minute = 60;
    const hour = minute * 30;

    const schedules: any = await this._firestoreService.getAllDocument(
      `users/${id}/schedules`
    );

    const seconds = schedules[4].monday.startTime.seconds * 1000 + hour * 1000;
    const newDate = new Date(seconds);

    console.log(seconds);
    console.log(newDate.toLocaleString());

    const date = new Date();

    console.log(date.getTime());
    console.log(date.toLocaleString());
  }

  async onDateSelected(date: Date, id: number): Promise<void> {
    this.dateSelected = id;
  }

  private makeDates(): void {
    const newDates = [];
    const newDate = new Date();

    for (let i = 0; i < 15; i++) {
      if (i !== 0) {
        const day = newDate.getDate() + 1;

        newDate.setDate(day);
      }

      const localeDateString = newDate.toLocaleDateString();

      const dateSplit = localeDateString.split('/');

      const dateNew = new Date(
        `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`
      );

      newDates.push(dateNew);
    }

    this.dates = newDates;
  }
}
