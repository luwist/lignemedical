import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import { BrnAvatarComponent } from '@spartan-ng/ui-avatar-brain';
import { hlm } from '@spartan-ng/ui-core';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    variant: {
      medium: 'h-11 w-11',
      large: 'h-12 w-12 text-base',
      xLarge: 'h-14 w-14 text-xl',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'medium',
    shape: 'circle',
  },
});

type AvatarVariants = VariantProps<typeof avatarVariants>;

@Component({
  selector: 'hlm-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  template: `
    @if (image?.canShow()) {
    <ng-content select="[hlmAvatarImage],[brnAvatarImage]" />
    } @else {
    <ng-content select="[hlmAvatarFallback],[brnAvatarFallback]" />
    }
  `,
})
export class HlmAvatarComponent extends BrnAvatarComponent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() => {
    const a = hlm(
      avatarVariants({ variant: this._variant(), shape: this._shape() }),
      this.userClass()
    );

    console.log(a);

    return a;
  });

  private readonly _variant = signal<AvatarVariants['variant']>('medium');
  @Input()
  set variant(variant: AvatarVariants['variant']) {
    this._variant.set(variant);
  }

  private readonly _shape = signal<AvatarVariants['shape']>('circle');
  @Input()
  set shape(shape: AvatarVariants['shape']) {
    this._shape.set(shape);
  }
}
