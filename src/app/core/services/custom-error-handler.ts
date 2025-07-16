import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler {
  private snackBar = inject(MatSnackBar);

  handleError(error: { errors: { message: string }[] }) {
    console.error('CustomErrorHandler:', error);
    const message = error.errors?.[0].message || 'Something went wrong';

    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
