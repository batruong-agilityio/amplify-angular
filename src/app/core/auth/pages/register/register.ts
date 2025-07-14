import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import * as Auth from 'aws-amplify/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  registerForm!: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;

      Auth.signUp({
        username: payload.email!,
        password: payload.password!,
        options: {
          userAttributes: {
            email: payload.email!,
            given_name: payload.firstName!,
            family_name: payload.lastName!,
            phone_number: `+${payload.phoneCode}${payload.phoneNumber}`,
          },
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
