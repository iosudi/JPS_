import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  userId: string | null = localStorage.getItem('userId');

  favLists: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  addFavList(listName: any): Observable<any> {
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

  getFavListProperties(listId: number | null): Observable<any> {
    return this._HttpClient.get(
      environment.baseURL + `favoritelistproperties.php?id=${listId}`
    );
  }

  addToFavList(listId: number, apartmentId: number): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `addtofavoritelist.php`,
      {
        userid: this.userId,
        list_id: listId,
        property_id: apartmentId,
      }
    );
  }

  addToFavorites(apartmentId: string): Observable<any> {
    return this._HttpClient.post(environment.baseURL + `addtofavorites.php`, {
      userid: this.userId,
      propertyid: apartmentId,
    });
  }

  removeFromFavorites(apartmentId: string): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `removefavoriteproperties.php`,
      {
        userid: this.userId,
        propertyid: apartmentId,
      }
    );
  }

  removeFromFavoriteList(
    apartmentId: string,
    listId: number | null
  ): Observable<any> {
    console.log(apartmentId, listId);
    return this._HttpClient.post(
      environment.baseURL + `favoritelistremoveproperties.php`,
      {
        userid: this.userId,
        property_id: apartmentId,
        playlist_id: listId,
      }
    );
  }

  removeFavoriteList(listId: number | null): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `favoritelistremove.php`,
      {
        userid: this.userId,
        playlist_id: listId,
      }
    );
  }

  getFavorites(): Observable<any> {
    return this._HttpClient.get(
      environment.baseURL + `favoriteproperties.php?userid=${this.userId}`
    );
  }
}
