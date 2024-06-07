import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  phrases: string[] = [
    'Vea toda la información sobre su paciente en un solo lugar',
    'Mantenga toda la información de salud organizada y accesible al instante',
  ];
  phrase: string = 'Vea toda la información sobre su paciente en un solo lugar';
}
