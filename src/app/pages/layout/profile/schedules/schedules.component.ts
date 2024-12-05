import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserRepository } from '@app/repositories';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { HlmTabsComponent, HlmTabsContentDirective, HlmTabsListComponent, HlmTabsTriggerDirective } from '@spartan-ng/ui-tabs-helm';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [
    CommonModule,

    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,

    HlmSwitchComponent,
  ],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss'
})
export class SchedulesComponent implements OnInit {
  specialties: any[] = [];

  @Input() id!: string;

  constructor(private _userRepository: UserRepository) {}

  async ngOnInit(): Promise<void> {
    const user = await this._userRepository.getUserById(this.id);

    this.specialties = user?.specialties as any[];
  }

  onChange(state: any, index: number): void {
    // this.specialties[0][index].isActive = state;

    console.log(this.specialties);
    // console.log(index);
    // this._firestoreService.updateDocumentById('users', id, {
    //   isEnable: state,
    // });
  }
}
