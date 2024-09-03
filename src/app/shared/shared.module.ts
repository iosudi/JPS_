import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchStepsComponent } from './components/search-steps/search-steps.component';

@NgModule({
  declarations: [SearchBarComponent, SearchStepsComponent],
  imports: [CommonModule],
  exports: [SearchBarComponent, SearchStepsComponent],
})
export class SharedModule {}
