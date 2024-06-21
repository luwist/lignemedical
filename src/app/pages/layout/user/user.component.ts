import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { CommonModule } from '@angular/common';
import { SheetComponent } from './sheet/sheet.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,

    SheetComponent,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    HlmSwitchComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  items = [
    {
      id: 6735,
      name: 'John Doe',
      age: 35,
      email: 'johndoe@example.com',
      dni: 12345678,
      role: 'usuario',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      isActive: true,
    },
    {
      id: 8923,
      name: 'Alice Johnson',
      age: 42,
      email: 'alice.johnson@domain.co.uk',
      dni: 12345678,
      role: 'especialista',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      isActive: true,
    },
    {
      id: 1029,
      name: 'Michael Smith',
      age: 30,
      email: 'michael.smith@gmail.com',
      dni: 12345678,
      role: 'administrador',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      isActive: true,
    },
  ];

  idSelected!: number;
  active: boolean = false;

  onSelect(id: number): void {
    this.idSelected = id;

    this.active = !this.active;
  }
}
