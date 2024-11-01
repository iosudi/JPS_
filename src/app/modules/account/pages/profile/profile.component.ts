import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';
import { PropertiesCitiesService } from 'src/app/shared/services/properties-cities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private _EditUserInformationService: EditUserInformationService,
    private _PropertiesCitiesService: PropertiesCitiesService,
    private spinner: NgxSpinnerService
  ) {}

  userLogged: string | null = localStorage.getItem('userId');
  userData: any = {};
  ownerProperties: any[] = [];

  apartmentsBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 1.25,
      spaceBetween: 30,
    },
    500: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1630: {
      slidesPerView: 3.25,
      spaceBetween: 30,
    },
  };

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

      this._PropertiesCitiesService
        .getOwnerProperties(this.userData.id)
        .subscribe({
          next: (data) => {
            this.ownerProperties = data;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
