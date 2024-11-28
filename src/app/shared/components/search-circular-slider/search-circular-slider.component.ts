import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-circular-slider',
  templateUrl: './search-circular-slider.component.html',
  styleUrls: ['./search-circular-slider.component.scss'],
})
export class SearchCircularSliderComponent {
  @ViewChild('searchSlider', { static: true }) slider: ElementRef | undefined;
  @Input() startDate!: Date; // Receive start date from parent component
  constructor(private datePipe: DatePipe) {}
  private modalService = inject(NgbModal);

  formattedDate!: string | null;
  @Output() dateSelected = new EventEmitter<string>();

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  arabicFormattedDate: string = '';

  selectedMonth = 1; // Default month
  endDate: Date | undefined; // Calculated end date

  // Other variables as defined in your code
  radius = 90;
  dashArray = 2 * Math.PI * this.radius;
  minAngle = 15;
  maxAngle = 360;

  monthAngles = [
    { month: 1, start: 0, end: 30 },
    { month: 2, start: 30, end: 60 },
    { month: 3, start: 60, end: 90 },
    { month: 4, start: 90, end: 120 },
    { month: 5, start: 120, end: 150 },
    { month: 6, start: 150, end: 180 },
    { month: 7, start: 180, end: 210 },
    { month: 8, start: 210, end: 240 },
    { month: 9, start: 240, end: 270 },
    { month: 10, start: 270, end: 300 },
    { month: 11, start: 300, end: 330 },
    { month: 12, start: 330, end: 360 },
  ];

  dashOffset = this.dashArray - (this.minAngle / 360) * this.dashArray;
  pointerStyle = {
    position: 'absolute',
    width: '50%',
    height: '50px',
    top: '50%',
    left: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    transformOrigin: 'right center',
    transform: `translateY(-50%) rotate(${this.minAngle + 93}deg)`,
  };

  private isDragging = false;
  private previousMonth = this.selectedMonth;
  private previousAngle = this.minAngle;
  private angleThreshold = 30;

  ngOnInit(): void {
    if (this.startDate) {
      const nextMonth = new Date(this.startDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1); // Set to the next month
      this.endDate = nextMonth;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startDate']) {
      this.calculateEndDate();
    }
  }

  // openCalendar() {
  //   const modalRef = this.modalService.open(CalendarComponent, {
  //     centered: true,
  //     backdrop: 'static',
  //     scrollable: true,
  //     size: 'lg',
  //   });

  //   modalRef.componentInstance.dateRangeChange.subscribe(
  //     (dateRange: { fromDate: NgbDate; toDate: NgbDate | null }) => {
  //       this.handleDateRangeChange(dateRange);
  //     }
  //   );
  // }

  handleDateRangeChange(dateRange: {
    fromDate: NgbDate;
    toDate: NgbDate | null;
  }) {
    this.fromDate = dateRange.fromDate;
    this.toDate = dateRange.toDate;

    // Convert NgbDate to JavaScript Date
    const fromDefaultDate = new Date(
      this.fromDate.year,
      this.fromDate.month - 1,
      this.fromDate.day
    );

    let toDefaultDate;
    if (this.toDate) {
      toDefaultDate = new Date(
        this.toDate.year,
        this.toDate.month - 1,
        this.toDate.day
      );
    }

    // Format the fromDate in default date format
    this.formattedDate = this.datePipe.transform(
      fromDefaultDate,
      'mediumDate'
    )!;

    // Format the fromDate in Arabic format (e.g., الأحد، 15 ديسمبر)
    this.startDate = fromDefaultDate;
    this.endDate = toDefaultDate;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(event: MouseEvent | TouchEvent) {
    if (this.isDragging) {
      this.updateSlider(this.getEventPosition(event));
    }
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  stopDragging() {
    this.isDragging = false;
    this.snapToClosestMonth();
  }

  startDragging(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.updateSlider(this.getEventPosition(event));
  }

  updateSlider(position: { x: number; y: number }) {
    if (!this.slider) return;

    const rect = this.slider.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = position.x - centerX;
    const y = position.y - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = (angle + 360) % 360;

    const clampedAngle = Math.max(
      this.minAngle,
      Math.min(this.maxAngle, normalizedAngle)
    );

    this.pointerStyle = {
      ...this.pointerStyle,
      transform: `translateY(-50%) rotate(${clampedAngle + 93}deg)`,
    };

    const progress = (clampedAngle / 360) * this.dashArray;
    this.dashOffset = this.dashArray - progress;

    this.selectedMonth =
      this.monthAngles.find(
        (angleRange) =>
          clampedAngle >= angleRange.start && clampedAngle <= angleRange.end
      )?.month || 1;

    this.previousAngle = clampedAngle;
  }

  private getEventPosition(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    if (event instanceof MouseEvent) {
      return { x: event.clientX, y: event.clientY };
    } else {
      const touch = event.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
  }

  snapToClosestMonth(): void {
    const monthRange = this.monthAngles.find(
      (angleRange) =>
        this.previousAngle >= angleRange.start &&
        this.previousAngle <= angleRange.end
    );

    if (monthRange) {
      const middleAngle = (monthRange.start + monthRange.end) / 2;
      this.selectedMonth = monthRange.month;

      this.pointerStyle = {
        ...this.pointerStyle,
        transform: `translateY(-50%) rotate(${middleAngle + 93}deg)`,
      };

      const progress = (middleAngle / 360) * this.dashArray;
      this.dashOffset = this.dashArray - progress;

      this.previousAngle = middleAngle;
    }

    this.calculateEndDate();
  }

  private calculateEndDate(): void {
    if (this.startDate) {
      const endDate = new Date(this.startDate);
      endDate.setMonth(endDate.getMonth() + this.selectedMonth);
      this.endDate = endDate;
      this.formattedDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

      if (this.formattedDate) {
        this.dateSelected.emit(this.formattedDate);
      }
    }
  }

  selectMonth(month: number) {
    this.selectedMonth = month;
    const monthRange = this.monthAngles.find(
      (angleRange) => angleRange.month === month
    );

    if (monthRange) {
      const middleAngle = (monthRange.start + monthRange.end) / 2;

      this.pointerStyle = {
        ...this.pointerStyle,
        transform: `translateY(-50%) rotate(${middleAngle + 93}deg)`,
      };

      const progress = (middleAngle / 360) * this.dashArray;
      this.dashOffset = this.dashArray - progress;

      this.previousAngle = middleAngle;
    }

    this.calculateEndDate();
  }
}
