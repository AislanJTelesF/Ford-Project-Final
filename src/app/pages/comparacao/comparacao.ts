// app/pages/comparacao/comparacao.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf e *ngFor
import { MatIconModule } from '@angular/material/icon'; // Se usar ícones Material
import { Carro } from '../../models/carro.model';
import { SideBar } from '../../side-bar/side-bar'; // Importa a SideBar

@Component({
  selector: 'app-comparacao',
  standalone: true,
  imports: [CommonModule, MatIconModule, SideBar], // Adicione MatIconModule e SideBar
  templateUrl: './comparacao.html',
  styleUrls: ['./comparacao.css'] // Você pode criar este arquivo CSS
})
export class ComparacaoComponent implements OnInit {
  // Array para armazenar os carros selecionados para comparação
  selectedCars: Carro[] = [];
  // Propriedade para controlar a visibilidade da tabela de comparação
  showCompareTable: boolean = false;
  // Mensagens de erro/alerta para o usuário
  alertMessage: string | null = null;

  // Lista completa de carros para seleção
  availableCars: Carro[] = [
    {
      nome: 'XL Cabine Simples 2.2 Diesel 4X4 MT 2022',
      preco: 183850,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 232,
      capacidadeCarga: 1234,
      motor: 2.2,
      potencia: 160,
      volumeCacamba: 1420,
      roda: 'Aço Estampado 16',
      image: 'assets/img/XL Cabine.jpg' // Caminho atualizado
    },
    {
      nome: 'XLS 2.2 Diesel 4X4 AT 2022',
      preco: 220690,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 232,
      capacidadeCarga: 1076,
      motor: 2.2,
      potencia: 160,
      volumeCacamba: 1180,
      roda: 'Aço Estampado 16',
      image: 'assets/img/xls 2.2 diesel.jpg' // Caminho atualizado
    },
    {
      nome: 'Storm 3.2 Diesel 4X4 AT 2022',
      preco: 222790,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 232,
      capacidadeCarga: 1040,
      motor: 3.2,
      potencia: 200,
      volumeCacamba: 1180,
      roda: 'Liga Leve 17',
      image: 'assets/img/storm.jpg' // Caminho atualizado
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicializa a tabela de comparação como escondida
    this.showCompareTable = false;
  }

  // Adiciona ou remove um carro da lista de comparação
  setCarToCompare(event: Event, car: Carro): void {
    const checkbox = event.target as HTMLInputElement;
    this.alertMessage = null; // Limpa mensagens de alerta anteriores

    if (checkbox.checked) {
      if (this.selectedCars.length >= 2) {
        this.alertMessage = "Você só pode comparar 2 carros.";
        checkbox.checked = false; // Desmarca o checkbox
        return;
      }
      this.selectedCars.push(car);
    } else {
      const index = this.selectedCars.findIndex(c => c.nome === car.nome);
      if (index !== -1) {
        this.selectedCars.splice(index, 1);
      }
    }
  }

  // Exibe a tabela de comparação
  showCompare(): void {
    if (this.selectedCars.length < 2) {
      this.alertMessage = "Precisa marcar 2 carros para apresentar a comparação.";
      return;
    }
    this.showCompareTable = true;
    this.alertMessage = null;
  }

  // Esconde a tabela de comparação
  hideCompare(): void {
    this.showCompareTable = false;
    this.alertMessage = null;
  }
}

