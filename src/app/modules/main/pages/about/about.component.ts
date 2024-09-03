import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { Features, staffMembers } from 'src/assets/data/about';
import { Testimonials } from 'src/assets/data/testimonials';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) {}

  features: any[] = Features;
  staffMembers: any[] = staffMembers;
  @ViewChild('staffCarousel', { static: false })
  staffCarousel!: CarouselComponent;
  customOptions: OwlOptions = {
    rtl: true,
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1100: {
        items: 4,
      },
    },
  };

  //testimonials Section Variables
  @ViewChild('testimonialsPrevBtn') testimonialsPrevBtn!: ElementRef;
  @ViewChild('testimonialsNextBtn') testimonialsNextBtn!: ElementRef;
  @ViewChild('testimonialsCarousel', { static: false })
  testimonialsCarousel!: CarouselComponent;
  @ViewChild('testimonialsDot1') testimonialsDot1!: ElementRef;
  @ViewChild('testimonialsDot2') testimonialsDot2!: ElementRef;
  @ViewChild('testimonialsDot3') testimonialsDot3!: ElementRef;
  @ViewChild('testimonialsDot4') testimonialsDot4!: ElementRef;
  testimonialsIndex: number = 0;
  dotHeight: number = 0;
  testimonials: any[] = Testimonials;
  testimonialsOptions: OwlOptions = {
    loop: false,
    rtl: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  checkIndex(): void {
    if (this.testimonialsIndex == 0) {
      this.renderer.setAttribute(
        this.testimonialsPrevBtn.nativeElement,
        'disabled',
        'false'
      );
    } else {
      this.renderer.removeAttribute(
        this.testimonialsPrevBtn.nativeElement,
        'disabled'
      );
    }

    if (this.testimonialsIndex == this.testimonials.length - 1) {
      this.renderer.setAttribute(
        this.testimonialsNextBtn.nativeElement,
        'disabled',
        'false'
      );
    } else {
      this.renderer.removeAttribute(
        this.testimonialsNextBtn.nativeElement,
        'disabled'
      );
    }
  }

  triggerNext(carouselType: 'staff' | 'testimonials'): void {
    if (carouselType === 'testimonials') {
      this.testimonialsIndex++;
      this.checkIndex();
      this.testimonialsCarousel.next();
      this.moveDot(this.testimonialsIndex);
    } else if (carouselType === 'staff') {
      this.staffCarousel.next();
    }
  }

  triggerPrev(carouselType: 'staff' | 'testimonials'): void {
    if (carouselType === 'testimonials') {
      this.testimonialsIndex--;
      this.checkIndex();
      this.testimonialsCarousel.prev();
      this.moveDot(this.testimonialsIndex);
    } else if (carouselType === 'staff') {
      this.staffCarousel.prev();
    }
  }

  moveDot(index: number): void {
    this.dotHeight = this.testimonialsDot1.nativeElement.offsetHeight + 8;

    if (index === 1) {
      this.renderer.setStyle(
        this.testimonialsDot1.nativeElement,
        'transform',
        `translateY(${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot2.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot3.nativeElement,
        'transform',
        `translateY(0px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot4.nativeElement,
        'transform',
        `translateY(0px)`
      );
    } else if (index === 2) {
      this.renderer.setStyle(
        this.testimonialsDot1.nativeElement,
        'transform',
        `translateY(${this.dotHeight * 2}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot2.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot3.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot4.nativeElement,
        'transform',
        `translateY(0)`
      );
    } else if (index === 3) {
      this.renderer.setStyle(
        this.testimonialsDot1.nativeElement,
        'transform',
        `translateY(${this.dotHeight * 3}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot2.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot3.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot4.nativeElement,
        'transform',
        `translateY(-${this.dotHeight}px)`
      );
    } else {
      this.renderer.setStyle(
        this.testimonialsDot1.nativeElement,
        'transform',
        `translateY(0px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot2.nativeElement,
        'transform',
        `translateY(0px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot3.nativeElement,
        'transform',
        `translateY(0px)`
      );
      this.renderer.setStyle(
        this.testimonialsDot4.nativeElement,
        'transform',
        `translateY(0px)`
      );
    }
  }
}
