import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-host-feedback-modal',
  templateUrl: './host-feedback-modal.component.html',
  styleUrls: ['./host-feedback-modal.component.scss'],
})
export class HostFeedbackModalComponent {
  activeModal = inject(NgbActiveModal);
  currentRate: number = 0;
  maxRate: number = 5;
  readonly: boolean = false;
  maxChars = 500;

  constructor(
    private router: Router,
    private _InfoService: InfoService,
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  feedback: FormGroup = this._FormBuilder.group({
    accuracy: ['', Validators.required],
    ease: ['', Validators.required],
    response_level: ['', Validators.required],
    feedback: ['', [Validators.required, Validators.maxLength(this.maxChars)]],
    rating: ['', Validators.required],
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

  updateRating(newRate: number) {
    this.currentRate = newRate;
  }

  onInput(event: Event) {
    const input: any = event.target as HTMLTextAreaElement;
    if (input.value.length > this.maxChars) {
      input.value = input.value.slice(0, this.maxChars);
      this.feedback?.setValue(input.value);
    }
  }

  onSubmit(): void {
    if (this.feedback.status === 'VALID') {
      this._InfoService.sendFeedbacks(this.feedback.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.feedback.reset();
            this.toastr.success('تمت اضافة تعليقك بنجاح');
          }
        },
        error: (err) => {
          if (err.error.error == "Field 'user_id' is required") {
            this.toastr.error('يجب تسجيل الدخول اولا');
          } else {
            this.toastr.error('حدث خطأ ما, برجاء المحاولة لاحقا');
          }
          console.log(err);
        },
      });
    }
  }

  closeRatingModal() {
    this.activeModal.close();
  }
}
