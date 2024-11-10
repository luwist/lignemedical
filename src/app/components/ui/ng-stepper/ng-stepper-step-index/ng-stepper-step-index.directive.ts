import { AfterContentChecked, ChangeDetectorRef, Directive, Input } from '@angular/core';
import { NgStepperComponent } from '../ng-stepper.component';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[ngStepperStepIndex]',
  standalone: true,
  host: {
    '[hidden]': 'isSelected() === false',
  },
})
export class NgStepperStepIndexDirective implements AfterContentChecked {
  @Input() ngStepperStepIndex!: number;
  @Input() stepControl!: AbstractControl;

  public isDisabled!: boolean;

  constructor(private _root: NgStepperComponent, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    if (this.isSelected()) {
      this.isDisabled = this.stepControl.invalid;
      
      this._root.disabled = this.isDisabled;
    }
  }

  isSelected(): boolean {
    return this._root.activeStep == this.ngStepperStepIndex;
  }
}
