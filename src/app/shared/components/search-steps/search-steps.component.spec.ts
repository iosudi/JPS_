import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStepsComponent } from './search-steps.component';

describe('SearchStepsComponent', () => {
  let component: SearchStepsComponent;
  let fixture: ComponentFixture<SearchStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchStepsComponent]
    });
    fixture = TestBed.createComponent(SearchStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
