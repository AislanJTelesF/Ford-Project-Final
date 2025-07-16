import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Autentication } from '../../autentication/autentication';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  loginForm: FormGroup;
  user: any;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: Autentication,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      autoLogin: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      const isAuthenticated = this.authService.login(user, password);

      if (isAuthenticated) {
        this.loginError = false;
        this.router.navigate(['/home']);
      } else {
        this.loginError = true;
      }
    }
  }
}
