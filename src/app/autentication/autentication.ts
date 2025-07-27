// app/autentication/autentication.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // CORRIGIDO: Importa a interface Usuario

@Injectable({
  providedIn: 'root',
})
export class Autentication {
  private apiUrl = 'http://localhost:3001';

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _currentUser = new BehaviorSubject<string | null>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    // CORRIGIDO: Tipando a resposta esperada da requisição HTTP como Usuario
    return this.http.post<Usuario>(`${this.apiUrl}/login`, {
      nome: user,
      senha: password,
    }).pipe(
      map((res: Usuario) => { // CORRIGIDO: Tipando 'res' explicitamente como Usuario
        this._isLoggedIn.next(true);
        this._currentUser.next(res.nome); // 'nome' existe em Usuario
        return { success: true, user: res };
      }),
      catchError((error) => {
        console.error('Login failed', error);
        this._isLoggedIn.next(false);
        this._currentUser.next(null);
        return of({ success: false, error: error.error.message });
      })
    );
  }

  register(user: string, password: string, email: string): Observable<any> {
    // Manter como está, pois a API de registro retorna o usuário completo, incluindo senha
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

  setLoggedIn(status: boolean): void {
    this._isLoggedIn.next(status);
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }
}
