import { ProfileMenu } from '@/core/layout/profile-menu/profile-menu';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onboarding-layout',
  imports: [RouterModule, MatToolbarModule, ProfileMenu],
  templateUrl: './onboarding-layout.html',
  styleUrl: './onboarding-layout.css',
})
export class OnboardingLayout {}
