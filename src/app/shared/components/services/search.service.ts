import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  showSearchSteps: BehaviorSubject<boolean> = new BehaviorSubject(false);

  searchCriteria: any = {
    city: '',
    unitType: '',
    residentType: '',
    furnitureState: '',
    rooms: [
      {
        bathroom: 0,
      },
      {
        bedroom: 0,
      },
      {
        beds: 0,
      },
    ],
  };

  setCity(city: string) {
    this.searchCriteria.city = city;
  }
  setUnitType(type: string) {
    this.searchCriteria.unitType = type;
  }
  setResidentType(type: string) {
    this.searchCriteria.residentType = type;
  }
  setFurnitureState(state: string) {
    this.searchCriteria.furnitureState = state;
  }
  setRoomsSelection(
    roomsSelection: Array<{ type: string; selectedNumber: number | string }>
  ) {
    this.searchCriteria.rooms = roomsSelection;
    console.log(this.searchCriteria);
  }
}
