import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './join.component.html',
  styleUrl: './join.component.scss',
})
export class JoinComponent {}
