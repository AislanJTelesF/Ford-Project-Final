import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [MatIconModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  constructor(private router: Router) {}

  dashboardButton(): void {
    this.router.navigate(['/dashboard']);
  }
  homeButton(): void {
    this.router.navigate(['/home']);
  }
  loginButton(): void {
    this.router.navigate(['/login']);
  }
}
