import { Component, Input } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-notification-message',
  standalone: true,
  imports: [HlmButtonDirective],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss',
})
export class NotificationMessageComponent {
  @Input() name!: string;
}
