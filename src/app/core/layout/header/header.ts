import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IfAuthenticatedDirective } from '../../auth/if-authenticated.directive';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    IfAuthenticatedDirective,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export default class Header implements OnInit {
  private router = inject(Router);
  currentUser$ = inject(AuthService).currentUser;
  currentRoute = '';

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = event.url;
      });
  }
}
