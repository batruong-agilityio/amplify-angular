export interface ApplicationReturnType {
  id: string;
  status: string;
}

export interface AddressInput {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SubmitApplicationInput {
  address: AddressInput;
  annualIncome: string;
  dateOfBirth: string;
  email: string;
  lastName: string;
  firstName: string;
  isAcceptedTc: boolean;
  nationality: string;
  occupation: string;
  phoneCode: string;
  phoneNumber: string;
  sourceOfIncome: string;
  ssn: string;
}

export const submitApplication = /* GraphQL */ `
  mutation submitApplication(
    $email: AWSEmail!
    $address: SubmitApplicationAddressInput
    $accountType: String
    $isAcceptedTc: Boolean!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $phoneCode: String!
    $occupation: String
    $annualIncome: String
    $sourceOfIncome: String
    $nationality: String
    $passport: String
    $ssn: String
    $dateOfBirth: String
  ) {
    submitApplication(
      email: $email
      address: $address
      accountType: $accountType
      isAcceptedTc: $isAcceptedTc
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      phoneCode: $phoneCode
      occupation: $occupation
      annualIncome: $annualIncome
      sourceOfIncome: $sourceOfIncome
      nationality: $nationality
      passport: $passport
      ssn: $ssn
      dateOfBirth: $dateOfBirth
    ) {
      status
    }
  }
`;
