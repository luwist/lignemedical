import { Directive, Input } from '@angular/core';
import { NgStepperComponent } from '../ng-stepper.component';

@Directive({
  selector: '[ngStepperStepIndex]',
  standalone: true,
  host: {
    '[hidden]': 'isSelected() === false',
  },
})
export class NgStepperStepIndexDirective {
  @Input() ngStepperStepIndex!: number;

  constructor(private _root: NgStepperComponent) {}

  isSelected(): boolean {
    return this._root.activeStep == this.ngStepperStepIndex;
  }
}
