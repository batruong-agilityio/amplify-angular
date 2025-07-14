import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAgreement } from './terms-agreement';

describe('TermsAgreement', () => {
  let component: TermsAgreement;
  let fixture: ComponentFixture<TermsAgreement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAgreement],
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAgreement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
