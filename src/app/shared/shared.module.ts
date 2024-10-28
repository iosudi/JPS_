import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DaySearchCircularSliderComponent } from './components/day-search-circular-slider/day-search-circular-slider.component';
import { JPSRatingModalComponent } from './components/jps-rating-modal/jps-rating-modal.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchCircularSliderComponent } from './components/search-circular-slider/search-circular-slider.component';
import { SearchStepsComponent } from './components/search-steps/search-steps.component';
@NgModule({
  declarations: [
    SearchBarComponent,
    SearchStepsComponent,
    SearchCircularSliderComponent,
    DaySearchCircularSliderComponent,
    JPSRatingModalComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    SelectButtonModule,
    FormsModule,
    NgbRatingModule,
    ReactiveFormsModule,
  ],
  exports: [SearchBarComponent, SearchStepsComponent],
})
export class SharedModule {}
