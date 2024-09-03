import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNationalIdModalComponent } from './edit-national-id-modal.component';

describe('EditNationalIdModalComponent', () => {
  let component: EditNationalIdModalComponent;
  let fixture: ComponentFixture<EditNationalIdModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNationalIdModalComponent]
    });
    fixture = TestBed.createComponent(EditNationalIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
