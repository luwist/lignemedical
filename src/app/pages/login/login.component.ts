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
import { AuthService, RedirectService } from '@app/services';
import { AccountCardComponent, InputErrorComponent } from '@app/components';
import { LoginRequest } from '@app/requests';
import { MessageService, ToastComponent } from '@app/components/ui/toast';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader2 } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { Account } from '@app/interfaces';
import { select, Store } from '@ngrx/store';
import { credentialsLogin } from '@app/store/auth/auth.actions';
import { selectUser } from '@app/store/auth/auth.selectors';
import { AppState } from '@app/store/app.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

    HlmIconComponent,

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
  providers: [provideIcons({ lucideLoader2 })],
})
export class LoginComponent {
  accounts: Account[] = [
    {
      id: 1,
      imageSrc: 'images/image-2.png',
      email: 'javier.vilchez@lignemedical.com',
      password: 'administrador',
      role: 'administrador',
    },
    {
      id: 2,
      imageSrc: 'images/image-3.png',
      email: 'paula.fernandez@lignemedical.com',
      password: '123456',
      role: 'doctora',
    },
    {
      id: 3,
      imageSrc: 'images/image-4.png',
      email: 'miguel.ruiz@lignemedical.com',
      password: '123456',
      role: 'doctor',
    },
    {
      id: 4,
      imageSrc: 'images/image-5.png',
      role: 'paciente',
      email: 'david.castillo@lignemedical.com',
      password: '123456',
    },
    {
      id: 5,
      imageSrc: 'images/image-6.png',
      role: 'paciente',
      email: 'natalia.ortiz@lignemedical.com',
      password: '123456',
    },
    {
      id: 6,
      imageSrc: 'images/image-7.png',
      role: 'paciente',
      email: 'lucia.morales@lignemedical.com',
      password: '123456',
    },
  ];

  isLoading: boolean = false;
  selectedOption!: number;
  role!: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _redirectService: RedirectService,
    private _router: Router,
    private _store: Store<AppState>,
  ) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSelect(account: Account): void {
    this.selectedOption = account.id;
    this.role = account.role;

    this.loginForm.patchValue({
      email: account.email,
      password: account.password,
    });
  }

  async onLogin(): Promise<void> {
    try {
      const credentials = this.loginForm.getRawValue() as LoginRequest;
      const url = this._redirectService.redirectByRole(this.role);

      this.loginForm.markAsPending();
      this.isLoading = true;

      this._store.dispatch(credentialsLogin({email: credentials.email, password: credentials.password}));
      
      this._router.navigateByUrl(url);
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
    } finally {
      this.isLoading = false;
    }
  }
}
