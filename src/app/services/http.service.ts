import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private API_BASE_URL = environment.API_BASE_URL;
  constructor(private http: HttpClient) {}
  get(url = '', params = {}): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}${url}`, {
      params,
      headers: this.httpOptions.headers,
    });
  }
  post(url = '', data = {}): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}${url}`, data, {
      headers: this.httpOptions.headers,
    });
  }
  put(url = '', data = {}): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}${url}`, data, {
      headers: this.httpOptions.headers,
    });
  }
  delete(url = '', params = {}): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}${url}`, {
      params,
      headers: this.httpOptions.headers,
    });
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log('handleError-err', error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
