import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButton, TuiTitle, TuiAppearance } from '@taiga-ui/core';
import { TuiProgress } from '@taiga-ui/kit';
import { TuiAppBar, TuiHeader, TuiNavigation } from '@taiga-ui/layout';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service'; // Adjust the path as needed
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    RouterLink,
    TuiAppBar,
    TuiButton,
    TuiProgress,
    TuiTitle,
    TuiAppearance,
    TuiHeader,
    TuiNavigation,
    NgIf
  ],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
