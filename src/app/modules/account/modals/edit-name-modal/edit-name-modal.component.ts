import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private _EditUserInformationService: EditUserInformationService,
    private toastr: ToastrService
  ) {}

  userId: string | null = localStorage.getItem('userId');

  editUsername: FormGroup = this._FormBuilder.group({
    name: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    if (this.userId != null && this.editUsername.status != 'INVALID') {
      this.editUsername.patchValue({ id: Number(this.userId) });

      this._EditUserInformationService
        .editUsername(this.editUsername.value)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.toastr.success('Name updated successfully');
              this._EditUserInformationService.name.next(
                this.editUsername.get('name')?.value
              );
              this.editUsername.reset();
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
