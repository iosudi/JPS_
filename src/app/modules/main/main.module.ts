import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeferModule } from 'primeng/defer';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { register } from 'swiper/element/bundle';
import { MainRoutingModule } from './main-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { TheBestApartmentsComponent } from './pages/the-best-apartments/the-best-apartments.component';
import { TheBestDistrictsComponent } from './pages/the-best-districts/the-best-districts.component';
register();

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ServicesComponent,
    TheBestApartmentsComponent,
    TheBestDistrictsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    CoreModule,
    CarouselModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
    DeferModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
