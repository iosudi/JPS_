import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-edit-phone-number-modal',
  templateUrl: './edit-phone-number-modal.component.html',
  styleUrls: ['./edit-phone-number-modal.component.scss'],
})
export class EditPhoneNumberModalComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  userId: string | null = localStorage.getItem('userId');

  editPhoneNumber: FormGroup = this._FormBuilder.group({
    phone: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    if (this.userId != null && this.editPhoneNumber.status != 'INVALID') {
      this.editPhoneNumber.patchValue({ id: Number(this.userId) });
      console.log(
        '🚀 ~ EditNameModalComponent ~ onSubmit ~ this.editPhoneNumber.value:',
        this.editPhoneNumber.value
      );

      this._EditUserInformationService
        .editPhoneNumber(this.editPhoneNumber.value)
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
