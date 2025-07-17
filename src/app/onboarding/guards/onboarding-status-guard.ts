import { CanActivateFn } from '@angular/router';

export const onboardingStatusGuard: CanActivateFn = (route, state) => {
  console.log(route, state);
  return true;
};
