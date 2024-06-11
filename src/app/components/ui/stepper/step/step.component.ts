import {
  Component,
  Inject,
  Input,
  TemplateRef,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `,
})
export class StepComponent {
  @Input() label!: string;

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>;

  constructor(
    @Inject(forwardRef(() => StepperComponent)) public stepper: StepperComponent
  ) {}
}
