import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DropzoneComponent, InputErrorComponent } from '@app/components';
import {
  StepComponent,
  StepperComponent,
  StepperNextDirective,
  StepperPreviousDirective,
} from '@app/components/ui/stepper';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

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
      dni: new FormControl('', Validators.required),
      healthInsurance: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      profilePicture: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    }),
  });

  imageSrc!: string | ArrayBuffer | null;

  constructor(private _router: Router, private _auth: Auth) {}

  get personalInformationGroup(): FormGroup {
    return this.form.get('personalInformation') as FormGroup;
  }

  get contactInformationGroup(): FormGroup {
    return this.form.get('contactInformation') as FormGroup;
  }

  get profilePictureGroup(): FormGroup {
    return this.form.get('profilePicture') as FormGroup;
  }

  getControl(formGroup: FormGroup, controlName: string): FormControl {
    return formGroup.get(controlName) as FormControl;
  }

  onImagePicked(e: Event, controlName: string) {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);

      if (file) {
        this.profilePictureGroup.patchValue({
          [controlName]: file,
        });
      }
    }
  }

  async onRegister(): Promise<void> {
    const credentials = this.form.getRawValue();

    console.log(credentials);

    // const credentialRegister = await createUserWithEmailAndPassword(
    //   this._auth,
    //   credentials.contactInformation.email as string,
    //   credentials.contactInformation.password as string
    // );

    // await sendEmailVerification(credentialRegister.user);

    // this._router.navigateByUrl('/verify-email');
  }
}
