import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `register.php`,
      userData
    );
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(environment.baseURL + `login.php`, userData);
  }

  forgotPassword(userData: object): Observable<any> {
    return this._HttpClient.post(
      environment.baseURL + `forgetpassword.php`,
      userData
    );
  }
}
