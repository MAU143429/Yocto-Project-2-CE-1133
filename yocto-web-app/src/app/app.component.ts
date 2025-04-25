import { Component, OnInit } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { forkJoin } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  luces_aux: any = {
    luz1: null,
    luz2: null,
    luz3: null,
    luz4: null,
    luz5: null
  };

  puertas_aux: any = {
    puerta_delantera: null,
    puerta_bano: null,
    puerta_cuarto1: null,
    puerta_cuarto2: null
  };
    
  private lucesSubscription: Subscription;

  constructor(private api: APIService, private sharedService: SharedService) {
    this.sharedService.register$.subscribe(valor => {
      this.registro = valor;
    });

    this.sharedService.login$.subscribe(nuevo => {
      this.entrada = nuevo;
    });

    this.lucesSubscription = this.sharedService.luces$.subscribe(luces => {
      this.luces_aux = luces;
    });
  }

  testConnection() {
    this.api.getPrueba().subscribe({
      next: (response) => console.log('Respuesta:', response),
      error: (err) => console.error('Error:', err)
    });
  }

  async loadAllLights() {
    try {
      const responses = await forkJoin([
        this.api.getLight('5'),
        this.api.getLight('6'),
        this.api.getLight('17'),
        this.api.getLight('22'),
        this.api.getLight('27'),
      ]).toPromise();
  
      if (responses) {
        responses.forEach((data, index) => {
          const llegada = JSON.parse(JSON.stringify(data));
          this.luces_aux[`luz${index + 1}`] = llegada.response == 1;
        });
      } else {
        console.error('No responses received from forkJoin.');
      }
  
      this.sharedService.setLuces(this.luces_aux);
    } catch (err) {
      console.error('Error al cargar luces:', err);
    }
  }

  async loadAllPuertas() {
    try {
      const responses = await forkJoin([
        this.api.getPuerta('16'),
        this.api.getPuerta('23'),
        this.api.getPuerta('24'),
        this.api.getPuerta('25')
      ]).toPromise();
  
      if (responses) {
        // Asignamos a las propiedades correctas del objeto puertas_aux
        this.puertas_aux.puerta_delantera = JSON.parse(JSON.stringify(responses[0])).response == 1;
        this.puertas_aux.puerta_bano = JSON.parse(JSON.stringify(responses[1])).response == 1;
        this.puertas_aux.puerta_cuarto1 = JSON.parse(JSON.stringify(responses[2])).response == 1;
        this.puertas_aux.puerta_cuarto2 = JSON.parse(JSON.stringify(responses[3])).response == 1;
      } else {
        console.error('No responses received from forkJoin.');
      }
  
      this.sharedService.setPuertas(this.puertas_aux);
    } catch (err) {
      console.error('Error al cargar puertas:', err);
    }
  }

  setAllEstados() {
    var luces_info: any = this.sharedService.getLuces();
    const data_luces: any = this.sharedService.getDataLuces();

    console.log("Luces info:");
    console.log(data_luces);

    Object.keys(luces_info).forEach((luz) => {
      if(luces_info[luz]) {
        data_luces[luz].className = this.sharedService.getClaseEncendido();
        data_luces[luz+"TEXTO"].className = this.sharedService.getTextoEncendido();
        data_luces[luz+"ICONO"].className = this.sharedService.getIconoEncendido();
        data_luces[luz+"ICONO"].style.color = this.sharedService.getColorEncendido();
      }
      else {
        data_luces[luz].className = this.sharedService.getClaseApagado();
        data_luces[luz+"TEXTO"].className = this.sharedService.getTextoApagado();
        data_luces[luz+"ICONO"].className = this.sharedService.getIconoApagado();
        data_luces[luz+"ICONO"].style.color = this.sharedService.getColorApagado();
      }
    });
  }

  setAllEstadosPuertas() {
    var puertas_info: any = this.sharedService.getPuertas();
    const data_puertas: any = this.sharedService.getDataPuertas();
    console.log("Puertas info:");
    console.log(data_puertas);
    
    Object.keys(puertas_info).forEach((puerta) => {
      if(puertas_info[puerta]) {
        data_puertas[puerta].className = this.sharedService.getClaseEncendido();
        data_puertas[puerta+"TEXTO"].className = this.sharedService.getTextoEncendido();
        data_puertas[puerta+"ICONO"].className = this.sharedService.getIconoEncendido();
        data_puertas[puerta+"ICONO"].style.color = this.sharedService.getColorEncendido();
      }
      else {
        data_puertas[puerta].className = this.sharedService.getClaseApagado();
        data_puertas[puerta+"TEXTO"].className = this.sharedService.getTextoApagado();
        data_puertas[puerta+"ICONO"].className = this.sharedService.getIconoApagado();
        data_puertas[puerta+"ICONO"].style.color = this.sharedService.getColorApagado();
      }
    });
  }

  ngOnInit(): void {
    this.testConnection();
    this.loadAllLights();
    this.loadAllPuertas();
    
    setTimeout(() => {
      this.setAllEstados();
      this.setAllEstadosPuertas();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.lucesSubscription.unsubscribe();
  }

  title = 'yocto-web-app';
  entrada = true;
  registro = false;
}