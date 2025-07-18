import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OnboardingService } from '../onboarding.service';

export const onboardingStatusGuard: CanActivateFn = async (route, state) => {
  const onboardingService = inject(OnboardingService);
  const router = inject(Router);

  const { status } = await onboardingService.getApplication();
  const isOnboardingPages = state.url.startsWith('/onboarding');

  if (status === 'Incomplete' && !isOnboardingPages) {
    return router.navigateByUrl('/onboarding/personal-info');
  }

  if (status === 'Complete' && isOnboardingPages) {
    return router.navigateByUrl('/home');
  }

  return true;
};
