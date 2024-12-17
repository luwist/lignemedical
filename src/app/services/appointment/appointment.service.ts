import { Injectable } from '@angular/core';
import { AppointmentRepository, UserRepository } from '@app/repositories';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  days: number = 15;
  duration: number = 30;

  constructor(private _userRepository: UserRepository, private _appointmentRepository: AppointmentRepository) {}

  async getAvailableDatesById(id: string, specialty: string) {
    const doctor = await this._userRepository.getUserById(id);
    const specialties = doctor?.specialties?.find(x => x.name === specialty);
    const appointments = await this._appointmentRepository.getAppointmentList();

    return this.getAvailableDates(specialties.schedules, appointments);
  }

  getAvailableDates(schedules: any[], appointments: any[]): any[] {
    const availableDays: any[] = [];
    const today = new Date();
  
    for (let i = 0; i < this.days; i++) {
      const currentDate = new Date();

      currentDate.setDate(today.getDate() + i);

      const currentDayOfWeek = currentDate.getDay();

      schedules.forEach((schedule) => {
        if (schedule.isActive && schedule.dayWeek === currentDayOfWeek) {
          const startTime = new Date(schedule.startTime.seconds * 1000);
          const endTime = new Date(schedule.endTime.seconds * 1000);
  
          startTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          endTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          
          const timeSlots: any[] = [];

          let currentSlot = new Date(startTime);
  
          while (currentSlot < endTime) {
            const slot = new Date(currentSlot);

            const isReserved = appointments.some((r) => {
              const reservedDate = this.transformFirebaseTimestamp(r.date, r.hour);

              return reservedDate.toISOString() === slot.toISOString();
            });

            if (!isReserved) {
              timeSlots.push(slot);
            }

            currentSlot.setMinutes(currentSlot.getMinutes() + this.duration);
          }
  
          if (timeSlots.length > 0) {
            availableDays.push({
              date: currentDate,
              timeSlots: timeSlots,
            });
          }
        }
      });
    }
  
    return availableDays;
  }

  transformFirebaseTimestamp(firebaseDate: any, firebaseHour: any): Date {
    const date = new Date(firebaseDate.seconds * 1000);
    const hour = new Date(firebaseHour.seconds * 1000);
  
    date.setHours(hour.getHours(), hour.getMinutes(), hour.getSeconds(), hour.getMilliseconds());
  
    return date;
  }
}
