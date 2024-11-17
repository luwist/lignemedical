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
  DropzoneComponent,
  InputErrorComponent,
  MessageService,
  NgStepperComponent,
  NgStepperItemComponent,
  NgStepperSeparatorComponent,
  NgStepperStepIndexDirective,
  NgStepperTriggerDirective,
  ToastComponent,
} from '@app/components';
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
import { NgStepperListComponent } from '@app/components/ui/ng-stepper/ng-stepper-list/ng-stepper-list.component';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { UserValidator } from '@app/validators/user.validator';
import { UserRepository } from '@app/repositories';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    HlmIconComponent,

    ToastComponent,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    ReactiveFormsModule,

    InputErrorComponent,

    PersonalInformationComponent,
    ContactInformationComponent,
    ProfilePictureComponent,

    NgStepperComponent,
    NgStepperItemComponent,
    NgStepperListComponent,
    NgStepperSeparatorComponent,
    NgStepperStepIndexDirective,
    NgStepperTriggerDirective,

    DropzoneComponent,

    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class SpecialistComponent {
  form = new FormGroup({
    personal: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      specialist: new FormControl(''),
    }),
    contact: new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          UserValidator.checkIfEmailExists(this._userRepository),
        ],
      }),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      profileImage: new FormControl(null),
    }),
  });

  currentSpecialists: string[] = [];
  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService,
    private _userRepository: UserRepository
  ) {}

  getFormGroup(name: string): FormGroup {
    return this.form.get(name) as FormGroup;
  }

  onSendSpecialty(name: string): void {
    const formGroup = this.getFormGroup('personal');

    this.currentSpecialists.push(name);

    formGroup.patchValue({
      specialist: this.currentSpecialists,
    });
  }

  onUpdateFile(url: string): void {
    const formGroup = this.getFormGroup('profilePicture');

    formGroup.patchValue({
      profileImage: url,
    });
  }

  get profilePictureGroup(): FormGroup {
    return this.form.get('profilePicture') as FormGroup;
  }

  async onRegister(): Promise<void> {
    try {
      const credentials = this.form.getRawValue();

      this.form.markAsPending();
      this.isLoading = true;

      await this._authService.registerDoctor(credentials);

      this._router.navigateByUrl('/verify-email');
    } catch (error) {
      this._messageService.add({
        description:
          'Ha ocurrido un error en el servidor. Intentelo de nuevo mas tarde',
      });
    } finally {
      this.isLoading = false;
    }
  }
}
