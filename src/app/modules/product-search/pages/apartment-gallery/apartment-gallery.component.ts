import { Component } from '@angular/core';
import { categories, rooms } from 'src/assets/data/gallery';

@Component({
  selector: 'app-apartment-gallery',
  templateUrl: './apartment-gallery.component.html',
  styleUrls: ['./apartment-gallery.component.scss'],
})
export class ApartmentGalleryComponent {
  Breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    750: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    990: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1630: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  rooms: any = rooms;

  pageItems: any[] = categories;
}
