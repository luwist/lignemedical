import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

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

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<any>;
}
