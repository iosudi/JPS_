import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  userId: string | null = localStorage.getItem('userId');

  addFavList(listName: any): Observable<any> {
    console.log(listName, this.userId);
    return this._HttpClient.post(environment.baseURL + `favoritelistsadd.php`, {
      userid: this.userId,
      list_name: listName.listName,
    });
  }

  getFavList(): Observable<any> {
    return this._HttpClient.get(
      environment.baseURL + `favoritelistsshow.php?userid=${this.userId}`
    );
  }

  addToFavorites(apartmentId: string): Observable<any> {
    return this._HttpClient.post(environment.baseURL + `addtofavorites.php`, {
      userid: this.userId,
      propertyid: apartmentId,
    });
  }

  removeFormFavorites(apartmentId: string): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `removefavoriteproperties.php`,
      {
        userid: this.userId,
        propertyid: apartmentId,
      }
    );
  }

  getFavorites(): Observable<any> {
    return this._HttpClient.get(
      environment.baseURL + `favoriteproperties.php?userid=${this.userId}`
    );
  }
}
