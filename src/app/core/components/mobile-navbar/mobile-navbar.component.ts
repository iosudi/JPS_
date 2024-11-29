import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  activeLink: string;

  userLogged: string | null = localStorage.getItem('userId');

  public isScrolled: boolean = false;
  private lastScrollTop: number = 0;

  authLinks = [
    '/auth/login',
    '/auth/register',
    '/auth/OTP',
    '/auth/forgot-password',
    '/auth/check-email',
  ];

  accountLinks = ['/account-menu/profile', '/account-menu/personal-details'];

  constructor(private router: Router) {
    this.activeLink = this.router.url;
    if (this.authLinks.includes(this.activeLink)) {
      this.activeLink = '/auth';
    } else if (this.activeLink.includes('/your-favorites/details')) {
      this.activeLink = '/your-favorites';
    } else if (this.accountLinks.includes(this.activeLink)) {
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScroll = window.scrollY;

    // Check if scrolling down or up
    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      // Scrolling down: reduce opacity
      this.isScrolled = true;
    } else if (currentScroll < this.lastScrollTop || currentScroll <= 50) {
      // Scrolling up: restore opacity to 100%
      this.isScrolled = false;
    }

    // Update last scroll position for next scroll event
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
  }
}
