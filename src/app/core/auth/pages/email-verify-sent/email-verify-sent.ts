import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verify-sent',
  imports: [],
  templateUrl: './email-verify-sent.html',
  styleUrl: './email-verify-sent.css',
})
export default class EmailVerifySent {
  readonly route = inject(ActivatedRoute);
  email = this.route.snapshot.queryParamMap.get('email');
}
