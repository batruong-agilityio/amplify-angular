import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { confirmSignUp } from '@aws-amplify/auth';

@Component({
  selector: 'app-confirm-user',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './confirm-user.html',
  styleUrl: './confirm-user.css',
})
export default class ConfirmUser implements OnInit {
  readonly route = inject(ActivatedRoute);

  async ngOnInit() {
    const { username, code } = this.route.snapshot.queryParams;

    await confirmSignUp({
      username,
      confirmationCode: code,
    });
  }
}
