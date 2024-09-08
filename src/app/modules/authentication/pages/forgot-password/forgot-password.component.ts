import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpCodeComponent } from '../otp-code/otp-code.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private modalService = inject(NgbModal);

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required]],
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  openSignupForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/register']);
      this.activeModal.close();
    } else {
      this.modalService.open(RegisterComponent, {
        centered: true,
        backdrop: 'static',
        scrollable: true,
      });
      this.activeModal.close();
    }
  }

  openOtpCodeForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/OTP']);
      this.activeModal.close();
    } else {
      this.modalService.open(OtpCodeComponent, {
        centered: true,
        backdrop: 'static',
      });
      this.activeModal.close();
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
