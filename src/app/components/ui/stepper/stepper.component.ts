import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { StepComponent } from './step/step.component';
import { CommonModule } from '@angular/common';
import { StepHeaderComponent } from './step-header/step-header.component';
import { StepState } from './step/step-status.type';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, StepComponent, StepHeaderComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepComponent, { descendants: true })
  private _steps!: QueryList<StepComponent>;

  steps: QueryList<StepComponent> = new QueryList<StepComponent>();

  private _selectedIndex = 0;

  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    if (!this._anyControlsInvalidOrPending(index)) {
      this._selectedIndex = index;
    }
  }

  ngAfterContentInit(): void {
    this.steps = this._steps;
  }

  next(): void {
    this.selectedIndex = Math.min(
      this._selectedIndex + 1,
      this.steps.length - 1
    );
  }

  previous(): void {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  getIndicatorType(index: number, state: StepState): string {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);

    return step.completed && !isCurrentStep ? 'done' : 'uncompleted';
  }

  stepIsNavigable(index: number, step: any): boolean {
    return this.selectedIndex === index || step.completed;
  }

  private _isCurrentStep(index: number): boolean {
    return this._selectedIndex === index;
  }

  private _anyControlsInvalidOrPending(index: number): boolean {
    return this.steps
      .toArray()
      .slice(0, index)
      .some((step) => {
        const control = step.stepControl;

        return control.invalid || control.pending;
      });
  }
}
