import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Aos from 'aos';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { JPSRatingModalComponent } from 'src/app/shared/components/jps-rating-modal/jps-rating-modal.component';
import { InfoService } from 'src/app/shared/services/info.service';
import { Features, staffMembers } from 'src/assets/data/about';
import { Testimonials } from 'src/assets/data/testimonials';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private _InfoService: InfoService
  ) {}

  private modalService = inject(NgbModal);
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

    this._InfoService.getTeamMembers().subscribe({
      next: (res) => {
        this.staffMembers = res.members;
      },
      error: (error) => {
        console.error('Error fetching team members:', error);
      },
    });

    this._InfoService.getFeedbacks().subscribe({
      next: (res) => {
        this.testimonials = res.feedbacks.slice(0, 4);
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error getting feedbacks:', err);
        this.spinner.hide();
      },
    });

    Aos.init({
      duration: 1000,
    });
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

  openFeedbackForm(): void {
    this.modalService.open(JPSRatingModalComponent, {
      centered: true,
      scrollable: true,
    });
  }
}
