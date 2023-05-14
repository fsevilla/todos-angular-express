import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SignupUser } from '../interfaces/signup-user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(user: SignupUser): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/signup', user);
  }
}
