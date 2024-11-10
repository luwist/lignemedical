import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgForm,
  ValidationErrors,
  Validator,
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
    <label hlmLabel
      >{{ label }}
      <input
        class="w-full"
        hlmInput
        type="text"
        [value]="value"
        (input)="onInput($event)"
      />
    </label>

    <app-input-error [control]="control" />
  `,
  styles: `
    :host {
      width: 100%;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgNumberInputComponent),
    },
  ],
})
export class NgNumberInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() length!: number;
  @Input() control!: AbstractControl;

  value: string = '';

  onChangeFn!: Function;

  onTouched = () => {};

  touched = false;

  disabled = false;

  onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    // this.markAsTouched();

    // if (!this.disabled) {
    //   this.onChangeFn(value);
    // }

    this.value = value;
  }

  // markAsTouched() {
  //   if (!this.touched) {
  //     this.onTouched();

  //     this.touched = true;
  //   }
  // }

  writeValue(value: string): void {
    this.onTouched();

    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
