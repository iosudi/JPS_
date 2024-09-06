import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentFeaturesComponent } from './apartment-features.component';

describe('ApartmentFeaturesComponent', () => {
  let component: ApartmentFeaturesComponent;
  let fixture: ComponentFixture<ApartmentFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentFeaturesComponent]
    });
    fixture = TestBed.createComponent(ApartmentFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
