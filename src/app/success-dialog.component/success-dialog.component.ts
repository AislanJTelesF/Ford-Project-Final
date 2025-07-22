// app/success-dialog.component/success-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule], // Adicionar CommonModule
  templateUrl: './success-dialog.component.html',
})
export class SuccessDialogComponent {
  // A propriedade 'data' agora pode incluir 'message' e 'type'
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message?: string, type: 'register' | 'schedule' | 'error' }) {}
}
