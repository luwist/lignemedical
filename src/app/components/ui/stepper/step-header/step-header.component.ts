import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-header.component.html',
  styleUrl: './step-header.component.scss',
})
export class StepHeaderComponent {
  @Input() index!: number;
  @Input() label!: string;
  @Input() active!: boolean;
}
