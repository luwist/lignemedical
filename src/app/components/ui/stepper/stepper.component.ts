import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { StepComponent } from './step/step.component';
import { CommonModule } from '@angular/common';
import { StepHeaderComponent } from './step-header/step-header.component';

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
    // if (this._anyControlsInvalidOrPending(index)) {
    //   this._selectedIndex = index;
    // }

    this._selectedIndex = index;
  }

  ngAfterContentInit(): void {
    this.steps = this._steps;
  }

  next(): void {
    this.selectedIndex += 1;
  }

  previous(): void {
    this.selectedIndex -= 1;
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
