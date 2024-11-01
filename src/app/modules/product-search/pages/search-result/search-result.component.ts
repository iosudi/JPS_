import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/shared/components/services/search.service';
import { AddToFavComponent } from '../../components/add-to-fav/add-to-fav.component';
import { AdvancedSearchFilterModalComponent } from '../../components/advanced-search-filter-modal/advanced-search-filter-modal.component';
import { ShareModalComponent } from '../../components/share-modal/share-modal.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  constructor(
    private router: Router,
    private _SearchService: SearchService,
    private route: ActivatedRoute
  ) {}

  currentPage = 1;
  apartments: any[] = [];
  private modalService = inject(NgbModal);

  /*Apartment Type Selection*/
  apartmentsType: any[] | undefined;
  selectedApartmentType: any | undefined;

  /*Rooms  Selection*/
  rooms: any[] | undefined;
  selectedRooms: any | undefined;

  /*Rooms Number Selection*/
  roomsNumber!: any[];
  selectedRoomsNumber: any;

  /* Sorting Selection */
  sorting: any[] | undefined;
  selectedSorting: any | undefined;
  searchCriteria: any = {};

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchCriteria = { ...params };
      this._SearchService.search(this.searchCriteria).subscribe({
        next: (res) => {
          if (res.properties.length > 0) {
            this.apartments = res.properties;
          }
        },
      });
      console.log('Search Criteria:', this.searchCriteria);
    });

    this.apartmentsType = [
      { name: 'شقة' },
      { name: 'فلة' },
      { name: 'استوديو' },
      { name: 'روف' },
    ];
    this.selectedApartmentType = this.apartmentsType[0];

    this.rooms = [
      { name: 'غرف و حمامات' },
      { name: 'غرف ' },
      { name: ' حمامات' },
      { name: 'غرف و مطبح' },
    ];
    this.selectedRooms = this.rooms[0];

    this.roomsNumber = [
      { bathrooms: '1', bedrooms: '2', rooms: '4' },
      { bathrooms: '2', bedrooms: '4', rooms: '8' },
      { bathrooms: '2', bedrooms: '4', rooms: '3' },
      { bathrooms: '1', bedrooms: '3', rooms: '3' },
    ];
    this.selectedRoomsNumber = this.roomsNumber[0];

    this.sorting = [
      { name: 'الأعلى سعر' },
      { name: 'الأقل سعر' },
      { name: 'الأكثر مراجعات' },
      { name: 'الأقل مراجعات' },
    ];
    this.selectedSorting = this.sorting[0];
  }

  isHorizontal: boolean = false;

  setViewMode(mode: string) {
    this.isHorizontal = mode === 'horizontal';
  }

  openAdvancedSearchFilterModal() {
    const modalRef = this.modalService.open(
      AdvancedSearchFilterModalComponent,
      {
        centered: true,
        scrollable: true,
      }
    );
  }

  openShareModal(event: MouseEvent): void {
    event.stopPropagation();
    this.modalService.open(ShareModalComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }

  openAddToFav(event: MouseEvent): void {
    event.stopPropagation();
    this.modalService.open(AddToFavComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }

  navigateToHost(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/host']);
  }

  productDetails(id: number): void {
    this.router.navigate(['/product-details', id]);
  }

  pageChanged(event: any): void {}
}
