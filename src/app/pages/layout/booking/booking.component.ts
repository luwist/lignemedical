import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { ChooseDoctorComponent } from './choose-doctor/choose-doctor.component';
import { ChooseSpecialityComponent } from './choose-speciality/choose-speciality.component';
import { ChooseDateComponent } from './choose-date/choose-date.component';
import { AppointmentStatus } from '@app/enums/appointment-status.enum';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { Observable } from 'rxjs';
import { User } from '@app/store/auth/auth.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { AppointmentRepository, UserRepository } from '@app/repositories';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { toast } from 'ngx-sonner';
import { ChoosePatientComponent } from './choose-patient/choose-patient.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,

    ChoosePatientComponent,
    ChooseDoctorComponent,
    ChooseSpecialityComponent,
    ChooseDateComponent,

    HlmToasterComponent,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class BookingComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  buttonLoading!: boolean;

  appointment: any = {
    date: null,
    hour: null,
    isAvailable: false,
    status: AppointmentStatus.Pending,
    patient: {
      id: null,
      name: null,
      picture: null,
    },
    doctor: {
      id: null,
      name: null,
      specialty: null,
      picture: null,
    },
  };

  constructor(
    private _store: Store<AppState>,
    private _appointmentRepository: AppointmentRepository,
    private _userRepository: UserRepository
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this._store.select(selectUser);

    this.currentUser$.subscribe((data) => {
      this.appointment = {
        ...this.appointment,
        patient: {
          ...this.appointment.patient,
          id: data?.uid,
          name: data?.displayName,
          picture: data?.photoURL,
        },
      };
    });
  }

  onSpecialtySelected(specialty: string): void {
    this.appointment = {
      ...this.appointment,
      doctor: {
        ...this.appointment.doctor,
        specialty: specialty,
      },
    };
  }

  onDoctorSelected(doctor: any): void {
    this.appointment = {
      ...this.appointment,
      doctor: {
        ...this.appointment.doctor,
        id: doctor.id,
        name: doctor.name,
        picture: doctor.picture,
      },
    };
  }

  onDateSelected(date: Date): void {
    this.appointment = {
      ...this.appointment,
      date: date,
    };
  }

  onHourSelected(hour: Date): void {
    this.appointment = {
      ...this.appointment,
      hour: hour,
    };
  }

  async onBookAppointment(): Promise<void> {
    this.buttonLoading = true;

    await this._appointmentRepository.add(this.appointment);

    toast('Turno reservado', {
      description: 'Se ha reservado el turno correctamente',
    });

    this.buttonLoading = false;

    this.appointment = {
      date: null,
      hour: null,
      isAvailable: false,
      status: AppointmentStatus.Pending,
      patient: {
        id: null,
        name: null,
      },
      doctor: {
        id: null,
        name: null,
        specialty: null,
      },
    };
  }
}
