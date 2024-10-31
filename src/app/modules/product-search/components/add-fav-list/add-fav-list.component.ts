import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-fav-list',
  templateUrl: './add-fav-list.component.html',
  styleUrls: ['./add-fav-list.component.scss'],
})
export class AddFavListComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _UserService: UserService,
    private toastr: ToastrService
  ) {}
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  listsWithProperties: any[] = [];

  listName: FormGroup = this._FormBuilder.group({
    listName: ['', Validators.required],
  });

  addList(): void {
    if (this.listName.status === 'VALID') {
      this._UserService.addFavList(this.listName.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.listName.reset();
            this.toastr.success('تم اضافة ضائمة مفضلات !');
            this.getFavLists();
            this.activeModal.close();
          }
        },
        error: (error) => console.error('Error adding favorite list:', error),
      });
    }
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
        this._UserService.favLists.next(this.listsWithProperties);
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
}
