import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditUserInformationService {
  constructor(private http: HttpClient) {}

  editUsername(userData: object): Observable<any> {
    return this.http.put(environment.baseURL + 'usersname.php', userData);
  }

  editPhoneNumber(userPhone: object): Observable<any> {
    return this.http.put(environment.baseURL + 'usersphone.php', userPhone);
  }

  editPassword(userPassword: object): Observable<any> {
    return this.http.put(
      environment.baseURL + 'userspassword.php',
      userPassword
    );
  }
}
