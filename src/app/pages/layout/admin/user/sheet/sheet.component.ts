import { Component } from '@angular/core';
import { AccountCardComponent, DropzoneComponent, InputErrorComponent, MessageService, NgStepperComponent, NgStepperItemComponent, NgStepperSeparatorComponent, NgStepperStepIndexDirective, NgStepperTriggerDirective } from '@app/components';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@app/components/ui/ui-sheet-helm/src';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import { HeaderComponent } from './header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { Account } from '@app/interfaces/account.interface';
import { CommonModule } from '@angular/common';
import { NgStepperListComponent } from '@app/components/ui/ng-stepper/ng-stepper-list/ng-stepper-list.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { UserValidator } from '@app/validators/user.validator';
import { UserRepository } from '@app/repositories';
import { NgTagsInputComponent } from '@app/components/ui/ng-tags-input/ng-tags-input.component';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [
    CommonModule,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,

    HlmIconComponent,

    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetFooterComponent,

    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    InputErrorComponent,

    NgStepperComponent,
    NgStepperListComponent,
    NgStepperItemComponent,
    NgStepperTriggerDirective,
    NgStepperSeparatorComponent,
    NgStepperStepIndexDirective,

    PersonalInformationComponent,
    ContactInformationComponent,
    HeaderComponent,

    ReactiveFormsModule,

    AccountCardComponent,

    DropzoneComponent,

    NgTagsInputComponent
  ],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class SheetComponent {
  selectedOption!: number;
  selectedRole!: string;

  accounts: Account[] = [
    {
      id: 1,
      imageSrc: 'images/hacker.png',
      role: 'administrador',
      email: 'administrador@administrador.com',
      password: 'administrador',
    },
    {
      id: 2,
      imageSrc: 'images/nurse.png',
      role: 'doctor',
      email: 'especialista@especialista.com',
      password: 'especialista',
    },
    {
      id: 3,
      imageSrc: 'images/boy.png',
      role: 'paciente',
      email: 'paciente@paciente.com',
      password: 'paciente',
    },
  ];

  registerForm = new FormGroup({
    account: new FormGroup({
      role: new FormControl('', Validators.required),
    }),
    personal: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    }),
    contact: new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [UserValidator.checkIfEmailExists(this._userRepository)]
      }),
      password: new FormControl('', Validators.required),
    }),
    profile: new FormGroup({
      picture: new FormControl(null, Validators.required)
    }),
  });

  currentSpecialists: string[] = [];
  isLoading: boolean = false;

  constructor(private _authService: AuthService, private _userRepository: UserRepository, private _messageService: MessageService) {}

  onSpecialty(name: string): void {
    const personalGroup = this.registerForm.get('personal') as FormGroup;

    this.currentSpecialists.push(name);

    personalGroup.patchValue({
      specialist: this.currentSpecialists,
    });
  }

  onSelect(account: Account): void {
    this.selectedOption = account.id;
    this.selectedRole = account.role;

    const accountGroup = this.registerForm.get('account') as FormGroup;
    const personalGroup = this.registerForm.get('personal') as FormGroup;
    const profileGroup = this.registerForm.get('profile') as FormGroup;

    this.registerForm.reset();

    accountGroup.patchValue({
      role: account.role,
    });

    Object.keys(personalGroup.controls).forEach(control => {
      if (control === 'specialist' || control === 'insurance') {
        personalGroup.removeControl(control);
      }
    });

    Object.keys(profileGroup.controls).forEach(control => {
      if (control === 'image') {
        profileGroup.removeControl(control);
      }
    });

    if (account.role == 'doctor') {
      personalGroup.addControl(
        'specialist',
        new FormControl('', Validators.required)
      );
    }

    if (account.role == 'paciente') {
      personalGroup.addControl(
        'insurance',
        new FormControl('', Validators.required)
      );

      profileGroup.addControl(
        'image',
        new FormControl(null, Validators.required)
      );
    }
  }
  
  onUpdateFile(url: string, name: string): void {
    const formGroup = this.getFormGroup('profile');

    formGroup.patchValue({
      picture: url,
    });
    
    if (this.selectedRole == 'paciente') {
      formGroup.patchValue({
        image: url,
      });
    }
  }

  onClosed(): void {
    this.selectedOption = 0;

    this.registerForm.reset();
  }

  getFormGroup(group: string): FormGroup {
    return this.registerForm.get(group) as FormGroup;
  }

  getFormControl(group: string, control: string): FormControl {
    return this.registerForm.get(group)?.get(control) as FormControl;
  }

  async onRegister(): Promise<void> {
    try {
      const credentials = this.registerForm.getRawValue();

      this.registerForm.markAsPending();
      this.isLoading = true;

      await this._authService.register(credentials, this.selectedRole);
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
