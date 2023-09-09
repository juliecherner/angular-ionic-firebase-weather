import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
      this.authService.isLoggedIn().then((result: boolean) => {
      result ? this.router.navigate(['/tabs']) : this.router.navigate(['/login']);
    });
  }
}
