import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Optional,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private router: Router,
    private auth: AuthService,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  private modalService = inject(NgbModal);
  roles: any[] | undefined;
  selectedUserRole: string | undefined;

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  passwordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;

  errMsg!: string;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9\u0600-\u06FF ]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      account_type: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\s!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>?]+$'
          ),
        ],
      ],
      confirm_password: [''],
      termsAndConditions: [false, Validators.requiredTrue],
    },
    { validators: [this.checkPasswordMatch] } as FormControlOptions
  );

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });

    this.roles = [{ name: 'مالك' }, { name: 'ضيف' }];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  onSubmit(): void {
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

    if (this.registerForm.status === 'VALID') {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastr.success('تم تسجيل حساب في JPS بنجاح !');
            this.registerForm.reset();
            this.openLoginForm();
            this.errMsg = '';
          } else if (res.status === 'error') {
            if (res.message == 'Phone number already exists.')
              this.errMsg = 'رقم الهاتف موجود بالفعل';
            else if (res.message == 'E-mail already exists.')
              this.errMsg = 'الايميل موجود بالفعل';
          }
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
        error: (error) => {
          console.error(error);
          console.log(this.registerForm);
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

  checkPasswordMatch(group: FormGroup): void {
    let password = group.get('password');
    let confirmPassword = group.get('confirm_password');

    if (confirmPassword?.value == '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value != password?.value) {
      confirmPassword?.setErrors({ notMatch: true });
    }
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    } else if (passwordInput == 'confirm_password') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }

  openLoginForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/login']);
      this.activeModal.close();
    } else {
      this.modalService.open(LoginComponent, {
        centered: true,
        backdrop: 'static',
        scrollable: true,
      });
      this.activeModal.close();
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
