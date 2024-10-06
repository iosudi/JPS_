import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CircularSliderComponent } from './components/circular-slider/circular-slider.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchStepsComponent } from './components/search-steps/search-steps.component';
import { PropertiesCitiesService } from './services/properties-cities.service';
@NgModule({
  declarations: [
    SearchBarComponent,
    SearchStepsComponent,
    CircularSliderComponent,
  ],
  imports: [CommonModule, CalendarModule, SelectButtonModule, FormsModule],
  providers: [PropertiesCitiesService],
  exports: [SearchBarComponent, SearchStepsComponent, CircularSliderComponent],
})
export class SharedModule {}
