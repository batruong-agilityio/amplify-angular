import { ButtonSubmit } from '@/core/components/button-submit/button-submit';
import { SubmitApplicationInput } from '@/core/graphql/mutations/application';
import { LoadingService } from '@/core/services/loading';
import {
  AnnualIncome,
  Occupation,
  SourceOfIncome,
} from '@/onboarding/constants';
import { OnboardingService } from '@/onboarding/onboarding.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ButtonSubmit,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export default class PersonalInfo {
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);
  readonly onboardingService = inject(OnboardingService);

  occupationEntries = Object.entries(Occupation);
  annualIncomeEntries = Object.entries(AnnualIncome);
  sourceOfIncomeEntries = Object.entries(SourceOfIncome);

  personalInfoForm = this.fb.group({
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['US', [Validators.required]],
    }),
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    phoneCode: ['1', Validators.required],
    dateOfBirth: ['1', Validators.required],
    nationality: ['US', Validators.required],
    ssn: ['', Validators.required],
    passport: [''],
    occupation: [''],
    annualIncome: [''],
    sourceOfIncome: [''],
    isAcceptedTc: [true, Validators.requiredTrue],
  });

  async onSubmit() {
    if (this.personalInfoForm.valid) {
      this.loadingService.loadingOn();
      await this.onboardingService.submitApplication(
        this.personalInfoForm.value as SubmitApplicationInput,
      );
      this.loadingService.loadingOff();
      this.router.navigateByUrl('/home');
    }
  }

  updateValidation(value: string) {
    const ssnControl = this.personalInfoForm.get('ssn')!;
    const passportControl = this.personalInfoForm.get('passport')!;

    if (value === 'US') {
      ssnControl.setValidators([Validators.required]);
      passportControl?.clearValidators();
    } else {
      passportControl?.setValidators([Validators.required]);
      ssnControl?.clearValidators();
    }

    passportControl.updateValueAndValidity();
    ssnControl.updateValueAndValidity();
  }
}
