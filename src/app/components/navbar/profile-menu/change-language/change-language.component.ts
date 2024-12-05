import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [
    CommonModule,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
  ],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss'
})
export class ChangeLanguageComponent {
  languages: any = [
    {
      code: "en",
      name: "english",
      image: "assets/flags/en-US.png",
    },
    {
      code: "pt",
      name: "português",
      image: "assets/flags/pt-BR.png",
    },
    {
      code: "es",
      name: "español",
      image: "assets/flags/es-ES.png",
    },
  ]

  currentLanguage: any = "es";

  onChangeLanguage(code: string) {
    this.currentLanguage = code;
  }
}
