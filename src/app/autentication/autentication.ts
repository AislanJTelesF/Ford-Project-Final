import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Autentication {
  // You can replace this with an API call
  private readonly mockUser = {
    user: 'admin',
    password: '123456',
  };

  constructor() {}

  login(email: string, password: string): boolean {
    return email === this.mockUser.user && password === this.mockUser.password;
  }
}
