// import { Component, EventEmitter, Output } from '@angular/core';
// import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.scss'],
// })
// export class CalendarComponent {
//   constructor(private calendar: NgbCalendar) {}

//   hoveredDate: NgbDate | null = null;
//   fromDate: NgbDate = this.calendar.getToday();
//   toDate!: NgbDate | null;

//   @Output() dateRangeChange = new EventEmitter<{
//     fromDate: NgbDate;
//     toDate: NgbDate | null;
//   }>();

//   emitDateRange() {
//     this.dateRangeChange.emit({ fromDate: this.fromDate, toDate: this.toDate });
//   }

//   onDateSelection(date: NgbDate) {
//     if (!this.fromDate && !this.toDate) {
//       this.fromDate = date;
//       this.emitDateRange();
//     } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
//       this.toDate = date;
//       this.emitDateRange();
//     } else {
//       this.toDate = null;
//       this.fromDate = date;
//       this.emitDateRange();
//     }
//   }

//   isHovered(date: NgbDate) {
//     return (
//       this.fromDate &&
//       !this.toDate &&
//       this.hoveredDate &&
//       date.after(this.fromDate) &&
//       date.before(this.hoveredDate)
//     );
//   }

//   isInside(date: NgbDate) {
//     return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
//   }

//   isRange(date: NgbDate) {
//     return (
//       date.equals(this.fromDate) ||
//       (this.toDate && date.equals(this.toDate)) ||
//       this.isInside(date) ||
//       this.isHovered(date)
//     );
//   }

//   isDisabled(date: NgbDate): boolean {
//     const today = this.calendar.getToday();

//     if (date.before(today)) {
//       return true;
//     }

//     if (this.fromDate) {
//       const startDisabledDate = this.calendar.getNext(this.fromDate, 'd', 1);
//       const endDisabledDate = this.calendar.getNext(this.fromDate, 'd', 30);

//       if (date.after(this.fromDate) && date.before(endDisabledDate)) {
//         return true;
//       }
//     }

//     return false;
//   }
// }
