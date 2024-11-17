import { Component, OnDestroy, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';

import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { collection, Firestore, onSnapshot, query, Unsubscribe, where } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { selectUser } from '@app/store/auth/auth.selectors';
import { AppState } from '@app/store/app.state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    BrnPopoverCloseDirective,
    HlmPopoverContentDirective,
    HlmPopoverCloseDirective,
    HlmButtonDirective,
    NotificationMessageComponent,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  private unsubscribeFirestore!: Unsubscribe;
  private destroy$ = new Subject<void>();

  constructor(private _store: Store<AppState>, private _firestore: Firestore) {}

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications(): void {
    this._store
      .select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user?.uid && user.role === 'administrador') {
          const q = query(
            collection(this._firestore, 'notifications'),
            where('adminId', '==', user.uid),
            where('isApproved', '==', false)
          );
          
          if (this.unsubscribeFirestore) {
            this.unsubscribeFirestore();
          }

          this.unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
            const notifications: any[] = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              notifications.push(data);
            });
            this.notifications = notifications;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.unsubscribeFirestore) {
      this.unsubscribeFirestore();
    }
  }
}
