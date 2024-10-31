import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { AddFavListComponent } from '../add-fav-list/add-fav-list.component';

@Component({
  selector: 'app-add-to-fav',
  templateUrl: './add-to-fav.component.html',
  styleUrls: ['./add-to-fav.component.scss'],
})
export class AddToFavComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  private modalService = inject(NgbModal);

  lists: any[] = [];
  listsWithProperties: any[] = [];

  constructor(
    private router: Router,
    private _UserService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });

    this._UserService.favLists.subscribe({
      next: (res: any) => {
        console.log(res);
        this.listsWithProperties = res;
      },
    });

    this.getFavLists();
  }

  openAddNewFavList(): void {
    this.modalService.open(AddFavListComponent, {
      centered: true,
      size: 'md',
    });
  }

  getFavLists(): void {
    this._UserService.getFavList().subscribe({
      next: (res: any) => {
        this.listsWithProperties = res.playlists.map((list: any) => ({
          ...list,
          properties: [],
        }));

        this.listsWithProperties.forEach((list) => {
          this.getListsProperties(list.id);
        });
      },
    });
  }

  getListsProperties(listId: number): void {
    this._UserService.getFavListProperties(listId).subscribe({
      next: (res: any) => {
        const list = this.listsWithProperties.find((l) => l.id === listId);

        if (list) {
          list.properties = res.properties.map((property: any) => ({
            ...property,
            image:
              property.images && property.images.length > 0
                ? property.images[0]
                : null,
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
      },
    });
  }

  addToFavList(listId: number, apartmentId: number): void {
    this._UserService.addToFavList(listId, apartmentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getFavLists();
          this.toastr.success('تم اضافة الوحدة للقائمة بنجاح !');
        } else if (res.error) {
          this.toastr.warning('تم اضافة الوحدة للقائمة سابقا');
        }
      },
      error: (err) => {
        console.error('Error adding apartment to favorite list:', err);
      },
    });
  }

  closeAddToFavModal(): void {
    this.activeModal.close();
  }
}
