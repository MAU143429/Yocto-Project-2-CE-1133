import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'http://127.0.0.1:5000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true  // Solo si usas cookies/sesión
  };

  constructor(private http: HttpClient) { }

  loginRequest(formData: any) {
    return this.http.get(`${this.apiUrl}/login/${formData.username}/${formData.password}`, this.httpOptions);
  }

  registerRequest(formData: any) {
  
    return this.http.post(`${this.apiUrl}/register/${formData.username}/${formData.password}`, this.httpOptions);
  }

  getPrueba() {
    return this.http.get(`${this.apiUrl}/prueba`, this.httpOptions);
  }

  getLight(id: string) {
    return this.http.get(`${this.apiUrl}/get_light/${id}`, this.httpOptions);
  }

  getPuerta(id: string) {
    return this.http.get(`${this.apiUrl}/get_door_state/${id}`, this.httpOptions);
  }

  getAllLight() {
    return this.http.get(`${this.apiUrl}/lights`, this.httpOptions);
  }

  setLight(id: string, value: boolean) {
    return this.http.post(`${this.apiUrl}/toggle-light/${id}/${value}`, this.httpOptions);
  }

  getImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/capture`, { 
      responseType: 'blob' 
    });
  }

  getAllDoorsState(){
    return this.http.get(`${this.apiUrl}/get_all_doors_state`, this.httpOptions);
  }
}