import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { FirestoreService } from '@app/services';

export interface Doctor {
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

export interface Schedule {
  dayWeek: number;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

export interface Appointment {
  date: Date;
  hour: Date;
  doctor: string;
  patient: string;
  specialty: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DoctorRepository {
  constructor(
    private _firestore: Firestore,
    private _firestoreService: FirestoreService
  ) {}

  async getDoctorListBySpecialty(specialty: string): Promise<Doctor[]> {
    const doctors: Doctor[] = [];
    const collRef = collection(this._firestore, 'users');
    const querySnapshot = await getDocs(collRef);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Doctor;

      if (data.specialist === specialty) {
        doctors.push(data);
      }
    });

    return doctors;
  }

  async getSchedulesById(id: string): Promise<Schedule[]> {
    return await this._firestoreService.getAllDocument<Schedule>(
      `users/${id}/schedules`
    );
  }

  async getAppointmentsById(id: string): Promise<Appointment[]> {
    return await this._firestoreService.getAllDocument<Appointment>(
      `users/${id}/appointments`
    );
  }
}
