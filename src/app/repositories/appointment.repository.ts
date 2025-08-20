import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Repository } from './repository';
import { FirestoreORM } from '@app/utils';
import { Appointment } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentRepository {
  constructor(
    private _firestore: Firestore,
    private _firestoreOrm: FirestoreORM<Appointment>
  ) {}

  async add(appointment: any): Promise<void> {
    const collRef = collection(this._firestore, 'appointments');
    const docRef = doc(collRef);

    await setDoc(docRef, {
      ...appointment,
      id: docRef.id,
    });
  }

  async changeStatusById(id: string, status: string) {
    this._firestoreOrm.collection('appointments').where('id', '==', id).update({
      status: status,
    });
    // const docRef = doc(this._firestore, 'appointments', id);

    // await updateDoc(docRef, {
    //   status: status,
    // });
  }

  async addMessageById(id: string, message: string) {
    const docRef = doc(this._firestore, 'appointments', id);

    await updateDoc(docRef, {
      message: message,
    });
  }

  async getAppointmentByStatus(patientId: string, status: string) {
    const appointments: any[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const q = query(
      collRef,
      where('patient.id', '==', patientId),
      where('status', '==', status)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;

      appointments.push(data);
    });

    return appointments;
  }

  async getAppointmentByDoctorId(doctorId: string) {
    const appointments: any[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const q = query(collRef, where('doctor.id', '==', doctorId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;

      appointments.push(data);
    });

    return appointments;
  }

  async getAppointmentByPatientId(patientId: string) {
    const appointments: any[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const q = query(collRef, where('patient.id', '==', patientId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;

      appointments.push(data);
    });

    return appointments;
  }

  async getAppointmentList() {
    const appointments: any[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const querySnapshot = await getDocs(collRef);

    querySnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });

    return appointments;
  }
}
