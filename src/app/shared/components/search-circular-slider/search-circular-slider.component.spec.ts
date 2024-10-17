import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCircularSliderComponent } from './search-circular-slider.component';

describe('SearchCircularSliderComponent', () => {
  let component: SearchCircularSliderComponent;
  let fixture: ComponentFixture<SearchCircularSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCircularSliderComponent]
    });
    fixture = TestBed.createComponent(SearchCircularSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
