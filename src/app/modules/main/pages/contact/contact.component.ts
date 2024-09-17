import { Component, OnInit } from '@angular/core';
import Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { FAQS } from 'src/assets/data/about';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  expandedIndex: number | null = null;
  faqs: any[] = FAQS;

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    Aos.init({
      duration: 1000,
      once: true,
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
