import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private sharedService: SharedService, private api:APIService) { }

  cambiarRegister(){
    this.sharedService.cambiarRegister();
  }


  generarRegistro(form:any){
    this.api.registerRequest(form.value).subscribe({
      next: (response: any) => {
        if (response.status === 'ok') {
          console.log('REGISTRO exitoso', response);
          // Guardar datos de sesión (ej: en localStorage)
          //localStorage.setItem('username', response.response.username);
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

  registrarse(form:any){
    const valor = form.value;

    if(valor.password1 == valor.password2){
      this.generarRegistro(form);
    }
    else{
      alert("Las contraseñas no coinciden");
      form.reset();
    }
  }
}
