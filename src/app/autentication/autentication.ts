    // app/autentication/autentication.ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
    import { environment } from '../../environments/environment'; // Importa o ambiente

    @Injectable({
      providedIn: 'root',
    })
    export class Autentication {
      // Usa a URL da API do arquivo de ambiente
      private apiUrl = environment.apiUrl;

      private _isLoggedIn = new BehaviorSubject<boolean>(false);
      isLoggedIn$ = this._isLoggedIn.asObservable();

      constructor(private http: HttpClient) {}

      login(user: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, {
          nome: user,
          senha: password,
        }).pipe(
          map((res) => {
            this._isLoggedIn.next(true);
            return { success: true, user: res };
          }),
          catchError((error) => {
            console.error('Login failed', error);
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

      setLoggedIn(status: boolean): void {
        this._isLoggedIn.next(status);
      }

      logout(): void {
        this._isLoggedIn.next(false);
      }
    }
    