import { Component, inject, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  constructor(private router: Router, private toastr: ToastrService) {}

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
      .readText()
      .then((clipboardContent) => {
        if (clipboardContent === currentUrl) {
          this.toastr.error('URL is already in clipboard');
        } else {
          navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
              this.toastr.success('URL copied to clipboard');
            })
            .catch((err) => {
              console.error('Failed to copy the URL: ', err);
              this.toastr.error('Failed to copy the URL');
            });
        }
      })
      .catch((err) => {
        console.error('Error accessing clipboard: ', err);
        this.toastr.error('Error reading clipboard');
      });
  }

  closeShareModal() {
    this.activeModal.close();
  }
}
