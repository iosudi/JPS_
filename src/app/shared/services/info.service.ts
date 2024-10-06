import { HttpClient } from '@angular/common/http';
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
  sendFeedbacks(feedback: any): Observable<any> {
    return this.http.post(environment.baseURL + 'feedbackspost.php', {
      feedback,
    });
  }
  getFeedbacks(): Observable<any> {
    return this.http.get(environment.baseURL + 'feedbacks.php');
  }
}
