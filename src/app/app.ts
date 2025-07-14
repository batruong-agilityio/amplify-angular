import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('amplify-angular');

  constructor() {
    Amplify.configure(outputs);
  }
}
