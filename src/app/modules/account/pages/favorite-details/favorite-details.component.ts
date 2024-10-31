import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { UserService } from './../../../../shared/services/user.service';

@Component({
  selector: 'app-favorite-details',
  templateUrl: './favorite-details.component.html',
  styleUrls: ['./favorite-details.component.scss'],
})
export class FavoriteDetailsComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _UserService: UserService
  ) {}

  apartments: any[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  cities: any[] | undefined;
  selectedCity: any | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id: number = Number(params.get('id')) ?? null;
        if (id) {
          this._UserService.getFavListProperties(id).subscribe({
            next: (res: any) => {
              if (res.message === 'success') {
                this.apartments = res.properties;
              }
            },
          });
        } else {
          this.getDefaultFavApartments();
        }
      },
    });

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

  getDefaultFavApartments(): void {
    this._UserService.getFavorites().subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          this.apartments = res.properties;
        }
      },
    });
  }
}
