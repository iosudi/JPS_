import {
  Component,
  ElementRef,
  inject,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Apartments } from 'src/app/core/interfaces/apartments';
import { ShareModalComponent } from 'src/app/modules/product-search/components/share-modal/share-modal.component';
import { JPSRatingModalComponent } from 'src/app/shared/components/jps-rating-modal/jps-rating-modal.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InfoService } from 'src/app/shared/services/info.service';
import { PropertiesCitiesService } from 'src/app/shared/services/properties-cities.service';
import { UserService } from 'src/app/shared/services/user.service';
import { aboutUs } from 'src/assets/data/about-section';
import { apartments } from 'src/assets/data/apartments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private _PropertiesCitiesService: PropertiesCitiesService,
    private _UserService: UserService,
    private toastr: ToastrService,
    private _FormBuilder: FormBuilder,
    private auth: AuthService,
    private _InfoService: InfoService
  ) {}

  private modalService = inject(NgbModal);

  favProperties: any[] = [];

  apartments: Apartments[] = apartments;
  specialApartments: any[] = [];
  cities: any[] = [];

  topRowPositionHero: number = 0;
  bottomRowPositionHero: number = 0;

  topRowPositionGallery: number = 0;
  bottomRowPositionGallery: number = 0;
  scrollWidth!: number;
  totalHeight!: number;

  // apartment & district carousels
  @ViewChild('districtSwiper', { static: false }) districtSwiper?: ElementRef;
  @ViewChild('hotelSwiper', { static: false }) hotelSwiper?: ElementRef;
  @ViewChild('apartmentSwiper', { static: false })
  apartmentSwiper?: ElementRef;

  apartmentsBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 5,
    },
    724: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1000: {
      slidesPerView: 2.5,
      spaceBetween: 5,
    },
    1290: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1630: {
      slidesPerView: 3.5,
      spaceBetween: 5,
    },
  };

  districtBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    520: {
      slidesPerView: 1.5,
      spaceBetween: 5,
    },
    724: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1000: {
      slidesPerView: 2.5,
      spaceBetween: 5,
    },
    1290: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1630: {
      slidesPerView: 3.5,
      spaceBetween: 5,
    },
  };

  HotelsBreakpoints = {
    520: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    830: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  };

  currentIndex = 0;
  apartmentCardWidth!: number;
  districtCardWidth!: number;

  // About us Section Variables
  @ViewChild('dot1') dot1!: ElementRef;
  @ViewChild('dot2') dot2!: ElementRef;
  @ViewChild('dot3') dot3!: ElementRef;
  @ViewChild('knowMoreBtn') knowMoreBtn!: ElementRef;
  @ViewChildren('contentContainer')
  contentContainer!: QueryList<ElementRef>;
  contents: any[] = aboutUs;
  contentIndex: number = 0;
  dotWidth: number = 0;
  contentContainerHeight: number = 0;

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
  testimonials: any[] = [];
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

  //Form Variables
  passwordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;
  roles: any[] | undefined;
  errMsg!: string;

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9 ]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      nationalid: ['', [Validators.required]],
      account_type: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\s!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>?]+$'
          ),
        ],
      ],
      confirm_password: [''],
    },
    { validators: [this.checkPasswordMatch] } as FormControlOptions
  );

  ngOnInit(): void {
    this.spinner.show();
    this.roles = [{ name: 'مالك' }, { name: 'ضيف' }];
    document.body.style.overflow = 'hidden'; // Prevent body scrolling

    this._PropertiesCitiesService.getSpecialProperties().subscribe({
      next: (res) => {
        this.specialApartments = res.properties;
      },
      error: (err) => {
        console.error('Error getting special apartments:', err);
      },
    });

    this._InfoService.getFeedbacks().subscribe({
      next: (res) => {
        console.log(res);
        this.testimonials = res.feedbacks.slice(0, 4);
      },
      error: (err) => {
        console.error('Error getting feedbacks:', err);
      },
    });

    this._PropertiesCitiesService.getSearchedCities().subscribe({
      next: (res) => {
        this.cities = res.data;
      },
      error: (err) => {
        console.error('Error getting special apartments:', err);
      },
    });

    this._UserService.getFavorites().subscribe({
      next: (res) => {
        res.properties.forEach((property: any) => {
          this.favProperties.push(property.id);
        });
      },
      error: (err) => {
        console.error('Error getting favorite apartments:', err);
      },
    });

    setTimeout(() => {
      this.spinner.hide();
      document.body.style.overflow = 'auto'; // Re-enable body scrolling
    }, 2000);

    this.scrollWidth = 300;
    setInterval(() => this.autoScroll('heroSection'), 3000);
    setInterval(() => this.autoScroll('gallerySection'), 2000);
    this.setActive(this.contentIndex);
  }

  navigate(
    direction: 'next' | 'prev',
    carousel: ElementRef,
    cardWidth: number
  ) {
    const maxIndex = carousel.nativeElement.children.length - 3;

    if (direction === 'next' && this.currentIndex < maxIndex) {
      this.currentIndex++;
    } else if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex--;
    }

    carousel.nativeElement.style.transform = `translateX(${
      this.currentIndex * cardWidth
    }px)`;
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

  triggerNext(
    carouselType: 'district' | 'apartment' | 'testimonials' | 'hotel'
  ): void {
    if (carouselType === 'testimonials') {
      this.testimonialsIndex++;
      this.checkIndex();
      this.testimonialsCarousel.next();
      this.moveDot(this.testimonialsIndex);
    } else if (carouselType === 'district') {
      this.districtSwiper?.nativeElement.swiper.slideNext();
    } else if (carouselType === 'apartment') {
      this.apartmentSwiper?.nativeElement.swiper.slideNext();
    } else if (carouselType === 'hotel') {
      this.hotelSwiper?.nativeElement.swiper.slideNext();
    }
  }

  triggerPrev(
    carouselType: 'district' | 'apartment' | 'testimonials' | 'hotel'
  ): void {
    if (carouselType === 'testimonials') {
      this.testimonialsIndex--;
      this.checkIndex();
      this.testimonialsCarousel.prev();
      this.moveDot(this.testimonialsIndex);
    } else if (carouselType === 'district') {
      this.districtSwiper?.nativeElement.swiper.slidePrev();
    } else if (carouselType === 'apartment') {
      this.apartmentSwiper?.nativeElement.swiper.slidePrev();
    } else if (carouselType === 'hotel') {
      this.hotelSwiper?.nativeElement.swiper.slidePrev();
    }
  }

  autoScroll(section: 'gallerySection' | 'heroSection'): void {
    const windowWidth = window.innerWidth;

    if (section === 'gallerySection') {
      // Always horizontal for the first section
      this.scrollHorizontal('row-1', 'row-2', 'gallery');
    } else if (section === 'heroSection') {
      // Conditional scrolling for the second section
      if (windowWidth > 1200) {
        this.scrollVertical('column-1', 'column-2', 'hero');
      } else {
        this.scrollHorizontal('column-1', 'column-2', 'hero');
      }
    }
  }

  scrollHorizontal(
    id1: string,
    id2: string,
    section: 'hero' | 'gallery'
  ): void {
    let topRowPosition, bottomRowPosition;

    if (section === 'hero') {
      topRowPosition = this.topRowPositionHero;
      bottomRowPosition = this.bottomRowPositionHero;
      if (topRowPosition === 300) {
        topRowPosition = 0;
        bottomRowPosition = 300;
      } else {
        topRowPosition = 300;
        bottomRowPosition = 0;
      }
    } else {
      topRowPosition = this.topRowPositionGallery;
      bottomRowPosition = this.bottomRowPositionGallery;
      if (topRowPosition === 200) {
        topRowPosition = 0;
        bottomRowPosition = 0;
      } else {
        topRowPosition = 200;
        bottomRowPosition = -200;
      }
    }

    if (section === 'hero') {
      this.topRowPositionHero = topRowPosition;
      this.bottomRowPositionHero = bottomRowPosition;
    } else {
      this.topRowPositionGallery = topRowPosition;
      this.bottomRowPositionGallery = bottomRowPosition;
    }

    const row1 = document.getElementById(id1);
    const row2 = document.getElementById(id2);

    if (row1 && row2) {
      this.renderer.setStyle(
        row1,
        'transform',
        `translateX(${topRowPosition}px)`
      );
      this.renderer.setStyle(
        row2,
        'transform',
        `translateX(${bottomRowPosition}px)`
      );
    }
  }

  scrollVertical(id1: string, id2: string, section: 'hero' | 'gallery'): void {
    let topRowPosition, bottomRowPosition;

    topRowPosition = this.topRowPositionHero;
    bottomRowPosition = this.bottomRowPositionHero;

    if (topRowPosition === -450) {
      topRowPosition = 0;
      bottomRowPosition = -500;
    } else {
      topRowPosition = -450;
      bottomRowPosition = 0;
    }

    if (section === 'hero') {
      this.topRowPositionHero = topRowPosition;
      this.bottomRowPositionHero = bottomRowPosition;
    } else {
      this.topRowPositionGallery = topRowPosition;
      this.bottomRowPositionGallery = bottomRowPosition;
    }

    const row1 = document.getElementById(id1);
    const row2 = document.getElementById(id2);

    if (row1 && row2) {
      this.renderer.setStyle(
        row1,
        'transform',
        `translateY(${topRowPosition}px)`
      );
      this.renderer.setAttribute(
        row2,
        'style',
        `transform: translateY(${bottomRowPosition}px) !important`
      );
    }
  }

  setActive(index: number): void {
    this.dotWidth = this.dot1.nativeElement.offsetWidth + 16;
    const div: any = this.contentContainer.toArray()[index];
    this.contentContainerHeight = div.nativeElement.offsetHeight + 16;
    this.contentIndex = index;

    if (this.contentIndex === 1) {
      this.renderer.setStyle(
        this.knowMoreBtn.nativeElement,
        'top',
        `${this.contentContainerHeight}px`
      );
      this.renderer.setStyle(
        this.dot1.nativeElement,
        'transform',
        `translateX(-${this.dotWidth}px)`
      );
      this.renderer.setStyle(
        this.dot2.nativeElement,
        'transform',
        `translateX(${this.dotWidth}px)`
      );
      this.renderer.setStyle(
        this.dot3.nativeElement,
        'transform',
        `translateX(0px)`
      );
    } else if (this.contentIndex === 2) {
      this.renderer.setStyle(
        this.knowMoreBtn.nativeElement,
        'top',
        `${this.contentContainerHeight}px`
      );
      this.renderer.setStyle(
        this.dot1.nativeElement,
        'transform',
        `translateX(-${this.dotWidth * 2}px)`
      );
      this.renderer.setStyle(
        this.dot2.nativeElement,
        'transform',
        `translateX(${this.dotWidth}px)`
      );
      this.renderer.setStyle(
        this.dot3.nativeElement,
        'transform',
        `translateX(${this.dotWidth}px)`
      );
    } else {
      this.renderer.setStyle(
        this.knowMoreBtn.nativeElement,
        'top',
        `${this.contentContainerHeight}px`
      );
      this.renderer.setStyle(
        this.dot1.nativeElement,
        'transform',
        `translateX(0px)`
      );
      this.renderer.setStyle(
        this.dot2.nativeElement,
        'transform',
        `translateX(0px)`
      );
      this.renderer.setStyle(
        this.dot3.nativeElement,
        'transform',
        `translateX(0px)`
      );
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

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    } else if (passwordInput == 'rePassword') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }

  checkPasswordMatch(group: FormGroup): void {
    let password = group.get('password');
    let confirmPassword = group.get('confirm_password');

    if (confirmPassword?.value == '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value != password?.value) {
      confirmPassword?.setErrors({ notMatch: true });
    }
  }

  openShareModal(event: MouseEvent): void {
    event.stopPropagation();
    this.modalService.open(ShareModalComponent, {
      centered: true,
      size: 'md',
      scrollable: true,
    });
  }

  openFeedbackForm(): void {
    this.modalService.open(JPSRatingModalComponent, {
      centered: true,
      scrollable: true,
    });
  }

  onSubmit(): void {
    this.renderer.setStyle(
      this.submitBtn.nativeElement,
      'pointer-events',
      'none'
    );
    this.renderer.setAttribute(
      this.submitBtn.nativeElement,
      'disabled',
      'true'
    );

    if (this.registerForm.status === 'VALID') {
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastr.success(res.message);
            this.registerForm.reset();
            this.errMsg = '';
          } else if (res.status === 'error') {
            this.errMsg = res.message;
          }
          this.renderer.setStyle(
            this.submitBtn.nativeElement,
            'pointer-events',
            'auto'
          );
          this.renderer.removeAttribute(
            this.submitBtn.nativeElement,
            'disabled'
          );
        },
        error: (error) => {
          console.error(error);
          console.log(this.registerForm);
        },
      });
    }
  }

  addToFav(apartmentId: string, event: MouseEvent): void {
    event.stopPropagation();
    this._UserService.addToFavorites(apartmentId.toString()).subscribe({
      next: (res) => {
        this.favProperties.push(apartmentId);
        this.toastr.success(res.message);
      },
      error: (error) => {
        this.toastr.error(error.error.error);
      },
    });
  }

  removeFromFav(apartmentId: string, event: MouseEvent): void {
    event.stopPropagation();
    const index = this.favProperties.indexOf(apartmentId);
    this._UserService.removeFormFavorites(apartmentId.toString()).subscribe({
      next: (res) => {
        this.favProperties.splice(index, 1);
        this.toastr.success(res.message);
      },
      error: (error) => {
        this.toastr.error(error.error.error);
      },
    });
  }
}
