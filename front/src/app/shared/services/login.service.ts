import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Credentials } from '../interfaces/credentials';
import { Token } from '../interfaces/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: Credentials): Observable<Token> {
    return this.httpClient.post<Token>(environment.apiUrl + '/login', credentials);
  }
}
