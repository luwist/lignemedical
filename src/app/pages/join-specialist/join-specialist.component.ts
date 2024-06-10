import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StepComponent, StepperComponent } from '@app/components/ui/stepper';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-join-specialist',
  standalone: true,
  imports: [RouterLink, HlmButtonDirective, StepperComponent, StepComponent],
  templateUrl: './join-specialist.component.html',
  styleUrl: './join-specialist.component.scss',
})
export class JoinSpecialistComponent {}
