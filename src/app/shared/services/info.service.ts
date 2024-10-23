import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  getBuyersFaqs(): Observable<any> {
    return this.http.get(environment.baseURL + 'faqsbuyers.php');
  }
  getProvidersFaqs(): Observable<any> {
    return this.http.get(environment.baseURL + 'faqsproviders.php');
  }
  getTeamMembers(): Observable<any> {
    return this.http.get(environment.baseURL + 'teammembers.php');
  }
  sendFeedbacks(feedback: Object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the appropriate content type
    });

    return this.http.post(environment.baseURL + 'feedbackspost.php', feedback, {
      headers: headers,
    });
  }
  getFeedbacks(): Observable<any> {
    return this.http.get(environment.baseURL + 'feedbacks.php');
  }
}
