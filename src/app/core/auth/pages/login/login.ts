import { ButtonSubmit } from '@/core/components/button-submit/button-submit';
import { LoadingService } from '@/core/services/loading';
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
import { Router, RouterLink } from '@angular/router';

import * as Auth from 'aws-amplify/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ButtonSubmit,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export default class LoginComponent {
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);

  loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const { nextStep } = await Auth.signIn({
        username: email!,
        password: password!,
      });

      console.log('LOG nextStep', nextStep);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
