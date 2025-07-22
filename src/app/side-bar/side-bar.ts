// app/side-bar/side-bar.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Autentication } from '../autentication/autentication';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;

  constructor(private router: Router, private authService: Autentication) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  dashboardButton(): void {
    this.router.navigate(['/dashboard']);
  }
  homeButton(): void {
    this.router.navigate(['/home']);
  }
  loginButton(): void {
    this.router.navigate(['/login']);
  }
  comparacaoButton(): void {
    this.router.navigate(['/comparacao']);
  }
  vistaButton(): void {
    this.router.navigate(['/visita']);
  }

  // NOVO MÉTODO: Para navegar para a página de registro
  registerButton(): void {
    this.router.navigate(['/register']);
  }

  logoutButton(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
