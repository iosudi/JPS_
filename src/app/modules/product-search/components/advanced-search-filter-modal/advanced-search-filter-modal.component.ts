import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-advanced-search-filter-modal',
  templateUrl: './advanced-search-filter-modal.component.html',
  styleUrls: ['./advanced-search-filter-modal.component.scss'],
})
export class AdvancedSearchFilterModalComponent {
  activeModal = inject(NgbActiveModal);

  lowerValue!: number;
  higherValue!: number;

  rangeValues: number[] = [1000, 100000];
  minRangeValue: number = 1000;
  maxRangeValue: number = 100000;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }

  getRangeValues(): void {
    console.log('Range Values:', this.rangeValues);
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
