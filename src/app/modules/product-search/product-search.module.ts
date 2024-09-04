import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { CoreModule } from 'src/app/core/core.module';
import { AdvancedSearchFilterModalComponent } from './components/advanced-search-filter-modal/advanced-search-filter-modal.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ProductSearchRoutingModule } from './product-search-routing.module';

@NgModule({
  declarations: [
    SearchResultComponent,
    AdvancedSearchFilterModalComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductSearchRoutingModule,
    DropdownModule,
    CoreModule,
    FormsModule,
    NgxPaginationModule,
    SliderModule,
    FloatLabelModule,
    InputTextModule,
    ProgressBarModule,
    InputSwitchModule,
  ],
})
export class ProductSearchModule {}
