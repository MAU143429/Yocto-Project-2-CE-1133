import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = ''; // Para usar con [src]

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.loadImage(); // Primero intenta cargar la imagen guardada
    this.setImage();  // Luego actualiza con la nueva imagen
  }

  private loadImage() {
    const savedImage = localStorage.getItem('saved_image');
    if (savedImage) {
      this.imageSrc = savedImage;
    }
  }

  private saveImageLocally(imageBlob: Blob): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        localStorage.setItem('saved_image', reader.result as string);
        resolve();
      };
      reader.readAsDataURL(imageBlob);
    });
  }

  private async setImage() {
    try {
      const imageBlob = await this.api.getImage().toPromise();
      if (imageBlob) {
        await this.saveImageLocally(imageBlob);
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  }
}