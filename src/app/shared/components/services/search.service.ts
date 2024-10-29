import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultKey = 'searchResults';

  constructor(private http: HttpClient) {}

  showSearchSteps: BehaviorSubject<boolean> = new BehaviorSubject(false);

  searchCriteria: any = {
    city: 0,
    unit: '',
    tenant_type: '',
    furniture: 0,
    room_type: 'ras',
    rooms: 0,
    beds: 3,
    bathrooms: 0,
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

  setRoomsSelection(rooms: number, beds: number, bathrooms: number) {
    this.searchCriteria.rooms = rooms;
    this.searchCriteria.beds = beds;
    this.searchCriteria.bathrooms = bathrooms;
    console.log(this.searchCriteria);
  }

  search(searchData: object): Observable<any> {
    return this.http.post(
      environment.baseURL + 'searchresults.php',
      searchData
    );
  }
}
