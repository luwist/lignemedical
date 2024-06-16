import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss',
})
export class DropzoneComponent {
  @Input() control!: FormControl;
  @Output() emitterFile = new EventEmitter<File>();

  imageSrc!: string | ArrayBuffer | null;

  onPreviewImage(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);

      if (file) {
        this.emitterFile.emit(file);
      }
    }
  }
}
