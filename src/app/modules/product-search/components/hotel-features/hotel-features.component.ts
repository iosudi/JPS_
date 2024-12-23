import { Component, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { apartmentFeatures } from 'src/assets/data/apartments';

@Component({
  selector: 'app-hotel-features',
  templateUrl: './hotel-features.component.html',
  styleUrls: ['./hotel-features.component.scss'],
})
export class HotelFeaturesComponent {
  featuresList: any[] = apartmentFeatures;
  activeModal = inject(NgbActiveModal);
  checked: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  closeHotelFeaturesModal() {
    this.activeModal.close();
  }
}
