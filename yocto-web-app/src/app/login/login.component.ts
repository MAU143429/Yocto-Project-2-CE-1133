import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api:APIService, private sharedService: SharedService ) {}

  loginRequest(form:any): void {
    // Aquí puedes implementar la lógica para manejar el inicio de sesión
    //console.log('Login request sent');
    const valor = form.value;
    this.api.loginRequest(form.value).subscribe({
      next: (response: any) => {
        if (response.status === 'ok') {
          console.log('Login exitoso', response);
          localStorage.setItem('username', response.response.username);
          // Redirigir al usuario (ej: usando Router)
        } else {
          console.error('Error del servidor:', response.error);
          alert(response.error); // Muestra feedback al usuario
        }
      },
      error: (err) => {
        console.error('Error HTTP:', err);
        alert('Error de conexión con el servidor');
      }
    });
  }

  cambiarRegister(){
    this.sharedService.cambiarRegister();
  }
}
