import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { apartmentFeatures } from 'src/assets/data/apartments';

@Component({
  selector: 'app-apartment-features',
  templateUrl: './apartment-features.component.html',
  styleUrls: ['./apartment-features.component.scss'],
})
export class ApartmentFeaturesComponent implements OnInit {
  featuresList: any[] = apartmentFeatures;
  activeModal = inject(NgbActiveModal);

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

  closeApartmentFeaturesModal() {
    this.activeModal.close();
  }
}
