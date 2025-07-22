// app/autentication/autentication.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Injectable({
  providedIn: 'root',
})
export class Autentication {
  private apiUrl = 'http://localhost:3001';
  // BehaviorSubject para rastrear o estado de login.
  // Começa como 'false' (não logado) por padrão.
  // CORRIGIDO: Removido 'new' duplicado.
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  // Observable público para que outros componentes possam se inscrever no estado de login
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    // Opcional: Você pode verificar o status de login inicial aqui,
    // por exemplo, se houver um token de autenticação no localStorage.
    // Por simplicidade, começamos com false.
  }

  login(user: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      nome: user,
      senha: password,
    }).pipe(
      map((res) => {
        // Se o login for bem-sucedido, atualiza o estado de login
        this._isLoggedIn.next(true);
        return { success: true, user: res };
      }),
      catchError((error) => {
        console.error('Login failed', error);
        // Se o login falhar, garante que o estado de login seja false
        this._isLoggedIn.next(false);
        return of({ success: false, error: error.error.message });
      })
    );
  }

  register(user: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nome: user,
      senha: password,
      email: email,
    }).pipe(
      map((res) => {
        return { success: true, user: res };
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return of({ success: false, error: error.error.message });
      })
    );
  }

  // Novo método para definir o estado de login (útil para logout)
  setLoggedIn(status: boolean): void {
    this._isLoggedIn.next(status);
  }

  // Novo método para logout
  logout(): void {
    // Limpar qualquer token ou dado de sessão se houver
    // Ex: localStorage.removeItem('authToken');
    this._isLoggedIn.next(false); // Define o estado de login como falso
  }
}
