import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifySent } from './email-verify-sent';

describe('EmailVerifySent', () => {
  let component: EmailVerifySent;
  let fixture: ComponentFixture<EmailVerifySent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerifySent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerifySent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
