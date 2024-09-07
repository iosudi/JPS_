import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SucessComponent } from '../sucess/sucess.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent {
  payment: string = 'cash';
  private modalService = inject(NgbModal);
  shouldCloseModal: boolean = false;

  constructor(
    @Optional() public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.shouldCloseModal = true;
      this.activeModal.close();
    }
  }

  openSuccessMessage(): void {
    this.modalService.open(SucessComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
    this.activeModal.close();
  }

  closeReserveModal() {
    this.activeModal.close();
  }
}
