// app/pages/dashboard/vin-data-dialog/vin-data-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { CarroVin } from '../../../utils/carroVinInterface';

@Component({
  selector: 'app-vin-data-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule // Adiciona MatIconModule aqui
  ],
  templateUrl: './vin-data-dialog.html',
  styleUrls: ['./vin-data-dialog.css']
})
export class VinDataDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CarroVin) {}
}
