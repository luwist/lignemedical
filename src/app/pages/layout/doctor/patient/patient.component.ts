import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, computed, OnInit, TrackByFunction } from '@angular/core';
import { InputSearchComponent } from '@app/components/ui/input-search/input-search.component';
import { Patient } from '@app/models';
import { PatientRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import {
  BrnTableModule,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    HlmSkeletonComponent,

    BrnMenuTriggerDirective,
    HlmMenuModule,

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    DecimalPipe,
    TitleCasePipe,
    HlmIconComponent,
    HlmInputDirective,

    InputSearchComponent,
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

  protected readonly _brnColumnManager = useBrnColumnManager({
    name: { visible: true, label: 'Nombre' },
    dni: { visible: true, label: 'DNI' },
    email: { visible: true, label: 'Correo electronico' },
    historyMedical: { visible: true, label: 'Historial medico' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
  ]);

  protected readonly _trackBy: TrackByFunction<Patient> = (
    _: number,
    p: Patient
  ) => p.id;
}
