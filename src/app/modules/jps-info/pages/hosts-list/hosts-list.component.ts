import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { apartments } from 'src/assets/data/apartments';
import { review } from 'src/assets/data/JPS_INFO';

@Component({
  selector: 'app-hosts-list',
  templateUrl: './hosts-list.component.html',
  styleUrls: ['./hosts-list.component.scss'],
})
export class HostsListComponent {
  reviews: any[] = review;
  apartments: Apartments[] = apartments;

  currentRate: number = 4.5;
  maxRate: number = 5;
  readonly: boolean = false;

  apartmentsBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    480: {
      slidesPerView: 1.25,
      spaceBetween: 30,
    },
    500: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1630: {
      slidesPerView: 2.25,
      spaceBetween: 30,
    },
  };

  @ViewChild('hostElement') hostElement!: ElementRef;
  @ViewChild('parentElement') parentElement!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const host = this.hostElement.nativeElement;
    const parent = this.parentElement.nativeElement;

    const parentRect = parent.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();

    const offsetTop = parentRect.top;
    const offsetBottom = parentRect.bottom - hostRect.height;

    if (window.scrollY >= offsetTop && window.scrollY <= offsetBottom) {
      host.style.top = `180px`;
    } else if (window.scrollY > offsetBottom) {
      host.style.top = `180px`;
    } else {
      host.style.top = '0px';
    }
  }
  updateRating(newRate: number) {
    this.currentRate = newRate;
  }
}
