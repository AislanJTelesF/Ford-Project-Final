// app/pages/comparacao/comparacao-results-dialog/comparacao-results-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Carro } from '../../../models/carro.model'; // Importa a interface Carro

@Component({
  selector: 'app-comparacao-results-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './comparacao-results-dialog.html',
  styleUrls: ['./comparacao-results-dialog.css']
})
export class ComparacaoResultsDialogComponent {
  // O 'data' injetado será um array de Carro (esperamos 2 carros)
  constructor(@Inject(MAT_DIALOG_DATA) public data: Carro[]) {}
}
