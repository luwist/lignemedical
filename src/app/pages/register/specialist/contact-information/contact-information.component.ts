import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputErrorComponent } from '@app/components';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-contact-information',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmLabelDirective,
    InputErrorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-information.component.html',
  styleUrl: './contact-information.component.scss',
})
export class ContactInformationComponent {
  @Input() control!: AbstractControl;

  get contactInformationGroup(): FormGroup {
    return this.control as FormGroup;
  }

  get emailControl(): FormControl {
    return this.control.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.control.get('password') as FormControl;
  }
}
