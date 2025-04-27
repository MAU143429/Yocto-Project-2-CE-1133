import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  total_width = 1209;
  total_height = 1014;
  porcentaje_total = 40;

  private porcentaje(num:number, per:number):number {
    return (num * per) / 100;
  }

  mostrarImagenPopup() {
      Swal.fire({
        title: 'Mapa de la Casa',
        imageUrl: 'assets/casa.jpg', // Ruta a tu imagen
        imageWidth: this.porcentaje(this.total_width, this.porcentaje_total), // Ancho de la imagen
        imageHeight: this.porcentaje(this.total_height, this.porcentaje_total), // Alto de la imagen
        imageAlt: 'Descripción de la imagen',
        confirmButtonText: 'Aceptar'
      });
    }
}
