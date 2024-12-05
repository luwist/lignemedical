import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagComponent } from '../ui/tag';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { EndAppointmentComponent } from './end-appointment/end-appointment.component';
import { AppointmentRepository } from '@app/repositories';
import { ReasonComponent } from './reason/reason.component';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-session-card',
  standalone: true,
  imports: [CommonModule, TagComponent, HlmButtonDirective, EndAppointmentComponent, ReasonComponent, CommentComponent],
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.scss'
})
export class SessionCardComponent {
  @Output() endAppointment = new EventEmitter();

  @Input() id!: any;
  @Input() patient!: any;
  @Input() doctor!: any;
  @Input() date!: any;
  @Input() hour!: any;
  @Input() status!: string;
  @Input() message!: string;

  showMessage: boolean = false;
  showReason: boolean = false;

  constructor(private _appointmentRepository: AppointmentRepository) {}

  onShowMessage(): void {
    this.showMessage = !this.showMessage;
  }

  onEndAppointment() {
    this.endAppointment.emit(true);
  }

  onChangeVisibility() {
    this.showReason = true;
  }

  async onChangeStatus(status: string) {
    await this._appointmentRepository.changeStatusById(this.id, status);
  }
}
