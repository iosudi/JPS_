import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  listsWithProperties: any[] = [];
  defaultApartmentsCount: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private _UserService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [{ label: 'مختاراتك المفضلة' }];

    this.home = { label: 'الرئيسية', routerLink: '/home' };

    this.spinner.show();
    this.getFavLists();
    this.getDefaultFavApartments();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getFavLists(): void {
    this._UserService.getFavList().subscribe({
      next: (res: any) => {
        this.listsWithProperties = res.playlists.map((list: any) => ({
          ...list,
          properties: [],
        }));

        this.listsWithProperties.forEach((list) => {
          this.getListsProperties(list.id);
        });
        this._UserService.favLists.next(this.listsWithProperties);
      },
    });
  }

  getDefaultFavApartments(): void {
    this._UserService.getFavorites().subscribe({
      next: (res: any) => {
        this.defaultApartmentsCount = res.properties.length;
      },
    });
  }

  getListsProperties(listId: number): void {
    this._UserService.getFavListProperties(listId).subscribe({
      next: (res: any) => {
        const list = this.listsWithProperties.find((l) => l.id === listId);

        if (list) {
          list.properties = res.properties.map((property: any) => ({
            ...property,
            image:
              property.images && property.images.length > 0
                ? property.images[0]
                : null,
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
      },
    });
  }

  openFavListDetails(listId: number): void {
    this.router.navigate(['/your-favorites/details', listId]);
  }
}
