import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneNumberModalComponent } from './edit-phone-number-modal.component';

describe('EditPhoneNumberModalComponent', () => {
  let component: EditPhoneNumberModalComponent;
  let fixture: ComponentFixture<EditPhoneNumberModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPhoneNumberModalComponent]
    });
    fixture = TestBed.createComponent(EditPhoneNumberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
