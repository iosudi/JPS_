import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameModalComponent } from './edit-name-modal.component';

describe('EditNameModalComponent', () => {
  let component: EditNameModalComponent;
  let fixture: ComponentFixture<EditNameModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNameModalComponent]
    });
    fixture = TestBed.createComponent(EditNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
