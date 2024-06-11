import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-header',
  standalone: true,
  imports: [],
  templateUrl: './step-header.component.html',
  styleUrl: './step-header.component.scss',
})
export class StepHeaderComponent {
  @Input() index!: number;
  @Input() label!: string;
}
