import { Injectable } from '@angular/core';
import { generateClient, GraphQLResult } from 'aws-amplify/api';
import * as Auth from 'aws-amplify/auth';

import {
  signupMutation,
  SignupReturnType,
  signupVerifyOtpMutation,
  SignupVerifyOtpReturnType,
} from '@app-graphql/mutations/signup';
import { SigninInput, SignupInput } from '../auth.models';

const client = generateClient();

@Injectable({ providedIn: 'root' })
export class AuthService {
  async login(credentials: SigninInput): Promise<void> {
    const { nextStep } = await Auth.signIn({
      username: credentials.email,
      password: credentials.password,
    });

    if (nextStep.signInStep == 'DONE') {
      return;
    }

    console.error(`nextStep.signInStep: `, nextStep.signInStep);

    if (nextStep.signInStep == 'CONFIRM_SIGN_UP') {
      throw new Error('Please visit your email to confirm signup!');
    } else {
      throw new Error('Cannot sign in!');
    }
  }

  async signUp(credentials: SignupInput): Promise<SignupReturnType> {
    const result = (await client.graphql({
      query: signupMutation,
      variables: {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: credentials.password,
        phoneNumber: credentials.phoneNumber,
        phoneCode: credentials.phoneCode,
        userType: 'Consumer',
      },
      authMode: 'identityPool',
    })) as GraphQLResult<SignupReturnType>;

    return result.data;
  }

  async verifySignupOtp(
    credentials: SignupInput & { otpCode: string; idempotencyKey: string },
  ): Promise<SignupVerifyOtpReturnType> {
    const result = (await client.graphql({
      query: signupVerifyOtpMutation,
      variables: {
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: credentials.password,
        phoneNumber: credentials.phoneNumber,
        phoneCode: credentials.phoneCode,
        otpCode: credentials.otpCode,
        idempotencyKey: credentials.idempotencyKey,
        userType: 'Consumer',
      },
      authMode: 'identityPool',
    })) as GraphQLResult<SignupVerifyOtpReturnType>;

    return result.data;
  }

  logout(): Promise<void> {
    return Auth.signOut({ global: true });
  }

  async getCurrentUser(): Promise<Auth.AuthUser | null> {
    try {
      return await Auth.getCurrentUser();
    } catch {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }
}
