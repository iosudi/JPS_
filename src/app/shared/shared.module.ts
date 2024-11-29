import {
  CommonModule,
  DatePipe,
  JsonPipe,
  registerLocaleData,
} from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DaySearchCircularSliderComponent } from './components/day-search-circular-slider/day-search-circular-slider.component';
import { HostFeedbackModalComponent } from './components/host-feedback-modal/host-feedback-modal.component';
import { JPSRatingModalComponent } from './components/jps-rating-modal/jps-rating-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchCircularSliderComponent } from './components/search-circular-slider/search-circular-slider.component';
import { SearchStepsComponent } from './components/search-steps/search-steps.component';
import { ToastrComponent } from './components/toastr/toastr.component';

registerLocaleData(localeAr);

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchStepsComponent,
    SearchCircularSliderComponent,
    DaySearchCircularSliderComponent,
    JPSRatingModalComponent,
    HostFeedbackModalComponent,
    ToastrComponent,
    // CalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    SelectButtonModule,
    FormsModule,
    NgbRatingModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    JsonPipe,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }, DatePipe],
  exports: [SearchBarComponent, SearchStepsComponent, ToastrComponent],
})
export class SharedModule {}
