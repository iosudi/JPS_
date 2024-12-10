import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavBarComponent } from './components/main-nav-bar/main-nav-bar.component';
import { MobileNavbarComponent } from './components/mobile-navbar/mobile-navbar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SecondaryNavbarComponent } from './components/secondary-navbar/secondary-navbar.component';
import { AnimateOnScrollDirective } from './directives/animate-on-scroll.directive';

@NgModule({
  declarations: [
    FooterComponent,
    MainNavBarComponent,
    NavBarComponent,
    NotFoundComponent,
    AnimateOnScrollDirective,
    MobileNavbarComponent,
    SecondaryNavbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    RouterLinkActive,
    RouterLink,
  ],
  exports: [
    NavBarComponent,
    AnimateOnScrollDirective,
    FooterComponent,
    MainNavBarComponent,
    MobileNavbarComponent,
    SecondaryNavbarComponent,
  ],
})
export class CoreModule {}
