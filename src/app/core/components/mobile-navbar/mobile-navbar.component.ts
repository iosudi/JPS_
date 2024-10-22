import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  activeLink: string;

  userLogged: string | null = localStorage.getItem('userId');

  constructor(private router: Router) {
    this.activeLink = this.router.url;
    if (
      this.activeLink == '/auth/login' ||
      this.activeLink == '/auth/register' ||
      this.activeLink == '/auth/OTP' ||
      this.activeLink == '/auth/forgot-password' ||
      this.activeLink == '/auth/check-email'
    ) {
      this.activeLink = '/auth';
    } else if (this.activeLink == '/your-favorites/details') {
      this.activeLink = '/your-favorites';
    } else if (
      this.activeLink == '/account-menu/profile' ||
      this.activeLink == '/account-menu/personal-details'
    ) {
      this.activeLink = '/account-menu';
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
      }
    });
  }
}
