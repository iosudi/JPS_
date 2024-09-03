import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss'],
})
export class CreateNewPasswordComponent {
  constructor(private _FormBuilder: FormBuilder) {}

  passwordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;

  resetPasswordForm: FormGroup = this._FormBuilder.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\s!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>?]+$'
          ),
        ],
      ],
      rePassword: [''],
    },
    { validators: [this.checkPasswordMatch] } as FormControlOptions
  );

  checkPasswordMatch(group: FormGroup): void {
    let password = group.get('password');
    let confirmPassword = group.get('rePassword');

    if (confirmPassword?.value == '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value != password?.value) {
      confirmPassword?.setErrors({ notMatch: true });
    }
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    } else if (passwordInput == 'rePassword') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }
}
