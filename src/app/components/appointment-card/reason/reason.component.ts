import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentRepository } from '@app/repositories';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';

@Component({
  selector: 'app-reason',
  standalone: true,
  imports: [CommonModule, HlmInputDirective, HlmButtonDirective, FormsModule],
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.scss'
})
export class ReasonComponent {
  @Input() id!: string;
  @Input() buttonText!: string;
  @Input() status!: string;

  message: string = '';

  constructor(private _appointmentRepository: AppointmentRepository) {}

  async onCancelAppointment() {
    await this._appointmentRepository.changeStatusById(this.id, this.status);
    await this._appointmentRepository.addMessageById(this.id, this.message);
  }
}
