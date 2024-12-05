import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrorComponent } from '@app/components/input-error';
import { TagComponent } from '@app/components/ui/tag';
import { AppointmentRepository, MedicalHistoryRepository } from '@app/repositories';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-end-appointment',
  standalone: true,
  imports: [
    CommonModule,

    HlmIconComponent,

    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetFooterComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconComponent,
    HlmLabelDirective,

    TagComponent,

    InputErrorComponent,
    HlmToasterComponent,

    ReactiveFormsModule,
  ],
  templateUrl: './end-appointment.component.html',
  styleUrl: './end-appointment.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class EndAppointmentComponent {
  @Input() id!: any;
  @Input() patient!: any;
  @Input() doctor!: any;
  @Input() date!: any;
  @Input() hour!: any;
  @Input() status!: string;

  isLoading: boolean = false;

  form = new FormGroup({
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    temperature: new FormControl('', Validators.required),
    pressure: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  constructor(private _appointmentRepository: AppointmentRepository, private _medicalHistoryRepository: MedicalHistoryRepository) {}

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  async onEndAppointment(ctx: any) {
    const data = this.form.getRawValue();

    this.form.markAsPending();
    this.isLoading = true;

    await this._medicalHistoryRepository.add(data);
    await this._appointmentRepository.addMessageById(this.id, data.comment as string);
    await this._appointmentRepository.changeStatusById(this.id, 'finished');

    toast('Turno finalizado', {
      description: 'El turno medico se ha sido finalizado correctamente'
    })

    ctx.close();
  }
}
