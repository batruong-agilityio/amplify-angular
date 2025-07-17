import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from './loading';

@Injectable()
export class CustomErrorHandler {
  private snackBar = inject(MatSnackBar);
  private loading = inject(LoadingService);

  handleError(error: { errors: { message: string }[] }) {
    console.error('CustomErrorHandler:', error);
    const message = error.errors?.[0].message || 'Something went wrong';

    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });

    this.loading.loadingOff();
  }
}
