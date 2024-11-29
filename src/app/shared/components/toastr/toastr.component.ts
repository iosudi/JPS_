import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ bottom: '{{startBottom}}' }), // Use dynamic start value
        animate('1000ms 0s ease-in-out', style({ bottom: '{{endBottom}}' })), // Use dynamic end value
      ]),
      transition(':leave', [
        animate('1000ms 0s ease-in-out', style({ bottom: '{{startBottom}}' })), // Use dynamic start value again on leave
      ]),
    ]),
  ],
})
export class ToastrComponent {
  @Input() toastrMessages: any[] = []; // List of toastrs to be shown
  isVisible: boolean = false;
  private nextId: number = 0;
  constructor() {}

  ngOnInit(): void {}

  getDynamicAnimationParams(toastr: any) {
    const index = this.toastrMessages.indexOf(toastr);
    const bottomStart = -100 + 'px'; // Adjust as necessary
    const bottomEnd = index * 70 + 30 + 'px'; // You can also adjust the end value based on your needs

    return { startBottom: bottomStart, endBottom: bottomEnd };
  }

  showToast(message: string, imageUrl: string) {
    const newToastr: any = {
      message: message,
      imageUrl: imageUrl,
      id: this.nextId++,
    };
    this.toastrMessages.push(newToastr);
    this.isVisible = true;

    // Automatically remove the toastr after 3 seconds
    setTimeout(() => {
      this.removeToast(newToastr.id);
    }, 3000); // Adjust duration as needed
  }

  removeToast(id: number) {
    this.toastrMessages = this.toastrMessages.filter(
      (toast) => toast.id !== id
    );
  }
}
