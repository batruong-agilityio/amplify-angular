import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVerificationCode } from './auth-verification-code';

describe('AuthVerificationCode', () => {
  let component: AuthVerificationCode;
  let fixture: ComponentFixture<AuthVerificationCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthVerificationCode],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthVerificationCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
