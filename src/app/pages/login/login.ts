// app/pages/login/login.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Autentication } from '../../autentication/autentication';
import { Router, RouterModule } from '@angular/router';
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
    RouterModule
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

      // CORRECTED: Subscribe to the Observable returned by authService.login
      this.authService.login(user, password).subscribe(
        (response) => {
          if (response.success) {
            // Login bem-sucedido
            this.loginError = false;
            this.router.navigate(['/home']);
          } else {
            // Login falhou (credenciais incorretas ou outro erro do backend)
            this.loginError = true;
            console.error('Login failed:', response.error); // Log the specific error from backend
          }
        },
        (error) => {
          // Erro na comunicação com o serviço (ex: servidor offline)
          this.loginError = true;
          console.error('Login failed due to network or server error:', error);
          // Opcional: exibir uma mensagem de erro mais genérica para o usuário
        }
      );
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
