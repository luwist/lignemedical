import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
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

  private _completedOverride: boolean | null = null;

  @Input({ transform: booleanAttribute })
  get completed(): boolean {
    return this._completedOverride == null
      ? this._getDefaultCompleted()
      : this._completedOverride;
  }
  set completed(value: boolean) {
    this._completedOverride = value;
  }

  private _getDefaultCompleted(): boolean {
    return this.stepControl.valid;
  }
}
