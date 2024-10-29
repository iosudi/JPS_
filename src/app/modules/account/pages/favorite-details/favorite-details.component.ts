import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';

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
        this._UserService.getFavListProperties(id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.apartments = res.properties;
          },
        });
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
}
