import { Injectable } from '@angular/core';
import { UserRepository } from '@app/repositories';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  days: number = 15;

  constructor(private _userRepository: UserRepository) {}

  async getAvailableDatesById(id: string) {
    const doctor = await this._userRepository.getUserById(id);
    const nextDays = this.getNextDays();

    return nextDays.filter((day) =>
      doctor?.schedules?.some(
        (schedule) => schedule.isActive && day.getDay() === schedule.dayWeek
      )
    );
  }

  // getAvailableDates(schedule: any) {
  //   const availableDates: any = [];
  //   const today = new Date();

  //   for (let i = 0; i < 15; i++) {
  //     const currentDate = new Date();
  //     currentDate.setDate(today.getDate() + i);

  //     const currentDayOfWeek = currentDate.getDay();

  //     schedule.forEach((slot: any) => {
  //       if (slot.isActive && slot.dayWeek === currentDayOfWeek) {
  //         const startTime = new Date(slot.startTime.seconds * 1000);
  //         const endTime = new Date(slot.endTime.seconds * 1000);

  //         startTime.setFullYear(
  //           currentDate.getFullYear(),
  //           currentDate.getMonth(),
  //           currentDate.getDate()
  //         );
  //         endTime.setFullYear(
  //           currentDate.getFullYear(),
  //           currentDate.getMonth(),
  //           currentDate.getDate()
  //         );

  //         availableDates.push({
  //           date: currentDate,
  //           startTime,
  //           endTime,
  //         });
  //       }
  //     });
  //   }

  //   return availableDates;
  // }

  getNextDays(): Date[] {
    const dates: Date[] = [];

    const today = new Date();

    for (let i = 0; i < this.days; i++) {
      const nextDate = new Date();

      nextDate.setDate(today.getDate() + i);

      dates.push(nextDate);
    }

    return dates;
  }
}
