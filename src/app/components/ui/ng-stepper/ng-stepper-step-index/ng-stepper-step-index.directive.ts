import { Directive, Input } from '@angular/core';
import { NgStepperComponent } from '../ng-stepper.component';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[ngStepperStepIndex]',
  standalone: true,
  host: {
    '[hidden]': 'isSelected() === false',
  },
})
export class NgStepperStepIndexDirective {
  @Input() ngStepperStepIndex!: number;
  @Input() stepControl!: AbstractControl;

  public isDisabled!: boolean;

  constructor(private _root: NgStepperComponent) {}

  isSelected(): boolean {
    return this._root.activeStep == this.ngStepperStepIndex;
  }
}
