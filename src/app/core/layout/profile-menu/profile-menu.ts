import { AuthService } from '@/core/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.css',
})
export class ProfileMenu {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
