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
import { RouterLink } from '@angular/router';
import { AuthService } from '@app-auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterLink,
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
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      await this.authService.signUp(payload);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
