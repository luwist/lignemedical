import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  DropzoneComponent,
  InputErrorComponent,
  StepComponent,
  StepperComponent,
  StepperNextDirective,
  StepperPreviousDirective,
} from '@app/components';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
@Component({
  selector: 'app-patient',
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
    DropzoneComponent,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  form = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      identityDocument: new FormControl('', Validators.required),
      healthInsurance: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      file: new FormControl(null, Validators.required),
    }),
  });

  constructor(private _router: Router, private _auth: Auth) {}

  get personalInformationControlform() {
    return this.form.get('personalInformation') as FormGroup;
  }

  get profilePictureGroup(): FormGroup {
    return this.form.get('profilePicture') as FormGroup;
  }

  get firstNameControl(): FormControl {
    const personalInformation = this.personalInformationControlform;

    return personalInformation.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    const personalInformation = this.personalInformationControlform;

    return personalInformation.get('lastName') as FormControl;
  }

  get ageControl(): FormControl {
    const personalInformation = this.personalInformationControlform;

    return personalInformation.get('age') as FormControl;
  }

  get identityDocumentControl(): FormControl {
    const personalInformation = this.personalInformationControlform;

    return personalInformation.get('identityDocument') as FormControl;
  }

  get healthInsuranceControl(): FormControl {
    const personalInformation = this.personalInformationControlform;

    return personalInformation.get('healthInsurance') as FormControl;
  }

  get contactInformationControlform() {
    return this.form.get('contactInformation') as FormGroup;
  }

  get emailControl(): FormControl {
    const personalInformation = this.contactInformationControlform;

    return personalInformation.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    const personalInformation = this.contactInformationControlform;

    return personalInformation.get('password') as FormControl;
  }

  get profilePictureControlform() {
    return this.form.get('profilePicture') as FormGroup;
  }

  onPathvalue(file: File): void {
    console.log(file);

    this.profilePictureControlform.patchValue({
      file: file,
    });
  }

  async onRegister(): Promise<void> {
    const credentials = this.form.getRawValue();

    console.log(credentials);

    const credentialRegister = await createUserWithEmailAndPassword(
      this._auth,
      credentials.contactInformation.email as string,
      credentials.contactInformation.password as string
    );

    await sendEmailVerification(credentialRegister.user);

    this._router.navigateByUrl('/verify-email');
  }
}
