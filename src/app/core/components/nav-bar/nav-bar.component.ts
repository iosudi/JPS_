import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/modules/authentication/pages/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/pages/register/register.component';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    private _EditUserInformationService: EditUserInformationService
  ) {}
  private modalService = inject(NgbModal);

  dropdown_active: boolean = false;
  visible: boolean = false;

  userLogged: string | null = localStorage.getItem('userId');
  avatarURL: string | null = null;

  ngOnInit(): void {
    this._EditUserInformationService.getUserData().subscribe({
      next: (res) => {
        this.avatarURL = res.data.image;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
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
    location.href = '/home';
  }
}
