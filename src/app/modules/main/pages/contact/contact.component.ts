import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private _JPSServiceService: JPSServiceService
  ) {}

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
      console.log(
        '🚀 ~ ContactComponent ~ onSubmit ~ this.contactForm:',
        this.contactForm
      );
      this._JPSServiceService
        .sendContactForm(this.contactForm.value)
        .subscribe({
          next: () => {
            this.contactForm.reset();
            alert('Your message has been sent successfully.');
          },
          error: (error) => {
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

  showFaq(faqName: string): void {
    this.activeFaq = faqName;
  }
}
