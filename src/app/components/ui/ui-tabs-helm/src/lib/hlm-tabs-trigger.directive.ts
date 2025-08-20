import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { BrnTabsTriggerDirective } from '@spartan-ng/ui-tabs-brain';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmTabsTrigger]',
  standalone: true,
  hostDirectives: [
    {
      directive: BrnTabsTriggerDirective,
      inputs: ['brnTabsTrigger: hlmTabsTrigger', 'disabled'],
    },
  ],
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmTabsTriggerDirective {
  public readonly triggerFor = input.required<string>({
    alias: 'hlmTabsTrigger',
  });

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(
      'inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-[14px] h-10 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-primary data-[state=active]:text-primary',
      this.userClass()
    )
  );
}
