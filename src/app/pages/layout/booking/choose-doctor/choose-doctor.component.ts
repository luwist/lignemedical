import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DoctorRepository } from '@app/repositories';
import { AvatarService } from '@app/services';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmAvatarComponent } from '@spartan-ng/ui-avatar-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-choose-doctor',
  standalone: true,
  imports: [CommonModule, HlmIconComponent, HlmAvatarComponent],
  templateUrl: './choose-doctor.component.html',
  styleUrl: './choose-doctor.component.scss',
  providers: [provideIcons({ lucideLoader2 })],
})
export class ChooseDoctorComponent implements OnChanges {
  @Output() selected = new EventEmitter();

  @Input() specialty!: string;

  loading!: boolean;
  itemSelected!: string;

  doctors: any = [];

  constructor(
    private _doctorRepository: DoctorRepository,
    private _avatarService: AvatarService
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.specialty) {
      await this.loadDoctors();
    } else {
      this.itemSelected = '';
    }
  }

  getBackgroundColorByName(name: string): string {
    return this._avatarService.getBackgroundColorByName(name);
  }

  getFallback(firstName: string, lastName: string): string {
    const name = `${firstName} ${lastName}`;

    return this._avatarService.getFallback(name);
  }

  async loadDoctors(): Promise<void> {
    this.loading = true;

    this.doctors = await this._doctorRepository.getDoctorListBySpecialty(
      this.specialty
    );

    this.loading = false;
  }

  async onSelected(value: any): Promise<void> {
    this.itemSelected = value.id;

    this.selected.emit({
      id: value.id,
      name: `${value.firstName} ${value.lastName}`,
      picture: value.picture,
    });
  }
}
