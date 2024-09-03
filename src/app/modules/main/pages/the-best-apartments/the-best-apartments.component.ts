import { Component } from '@angular/core';
import {
  popularApartments,
  popularDistricts,
} from 'src/assets/data/apartments';

@Component({
  selector: 'app-the-best-apartments',
  templateUrl: './the-best-apartments.component.html',
  styleUrls: ['./the-best-apartments.component.scss'],
})
export class TheBestApartmentsComponent {
  districts: any[] = popularDistricts;
  apartments: any[] = popularApartments;

  breakpoints = {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 10,
    },
    776: {
      slidesPerView: 2.5,
      spaceBetween: 15,
    },
  };
}
