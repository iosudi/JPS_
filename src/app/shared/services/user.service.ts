import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  addToFavorites(userId: string | null, apartmentId: string): Observable<any> {
    return this._HttpClient.post(environment.baseURL + `addtofavorites.php`, {
      userid: userId,
      propertyid: apartmentId,
    });
  }

  getFavorites(userId: string | null): Observable<any> {
    return this._HttpClient.get(
      environment.baseURL + `favoriteproperties.php?userid=${userId}`
    );
  }
}
