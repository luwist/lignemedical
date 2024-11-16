import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { UserRepository } from "@app/repositories";

export class UserValidator {
    static checkIfEmailExists(userRepository: UserRepository): AsyncValidatorFn {
        return async (control: AbstractControl) => {
            const email = control.value;
            const users = await userRepository.checkEmail(email);

            return users ? null : { emailAvailable: true };
        }
    }
}