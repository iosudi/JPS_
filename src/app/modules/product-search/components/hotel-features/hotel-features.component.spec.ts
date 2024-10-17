import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFeaturesComponent } from './hotel-features.component';

describe('HotelFeaturesComponent', () => {
  let component: HotelFeaturesComponent;
  let fixture: ComponentFixture<HotelFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelFeaturesComponent]
    });
    fixture = TestBed.createComponent(HotelFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
