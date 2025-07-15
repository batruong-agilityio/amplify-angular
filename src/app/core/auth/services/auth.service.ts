import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { generateClient } from 'aws-amplify/api';
import * as Auth from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { SigninProps, SignupProps } from '../auth.models';
import { signup } from './../../../graphql/mutations/signup';

const client = generateClient();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private currentUserSubject = new BehaviorSubject<Auth.AuthUser | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  async login(credentials: SigninProps): Promise<void> {
    await Auth.signIn({
      username: credentials.email,
      password: credentials.password,
    });
    const authUser = await this.getCurrentUser();
    this.setAuth(authUser);
  }

  async signUp(credentials: SignupProps): Promise<void> {
    const data = await client.graphql({
      query: signup,
      variables: { input: credentials },
    });
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(['/']);
  }

  async getCurrentUser(): Promise<Auth.AuthUser> {
    return Auth.getCurrentUser();
  }

  setAuth(user: Auth.AuthUser): void {
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}
