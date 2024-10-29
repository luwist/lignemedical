import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { NgStepperItemComponent } from './ng-stepper-item';

@Component({
  selector: 'ng-stepper',
  standalone: true,
  template: `<ng-content />`,
})
export class NgStepperComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  @ContentChildren(NgStepperItemComponent, { descendants: true })
  private _steps!: QueryList<NgStepperItemComponent>;

  @Output()
  readonly stepActivated = new EventEmitter<number>();

  activeStep: number = 1;

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
