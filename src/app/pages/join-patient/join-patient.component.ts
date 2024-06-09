import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-join-patient',
  standalone: true,
  imports: [RouterLink, HlmButtonDirective],
  templateUrl: './join-patient.component.html',
  styleUrl: './join-patient.component.scss',
})
export class JoinPatientComponent {}
