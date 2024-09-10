import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  Optional,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { SucessComponent } from '../sucess/sucess.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
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

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
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
