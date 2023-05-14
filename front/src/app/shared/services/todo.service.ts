import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';
import { AuthService } from './auth.service';
import { File } from '../interfaces/file';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this.authService.getToken()
    });
    return headers;
  }

  listAll(): Observable<Todo[]> {
    const headers = this.getHeaders();
    const url = environment.apiUrl + '/todos';
    return this.httpClient.get<Todo[]>(url, { headers });
  }

  create(todo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    const url = environment.apiUrl + '/todos';
    return this.httpClient.post<Todo>(url, todo, { headers});
  }

  update(todo: Todo): Observable<Todo> {
    const headers = this.getHeaders();
    const url = environment.apiUrl + '/todos/' + todo._id;
    return this.httpClient.put<Todo>(url, todo, { headers });
  }

  delete(id: string): Observable<Todo> {
    const headers = this.getHeaders();
    const url = environment.apiUrl + '/todos/' + id;
    return this.httpClient.delete<Todo>(url, { headers });
  }

  upload(id: string, input: HTMLInputElement): Observable<File> {
    const headers = this.getHeaders();

    const formData = new FormData();
    formData.append('file', input.files![0]);

    const url = `${environment.apiUrl}/todos/${id}/upload`;
    return this.httpClient.post<File>(url, formData, { headers });
  }

  getFiles(id: string): Observable<File[]> {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}/todos/${id}/uploads`;
    return this.httpClient.get<File[]>(url, { headers });
  }
}
