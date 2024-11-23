import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { ChooseDoctorComponent } from './choose-doctor/choose-doctor.component';
import { ChooseSpecialityComponent } from './choose-speciality/choose-speciality.component';
import { ChooseDateComponent } from './choose-date/choose-date.component';
import { AppointmentStatus } from '@app/enums/appointment-status.enum';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,

    ChooseDoctorComponent,
    ChooseSpecialityComponent,
    ChooseDateComponent
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class BookingComponent {
  appointment: any = {
    date: null,
    hour: null,
    doctorId: null,
    name: null,
    patient: null,
    patientId: null,
    specialty: null,
    status: AppointmentStatus.Pending,
  };
  specialtySelected!: string;
  doctorSelected!: string;
  dateSelected!: any;
  hourSelected!: any;

  async onSpecialtySelected(specialty: string): Promise<void> {
    this.specialtySelected = specialty;

    this.appointment = {
      ...this.appointment,
      specialty: specialty
    }

    console.log(this.appointment);
  }

  async onDoctorSelected(id: string): Promise<void> {
    this.doctorSelected = id;
  }

  async onDateSelected(id: any): Promise<void> {
    this.dateSelected = id;
  }

  async onHourSelected(hour: any): Promise<void> {
    this.dateSelected = hour;
  }

  async onBookAppointment(): Promise<void> {
    // await this._firestoreService.addDocument(
    //   `users/${this.userId}/appointments`,
    //   this.appointment
    // );
    // await this._firestoreService.addDocument(
    //   `users/${this.doctorSelected}/appointments`,
    //   this.appointment
    // );
  }
}
