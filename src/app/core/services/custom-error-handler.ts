import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler {
  private snackBar = inject(MatSnackBar);

  handleError(error: { errors: { message: string }[] }) {
    this.snackBar.open(`${error.errors[0].message}`, 'Close', {
      duration: 5000,
    });
    console.error('CustomErrorHandler:', error.errors);
  }
}
