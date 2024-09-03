import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { CoreModule } from 'src/app/core/core.module';
import { AdvancedSearchFilterModalComponent } from './components/advanced-search-filter-modal/advanced-search-filter-modal.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ProductSearchRoutingModule } from './product-search-routing.module';

@NgModule({
  declarations: [SearchResultComponent, AdvancedSearchFilterModalComponent],
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
  ],
})
export class ProductSearchModule {}
