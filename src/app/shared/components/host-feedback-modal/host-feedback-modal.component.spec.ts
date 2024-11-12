import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostFeedbackModalComponent } from './host-feedback-modal.component';

describe('HostFeedbackModalComponent', () => {
  let component: HostFeedbackModalComponent;
  let fixture: ComponentFixture<HostFeedbackModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostFeedbackModalComponent]
    });
    fixture = TestBed.createComponent(HostFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
