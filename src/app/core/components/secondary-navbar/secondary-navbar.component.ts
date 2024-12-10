import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/modules/authentication/pages/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/pages/register/register.component';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss'],
})
export class SecondaryNavbarComponent {
  constructor(
    private _EditUserInformationService: EditUserInformationService,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);
  dropdown_active: boolean = false;
  visible: boolean = false;

  userLogged: string | null = localStorage.getItem('userId');

  avatarURL: string | null = null;

  ngOnInit(): void {
    if (this.userLogged) {
      this._EditUserInformationService.getUserData().subscribe({
        next: (res) => {
          this.avatarURL = res.data.image;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

  toggleDropdown(): void {
    this.dropdown_active = !this.dropdown_active;
  }

  openLoginDialog(): void {
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
    });
  }
  openSignUpDialog(): void {
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
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
    window.location.reload();
  }
}
