import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [RouterLink, PanelComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {}
