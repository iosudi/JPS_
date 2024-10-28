import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  listName: FormGroup = this._FormBuilder.group({
    listName: ['', Validators.required],
  });

  addList(): void {
    if (this.listName.status === 'VALID') {
      this._UserService.addFavList(this.listName.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.listName.reset();
            this.toastr.success('Favorite list added successfully!');
          }
          console.log(res);
        },
        error: (error) => console.error('Error adding favorite list:', error),
      });
    }
  }
}
