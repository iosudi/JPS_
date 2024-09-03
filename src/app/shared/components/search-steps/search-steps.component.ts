import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  furnitureStates,
  residentTypes,
  rooms,
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

  currentStep = 0;
  showSteps = true;
  cities = [];
  unitTypes = unitTypes;
  residentTypes = residentTypes;
  furnitureStates = furnitureStates;
  roomOptions = rooms;
  results: any[] = [];

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

  selectResidentType(type: string) {
    this.currentStep = 4;
    this._SearchService.setResidentType(type);
  }

  selectFurnitureState(state: string) {
    this.currentStep = 5;
    this._SearchService.setFurnitureState(state);
  }

  selectRoom(type: string, selectedNumber: number | string) {
    const existingSelection = this.selectedRooms.find(
      (room) => room.type === type
    );

    if (existingSelection) {
      existingSelection.selectedNumber = selectedNumber;
    } else {
      this.selectedRooms.push({ type, selectedNumber });
    }

    this._SearchService.setRoomsSelection(this.selectedRooms);
  }

  submitFilterOptions() {
    this.router.navigate(['/search-results']);
  }
}
