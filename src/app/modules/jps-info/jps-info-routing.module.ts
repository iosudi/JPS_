import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostsListComponent } from './pages/hosts-list/hosts-list.component';
import { HowItWorkComponent } from './pages/how-it-work/how-it-work.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RatesComponent } from './pages/rates/rates.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: 'termsOfService',
    component: TermsOfServiceComponent,
    title: 'JPS GROUPS Terms of Service',
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
    title: 'JPS GROUPS Privacy Policy',
  },
  {
    path: 'how-it-works',
    component: HowItWorkComponent,
    title: 'How it Works',
  },
  {
    path: 'rates',
    component: RatesComponent,
    title: 'JPS Rates',
  },
  {
    path: 'host',
    component: HostsListComponent,
    title: 'Our Hosts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JpsInfoRoutingModule {}
