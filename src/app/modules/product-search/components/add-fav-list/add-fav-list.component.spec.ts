import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavListComponent } from './add-fav-list.component';

describe('AddFavListComponent', () => {
  let component: AddFavListComponent;
  let fixture: ComponentFixture<AddFavListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFavListComponent]
    });
    fixture = TestBed.createComponent(AddFavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
