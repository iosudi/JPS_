import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBestDistrictsComponent } from './the-best-districts.component';

describe('TheBestDistrictsComponent', () => {
  let component: TheBestDistrictsComponent;
  let fixture: ComponentFixture<TheBestDistrictsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheBestDistrictsComponent]
    });
    fixture = TestBed.createComponent(TheBestDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
