import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';
import { register } from 'swiper/element/bundle';
import { JpsInfoRoutingModule } from './jps-info-routing.module';
import { HostsListComponent } from './pages/hosts-list/hosts-list.component';
import { HowItWorkComponent } from './pages/how-it-work/how-it-work.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RatesComponent } from './pages/rates/rates.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
register();
@NgModule({
  declarations: [
    HostsListComponent,
    HowItWorkComponent,
    RatesComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    JpsInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    CoreModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JpsInfoModule {}
