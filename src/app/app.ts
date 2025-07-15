import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import Header from './core/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('amplify-angular');

  constructor() {
    Amplify.configure(outputs);
  }
}
