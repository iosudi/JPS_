import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InfoService } from 'src/app/shared/services/info.service';
import { JPSServiceService } from 'src/app/shared/services/jps-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private _InfoService: InfoService,
    private _FormBuilder: FormBuilder,
    private _JPSServiceService: JPSServiceService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  expandedIndex: number | null = null;
  providerFaq: any[] = [];
  buyerFaq: any[] = [];
  activeFaq: string = 'buyer';

  contactForm: FormGroup = this._FormBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    type: ['', Validators.required],
    message: ['', Validators.required],
  });

  ngOnInit() {
    this.spinner.show();

    this._InfoService.getBuyersFaqs().subscribe({
      next: (res) => {
        this.buyerFaq = res.faqs;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });

    this._InfoService.getProvidersFaqs().subscribe({
      next: (res) => {
        this.providerFaq = res.faqs;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });

    Aos.init({
      duration: 1000,
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  onSubmit(): void {
    if (this.contactForm.status === 'VALID') {
      this.disabledBtn();
      this._JPSServiceService
        .sendContactForm(this.contactForm.value)
        .subscribe({
          next: () => {
            this.enabledBtn();

            this.contactForm.reset();
            this.toastr.success('Your message has been sent successfully.');
          },
          error: (error) => {
            this.enabledBtn();
            this.toastr.error('Something wrong happened, Try again later');
            console.error('Error:', error);
          },
        });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  disabledBtn(): void {
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
  }

  enabledBtn(): void {
    this.renderer.setStyle(
      this.submitBtn.nativeElement,
      'pointer-events',
      'auto'
    );
    this.renderer.removeAttribute(this.submitBtn.nativeElement, 'disabled');
  }

  showFaq(faqName: string): void {
    this.activeFaq = faqName;
  }
}
