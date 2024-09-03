import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { apartments } from 'src/assets/data/apartments';

@Component({
  selector: 'app-favorite-details',
  templateUrl: './favorite-details.component.html',
  styleUrls: ['./favorite-details.component.scss'],
})
export class FavoriteDetailsComponent {
  constructor(private spinner: NgxSpinnerService) {}

  apartments: Apartments[] = apartments;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  ngOnInit() {
    this.items = [
      { label: 'مختاراتك المفضلة', routerLink: '/your-favorites' },
      { label: 'شقق' },
    ];

    this.home = { label: 'الرئيسية', routerLink: '/home' };
    this.cities = [
      { name: 'الأغلى' },
      { name: 'الأرخص' },
      { name: 'الأسم' },
      { name: 'النجوم' },
    ];

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
