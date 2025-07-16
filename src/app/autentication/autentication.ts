import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Autentication {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      nome: user,
      senha: password,
    }).pipe(
      map((res) => {
        return { success: true, user: res };
      }),
      catchError((error) => {
        console.error('Login failed', error);
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
}