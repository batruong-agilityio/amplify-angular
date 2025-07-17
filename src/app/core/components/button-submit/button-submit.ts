import { LoadingService } from '@/core/services/loading';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button-submit',
  imports: [MatButtonModule, MatProgressSpinnerModule, AsyncPipe, NgIf],
  templateUrl: './button-submit.html',
  styleUrl: './button-submit.css',
  standalone: true,
})
export class ButtonSubmit {
  @Input()
  text = 'Submit';

  @Input()
  focusOn = true;

  isLoading$ = inject(LoadingService).loading$;
}
