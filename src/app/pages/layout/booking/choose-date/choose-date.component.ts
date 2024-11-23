import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppointmentStatus } from '@app/enums/appointment-status.enum';
import { DoctorRepository } from '@app/repositories';
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
  @Output() qwe!: string;

  @Input() id!: string;

  loading!: boolean;
  buttonState: boolean = true;

  dateSelected!: any;
  hourSelected!: any;

  dates: any = [];
  hours: any = [];

  appointment: any = {
    patient: null,
    doctor: null,
    specialty: null,
    date: null,
    hour: null,
    status: AppointmentStatus.Pending,
  };

  constructor(
    private _doctorService: DoctorService,
    private _doctorRepository: DoctorRepository
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.id !== undefined) {
      this.loading = true;

      await this.loadDates();

      this.loading = false;
    }
  }

  async loadDates(): Promise<void> {
    this.dates = await this._doctorService.getDateAvailableById(this.id);
    this.hours = await this.getSchedulesByDoctorId(this.id);
  }

  onDateSelected(date: Date): void {
    this.dateSelected = date;
  }
  // this.appointment = { ...this.appointment, ...newObj };

  onHourSelected(hour: any): void {
    this.hourSelected = hour;
  }
  // this.buttonState = false;

  // const newObj = {
  //   hour: hour,
  // };

  // this.appointment = { ...this.appointment, ...newObj };

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

  async getSchedulesByDoctorId(id: string): Promise<any> {
    const minute = 60;
    const hour = minute * 30;
    const newHours = [];

    const schedules = await this._doctorRepository.getSchedulesById(id) as any;

    const doctorAppointment: any = await this._doctorRepository.getAppointmentsById(id);

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

      console.log(date);      

      newHours.push(date);

      appointment += hour * 1000;
    }

    return newHours;
  }
}
