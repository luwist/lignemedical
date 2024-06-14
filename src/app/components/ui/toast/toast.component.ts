import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MessageService } from './message/message.service';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [],
  template: `
    <div
      class="absolute top-0 left-0 w-full py-4 bg-destructive text-white text-sm text-center font-medium"
    >
      {{ message }}
    </div>
  `,
})
export class ToastItemComponent implements AfterViewInit, OnDestroy {
  @Input() message!: string;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  timeout: any;
  life: number = 5000;

  ngAfterViewInit() {
    this.initTimeout();
  }

  initTimeout() {
    this.timeout = setTimeout(() => {
      this.onClose.emit(this.message);
    }, this.life);
  }

  clearTimeout() {
    clearTimeout(this.timeout);
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastItemComponent],
  template: `
    <div #container>
      @for (message of messages; track $index) {

      <app-toast-item
        [message]="message.description"
        (onClose)="onMessageClose($event)"
      />
      }
    </div>
  `,
})
export class ToastComponent implements OnInit {
  @ViewChild('container') containerViewChild!: ElementRef;

  messages: any[] = [];

  constructor(private _messageService: MessageService) {}

  ngOnInit(): void {
    this._messageService.message.subscribe((message) => {
      // this.messages = [this.messages, ...message];
      this.messages.push(message);
    });
  }

  onMessageClose(message: any): void {
    this.messages = [];
  }
}
