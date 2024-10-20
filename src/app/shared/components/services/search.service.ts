import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  showSearchSteps: BehaviorSubject<boolean> = new BehaviorSubject(false);

  searchCriteria: any = {
    city: 0,
    unit: '',
    tenant_type: '',
    furniture: 0,
    rooms: {},
  };

  setCity(city: number) {
    this.searchCriteria.city = city;
  }

  setUnitType(type: string) {
    this.searchCriteria.unit = type;
  }

  setResidentType(type: string) {
    this.searchCriteria.tenant_type = type;
  }

  setFurnitureState(state: number) {
    this.searchCriteria.furniture = state;
  }

  setRoomsSelection(
    roomsSelection: Array<{ type: string; selectedNumber: number | string }>
  ) {
    this.searchCriteria.rooms = roomsSelection;
    console.log(this.searchCriteria);
  }

  search(searchData: object): Observable<any> {
    return this.http.post(
      environment.baseURL + 'searchresults.php',
      searchData
    );
  }
}
