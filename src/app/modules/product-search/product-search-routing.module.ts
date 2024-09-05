import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentGalleryComponent } from './pages/apartment-gallery/apartment-gallery.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchResultComponent } from './pages/search-result/search-result.component';

const routes: Routes = [
  {
    path: 'search-results',
    component: SearchResultComponent,
    title: 'Search Results',
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'apartment-gallery',
    component: ApartmentGalleryComponent,
    title: 'Apartment Gallery',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSearchRoutingModule {}
