import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../success-dialog.component/success-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, FormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  userExists = false;

  private users = [{ user: 'admin', password: '123456' }];
userAlreadyExists: any;

  constructor(private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    const { user, password } = this.registerForm.value;
    const exists = this.users.some((u) => u.user === user);

    if (exists) {
      this.userExists = true;
      return;
    }

    this.users.push({ user, password });
    this.userExists = false;

    this.dialog.open(SuccessDialogComponent).afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
