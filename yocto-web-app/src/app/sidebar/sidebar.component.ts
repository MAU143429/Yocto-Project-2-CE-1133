import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //this.router.navigate(['/cliente'])
  constructor(private router: Router) { }

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
    

  cambiarRuta(ruta: string) {
    console.log(ruta);
    this.router.navigate([`/${ruta}`]);
  }
}