import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQS } from 'src/assets/data/about';
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
  faqs: any[] = FAQS;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
