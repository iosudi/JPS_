import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { JPSServiceService } from 'src/app/shared/services/jps-service.service';
import { serviceTypes } from 'src/assets/data/services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _JPSServiceService: JPSServiceService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  serviceTypes: any[] = serviceTypes;
  contactMethod: string = '';

  userId: string | null = localStorage.getItem('userId');

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    center: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

  breakpoints = {
    320: {
      // For small devices
      slidesPerView: 1,
      spaceBetween: 10,
    },
    724: {
      // For medium devices
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1028: {
      // For larger devices
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1440: {
      // For larger devices
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1734: {
      // For extra-large devices
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  serviceSelection: FormGroup = this._FormBuilder.group({
    userid: [null, Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    propertyid: [null, Validators.required],
    contact: ['', Validators.required],
    service: ['', Validators.required],
  });

  selectedServiceId!: number | null;

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  onSubmit(): void {
    this.serviceSelection.patchValue({ userid: this.userId });

    if (this.serviceSelection.status === 'VALID') {
      this.disabledBtn();
      this._JPSServiceService
        .requestService(this.serviceSelection.value)
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.serviceSelection.reset();
              this.selectedServiceId = null;
              this.contactMethod = '';
              this.toastr.success(res.success);
              this.enabledBtn();
            }
          },
          error: (err) => {
            this.enabledBtn();
            console.error(err);
          },
        });
    }
  }

  disabledBtn(): void {
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
  }

  enabledBtn(): void {
    this.renderer.setStyle(
      this.submitBtn.nativeElement,
      'pointer-events',
      'auto'
    );
    this.renderer.removeAttribute(this.submitBtn.nativeElement, 'disabled');
  }

  toggleCheckbox(serviceId: number): void {
    this.selectedServiceId = serviceId;
    this.serviceSelection.patchValue({ service: serviceId });
  }

  toggleContactMethod(method: string): void {
    this.contactMethod = method;
    this.serviceSelection.patchValue({ contact: method });
  }
}
