import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
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
  @Output() updateFile = new EventEmitter<string>();

  @ViewChild('progress') progressbar!: ElementRef;

  imageSrc!: string | ArrayBuffer | null;
  progressUpload: number = 0;
  isUploading: boolean = false;

  constructor(private _storage: Storage) {}

  onFileSelected(e: any): void {
    const file = e.target.files[0] as File;

    this.previewImage(file);
    this.uploadFile(file);
  }

  previewImage(file: File): void {
    const reader = new FileReader();

    reader.onload = () => (this.imageSrc = reader.result);

    reader.readAsDataURL(file);
  }

  uploadFile(file: File): void {
    const storageRef = ref(this._storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        this.isUploading = true;

        this.progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        const progressElement = this.progressbar;

        progressElement.nativeElement.style.width = `${this.progressUpload}%`;

        this.isUploading = false;

        this.updateFile.emit(url);
      }
    );
  }

  onRemoveImage(): void {
    this.imageSrc = null;
  }
}
