import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckEmailPopupComponent } from '../check-email-popup/check-email-popup.component';

@Component({
  selector: 'app-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.scss'],
})
export class OtpCodeComponent {
  private modalService = inject(NgbModal);

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  otpCodeForm: FormGroup = this._FormBuilder.group({
    otp: [''],
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  onSubmit(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/check-email']);
      this.activeModal.close();
    } else {
      this.modalService.open(CheckEmailPopupComponent, {
        centered: true,
      });
      this.activeModal.close();
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
