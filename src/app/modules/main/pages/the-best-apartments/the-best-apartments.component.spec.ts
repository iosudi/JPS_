import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBestApartmentsComponent } from './the-best-apartments.component';

describe('TheBestApartmentsComponent', () => {
  let component: TheBestApartmentsComponent;
  let fixture: ComponentFixture<TheBestApartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheBestApartmentsComponent]
    });
    fixture = TestBed.createComponent(TheBestApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
