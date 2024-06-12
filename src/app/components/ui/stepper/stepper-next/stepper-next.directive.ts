import { Directive, HostListener } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperNext]',
  standalone: true,
})
export class StepperNextDirective {
  constructor(private _stepper: StepperComponent) {}

  @HostListener('click') onNext(): void {
    this._stepper.next();
  }
}
