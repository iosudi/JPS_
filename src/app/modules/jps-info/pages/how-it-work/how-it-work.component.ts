import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InfoService } from 'src/app/shared/services/info.service';
import { helpService, howItWorkSteps } from 'src/assets/data/JPS_INFO';

@Component({
  selector: 'app-how-it-work',
  templateUrl: './how-it-work.component.html',
  styleUrls: ['./how-it-work.component.scss'],
})
export class HowItWorkComponent {
  howItWorkSteps: any[] = howItWorkSteps;
  helpService: any[] = helpService;

  expandedIndex: number | null = null;
  providerFaq: any[] = [];
  buyerFaq: any[] = [];
  activeFaq: string = 'buyer';

  constructor(
    private spinner: NgxSpinnerService,
    private _InfoService: InfoService
  ) {}

  ngOnInit() {
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

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  showFaq(faqName: string): void {
    this.activeFaq = faqName;
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
