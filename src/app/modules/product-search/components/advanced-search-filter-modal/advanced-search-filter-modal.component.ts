import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-advanced-search-filter-modal',
  templateUrl: './advanced-search-filter-modal.component.html',
  styleUrls: ['./advanced-search-filter-modal.component.scss'],
})
export class AdvancedSearchFilterModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

  barHeights: number[] = [];

  lowerValue!: number;
  higherValue!: number;

  rangeValues: number[] = [1000, 100000];
  minRangeValue: number = 1000;
  maxRangeValue: number = 100000;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    for (let i = 0; i < 30; i++) {
      const randomHeight = Math.floor(Math.random() * 31) + 20; // random between 20 and 50
      this.barHeights.push(randomHeight);
    }

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  getRangePercentage(): number {
    const rangeDifference = this.rangeValues[1] - this.rangeValues[0];
    const totalRange = this.maxRangeValue - this.minRangeValue;
    return (rangeDifference / totalRange) * 100;
  }

  // Function to dynamically set the color based on the index of the bar
  getBarColor(index: number): string {
    const totalBars = this.barHeights.length;

    // Calculate the index corresponding to the lower range value
    const lowerRangePercentage =
      (this.rangeValues[0] - this.minRangeValue) /
      (this.maxRangeValue - this.minRangeValue);
    const lowerRangeBars = Math.floor(lowerRangePercentage * totalBars);

    // Calculate the index corresponding to the upper range value
    const upperRangePercentage =
      (this.rangeValues[1] - this.minRangeValue) /
      (this.maxRangeValue - this.minRangeValue);
    const upperRangeBars = Math.floor(upperRangePercentage * totalBars);

    // Color bars that fall between the lower and upper range red
    return index >= lowerRangeBars && index <= upperRangeBars
      ? '#3f514a'
      : '#ccc';
  }

  // Called when the slider range changes
  getRangeValues(): void {
    // This will update the chart colors when the slider value changes
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
