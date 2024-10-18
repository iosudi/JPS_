import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { serviceTypes } from 'src/assets/data/services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  constructor(
    private _FormBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  serviceTypes: any[] = serviceTypes;
  whatsappSelected: boolean = false;
  phoneSelected: boolean = false;

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
    service1: [false],
  });

  selectedServiceIds: number[] = [];

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  getInputValue(): void {
    const service1Value = this.serviceSelection.get('service1')?.value;
    console.log('Service 1 value:', service1Value);
  }

  toggleCheckbox(serviceId: number): void {
    const index = this.selectedServiceIds.indexOf(serviceId);
    if (index > -1) {
      this.selectedServiceIds.splice(index, 1); // Remove if already selected
    } else {
      this.selectedServiceIds.push(serviceId); // Add if not selected
    }

    // will change after api integration
    this.serviceSelection
      .get('service1')
      ?.setValue(this.selectedServiceIds.length > 0);
  }

  toggleContactMethod(method: string): void {
    if (method === 'whatsapp') {
      this.whatsappSelected = !this.whatsappSelected;
      this.phoneSelected = false;
    } else {
      this.whatsappSelected = false;
      this.phoneSelected = !this.phoneSelected;
    }
  }

  isChecked(serviceId: number): boolean {
    return this.selectedServiceIds.includes(serviceId);
  }
}
