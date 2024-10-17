import { Component, inject } from '@angular/core';
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
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent {
  private modalService = inject(NgbModal);

  overlayHidden: boolean = false;
  expanded = false;
  features: any[] = Features;
  apartments: Apartments[] = searchResultApartments;
  checked: boolean = true;
  date: Date[] | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;

  reviewsBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1630: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
  };

  ngOnInit(): void {
    const today = new Date();
    this.minDate = new Date(today);
    this.maxDate = new Date(today);

    // Set minDate to 11 days before today
    this.minDate.setDate(today.getDate());

    // Set maxDate to 11 days after today
    this.maxDate.setDate(today.getDate() + 11);
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
