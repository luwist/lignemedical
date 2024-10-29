import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const listVariants = cva('w-8 flex gap-20', {
  variants: {
    orientation: {
      horizontal: 'h-10',
      vertical: 'flex-col items-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
type ListVariants = VariantProps<typeof listVariants>;

@Component({
  selector: 'ng-stepper-list',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': '_computedClass()',
  },
})
export class NgStepperListComponent {
  public readonly orientation =
    input<ListVariants['orientation']>('horizontal');

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(listVariants({ orientation: this.orientation() }), this.userClass())
  );
}
