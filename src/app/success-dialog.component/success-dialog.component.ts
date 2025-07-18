// app/success-dialog.component/success-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'; // Importar MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule

@Component({
  selector: 'app-success-dialog',
  standalone: true, // Adicionar standalone: true
  imports: [MatDialogModule, MatButtonModule], // Adicionar os módulos necessários
  templateUrl: './success-dialog.component.html', // CORRIGIDO: Usar templateUrl para referenciar o arquivo HTML
})
export class SuccessDialogComponent {}