import { Component, Input, OnInit } from '@angular/core';
import { TagComponent } from '../ui/tag';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [
    CommonModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    TagComponent,
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  @Input() name!: string;
  @Input() speciality!: string;
  @Input() date!: string;
  @Input() hour!: string;
  @Input() status!: string;
  @Input() message: string | undefined;

  showMessage: boolean = false;

  fallBack!: string;

  ngOnInit(): void {
    this.fallBack = this.name.split(' ')[0][0] + this.name.split(' ')[1][0];
  }

  onShowMessage(): void {
    this.showMessage = !this.showMessage;
  }
}
