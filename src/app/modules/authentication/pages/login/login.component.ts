import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Optional,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,

    private router: Router,
    private auth: AuthService,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}
  private modalService = inject(NgbModal);

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  passwordVisibility: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
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

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.renderer.setStyle(
            this.submitBtn.nativeElement,
            'pointer-events',
            'auto'
          );
          this.renderer.removeAttribute(
            this.submitBtn.nativeElement,
            'disabled'
          );

          if (res.status === 'error') {
            this.errorMessage = 'خطأ في الايميل او كلمة السر';
          } else {
            this.errorMessage = '';
            localStorage.setItem('userId', `${res.user.id}`);
            window.location.reload();

            this.toastr.success('تم تسجيل الدخول للحساب بنجاح!');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.renderer.setStyle(
            this.submitBtn.nativeElement,
            'pointer-events',
            'auto'
          );
          this.renderer.removeAttribute(
            this.submitBtn.nativeElement,
            'disabled'
          );
        },
      });
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
