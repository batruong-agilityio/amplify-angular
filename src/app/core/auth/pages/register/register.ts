import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import * as Auth from 'aws-amplify/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  registerForm!: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;

      await this.authService.signUp(payload);
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
