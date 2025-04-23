import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'http://127.0.0.1:5000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true  // Esto envía cookies/sesión
  };
  constructor(private http:HttpClient) { }


  // GETS 
  getPrueba() {
    return this.http.get(`${this.apiUrl}/prueba`, this.httpOptions);
  }
}
