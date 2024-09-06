import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { apartmentFeatures } from 'src/assets/data/apartments';

@Component({
  selector: 'app-apartment-features',
  templateUrl: './apartment-features.component.html',
  styleUrls: ['./apartment-features.component.scss'],
})
export class ApartmentFeaturesComponent {
  featuresList: any[] = apartmentFeatures;
  activeModal = inject(NgbActiveModal);

  closeApartmentFeaturesModal() {
    this.activeModal.close();
  }
}
