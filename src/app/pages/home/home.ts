// ✅ src/app/pages/home/home.ts

import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SideBar } from '../../side-bar/side-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [SideBar],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  intervalId: any;

  carousel = [
    {
      imagem: '/public/img/imagem_1.jpg',
      texto: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
      link: '/lancamento',
    },
    {
      imagem: '/public/img/imagem_2.jpg',
      texto: 'Ford: a nossa história.',
      link: '#',
    },
    {
      imagem: '/public/img/imagem_3.jpg',
      texto: 'Nova Ford Bronco Sport 2022',
      link: '/lancamento',
    },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement && (window as any).bootstrap) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }

    this.intervalId = setInterval(() => this.slideProximo(), 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  slideProximo() {
    this.currentIndex = (this.currentIndex + 1) % this.carousel.length;
  }

  slideAnterior() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carousel.length) % this.carousel.length;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
