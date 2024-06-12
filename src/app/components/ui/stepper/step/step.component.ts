import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `,
})
export class StepComponent {
  @Input() label!: string;
  @Input() stepControl!: AbstractControl;

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>;
}
