import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Credentials } from 'src/app/shared/interfaces/credentials';
import { Token } from 'src/app/shared/interfaces/token';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: Credentials = {
    email: '',
    password: ''
  }

  error: boolean = false;

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {}

  login() {
    console.log('Iniciar sesion', this.credentials);
    this.loginService.login(this.credentials).subscribe({
      next: (response: Token) => {
        this.error = false;
        this.authService.saveToken(response.token);
        // Redirect to home
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error: ', err.error.message);
        this.error = true;
      }
    });
  }

}
