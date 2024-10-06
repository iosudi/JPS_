import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
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
    private renderer: Renderer2
  ) {}

  @ViewChild('datePicker') datePicker!: ElementRef;

  currentStep = 0;
  showSteps = true;
  cities = [];
  unitTypes = unitTypes;
  residentTypes = residentTypes;
  furnitureStates = furnitureStates;
  shouldNavigateModal: boolean = false;
  value: string = 'شهري';
  date: Date | undefined;
  results: any[] = [];

  bookingDurationExpanded: boolean = false;
  unitTypeSelectionExpanded: boolean = true;
  furnitureStatesExpanded: boolean = true;
  residentSelectionExpanded: boolean = true;
  roomsNumberStatesExpanded: boolean = true;

  stateOptions: any[] = [
    { label: 'يومي', value: 'يومي' },
    { label: 'شهري', value: 'شهري' },
  ];

  selectedRooms: Array<{ type: string; selectedNumber: number | string }> = [];

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
  }

  selectCity(city: string) {
    this.currentStep = 2;
    this._SearchService.setCity(city);
  }

  selectUnitType(type: string) {
    this._SearchService.setUnitType(type);
    this.currentStep = 3;
  }
  selectFurnitureState(state: string) {
    this.currentStep = 3;
    this._SearchService.setFurnitureState(state);
  }

  selectResidentType(type: string) {
    this._SearchService.setResidentType(type);
  }

  triggerDatePicker(): void {
    this.datePicker.nativeElement.showPicker();
  }

  submitFilterOptions() {
    this.router.navigate(['/search-results']);
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
