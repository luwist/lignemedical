import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  InputErrorComponent,
  MessageService,
  ToastComponent,
} from '@app/components';
import {
  StepComponent,
  StepperComponent,
  StepperNextDirective,
  StepperPreviousDirective,
} from '@app/components/ui/stepper';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { AuthService } from '@app/services';
import { DoctorRequest } from '@app/requests';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    ToastComponent,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    StepperComponent,
    StepComponent,

    StepperNextDirective,
    StepperPreviousDirective,

    ReactiveFormsModule,

    InputErrorComponent,

    PersonalInformationComponent,
    ContactInformationComponent,
    ProfilePictureComponent,

    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
})
export class SpecialistComponent {
  registerForm = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      specialist: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      profileImage: new FormControl(null, Validators.required),
    }),
  });

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}

  get personalInformationGroup(): FormGroup {
    return this.registerForm.get('personalInformation') as FormGroup;
  }

  get contactInformationGroup(): FormGroup {
    return this.registerForm.get('contactInformation') as FormGroup;
  }

  get profilePictureGroup(): FormGroup {
    return this.registerForm.get('profilePicture') as FormGroup;
  }

  async onRegister(): Promise<void> {
    try {
      const credentials = this.registerForm.getRawValue();

      await this._authService.registerDoctor(credentials);

      this._router.navigateByUrl('/verify-email');
    } catch (error) {
      console.log(error);
      this._messageService.add({
        description:
          'Ha ocurrido un error en el servidor. Intentelo de nuevo mas tarde',
      });
    }
  }
}
