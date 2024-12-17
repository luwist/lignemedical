import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserRepository } from '@app/repositories';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-choose-patient',
  standalone: true,
  imports: [CommonModule, HlmIconComponent],
  templateUrl: './choose-patient.component.html',
  styleUrl: './choose-patient.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class ChoosePatientComponent {
  @Output() selected = new EventEmitter<string>();

  loading: boolean = true;
  itemSelected!: string;

  patients: any = [];

  constructor(private _userRepository: UserRepository) {}

  async ngOnInit(): Promise<void> {
    await this.loadPatients();
  }

  async loadPatients(): Promise<void> {
    this.patients = await this._userRepository.getUserListByRole('paciente');

    this.loading = false;
  }

  async onSelected(value: any): Promise<void> {
    this.itemSelected = value;

    this.selected.emit(value);
  }
}
