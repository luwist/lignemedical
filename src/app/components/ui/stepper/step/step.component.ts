import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
})
export class StepComponent {
  @Input() label!: string;

  // @ContentChildren(ElementRef) template!: QueryList<ElementRef>;
}
