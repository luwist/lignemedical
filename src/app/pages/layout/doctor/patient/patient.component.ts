import { Component, OnInit } from '@angular/core';
import { Patient } from '@app/models';
import { PatientRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    HlmSkeletonComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  isLoading: boolean = true;
  patients: Patient[] = [];

  getFallback(name: any) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  }

  constructor(private _patientRepository: PatientRepository) {}

  async ngOnInit(): Promise<void> {
    this.patients = await this._patientRepository.getPatientList();

    this.isLoading = false;
  }
}
