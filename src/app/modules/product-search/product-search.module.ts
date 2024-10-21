import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DeferModule } from 'primeng/defer';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { CoreModule } from 'src/app/core/core.module';
import { register } from 'swiper/element/bundle';
import { AddDateRangeComponent } from './components/add-date-range/add-date-range.component';
import { AddToFavComponent } from './components/add-to-fav/add-to-fav.component';
import { AdvancedSearchFilterModalComponent } from './components/advanced-search-filter-modal/advanced-search-filter-modal.component';
import { ApartmentFeaturesComponent } from './components/apartment-features/apartment-features.component';
import { CircularSliderComponent } from './components/circular-slider/circular-slider.component';
import { HotelFeaturesComponent } from './components/hotel-features/hotel-features.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ShareModalComponent } from './components/share-modal/share-modal.component';
import { SucessComponent } from './components/sucess/sucess.component';
import { ApartmentGalleryComponent } from './pages/apartment-gallery/apartment-gallery.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { HotelSearchResultComponent } from './pages/hotel-search-result/hotel-search-result.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { ProductSearchRoutingModule } from './product-search-routing.module';
register();

@NgModule({
  declarations: [
    SearchResultComponent,
    AdvancedSearchFilterModalComponent,
    ProductDetailsComponent,
    ApartmentGalleryComponent,
    ApartmentFeaturesComponent,
    RatingModalComponent,
    ShareModalComponent,
    AddToFavComponent,
    AddDateRangeComponent,
    ReserveComponent,
    SucessComponent,
    HotelSearchResultComponent,
    HotelDetailsComponent,
    CircularSliderComponent,
    HotelFeaturesComponent,
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
    NgbRatingModule,
    InputSwitchModule,
    RadioButtonModule,
    SelectButtonModule,
    CalendarModule,
    DeferModule,
    CalendarModule,
    CheckboxModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ShareModalComponent],
})
export class ProductSearchModule {}
