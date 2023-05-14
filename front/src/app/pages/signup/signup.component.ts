import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SignupUser } from 'src/app/shared/interfaces/signup-user';
import { SignupService } from 'src/app/shared/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() {
    if(this.form.invalid) { return; }

    const data: SignupUser = this.form.getRawValue();
    this.signupService.signup(data).subscribe({
      next: () => {
        this.snackBar.open('User created successfully', 'Success');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = true;
      }
    });
  }

}
