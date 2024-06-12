import { Directive, HostListener } from '@angular/core';
import { StepperComponent } from '../stepper.component';

@Directive({
  selector: '[appStepperPrevious]',
  standalone: true,
})
export class StepperPreviousDirective {
  constructor(private _stepper: StepperComponent) {}

  @HostListener('click') onPrevious(): void {
    this._stepper.previous();
  }
}
