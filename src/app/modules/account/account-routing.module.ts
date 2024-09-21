import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { widthGuard } from '../authentication/guard/width.guard';
import { AccountComponent } from './pages/account/account.component';
import { FavoriteDetailsComponent } from './pages/favorite-details/favorite-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'account-menu',
    component: AccountComponent,
    canActivate: [widthGuard],
  },
  {
    path: 'account-menu/profile',
    component: ProfileComponent,
    title: 'Your Profile',
  },
  {
    path: 'account-menu/personal-details',
    component: PersonalDetailsComponent,
    title: 'Personal Details',
  },
  {
    path: 'your-favorites',
    component: FavoritesComponent,
    title: 'Your Favorites',
  },
  {
    path: 'your-favorites/details',
    component: FavoriteDetailsComponent,
    title: 'Your favorite list details',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
