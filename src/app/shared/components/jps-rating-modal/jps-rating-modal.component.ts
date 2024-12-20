import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-jps-rating-modal',
  templateUrl: './jps-rating-modal.component.html',
  styleUrls: ['./jps-rating-modal.component.scss'],
})
export class JPSRatingModalComponent {
  activeModal = inject(NgbActiveModal);
  currentRate: number = 0;
  maxRate: number = 5;
  readonly: boolean = false;
  maxChars = 500;

  @ViewChild('submitBtn') submitBtn!: ElementRef;
  constructor(
    private router: Router,
    private _InfoService: InfoService,
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}

  feedback: FormGroup = this._FormBuilder.group({
    rating: ['', Validators.required],
    ease: ['', Validators.required],
    accuracy: ['', Validators.required],
    service: ['', Validators.required],
    security: ['', Validators.required],
    speed: ['', Validators.required],
    feedback: ['', [Validators.required, Validators.maxLength(this.maxChars)]],
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
      console.log(this.feedback.value);
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
      this._InfoService.sendFeedbacks(this.feedback.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.feedback.reset();
            this.toastr.success('تمت اضافة تعليقك بنجاح');
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
        error: (err) => {
          this.renderer.setStyle(
            this.submitBtn.nativeElement,
            'pointer-events',
            'auto'
          );
          this.renderer.removeAttribute(
            this.submitBtn.nativeElement,
            'disabled'
          );

          if (err.error.error == "Field 'user_id' is required") {
            this.toastr.error('يجب تسجيل الدخول اولا');
          } else {
            this.toastr.error('حدث خطأ ما, برجاء المحاولة لاحقا');
          }
        },
      });
    }
  }

  closeRatingModal() {
    this.activeModal.close();
  }
}
