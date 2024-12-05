import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() message!: string;

  showMessage: boolean = false;

  onShowMessage() {
    this.showMessage = !this.showMessage;
  }
}
