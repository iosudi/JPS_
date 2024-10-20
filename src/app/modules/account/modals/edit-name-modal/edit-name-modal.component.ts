import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-edit-name-modal',
  templateUrl: './edit-name-modal.component.html',
  styleUrls: ['./edit-name-modal.component.scss'],
})
export class EditNameModalComponent {
  activeModal = inject(NgbActiveModal);
  constructor(
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  userId: string | null = localStorage.getItem('userId');

  editUsername: FormGroup = this._FormBuilder.group({
    name: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    if (this.userId != null && this.editUsername.status != 'INVALID') {
      this.editUsername.patchValue({ id: Number(this.userId) });
      console.log(
        '🚀 ~ EditNameModalComponent ~ onSubmit ~ this.editUsername.value:',
        this.editUsername.value
      );

      this._EditUserInformationService
        .editUsername(this.editUsername.value)
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
