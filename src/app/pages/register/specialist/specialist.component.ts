import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputErrorComponent } from '@app/components';
import { StepComponent, StepperComponent } from '@app/components/ui/stepper';
import { StepperNextDirective } from '@app/components/ui/stepper/stepper-next/stepper-next.directive';
import { StepperPreviousDirective } from '@app/components/ui/stepper/stepper-previous/stepper-previous.directive';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [
    CommonModule,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    StepperComponent,
    StepComponent,

    StepperNextDirective,
    StepperPreviousDirective,

    ReactiveFormsModule,

    InputErrorComponent,
  ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
})
export class SpecialistComponent {
  register = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      file: new FormControl(null, Validators.required),
    }),
  });

  imageSrc: any;

  constructor(private _router: Router) {}

  get personalInformationControlform() {
    return this.register.get('personalInformation') as FormGroup;
  }

  get firstNameControl() {
    const personalInformation = this.register.get(
      'personalInformation'
    ) as FormGroup;

    return personalInformation.get('firstName') as FormGroup;
  }

  get contactInformationControlform() {
    return this.register.get('contactInformation') as FormGroup;
  }

  get profilePictureControlform() {
    return this.register.get('profilePicture') as FormGroup;
  }

  onPreviewImage(e: any): void {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);

      if (file) {
        this.profilePictureControlform.patchValue({
          file: file,
        });
      }
    }
  }

  onRegister(): void {
    const credentials = this.register.getRawValue();

    console.log(credentials);

    this._router.navigateByUrl('/verify-email');
  }
}
