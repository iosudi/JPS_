import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
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
    private _EditUserInformationService: EditUserInformationService,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);

  dropdown_active: boolean = false;
  visible: boolean = false;
  showSecondaryNavbar = false;
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Show the secondary navbar after scrolling down 50px
    this.showSecondaryNavbar = scrollPosition > 500;
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
