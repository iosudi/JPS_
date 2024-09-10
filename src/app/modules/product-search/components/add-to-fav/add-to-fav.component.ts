import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { lists } from 'src/assets/data/fav';

@Component({
  selector: 'app-add-to-fav',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss'],
})
export class AddToFavComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

  lists: any[] = lists;

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

  closeAddToFavModal(): void {
    this.activeModal.close();
  }
}
