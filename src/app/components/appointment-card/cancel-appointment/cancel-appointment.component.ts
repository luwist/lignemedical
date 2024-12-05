import { Component, Input } from '@angular/core';
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
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AppointmentRepository } from '@app/repositories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-appointment',
  standalone: true,
  imports: [
    CommonModule,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmInputDirective,
    HlmButtonDirective,
  ],
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.scss'
})
export class CancelAppointmentComponent {
  @Input() id!: string;

  message: any = '';

  constructor(private _appointmentRepository: AppointmentRepository) {}

  onCancelAppointment(ctx: any) {
    this._appointmentRepository.changeStatusById(this.id, 'cancelled');

    ctx.close();
  }
}
