import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCheckComponent } from './token-check.component';

describe('TokenCheckComponent', () => {
  let component: TokenCheckComponent;
  let fixture: ComponentFixture<TokenCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenCheckComponent]
    });
    fixture = TestBed.createComponent(TokenCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
