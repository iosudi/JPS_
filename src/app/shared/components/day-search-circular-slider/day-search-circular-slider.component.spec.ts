import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySearchCircularSliderComponent } from './day-search-circular-slider.component';

describe('DaySearchCircularSliderComponent', () => {
  let component: DaySearchCircularSliderComponent;
  let fixture: ComponentFixture<DaySearchCircularSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaySearchCircularSliderComponent]
    });
    fixture = TestBed.createComponent(DaySearchCircularSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
