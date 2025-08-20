import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputSearchComponent } from '@app/components/ui/input-search/input-search.component';
import { NgRowTogglerDirective } from '@app/components/ui/ng-table/ng-row-toggler/ng-row-toggler.directive';
import { NgTableComponent } from '@app/components/ui/ng-table/ng-table.component';
import { MedicalHistoryRepository, UserRepository } from '@app/repositories';
import { TranslateModule } from '@ngx-translate/core';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { BrnTableModule } from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    HlmSkeletonComponent,

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    InputSearchComponent,

    NgTableComponent,
    NgRowTogglerDirective,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  patients: any[] = [];

  getFallback(name: any) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  }

  constructor(
    private _medicalHistoryRepository: MedicalHistoryRepository,
    private _userRepository: UserRepository
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getPatientList();
  }

  async getPatientList() {
    const medicalHistory =
      await this._medicalHistoryRepository.getMedicalHistoryList();

    medicalHistory.forEach(async (x) => {
      const user = await this._userRepository.getUserById(x.patientId);

      this.patients.push({
        ...x,
        ...user,
      });
    });
  }
}
