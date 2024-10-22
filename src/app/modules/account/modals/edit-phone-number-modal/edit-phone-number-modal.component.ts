import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-edit-phone-number-modal',
  templateUrl: './edit-phone-number-modal.component.html',
  styleUrls: ['./edit-phone-number-modal.component.scss'],
})
export class EditPhoneNumberModalComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService,
    private toastr: ToastrService
  ) {}

  activeModal = inject(NgbActiveModal);

  userId: string | null = localStorage.getItem('userId');

  editPhoneNumber: FormGroup = this._FormBuilder.group({
    phone: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    if (this.userId != null && this.editPhoneNumber.status != 'INVALID') {
      this.editPhoneNumber.patchValue({ id: Number(this.userId) });

      this._EditUserInformationService
        .editPhoneNumber(this.editPhoneNumber.value)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this._EditUserInformationService.phone.next(
                this.editPhoneNumber.get('phone')?.value
              );
              this.toastr.success('Phone number updated successfully!');
              this.editPhoneNumber.reset();
              this.activeModal.close();
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
