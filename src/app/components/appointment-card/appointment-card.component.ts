import { Component, Input } from '@angular/core';
import { TagComponent } from '../ui/tag';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    TagComponent,
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent {
  @Input() name!: string;
  @Input() speciality!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Input() status!: string;
}
