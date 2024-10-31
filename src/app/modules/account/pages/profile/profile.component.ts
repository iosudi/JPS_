import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _EditUserInformationService: EditUserInformationService,
    private spinner: NgxSpinnerService
  ) {}

  userLogged: string | null = localStorage.getItem('userId');
  userData: any = {};

  ngOnInit(): void {
    this.spinner.show();
    if (this.userLogged) {
      this._EditUserInformationService.getUserData().subscribe({
        next: (data) => {
          this.spinner.hide();

          if (data.status === 'success') {
            this.userData = data.data;
          }
        },
        error: (error) => {
          this.spinner.hide();
          console.log(error);
        },
      });
    }
  }
}
