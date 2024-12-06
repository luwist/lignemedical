import { Component, OnInit } from '@angular/core';
import { InputSearchComponent } from '@app/components/ui/input-search/input-search.component';
import { UserRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import {
  BrnTableModule
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

    BrnTableModule,
    HlmTableModule,

    HlmButtonModule,

    InputSearchComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent implements OnInit {
  isLoading: boolean = true;
  patients: any[] = [];

  getFallback(name: any) {
    return name.split(' ')[0][0] + name.split(' ')[1][0];
  }

  constructor(private _userRepository: UserRepository) {}

  async ngOnInit(): Promise<void> {
    this.patients = await this._userRepository.getUserListByRole('paciente');

    this.isLoading = false;
  }
}
