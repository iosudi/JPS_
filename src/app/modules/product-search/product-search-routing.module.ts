import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { widthGuard } from '../authentication/guard/width.guard';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ApartmentGalleryComponent } from './pages/apartment-gallery/apartment-gallery.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';
import { HotelSearchResultComponent } from './pages/hotel-search-result/hotel-search-result.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search-results',
    component: SearchResultComponent,
    title: 'Search Results',
  },
  {
    path: 'hotel-results',
    component: HotelSearchResultComponent,
    title: 'Hotel Search Results',
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'hotel-details',
    component: HotelDetailsComponent,
    title: 'Hotel Details',
  },
  {
    path: 'apartment-gallery',
    component: ApartmentGalleryComponent,
    title: 'Apartment Gallery',
  },
  {
    path: 'reserve',
    component: ReserveComponent,
    title: 'احجز شقتك الان',
    canActivate: [widthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSearchRoutingModule {}
