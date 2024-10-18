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
    city: '',
    unit: '',
    tenant_type: '',
    furniture: '',
    rooms: {},
  };

  setCity(city: string) {
    this.searchCriteria.city = city;
  }

  setUnitType(type: string) {
    this.searchCriteria.unit = type;
  }

  setResidentType(type: string) {
    this.searchCriteria.tenant_type = type;
  }

  setFurnitureState(state: string) {
    this.searchCriteria.furniture = state;
  }

  setRoomsSelection(
    roomsSelection: Array<{ type: string; selectedNumber: number | string }>
  ) {
    this.searchCriteria.rooms = roomsSelection;
    console.log(this.searchCriteria);
  }

  search(searchData: object): Observable<any> {
    return this.http.put(environment.baseURL + 'searchresults.php', searchData);
  }
}
