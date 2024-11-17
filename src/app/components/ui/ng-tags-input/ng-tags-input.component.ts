import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Specialty, SpecialtyRepository } from '@app/repositories';

@Component({
  selector: 'ng-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ng-tags-input.component.html',
  styleUrl: './ng-tags-input.component.scss'
})
export class NgTagsInputComponent implements OnInit {
  tags: string[] = [];
  value: string = '';

  showDropdown: boolean = false;

  specialists!: Specialty[];
  specialistsFiltered: string[] = [];

  @Output() getSpecialty = new EventEmitter<string>();

  constructor(private _specialtyRepository: SpecialtyRepository) {
  }
  
  async ngOnInit(): Promise<void> {
    this.specialists = await this._specialtyRepository.getSpecialtyList();
  }

  async onInput(e: KeyboardEvent): Promise<void> {
    if (e.key === 'Enter' && this.value !== '') {
      const valueTemp = this.value;

      this.tags.push(this.value);
      this.value = '';

      this.getSpecialty.emit(valueTemp);
      
      await this.addSpecialty(valueTemp);
    }
  }

  onRemoveTag(index: number): void {
    this.tags.splice(index, 1);
  }

  async onSelected(value: string): Promise<void> {
    const valueTemp = value;

    this.tags.push(value);

    this.value = '';
    this.showDropdown = false;
    
    this.getSpecialty.emit(valueTemp);

    await this.addSpecialty(valueTemp);
  }
  
  async addSpecialty(name: string) {
    if (this.specialists.find(x => x.name == name) == undefined && name !== '') {
      await this._specialtyRepository.add(name);
    }
  }

  onFocus(): void {
    this.showDropdown = true;
  }
}
