import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lists } from 'src/assets/data/fav';

@Component({
  selector: 'app-add-to-fav',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss'],
})
export class AddToFavComponent {
  activeModal = inject(NgbActiveModal);

  lists: any[] = lists;

  closeAddToFavModal(): void {
    this.activeModal.close();
  }
}
