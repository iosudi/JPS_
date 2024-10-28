import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPSRatingModalComponent } from './jps-rating-modal.component';

describe('JPSRatingModalComponent', () => {
  let component: JPSRatingModalComponent;
  let fixture: ComponentFixture<JPSRatingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JPSRatingModalComponent]
    });
    fixture = TestBed.createComponent(JPSRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
