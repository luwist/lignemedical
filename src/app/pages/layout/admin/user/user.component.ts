import { Component, OnInit } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { CommonModule } from '@angular/common';
import { SheetComponent } from './sheet/sheet.component';
import { PatientRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { FirestoreService } from '@app/services';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,

    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    SheetComponent,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    HlmSwitchComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  items: any[] = [];
  doctors: any[] = [];

  constructor(
    private _patientRepository: PatientRepository,
    private _firestoreService: FirestoreService
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = await this._patientRepository.getPatientList();
    this.doctors = await this._patientRepository.getUserList();
  }

  onChange(e: any, id: string): void {
    this._firestoreService.updateDocumentById('users', id, {
      isEnable: e,
    });
  }
}
