import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  userId: string | null = localStorage.getItem('userId');

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the appropriate content type
    });

    return this.http.post(
      environment.baseURL + 'feedbackspost.php',
      {
        user_id: this.userId,
        accuracy: feedback.accuracy,
        ease: feedback.ease,
        speed: feedback.speed,
        service: feedback.service,
        security: feedback.security,
        feedback: feedback.feedback,
        rating: feedback.rating,
      },
      {
        headers: headers,
      }
    );
  }
  getFeedbacks(): Observable<any> {
    return this.http.get(environment.baseURL + 'feedbacks.php');
  }
}
