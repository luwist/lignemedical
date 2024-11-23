import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '@app/components';
import { InputSearchComponent } from '@app/components/ui/input-search/input-search.component';
import { AppointmentRepository } from '@app/repositories';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/ui-tabs-helm';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    AppointmentCardComponent,
    HlmInputDirective,
    InputSearchComponent,

    HlmIconComponent,

    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class AppointmentComponent implements OnInit {
  loading: boolean = true;
  pendings!: any[];
  rejects!: any[];

  constructor(private _appointmentRepository: AppointmentRepository) {}
  
  async ngOnInit(): Promise<void> {
    this.pendings = await this._appointmentRepository.getAppointmentByStatus('pending');
    this.rejects = await this._appointmentRepository.getAppointmentByStatus('rejected');

    console.log(this.pendings);
    console.log(this.rejects);

    this.loading = false;
  }
}
