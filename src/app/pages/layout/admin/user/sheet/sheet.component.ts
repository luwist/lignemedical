import { Component } from '@angular/core';
import { AccountCardComponent, DropzoneComponent, InputErrorComponent, NgStepperComponent, NgStepperItemComponent, NgStepperSeparatorComponent, NgStepperStepIndexDirective, NgStepperTriggerDirective } from '@app/components';
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

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [
    CommonModule,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,

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

    DropzoneComponent
  ],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
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
      role: 'especialista',
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
      healthInsurance: new FormControl('', Validators.required),
    }),
    contact: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      profileImage: new FormControl(null, Validators.required),
      dniImage: new FormControl(null, Validators.required),
    }),
  });

  onSelect(account: Account): void {
    this.selectedOption = account.id;
    this.selectedRole = account.role;

    const accountGroup = this.registerForm.get('account') as FormGroup;

    accountGroup.patchValue({
      role: account.role,
    });
  }

  onUpdateFile(file: File, name: string): void {
    const profilePicture = this.registerForm;

    for (const key in profilePicture.controls) {
      if (name === key) {
        this.registerForm.patchValue({
          [key]: file,
        });
      }
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
}
