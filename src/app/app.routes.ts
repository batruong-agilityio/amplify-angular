import { Routes } from '@angular/router';
import { inject } from '@angular/core';
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
];
