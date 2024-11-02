import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  visible: boolean = false;
  userData: any = {};

  constructor(
    private _EditUserInformationService: EditUserInformationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._EditUserInformationService.getUserData().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.userData = res.data;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  showDialog(): void {
    this.visible = true;
  }

  closeDialog(): void {
    this.visible = false;
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }
}
