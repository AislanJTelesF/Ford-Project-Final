// app/pages/register/register.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../success-dialog.component/success-dialog.component';
import { Autentication } from '../../autentication/autentication';
import { SideBar } from '../../side-bar/side-bar'; // Importe o SideBar

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsMismatch': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    SideBar // Adicione SideBar aqui
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  userExists = false;
  passwordMismatch = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private autenticationService: Autentication
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator() });
  }

  onSubmit(): void {
    this.userExists = false;
    this.passwordMismatch = false;

    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordsMismatch']) {
        this.passwordMismatch = true;
      }
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.autenticationService.register(username, password, email).subscribe(
      (response) => {
        if (response.success) {
          this.dialog.open(SuccessDialogComponent, {
            data: { type: 'register' }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
            this.registerForm.reset();
          });
        } else {
          if (response.error === 'Usuário ou e-mail já cadastrado!') {
            this.userExists = true;
            this.dialog.open(SuccessDialogComponent, {
              data: { message: 'Usuário ou e-mail já cadastrado!', type: 'error' }
            });
          }
        }
      },
      (error) => {
        console.error('Registration failed:', error);
        this.userExists = true;
        this.dialog.open(SuccessDialogComponent, {
          data: { message: 'Falha no registro. Tente novamente mais tarde.', type: 'error' }
        });
      }
    );
  }
}
