import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-check-email-popup',
  templateUrl: './check-email-popup.component.html',
  styleUrls: ['./check-email-popup.component.scss'],
})
export class CheckEmailPopupComponent {
  private modalService = inject(NgbModal);

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  openLoginForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/login']);
    } else {
      this.modalService.open(LoginComponent, {
        centered: true,
        backdrop: 'static',
      });
      this.activeModal.close();
    }
  }
}
