import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent {
  activeModal = inject(NgbActiveModal);
  currentRate: number = 4.5;
  maxRate: number = 5;
  readonly: boolean = false;

  updateRating(newRate: number) {
    this.currentRate = newRate;
  }

  closeRatingModal() {
    this.activeModal.close();
  }
}
