import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [StepComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepComponent) stepperPanels!: QueryList<StepComponent>;

  activeStep: number = 0;
  panels!: StepComponent[];

  ngAfterContentInit(): void {
    this.panels = this.stepperPanels.toArray();

    this.stepperPanels.forEach((item) => {
      console.log(item);
    });
  }
}
