import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from '@app-core/services/custom-error-handler';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    MatSnackBarModule,
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
};
