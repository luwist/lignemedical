import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  isFocused: boolean = false;

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
