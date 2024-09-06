import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDateRangeComponent } from './add-date-range.component';

describe('AddDateRangeComponent', () => {
  let component: AddDateRangeComponent;
  let fixture: ComponentFixture<AddDateRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDateRangeComponent]
    });
    fixture = TestBed.createComponent(AddDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
