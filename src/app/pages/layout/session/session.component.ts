import { Component, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot, query, where } from '@angular/fire/firestore';
import { SessionCardComponent } from '@app/components';
import { NgSearchInputComponent } from '@app/components/ui/ng-search-input/ng-search-input.component';
import { Appointment } from '@app/models';
import { AppointmentRepository } from '@app/repositories';
import { AppState } from '@app/store/app.state';
import { selectUser } from '@app/store/auth/auth.selectors';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [HlmIconComponent, SessionCardComponent, NgSearchInputComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class SessionComponent implements OnInit {
  loading: boolean = true;

  appointments: any[] = [];
  filteredAppointments: any[] = [];

  constructor(private _firestore: Firestore, private _store: Store<AppState>, private _appointmentRepository: AppointmentRepository) {}

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
    const q = query(collRef, where('doctor.id', '==', patientId));

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

    this.filteredAppointments = this.appointments.filter(x => x.doctor.specialty.toLowerCase().includes(value) || x.patient.name.toLowerCase().includes(value));
  }
}
