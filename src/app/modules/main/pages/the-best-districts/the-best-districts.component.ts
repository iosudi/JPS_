import { Component } from '@angular/core';
import { popularDistricts } from 'src/assets/data/apartments';

@Component({
  selector: 'app-the-best-districts',
  templateUrl: './the-best-districts.component.html',
  styleUrls: ['./the-best-districts.component.scss'],
})
export class TheBestDistrictsComponent {
  districts: any[] = popularDistricts;

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
