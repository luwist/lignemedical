import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore';
import { Firestore } from '@angular/fire/firestore';
import { DoctorRepository, Schedule } from '@app/repositories';
import { ScheduleService } from '../schedule/schedule.service';

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  dni: number;
  email: string;
  role: string;
  specialist: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private _firestoreService: FirestoreService,
    private _firestore: Firestore,
    private _doctorRepository: DoctorRepository
  ) {}

  async getDateAvailableById(id: string): Promise<Date[]> {
    const schedules = await this._doctorRepository.getSchedulesById(id);

    const regularSchedules: Date[] = [];

    const currentDate = new Date();

    const dayInMilliseconds = 60 * 60 * 24 * 1000;

    const days = 15;

    let currentDateInMilliseconds = currentDate.getTime();

    for (let i = 0; i < days; i++) {
      const nextDay = new Date(currentDateInMilliseconds);

      schedules.forEach((schedule) => {
        if (schedule.isActive && schedule.dayWeek === nextDay.getDay())
          regularSchedules.push(nextDay);
      });

      currentDateInMilliseconds += dayInMilliseconds;
    }

    return regularSchedules;
  }

  async getAppointmentAvailableByDate(id: string, date: Date): Promise<Date[]> {
    const appointmentsAvailable: Date[] = [];
    const appointments = await this._doctorRepository.getAppointmentsById(id);
    const schedules = await this._doctorRepository.getSchedulesById(id);

    const schedule = schedules.find(
      (schedule) => schedule.isActive && schedule.dayWeek === date.getDay()
    ) as Schedule;

    // const startTimeInMilliseconds = schedule.startTime.getTime();
    // const endTimeInMilliseconds = schedule.endTime.getTime();

    console.log(schedule);

    appointments.forEach((appointment) => {
      // const hourInMilliseconds = appointment.hour.getTime();

      console.log(appointment.hour);
    });

    return appointmentsAvailable;
  }
}
