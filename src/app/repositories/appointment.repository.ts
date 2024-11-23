import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AppointmentRepository {
  constructor(private _firestore: Firestore) {}

  async getAppointmentByStatus(status: string) {
    const appointments: any[] = [];

    const collRef = collection(this._firestore, 'appointments');

    const q = query(collRef, where('status', '==', status));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const data = doc.data() as any;

      appointments.push(data);
    })

    return appointments;
  }
}
