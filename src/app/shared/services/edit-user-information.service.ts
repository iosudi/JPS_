import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditUserInformationService {
  constructor(private http: HttpClient) {}

  userId: string | null = localStorage.getItem('userId');

  name: BehaviorSubject<string> = new BehaviorSubject<string>('');
  phone: BehaviorSubject<string> = new BehaviorSubject<string>('');

  editUsername(userData: any): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', userData.id);
    body.set('name', userData.name);

    return this.http.put(
      environment.baseURL + 'usersname.php',
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  editPhoneNumber(userPhone: { id: string; phone: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', userPhone.id);
    body.set('phone', userPhone.phone);

    return this.http.put(
      environment.baseURL + 'usersphone.php',
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  editPassword(userPassword: {
    id: string;
    old_password: string;
    new_password: string;
  }): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', userPassword.id);
    body.set('old_password', userPassword.old_password);
    body.set('new_password', userPassword.new_password);

    return this.http.put(
      environment.baseURL + 'userspassword.php',
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  updatePFP(userImage: File, userId: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', userId);

    // Since we're sending a file, use FormData for userImage
    const formData = new FormData();
    formData.append('image', userImage);
    formData.append('id', userId);

    return this.http.post(environment.baseURL + 'usersimage.php', formData, {
      headers: new HttpHeaders({}),
    });
  }

  getUserData(): Observable<any> {
    return this.http.post(environment.baseURL + 'userdata.php', {
      userid: this.userId,
    });
  }
}
