import { Directive, Input, computed, input, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const inputVariants = cva(
  'flex rounded-xl border font-normal border-transparent bg-input text-sm text-foreground file:border-0 file:text-foreground file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-14 p-5',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
      error: {
        auto: '[&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'text-destructive border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  }
);
type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: '[hlmInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmInputDirective {
  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  set size(value: InputVariants['size']) {
    this._size.set(value);
  }

  private readonly _error = signal<InputVariants['error']>('auto');
  @Input()
  set error(value: InputVariants['error']) {
    this._error.set(value);
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      inputVariants({ size: this._size(), error: this._error() }),
      this.userClass()
    )
  );
}
