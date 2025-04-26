import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { APIService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private sharedService: SharedService, private api:APIService, private router:Router) { }

  cambiarRegister(){
    this.sharedService.cambiarRegister();
  }


  generarRegistro(form:any){
    this.api.registerRequest(form.value).subscribe({
      next: (response: any) => {
        if (response.status == 'ok') {
          localStorage.setItem('username', response.response.username);

          alert("Registro completado con éxito");
        
          this.sharedService.setRegister(false);
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
