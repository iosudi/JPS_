import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { searchResultApartments } from 'src/assets/data/apartments';
import { AdvancedSearchFilterModalComponent } from '../../components/advanced-search-filter-modal/advanced-search-filter-modal.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  currentPage = 1;

  apartments: Apartments[] = searchResultApartments;
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
  ngOnInit() {
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

  isHorizontal: boolean = true;

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

  pageChanged(event: any): void {}
}
