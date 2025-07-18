import { Routes } from '@angular/router';
import { authGuard } from '@app-auth/guards/auth-guard';
import { SidebarLayout } from '@app-core/layout/sidebar-layout/sidebar-layout';
import { onboardingStatusGuard } from './onboarding/guards/onboarding-status-guard';
import { OnboardingLayout } from './onboarding/onboarding-layout/onboarding-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login'),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/pages/register/register'),
    canActivate: [authGuard],
  },
  {
    path: 'email-verify-sent',
    loadComponent: () =>
      import('./core/auth/pages/email-verify-sent/email-verify-sent'),
    canActivate: [authGuard],
  },
  {
    path: 'confirm-user',
    loadComponent: () => import('./core/auth/pages/confirm-user/confirm-user'),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: SidebarLayout,
    canActivate: [authGuard, onboardingStatusGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home'),
      },
    ],
  },
  {
    path: 'onboarding',
    component: OnboardingLayout,
    canActivate: [authGuard, onboardingStatusGuard],
    children: [
      {
        path: 'personal-info',
        loadComponent: () =>
          import('./onboarding/pages/personal-info/personal-info'),
      },
      {
        path: 'terms-agreement',
        loadComponent: () =>
          import('./onboarding/pages/terms-agreement/terms-agreement'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
