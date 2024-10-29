import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
} from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { ClassValue } from 'clsx';

@Component({
  selector: 'ng-stepper-item',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class NgStepperItemComponent {
  @Input() step!: number;

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => hlm('relative', this.userClass()));
}
