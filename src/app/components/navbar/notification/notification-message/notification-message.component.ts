import { Component, Input } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-notification-message',
  standalone: true,
  imports: [HlmButtonDirective],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.scss',
})
export class NotificationMessageComponent {
  @Input() id!: string;
  @Input() name!: string;

  constructor(private _firestore: Firestore) {}

  async onReject(): Promise<void> {
    await this.changeState(false);    
  }

  async onApproved(): Promise<void> {
    await this.changeState(true);
  }

  async changeState(state: boolean): Promise<void> {
    const docRef = doc(this._firestore, "notifications", this.id);

    await updateDoc(docRef, {
      isApproved: state
    });
  }
}
