import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchCircularSliderComponent } from './components/search-circular-slider/search-circular-slider.component';
import { SearchStepsComponent } from './components/search-steps/search-steps.component';
@NgModule({
  declarations: [
    SearchBarComponent,
    SearchStepsComponent,
    SearchCircularSliderComponent,
  ],
  imports: [CommonModule, CalendarModule, SelectButtonModule, FormsModule],
  exports: [SearchBarComponent, SearchStepsComponent],
})
export class SharedModule {}
