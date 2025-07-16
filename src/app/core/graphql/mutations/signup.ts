export interface SignupReturnType {
  signup: {
    idempotencyKey: string;
  };
}

export interface SignupVerifyOtpReturnType {
  verifyOtp: {
    success: boolean;
  };
}

export const signupMutation = /* GraphQL */ `
  mutation Signup(
    $email: AWSEmail!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneCode: String!
    $phoneNumber: String!
    $userType: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phoneCode: $phoneCode
      phoneNumber: $phoneNumber
      userType: $userType
    ) {
      idempotencyKey
    }
  }
`;

export const signupVerifyOtpMutation = /* GraphQL */ `
  mutation SignupOtp(
    $idempotencyKey: String!
    $otpCode: String!
    $email: AWSEmail!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneCode: String!
    $phoneNumber: String!
    $userType: String!
  ) {
    verifyOtp(
      idempotencyKey: $idempotencyKey
      otpCode: $otpCode
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phoneCode: $phoneCode
      phoneNumber: $phoneNumber
      userType: $userType
    ) {
      success
    }
  }
`;
