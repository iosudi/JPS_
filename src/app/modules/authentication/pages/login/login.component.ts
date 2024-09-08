import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisibility: boolean = false;
  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  loginForm: FormGroup = this._FormBuilder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      this.activeModal.close();
    }
  }

  openForgotPasswordForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/forgot-password']);
      this.activeModal.close();
    } else {
      this.modalService.open(ForgotPasswordComponent, {
        centered: true,
        backdrop: 'static',
      });
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

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
