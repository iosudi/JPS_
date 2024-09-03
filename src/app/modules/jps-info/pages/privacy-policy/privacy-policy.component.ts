import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { privacyPolicy } from 'src/assets/data/JPS_INFO';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  policies: any[] = privacyPolicy;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
