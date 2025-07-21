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

  // Array de dados do carrossel com caminhos para a pasta 'assets/img/'
  carousel = [
    {
      imagem: '/src/assets/img/imagem_1.jpg', // CAMINHO CORRETO PARA IMAGENS EM src/assets/img/
      texto: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
      link: '/lancamento',
    },
    {
      imagem: 'assets/img/imagem_2.jpg', // CAMINHO CORRETO PARA IMAGENS EM src/assets/img/
      texto: 'Ford: a nossa história.',
      link: '#',
    },
    {
      imagem: 'assets/img/imagem_3.jpg', // CAMINHO CORRETO PARA IMAGENS EM src/assets/img/
      texto: 'Nova Ford Bronco Sport 2022',
      link: '/lancamento',
    },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Lógica para exibir um modal de boas-vindas (se existir no seu projeto)
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement && (window as any).bootstrap) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }

    // Inicia o carrossel automático a cada 3 segundos
    this.intervalId = setInterval(() => this.slideProximo(), 3000);
  }

  ngOnDestroy() {
    // Limpa o intervalo quando o componente é destruído para evitar vazamento de memória
    clearInterval(this.intervalId);
  }

  // Avança para o próximo slide
  slideProximo() {
    this.currentIndex = (this.currentIndex + 1) % this.carousel.length;
  }

  // Volta para o slide anterior
  slideAnterior() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carousel.length) % this.carousel.length;
  }

  // Redireciona para a página de login
  logout() {
    this.router.navigate(['/login']);
  }
}