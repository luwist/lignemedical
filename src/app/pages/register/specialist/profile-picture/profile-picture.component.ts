import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DropzoneComponent } from '@app/components';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [DropzoneComponent],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
})
export class ProfilePictureComponent {
  @Input() control!: AbstractControl;

  get profilePictureGroup(): FormGroup {
    return this.control as FormGroup;
  }

  onUpdateFile(url: string): void {
    const profilePicture = this.profilePictureGroup;
    
    this.control.patchValue({
      profilePicture: url,
    });
  }
}
