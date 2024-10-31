import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../authentication/guard/auth.guard';
import { widthGuard } from '../authentication/guard/width.guard';
import { AccountComponent } from './pages/account/account.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { FavoriteDetailsComponent } from './pages/favorite-details/favorite-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'account-menu',
    component: AccountComponent,
    canActivate: [widthGuard, authGuard],
  },
  {
    path: 'account-menu/profile',
    component: ProfileComponent,
    title: 'Your Profile',
    canActivate: [authGuard],
  },
  {
    path: 'account-menu/personal-details',
    component: PersonalDetailsComponent,
    title: 'Personal Details',
    canActivate: [authGuard],
  },
  {
    path: 'your-favorites',
    component: FavoritesComponent,
    title: 'Your Favorites',
    canActivate: [authGuard],
  },
  {
    path: 'your-favorites/details/:id',
    component: FavoriteDetailsComponent,
    title: 'Your favorite list details',
    canActivate: [authGuard],
  },
  {
    path: 'your-favorites/details',
    component: FavoriteDetailsComponent,
    title: 'Your favorite list details',
    canActivate: [authGuard],
  },
  {
    path: 'my-bookings',
    component: BookingsComponent,
    title: 'Your bookings',
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
