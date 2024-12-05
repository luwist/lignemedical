import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ng-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ng-search-input.component.html',
  styleUrl: './ng-search-input.component.scss'
})
export class NgSearchInputComponent {
  @Output() valueSearch = new EventEmitter<string>();
  @Input() placeholder!: string;

  value: string = '';

  isFocused: boolean = false;

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onKeyup(e: KeyboardEvent) {
    this.valueSearch.emit(this.value);
  }
}
