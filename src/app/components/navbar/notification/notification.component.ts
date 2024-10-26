import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';

import { NotificationMessageComponent } from './notification-message/notification-message.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmButtonDirective,

    NotificationMessageComponent,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {}
