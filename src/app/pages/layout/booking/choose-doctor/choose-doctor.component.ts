import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DoctorRepository } from '@app/repositories';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmAvatarComponent } from '@spartan-ng/ui-avatar-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-choose-doctor',
  standalone: true,
  imports: [CommonModule, HlmIconComponent, HlmAvatarComponent],
  templateUrl: './choose-doctor.component.html',
  styleUrl: './choose-doctor.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class ChooseDoctorComponent implements OnChanges {
  @Output() selected = new EventEmitter<string>();

  @Input() specialty!: string;

  loading!: boolean;
  itemSelected!: string;

  doctors: any = [];

  constructor(private _doctorRepository: DoctorRepository) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.specialty !== undefined) {
      await this.loadDoctors();

      console.log(this.specialty);
      console.log(this.doctors);
    }
  }

  async loadDoctors(): Promise<void> {
    this.loading = true;

    this.doctors = await this._doctorRepository.getDoctorListBySpecialty(this.specialty);

    this.loading = false;
  }

  async onSelected(value: any): Promise<void> {
    this.itemSelected = value;

    this.selected.emit(value);
  }
}