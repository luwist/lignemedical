import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { PatientRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  patients: any[] = [];

  getFallback(name: any) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  }

  constructor(private _patientRepository: PatientRepository) {}

  async ngOnInit(): Promise<void> {
    this.patients = await this._patientRepository.getPatientList();
  }
}
