import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '@app/components';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/auth';
import { query, where } from '@firebase/firestore';
import { NgSearchInputComponent } from '@app/components/ui/ng-search-input/ng-search-input.component';
import { Appointment } from '@app/models';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    AppointmentCardComponent,

    HlmIconComponent,

    NgSearchInputComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class AppointmentComponent implements OnInit {
  state = {
    loading: true,
    appointments: null,
  }
  currentUser!: string;
  loading!: boolean;
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  
  constructor(private _store: Store<AppState>, private _firestore: Firestore) {}
  
  ngOnInit(): void {
    this._store.select(selectUser).subscribe(data => {
      if (data) {
        this.loadAppointments(data.uid);
      }
    });
  }

  loadAppointments(patientId: string): void {
    this.loading = true;

    const collRef = collection(this._firestore, 'appointments');
    const q = query(collRef, where('patient.id', '==', patientId));

    onSnapshot(q, (querySnapshot) => {
      const appointments: any[] = [];

      querySnapshot.forEach((doc) => {
        appointments.push(doc.data());
      });

      this.appointments = appointments;
      this.filteredAppointments = [...appointments];
    });
  
    this.loading = false;
  }

  onValueSearch(valueSearch: string): void {
    const value = valueSearch.toLowerCase();

    if (!value) this.filteredAppointments = [...this.appointments];

    this.filteredAppointments = this.appointments.filter(x => x.doctor.specialty.toLowerCase().includes(value) || x.doctor.name.toLowerCase().includes(value));
  }
}
