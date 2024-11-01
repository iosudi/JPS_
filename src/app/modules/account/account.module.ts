import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { register } from 'swiper/element/bundle';
import { AccountRoutingModule } from './account-routing.module';
import { EditNameModalComponent } from './modals/edit-name-modal/edit-name-modal.component';
import { EditNationalIdModalComponent } from './modals/edit-national-id-modal/edit-national-id-modal.component';
import { EditPasswordModalComponent } from './modals/edit-password-modal/edit-password-modal.component';
import { EditPhoneNumberModalComponent } from './modals/edit-phone-number-modal/edit-phone-number-modal.component';
import { AccountComponent } from './pages/account/account.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { FavoriteDetailsComponent } from './pages/favorite-details/favorite-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

register();

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
    BookingsComponent,
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
    ReactiveFormsModule,
    TooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
