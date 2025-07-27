// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
// import { ThemeService } from './theme.service'; // REMOVIDO: Não é mais necessário
import { Observable } from 'rxjs';
import { Autentication } from './autentication/autentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // Ou styles.css diretamente
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class AppComponent implements OnInit {
  title = 'ford-app';
  // isDarkMode$: Observable<boolean>; // REMOVIDO: Não é mais necessário

  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<string | null>;

  constructor(
    // private themeService: ThemeService, // REMOVIDO: Não é mais necessário
    private authService: Autentication
  ) {
    // this.isDarkMode$ = this.themeService.isDarkMode$; // REMOVIDO: Não é mais necessário
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Nenhuma lógica relacionada ao tema aqui, pois o ThemeService foi removido
  }

  // toggleDarkMode(): void { } // REMOVIDO: Não é mais necessário
}
