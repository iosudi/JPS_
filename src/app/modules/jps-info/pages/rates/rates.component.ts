import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';
import { InfoService } from 'src/app/shared/services/info.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit {
  currentRate: number = 0;
  maxRate: number = 5;
  reviews: any[] = [];
  maxChars = 500;

  constructor(
    private spinner: NgxSpinnerService,
    private _FormBuilder: FormBuilder,
    private _InfoService: InfoService,
    private toastr: ToastrService,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  sendFeedbackForm: FormGroup = this._FormBuilder.group({
    rating: ['', Validators.required],
    ease: ['', Validators.required],
    accuracy: ['', Validators.required],
    service: ['', Validators.required],
    security: ['', Validators.required],
    speed: ['', Validators.required],
    feedback: ['', [Validators.required, Validators.maxLength(this.maxChars)]],
  });

  ngOnInit() {
    this.getFeedbacks();
  }

  onInput(event: Event) {
    const input: any = event.target as HTMLTextAreaElement;
    if (input.value.length > this.maxChars) {
      input.value = input.value.slice(0, this.maxChars);
      this.sendFeedbackForm?.setValue(input.value);
    }
  }

  updateRating(newRate: number): void {
    this.currentRate = newRate;
  }

  getFeedbacks(): void {
    this.spinner.show();

    this._InfoService.getFeedbacks().subscribe({
      next: (res) => {
        this.reviews = res.feedbacks;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(): void {
    if (this.sendFeedbackForm.status === 'VALID') {
      this._InfoService.sendFeedbacks(this.sendFeedbackForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.sendFeedbackForm.reset();
            this.toastr.success('تمت اضافة تعليقك بنجاح');

            this.getFeedbacks();
          }
        },
        error: (err) => {
          if (err.error.error == "Field 'user_id' is required") {
            this.toastr.error('يجب تسجيل الدخول اولا');
          } else {
            this.toastr.error('حدث خطأ ما, برجاء المحاولة لاحقا');
          }
        },
      });
    }
  }
}
