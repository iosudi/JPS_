import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQS } from 'src/assets/data/about';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  expandedIndex: number | null = null;
  faqs: any[] = FAQS;

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
