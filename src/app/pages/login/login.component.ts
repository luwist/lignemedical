import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { Account } from './account.interface';
import { AuthService } from '@app/services';
import {
  AccountCardComponent,
  InputErrorComponent,
  MessageService,
  ToastComponent,
} from '@app/components';
import { LoginRequest } from '@app/requests';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    AccountCardComponent,
    ToastComponent,
    InputErrorComponent,

    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  selectedOption!: number;
  phrases: string[] = [
    'Vea toda la información sobre su paciente en un solo lugar',
    'Mantenga toda la información de salud organizada y accesible al instante',
  ];
  phrase: string = 'Vea toda la información sobre su paciente en un solo lugar';

  accounts: Account[] = [
    {
      id: 1,
      imageSrc: 'images/hacker.png',
      role: 'administrador',
      email: 'administrador@administrador.com',
      password: 'administrador',
    },
    {
      id: 2,
      imageSrc: 'images/nurse.png',
      role: 'especialista',
      email: 'especialista@especialista.com',
      password: 'especialista',
    },
    {
      id: 3,
      imageSrc: 'images/boy.png',
      role: 'paciente',
      email: 'paciente@paciente.com',
      password: 'paciente',
    },
  ];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSelect(account: Account): void {
    this.selectedOption = account.id;

    this.loginForm.patchValue({
      email: account.email,
      password: account.password,
    });
  }

  async onLogin(): Promise<void> {
    try {
      const credentials = this.loginForm.getRawValue() as LoginRequest;

      this.loginForm.markAsPending();

      await this._authService.login(credentials);

      this._router.navigateByUrl('/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
          this._messageService.add({
            description:
              'No hemos podido encontrar ninguna cuenta que coincida con el correo electronico y la contraseña introducidos. Comprueba tu correo electronico y contraseña e intentalo de nuevo.',
          });
          break;

        default:
          this._messageService.add({
            description:
              'Ha ocurrido un error en el servidor. Intentelo de nuevo mas tarde',
          });
          break;
      }
    }
  }
}
