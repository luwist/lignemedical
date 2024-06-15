import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterLink, HlmButtonDirective],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() routerLink!: string;
}
