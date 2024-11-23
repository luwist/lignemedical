import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpecialtyRepository } from '@app/repositories';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-choose-speciality',
  standalone: true,
  imports: [CommonModule, HlmIconComponent],
  templateUrl: './choose-speciality.component.html',
  styleUrl: './choose-speciality.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class ChooseSpecialityComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();

  loading: boolean = true;
  itemSelected!: string;

  specialties: any = [];

  constructor(private _specialtyRepository: SpecialtyRepository) {}

  async ngOnInit(): Promise<void> {
    await this.loadSpecialties();
  }

  async loadSpecialties(): Promise<void> {
    this.specialties = await this._specialtyRepository.getSpecialtyList();

    this.loading = false;
  }

  async onSelected(value: any): Promise<void> {
    this.itemSelected = value;

    this.selected.emit(value);
  }
}
