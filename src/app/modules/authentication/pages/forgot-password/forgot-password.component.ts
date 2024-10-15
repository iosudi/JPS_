import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OtpCodeComponent } from '../otp-code/otp-code.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private modalService = inject(NgbModal);

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService
  ) {}

  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

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

  onSubmit(): void {
    if (this.forgotPasswordForm.status === 'VALID') {
      console.log(
        "🚀 ~ ForgotPasswordComponent ~ onSubmit ~ this.forgotPasswordForm.status === 'VALID':",
        this.forgotPasswordForm
      );
      this.auth.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          console.log(
            '🚀 ~ ForgotPasswordComponent ~ this.auth.forgotPassword ~ res:',
            res
          );
        },
        error: (error) => {
          console.error('Error forgotting password:', error);
        },
      });
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
