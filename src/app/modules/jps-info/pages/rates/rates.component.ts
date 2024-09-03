import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { review } from 'src/assets/data/JPS_INFO';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
export class RatesComponent implements OnInit {
  currentRate: number = 4.5;
  maxRate: number = 5;
  readonly: boolean = false;

  reviews: any[] = review;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  updateRating(newRate: number) {
    this.currentRate = newRate;
  }
}
