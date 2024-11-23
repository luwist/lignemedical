import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { User } from '@app/models';
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

  async getDoctorListBySpecialty(specialty: string): Promise<User[]> {
    const users: User[] = [];

    const collRef = collection(this._firestore, 'users');

    const q = query(collRef, where('role', '==', 'doctor'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const data = doc.data() as User;

      if (data.specialist?.includes(specialty)) {
        users.push(data);
      }
    })

    return users;
  }

  async getSchedulesById(id: string): Promise<Schedule[] | null> {
    const users: Schedule[] = [];

    const docRef = doc(this._firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data() as User;

      return user.schedules as Schedule[];
    }

    return null;
  }

  async getAppointmentsById(id: string): Promise<Appointment[]> {
    const appointments: Appointment[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const q = query(collRef, where('doctorId', '==', id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const data = doc.data() as Appointment;

      appointments.push(data);
    })

    return appointments;
  }
}
