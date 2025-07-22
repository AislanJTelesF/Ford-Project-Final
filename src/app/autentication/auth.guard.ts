// app/autentication/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Autentication } from './autentication'; // Importa seu serviço de autenticação

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: Autentication, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Observa o estado de login do serviço de autenticação
    return this.authService.isLoggedIn$.pipe(
      take(1), // Pega o valor mais recente e completa o observable
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true; // Usuário logado, permite acesso
        } else {
          // Usuário não logado, redireciona para a página de login
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
