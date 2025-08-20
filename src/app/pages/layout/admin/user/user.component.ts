import { Component, OnInit } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { CommonModule } from '@angular/common';
import { SheetComponent } from './sheet/sheet.component';
import { UserRepository } from '@app/repositories';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { AvatarService, FirestoreService } from '@app/services';
import { User } from '@app/models';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { NgTableComponent } from '@app/components/ui/ng-table/ng-table.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgTooltipDirective } from '@app/components/ui/ng-tooltip';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    NgTableComponent,
    HlmSkeletonComponent,
    SheetComponent,
    HlmSwitchComponent,
    NgTooltipDirective,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  isLoading: boolean = true;

  admins: User[] = [];
  doctors: User[] = [];
  patients: User[] = [];

  constructor(
    private _avatarService: AvatarService,
    private _firestoreService: FirestoreService,
    private _userRepository: UserRepository
  ) {}

  async ngOnInit(): Promise<void> {
    // this.admins = [];
    this.admins = await this._userRepository.getUserListByRole('administrador');
    this.isLoading = false;
    this.doctors = await this._userRepository.getUserListByRole('doctor');
    console.log('DOCTORS');
    console.log(this.doctors);
    this.patients = await this._userRepository.getUserListByRole('paciente');
  }

  getFallback(name: any, surname: any): string {
    const fullName = `${name} ${surname}`;

    return this._avatarService.getFallback(fullName);
  }

  getBackgroundColor(name: any): string {
    return this._avatarService.getBackgroundColorByName(name);
  }

  onChange(e: any, id: string): void {
    this._firestoreService.updateDocumentById('users', id, {
      isEnable: e,
    });
  }
}
