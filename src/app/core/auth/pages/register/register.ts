import { ButtonSubmit } from '@/core/components/button-submit/button-submit';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app-auth/services/auth.service';

import { LoadingService } from '@/core/services/loading';
import { AuthVerificationCode } from '../../components/auth-verification-code/auth-verification-code';

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
    MatButtonModule,
    MatDialogModule,
    ButtonSubmit,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export default class RegisterComponent {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  readonly loadingService = inject(LoadingService);
  focusOn = true;

  registerForm!: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      phoneCode: ['1', Validators.required],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      this.loadingService.loadingOn();
      const result = await this.authService.signUp(payload);
      this.loadingService.loadingOff();

      const idempotencyKey = result?.signup?.idempotencyKey;
      this.verifySignupOtp(idempotencyKey);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  verifySignupOtp(idempotencyKey: string) {
    const dialogRef = this.dialog.open(AuthVerificationCode, {
      data: {
        ...this.registerForm.value,
        idempotencyKey,
      },
      minWidth: '560px',
      minHeight: '380px',
      hasBackdrop: true,
    });
    this.focusOn = false;
    dialogRef.afterClosed().subscribe(() => {
      this.focusOn = true;
    });
  }
}
