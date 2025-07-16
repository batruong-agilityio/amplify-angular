export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SignupInput {
  email: string;
  password: string;
  phoneCode: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export interface SigninInput {
  email: string;
  password: string;
}
