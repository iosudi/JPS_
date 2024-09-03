import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsListComponent } from './hosts-list.component';

describe('HostsListComponent', () => {
  let component: HostsListComponent;
  let fixture: ComponentFixture<HostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostsListComponent]
    });
    fixture = TestBed.createComponent(HostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
