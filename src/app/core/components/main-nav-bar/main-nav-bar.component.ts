import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/modules/authentication/pages/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/pages/register/register.component';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.scss'],
})
export class MainNavBarComponent {
  private modalService = inject(NgbModal);
  dropdown_active: boolean = false;
  visible: boolean = false;

  userLogged: string | null = localStorage.getItem('userId');

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
