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
  @Input() buttonLoading!: any;

  loading!: boolean;
  buttonState: boolean = true;

  dateIndex!: any;
  hourIndex!: any;

  dates: any = [];
  hours: any = [];
  availableDates: any = [];
  selectedDay: number = -1;

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
    this.availableDates = await this._appointmentService.getAvailableDatesById(
      this.doctorId,
      this.appointment.doctor.specialty
    );

    console.log(this.availableDates);

    this.loading = false;
  }

  isReserved(date: string, time: string): boolean {
    const specialty = this.appointment.doctor.specialty;
    const schedules = this.availableDates.find((x: any) => x.name === specialty);

    return schedules.some(
      (reservation: any) => reservation.date === date && reservation.time === time
    );
  }

  onDateSelected(date: any, index: number): void {
    this.selectedDay = index;

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
}
