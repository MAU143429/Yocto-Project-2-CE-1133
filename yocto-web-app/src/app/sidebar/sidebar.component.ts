import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //this.router.navigate(['/cliente'])
  constructor(private router: Router, private shared: SharedService) { }

  cambiarTitulo(titulo: string) {
    var titulo_aux = "";
    if (titulo == "puertas") {
      titulo_aux = "Puertas";
    }
    else{
      titulo_aux = "Central de Control";
    }

    const tituloElement = document.getElementById('titulo') as HTMLTitleElement;
    console.log(tituloElement);
    //tituloElement.innerText = titulo_aux;
    console.log(titulo_aux);
  }

  confirmLogout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout(); // Llama a tu función de logout
      }
    });
  }

  logout(){
    localStorage.removeItem('username');
    this.shared.setLogin(true);
  }
    

  cambiarRuta(ruta: string) {
    console.log(ruta);
    this.router.navigate([`/${ruta}`]);
  }
}