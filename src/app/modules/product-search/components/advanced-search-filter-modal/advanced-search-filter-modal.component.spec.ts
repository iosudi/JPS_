import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchFilterModalComponent } from './advanced-search-filter-modal.component';

describe('AdvancedSearchFilterModalComponent', () => {
  let component: AdvancedSearchFilterModalComponent;
  let fixture: ComponentFixture<AdvancedSearchFilterModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedSearchFilterModalComponent]
    });
    fixture = TestBed.createComponent(AdvancedSearchFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
