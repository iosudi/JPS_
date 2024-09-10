import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  copied = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  copyUrl() {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        this.copied = true;

        //  Hide the copied message after a delay
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy the URL: ', err);
      });
  }
  closeShareModal() {
    this.activeModal.close();
  }
}
