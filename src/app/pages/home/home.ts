// app/pages/home/home.ts
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SideBar } from '../../side-bar/side-bar';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

interface CarouselItem {
  imagem: string;
  texto: string;
  link: string;
}

// Nova interface para os itens da linha do tempo
interface TimelineItem {
  periodo: string;
  titulo: string;
  descricao: string;
  imagem: string; // Caminho para a imagem do período
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [SideBar, CommonModule], // Adicionar CommonModule aqui
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentIndex = 0;
  intervalId: any;

  carousel: CarouselItem[] = [
    {
      imagem: '/assets/img/imagem_1.jpg',
      texto: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
      link: '/lancamento',
    },
    {
      imagem: '/assets/img/imagem_2.jpg',
      texto: 'Ford: a nossa história.',
      link: '#',
    },
    {
      imagem: '/assets/img/imagem_3.jpg',
      texto: 'Nova Ford Bronco Sport 2022.',
      link: '/lancamento',
    },
  ];

  // Dados da linha do tempo
  timeline: TimelineItem[] = [
    {
      periodo: '1900–1910',
      titulo: 'A Fundação',
      descricao: '1903: Henry Ford funda a Ford Motor Company em Detroit, Michigan. Lança o Model A, o primeiro carro da empresa. Começa a popularizar os automóveis, que até então eram produtos de luxo.',
      imagem: 'assets/img/timeline/1900-1910.jpg' // Placeholder para imagem
    },
    {
      periodo: '1910–1920',
      titulo: 'Revolução na Produção',
      descricao: '1913: Introduz a linha de montagem móvel, revolucionando a indústria com produção em massa. Model T torna-se um ícone, oferecendo um carro acessível para a classe média. Em 1918, metade dos carros nos EUA são Model T.',
      imagem: 'assets/img/timeline/1910-1920.jpg' // Placeholder para imagem
    },
    {
      periodo: '1920–1930',
      titulo: 'Consolidação',
      descricao: 'Ford se expande internacionalmente. Introduz o Model A em 1927, sucessor do Model T. Fortalece sua presença como uma das maiores montadoras do mundo.',
      imagem: 'assets/img/timeline/1920-1930.jpg' // Placeholder para imagem
    },
    {
      periodo: '1930–1940',
      titulo: 'A Grande Depressão',
      descricao: 'Enfrenta desafios econômicos durante a crise de 1929. Produz veículos comerciais e mantém sua relevância. Lança o primeiro carro com motor V8 acessível em 1932.',
      imagem: 'assets/img/timeline/1930-1940.jpg' // Placeholder para imagem
    },
    {
      periodo: '1940–1950',
      titulo: 'A Segunda Guerra Mundial',
      descricao: 'Converte fábricas para produzir veículos militares, aviões e tanques. Após a guerra, retorna à produção civil com novos modelos.',
      imagem: 'assets/img/timeline/1940-1950.jpg' // Placeholder para imagem
    },
    {
      periodo: '1950–1960',
      titulo: 'Inovação e Estilo',
      descricao: 'Surge o famoso Thunderbird (1955), um ícone do design americano. Ford torna-se símbolo do american way of life, com carros potentes e estilosos.',
      imagem: 'assets/img/timeline/1950-1960.jpg' // Placeholder para imagem
    },
    {
      periodo: '1960–1970',
      titulo: 'Nasce o Mustang',
      descricao: '1964: Lança o lendário Ford Mustang, um sucesso instantâneo. Foco em performance e carros esportivos acessíveis. Entra na era dos muscle cars.',
      imagem: 'assets/img/timeline/1960-1970.jpg' // Placeholder para imagem
    },
    {
      periodo: '1970–1980',
      titulo: 'Crise do Petróleo e Adaptação',
      descricao: 'Enfrenta desafios com a crise do petróleo e novas exigências ambientais. Produz carros menores e mais econômicos, como o Ford Pinto. Investe em segurança e eficiência.',
      imagem: 'assets/img/timeline/1970-1980.jpg' // Placeholder para imagem
    },
    {
      periodo: '1980–1990',
      titulo: 'Globalização',
      descricao: 'Expande operações globais. Lança modelos de sucesso como o Escort e o Taurus. Consolida parcerias e adquire marcas como Jaguar e Aston Martin.',
      imagem: 'assets/img/timeline/1980-1990.jpg' // Placeholder para imagem
    },
    {
      periodo: '1990–2000',
      titulo: 'Diversificação',
      descricao: 'Fortalece linha de SUVs e caminhonetes, como o Explorer e F-150. Investimentos em tecnologia e design. Continua expandindo sua presença global.',
      imagem: 'assets/img/timeline/1990-2000.jpg' // Placeholder para imagem
    },
    {
      periodo: '2000–2010',
      titulo: 'Crise e Reestruturação',
      descricao: 'Enfrenta forte crise com o colapso da indústria automobilística em 2008. Ao contrário de outras montadoras americanas, não pediu resgate financeiro ao governo. Concentra-se em inovação e qualidade.',
      imagem: 'assets/img/timeline/2000-2010.jpg' // Placeholder para imagem
    },
    {
      periodo: '2010–2020',
      titulo: 'Era da Tecnologia',
      descricao: 'Investe em carros híbridos e elétricos, como o Fusion Hybrid. Avança em direção à condução autônoma e conectividade. Lança o Ford GT e renova a linha Mustang.',
      imagem: 'assets/img/timeline/2010-2020.jpg' // Placeholder para imagem
    },
    {
      periodo: '2020–presente',
      titulo: 'Mobilidade Sustentável',
      descricao: 'Lança o Mustang Mach-E, SUV totalmente elétrico. Investe pesado em eletrificação e sistemas inteligentes. Continua inovando com a linha F-150 Lightning, a versão elétrica da famosa picape.',
      imagem: 'assets/img/timeline/2020-presente.jpg' // Placeholder para imagem
    }
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
