export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SignupProps {
  email: string;
  password: string;
  phoneCode: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface SigninProps {
  email: string;
  password: string;
}
