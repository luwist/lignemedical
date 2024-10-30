import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputErrorComponent } from '@app/components/input-error';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'ng-number-input',
  standalone: true,
  imports: [
    CommonModule,
    InputErrorComponent,
    HlmLabelDirective,
    HlmInputDirective,
  ],
  template: `
    <div class="w-full">
      <label hlmLabel
        >{{ label }}
        <input
          class="w-full"
          hlmInput
          type="text"
          [maxLength]="length"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
      </label>

      <app-input-error [control]="control" />
    </div>
  `,
  styles: `
    :host {
      width: 100%;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgNumberInputComponent),
      multi: true,
    },
  ],
})
export class NgNumberInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() length!: number;
  @Input() control!: AbstractControl;

  value: string = '';

  onChange = (value: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.onChange(value);

    this.value = value;

    console.log(this.value);
    console.log(this.control);
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
