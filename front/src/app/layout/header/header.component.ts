import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  loginStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatus.subscribe((status: boolean) => {
      this.loginStatus = status;
    });
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
