import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';
import { NgStepperComponent } from '../ng-stepper.component';
import { NgStepperItemComponent } from '../ng-stepper-item';

@Directive({
  selector: 'button[ngStepperTrigger]',
  standalone: true,
  host: {
    '[attr.data-state]': "isActive() && 'active'",
    '[attr.data-selected]': "isActive() || selected() ? 'true' : 'false'",
    '[class]': '_computedClass()',
  },
})
export class NgStepperTriggerDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    hlm(
      'data-[selected=true]:w-8 data-[selected=true]:h-8 data-[selected=false]:bg-muted-foreground data-[selected=false]:w-3 data-[selected=false]:h-3 data-[selected=false]:m-2.5 data-[selected=false]:text-transparent bg-[#A8F48E] rounded-full flex items-center justify-center font-bold text-background data-[state=active]:shadow-[0_0_0_3px_#1E1E1E,0_0_0_4px_#A8F48E] cursor-default',
      this.userClass()
    )
  );

  constructor(
    private _root: NgStepperComponent,
    private _stepperItem: NgStepperItemComponent
  ) {}

  selected(): boolean {
    const step = this._stepperItem.step;
    const activeStep = this._root.activeStep;

    return step < activeStep;
  }

  isActive(): boolean {
    const step = this._stepperItem.step;
    const activeStep = this._root.activeStep;

    return step == activeStep;
  }
}
