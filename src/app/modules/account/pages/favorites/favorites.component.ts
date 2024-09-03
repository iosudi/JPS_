import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { lists } from 'src/assets/data/fav';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  lists: any[] = lists;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.items = [{ label: 'مختاراتك المفضلة' }];

    this.home = { label: 'الرئيسية', routerLink: '/home' };

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
