import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { searchResultApartments } from 'src/assets/data/apartments';
import { AddToFavComponent } from '../../components/add-to-fav/add-to-fav.component';
import { RatingModalComponent } from '../../components/rating-modal/rating-modal.component';
import { ShareModalComponent } from '../../components/share-modal/share-modal.component';
import { SucessComponent } from '../../components/sucess/sucess.component';
import { ApartmentFeaturesComponent } from './../../components/apartment-features/apartment-features.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  overlayHidden: boolean = false;
  expanded = false;
  arraySize: number = 8;
  features: any[] = new Array(this.arraySize);
  apartments: Apartments[] = searchResultApartments;
  checked: boolean = true;
  private modalService = inject(NgbModal);

  hideOverlay(): void {
    this.overlayHidden = true;
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  showMoreFeatures(): void {
    if (this.arraySize != 56) {
      const newSize = this.arraySize + 48;
      this.arraySize = newSize;

      const newFeatures = new Array(newSize);

      for (let i = 0; i < this.features.length; i++) {
        newFeatures[i] = this.features[i];
      }

      this.features = newFeatures;
    }
  }

  openRatingModal(): void {
    this.modalService.open(RatingModalComponent, {
      centered: true,
    });
  }

  openAddToFav(): void {
    this.modalService.open(AddToFavComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }

  openApartmentFeatures(): void {
    this.modalService.open(ApartmentFeaturesComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }

  openSuccessMessage(): void {
    this.modalService.open(SucessComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }
  openShareModal(): void {
    this.modalService.open(ShareModalComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }
}
