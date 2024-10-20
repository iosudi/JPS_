import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class JPSServiceService {
  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(environment.baseURL + 'servicesshow.php');
  }

  getServicesById(id: number): Observable<any> {
    return this.http.get(environment.baseURL + `servicesshowbyid.php?id=${id}`);
  }

  requestService(userInfo: Object): Observable<any> {
    return this.http.post(environment.baseURL + 'servicesrequest.php', {
      userInfo,
    });
  }

  sendContactForm(contactForm: Object): Observable<any> {
    return this.http.post(environment.baseURL + 'contacts.php', {
      contactForm,
    });
  }
}
