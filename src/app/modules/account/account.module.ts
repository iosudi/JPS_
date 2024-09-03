import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { EditNameModalComponent } from './modals/edit-name-modal/edit-name-modal.component';
import { EditNationalIdModalComponent } from './modals/edit-national-id-modal/edit-national-id-modal.component';
import { EditPasswordModalComponent } from './modals/edit-password-modal/edit-password-modal.component';
import { EditPhoneNumberModalComponent } from './modals/edit-phone-number-modal/edit-phone-number-modal.component';
import { AccountComponent } from './pages/account/account.component';
import { FavoriteDetailsComponent } from './pages/favorite-details/favorite-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    FavoriteDetailsComponent,
    FavoritesComponent,
    PersonalDetailsComponent,
    ProfileComponent,
    EditNameModalComponent,
    EditNationalIdModalComponent,
    EditPasswordModalComponent,
    EditPhoneNumberModalComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    CoreModule,
    SharedModule,
    BreadcrumbModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    NgxSpinnerModule,
  ],
})
export class AccountModule {}
