import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { generateClient, GraphQLResult } from 'aws-amplify/api';
import * as Auth from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { signup, SignupReturnType } from '@app-graphql/mutations/signup';
import { SigninInput, SignupInput } from '../auth.models';

const client = generateClient();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _router = inject(Router);
  private _currentUserSubject = new BehaviorSubject<Auth.AuthUser | null>(null);
  public currentUser = this._currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  async login(credentials: SigninInput): Promise<void> {
    await Auth.signIn({
      username: credentials.email,
      password: credentials.password,
    });
    const authUser = await this.getCurrentUser();
    this.setAuth(authUser);
  }

  async signUp(credentials: SignupInput): Promise<SignupReturnType> {
    const result: GraphQLResult<SignupReturnType> = (await client.graphql({
      query: signup,
      variables: {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: credentials.password,
        phoneNumber: credentials.phoneNumber,
        phoneCode: '1',
        userType: 'Consumer',
      },
      authMode: 'identityPool',
    })) as GraphQLResult<SignupReturnType>;

    return result.data;
  }

  logout(): void {
    this.purgeAuth();
    void this._router.navigate(['/']);
  }

  async getCurrentUser(): Promise<Auth.AuthUser> {
    return Auth.getCurrentUser();
  }

  setAuth(user: Auth.AuthUser): void {
    this._currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this._currentUserSubject.next(null);
  }
}
