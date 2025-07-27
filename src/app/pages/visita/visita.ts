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

// REMOVIDO: Importações do Firebase
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';

// REMOVIDO: Declaração das variáveis globais do Firebase
// declare const __app_id: string;
// declare const __firebase_config: string;
// declare const __initial_auth_token: string;

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
export class VisitaComponent implements OnInit {
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

  // REMOVIDO: Propriedades do Firebase
  // private db: any;
  // private auth: any;
  // private appId: string;
  // private userId: string | null = null;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.minDate = new Date();
    // REMOVIDO: Inicialização de appId
    // this.appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  }

  async ngOnInit(): Promise<void> {
    this.visitForm = this.fb.group({
      fullName: ['', Validators.required], // NOVO: Campo de nome completo com validação
      date: [null, Validators.required],
      time: ['', Validators.required],
      store: ['', Validators.required],
      requests: ['']
    });

    // REMOVIDO: Inicialização do Firebase
    /*
    try {
      let firebaseConfig;
      if (typeof __firebase_config !== 'undefined' && __firebase_config) {
        firebaseConfig = JSON.parse(__firebase_config);
      } else {
        console.error('Erro: __firebase_config não fornecida ou vazia. O Firebase não pode ser inicializado.');
        this.dialog.open(SuccessDialogComponent, {
          data: { message: 'Erro: Configuração do Firebase ausente. Agendamento indisponível.', type: 'error' }
        });
        return;
      }

      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      this.auth = getAuth(app);

      if (typeof __initial_auth_token !== 'undefined') {
        await signInWithCustomToken(this.auth, __initial_auth_token);
      } else {
        await signInAnonymously(this.auth);
      }

      this.userId = this.auth.currentUser?.uid || crypto.randomUUID();
      console.log('Firebase initialized. User ID:', this.userId);

    } catch (error) {
      console.error('Erro ao inicializar o Firebase:', error);
      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Erro ao inicializar o Firebase. Verifique sua conexão e tente novamente.', type: 'error' }
      });
    }
    */
  }

  async onSubmit(): Promise<void> {
    if (this.visitForm.valid) {
      // REMOVIDO: Verificação de db e userId
      /*
      if (!this.db || !this.userId) {
        this.dialog.open(SuccessDialogComponent, {
          data: { message: 'Erro: Firebase não inicializado ou usuário não autenticado. Tente recarregar a página.', type: 'error' }
        });
        return;
      }
      */

      const formData = this.visitForm.value;
      const visitData = {
        fullName: formData.fullName, // NOVO: Inclui o nome completo nos dados a serem "salvos" (apenas logados)
        date: formData.date.toISOString().split('T')[0],
        time: formData.time,
        store: formData.store,
        requests: formData.requests,
        // REMOVIDO: userId e createdAt
        // userId: this.userId,
        // createdAt: new Date().toISOString()
      };

      console.log('Dados do agendamento:', visitData); // Apenas loga os dados no console

      // REMOVIDO: Lógica de salvamento no Firebase
      /*
      try {
        const docRef = await addDoc(collection(this.db, `artifacts/${this.appId}/public/data/visits`), visitData);
        console.log('Visita agendada com sucesso com ID:', docRef.id);
      } catch (error) {
        console.error('Erro ao agendar visita:', error);
        this.dialog.open(SuccessDialogComponent, {
          data: { message: 'Erro ao agendar visita. Tente novamente mais tarde.', type: 'error' }
        });
        return; // Retorna para não limpar o formulário em caso de erro de persistência
      }
      */

      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Visita agendada com sucesso!', type: 'schedule' }
      }).afterClosed().subscribe(() => {
        this.visitForm.reset();
        this.visitForm.get('date')?.setValue(null);
        this.visitForm.get('time')?.setValue('');
        this.visitForm.get('store')?.setValue('');
      });

    } else {
      this.dialog.open(SuccessDialogComponent, {
        data: { message: 'Por favor, preencha todos os campos obrigatórios.', type: 'error' }
      });
    }
  }
}
