import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  DropzoneComponent,
  InputErrorComponent,
  MessageService,
  NgNumberInputComponent,
  NgStepperComponent,
  NgStepperItemComponent,
  NgStepperSeparatorComponent,
  NgStepperStepIndexDirective,
  ToastComponent,
} from '@app/components';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from '@app/services';
import { NgStepperTriggerDirective } from '@app/components/ui/ng-stepper/ng-stepper-trigger/ng-stepper-trigger.directive';
import { NgStepperListComponent } from '@app/components/ui/ng-stepper/ng-stepper-list/ng-stepper-list.component';
import { UserValidator } from '@app/validators/user.validator';
import { UserRepository } from '@app/repositories';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ToastComponent,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    ReactiveFormsModule,
    InputErrorComponent,
    PersonalInformationComponent,
    ContactInformationComponent,
    ProfilePictureComponent,
    HeaderComponent,
    FooterComponent,
    NgStepperComponent,
    NgStepperListComponent,
    NgStepperItemComponent,
    NgStepperSeparatorComponent,
    NgStepperStepIndexDirective,
    NgStepperTriggerDirective,
    NgNumberInputComponent,
    DropzoneComponent
],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
})
export class PatientComponent {
  @ViewChild('stepper', { static: true })
  public stepper!: NgStepperComponent;

  form = new FormGroup({
    personal: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      insurance: new FormControl('', Validators.required),
    }),
    contact: new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [UserValidator.checkIfEmailExists(this._userRepository)]
      }),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      profileImage: new FormControl(null, Validators.required),
      dniImage: new FormControl(null, Validators.required),
    })
  });

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService,
    private _userRepository: UserRepository
  ) {}

  getFormGroup(name: string): FormGroup {
    return this.form.get(name) as FormGroup;
  }

  onUpdateFile(file: File, name: string): void {
    const profilePicture = this.form;

    for (const key in profilePicture.controls) {
      if (name === key) {
        this.form.patchValue({
          [key]: file,
        });
      }
    }
  }

  async onRegister(): Promise<void> {
    console.log(this.form.value);
    // try {
    //   const credentials = this.registerForm.getRawValue();
    //   await this._authService.registerPatient(credentials);
    //   this._router.navigateByUrl('/verify-email');
    // } catch (error) {
    //   console.log(error);
    //   this._messageService.add({
    //     description:
    //       'Ha ocurrido un error en el servidor. Intentelo de nuevo mas tarde',
    //   });
    // }
  }
}