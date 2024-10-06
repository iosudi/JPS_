import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { TheBestApartmentsComponent } from './pages/the-best-apartments/the-best-apartments.component';
import { TheBestDistrictsComponent } from './pages/the-best-districts/the-best-districts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'JPS GROUPS',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About JPS GROUPS',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact Us',
  },
  {
    path: 'our-services',
    component: ServicesComponent,
    title: 'JPS Services',
  },
  {
    path: 'best-districts',
    component: TheBestDistrictsComponent,
    title: 'The Best Districts at JPS',
  },
  {
    path: 'best-apartments',
    component: TheBestApartmentsComponent,
    title: 'The Best Apartments at JPS',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
