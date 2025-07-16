// ✅ src/app/pages/home/home.ts

import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideBar } from '../../side-bar/side-bar';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [SideBar],
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
