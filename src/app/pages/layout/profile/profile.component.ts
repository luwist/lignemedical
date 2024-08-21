import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models';
import { FirestoreService } from '@app/services';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,

    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: User | null;

  constructor(
    private _route: ActivatedRoute,
    private _firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(async (param) => {
      const uid = param['uid'];

      this.user = await this._firestore.getDocumentById<User>('users', uid);
    });
  }
}
