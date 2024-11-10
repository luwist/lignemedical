import {
  AfterContentInit,
  Component,
  computed,
  ContentChildren,
  EventEmitter,
  input,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { NgStepperItemComponent } from './ng-stepper-item';
import { ClassValue } from 'clsx';
import { hlm } from '@spartan-ng/ui-core';
import { NgStepperStepIndexDirective } from './ng-stepper-step-index';

@Component({
  selector: 'ng-stepper',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class NgStepperComponent implements AfterContentInit {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() => hlm('flex gap-20', this.userClass()));

  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  @ContentChildren(NgStepperItemComponent, { descendants: true })
  private _steps!: QueryList<NgStepperItemComponent>;

  @ContentChildren(NgStepperStepIndexDirective, { descendants: true })
  private _stepIndex!: QueryList<NgStepperStepIndexDirective>;

  @Output()
  readonly stepActivated = new EventEmitter<number>();

  activeStep: number = 1;

  disabled: boolean = true;

  steps: QueryList<NgStepperItemComponent> =
    new QueryList<NgStepperItemComponent>();

  ngAfterContentInit(): void {
    this.steps = this._steps;
  }
  
  next() {
    this.activeStep += 1;
  }
  
  prev() {
    if (this.activeStep > 1) {
      this.activeStep -= 1;
    }
  }

  emitStepActivated(step: number) {
    this.stepActivated.emit(step);
  }

  setStepActivated(step: number) {
    this.activeStep = step;
  }
}
