import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './core/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login'),
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/pages/register/register'),
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: 'email-verify-sent',
    loadComponent: () =>
      import('./core/auth/pages/email-verify-sent/email-verify-sent'),
    canActivate: [
      () => inject(AuthService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
];
