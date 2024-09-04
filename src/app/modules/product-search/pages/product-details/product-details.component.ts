import { Component } from '@angular/core';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { searchResultApartments } from 'src/assets/data/apartments';

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
}
