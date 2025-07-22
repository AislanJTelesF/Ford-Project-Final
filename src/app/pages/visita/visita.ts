// app/pages/visita/visita.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SideBar } from '../../side-bar/side-bar';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../success-dialog.component/success-dialog.component';

@Component({
  selector: 'app-visita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SideBar
  ],
  templateUrl: './visita.html',
  styleUrls: ['./visita.css']
})
export class Visita implements OnInit {
  visitForm!: FormGroup;

  stores: string[] = [
    'Loja Ford Salvador - BA',
    'Loja Ford São Paulo - SP',
    'Loja Ford Rio de Janeiro - RJ',
    'Loja Ford Belo Horizonte - MG'
  ];

  availableTimes: string[] = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  minDate: Date;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      date: [null, Validators.required],
      time: ['', Validators.required],
      store: ['', Validators.required],
      requests: ['']
    });
  }

  onSubmit(): void {
    if (this.visitForm.valid) {
      console.log('Dados do agendamento:', this.visitForm.value);
      // Abre o pop-up de sucesso com uma mensagem dinâmica e tipo 'schedule'
      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Visita agendada com sucesso!', type: 'schedule' }
      }).afterClosed().subscribe(() => {
        this.visitForm.reset();
      });
    } else {
      // Abre o pop-up de erro/alerta com uma mensagem dinâmica e tipo 'error'
      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Por favor, preencha todos os campos obrigatórios.', type: 'error' }
      });
    }
  }
}
