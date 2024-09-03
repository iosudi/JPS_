import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { EditNameModalComponent } from '../../modals/edit-name-modal/edit-name-modal.component';
import { EditNationalIdModalComponent } from '../../modals/edit-national-id-modal/edit-national-id-modal.component';
import { EditPasswordModalComponent } from '../../modals/edit-password-modal/edit-password-modal.component';
import { EditPhoneNumberModalComponent } from '../../modals/edit-phone-number-modal/edit-phone-number-modal.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  avatarURL: string = '';

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.items = [{ label: ' معلوماتك الشخصية' }];

    this.home = { label: 'الرئيسية', routerLink: '/home' };

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  private modalService = inject(NgbModal);

  editNameModal(): void {
    const modalRef = this.modalService.open(EditNameModalComponent, {
      centered: true,
    });
  }

  editPhoneNumberModal(): void {
    const modalRef = this.modalService.open(EditPhoneNumberModalComponent, {
      centered: true,
    });
  }

  editNationalIdModal(): void {
    const modalRef = this.modalService.open(EditNationalIdModalComponent, {
      centered: true,
    });
  }

  editPasswordModal(): void {
    const modalRef = this.modalService.open(EditPasswordModalComponent, {
      centered: true,
    });
  }

  onselectFile(e: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(e.target?.files[0]);
    reader.onload = (event: any) => {
      this.avatarURL = event.target.result;
      console.log(this.avatarURL);
    };
  }
}
