import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputErrorComponent } from '@app/components';
import {
  StepComponent,
  StepperComponent,
  StepperNextDirective,
  StepperPreviousDirective,
} from '@app/components/ui/stepper';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [
    CommonModule,

    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,

    StepperComponent,
    StepComponent,

    StepperNextDirective,
    StepperPreviousDirective,

    ReactiveFormsModule,

    InputErrorComponent,
  ],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.scss',
})
export class SpecialistComponent {
  register = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      healthInsurance: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      file: new FormControl(null, Validators.required),
    }),
  });

  registerForm = new FormGroup({
    personalInformation: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      identityDocument: new FormControl('', Validators.required),
      healthInsurance: new FormControl('', Validators.required),
    }),
    contactInformation: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    }),
    profilePicture: new FormGroup({
      file: new FormControl(null, Validators.required),
    }),
  });

  imageSrc: any;

  constructor(private _router: Router, private _auth: Auth) {}

  get personalInformationControlform(): FormGroup {
    return this.registerForm.get('personalInformation') as FormGroup;
  }

  get profilePictureGroup(): FormGroup {
    return this.registerForm.get('profilePicture') as FormGroup;
  }

  get firstNameControl(): FormControl {
    const personalInformation = this.registerForm.get(
      'personalInformation'
    ) as FormGroup;

    return personalInformation.get('firstName') as FormControl;
  }

  get lastNameControl(): FormControl {
    const personalInformation = this.registerForm.get(
      'personalInformation'
    ) as FormGroup;

    return personalInformation.get('lastName') as FormControl;
  }

  get identityDocumentControl(): FormControl {
    const personalInformation = this.registerForm.get(
      'personalInformation'
    ) as FormGroup;

    return personalInformation.get('identityDocument') as FormControl;
  }

  get healthInsuranceControl(): FormControl {
    const personalInformation = this.registerForm.get(
      'personalInformation'
    ) as FormGroup;

    return personalInformation.get('healthInsurance') as FormControl;
  }

  get contactInformationControlform() {
    return this.registerForm.get('contactInformation') as FormGroup;
  }

  get emailControl(): FormControl {
    const personalInformation = this.contactInformationControlform;

    return personalInformation.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    const personalInformation = this.contactInformationControlform;

    return personalInformation.get('password') as FormControl;
  }

  get profilePictureControlform() {
    return this.register.get('profilePicture') as FormGroup;
  }

  onPreviewImage(e: Event): void {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);

      if (file) {
        this.profilePictureControlform.patchValue({
          file: file,
        });
      }
    }
  }

  onCheckForm(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
  }

  async onRegister(): Promise<void> {
    const credentials = this.registerForm.getRawValue();

    console.log(credentials);

    // Crear un servicio de autenticacion
    const credentialRegister = await createUserWithEmailAndPassword(
      this._auth,
      credentials.contactInformation.email as string,
      credentials.contactInformation.password as string
    );

    sendEmailVerification(credentialRegister.user)
      .then(() => console.log('envio de verificacion'))
      .catch(() => console.log('La verificacion no fue enviada'));

    this._router.navigateByUrl('/verify-email');
  }
}

/*
* Botones de Acceso rápido
 - Debe ser botones cuadrados
 - Debe tener la imagen de perfil del usuario
 - Debe estar a la izquierda del login uno abajo del otro 6 usuarios. (3 pacientes, 2 especialistas, 1 admin)
* Registro de usuarios
 - Al ingresar a la página solo se deben ver 2 botones con la imagen que represente un paciente o especialista, según esa elección mostrará el formulario correspondiente.
 - Estas imagenes tienen que estar en botones rectangulares uno abajo del otro.
*/
