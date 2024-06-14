import { NgModule } from '@angular/core';
import { StepperComponent } from './stepper.component';
import { StepComponent } from './step/step.component';
import { StepHeaderComponent } from './step-header';
import { StepperNextDirective } from './stepper-next';
import { StepperPreviousDirective } from './stepper-previous';

@NgModule({
  declarations: [],
  exports: [
    StepperComponent,
    StepComponent,
    StepHeaderComponent,
    StepperNextDirective,
    StepperPreviousDirective,
  ],
  imports: [
    StepperComponent,
    StepComponent,
    StepHeaderComponent,
    StepperNextDirective,
    StepperPreviousDirective,
  ],
})
export class StepperModule {}
