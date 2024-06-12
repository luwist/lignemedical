import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StepComponent, StepperComponent } from '@app/components/ui/stepper';
import { StepperNextDirective } from '@app/components/ui/stepper/stepper-next/stepper-next.directive';
import { StepperPreviousDirective } from '@app/components/ui/stepper/stepper-previous/stepper-previous.directive';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-join-specialist',
  standalone: true,
  imports: [
    RouterLink,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    StepperComponent,
    StepComponent,

    StepperNextDirective,
    StepperPreviousDirective,

    ReactiveFormsModule,
  ],
  templateUrl: './join-specialist.component.html',
  styleUrl: './join-specialist.component.scss',
})
export class JoinSpecialistComponent {
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
  });

  get personalInformationControlform() {
    return this.register.get('personalInformation') as FormGroup;
  }
}
