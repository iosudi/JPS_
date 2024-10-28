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

  userName: string = '';

  reviews: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private _FormBuilder: FormBuilder,
    private _InfoService: InfoService,
    private toastr: ToastrService,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  sendFeedbackForm: FormGroup = this._FormBuilder.group({
    accuracy: ['', Validators.required],
    ease: ['', Validators.required],
    response_level: ['', Validators.required],
    feedback: ['', Validators.required],
    rating: ['', Validators.required],
  });

  ngOnInit() {
    this.getFeedbacks();

    this._EditUserInformationService.getUserData().subscribe({
      next: (res) => {
        this.userName = res.data.name;

        this.sendFeedbackForm.patchValue({
          name: this.userName,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
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
            this.toastr.success(res.success);

            this.getFeedbacks();
          }
        },
        error: (err) => {
          this.toastr.error('حدث خطأ في التقييم');
        },
      });
    }
  }
}
