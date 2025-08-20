import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropzoneComponent, InputErrorComponent } from '@app/components';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [
    CommonModule,

    HlmInputDirective,
    HlmButtonDirective,
    HlmLabelDirective,
    InputErrorComponent,
    ReactiveFormsModule,

    DropzoneComponent,
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent {
  @Input() control!: AbstractControl;

  get personalInformationGroup(): FormGroup {
    return this.control as FormGroup;
  }

  get firstNameControl(): FormControl {
    return this.control.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    return this.control.get('lastName') as FormControl;
  }

  get dniControl(): FormControl {
    return this.control.get('dni') as FormControl;
  }

  get ageControl(): FormControl {
    return this.control.get('age') as FormControl;
  }

  get insuranceControl(): FormControl {
    return this.control.get('insurance') as FormControl;
  }
}
