import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss'],
})
export class EditPasswordModalComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  userId: string | null = localStorage.getItem('userId');

  editPassword: FormGroup = this._FormBuilder.group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    if (this.userId != null && this.editPassword.status != 'INVALID') {
      this.editPassword.patchValue({ id: Number(this.userId) });
      console.log(
        '🚀 ~ EditNameModalComponent ~ onSubmit ~ this.editPassword.value:',
        this.editPassword.value
      );

      this._EditUserInformationService
        .editPassword(this.editPassword.value)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
