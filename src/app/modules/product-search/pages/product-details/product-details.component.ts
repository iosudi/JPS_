import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { Features } from 'src/assets/data/about';
import { searchResultApartments } from 'src/assets/data/apartments';
import { AddDateRangeComponent } from '../../components/add-date-range/add-date-range.component';
import { AddToFavComponent } from '../../components/add-to-fav/add-to-fav.component';
import { RatingModalComponent } from '../../components/rating-modal/rating-modal.component';
import { ShareModalComponent } from '../../components/share-modal/share-modal.component';
import { ApartmentFeaturesComponent } from './../../components/apartment-features/apartment-features.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  overlayHidden: boolean = false;
  expanded = false;
  features: any[] = Features;
  apartments: Apartments[] = searchResultApartments;
  checked: boolean = true;
  private modalService = inject(NgbModal);
  apartmentsId: string | null = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramMap) => {
        this.apartmentsId = paramMap.get('id');
      },
    });
  }

  hideOverlay(): void {
    this.overlayHidden = true;
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
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

  openShareModal(): void {
    this.modalService.open(ShareModalComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }

  openDateRangeModal(): void {
    this.modalService.open(AddDateRangeComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }

  openDateRange(): void {
    this.modalService.open(AddDateRangeComponent, {
      centered: true,
      size: 'lg',
      scrollable: true,
    });
  }
}
