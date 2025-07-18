import {
  ApplicationReturnType,
  submitApplication,
  SubmitApplicationInput,
} from '@/core/graphql/mutations/application';
import { retrieveApplication } from '@/core/graphql/queries/application';
import { Injectable } from '@angular/core';
import { generateClient, GraphQLResult } from 'aws-amplify/api';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  client = generateClient();

  async submitApplication(
    data: SubmitApplicationInput,
  ): Promise<ApplicationReturnType | undefined> {
    try {
      const result = (await this.client.graphql({
        query: submitApplication,
        variables: {
          ...data,
        },
      })) as GraphQLResult<{ submitApplication: ApplicationReturnType }>;

      return result.data.submitApplication;
    } catch (error) {
      console.log('IN METHOD', error);
      return undefined;
    }
  }

  async getApplication(): Promise<ApplicationReturnType> {
    const result = (await this.client.graphql({
      query: retrieveApplication,
    })) as GraphQLResult<{
      retrieveApplications: ApplicationReturnType;
    }>;

    return result.data.retrieveApplications;
  }
}
