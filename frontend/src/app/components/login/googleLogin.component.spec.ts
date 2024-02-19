import { ComponentFixture, TestBed } from '@angular/core/testing';

import { googleLoginComponent } from './googleLogin.component';

describe('googleLoginComponent', () => {
  let component: googleLoginComponent;
  let fixture: ComponentFixture<googleLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [googleLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(googleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
