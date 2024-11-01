import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ShareModalComponent } from 'src/app/modules/product-search/components/share-modal/share-modal.component';
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
    private _UserService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private modalService = inject(NgbModal);

  apartments: any[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  listName: string = '';

  listId: number | null = null;

  cities: any[] | undefined;
  selectedCity: any | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.listId = Number(params.get('id')) ?? null;
        this.spinner.show();

        if (this.listId) {
          this.getFavListApartments(this.listId);
          this.spinner.hide();
        } else {
          this.getDefaultFavApartments();
          this.spinner.hide();
        }
      },
    });

    this.items = [
      { label: 'مختاراتك المفضلة', routerLink: '/your-favorites' },
      { label: 'القائمة' },
    ];

    this.home = { label: 'الرئيسية', routerLink: '/home' };
    this.cities = [
      { name: 'الأغلى' },
      { name: 'الأرخص' },
      { name: 'الأسم' },
      { name: 'النجوم' },
    ];
  }

  getFavListApartments(listId: number | null): void {
    this._UserService.getFavListProperties(listId).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          this.apartments = res.properties;
          this.listName = res.list_name;
        }
      },
    });
  }

  getDefaultFavApartments(): void {
    this._UserService.getFavorites().subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          this.apartments = res.properties;
          this.listName = 'الافتراضيه';
        }
      },
    });
  }

  removeFavList(): void {
    this._UserService.removeFavoriteList(this.listId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.toastr.success('تم حذف القائمة');
          this.router.navigate(['/your-favorites']);
        }
      },
      error: (err) => {
        console.error('Error removing favorite list:', err);
      },
    });
  }

  removeFromFavList(apartmentId: string, event: Event): void {
    event.stopPropagation();

    this._UserService
      .removeFromFavoriteList(apartmentId, this.listId)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'Property removed from playlist successfully') {
            this.getFavListApartments(this.listId);
            this.toastr.success('تم حذف الوحدة من القائمة');
          }
        },
        error: (err) => {
          console.error('Error removing apartment from favorite list:', err);
        },
      });
  }

  removeFromDefaultList(apartmentId: string, event: Event): void {
    event.stopPropagation();

    this._UserService.removeFromFavorites(apartmentId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.getDefaultFavApartments();
          this.toastr.success('تم حذف الوحدة من القائمة');
        }
      },
      error: (err) => {
        console.error('Error removing apartment from favorite list:', err);
      },
    });
  }

  openShareModal(event: MouseEvent): void {
    event.stopPropagation();
    this.modalService.open(ShareModalComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }

  productDetails(id: number): void {
    this.router.navigate(['/product-details', id]);
  }
}
