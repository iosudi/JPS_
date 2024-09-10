import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { ReserveComponent } from '../reserve/reserve.component';

@Component({
  selector: 'app-add-date-range',
  templateUrl: './add-date-range.component.html',
  styleUrls: ['./add-date-range.component.scss'],
})
export class AddDateRangeComponent implements OnInit {
  @ViewChild('datePicker') datePicker!: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  shouldNavigateModal: boolean = false;
  value: string = 'شهري';
  date: Date | undefined;
  activeModal = inject(NgbActiveModal);

  stateOptions: any[] = [
    { label: 'يومي', value: 'يومي' },
    { label: 'شهري', value: 'شهري' },
  ];

  private modalService = inject(NgbModal);

  ngOnInit(): void {
    this.checkWindowWidth();

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
    this.checkWindowWidth();
  }

  private checkWindowWidth(): void {
    const windowWidth = window.innerWidth;
    this.shouldNavigateModal = windowWidth <= 775;
  }

  triggerDatePicker(): void {
    this.datePicker.nativeElement.showPicker();
  }

  openReserveModal(): void {
    this.modalService.open(ReserveComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
    this.closeModal();
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
