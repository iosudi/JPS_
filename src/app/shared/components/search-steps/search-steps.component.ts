import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  Cities,
  furnitureStates,
  residentTypes,
  unitTypes,
} from 'src/assets/data/search-steps';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-steps',
  templateUrl: './search-steps.component.html',
  styleUrls: ['./search-steps.component.scss'],
})
export class SearchStepsComponent {
  constructor(
    private _SearchService: SearchService,
    private router: Router,
    private renderer: Renderer2,
    private datePipe: DatePipe
  ) {}

  @ViewChild('datePicker') datePicker!: ElementRef;

  date: Date = new Date();
  endDate: string | null = '';
  startDate: string | null = '';

  currentStep = 0;
  showSteps = true;
  cities = Cities;
  unitTypes = unitTypes;
  residentTypes = residentTypes;
  furnitureStates = furnitureStates;
  bedsNumber: number = 0;
  countNumber: number = 0;
  bathroomNumber: number = 0;

  selectedCity!: number | null;
  selectedCityName!: string;
  selectedUnit: string = '';
  selectedResidentType: string = '';
  selectedFurnitureState!: number | null;
  selectedFurnitureStateName!: string;

  shouldNavigateModal: boolean = false;

  value: string = 'شهري';
  results: any[] = [];
  isLoading: boolean = false;

  bookingDurationExpanded: boolean = false;
  unitTypeSelectionExpanded: boolean = true;
  furnitureStatesExpanded: boolean = true;
  residentSelectionExpanded: boolean = true;
  roomsNumberStatesExpanded: boolean = true;

  stateOptions: any[] = [
    { label: 'يومي', value: 'يومي' },
    { label: 'شهري', value: 'شهري' },
  ];

  ngOnInit() {
    this._SearchService.showSearchSteps.subscribe((show) => {
      this.showSteps = show;
      this.currentStep = 1;

      if (show) {
        this.renderer.addClass(document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
      }
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showSteps = false;
        this._SearchService.showSearchSteps.next(false);
      }
    });

    this.startDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  onDateChange(updatedDate: Date) {
    this.startDate = this.datePipe.transform(updatedDate, 'yyyy-MM-dd');
    this.reserveDate();
  }

  onDateSelected(formattedDate: string) {
    this.endDate = formattedDate;
    this.reserveDate();
  }

  selectCity(cityId: number, cityName: string) {
    this._SearchService.setCity(cityId);
    this.selectedCity = cityId;
    this.selectedCityName = cityName;
  }

  reserveDate() {
    this._SearchService.setDate(this.startDate, this.endDate);
  }

  selectUnitType(type: string) {
    this._SearchService.setUnitType(type);
    this.selectedUnit = type;
  }

  selectFurnitureState(state: number, stateName: string) {
    this._SearchService.setFurnitureState(state);
    this.selectedFurnitureState = state;
    this.selectedFurnitureStateName = stateName;
  }

  selectResidentType(type: string) {
    this._SearchService.setResidentType(type);
    this.selectedResidentType = type;
  }

  addRoomNumber(type: string) {
    if (type == 'count') {
      this.countNumber++;
    } else if (type == 'beds') {
      this.bedsNumber++;
    } else if (type == 'bathrooms') {
      this.bathroomNumber++;
    }
  }

  removeRoomNumber(type: string) {
    if (type == 'count' && this.countNumber != 0) {
      this.countNumber--;
    } else if (type == 'beds' && this.bedsNumber != 0) {
      this.bedsNumber--;
    } else if (type == 'bathrooms' && this.bathroomNumber != 0) {
      this.bathroomNumber--;
    }
  }

  triggerDatePicker(): void {
    this.datePicker.nativeElement.showPicker();
  }

  submitFilterOptions() {
    this.isLoading = true;
    this._SearchService.setRoomsSelection(
      this.countNumber,
      this.bedsNumber,
      this.bathroomNumber
    );

    let searchCriteria = this._SearchService.searchCriteria;

    this._SearchService.search(searchCriteria).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/search-results'], {
          queryParams: searchCriteria,
        });

        this.selectedCity = null;
        this.selectedUnit = '';
        this.selectedResidentType = '';
        this.selectedFurnitureState = null;
        this.countNumber = 0;
        this.bedsNumber = 0;
        this.bathroomNumber = 0;
      },
    });
  }

  closeSearchSteps() {
    if (this.currentStep === 1) {
      this.showSteps = false;
      this._SearchService.showSearchSteps.next(false);
    } else {
      this.currentStep--;
    }
  }

  expand(control: string): void {
    if (control === 'booking-duration') {
      this.bookingDurationExpanded = !this.bookingDurationExpanded;
    } else if (control === 'unit-selection') {
      this.unitTypeSelectionExpanded = !this.unitTypeSelectionExpanded;
    } else if (control === 'furniture-state-selection') {
      this.furnitureStatesExpanded = !this.furnitureStatesExpanded;
    } else if (control === 'resident-selection') {
      this.residentSelectionExpanded = !this.residentSelectionExpanded;
    } else if (control === 'rooms-number') {
      this.roomsNumberStatesExpanded = !this.roomsNumberStatesExpanded;
    }
  }

  skipStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
}
