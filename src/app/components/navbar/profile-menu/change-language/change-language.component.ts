import { Component } from '@angular/core';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective
  ],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss'
})
export class ChangeLanguageComponent {
  
}
