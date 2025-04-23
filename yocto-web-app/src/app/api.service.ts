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
    withCredentials: true  // Importante para manejar sesiones/cookies
  };

  constructor(private http: HttpClient) { }

  loginRequest(formData: any) {
    const body = {
      username: formData.username,
      password: formData.password
    };
    return this.http.post(`${this.apiUrl}/login`, body, this.httpOptions);
  }

  getPrueba() {
    return this.http.get(`${this.apiUrl}/prueba`, this.httpOptions);
  }
}