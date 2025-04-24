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

  private lucesSubscription: Subscription;

  constructor(private api:APIService, private sharedService: SharedService) {
    this.sharedService.register$.subscribe(valor => {
      this.registro = valor;
    });

    this.sharedService.login$.subscribe(nuevo => {
      this.entrada = nuevo;
    });

    this.lucesSubscription = this.sharedService.luces$.subscribe(luces => {
      //console.log('Luces actualizadas en SharedService:', luces);
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
        this.api.getLight('27')
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

  setAllEstados(){
    var luces_info:any = this.sharedService.getLuces();
    const data_luces:any = this.sharedService.getDataLuces();

    console.log("Luces info:");
    console.log(data_luces);

    Object.keys(luces_info).forEach((luz) => {
      if(luces_info[luz]){
        data_luces[luz].className = this.sharedService.getClaseEncendido();
        data_luces[luz+"TEXTO"].className = this.sharedService.getTextoEncendido();
        data_luces[luz+"ICONO"].className = this.sharedService.getIconoEncendido();
        data_luces[luz+"ICONO"].style.color = this.sharedService.getColorEncendido();
      }
      else{
        //console.log(data_luces[luz]);
        data_luces[luz].className = this.sharedService.getClaseApagado();
        data_luces[luz+"TEXTO"].className = this.sharedService.getTextoApagado();
        data_luces[luz+"ICONO"].className = this.sharedService.getIconoApagado();
        data_luces[luz+"ICONO"].style.color = this.sharedService.getColorApagado();
      }
    });
  }


  ngOnInit(): void {
    this.testConnection();
    this.loadAllLights();
    
    // Verificación inmediata (opcional)
    setTimeout(() => {
      //console.log('Estado inicial de luces:', this.sharedService.getLuces());
      this.setAllEstados();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.lucesSubscription.unsubscribe();
  }

  title = 'yocto-web-app';
  entrada = true;
  registro = false;
}
