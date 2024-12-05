import { Component, Input, OnInit } from '@angular/core';
import { TagComponent } from '../ui/tag';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { AvatarService } from '@app/services';
import { AppointmentRepository } from '@app/repositories';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';
import { ReasonComponent } from './reason/reason.component';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [
    CommonModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,

    HlmButtonDirective,

    CancelAppointmentComponent,
    ReasonComponent,
    CommentComponent,

    TagComponent,
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  @Input() id!: string;
  @Input() name!: string;
  @Input() picture!: string;
  @Input() speciality!: string;
  @Input() date!: any;
  @Input() hour!: any;
  @Input() status!: string;
  @Input() message!: string;

  showMessage: boolean = false;
  showReason: boolean = false;

  fallBack!: string;

  backgroundColor!: string;

  constructor(private _avatarService: AvatarService, private _appointmentRepository: AppointmentRepository) {}

  ngOnInit(): void {
    this.backgroundColor = this._avatarService.getBackgroundColorByName(this.name);
    this.fallBack = this.name.split(' ')[0][0] + this.name.split(' ')[1][0];
  }

  onShowMessage(): void {
    this.showMessage = !this.showMessage;
  }

  onChangeVisibility() {
    this.showReason = true;
  }

  async onChangeStatus(status: string) {
    await this._appointmentRepository.changeStatusById(this.id, status);
  }
}
