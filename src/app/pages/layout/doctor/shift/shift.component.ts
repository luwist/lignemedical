import { Component } from '@angular/core';

@Component({
  selector: 'app-shift',
  standalone: true,
  imports: [],
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.scss',
})
export class ShiftComponent {
  appointments = [
    {
      id: 1,
      doctor: 'Jhoe Doe',
      image: 'assets/images/man.png',
      specialist: 'Cardiologo',
      status: 'pending',
    },
  ];
}

/*

*/
