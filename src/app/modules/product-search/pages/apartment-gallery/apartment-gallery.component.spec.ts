import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentGalleryComponent } from './apartment-gallery.component';

describe('ApartmentGalleryComponent', () => {
  let component: ApartmentGalleryComponent;
  let fixture: ComponentFixture<ApartmentGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentGalleryComponent]
    });
    fixture = TestBed.createComponent(ApartmentGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
