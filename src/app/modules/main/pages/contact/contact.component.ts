import { Component, OnInit } from '@angular/core';
import Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { InfoService } from 'src/app/shared/services/info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private _InfoService: InfoService
  ) {}

  expandedIndex: number | null = null;
  providerFaq: any[] = [];
  buyerFaq: any[] = [];
  activeFaq: string = 'buyer';

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

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  showFaq(faqName: string) {
    this.activeFaq = faqName;
  }
}
