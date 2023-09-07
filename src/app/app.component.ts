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
    const isLogged = this.authService.isLoggedIn();
    if (!isLogged) this.router.navigate(['/login']);
  }

  onInit() {}
}
