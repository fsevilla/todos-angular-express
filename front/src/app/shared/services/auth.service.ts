import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.authStatus.next(this.tokenExists());
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  tokenExists(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }
}
