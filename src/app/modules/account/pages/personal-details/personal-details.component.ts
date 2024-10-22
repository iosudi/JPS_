import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';
import { EditUserInformationService } from 'src/app/shared/services/edit-user-information.service';
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
  selectedFile: File | null = null;

  avatarURL: string | null = null;
  name: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  nationalId: string | null = null;
  userId: string | null = localStorage.getItem('userId');

  constructor(
    private spinner: NgxSpinnerService,
    private _FormBuilder: FormBuilder,
    private _EditUserInformationService: EditUserInformationService
  ) {}

  avatarImage: FormGroup = this._FormBuilder.group({
    image: [''],
    id: [null],
  });

  ngOnInit() {
    this._EditUserInformationService.getUserData().subscribe({
      next: (response) => {
        this.avatarURL = response.data.image;
        this.name = response.data.name;
        this.email = response.data.email;
        this.nationalId = response.data.nationalid;
        this.phone = response.data.phone;
      },
      error: (error) => {
        console.error('Error getting user data', error);
      },
    });

    this._EditUserInformationService.name.subscribe({
      next: (response) => {
        this.name = response;
      },
      error: (error) => {
        console.error('Error getting username !', error);
      },
    });

    this._EditUserInformationService.phone.subscribe({
      next: (response) => {
        this.phone = response;
      },
      error: (error) => {
        console.error('Error getting phone number !', error);
      },
    });

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

  onselectFile(event: any): void {
    const file = event.target.files[0];

    if (this.userId != null && this.avatarImage.status != 'INVALID') {
      this._EditUserInformationService.updatePFP(file, this.userId).subscribe({
        next: (response) => {
          this.avatarURL = response.user.image;
        },
        error: (error) => {
          console.error('File upload failed', error);
        },
      });
    }
  }
}
