import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper-item',
  standalone: true,
  imports: [],
  template: ` <ng-content /> `,
  styleUrl: './stepper-item.component.scss',
})
export class StepperItemComponent {
  @Input() class!: string;
}
