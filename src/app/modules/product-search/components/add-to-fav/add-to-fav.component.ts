import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { lists } from 'src/assets/data/fav';
import { AddFavListComponent } from '../add-fav-list/add-fav-list.component';

@Component({
  selector: 'app-add-to-fav',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss'],
})
export class AddToFavComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);

  lists: any[] = lists;

  constructor(private router: Router, private _UserService: UserService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });

    this._UserService.getFavList().subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }

  openAddNewFavList(): void {
    this.modalService.open(AddFavListComponent, {
      centered: true,
      size: 'md',
    });
  }

  closeAddToFavModal(): void {
    this.activeModal.close();
  }
}
