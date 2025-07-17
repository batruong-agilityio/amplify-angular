import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onboardingStatusGuard } from './onboarding-status-guard';

describe('onboardingStatusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      onboardingStatusGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
