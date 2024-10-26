import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper-separator',
  standalone: true,
  imports: [],
  templateUrl: './stepper-separator.component.html',
  styleUrl: './stepper-separator.component.scss',
})
export class StepperSeparatorComponent {
  @Input() class!: string;
}
