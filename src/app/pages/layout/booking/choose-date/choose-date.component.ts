import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppointmentStatus } from '@app/enums/appointment-status.enum';
import { DoctorRepository } from '@app/repositories';
import { AppointmentService } from '@app/services/appointment/appointment.service';
import { DoctorService } from '@app/services/doctor/doctor.service';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-choose-date',
  standalone: true,
  imports: [CommonModule, HlmIconComponent, HlmButtonDirective],
  templateUrl: './choose-date.component.html',
  styleUrl: './choose-date.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class ChooseDateComponent implements OnChanges {
  @Output() dateSelected = new EventEmitter();
  @Output() hourSelected = new EventEmitter();
  @Output() bookSelected = new EventEmitter();

  @Input() doctorId!: string;
  @Input() appointment!: any;

  loading: boolean = true;
  buttonState: boolean = true;

  dateIndex!: any;
  hourIndex!: any;

  dates: any = [];
  hours: any = [];

  constructor(
    private _doctorService: DoctorService,
    private _appointmentService: AppointmentService,
    private _doctorRepository: DoctorRepository
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.doctorId) {
      await this.loadDates();
    } else {
      this.buttonState = true;

      this.dateIndex = -1;
      this.hourIndex = -1;
    }
  }

  async loadDates(): Promise<void> {
    this.dates = await this._appointmentService.getAvailableDatesById(
      this.doctorId
    );

    console.log(this.dates);

    if (this.dates) {
      this.hours = await this.getSchedulesByDoctorId(this.doctorId);
    }

    this.loading = false;
  }

  onDateSelected(date: any, index: number): void {
    this.dateIndex = index;

    this.dateSelected.emit(date);
  }

  onHourSelected(hour: any, index: number): void {
    this.hourIndex = index;

    this.hourSelected.emit(hour);

    this.buttonState = false;
  }

  onBookAppointment(): void {
    this.bookSelected.emit();
  }

  async getSchedulesByDoctorId(id: string): Promise<any> {
    const minute = 60;
    const hour = minute * 30;
    const newHours = [];

    const schedules = (await this._doctorRepository.getSchedulesById(
      id
    )) as any;

    const doctorAppointment: any =
      await this._doctorRepository.getAppointmentsById(id);

    let startTime = 0;
    let endTime = 16000000;

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

        // if (
        //   schedule.dayWeek !== 0 &&
        //   schedule.dayWeek === dateSelected.getDay() &&
        //   hourAppointment.getTime()
        // ) {
        //   startTime = schedule.startTime.seconds * 1000;
        //   endTime = schedule.endTime.seconds * 1000;
        // }
      });
    });

    let appointment = startTime + hour * 1000;

    while (appointment <= endTime) {
      const date = new Date(appointment);

      newHours.push(date);

      appointment += hour * 1000;
    }

    return newHours;
  }
}
