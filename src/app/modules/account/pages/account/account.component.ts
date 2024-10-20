import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  visible: boolean = false;

  showDialog(): void {
    this.visible = true;
  }

  closeDialog(): void {
    this.visible = false;
  }

  logout(): void {
    localStorage.removeItem('userId');
    location.href = '/home';
  }
}
