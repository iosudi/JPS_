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

  lowerValue!: number;
  higherValue!: number;

  rangeValues: number[] = [1000, 100000];
  minRangeValue: number = 1000;
  maxRangeValue: number = 100000;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
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

  getRangeValues(): void {
    console.log('Range Values:', this.rangeValues);
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
