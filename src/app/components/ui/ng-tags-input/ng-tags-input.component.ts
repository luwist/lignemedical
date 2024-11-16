import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  specialistsFiltered: string[] = []

  constructor(private _specialtyRepository: SpecialtyRepository) {
  }
  
  async ngOnInit(): Promise<void> {
    this.specialists = await this._specialtyRepository.getSpecialtyList();
  }

  async onInput(e: KeyboardEvent): Promise<void> {
    if (e.key === 'Enter') {
      const valueTemp = this.value;

      this.tags.push(this.value);
      this.value = '';
      
      await this.addSpecialty(valueTemp);
    }
  }

  onRemoveTag(index: number): void {
    this.tags.splice(index, 1);
  }

  async onSelected(value: string): Promise<void> {
    const valueTemp = this.value;

    this.tags.push(value);

    this.value = '';
    this.showDropdown = false;

    await this.addSpecialty(valueTemp);
  }
  
  async addSpecialty(name: string) {
    if (this.specialists.find(x => x.name == name) == undefined) {
      await this._specialtyRepository.add(name);
    }
  }

  onFocus(): void {
    this.showDropdown = true;
  }
}
