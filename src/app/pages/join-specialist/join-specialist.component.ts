import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-join-specialist',
  standalone: true,
  imports: [RouterLink, HlmButtonDirective],
  templateUrl: './join-specialist.component.html',
  styleUrl: './join-specialist.component.scss',
})
export class JoinSpecialistComponent {}
