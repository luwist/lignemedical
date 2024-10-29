import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';
import { NgStepperComponent } from '../ng-stepper.component';
import { NgStepperItemComponent } from '../ng-stepper-item';

@Component({
  selector: 'ng-stepper-separator',
  standalone: true,
  template: '',
  host: {
    '[attr.data-state]': "isActive() ? 'completed' : 'waiting'",
    '[class]': '_computedClass()',
  },
})
export class NgStepperSeparatorComponent {
  public state = 'waiting';

  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    hlm(
      'absolute top-[32px] left-[15px] w-[2px] h-[80px] data-[state=waiting]:bg-muted data-[state=completed]:bg-[#A8F48E]',
      this.userClass()
    )
  );

  constructor(
    private _root: NgStepperComponent,
    private _stepperItem: NgStepperItemComponent
  ) {}

  isActive(): boolean {
    const step = this._stepperItem.step;
    const activeStep = this._root.activeStep;

    return step < activeStep;
  }
}
