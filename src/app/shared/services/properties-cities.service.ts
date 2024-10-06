import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PropertiesCitiesService {
  constructor(private http: HttpClient) {}

  getSpecialProperties(): Observable<any> {
    return this.http.get(environment.baseURL + 'specialproperties.php');
  }

  getSearchedCities(): Observable<any> {
    return this.http.get(environment.baseURL + 'searchedcities.php');
  }

  getAllProperties(): Observable<any> {
    return this.http.get(environment.baseURL + 'propertiesshow.php');
  }

  getPropertiesById(id: number): Observable<any> {
    return this.http.get(
      environment.baseURL + `propertiesshowbyid.php?id=${id}`
    );
  }
}
