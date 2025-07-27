// app/pages/comparacao/comparacao.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Carro } from '../../models/carro.model';
import { SideBar } from '../../side-bar/side-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComparacaoResultsDialogComponent } from './comparacao-results-dialog/comparacao-results-dialog';

@Component({
  selector: 'app-comparacao',
  standalone: true,
  imports: [CommonModule, MatIconModule, SideBar],
  templateUrl: './comparacao.html',
  styleUrls: ['./comparacao.css']
})
export class ComparacaoComponent implements OnInit {
  selectedCars: Carro[] = [];
  showCompareTable: boolean = false;
  alertMessage: string | null = null;

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
      image: 'assets/img/XL Cabine.jpg'
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
      image: 'assets/img/xls 2.2 diesel.jpg'
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
      image: 'assets/img/storm.jpg'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showCompareTable = false;
  }

  // NOVO MÉTODO: Verifica se o carro está no array de carros selecionados
  isChecked(car: Carro): boolean {
    return this.selectedCars.some(selected => selected.nome === car.nome);
  }

  setCarToCompare(event: Event, car: Carro): void {
    const checkbox = event.target as HTMLInputElement;
    this.alertMessage = null;

    if (checkbox.checked) {
      if (this.selectedCars.length >= 2) {
        this.alertMessage = "Você só pode comparar 2 carros.";
        checkbox.checked = false;
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

  showCompare(): void {
    if (this.selectedCars.length < 2) {
      this.alertMessage = "Precisa marcar 2 carros para apresentar a comparação.";
      return;
    }
    this.alertMessage = null;

    this.dialog.open(ComparacaoResultsDialogComponent, {
      data: this.selectedCars,
      width: '90%',
      maxWidth: '1000px',
      panelClass: 'custom-comparison-dialog'
    });
  }
}
