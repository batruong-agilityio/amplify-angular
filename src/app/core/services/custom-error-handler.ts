import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from './loading';

@Injectable()
export class CustomErrorHandler {
  private snackBar = inject(MatSnackBar);
  private loading = inject(LoadingService);

  handleError(error: Error[] | Error) {
    console.error('CustomErrorHandler:', error);
    let message = 'Something went wrong!';

    if (Array.isArray(error) && error.length > 0) {
      message = error[0]?.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'snack-bar-error',
    });

    this.loading.loadingOff();
  }
}
