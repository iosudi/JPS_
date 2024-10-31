import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-edit-password-modal',
  templateUrl: './edit-password-modal.component.html',
  styleUrls: ['./edit-password-modal.component.scss'],
})
export class EditPasswordModalComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}
  @ViewChild('submitBtn') submitBtn!: ElementRef;

  activeModal = inject(NgbActiveModal);

  oldPasswordVisibility: boolean = false;
  newPasswordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;
  isLoading: boolean = false;
  errMsg!: string;
  userId: string | null = localStorage.getItem('userId');

  editPassword: FormGroup = this._FormBuilder.group({
    old_password: ['', Validators.required],
    new_password: ['', Validators.required],
    id: [null],
  });

  onSubmit(): void {
    this.isLoading = true;
    if (this.userId != null && this.editPassword.status != 'INVALID') {
      this.editPassword.patchValue({ id: Number(this.userId) });

      this._EditUserInformationService
        .editPassword(this.editPassword.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.enabledBtn();
            if (res.success) {
              this.toastr.success('Password changed successfully!');
              this.editPassword.reset();
              this.activeModal.close();
              this.errMsg = '.';
            } else if (res.error) {
              this.errMsg = 'كملة المرور الحاليه غير صحيحة.';
              this.editPassword.reset();
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.enabledBtn();
            console.error(error);
          },
        });
    }
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'old_password') {
      this.oldPasswordVisibility = !this.oldPasswordVisibility;
    } else if (passwordInput == 'new_password') {
      this.newPasswordVisibility = !this.newPasswordVisibility;
    } else if (passwordInput == 'confirm_password') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }

  disabledBtn(): void {
    this.renderer.setStyle(
      this.submitBtn.nativeElement,
      'pointer-events',
      'none'
    );
    this.renderer.setAttribute(
      this.submitBtn.nativeElement,
      'disabled',
      'true'
    );
  }

  enabledBtn(): void {
    this.renderer.setStyle(
      this.submitBtn.nativeElement,
      'pointer-events',
      'auto'
    );
    this.renderer.removeAttribute(this.submitBtn.nativeElement, 'disabled');
  }
}
