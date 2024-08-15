import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentStatus } from '@app/enums/appointment-status.enum';
import { DoctorRepository, SpecialtyRepository } from '@app/repositories';
import { AuthService, FirestoreService } from '@app/services';
import { DoctorService } from '@app/services/doctor/doctor.service';
import { SpecialtyService } from '@app/services/specialty/specialty.service';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class BookingComponent implements OnInit {
  specialties: any = [];
  doctors: any = [];
  dates: any = [];
  hours: any = [];

  specialtySelected!: string;
  doctorSelected!: string;
  dateSelected!: number;
  hourSelected!: number;

  name!: string;
  fallBack!: string;

  buttonState: boolean = true;

  appointment: any = {
    patient: null,
    doctor: null,
    specialty: null,
    date: null,
    hour: null,
    status: AppointmentStatus.Pending,
  };

  userId!: string;

  constructor(
    private _firestoreService: FirestoreService,
    private _authService: AuthService,
    private _doctorService: DoctorService,
    private _specialtyService: SpecialtyService,

    private _specialtyRepository: SpecialtyRepository,
    private _doctorRepository: DoctorRepository
  ) {}

  async ngOnInit(): Promise<void> {
    // this._authService.currentUser$.subscribe((data) => {
    //   if (data !== null && data.fullName !== null) {
    //     this.name = data.fullName;
    //     this.appointment.patient = data.fullName;
    //     this.userId = data.id;

    //     this.fallBack =
    //       data.fullName.split(' ')[0][0] + data.fullName.split(' ')[1][0];
    //   } else {
    //     this.fallBack = 'LM';
    //   }
    // });

    this.specialties = await this._specialtyRepository.getSpecialtyList();
  }

  async onSpecialtySelected(specialty: any): Promise<void> {
    this.specialtySelected = specialty.id;

    this.appointment.specialty = specialty.name;

    this.doctors = await this._doctorRepository.getDoctorListBySpecialty(
      specialty.name
    );
  }

  async onDoctorSelected(id: string): Promise<void> {
    this.doctorSelected = id;

    const doctor: any = await this._firestoreService.getDocumentById(
      'users',
      id
    );

    const doctorObj = {
      doctor: `${doctor.firstName} ${doctor.lastName}`,
    };

    this.appointment = { ...this.appointment, ...doctorObj };

    this.dates = await this._doctorService.getDateAvailableById(id);
  }

  async onDateSelected(date: Date, id: number): Promise<void> {
    this.dateSelected = id;

    // await this.getSchedulesByDoctorId(this.doctorSelected, date);
    await this._doctorService.getAppointmentAvailableByDate(
      this.doctorSelected,
      date
    );

    const newObj = {
      date: date,
    };

    this.appointment = { ...this.appointment, ...newObj };
  }

  onHourSelected(hour: any, id: number): void {
    this.hourSelected = id;

    this.buttonState = false;

    const newObj = {
      hour: hour,
    };

    this.appointment = { ...this.appointment, ...newObj };
  }

  async getSchedulesByDoctorId(id: string, dateSelected: Date): Promise<void> {
    const minute = 60;
    const hour = minute * 30;
    const newHours = [];

    const schedules: any = await this._firestoreService.getAllDocument(
      `users/${id}/schedules`
    );

    const doctorAppointment: any = await this._firestoreService.getAllDocument(
      `users/${this.doctorSelected}/appointments`
    );

    let startTime = 0;
    let endTime = 0;

    doctorAppointment.forEach((appointment: any) => {
      const dateInMilliseconds = appointment.date.seconds * 1000;
      const hourInMilliseconds = appointment.hour.seconds * 1000;

      const dateAppointment = new Date(dateInMilliseconds);
      const hourAppointment = new Date(hourInMilliseconds);

      schedules.forEach((schedule: any) => {
        const startTimeInMilliseconds = schedule.startTime.seconds * 1000;
        const endTimeInMilliseconds = schedule.endTime.seconds * 1000;

        const startTimeSchedule = new Date(startTimeInMilliseconds);
        const endTimeSchedule = new Date(startTimeInMilliseconds);

        if (
          schedule.dayWeek !== 0 &&
          schedule.dayWeek === dateSelected.getDay() &&
          hourAppointment.getTime()
        ) {
          startTime = schedule.startTime.seconds * 1000;
          endTime = schedule.endTime.seconds * 1000;
        }
      });
    });

    let appointment = startTime + hour * 1000;

    while (appointment <= endTime) {
      const date = new Date(appointment);

      newHours.push(date);

      appointment += hour * 1000;
    }

    this.hours = newHours;
  }

  async onBookAppointment(): Promise<void> {
    await this._firestoreService.addDocument(
      `users/${this.userId}/appointments`,
      this.appointment
    );
    await this._firestoreService.addDocument(
      `users/${this.doctorSelected}/appointments`,
      this.appointment
    );
  }
}
