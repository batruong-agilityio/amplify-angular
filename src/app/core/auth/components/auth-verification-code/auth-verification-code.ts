import { ButtonSubmit } from '@/core/components/button-submit/button-submit';
import { LoadingService } from '@/core/services/loading';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { SignupInput } from '../../auth.models';
import { AuthService } from '../../services/auth.service';

export interface DialogData extends SignupInput {
  idempotencyKey: string;
}

@Component({
  selector: 'app-auth-verification-code',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    NgOtpInputModule,
    ButtonSubmit,
  ],
  templateUrl: './auth-verification-code.html',
  styleUrl: './auth-verification-code.css',
  encapsulation: ViewEncapsulation.None,
})
export class AuthVerificationCode {
  readonly authService = inject(AuthService);
  readonly dialogRef = inject(DialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);

  phoneNumber = `+${this.data.phoneCode}${this.data.phoneNumber}`;
  otpControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  otpConfig = {
    length: 6,
    inputClass: 'otp-input',
    allowNumbersOnly: true,
  };

  async verifyCode() {
    if (this.otpControl.valid) {
      this.loadingService.loadingOn();
      const result = await this.authService.verifySignupOtp({
        ...this.data,
        otpCode: this.otpControl.value,
      });
      this.loadingService.loadingOff();

      if (result?.verifyOtp.success) {
        this.router.navigate(['/email-verify-sent'], {
          queryParams: { email: this.data.email },
        });
        this.dialogRef.close();
      }
    } else {
      this.otpControl.markAllAsTouched();
    }
  }
}
